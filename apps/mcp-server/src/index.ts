import { createServer, IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';

import { SSEServerTransport } from './transport/sse';
import {
  StreamableHTTPTransport,
  getOrCreateSession,
  getSession,
  deleteSession,
} from './transport/streamable-http';
import { createMCPServer } from './server';
import { validateApiKey } from './auth/middleware';
import {
  getProtectedResourceMetadata,
  getAuthorizationServerMetadata,
  handleClientRegistration,
  renderAuthorizationPage,
  handleAuthorization,
  handleTokenRequest,
  validateAccessToken,
  extractBearerToken,
} from './auth/oauth';
import { getEnvConfig } from './config/env';
import { AuthContext } from '@geomcp/shared';

const config = getEnvConfig();
const PORT = config.port;
const MCP_PROTOCOL_VERSION = '2025-03-26';

// Helper to read request body
async function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

// Helper to parse JSON body
async function parseJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  const body = await readBody(req);
  return body ? JSON.parse(body) : {};
}

// Helper to parse URL-encoded body
async function parseFormBody(req: IncomingMessage): Promise<URLSearchParams> {
  const body = await readBody(req);
  return new URLSearchParams(body);
}

// Send JSON response
function jsonResponse(res: ServerResponse, status: number, data: unknown, headers: Record<string, string> = {}): void {
  res.writeHead(status, { 'Content-Type': 'application/json', ...headers });
  res.end(JSON.stringify(data));
}

// Send HTML response
function htmlResponse(res: ServerResponse, status: number, html: string): void {
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

const httpServer = createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, MCP-Protocol-Version, Mcp-Session-Id');
  res.setHeader('Access-Control-Expose-Headers', 'Mcp-Session-Id');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://localhost:${PORT}`);

  try {
    // ============================================
    // Health check endpoint
    // ============================================
    if (url.pathname === '/health') {
      jsonResponse(res, 200, { status: 'ok', version: '0.1.0', transport: 'streamable-http' });
      return;
    }

    // ============================================
    // OAuth 2.1 Metadata Endpoints
    // ============================================

    // Protected Resource Metadata (RFC 9728)
    if (url.pathname === '/.well-known/oauth-protected-resource') {
      jsonResponse(res, 200, getProtectedResourceMetadata());
      return;
    }

    // Authorization Server Metadata (RFC 8414)
    if (url.pathname === '/.well-known/oauth-authorization-server') {
      jsonResponse(res, 200, getAuthorizationServerMetadata());
      return;
    }

    // ============================================
    // OAuth 2.1 Endpoints
    // ============================================

    // Dynamic Client Registration (RFC 7591)
    if (url.pathname === '/oauth/register' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const result = handleClientRegistration(body);
      jsonResponse(res, result.status, result.body);
      return;
    }

    // Authorization endpoint - GET shows login page
    if (url.pathname === '/oauth/authorize' && req.method === 'GET') {
      const html = renderAuthorizationPage(url.searchParams);
      htmlResponse(res, 200, html);
      return;
    }

    // Authorization endpoint - POST handles login
    if (url.pathname === '/oauth/authorize' && req.method === 'POST') {
      const body = await parseFormBody(req);
      const result = await handleAuthorization(body);

      if (result.headers?.Location) {
        res.writeHead(result.status, result.headers);
        res.end();
      } else {
        jsonResponse(res, result.status, result.body || {});
      }
      return;
    }

    // Token endpoint
    if (url.pathname === '/oauth/token' && req.method === 'POST') {
      const body = await parseFormBody(req);
      const result = await handleTokenRequest(body);
      jsonResponse(res, result.status, result.body);
      return;
    }

    // ============================================
    // Streamable HTTP MCP Endpoint (New Standard)
    // ============================================
    if (url.pathname === '/mcp') {
      const sessionId = req.headers['mcp-session-id'] as string | undefined;
      const authHeader = req.headers.authorization;

      // POST - Handle incoming JSON-RPC messages
      if (req.method === 'POST') {
        const protocolVersion = req.headers['mcp-protocol-version'] as string;

        // Validate protocol version (required after initialization)
        if (sessionId && !protocolVersion) {
          jsonResponse(res, 400, {
            jsonrpc: '2.0',
            error: { code: -32600, message: 'Missing MCP-Protocol-Version header' },
            id: null,
          });
          return;
        }

        const body = await parseJsonBody(req);
        const isInitialize = body.method === 'initialize';

        // Check authentication
        let authContext: AuthContext;
        try {
          // Try OAuth token first
          const bearerToken = extractBearerToken(authHeader);
          if (bearerToken) {
            authContext = await validateAccessToken(bearerToken);
          } else if (isInitialize) {
            // For initialize without auth, return 401 with metadata pointer
            res.writeHead(401, {
              'Content-Type': 'application/json',
              'WWW-Authenticate': `Bearer resource_metadata="${config.baseUrl || `http://localhost:${PORT}`}/.well-known/oauth-protected-resource"`,
            });
            res.end(JSON.stringify({
              jsonrpc: '2.0',
              error: { code: -32000, message: 'Authentication required' },
              id: body.id || null,
            }));
            return;
          } else {
            throw new Error('Missing authorization');
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Authentication failed';
          res.writeHead(401, {
            'Content-Type': 'application/json',
            'WWW-Authenticate': `Bearer resource_metadata="${config.baseUrl || `http://localhost:${PORT}`}/.well-known/oauth-protected-resource"`,
          });
          res.end(JSON.stringify({
            jsonrpc: '2.0',
            error: { code: -32000, message },
            id: body.id || null,
          }));
          return;
        }

        // Get or create transport
        let transport: StreamableHTTPTransport;
        if (sessionId) {
          const existing = getSession(sessionId);
          if (!existing) {
            jsonResponse(res, 404, {
              jsonrpc: '2.0',
              error: { code: -32000, message: 'Session not found' },
              id: body.id || null,
            });
            return;
          }
          transport = existing;
        } else if (isInitialize) {
          transport = getOrCreateSession();
          const mcpServer = createMCPServer(authContext);
          await mcpServer.connect(transport);
        } else {
          jsonResponse(res, 400, {
            jsonrpc: '2.0',
            error: { code: -32600, message: 'Missing session ID' },
            id: body.id || null,
          });
          return;
        }

        await transport.handlePost(req, res, body as any);
        return;
      }

      // GET - SSE stream for server-to-client messages
      if (req.method === 'GET') {
        if (!sessionId) {
          jsonResponse(res, 400, { error: 'Missing Mcp-Session-Id header' });
          return;
        }

        const transport = getSession(sessionId);
        if (!transport) {
          jsonResponse(res, 404, { error: 'Session not found' });
          return;
        }

        transport.handleSSE(req, res);
        return;
      }

      // DELETE - Close session
      if (req.method === 'DELETE') {
        if (!sessionId) {
          jsonResponse(res, 400, { error: 'Missing Mcp-Session-Id header' });
          return;
        }

        deleteSession(sessionId);
        res.writeHead(204);
        res.end();
        return;
      }

      jsonResponse(res, 405, { error: 'Method not allowed' });
      return;
    }

    // ============================================
    // Legacy SSE Endpoint (Backward Compatibility)
    // ============================================
    if (url.pathname === '/sse' && req.method === 'GET') {
      // Extract API key from Authorization header or query parameter
      const authHeader = req.headers.authorization;
      const queryApiKey = url.searchParams.get('apiKey');

      let apiKey: string | null = null;

      // Try OAuth token first
      const bearerToken = extractBearerToken(authHeader);
      if (bearerToken) {
        try {
          const authContext = await validateAccessToken(bearerToken);
          // Set up SSE with validated context
          setupLegacySSE(req, res, authContext);
          return;
        } catch {
          // Fall through to try API key
        }
      }

      // Try direct API key
      if (authHeader?.startsWith('Bearer ')) {
        apiKey = authHeader.slice(7);
      } else if (queryApiKey) {
        apiKey = queryApiKey;
      }

      if (!apiKey) {
        jsonResponse(res, 401, { error: 'Missing API key. Use Authorization header or apiKey query parameter.' });
        return;
      }

      try {
        const authContext = await validateApiKey(apiKey);
        setupLegacySSE(req, res, authContext);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Authentication failed';
        jsonResponse(res, 401, { error: message });
      }
      return;
    }

    // ============================================
    // Documentation redirect
    // ============================================
    if (url.pathname === '/' || url.pathname === '/docs') {
      res.writeHead(302, { Location: 'https://geomcp.vercel.app/docs' });
      res.end();
      return;
    }

    // 404 for other paths
    jsonResponse(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error('Server error:', error);
    jsonResponse(res, 500, { error: 'Internal server error' });
  }
});

// Helper function for legacy SSE setup
function setupLegacySSE(req: IncomingMessage, res: ServerResponse, authContext: AuthContext): void {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const transport = new SSEServerTransport(req, res);
  const mcpServer = createMCPServer(authContext);

  mcpServer.connect(transport);

  req.on('close', () => {
    mcpServer.close();
  });
}

httpServer.listen(PORT, () => {
  console.warn(`GEO MCP Server running on http://localhost:${PORT}`);
  console.warn(`\nEndpoints:`);
  console.warn(`  MCP (Streamable HTTP): http://localhost:${PORT}/mcp`);
  console.warn(`  Legacy SSE:            http://localhost:${PORT}/sse`);
  console.warn(`  Health:                http://localhost:${PORT}/health`);
  console.warn(`\nOAuth Endpoints:`);
  console.warn(`  Metadata:              http://localhost:${PORT}/.well-known/oauth-protected-resource`);
  console.warn(`  Authorization:         http://localhost:${PORT}/oauth/authorize`);
  console.warn(`  Token:                 http://localhost:${PORT}/oauth/token`);
  console.warn(`  Client Registration:   http://localhost:${PORT}/oauth/register`);
});

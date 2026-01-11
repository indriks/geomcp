import { createServer } from 'http';

import { SSEServerTransport } from './transport/sse';
import { createMCPServer } from './server';
import { validateApiKey } from './auth/middleware';
import { getEnvConfig } from './config/env';

const config = getEnvConfig();
const PORT = config.port;

const httpServer = createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://localhost:${PORT}`);

  // Health check endpoint
  if (url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', version: '0.1.0' }));
    return;
  }

  // SSE endpoint for MCP
  if (url.pathname === '/sse' && req.method === 'GET') {
    // Extract API key from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing or invalid Authorization header' }));
      return;
    }

    const apiKey = authHeader.slice(7);

    try {
      // Validate API key and get client context
      const authContext = await validateApiKey(apiKey);

      // Set up SSE headers
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });

      // Create SSE transport and MCP server
      const transport = new SSEServerTransport(req, res);
      const mcpServer = createMCPServer(authContext);

      // Connect transport to server
      await mcpServer.connect(transport);

      // Handle client disconnect
      req.on('close', () => {
        mcpServer.close();
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed';
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: message }));
    }
    return;
  }

  // 404 for other paths
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

httpServer.listen(PORT, () => {
  console.warn(`GEO MCP Server running on http://localhost:${PORT}`);
  console.warn(`SSE endpoint: http://localhost:${PORT}/sse`);
  console.warn(`Health check: http://localhost:${PORT}/health`);
});

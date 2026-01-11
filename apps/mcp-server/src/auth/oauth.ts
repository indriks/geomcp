import { createHash, randomBytes } from 'crypto';
import { IncomingMessage, ServerResponse } from 'http';
import { validateApiKey } from './middleware';
import { AuthContext } from '@geomcp/shared';
import { getEnvConfig } from '../config/env';

// OAuth types
interface OAuthClient {
  client_id: string;
  client_secret?: string;
  client_name: string;
  redirect_uris: string[];
  grant_types: string[];
  created_at: number;
}

interface AuthorizationCode {
  code: string;
  client_id: string;
  redirect_uri: string;
  code_challenge?: string;
  code_challenge_method?: string;
  scope: string;
  user_api_key: string; // The actual GEO MCP API key
  expires_at: number;
}

interface AccessToken {
  token: string;
  client_id: string;
  scope: string;
  api_key: string; // The GEO MCP API key this token represents
  expires_at: number;
}

// In-memory stores (use Redis in production)
const clients = new Map<string, OAuthClient>();
const authCodes = new Map<string, AuthorizationCode>();
const accessTokens = new Map<string, AccessToken>();
const refreshTokens = new Map<string, { token: string; access_token: string; expires_at: number }>();

// Configuration
const getBaseUrl = () => getEnvConfig().baseUrl;
const TOKEN_EXPIRY = 3600; // 1 hour
const REFRESH_EXPIRY = 30 * 24 * 3600; // 30 days

// Helper functions
function generateToken(length = 32): string {
  return randomBytes(length).toString('base64url');
}

function sha256(str: string): string {
  return createHash('sha256').update(str).digest('base64url');
}

// OAuth Metadata endpoints

export function getProtectedResourceMetadata(): object {
  const baseUrl = getBaseUrl();
  return {
    resource: baseUrl,
    authorization_servers: [baseUrl],
    bearer_methods_supported: ['header'],
    resource_documentation: `${baseUrl}/docs`,
    scopes_supported: ['mcp:tools', 'mcp:resources', 'mcp:prompts'],
  };
}

export function getAuthorizationServerMetadata(): object {
  const baseUrl = getBaseUrl();
  return {
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/oauth/authorize`,
    token_endpoint: `${baseUrl}/oauth/token`,
    registration_endpoint: `${baseUrl}/oauth/register`,
    scopes_supported: ['mcp:tools', 'mcp:resources', 'mcp:prompts'],
    response_types_supported: ['code'],
    grant_types_supported: ['authorization_code', 'refresh_token'],
    code_challenge_methods_supported: ['S256'],
    token_endpoint_auth_methods_supported: ['none', 'client_secret_post'],
  };
}

// Dynamic Client Registration (RFC 7591)
export function handleClientRegistration(body: Record<string, unknown>): { status: number; body: object } {
  const clientId = generateToken(16);
  const clientSecret = body.token_endpoint_auth_method !== 'none' ? generateToken(32) : undefined;

  const client: OAuthClient = {
    client_id: clientId,
    client_secret: clientSecret,
    client_name: (body.client_name as string) || 'Unknown Client',
    redirect_uris: (body.redirect_uris as string[]) || [],
    grant_types: (body.grant_types as string[]) || ['authorization_code'],
    created_at: Date.now(),
  };

  clients.set(clientId, client);

  return {
    status: 201,
    body: {
      client_id: clientId,
      client_secret: clientSecret,
      client_id_issued_at: Math.floor(client.created_at / 1000),
      redirect_uris: client.redirect_uris,
      grant_types: client.grant_types,
      token_endpoint_auth_method: clientSecret ? 'client_secret_post' : 'none',
    },
  };
}

// Authorization endpoint - renders login page
export function renderAuthorizationPage(params: URLSearchParams): string {
  const baseUrl = getBaseUrl();
  const clientId = params.get('client_id') || '';
  const redirectUri = params.get('redirect_uri') || '';
  const state = params.get('state') || '';
  const scope = params.get('scope') || 'mcp:tools';
  const codeChallenge = params.get('code_challenge') || '';
  const codeChallengeMethod = params.get('code_challenge_method') || '';

  return `
<!DOCTYPE html>
<html>
<head>
  <title>GEO MCP - Connect</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 40px;
      max-width: 420px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .logo {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo h1 {
      font-size: 28px;
      color: #1a1a2e;
      margin-bottom: 8px;
    }
    .logo p {
      color: #666;
      font-size: 14px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }
    input[type="password"], input[type="text"] {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid #e1e1e1;
      border-radius: 10px;
      font-size: 16px;
      transition: border-color 0.2s;
    }
    input:focus {
      outline: none;
      border-color: #4f46e5;
    }
    button {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
    }
    .permissions {
      background: #f8f9fa;
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 24px;
    }
    .permissions h3 {
      font-size: 14px;
      color: #333;
      margin-bottom: 12px;
    }
    .permissions ul {
      list-style: none;
    }
    .permissions li {
      padding: 8px 0;
      color: #555;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .permissions li::before {
      content: "✓";
      color: #22c55e;
      font-weight: bold;
    }
    .error {
      background: #fef2f2;
      color: #dc2626;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 14px;
      display: none;
    }
    .help {
      text-align: center;
      margin-top: 20px;
      font-size: 13px;
      color: #666;
    }
    .help a {
      color: #4f46e5;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <h1>🎯 GEO MCP</h1>
      <p>Connect your AI assistant</p>
    </div>

    <div class="error" id="error"></div>

    <div class="permissions">
      <h3>This will allow access to:</h3>
      <ul>
        <li>Your GEO optimization tools</li>
        <li>Content creation capabilities</li>
        <li>Citation tracking data</li>
      </ul>
    </div>

    <form id="authForm" method="POST" action="/oauth/authorize">
      <input type="hidden" name="client_id" value="${clientId}">
      <input type="hidden" name="redirect_uri" value="${redirectUri}">
      <input type="hidden" name="state" value="${state}">
      <input type="hidden" name="scope" value="${scope}">
      <input type="hidden" name="code_challenge" value="${codeChallenge}">
      <input type="hidden" name="code_challenge_method" value="${codeChallengeMethod}">

      <div class="form-group">
        <label for="api_key">Your GEO MCP API Key</label>
        <input type="password" id="api_key" name="api_key" placeholder="sk_live_..." required>
      </div>

      <button type="submit">Connect to GEO MCP</button>
    </form>

    <p class="help">
      Don't have an API key? <a href="${baseUrl}/signup" target="_blank">Get started</a>
    </p>
  </div>

  <script>
    document.getElementById('authForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const errorEl = document.getElementById('error');
      const button = form.querySelector('button');

      button.textContent = 'Connecting...';
      button.disabled = true;
      errorEl.style.display = 'none';

      try {
        const formData = new URLSearchParams(new FormData(form));
        const response = await fetch('/oauth/authorize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData,
          redirect: 'manual'
        });

        if (response.type === 'opaqueredirect' || response.status === 302) {
          window.location.href = response.headers.get('Location') || form.action;
        } else if (response.ok) {
          const location = response.headers.get('Location');
          if (location) {
            window.location.href = location;
          }
        } else {
          const data = await response.json();
          throw new Error(data.error_description || 'Authentication failed');
        }
      } catch (err) {
        errorEl.textContent = err.message;
        errorEl.style.display = 'block';
        button.textContent = 'Connect to GEO MCP';
        button.disabled = false;
      }
    });
  </script>
</body>
</html>
`;
}

// Handle authorization POST (user submits API key)
export async function handleAuthorization(
  body: URLSearchParams
): Promise<{ status: number; headers?: Record<string, string>; body?: object | string }> {
  const clientId = body.get('client_id');
  const redirectUri = body.get('redirect_uri');
  const state = body.get('state');
  const scope = body.get('scope') || 'mcp:tools';
  const codeChallenge = body.get('code_challenge');
  const codeChallengeMethod = body.get('code_challenge_method');
  const apiKey = body.get('api_key');

  // Validate client
  if (!clientId) {
    return { status: 400, body: { error: 'invalid_request', error_description: 'Missing client_id' } };
  }

  // Validate redirect URI
  if (!redirectUri) {
    return { status: 400, body: { error: 'invalid_request', error_description: 'Missing redirect_uri' } };
  }

  // Validate API key
  if (!apiKey) {
    return { status: 400, body: { error: 'invalid_request', error_description: 'Missing API key' } };
  }

  try {
    // Verify the API key is valid
    await validateApiKey(apiKey);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid API key';
    const errorRedirect = `${redirectUri}?error=access_denied&error_description=${encodeURIComponent(message)}${state ? `&state=${state}` : ''}`;
    return { status: 302, headers: { Location: errorRedirect } };
  }

  // Generate authorization code
  const code = generateToken(32);
  const authCode: AuthorizationCode = {
    code,
    client_id: clientId,
    redirect_uri: redirectUri,
    code_challenge: codeChallenge || undefined,
    code_challenge_method: codeChallengeMethod || undefined,
    scope,
    user_api_key: apiKey,
    expires_at: Date.now() + 10 * 60 * 1000, // 10 minutes
  };

  authCodes.set(code, authCode);

  // Redirect back to client with code
  const successRedirect = `${redirectUri}?code=${code}${state ? `&state=${state}` : ''}`;
  return { status: 302, headers: { Location: successRedirect } };
}

// Token endpoint
export async function handleTokenRequest(
  body: URLSearchParams
): Promise<{ status: number; body: object }> {
  const grantType = body.get('grant_type');

  if (grantType === 'authorization_code') {
    return handleAuthCodeGrant(body);
  } else if (grantType === 'refresh_token') {
    return handleRefreshTokenGrant(body);
  }

  return {
    status: 400,
    body: { error: 'unsupported_grant_type', error_description: 'Unsupported grant type' },
  };
}

function handleAuthCodeGrant(body: URLSearchParams): { status: number; body: object } {
  const code = body.get('code');
  const redirectUri = body.get('redirect_uri');
  const codeVerifier = body.get('code_verifier');

  if (!code) {
    return { status: 400, body: { error: 'invalid_request', error_description: 'Missing code' } };
  }

  const authCode = authCodes.get(code);
  if (!authCode) {
    return { status: 400, body: { error: 'invalid_grant', error_description: 'Invalid or expired code' } };
  }

  // Check expiration
  if (Date.now() > authCode.expires_at) {
    authCodes.delete(code);
    return { status: 400, body: { error: 'invalid_grant', error_description: 'Code has expired' } };
  }

  // Verify redirect URI
  if (redirectUri !== authCode.redirect_uri) {
    return { status: 400, body: { error: 'invalid_grant', error_description: 'Redirect URI mismatch' } };
  }

  // Verify PKCE if code challenge was provided
  if (authCode.code_challenge) {
    if (!codeVerifier) {
      return { status: 400, body: { error: 'invalid_request', error_description: 'Missing code_verifier' } };
    }

    const expectedChallenge = authCode.code_challenge_method === 'S256'
      ? sha256(codeVerifier)
      : codeVerifier;

    if (expectedChallenge !== authCode.code_challenge) {
      return { status: 400, body: { error: 'invalid_grant', error_description: 'Invalid code_verifier' } };
    }
  }

  // Delete the used code
  authCodes.delete(code);

  // Generate tokens
  const accessToken = generateToken(32);
  const refreshToken = generateToken(32);

  accessTokens.set(accessToken, {
    token: accessToken,
    client_id: authCode.client_id,
    scope: authCode.scope,
    api_key: authCode.user_api_key,
    expires_at: Date.now() + TOKEN_EXPIRY * 1000,
  });

  refreshTokens.set(refreshToken, {
    token: refreshToken,
    access_token: accessToken,
    expires_at: Date.now() + REFRESH_EXPIRY * 1000,
  });

  return {
    status: 200,
    body: {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: TOKEN_EXPIRY,
      refresh_token: refreshToken,
      scope: authCode.scope,
    },
  };
}

function handleRefreshTokenGrant(body: URLSearchParams): { status: number; body: object } {
  const refreshToken = body.get('refresh_token');

  if (!refreshToken) {
    return { status: 400, body: { error: 'invalid_request', error_description: 'Missing refresh_token' } };
  }

  const storedRefresh = refreshTokens.get(refreshToken);
  if (!storedRefresh || Date.now() > storedRefresh.expires_at) {
    if (storedRefresh) refreshTokens.delete(refreshToken);
    return { status: 400, body: { error: 'invalid_grant', error_description: 'Invalid or expired refresh token' } };
  }

  // Get the old access token to copy its data
  const oldAccessToken = accessTokens.get(storedRefresh.access_token);
  if (!oldAccessToken) {
    return { status: 400, body: { error: 'invalid_grant', error_description: 'Associated access token not found' } };
  }

  // Generate new tokens
  const newAccessToken = generateToken(32);
  const newRefreshToken = generateToken(32);

  // Delete old tokens
  accessTokens.delete(storedRefresh.access_token);
  refreshTokens.delete(refreshToken);

  // Create new tokens
  accessTokens.set(newAccessToken, {
    ...oldAccessToken,
    token: newAccessToken,
    expires_at: Date.now() + TOKEN_EXPIRY * 1000,
  });

  refreshTokens.set(newRefreshToken, {
    token: newRefreshToken,
    access_token: newAccessToken,
    expires_at: Date.now() + REFRESH_EXPIRY * 1000,
  });

  return {
    status: 200,
    body: {
      access_token: newAccessToken,
      token_type: 'Bearer',
      expires_in: TOKEN_EXPIRY,
      refresh_token: newRefreshToken,
      scope: oldAccessToken.scope,
    },
  };
}

// Validate access token and return auth context
export async function validateAccessToken(token: string): Promise<AuthContext> {
  const accessToken = accessTokens.get(token);

  if (!accessToken) {
    throw new Error('Invalid access token');
  }

  if (Date.now() > accessToken.expires_at) {
    accessTokens.delete(token);
    throw new Error('Access token has expired');
  }

  // Validate the underlying API key
  return validateApiKey(accessToken.api_key);
}

// Extract bearer token from Authorization header
export function extractBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.slice(7);
}

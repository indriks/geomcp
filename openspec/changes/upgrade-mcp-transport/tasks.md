## 1. Transport Implementation

- [x] 1.1 Create `StreamableHTTPTransport` class implementing MCP Transport interface
- [x] 1.2 Implement POST handler for JSON-RPC messages
- [x] 1.3 Implement GET handler for SSE stream (server-to-client notifications)
- [x] 1.4 Implement DELETE handler for session termination
- [x] 1.5 Add session management with `Mcp-Session-Id` header
- [x] 1.6 Implement message queue for responses

## 2. OAuth 2.1 Implementation

- [x] 2.1 Create protected resource metadata endpoint (`/.well-known/oauth-protected-resource`)
- [x] 2.2 Create authorization server metadata endpoint (`/.well-known/oauth-authorization-server`)
- [x] 2.3 Implement Dynamic Client Registration (RFC 7591)
- [x] 2.4 Create authorization endpoint with login page
- [x] 2.5 Implement PKCE (S256) support for authorization code flow
- [x] 2.6 Implement token endpoint with code exchange
- [x] 2.7 Implement refresh token support
- [x] 2.8 Add access token validation

## 3. Server Integration

- [x] 3.1 Update `index.ts` to route requests to appropriate handlers
- [x] 3.2 Add CORS headers for cross-origin requests
- [x] 3.3 Return 401 with `WWW-Authenticate` header for unauthenticated requests
- [x] 3.4 Preserve legacy SSE endpoint at `/sse`
- [x] 3.5 Update environment configuration for `MCP_BASE_URL`

## 4. Deployment

- [x] 4.1 Update Dockerfile for Railway deployment
- [x] 4.2 Configure Railway service
- [x] 4.3 Verify OAuth flow works with Claude Code CLI
- [x] 4.4 Update project documentation

## 5. Testing

- [x] 5.1 Test OAuth metadata endpoints return valid responses
- [x] 5.2 Test Dynamic Client Registration
- [x] 5.3 Test authorization code flow with PKCE
- [x] 5.4 Test token exchange
- [x] 5.5 Test MCP tool invocation through new transport

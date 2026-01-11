# Change: Upgrade MCP Transport to Streamable HTTP with OAuth 2.1

## Why

The MCP specification deprecated SSE transport in favor of Streamable HTTP (spec version 2025-06-18). Additionally, Claude.ai and Claude Desktop require OAuth 2.1 authentication for remote MCP servers. This upgrade ensures compatibility with the current MCP standard and enables proper authentication flows for all Claude clients.

## What Changes

- **BREAKING**: Primary transport changed from SSE to Streamable HTTP
- Added OAuth 2.1 authorization server implementation (RFC 8414, RFC 9728, RFC 7591)
- Added protected resource metadata endpoint (`/.well-known/oauth-protected-resource`)
- Added authorization server metadata endpoint (`/.well-known/oauth-authorization-server`)
- Added dynamic client registration endpoint (`/oauth/register`)
- Added authorization endpoint with login page (`/oauth/authorize`)
- Added token endpoint (`/oauth/token`)
- Legacy SSE endpoint (`/sse`) preserved for backward compatibility
- Deployment moved from Vercel to Railway for persistent server support

## Impact

- Affected specs: `mcp-transport` (new capability)
- Affected code: `apps/mcp-server/src/index.ts`, `apps/mcp-server/src/transport/`, `apps/mcp-server/src/auth/oauth.ts`
- Breaking: Clients using SSE must migrate to Streamable HTTP (legacy endpoint available)
- Dependencies: None
- Dependents: All MCP tool modules use new transport

## Acceptance Criteria

1. `/mcp` endpoint accepts Streamable HTTP requests per MCP 2025-06-18 spec
2. OAuth 2.1 flow completes successfully with Claude Code CLI
3. Dynamic Client Registration works for new clients
4. Access tokens are issued after valid API key authentication
5. Session management via `Mcp-Session-Id` header
6. Legacy `/sse` endpoint continues to work for existing integrations
7. All OAuth metadata endpoints return valid RFC-compliant responses

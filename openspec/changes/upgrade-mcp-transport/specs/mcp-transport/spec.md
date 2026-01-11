# MCP Transport Specification

## ADDED Requirements

### Requirement: Streamable HTTP Transport

The MCP server SHALL implement Streamable HTTP transport per MCP specification version 2025-06-18. The primary endpoint SHALL be `/mcp` accepting POST requests for JSON-RPC messages, GET requests for SSE streams, and DELETE requests for session termination.

#### Scenario: Initialize MCP session
- **WHEN** client sends POST to `/mcp` with `{"method": "initialize"}` and valid OAuth token
- **THEN** server creates new session and returns `Mcp-Session-Id` header
- **AND** returns MCP capabilities in response

#### Scenario: Send tool request
- **WHEN** client sends POST to `/mcp` with `Mcp-Session-Id` header and tool call request
- **THEN** server routes to appropriate tool handler
- **AND** returns JSON-RPC response with tool result

#### Scenario: Establish SSE stream
- **WHEN** client sends GET to `/mcp` with `Mcp-Session-Id` header
- **THEN** server opens SSE connection for server-to-client messages
- **AND** sends any queued messages

#### Scenario: Close session
- **WHEN** client sends DELETE to `/mcp` with `Mcp-Session-Id` header
- **THEN** server terminates session and returns 204 No Content

### Requirement: OAuth 2.1 Protected Resource

The MCP server SHALL act as an OAuth 2.1 protected resource per RFC 9728. Unauthenticated requests to `/mcp` SHALL return HTTP 401 with `WWW-Authenticate` header pointing to resource metadata.

#### Scenario: Unauthenticated request
- **WHEN** client sends request to `/mcp` without Authorization header
- **THEN** server returns 401 Unauthorized
- **AND** includes `WWW-Authenticate: Bearer resource_metadata=".../.well-known/oauth-protected-resource"` header

#### Scenario: Fetch protected resource metadata
- **WHEN** client sends GET to `/.well-known/oauth-protected-resource`
- **THEN** server returns JSON with `resource`, `authorization_servers`, `scopes_supported`

### Requirement: OAuth 2.1 Authorization Server

The MCP server SHALL implement OAuth 2.1 authorization server per RFC 8414. The server SHALL support authorization code flow with PKCE (S256) and refresh tokens.

#### Scenario: Fetch authorization server metadata
- **WHEN** client sends GET to `/.well-known/oauth-authorization-server`
- **THEN** server returns JSON with `issuer`, `authorization_endpoint`, `token_endpoint`, `registration_endpoint`, `code_challenge_methods_supported`

#### Scenario: Dynamic client registration
- **WHEN** client sends POST to `/oauth/register` with `client_name` and `redirect_uris`
- **THEN** server creates new client and returns `client_id`

#### Scenario: Authorization request
- **WHEN** user navigates to `/oauth/authorize` with `client_id`, `redirect_uri`, `code_challenge`, `state`
- **THEN** server renders login page for API key entry

#### Scenario: Authorization grant
- **WHEN** user submits valid API key on authorization page
- **THEN** server redirects to `redirect_uri` with authorization `code` and `state`

#### Scenario: Token exchange
- **WHEN** client sends POST to `/oauth/token` with `grant_type=authorization_code`, `code`, `code_verifier`
- **THEN** server validates PKCE and returns `access_token`, `refresh_token`, `expires_in`

#### Scenario: Token refresh
- **WHEN** client sends POST to `/oauth/token` with `grant_type=refresh_token`, `refresh_token`
- **THEN** server returns new `access_token` and `refresh_token`

### Requirement: Session Management

The MCP server SHALL manage sessions with automatic cleanup. Sessions inactive for more than 30 minutes SHALL be terminated automatically.

#### Scenario: Session timeout
- **WHEN** session has no activity for 30 minutes
- **THEN** server removes session from store
- **AND** subsequent requests with that session ID return 404

### Requirement: Legacy SSE Endpoint

The MCP server SHALL maintain backward compatibility via legacy SSE endpoint at `/sse`. This endpoint SHALL accept API key authentication via Authorization header or query parameter.

#### Scenario: Legacy SSE connection
- **WHEN** client sends GET to `/sse` with `Authorization: Bearer <api_key>`
- **THEN** server establishes SSE connection with validated API key
- **AND** MCP tools are available via legacy transport

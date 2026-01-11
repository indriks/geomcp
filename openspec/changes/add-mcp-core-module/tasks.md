# Tasks: MCP Core Module

## 1. Database Client

- [x] 1.1 Create `apps/mcp-server/src/db/client.ts` Supabase client
- [x] 1.2 Create database query helpers for clients table
- [x] 1.3 Create database query helpers for subscriptions table
- [x] 1.4 Implement error handling with typed error responses

## 2. Auth Middleware

- [x] 2.1 Create `apps/mcp-server/src/auth/middleware.ts`
- [x] 2.2 Validate API key from Authorization header
- [x] 2.3 Look up client_id from api_keys table
- [x] 2.4 Attach client context to request
- [x] 2.5 Check subscription status (active/expired)

## 3. geomcp_status Tool

- [x] 3.1 Create `apps/mcp-server/src/tools/core/status.ts`
- [x] 3.2 Define input schema (no parameters required)
- [x] 3.3 Define output schema with TypeScript interface
- [x] 3.4 Implement tool handler querying database
- [x] 3.5 Register tool with MCP server
- [x] 3.6 Add unit tests for status tool

## 4. geomcp_setup Tool

- [x] 4.1 Create `apps/mcp-server/src/tools/core/setup.ts`
- [x] 4.2 Define input schema
- [x] 4.3 Define output schema with assigned repos and recommended terms
- [x] 4.4 Implement validation for required fields
- [x] 4.5 Implement tool handler (POST to backend, cache result)
- [x] 4.6 Register tool with MCP server
- [x] 4.7 Add unit tests for setup tool

## 5. geomcp_profile Tool

- [x] 5.1 Create `apps/mcp-server/src/tools/core/profile.ts`
- [x] 5.2 Define input schema (optional fields for updates)
- [x] 5.3 Implement read mode (no params = return current profile)
- [x] 5.4 Implement update mode (partial updates via PATCH)
- [x] 5.5 Invalidate cache on updates
- [x] 5.6 Register tool with MCP server
- [x] 5.7 Add unit tests for profile tool

## 6. Tool Registration

- [x] 6.1 Create `apps/mcp-server/src/tools/core/index.ts` barrel export
- [x] 6.2 Update main server to register all core tools
- [x] 6.3 Add tool metadata (name, description) for discovery

## 7. Error Handling

- [x] 7.1 Create custom error classes (AuthError, ValidationError, ApiError)
- [x] 7.2 Implement user-friendly error messages
- [x] 7.3 Add error recovery suggestions in responses

## Verification

```bash
# Run tests
pnpm test packages/mcp

# Manual verification with MCP Inspector or Claude Desktop
# 1. Start server: pnpm dev
# 2. Call geomcp_status - should return mock data
# 3. Call geomcp_setup with valid input - should succeed
# 4. Call geomcp_status again - should show updated profile
# 5. Call geomcp_profile to view - should match setup data
# 6. Call geomcp_profile with partial update - should update
```

# Change: Add MCP Core Module

## Why

The core module handles authentication, subscription validation, and client profile management. These are foundational capabilities that all other MCP tools depend on. Users need to authenticate with an API key and configure their client profile before using content creation or citation tracking features.

## What Changes

- Implement `geomcp_status` tool for checking subscription and profile status
- Implement `geomcp_setup` tool for configuring client profile
- Implement `geomcp_profile` tool for viewing/updating profile
- Create API client abstraction for backend communication (mocked initially)
- Add environment variable handling for `GEOMCP_API_KEY`
- Implement local caching for profile data

## Impact

- Affected specs: `mcp-core` (new capability)
- Affected code: `packages/mcp/src/tools/core/`
- Dependencies: Proposal 1 (Monorepo Foundation)
- Dependents: All other MCP tool modules

## Acceptance Criteria

1. `geomcp_status` returns subscription status, client profile, content stats, and citation summary
2. `geomcp_setup` accepts company info, industry, competitors, and expert quotes
3. `geomcp_profile` allows viewing and updating individual profile fields
4. Tools return helpful error messages when API key is missing or invalid
5. Profile data is cached locally to reduce API calls
6. All tools have proper TypeScript types and JSON schemas

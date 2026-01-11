# Change: Add Monorepo Foundation

## Why

GEO MCP requires a well-structured monorepo to house the hosted MCP server, backend API, and minimal web presence. A solid foundation with proper tooling, TypeScript configuration, and package structure is essential before implementing any business logic.

## What Changes

- Initialize pnpm workspace monorepo structure
- Set up shared TypeScript configuration
- Configure ESLint and Prettier for code quality
- Create `apps/mcp-server/` for the hosted MCP server (SSE transport)
- Create `packages/shared/` for shared types and utilities
- Set up basic development workflow (scripts, hot reload)

## Impact

- Affected specs: `monorepo` (new capability)
- Affected code: Root configuration files, apps/ and packages/ directory structure
- Dependencies: None (foundational)
- Dependents: All subsequent proposals build on this

## Acceptance Criteria

1. `pnpm install` successfully installs all dependencies
2. `pnpm build` compiles all packages without errors
3. `pnpm lint` passes with no warnings
4. `pnpm dev` starts the MCP server locally on port 3001
5. MCP server accepts SSE connections and responds to protocol handshake
6. TypeScript strict mode enabled across all packages

# Tasks: Monorepo Foundation

## 1. Root Configuration

- [x] 1.1 Initialize pnpm workspace with `pnpm-workspace.yaml`
- [x] 1.2 Create root `package.json` with workspace scripts
- [x] 1.3 Create root `tsconfig.json` with strict mode and path aliases
- [x] 1.4 Configure ESLint with TypeScript rules (`eslint.config.js`)
- [x] 1.5 Configure Prettier (`.prettierrc`)
- [x] 1.6 Add `.gitignore` for Node.js/TypeScript projects
- [x] 1.7 Add `.nvmrc` specifying Node.js version (20.x LTS)

## 2. Shared Package

- [x] 2.1 Create `packages/shared/package.json`
- [x] 2.2 Create `packages/shared/tsconfig.json` extending root
- [x] 2.3 Create `packages/shared/src/index.ts` entry point
- [x] 2.4 Define shared types: `ClientProfile`, `Subscription`, `ContentMention`, `Citation`
- [x] 2.5 Define MCP tool response types
- [x] 2.6 Export all types from package entry point

## 3. Hosted MCP Server

- [x] 3.1 Create `apps/mcp-server/package.json` with MCP SDK dependency
- [x] 3.2 Create `apps/mcp-server/tsconfig.json` extending root
- [x] 3.3 Create `apps/mcp-server/vercel.json` for SSE support
- [x] 3.4 Create `apps/mcp-server/src/index.ts` SSE endpoint
- [x] 3.5 Create `apps/mcp-server/src/server.ts` MCP server setup
- [x] 3.6 Implement SSE transport with `@modelcontextprotocol/sdk`
- [x] 3.7 Add API key authentication middleware (placeholder)
- [x] 3.8 Register placeholder tool (`geomcp_status`) that returns mock data
- [x] 3.9 Create development script with hot reload

## 4. Build & Test Infrastructure

- [x] 4.1 Add tsup or unbuild for package bundling
- [x] 4.2 Configure build output for ESM and CJS
- [x] 4.3 Add Vitest configuration for unit tests
- [x] 4.4 Create initial test file verifying MCP server initialization
- [x] 4.5 Add GitHub Actions workflow for CI (lint, build, test)

## 5. Documentation

- [x] 5.1 Update root README.md with project overview and setup instructions
- [x] 5.2 Add CONTRIBUTING.md with development workflow
- [x] 5.3 Document package structure in README

## Verification

After completing all tasks:

```bash
# All commands should succeed
pnpm install
pnpm lint
pnpm build
pnpm test
pnpm dev  # Should start MCP server on localhost:3001
```

Manual verification:
```bash
# Test SSE endpoint
curl -N -H "Authorization: Bearer test_key" http://localhost:3001/sse

# Or configure Claude Desktop with local endpoint:
# "url": "http://localhost:3001/sse"
```

- MCP server accepts SSE connections
- `geomcp_status` tool returns mock subscription data
- API key is validated (reject if missing/invalid)

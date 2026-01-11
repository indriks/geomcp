# Design: Monorepo Foundation

## Context

GEO MCP is a multi-package project requiring:
- An MCP server package published to npm (`@geomcp/mcp`)
- Backend services (Vercel functions)
- A minimal web presence
- Shared types and utilities across packages

A monorepo structure provides:
- Single source of truth for shared code
- Atomic commits across packages
- Simplified dependency management
- Consistent tooling and configuration

## Goals / Non-Goals

**Goals:**
- Establish consistent TypeScript configuration
- Enable fast development iteration with hot reload
- Support npm publishing of `@geomcp/mcp` package
- Prepare structure for backend and web packages

**Non-Goals:**
- Implement business logic (deferred to subsequent proposals)
- Set up production infrastructure (Vercel, Supabase)
- Handle authentication or billing

## Decisions

### Package Manager: pnpm

**Decision:** Use pnpm with workspaces

**Rationale:**
- Faster than npm/yarn due to content-addressable storage
- Strict dependency resolution prevents phantom dependencies
- Native workspace support
- Disk space efficient for monorepos

### TypeScript Configuration

**Decision:** Strict mode enabled with shared base config

```
tsconfig.json (root)        # Shared compiler options
├── packages/shared/tsconfig.json   # Extends root
├── packages/mcp/tsconfig.json      # Extends root
└── apps/web/tsconfig.json          # Extends root (future)
```

Key settings:
- `strict: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`

### Build Tool: tsup

**Decision:** Use tsup for package bundling

**Rationale:**
- Zero-config TypeScript bundling
- Built on esbuild (fast)
- Generates ESM and CJS outputs
- Handles declaration files

### MCP SDK Integration

**Decision:** Use official `@modelcontextprotocol/sdk` package with SSE transport

The MCP server is **hosted on our infrastructure**, not installed by users:
1. Create server instance with metadata
2. Register tools using `server.tool()` API
3. Use **SSE transport** for remote connections (not stdio)
4. Authenticate requests via API key in headers
5. Deploy to Vercel as serverless function

**User configuration (Claude Desktop):**
```json
{
  "mcpServers": {
    "geomcp": {
      "url": "https://mcp.geomcp.ai/sse",
      "headers": {
        "Authorization": "Bearer sk_live_xxx"
      }
    }
  }
}
```

### Directory Structure

```
geomcp/
├── package.json              # Root workspace config
├── pnpm-workspace.yaml       # Workspace definition
├── tsconfig.json             # Shared TS config
├── eslint.config.js          # ESLint flat config
├── .prettierrc               # Prettier config
├── apps/
│   ├── mcp-server/           # Hosted MCP server
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vercel.json       # Vercel config for SSE
│   │   └── src/
│   │       ├── index.ts      # SSE endpoint
│   │       ├── server.ts     # MCP server setup
│   │       ├── auth/         # API key middleware
│   │       ├── tools/        # Tool implementations
│   │       └── services/     # External integrations
│   ├── api/                  # Backend API (future)
│   └── web/                  # Website (future)
├── packages/
│   └── shared/               # @geomcp/shared
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts
│           └── types/
│               ├── client.ts
│               ├── content.ts
│               └── citation.ts
└── openspec/                 # Specifications
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| pnpm less familiar than npm | Clear documentation, team onboarding |
| Monorepo complexity | Start simple, add tools (Turborepo) only if needed |
| MCP SDK breaking changes | Pin version, monitor releases |

## Open Questions

None - this is a standard monorepo setup with well-established patterns.

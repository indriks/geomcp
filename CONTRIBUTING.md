# Contributing to GEO MCP

## Development Workflow

### Setting Up

1. Fork and clone the repository
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env.local` and fill in your API keys
4. Run migrations: `pnpm --filter api db:push`

### Development

```bash
# Start all services
pnpm dev        # MCP server (port 3001)
pnpm dev:web    # Web app (port 3000)
pnpm dev:api    # API server (port 3002)

# Or start individually
pnpm --filter mcp-server dev
pnpm --filter web dev
pnpm --filter api dev
```

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check for issues
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix

# Format code
pnpm format
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter mcp-server build
pnpm --filter web build
pnpm --filter api build
```

## Project Structure

### Packages

- `packages/shared` - Shared TypeScript types exported to all apps

### Apps

- `apps/mcp-server` - MCP server with SSE transport and all tools
- `apps/api` - Backend API with Vercel Functions
- `apps/web` - Next.js marketing and account management site

### Key Directories

```
apps/mcp-server/src/
├── tools/           # MCP tool implementations
│   ├── core/        # Status, setup, profile tools
│   ├── content/     # Content creation tools
│   ├── research/    # Research tools
│   ├── citations/   # Citation tracking tools
│   └── github/      # GitHub management tools
├── services/        # External service clients
│   ├── llm.ts       # OpenRouter LLM client
│   ├── github.ts    # GitHub API client
│   ├── search.ts    # Exa search client
│   └── citations.ts # Citation checking
├── db/              # Database client and queries
├── auth/            # Authentication middleware
├── transport/       # SSE transport implementation
└── config/          # Environment configuration
```

## Adding a New Tool

1. Create the tool file in the appropriate `tools/` subdirectory
2. Define the input/output schemas
3. Implement the handler function
4. Register in the module's `index.ts`
5. Add to `server.ts` tool registration
6. Add unit tests
7. Update documentation

Example:

```typescript
// apps/mcp-server/src/tools/core/my-tool.ts
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const myTool: Tool = {
  name: 'my_tool',
  description: 'Description of what the tool does',
  inputSchema: {
    type: 'object',
    properties: {
      param: { type: 'string', description: 'Parameter description' }
    },
    required: ['param']
  }
};

export async function handleMyTool(args: { param: string }) {
  // Implementation
  return { content: [{ type: 'text', text: 'Result' }] };
}
```

## Database Migrations

Migrations are in `supabase/migrations/`. To create a new migration:

1. Create a new SQL file with timestamp prefix
2. Write the migration SQL
3. Run `supabase db push` to apply locally
4. Commit the migration file

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass: `pnpm test`
4. Ensure linting passes: `pnpm lint`
5. Ensure build succeeds: `pnpm build`
6. Submit a pull request with a clear description

## Commit Messages

Use conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Code style (formatting, semicolons, etc)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat: add citation_trends tool for historical analysis`

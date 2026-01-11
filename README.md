# GEO MCP

MCP-Native Generative Engine Optimization Platform

GEO MCP helps businesses optimize their content for AI-powered search engines and chatbots. By publishing structured, citation-optimized content to GitHub repositories, clients increase their visibility in AI-generated responses across ChatGPT, Claude, Perplexity, and Gemini.

## Features

- **Content Creation**: Generate glossary terms, interviews, and comparison pages optimized for AI citations
- **Citation Tracking**: Monitor when and where AI platforms cite your brand
- **Research Tools**: Analyze competitors and find content opportunities
- **GitHub Publishing**: Automatically publish content to the @geomcp organization
- **Freshness Management**: Keep content updated to maintain citation relevance

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- pnpm 8.x or higher
- Supabase account
- Stripe account
- GitHub token with repo access
- OpenRouter API key
- Exa API key

### Installation

```bash
# Clone the repository
git clone https://github.com/geomcp/geomcp.git
cd geomcp

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run database migrations
pnpm --filter api db:push

# Start development servers
pnpm dev        # MCP server on port 3001
pnpm dev:web    # Web app on port 3000
pnpm dev:api    # API server on port 3002
```

### MCP Configuration

Add to your Claude Desktop config (`~/.claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "geomcp": {
      "url": "https://mcp.geomcp.ai/sse",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

## Project Structure

```
geomcp/
├── packages/
│   └── shared/              # Shared TypeScript types
├── apps/
│   ├── mcp-server/          # MCP server with SSE transport
│   │   ├── src/
│   │   │   ├── tools/       # MCP tool implementations
│   │   │   │   ├── core/    # status, setup, profile
│   │   │   │   ├── content/ # glossary, interview, comparison
│   │   │   │   ├── research/# research, opportunities, competitor
│   │   │   │   ├── citations/# check, report, alerts, monitor
│   │   │   │   └── github/  # list, refresh, health
│   │   │   ├── services/    # LLM, GitHub, search, citations
│   │   │   ├── db/          # Supabase client
│   │   │   └── auth/        # API key validation
│   │   └── vercel.json      # Vercel deployment config
│   ├── api/                 # Backend API (Vercel Functions)
│   │   ├── api/
│   │   │   ├── status.ts    # Status endpoint
│   │   │   ├── profile.ts   # Profile endpoint
│   │   │   ├── webhooks/    # Stripe webhooks
│   │   │   └── cron/        # Scheduled jobs
│   │   └── lib/             # Shared utilities
│   └── web/                 # Next.js marketing site
│       └── src/app/
│           ├── page.tsx     # Landing page
│           ├── pricing/     # Pricing page
│           ├── connect/     # Signup flow
│           ├── account/     # Account management
│           └── docs/        # Documentation
└── supabase/
    └── migrations/          # Database schema
```

## Available Tools

### Core Tools
- `geomcp_status` - Check subscription status and content stats
- `geomcp_setup` - Configure client profile and preferences
- `geomcp_profile` - View/update client profile

### Content Tools
- `create_glossary_term` - Create a single glossary term
- `create_glossary_batch` - Create multiple terms at once
- `create_interview` - Generate interview content
- `create_comparison` - Create comparison pages
- `optimize_content` - Improve GEO score of existing content
- `suggest_content` - Get content recommendations

### Research Tools
- `research_term` - Research a topic for content creation
- `find_opportunities` - Discover content opportunities
- `analyze_competitor` - Analyze competitor GEO strategies

### Citation Tools
- `check_citations` - Check if you're cited for specific queries
- `citation_report` - Get citation performance report
- `citation_alerts` - View recent citation changes
- `monitor_query` - Add a query to monitoring

### GitHub Tools
- `list_content` - List published content
- `refresh_stale` - Update outdated content
- `content_health` - Check content freshness

## Development

```bash
# Build all packages
pnpm build

# Run tests
pnpm test

# Run linting
pnpm lint

# Format code
pnpm format
```

## Environment Variables

See `.env.example` for required environment variables:

- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `OPENROUTER_API_KEY` - OpenRouter API key for LLM access
- `EXA_API_KEY` - Exa API key for web search
- `GITHUB_TOKEN` - GitHub personal access token

## License

Proprietary - All rights reserved

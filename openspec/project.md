# Project Context

## Purpose

GEO MCP is an MCP-native Generative Engine Optimization platform. The core thesis: **MCPs will replace traditional apps**—the AI assistant becomes the universal interface.

**What we build:** A suite of MCP tools (`@geomcp/mcp`) that give any AI assistant the capability to research, create, publish, and track GEO-optimized content. Clients subscribe to our service, and we publish optimized content to our own GitHub organization (`@geomcp`), building authority across industry-specific repositories where clients receive strategic mentions and citations.

**Key differentiator:** GEO MCP is NOT a SaaS with an MCP backend. GEO MCP IS the MCP. The AI chat IS the interface. No dashboards, no content studios—just capabilities accessible through natural conversation.

## Tech Stack

### MCP Server (Hosted)
- **Language:** TypeScript
- **Hosting:** Vercel (server-side, NOT user-installed)
- **Transport:** SSE (Server-Sent Events) for remote MCP connections
- **Protocol:** Model Context Protocol (MCP)
- **LLM Integration:** OpenRouter (default: Claude Sonnet)

**Important:** The MCP server is hosted by GEO MCP. Users do NOT install anything locally. They simply add our hosted MCP endpoint to their Claude Desktop configuration with their API key.

### Backend
- **Hosting:** Vercel
- **Database:** Supabase (Postgres)
- **Auth:** API Key authentication (not Supabase Auth for MCP)
- **Storage:** Supabase Storage
- **Edge Functions:** Supabase Edge Functions
- **Cron Jobs:** Vercel Cron

### Infrastructure
- **Domain:** geomcp.ai
- **DNS/CDN:** Cloudflare
- **Monitoring:** Sentry
- **Analytics:** PostHog

### External Services
- **Payments:** Stripe
- **GitHub:** GitHub API (repos, files, commits)
- **LLM (MCP):** OpenRouter → Claude Sonnet
- **Citation Checking:** OpenRouter → multiple models
- **Search/Research:** Exa or Tavily

## Project Conventions

### Code Style
- TypeScript with strict mode enabled
- Consistent naming: camelCase for variables/functions, PascalCase for types/interfaces
- MCP tool names use snake_case (e.g., `geomcp_status`, `create_glossary_term`)
- Prefer explicit types over inference for public APIs

### Architecture Patterns
- **Hosted MCP server:** Server runs on our infrastructure, users connect via SSE
- **MCP-first design:** All user-facing functionality exposed as MCP tools
- **Modular server structure:**
  ```
  apps/mcp-server/
  ├── src/
  │   ├── server.ts      # SSE MCP server entry point
  │   ├── auth/          # API key validation middleware
  │   ├── tools/
  │   │   ├── core/      # Status, setup, profile
  │   │   ├── content/   # Glossary, interview, comparison
  │   │   ├── research/  # Term research, opportunities
  │   │   ├── citations/ # Check, report, monitor
  │   │   └── github/    # List, refresh, health
  │   ├── services/      # LLM, search, GitHub integrations
  │   └── db/            # Supabase client
  ```
- **Category-based content organization:** Repos organized by industry/category, NOT by client
- **Minimal web presence:** Only landing, pricing, connect, account, and docs pages

### Testing Strategy
- Unit tests for MCP tool logic
- Integration tests for GitHub publishing and Supabase operations
- E2E tests for critical user flows (setup, content creation, citation checking)

### Git Workflow
- Feature branches off `main`
- Conventional commits recommended
- PRs require review before merge

## Domain Context

### Generative Engine Optimization (GEO)
GEO optimizes content to appear as sources and citations in AI-generated responses from ChatGPT, Claude, Perplexity, Google AI Overviews, and Gemini.

**Key difference from SEO:**
- SEO optimizes for clicks from search engine results pages
- GEO optimizes for citations within AI-generated responses

### Citation Factors
| Factor | Impact |
|--------|--------|
| Structured content (H2→H3→bullets) | +40% citation likelihood |
| Freshness (<30 days) | +3.2x citations |
| Original data tables | +4.1x citations |
| FAQ/Article schema | +28% citations |
| Direct answer in opening | +67% citations |

### Platform-Specific Behaviors
| Platform | Preferences | Best Content Type |
|----------|-------------|-------------------|
| **ChatGPT** | Depth, encyclopedic style, Wikipedia-like neutrality | Comprehensive guides, definitions |
| **Claude** | Accuracy, careful verification, authoritative sources | Well-researched, fact-dense content |
| **Perplexity** | Freshness (under 30 days), community sources | Recent content, Reddit-style discussions |
| **Google AI Overviews** | Existing top-10 Google rankings | SEO-optimized content that already ranks |

### Content Types
1. **Industry Glossary Terms** — Comprehensive definitions with expert quotes and client mentions
2. **Expert Interviews** — Structured Q&A with industry leaders (often client executives)
3. **Comparison Pages** — Product/concept comparisons in table format
4. **Research Reports** — Annual/quarterly reports with original data

### Client Mention Guidelines
- Maximum 1-2 client mentions per glossary term
- Mentions must be contextually relevant
- Mix with non-client companies (60% non-client / 40% client)
- Expert quotes must be genuine and attributable

## Important Constraints

### Business Model
- **Single pricing tier:** €1,500/month
- **Content ownership:** We own and manage all GitHub repositories
- **No per-client repos:** Content organized by category/industry, not by client (prevents looking like paid placement)

### Content Quality
- Every piece of content must stand alone as genuinely useful
- Provide accurate, well-researched information
- Include proper citations and sources
- Update within 30 days (freshness is critical for citations)
- Follow consistent formatting

### Technical Requirements
- Content must be GEO-optimized (direct answers in first 40-60 words, structured headings, statistics every 150-200 words)
- All content published to `@geomcp` GitHub organization
- Version history via Git commits adds credibility signals

## External Dependencies

| Service | Purpose | Notes |
|---------|---------|-------|
| **Supabase** | Database, Auth, Storage, Edge Functions | Primary backend infrastructure |
| **Vercel** | Hosting, Cron jobs | Serverless deployment |
| **Stripe** | Subscription billing | Monthly billing at €1,500/month |
| **GitHub API** | Content publishing | Repos, files, commits to @geomcp org |
| **OpenRouter** | LLM access | Claude Sonnet for content generation |
| **Exa/Tavily** | Search/Research | For term research and opportunity finding |
| **Cloudflare** | DNS, CDN | Domain and content delivery |
| **Sentry** | Error monitoring | Production error tracking |
| **PostHog** | Analytics | Usage analytics |

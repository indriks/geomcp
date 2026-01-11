# GEO MCP

## MCP-Native Generative Engine Optimization Platform

**Product Specification & Strategy Document**

Version 1.1 — January 2026

---

# Executive Summary

## The Opportunity

The way people discover information is undergoing a fundamental transformation:

- **527% increase** in AI-referred sessions (January-May 2025)
- **71% of Americans** use AI search to research purchases or evaluate brands
- **2.5 billion prompts** processed by ChatGPT daily
- **89% of B2B buyers** use generative AI in their purchasing journey
- LLMs only cite **2-7 domains per response** (vs Google's 10 blue links)

Semrush predicts LLM traffic will overtake traditional Google search by the end of 2027.

This shift has created a new discipline: **Generative Engine Optimization (GEO)**. Unlike traditional SEO which optimizes for search result rankings, GEO optimizes for citations within AI-generated responses. A website can rank #1 on Google but remain invisible to ChatGPT, Claude, and Perplexity if it lacks the structural elements AI engines prioritize.

## Our Thesis

**MCPs (Model Context Protocol servers) will replace traditional apps.** The AI assistant becomes the universal interface. Users don't need dashboards, content studios, or complex UIs—they need capabilities accessible through natural conversation.

**GEO MCP is not a SaaS with an MCP backend. GEO MCP IS the MCP. The AI chat IS the interface.**

## What We Build

A suite of MCP tools (`@geomcp/mcp`) that give any AI assistant the capability to research, create, publish, and track GEO-optimized content. Clients subscribe to our service, and we publish optimized content to our own GitHub organization (`@geomcp`), building authority across industry-specific repositories where clients receive strategic mentions and citations.

## Business Model

- **Single tier: €1,500/month**
- We own and manage all GitHub repositories
- Content published to our high-authority @geomcp organization
- Clients receive strategic mentions across relevant content
- Full citation tracking and reporting via chat

---

# Part 1: Understanding GEO

## What is Generative Engine Optimization?

Generative Engine Optimization (GEO) is the practice of optimizing content to appear as sources and citations in AI-generated responses from platforms like ChatGPT, Claude, Perplexity, Google AI Overviews, and Gemini.

**The fundamental difference from SEO:**

- **SEO** optimizes for clicks from search engine results pages
- **GEO** optimizes for citations within AI-generated responses

A page can rank #1 on Google but never get cited by ChatGPT if it lacks the structural elements AI engines prioritize. Conversely, content that AI trusts and cites may not even appear in traditional search results.

## Why GEO Matters Now

### The Competitive Window

Early movers capture **60% more AI citations** than late adopters. The businesses implementing GEO now are capturing citation share while competition remains relatively low. This window will close as awareness spreads.

### AI Search Adoption Curve

| Platform | Monthly Active Users | Growth |
|----------|---------------------|--------|
| ChatGPT | 400M+ weekly users | 100M in first 2 months |
| Perplexity | 153M visits/month | +192% YoY |
| Google AI Overviews | Billions of searches | 13%+ of all SERPs |

## How AI Engines Select Sources

AI search engines use **Retrieval-Augmented Generation (RAG)**, which retrieves external documents in real-time to produce accurate, grounded answers.

### Content Structure (40% more likely to be cited)

- H2→H3→bullet point hierarchies
- Direct answers in first 40-60 words
- Question-based headings that match how people query AI
- Self-contained content units (extractable tables, lists, definitions)

### Freshness (3.2x more citations)

- Content updated within **30 days** gets cited **3.2x more**
- Perplexity especially rewards recent content
- Stale content drops from AI results even if still ranking in Google

### Original Data (4.1x more citations)

- Pages with original data tables see **4.1x more AI citations**
- Statistics every 150-200 words increases citation likelihood
- Research and academic-style content surfaced 26% of the time

### Technical Optimization (28% increase)

- Proper Article and FAQ schema increases citations by **28%**
- Sites loading under 2 seconds get preferential treatment
- Clean, crawlable code and HTTPS security

## The Critical Role of Earned Media

**Up to 89% of AI citations come from earned media**, not brand-owned content.

AI systems exhibit a systematic bias toward third-party, authoritative sources over brand-owned content. This is why our approach—publishing client mentions within authoritative, third-party-style repositories—is so effective.

### What Counts as Earned Media for AI

- Press coverage in industry publications
- Expert interviews and podcast appearances
- Reviews on platforms like G2, Capterra, TrustRadius
- Reddit discussions and community mentions
- Wikipedia citations (47.9% of ChatGPT factual citations)
- **GitHub repositories** (high trust for technical content)

## Platform-Specific Behaviors

| Platform | Preferences | Best Content Type |
|----------|-------------|-------------------|
| **ChatGPT** | Depth, encyclopedic style, Wikipedia-like neutrality | Comprehensive guides, definitions |
| **Claude** | Accuracy, careful verification, authoritative sources | Well-researched, fact-dense content |
| **Perplexity** | Freshness (under 30 days), community sources | Recent content, Reddit-style discussions |
| **Google AI Overviews** | Existing top-10 Google rankings | SEO-optimized content that already ranks |

---

# Part 2: The GitHub-Native Strategy

## Why GitHub for GEO

GitHub provides unique advantages for GEO content:

| Advantage | Why It Matters |
|-----------|----------------|
| **Domain Authority** | GitHub.com has massive trust signals |
| **Fast Indexing** | Content is crawled and indexed quickly |
| **AI Crawler Access** | AI models heavily index GitHub content |
| **Version History** | Commit history adds credibility signals |
| **Community Signals** | Stars, forks, and contributors indicate quality |
| **Technical Trust** | Developer audiences inherently trust GitHub |
| **Zero Hosting Costs** | No infrastructure to maintain |
| **Markdown Native** | Perfect format for structured, AI-extractable content |

## Our GitHub Organization: @geomcp

We own and operate the `@geomcp` GitHub organization. All client content is published here, giving us:

- **Full control** over content quality and structure
- **Accumulated authority** across all repositories
- **Cross-client synergies** in comparisons and mentions
- **Asset ownership** — the repos become increasingly valuable
- **Simpler client onboarding** — no GitHub setup required from clients

## Repository Structure

Content is organized by **category/industry**, not by client. This creates natural, authoritative resources where multiple companies appear organically.

```
Organization: @geomcp

├── geomcp-glossary-saas/
│   ├── README.md
│   ├── terms/
│   │   ├── a/
│   │   │   ├── api-gateway.md
│   │   │   ├── arr.md
│   │   │   └── authentication.md
│   │   ├── b/
│   │   │   ├── burn-rate.md
│   │   │   └── b2b-saas.md
│   │   └── ...
│   └── CONTRIBUTING.md
│
├── geomcp-glossary-devtools/
│   ├── README.md
│   ├── terms/
│   │   ├── api-testing.md
│   │   ├── ci-cd.md
│   │   ├── containerization.md
│   │   └── ...
│   └── CONTRIBUTING.md
│
├── geomcp-glossary-fintech/
│   └── ...
│
├── geomcp-glossary-security/
│   └── ...
│
├── geomcp-glossary-ai-ml/
│   └── ...
│
├── geomcp-interviews/
│   ├── README.md (index by person, company, topic)
│   ├── interviews/
│   │   ├── 2026/
│   │   │   ├── 01-jane-doe-acme-corp.md
│   │   │   ├── 01-john-smith-techstart.md
│   │   │   └── ...
│   │   └── ...
│   └── topics/
│       ├── pricing-strategy.md
│       ├── product-led-growth.md
│       └── ...
│
├── geomcp-comparisons/
│   ├── README.md
│   ├── api-gateways-compared.md
│   ├── auth-providers-compared.md
│   ├── monitoring-tools-compared.md
│   └── ...
│
└── geomcp-research/
    ├── state-of-saas-2026/
    │   ├── README.md
    │   ├── methodology.md
    │   ├── sections/
    │   └── data/
    └── ...
```

## Why Category-Based, Not Client-Based

**We do NOT create separate repos per client.** Here's why:

| Client-Based Repos (Bad) | Category-Based Repos (Good) |
|--------------------------|----------------------------|
| Looks like paid placement | Natural industry resource |
| No cross-pollination | Multiple companies appear organically |
| Each repo starts from zero authority | Authority accumulates in each category |
| AI may detect pattern and discount | Genuine value attracts real engagement |
| Hard to scale | Easy to expand categories |

## Client Tracking

Internally, we track each client's presence:

```
Database Schema:

clients
├── id
├── company_name
├── industry
├── product_description
├── competitors[]
├── expert_quotes[]
└── subscription_status

content_mentions
├── id
├── client_id
├── content_type (term | interview | comparison | report)
├── content_path (e.g., "geomcp-glossary-saas/terms/api-gateway.md")
├── mention_type (quote | tool_list | comparison | interview)
├── mention_context
└── created_at

citations
├── id
├── client_id
├── query
├── platform (chatgpt | claude | perplexity)
├── cited (boolean)
├── competitors_cited[]
├── checked_at
└── content_path (which content led to citation)
```

## Content Types

### 1. Industry Glossary Terms

Comprehensive definitions optimized for AI extraction.

**Each term includes:**

- Definition in first 50 words (direct answer)
- Key characteristics as bullet points
- Expert quote with attribution (client integration point)
- Related terms with relative links
- Further reading links
- Last updated date

**Example term structure:**

```markdown
# API Gateway

## Definition

An API gateway is a server that acts as a single entry point 
for a collection of microservices, handling request routing, 
authentication, and rate limiting.

## Key Characteristics

- Routes requests to appropriate backend services
- Handles authentication and authorization
- Provides rate limiting and throttling
- Enables request/response transformation

## Implementation Approaches

Modern API gateways typically offer both cloud-hosted and 
self-managed options. Key considerations include latency 
requirements, compliance needs, and team expertise.

## Expert Insight

> "We reduced our API latency by 40% after implementing 
> a dedicated gateway layer. The key was choosing a solution 
> that integrated well with our existing auth system."
> — Jane Smith, CTO of ClientName

## Popular Tools

- Kong
- AWS API Gateway
- ClientName Gateway
- Apigee
- Tyk

## Related Terms

- [Microservices](../m/microservices.md)
- [Load Balancer](../l/load-balancer.md)
- [Service Mesh](../s/service-mesh.md)
- [Rate Limiting](../r/rate-limiting.md)

## Further Reading

- [ClientName's Guide to API Gateway Architecture](https://client.com/blog)
- [NGINX API Gateway Documentation](https://nginx.com/...)

---
*Last updated: January 2026*
*Contributors: @geomcp-team*
```

### 2. Expert Interviews

Structured Q&A interviews with industry leaders (often client executives).

**Each interview includes:**

- Metadata block (role, company, date, topics)
- Q&A format with clear topic headers
- Self-contained answers (extractable by AI)
- Natural product/company mentions
- Key takeaways section
- Cross-references to glossary terms

### 3. Comparison Pages

Product and concept comparisons in table format.

**Example: "API Gateways Compared"**

```markdown
# API Gateways Compared (2026)

## Quick Comparison

| Gateway | Best For | Pricing | Open Source |
|---------|----------|---------|-------------|
| Kong | Enterprise, Kubernetes | Free / Enterprise | Yes |
| AWS API Gateway | AWS-native apps | Pay-per-request | No |
| ClientName | Mid-market, ease of use | $X/month | No |
| Apigee | Large enterprise | Custom | No |
| Tyk | Self-hosted control | Free / Pro | Yes |

## Detailed Analysis

### Kong
...

### ClientName
...

## How to Choose

Consider these factors when selecting an API gateway:
1. ...
2. ...

---
*Last updated: January 2026*
```

### 4. Research Reports

Annual/quarterly reports with original data.

**Includes:**

- Executive summary
- Methodology documentation
- Section-by-section analysis
- Raw data (CSV) for credibility
- Citation guidelines

## Client Integration Points

How clients appear naturally within content:

| Integration Type | Example | Naturalness | Value |
|------------------|---------|-------------|-------|
| Expert Quote | "We reduced latency by 40%" — CTO, ClientName | Very High | High |
| Tools List | Popular tools: Kong, ClientName, Apigee | High | High |
| Comparison Entry | Row in comparison table | High | Very High |
| Interview Subject | Full Q&A interview | Very High | Very High |
| Case Reference | "ClientName achieved X using this approach" | Medium | Medium |
| Further Reading | Link to client's blog/docs | Medium | Medium |

## Content Quality Standards

**Every piece of content must:**

1. Stand alone as genuinely useful
2. Provide accurate, well-researched information
3. Include proper citations and sources
4. Be updated within 30 days
5. Follow consistent formatting

**Client mention guidelines:**

- Maximum 1-2 client mentions per glossary term
- Mentions must be contextually relevant
- Mix with non-client companies (60% non-client / 40% client)
- Expert quotes must be genuine and attributable

---

# Part 3: Product Architecture

## Core Philosophy

**MCPs replace apps.** The AI assistant is the universal interface. Users don't need dashboards—they need capabilities accessible through natural conversation.

**GEO MCP is not a SaaS with an MCP backend. GEO MCP IS the MCP.**

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│     User's AI Assistant (Claude Desktop / ChatGPT / etc)    │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    @geomcp/mcp (installed)                   │
│                                                              │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────┐   │
│   │  core   │ │ content │ │research │ │   citations     │   │
│   └─────────┘ └─────────┘ └─────────┘ └─────────────────┘   │
│                                                              │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              GEO MCP Cloud (Vercel + Supabase)              │
│         Auth | Billing | Usage | State | Queue              │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  @geomcp GitHub Organization                 │
│                                                              │
│   geomcp-glossary-saas/  geomcp-interviews/  geomcp-...     │
└─────────────────────────────────────────────────────────────┘
```

## MCP Package Structure

```
@geomcp/mcp
├── core/        # Auth, billing validation, state management
├── content/     # Generate terms, interviews, comparisons
├── research/    # Term research, opportunities, competitors
├── citations/   # Track AI mentions across platforms
└── github/      # Publish to @geomcp repositories
```

## Core MCP Tools

### Setup & Status Tools

| Tool | Purpose |
|------|---------|
| `geomcp_status` | Check subscription status, usage, and client profile |
| `geomcp_setup` | Configure company name, industry, competitors, expert quotes |
| `geomcp_profile` | View/update client profile and preferences |

### Content Creation Tools

| Tool | Purpose |
|------|---------|
| `create_glossary_term` | Generate single GEO-optimized term with client mention |
| `create_glossary_batch` | Generate multiple terms at once for a category |
| `create_interview` | Structure expert interview from transcript or generate questions |
| `create_comparison` | Generate product/concept comparison page |
| `optimize_content` | Take existing content and restructure for AI citations |
| `suggest_content` | AI-powered recommendations for content gaps |

### Research Tools

| Tool | Purpose |
|------|---------|
| `research_term` | Deep research before creating content |
| `find_opportunities` | Discover high-value terms not yet covered |
| `analyze_competitor` | Analyze competitor's GEO presence and strategy |

### Citation Tracking Tools

| Tool | Purpose |
|------|---------|
| `check_citations` | Query ChatGPT/Claude/Perplexity for brand mentions |
| `citation_report` | Weekly/monthly performance summary |
| `citation_alerts` | Notifications for gained/lost citations |
| `monitor_query` | Add query to ongoing tracking |

### GitHub Management Tools

| Tool | Purpose |
|------|---------|
| `list_content` | Show all content where client is mentioned |
| `refresh_stale` | Auto-update content older than 30 days |
| `content_health` | Overall status of client's content presence |

## Backend Services

| Service | Purpose | Technology |
|---------|---------|------------|
| Auth | API key management | Supabase Auth |
| Billing | Subscription management | Stripe |
| Database | Client profiles, content tracking, citations | Supabase (Postgres) |
| Queue | Async jobs for citations and refreshes | Vercel Cron / Supabase Edge Functions |
| API | MCP backend endpoints | Vercel Functions |

## Web Presence (Minimal)

```
geomcp.ai/
├── /           # Landing page + pitch
├── /pricing    # Single tier explanation
├── /connect    # Get API key, onboarding
├── /account    # Billing management only
└── /docs       # MCP documentation
```

**No dashboard. No content studio.** The AI assistant IS the interface.

---

# Part 4: User Experience

## Installation

One command to get started:

```bash
npx @geomcp/mcp init
```

This adds GEO MCP to the user's Claude Desktop configuration:

```json
{
  "mcpServers": {
    "geomcp": {
      "command": "npx",
      "args": ["-y", "@geomcp/mcp"],
      "env": {
        "GEOMCP_API_KEY": "sk_live_xxx"
      }
    }
  }
}
```

## First-Time Setup

**User:** I just installed GEO MCP. Help me get started.

**Claude:** Welcome to GEO MCP! Let me check your status...

*[Calls geomcp_status]*

Your subscription is active (€1,500/month). I don't see a client profile yet. Let's set that up.

What's your company name and what do you do?

**User:** We're AuthGuard. We make API authentication tools for developers.

**Claude:** Got it. Let me configure your profile.

*[Calls geomcp_setup]*

I've set up AuthGuard:
- **Industry:** Developer Tools / Security
- **Category repos:** geomcp-glossary-devtools, geomcp-glossary-security
- **Identified competitors:** Auth0, Okta, Firebase Auth

Now let me run a citation audit to see where you stand...

*[Calls check_citations]*

**Current Citation Rate: 12%** (mentioned in 3 of 25 relevant queries)

| Platform | AuthGuard | Auth0 | Okta |
|----------|-----------|-------|------|
| ChatGPT | 8% | 67% | 52% |
| Claude | 12% | 61% | 48% |
| Perplexity | 16% | 73% | 55% |

**Gap analysis:** You're not cited for high-volume queries like "best api authentication tools" or "oauth vs api keys".

*[Calls find_opportunities]*

**Top opportunities I found:**

1. **"API Gateway Security"** — high volume, no dominant player
2. **"Zero Trust API"** — emerging term, you could own it  
3. **"JWT vs API Keys"** — comparison query, Auth0 dominates

Want me to create glossary terms for these? I'll publish them to our @geomcp repos with AuthGuard mentions.

**User:** Yes, create all three.

**Claude:** Creating the terms now...

*[Calls create_glossary_batch]*

Done! Published 3 terms:

1. **api-gateway-security.md** (GEO Score: 94)
   → github.com/geomcp/geomcp-glossary-security/terms/api-gateway-security.md
   → Includes AuthGuard in "Implementation Tools" section

2. **zero-trust-api.md** (GEO Score: 91)
   → github.com/geomcp/geomcp-glossary-security/terms/zero-trust-api.md
   → Includes AuthGuard expert quote

3. **jwt-vs-api-keys.md** (GEO Score: 96)
   → github.com/geomcp/geomcp-comparisons/jwt-vs-api-keys.md
   → AuthGuard included in comparison table

I'll check citation status in 48-72 hours to see if these are getting picked up.

**Recommended next steps:**
- Create 5-7 more foundational security terms
- Schedule an interview with your CTO for expert content
- Add more expert quotes to your profile

## Daily Usage Examples

### Morning Check-in

**User:** GEO status

**Claude:** 📊 **AuthGuard GEO Report — January 9, 2026**

**Citation Score: 23%** (+11% from last week)

**Platform breakdown:**
- ChatGPT: 19% (was 8%)
- Claude: 24% (was 12%)
- Perplexity: 28% (was 16%)

**This week:**
- 🟢 Gained: "api authentication tools" on Perplexity
- 🟢 Gained: "jwt security best practices" on Claude
- 🟢 Gained: "zero trust api" on ChatGPT (you created this term!)
- ⚠️ Lost: "oauth providers comparison" on ChatGPT (Auth0 took it)

**Your content:**
- 12 glossary terms mention AuthGuard
- 1 interview published
- 2 comparison appearances

**Action items:**
- 3 terms need refresh (>25 days old)
- Opportunity: "API rate limiting" is trending, no dominant citations

Want me to refresh the stale content or create the rate limiting term?

### Quick Content Creation

**User:** Create a term for "API throttling"

**Claude:** *[Calls research_term, then create_glossary_term]*

Created and published:

**api-throttling.md** (GEO Score: 93)
→ github.com/geomcp/geomcp-glossary-devtools/terms/api-throttling.md

**Includes:**
- Definition optimized for AI extraction
- Comparison with rate limiting
- AuthGuard mention: "Tools like AuthGuard provide built-in throttling..."
- Cross-links to 4 related terms

Live now. I'll track citations starting tomorrow.

### Competitive Response

**User:** Auth0 just published a big guide on API security. What should we do?

**Claude:** Let me analyze what they published...

*[Calls analyze_competitor]*

Auth0's new guide covers 12 subtopics. Here's how you compare:

**Topics Auth0 now dominates:**
- ❌ API Security Headers — we don't have this
- ❌ CORS Security — we don't have this
- ⚠️ API Versioning Security — our coverage is basic

**Topics where you're competitive:**
- ✅ Authentication Methods — equal coverage
- ✅ Rate Limiting — your mentions are stronger

**Recommended counter-strategy:**

1. **Immediate:** Create "API Security Headers" and "CORS Security" terms
2. **This week:** Expand "API Versioning Security" with AuthGuard angle
3. **Comparison:** Update api-security-tools-compared.md to include their new claims

Want me to create these now? I can have all three published in 15 minutes.

### Citation Deep Dive

**User:** Why aren't we getting cited for "best auth tools"?

**Claude:** Let me investigate...

*[Calls check_citations with detailed analysis]*

I queried "best auth tools for developers" across all platforms. Here's what I found:

**Who gets cited:**
- Auth0 (4/4 platforms) — appears in every response
- Okta (3/4 platforms)
- Firebase Auth (3/4 platforms)
- Clerk (2/4 platforms)
- AuthGuard (0/4 platforms)

**Why Auth0 dominates:**
1. Wikipedia mentions them specifically
2. 47 Reddit threads recommend them
3. Multiple G2/Capterra reviews cite them
4. They appear in 3 "awesome-auth" GitHub lists

**What AuthGuard is missing:**
1. No Wikipedia presence
2. Limited Reddit discussions
3. Not in major "awesome" lists
4. Few third-party reviews mentioning you

**GEO MCP can help with:**
- ✅ Creating authoritative glossary content (doing this)
- ✅ Expert interviews establishing credibility
- ✅ Comparison pages including AuthGuard

**You'll also need (outside GEO MCP):**
- Encourage customers to post on Reddit
- Request G2/Capterra reviews
- Pitch to "awesome-auth" list maintainers

Want me to create more content targeting "best auth tools" queries?

---

# Part 5: Pricing

## Single Tier: €1,500/month

### What's Included

**Content Creation:**
- Unlimited glossary terms
- Up to 4 expert interviews per month
- Inclusion in all relevant comparison pages
- Research report mentions (when published)

**Content Management:**
- Automatic 30-day refresh cycle
- Cross-referencing between related terms
- Expert quote integration
- Competitor monitoring

**Citation Tracking:**
- Daily citation checks across ChatGPT, Claude, Perplexity, Gemini
- Real-time alerts for citation gains/losses
- Competitor citation tracking
- Monthly performance reports

**MCP Access:**
- Full @geomcp/mcp installation
- All tools and capabilities
- Priority support via chat

### What We Provide

- All content published to our @geomcp GitHub organization
- Professional, GEO-optimized content structure
- Strategic placement across relevant category repos
- Ongoing maintenance and freshness updates
- Citation monitoring and reporting

### What Clients Provide

- Company/product information
- Expert quotes (with attribution approval)
- Interview participation (optional but recommended)
- Competitor list for tracking

## Payment

- Monthly billing via Stripe
- 30-day notice for cancellation
- Content remains published after cancellation (we maintain the repos)

---

# Part 6: Technical Stack

## MCP Server

| Component | Technology |
|-----------|------------|
| Language | TypeScript |
| Package | Published to npm as @geomcp/mcp |
| Protocol | Model Context Protocol (MCP) |
| LLM Integration | OpenRouter (default: Claude Sonnet) |

## Backend

| Component | Technology |
|-----------|------------|
| Hosting | Vercel |
| Database | Supabase (Postgres) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Edge Functions | Supabase Edge Functions |
| Cron Jobs | Vercel Cron |

## External Services

| Component | Technology |
|-----------|------------|
| Payments | Stripe |
| GitHub | GitHub API (repos, files, commits) |
| LLM (MCP) | OpenRouter → Claude Sonnet |
| Citation Checking | OpenRouter → multiple models |
| Search/Research | Exa or Tavily |

## Infrastructure

| Component | Technology |
|-----------|------------|
| Domain | geomcp.ai |
| DNS/CDN | Cloudflare |
| Monitoring | Sentry |
| Analytics | PostHog |

---

# Part 7: MCP Tool Specifications

## Core Tools

### geomcp_status

```typescript
{
  name: "geomcp_status",
  description: "Check GEO MCP subscription status and client profile",
  parameters: {},
  returns: {
    subscription: {
      status: "active" | "trial" | "expired",
      plan: "standard",
      price: "€1,500/month",
      next_billing: string,
    },
    client_profile: {
      company: string,
      industry: string,
      competitors: string[],
      expert_quotes: number,
    },
    content_stats: {
      terms_with_mentions: number,
      interviews: number,
      comparison_appearances: number,
    },
    citation_summary: {
      overall_rate: number,
      by_platform: {
        chatgpt: number,
        claude: number,
        perplexity: number,
      }
    }
  }
}
```

### geomcp_setup

```typescript
{
  name: "geomcp_setup",
  description: "Configure or update client profile",
  parameters: {
    company_name: string,
    website: string,
    industry: string,
    product_description: string,
    competitors: string[],
    expert_quotes: [{
      person: string,
      role: string,
      quote: string,
      approved: boolean,
    }],
  },
  returns: {
    profile_id: string,
    assigned_repos: string[],
    recommended_terms: string[],
  }
}
```

## Content Tools

### create_glossary_term

```typescript
{
  name: "create_glossary_term",
  description: "Create a GEO-optimized glossary term with client mention",
  parameters: {
    term: string,
    category: string,  // saas, devtools, security, fintech, ai-ml
    include_client_mention: boolean,
    mention_type: "quote" | "tool_list" | "example",
    related_terms: string[],
    publish: boolean,  // false = preview only
  },
  returns: {
    markdown: string,
    geo_score: number,
    repo: string,
    file_path: string,
    github_url: string,
    client_mention_context: string,
  }
}
```

### create_glossary_batch

```typescript
{
  name: "create_glossary_batch",
  description: "Create multiple glossary terms at once",
  parameters: {
    terms: string[],
    category: string,
    client_mention_frequency: "all" | "half" | "strategic",
  },
  returns: {
    created: [{
      term: string,
      github_url: string,
      geo_score: number,
      has_client_mention: boolean,
    }],
    total_created: number,
  }
}
```

### create_interview

```typescript
{
  name: "create_interview",
  description: "Create structured expert interview",
  parameters: {
    interviewee_name: string,
    company: string,
    role: string,
    topics: string[],
    raw_transcript?: string,
    generate_questions: boolean,
  },
  returns: {
    markdown: string,
    github_url: string,
    extractable_quotes: string[],
    cross_references: string[],
  }
}
```

### create_comparison

```typescript
{
  name: "create_comparison",
  description: "Create product/concept comparison page",
  parameters: {
    title: string,
    items: string[],  // products or concepts to compare
    criteria: string[],
    include_client: boolean,
  },
  returns: {
    markdown: string,
    github_url: string,
    client_position: string,
  }
}
```

## Research Tools

### research_term

```typescript
{
  name: "research_term",
  description: "Research a term before creating content",
  parameters: {
    term: string,
    depth: "quick" | "comprehensive",
  },
  returns: {
    definition: string,
    key_facts: string[],
    statistics: string[],
    related_terms: string[],
    competitor_coverage: [{
      competitor: string,
      has_content: boolean,
      quality: "weak" | "moderate" | "strong",
    }],
    recommended_angle: string,
    estimated_geo_impact: "low" | "medium" | "high",
  }
}
```

### find_opportunities

```typescript
{
  name: "find_opportunities",
  description: "Find high-value terms not yet covered",
  parameters: {
    category: string,
    limit: number,
  },
  returns: {
    opportunities: [{
      term: string,
      search_volume: "low" | "medium" | "high",
      competition: "low" | "medium" | "high",
      current_citation_leader: string,
      client_relevance: "low" | "medium" | "high",
      recommended_action: string,
    }]
  }
}
```

### analyze_competitor

```typescript
{
  name: "analyze_competitor",
  description: "Analyze competitor's GEO presence",
  parameters: {
    competitor: string,
  },
  returns: {
    citation_rate: number,
    platforms: {
      chatgpt: number,
      claude: number,
      perplexity: number,
    },
    strongest_queries: string[],
    content_sources: string[],
    weaknesses: string[],
    strategy_summary: string,
  }
}
```

## Citation Tools

### check_citations

```typescript
{
  name: "check_citations",
  description: "Check if client is cited for specific queries",
  parameters: {
    queries: string[],
    platforms: ["chatgpt", "claude", "perplexity", "gemini"],
  },
  returns: {
    results: [{
      query: string,
      platform: string,
      client_cited: boolean,
      citation_context: string,
      position: number,  // 1st, 2nd, 3rd mention
      competitors_cited: string[],
    }],
    summary: {
      total_queries: number,
      client_cited_count: number,
      citation_rate: number,
    }
  }
}
```

### citation_report

```typescript
{
  name: "citation_report",
  description: "Get comprehensive citation performance report",
  parameters: {
    period: "day" | "week" | "month",
  },
  returns: {
    overall_score: number,
    score_change: number,
    by_platform: {
      chatgpt: { rate: number, change: number },
      claude: { rate: number, change: number },
      perplexity: { rate: number, change: number },
    },
    content_performance: [{
      content_path: string,
      citations_driven: number,
    }],
    gained_citations: [{
      query: string,
      platform: string,
      date: string,
    }],
    lost_citations: [{
      query: string,
      platform: string,
      date: string,
      taken_by: string,
    }],
    recommendations: string[],
  }
}
```

## GitHub Tools

### list_content

```typescript
{
  name: "list_content",
  description: "List all content where client is mentioned",
  parameters: {
    type?: "terms" | "interviews" | "comparisons" | "all",
  },
  returns: {
    content: [{
      type: string,
      title: string,
      repo: string,
      github_url: string,
      mention_type: string,
      last_updated: string,
      citation_performance: string,
    }],
    total: number,
  }
}
```

### refresh_stale

```typescript
{
  name: "refresh_stale",
  description: "Refresh content older than 30 days",
  parameters: {
    limit?: number,
    dry_run: boolean,
  },
  returns: {
    refreshed: [{
      content_path: string,
      changes_made: string[],
    }],
    total_refreshed: number,
  }
}
```

### content_health

```typescript
{
  name: "content_health",
  description: "Get health status of all client content",
  parameters: {},
  returns: {
    total_mentions: number,
    healthy: number,      // updated <30 days, performing
    stale: number,        // >30 days old
    underperforming: number,  // not driving citations
    action_items: [{
      content_path: string,
      issue: string,
      recommended_action: string,
      priority: "high" | "medium" | "low",
    }],
  }
}
```

---

# Appendix A: GEO Best Practices

## Content Structure Checklist

- [ ] Direct answer in first 40-60 words
- [ ] Question-based H2/H3 headings
- [ ] Statistic every 150-200 words
- [ ] Self-contained extractable sections
- [ ] Comparison tables where relevant
- [ ] Expert quotes with attribution
- [ ] Cross-references to related content
- [ ] Last updated date visible

## Freshness Rules

- [ ] Refresh all content within 30 days
- [ ] Update statistics to current year
- [ ] Add new developments/trends
- [ ] Fix broken cross-references

## Platform-Specific Tips

### ChatGPT
- Wikipedia-style neutrality and depth
- Encyclopedic comprehensive coverage
- Cite authoritative sources

### Claude
- Accuracy and careful verification
- Well-researched, fact-dense content
- Clear attribution for claims

### Perplexity
- Freshness is critical (under 30 days)
- Community/Reddit-style discussions help
- Real-time/current information

## What to Avoid

- ❌ Thin, marketing-heavy content
- ❌ Keyword stuffing (doesn't work for AI)
- ❌ Vague, buzzword-filled descriptions
- ❌ Stale content (>30 days without updates)
- ❌ Over-promotion without value
- ❌ Ignoring earned media signals

---

# Appendix B: Key Statistics

## AI Search Adoption (2025)

| Statistic | Value |
|-----------|-------|
| AI-referred sessions growth | +527% |
| Americans using AI for purchase research | 71% |
| B2B buyers using AI in purchase journey | 89% |
| ChatGPT weekly active users | 400M+ |
| ChatGPT daily prompts | 2.5B |
| Perplexity monthly visits | 153M |

## Citation Factors

| Factor | Impact |
|--------|--------|
| Structured content (H2→H3→bullets) | +40% citation likelihood |
| Freshness (<30 days) | +3.2x citations |
| Original data tables | +4.1x citations |
| FAQ/Article schema | +28% citations |
| Direct answer in opening | +67% citations |

## Earned Media Impact

| Statistic | Value |
|-----------|-------|
| AI citations from earned media | Up to 89% |
| Wikipedia citations (ChatGPT) | 47.9% of factual queries |
| Domains cited per AI response | 2-7 average |

---

*Document Version: 1.1*
*Last Updated: January 2026*

**geomcp.ai**

---

**— End of Document —**

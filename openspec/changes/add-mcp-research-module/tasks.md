# Tasks: MCP Research Module

## 1. Search Integration

- [x] 1.1 Create `apps/mcp-server/src/services/search.ts` for web search
- [x] 1.2 Implement Exa API client (primary)
- [x] 1.3 Implement Tavily API client (fallback)
- [x] 1.4 Add `EXA_API_KEY` / `TAVILY_API_KEY` environment handling
- [x] 1.5 Create unified search interface abstracting provider
- [x] 1.6 Implement search result normalization

## 2. Research Cache

- [x] 2.1 Create research caching mechanism
- [x] 2.2 Implement term research caching (TTL: 24 hours)
- [x] 2.3 Implement competitor analysis caching (TTL: 12 hours)
- [x] 2.4 Add cache invalidation triggers

## 3. research_term Tool

- [x] 3.1 Create `apps/mcp-server/src/tools/research/term.ts`
- [x] 3.2 Define input schema
- [x] 3.3 Define output schema
- [x] 3.4 Implement quick research (web search + LLM synthesis)
- [x] 3.5 Implement comprehensive research (multiple searches, deeper analysis)
- [x] 3.6 Add competitor content detection logic
- [x] 3.7 Register tool with MCP server
- [x] 3.8 Add unit tests

## 4. find_opportunities Tool

- [x] 4.1 Create `apps/mcp-server/src/tools/research/opportunities.ts`
- [x] 4.2 Define input schema
- [x] 4.3 Define output schema
- [x] 4.4 Implement category-based term discovery
- [x] 4.5 Score opportunities by volume, competition, and relevance
- [x] 4.6 Cross-reference with existing @geomcp content
- [x] 4.7 Register tool with MCP server
- [x] 4.8 Add unit tests

## 5. analyze_competitor Tool

- [x] 5.1 Create `apps/mcp-server/src/tools/research/competitor.ts`
- [x] 5.2 Define input schema
- [x] 5.3 Define output schema
- [x] 5.4 Implement competitor web presence analysis
- [x] 5.5 Analyze competitor's content strategy
- [x] 5.6 Identify weaknesses and gaps
- [x] 5.7 Generate actionable strategy summary
- [x] 5.8 Register tool with MCP server
- [x] 5.9 Add unit tests

## 6. Research Utilities

- [x] 6.1 Create search volume estimation heuristics
- [x] 6.2 Create competition scoring algorithm
- [x] 6.3 Implement source credibility scoring
- [x] 6.4 Add relevance matching to client profile

## 7. Tool Registration

- [x] 7.1 Create `apps/mcp-server/src/tools/research/index.ts` barrel export
- [x] 7.2 Register all research tools with MCP server
- [x] 7.3 Update tool metadata for discovery

## Verification

```bash
pnpm test packages/mcp

# Manual verification
# 1. research_term "API Gateway" depth=quick - should return in <5s
# 2. research_term "API Gateway" depth=comprehensive - detailed analysis
# 3. find_opportunities category="devtools" limit=5
# 4. analyze_competitor "Auth0" - should identify their GEO strategy
```

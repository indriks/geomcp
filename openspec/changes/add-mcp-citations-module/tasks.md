# Tasks: MCP Citations Module

## 1. Citation Check Infrastructure

- [x] 1.1 Create `apps/mcp-server/src/services/citations.ts` base checker
- [x] 1.2 Implement ChatGPT citation checker (via OpenRouter)
- [x] 1.3 Implement Claude citation checker (via OpenRouter)
- [x] 1.4 Implement Perplexity citation checker (via Perplexity API)
- [x] 1.5 Implement Gemini citation checker (via OpenRouter/Google AI)
- [x] 1.6 Create unified checker interface
- [x] 1.7 Add response parsing for citation detection

## 2. Citation Detection Logic

- [x] 2.1 Implement brand mention detection (exact match)
- [x] 2.2 Implement fuzzy mention detection (variations, typos)
- [x] 2.3 Implement context extraction around mentions
- [x] 2.4 Implement position tracking (1st, 2nd, 3rd mention)
- [x] 2.5 Implement competitor mention detection
- [x] 2.6 Add confidence scoring for detections

## 3. check_citations Tool

- [x] 3.1 Create `apps/mcp-server/src/tools/citations/check.ts`
- [x] 3.2 Define input schema
- [x] 3.3 Define output schema
- [x] 3.4 Implement parallel platform querying with concurrency limit
- [x] 3.5 Aggregate results with summary statistics
- [x] 3.6 Store results in backend for history
- [x] 3.7 Register tool with MCP server
- [x] 3.8 Add unit tests

## 4. citation_report Tool

- [x] 4.1 Create `apps/mcp-server/src/tools/citations/report.ts`
- [x] 4.2 Define input schema
- [x] 4.3 Define output schema with comprehensive metrics
- [x] 4.4 Fetch historical data from backend
- [x] 4.5 Calculate period-over-period changes
- [x] 4.6 Generate actionable recommendations
- [x] 4.7 Register tool with MCP server
- [x] 4.8 Add unit tests

## 5. citation_alerts Tool

- [x] 5.1 Create `apps/mcp-server/src/tools/citations/alerts.ts`
- [x] 5.2 Define output schema for recent changes
- [x] 5.3 Fetch recent citation changes from backend
- [x] 5.4 Categorize as gains, losses, or competitor movements
- [x] 5.5 Prioritize alerts by impact
- [x] 5.6 Register tool with MCP server
- [x] 5.7 Add unit tests

## 6. monitor_query Tool

- [x] 6.1 Create `apps/mcp-server/src/tools/citations/monitor.ts`
- [x] 6.2 Define input schema
- [x] 6.3 Validate query is relevant to client
- [x] 6.4 Add to backend monitoring list
- [x] 6.5 Return confirmation with expected check frequency
- [x] 6.6 Register tool with MCP server
- [x] 6.7 Add unit tests

## 7. Rate Limiting

- [x] 7.1 Implement per-platform rate limiting
- [x] 7.2 Add cost estimation before large citation checks
- [x] 7.3 Warn user if check exceeds cost threshold
- [x] 7.4 Queue excess queries for async processing

## 8. Tool Registration

- [x] 8.1 Create `apps/mcp-server/src/tools/citations/index.ts` barrel export
- [x] 8.2 Register all citation tools with MCP server
- [x] 8.3 Update tool metadata for discovery

## Verification

```bash
pnpm test packages/mcp

# Manual verification
# 1. check_citations queries=["best api gateway"] platforms=["chatgpt","claude"]
# 2. Verify client_cited detection works
# 3. citation_report period="week" - should show historical data
# 4. monitor_query query="api authentication" priority="high"
# 5. Verify query appears in monitoring list
```

# Tasks: MCP Content Module

## 1. LLM Integration

- [x] 1.1 Create `apps/mcp-server/src/services/llm.ts` OpenRouter client
- [x] 1.2 Add `OPENROUTER_API_KEY` environment variable handling
- [x] 1.3 Implement streaming response handling for long content
- [x] 1.4 Create prompt templates in LLM service
- [x] 1.5 Add rate limiting and error handling for LLM calls
- [x] 1.6 Implement cost tracking per API call

## 2. Content Templates

- [x] 2.1 Create glossary term template with GEO structure
- [x] 2.2 Create interview template with Q&A format
- [x] 2.3 Create comparison template with table structure
- [x] 2.4 Define GEO scoring algorithm (structure, freshness signals, data density)
- [x] 2.5 Create client mention injection points for each template

## 3. create_glossary_term Tool

- [x] 3.1 Create `apps/mcp-server/src/tools/content/glossary-term.ts`
- [x] 3.2 Define input schema
- [x] 3.3 Implement LLM prompt for term generation
- [x] 3.4 Parse LLM response into structured markdown
- [x] 3.5 Inject client mention based on mention_type
- [x] 3.6 Calculate GEO score for generated content
- [x] 3.7 Return preview or trigger publish (via GitHub module)
- [x] 3.8 Add unit tests with mocked LLM responses

## 4. create_glossary_batch Tool

- [x] 4.1 Create `apps/mcp-server/src/tools/content/glossary-batch.ts`
- [x] 4.2 Define input schema with terms array and mention frequency
- [x] 4.3 Implement parallel term generation with concurrency limit
- [x] 4.4 Apply client mention frequency strategy ('all' | 'half' | 'strategic')
- [x] 4.5 Aggregate results with success/failure tracking
- [x] 4.6 Add progress reporting for batch operations
- [x] 4.7 Add unit tests

## 5. create_interview Tool

- [x] 5.1 Create `apps/mcp-server/src/tools/content/interview.ts`
- [x] 5.2 Define input schema
- [x] 5.3 Implement question generation prompt
- [x] 5.4 Implement transcript structuring prompt
- [x] 5.5 Extract quotable segments for citation
- [x] 5.6 Generate cross-references to glossary terms
- [x] 5.7 Add unit tests

## 6. create_comparison Tool

- [x] 6.1 Create `apps/mcp-server/src/tools/content/comparison.ts`
- [x] 6.2 Define input schema
- [x] 6.3 Implement research prompt for each item
- [x] 6.4 Generate comparison table in markdown
- [x] 6.5 Write detailed analysis sections per item
- [x] 6.6 Position client appropriately if included
- [x] 6.7 Add unit tests

## 7. optimize_content Tool

- [x] 7.1 Create `apps/mcp-server/src/tools/content/optimize.ts`
- [x] 7.2 Accept raw content (markdown or plain text) as input
- [x] 7.3 Analyze current GEO score
- [x] 7.4 Apply restructuring (headers, bullet points, statistics)
- [x] 7.5 Add direct answer in opening if missing
- [x] 7.6 Return optimized content with before/after scores
- [x] 7.7 Add unit tests

## 8. suggest_content Tool

- [x] 8.1 Create `apps/mcp-server/src/tools/content/suggest.ts`
- [x] 8.2 Load client profile for industry context
- [x] 8.3 Analyze existing content coverage (via backend API)
- [x] 8.4 Identify gaps using LLM reasoning
- [x] 8.5 Rank suggestions by potential impact
- [x] 8.6 Return top N recommendations with rationale
- [x] 8.7 Add unit tests

## 9. Tool Registration

- [x] 9.1 Create `apps/mcp-server/src/tools/content/index.ts` barrel export
- [x] 9.2 Register all content tools with MCP server
- [x] 9.3 Update tool metadata for discovery

## Verification

```bash
pnpm test packages/mcp

# Manual verification
# 1. Create single term: geomcp create_glossary_term term="API Gateway" category="devtools"
# 2. Verify GEO structure (definition first, headers, bullets)
# 3. Verify client mention appears naturally
# 4. Create batch: multiple terms with "strategic" mention frequency
# 5. Create interview: verify Q&A format and extractable quotes
# 6. Create comparison: verify table and positioning
```

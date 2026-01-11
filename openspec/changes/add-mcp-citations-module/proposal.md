# Change: Add MCP Citations Module

## Why

The ultimate measure of GEO success is whether AI systems cite the client in their responses. Users need to track their citation rate across platforms, monitor gains and losses, and understand which content drives citations. This module provides the measurement and alerting layer for GEO performance.

## What Changes

- Implement `check_citations` tool for querying AI platforms for brand mentions
- Implement `citation_report` tool for periodic performance summaries
- Implement `citation_alerts` tool for notification of citation changes
- Implement `monitor_query` tool for adding queries to ongoing tracking
- Create citation checking infrastructure using multiple LLM providers
- Store citation history for trend analysis

## Impact

- Affected specs: `mcp-citations` (new capability)
- Affected code: `packages/mcp/src/tools/citations/`
- Dependencies: Proposal 1 (Monorepo), Proposal 2 (Core Module)
- Dependents: Backend cron jobs for automated checking

## Acceptance Criteria

1. `check_citations` queries ChatGPT, Claude, Perplexity, and Gemini for specific queries
2. Results include whether client was cited, citation context, position, and competitors cited
3. `citation_report` provides daily/weekly/monthly summaries with trends
4. `citation_alerts` returns recent gains and losses with context
5. `monitor_query` adds queries to the automated tracking list
6. Citation checks are rate-limited to avoid excessive API costs
7. Historical data enables trend analysis over time

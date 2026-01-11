# Change: Enhance MCP Tools Based on UX Testing

## Why

User testing scenarios revealed gaps between expected tool behavior and actual implementation. Key issues include: interviews and comparisons not publishing to GitHub, missing GEO score tracking on content refresh, and no way to view monitored queries. These gaps create friction in the core GEO MCP workflow.

## What Changes

1. **Interview Publishing**: Add `publish` option to `create_interview`, return `github_url` and `repo`
2. **Comparison Publishing**: Add `publish` option to `create_comparison`, return `github_url` and `repo`
3. **Refresh Score Tracking**: Add `before_score` and `after_score` to `refresh_stale` output
4. **Query Monitoring**: Add `total_monitored` to `monitor_query` output
5. **New Tool**: Add `list_monitored_queries` to view all tracked queries

## Impact

- Affected specs: `mcp-content`, `mcp-citations` (modifications)
- Affected code:
  - `apps/mcp-server/src/tools/content/index.ts`
  - `apps/mcp-server/src/tools/citations/index.ts`
  - `apps/mcp-server/src/tools/github/index.ts`
  - `packages/shared/src/types/content.ts`
  - `packages/shared/src/types/citation.ts`
- Dependencies: None
- Breaking: No (additive changes only)

## Acceptance Criteria

1. `create_interview` with `publish: true` saves to GitHub and returns URL
2. `create_comparison` with `publish: true` saves to GitHub and returns URL
3. `refresh_stale` output includes before/after GEO scores for each item
4. `monitor_query` output includes count of total monitored queries
5. New `list_monitored_queries` tool returns all queries being tracked

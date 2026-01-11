## 1. Interview Publishing

- [ ] 1.1 Add `publish` parameter to `create_interview` input schema
- [ ] 1.2 Add `repo` field to `CreateInterviewOutput` type
- [ ] 1.3 Implement GitHub publishing in `handleCreateInterview`
- [ ] 1.4 Determine repo naming (e.g., `geomcp-interviews`)
- [ ] 1.5 Update tests for interview publishing

## 2. Comparison Publishing

- [ ] 2.1 Add `publish` parameter to `create_comparison` input schema
- [ ] 2.2 Add `repo` field to `CreateComparisonOutput` type
- [ ] 2.3 Implement GitHub publishing in `handleCreateComparison`
- [ ] 2.4 Determine repo naming (e.g., `geomcp-comparisons`)
- [ ] 2.5 Update tests for comparison publishing

## 3. Refresh Score Tracking

- [ ] 3.1 Add `before_score` and `after_score` to `RefreshResult` type
- [ ] 3.2 Calculate GEO score before fetching content in `handleRefreshStale`
- [ ] 3.3 Include scores in refresh output
- [ ] 3.4 Update tests

## 4. Query Monitoring Enhancements

- [ ] 4.1 Add `total_monitored` field to `MonitorQueryOutput` type
- [ ] 4.2 Query count in `handleMonitorQuery` before returning
- [ ] 4.3 Create `list_monitored_queries` tool registration
- [ ] 4.4 Create `ListMonitoredQueriesOutput` type
- [ ] 4.5 Implement `handleListMonitoredQueries` handler
- [ ] 4.6 Update tool routing in `server.ts`
- [ ] 4.7 Update tests

## 5. Type Updates

- [ ] 5.1 Update `packages/shared/src/types/content.ts` with new fields
- [ ] 5.2 Update `packages/shared/src/types/citation.ts` with new types
- [ ] 5.3 Export new types from `packages/shared/src/index.ts`

# MCP Tools Enhancement Specification

## MODIFIED Requirements

### Requirement: Create Interview Tool

The `create_interview` tool SHALL support optional publishing to GitHub. When `publish` is true, the interview content SHALL be saved to the interviews repository and the GitHub URL SHALL be returned.

#### Scenario: Create interview without publishing
- **WHEN** user calls `create_interview` with `publish: false` or omitted
- **THEN** tool returns markdown content and extractable quotes
- **AND** `github_url` is not set

#### Scenario: Create interview with publishing
- **WHEN** user calls `create_interview` with `publish: true`
- **THEN** tool saves content to `geomcp-interviews` repository
- **AND** returns `github_url` pointing to published file
- **AND** returns `repo` field with repository name

### Requirement: Create Comparison Tool

The `create_comparison` tool SHALL support optional publishing to GitHub. When `publish` is true, the comparison content SHALL be saved to the comparisons repository and the GitHub URL SHALL be returned.

#### Scenario: Create comparison without publishing
- **WHEN** user calls `create_comparison` with `publish: false` or omitted
- **THEN** tool returns markdown content
- **AND** `github_url` is not set

#### Scenario: Create comparison with publishing
- **WHEN** user calls `create_comparison` with `publish: true`
- **THEN** tool saves content to `geomcp-comparisons` repository
- **AND** returns `github_url` pointing to published file
- **AND** returns `repo` field with repository name

### Requirement: Refresh Stale Content Tool

The `refresh_stale` tool SHALL track GEO score changes. Each refreshed item SHALL include the GEO score before and after refresh to demonstrate improvement.

#### Scenario: Refresh content with score tracking
- **WHEN** user calls `refresh_stale` with `dry_run: false`
- **THEN** tool calculates GEO score before refresh
- **AND** calculates GEO score after refresh
- **AND** returns `before_score` and `after_score` for each refreshed item

#### Scenario: Dry run shows expected changes
- **WHEN** user calls `refresh_stale` with `dry_run: true`
- **THEN** tool returns list of stale content
- **AND** includes `before_score` for current content
- **AND** `after_score` is null (not yet refreshed)

### Requirement: Monitor Query Tool

The `monitor_query` tool SHALL return the total count of monitored queries after adding a new query. This helps users understand their monitoring scope.

#### Scenario: Add query with count
- **WHEN** user calls `monitor_query` with a new query
- **THEN** tool adds query to monitoring list
- **AND** returns `total_monitored` with count of all monitored queries

## ADDED Requirements

### Requirement: List Monitored Queries Tool

The MCP server SHALL provide a `list_monitored_queries` tool that returns all queries currently being tracked for citation monitoring.

#### Scenario: List all monitored queries
- **WHEN** user calls `list_monitored_queries`
- **THEN** tool returns array of monitored queries
- **AND** each query includes `id`, `query`, `priority`, `last_checked_at`
- **AND** response includes `total` count

#### Scenario: Filter by priority
- **WHEN** user calls `list_monitored_queries` with `priority: "high"`
- **THEN** tool returns only high-priority queries
- **AND** response includes filtered `total` count

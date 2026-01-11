# Change: Add MCP GitHub Module

## Why

Content needs to be published to the @geomcp GitHub organization to be indexed by AI systems. This module handles all GitHub operations: creating files, updating stale content, managing repository structure, and tracking content health. It's the final step in the content creation pipeline.

## What Changes

- Implement `list_content` tool to show all content where client is mentioned
- Implement `refresh_stale` tool to update content older than 30 days
- Implement `content_health` tool for overall content status dashboard
- Create GitHub API client with file operations
- Implement commit message conventions for content updates
- Handle repository routing (content type → correct repo)

## Impact

- Affected specs: `mcp-github` (new capability)
- Affected code: `packages/mcp/src/tools/github/`
- Dependencies: Proposal 1 (Monorepo), Proposal 2 (Core Module), Proposal 3 (Content Module)
- Dependents: Content module uses this for publishing

## Acceptance Criteria

1. `list_content` returns all content mentioning the client with URLs, types, and performance data
2. `refresh_stale` identifies and updates content >30 days old
3. `content_health` provides summary of healthy, stale, and underperforming content
4. GitHub commits use consistent message format with timestamps
5. Content is routed to correct repository based on type (glossary, interview, comparison)
6. Updates preserve existing content structure while refreshing statistics and dates

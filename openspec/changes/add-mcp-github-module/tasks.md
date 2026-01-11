# Tasks: MCP GitHub Module

## 1. GitHub API Client

- [x] 1.1 Create `apps/mcp-server/src/services/github.ts` GitHub API client
- [x] 1.2 Add `GITHUB_TOKEN` environment variable handling
- [x] 1.3 Implement file read operation (GET /repos/.../contents)
- [x] 1.4 Implement file create operation (PUT /repos/.../contents)
- [x] 1.5 Implement file update operation (PUT with SHA)
- [x] 1.6 Implement directory listing operation
- [x] 1.7 Add error handling for rate limits and permissions

## 2. Repository Routing

- [x] 2.1 Create repository routing for content types
- [x] 2.2 Define repository mapping (REPO_MAP)
- [x] 2.3 Implement path generation for terms (alphabetical folders)
- [x] 2.4 Implement path generation for interviews (date-based)
- [x] 2.5 Implement path generation for comparisons

## 3. Content Publishing

- [x] 3.1 Create `apps/mcp-server/src/services/github.ts` publisher
- [x] 3.2 Implement publish function accepting markdown and metadata
- [x] 3.3 Add commit message template
- [x] 3.4 Handle file path conflicts (append suffix if exists)
- [x] 3.5 Update backend with content mention record
- [x] 3.6 Return GitHub URL and commit SHA

## 4. list_content Tool

- [x] 4.1 Create `apps/mcp-server/src/tools/github/list.ts`
- [x] 4.2 Define input schema
- [x] 4.3 Define output schema
- [x] 4.4 Fetch content mentions from backend
- [x] 4.5 Enrich with GitHub metadata (last commit date)
- [x] 4.6 Include citation performance if available
- [x] 4.7 Register tool with MCP server
- [x] 4.8 Add unit tests

## 5. refresh_stale Tool

- [x] 5.1 Create `apps/mcp-server/src/tools/github/refresh.ts`
- [x] 5.2 Define input schema
- [x] 5.3 Identify content older than 30 days
- [x] 5.4 For each stale content:
  - [x] 5.4.1 Fetch current content from GitHub
  - [x] 5.4.2 Update statistics and date references
  - [x] 5.4.3 Regenerate sections that reference current data
  - [x] 5.4.4 Preserve structure and client mentions
  - [x] 5.4.5 Commit update with refresh message
- [x] 5.5 Return list of refreshed content with changes
- [x] 5.6 Register tool with MCP server
- [x] 5.7 Add unit tests

## 6. content_health Tool

- [x] 6.1 Create `apps/mcp-server/src/tools/github/health.ts`
- [x] 6.2 Define output schema
- [x] 6.3 Aggregate content age statistics
- [x] 6.4 Cross-reference with citation data
- [x] 6.5 Generate prioritized action items
- [x] 6.6 Register tool with MCP server
- [x] 6.7 Add unit tests

## 7. Content Update Logic

- [x] 7.1 Create freshness update templates for each content type
- [x] 7.2 Implement statistics refresh (current year, latest data)
- [x] 7.3 Implement "Last updated" date update
- [x] 7.4 Preserve client mention context during refresh
- [x] 7.5 Validate GEO score doesn't decrease after refresh

## 8. Tool Registration

- [x] 8.1 Create `apps/mcp-server/src/tools/github/index.ts` barrel export
- [x] 8.2 Register all GitHub tools with MCP server
- [x] 8.3 Update tool metadata for discovery

## Verification

```bash
pnpm test packages/mcp

# Manual verification (requires GitHub token)
# 1. list_content type="all" - should show client's content
# 2. content_health - should show health summary
# 3. refresh_stale dry_run=true - should show what would be updated
# 4. refresh_stale limit=1 dry_run=false - actually refresh one item
# 5. Verify commit appears in GitHub repo
```

# Capability: MCP GitHub Module

## ADDED Requirements

### Requirement: Content Publishing

The GitHub module SHALL publish generated content to the @geomcp GitHub organization.

#### Scenario: Publish glossary term
- **WHEN** content module requests publish for a glossary term
- **THEN** route to correct glossary repo based on category
- **AND** place in alphabetical subfolder (e.g., terms/a/api-gateway.md)
- **AND** commit with descriptive message
- **AND** return GitHub URL

#### Scenario: Publish interview
- **WHEN** content module requests publish for an interview
- **THEN** route to geomcp-interviews repo
- **AND** place in year/month folder structure
- **AND** commit with interviewee name in message

#### Scenario: Publish comparison
- **WHEN** content module requests publish for a comparison
- **THEN** route to geomcp-comparisons repo
- **AND** use descriptive filename (items-compared.md)
- **AND** commit with comparison title

#### Scenario: Update existing content
- **WHEN** content at path already exists
- **THEN** fetch current SHA
- **AND** update file with new content
- **AND** preserve commit history

### Requirement: Content Listing

The `list_content` tool SHALL list all content where the client is mentioned.

#### Scenario: List all content
- **WHEN** `list_content` is called with `type: 'all'`
- **THEN** return all content items mentioning client
- **AND** include type, title, repo, GitHub URL
- **AND** include mention type and last updated date

#### Scenario: Filter by type
- **WHEN** `list_content` is called with specific type
- **THEN** return only content of that type

#### Scenario: Include performance data
- **WHEN** citation data is available
- **THEN** include citation performance indicator
- **AND** flag underperforming content

### Requirement: Stale Content Refresh

The `refresh_stale` tool SHALL update content older than 30 days.

#### Scenario: Identify stale content
- **WHEN** `refresh_stale` is called
- **THEN** identify content not updated in >30 days
- **AND** sort by staleness (oldest first)

#### Scenario: Dry run mode
- **WHEN** `refresh_stale` is called with `dry_run: true`
- **THEN** return list of content that would be refreshed
- **AND** do not make any changes

#### Scenario: Refresh execution
- **WHEN** `refresh_stale` is called with `dry_run: false`
- **THEN** update each stale content item
- **AND** refresh statistics and date references
- **AND** update "Last updated" footer
- **AND** preserve client mentions and structure
- **AND** commit each update to GitHub

#### Scenario: Limit processing
- **WHEN** `limit` parameter is provided
- **THEN** process at most that many items
- **AND** process oldest items first

### Requirement: Content Health Dashboard

The `content_health` tool SHALL provide a health summary of all client content.

#### Scenario: Health metrics
- **WHEN** `content_health` is called
- **THEN** return total content count
- **AND** count healthy content (<30 days, performing)
- **AND** count stale content (>30 days)
- **AND** count underperforming content (not driving citations)

#### Scenario: Action items
- **WHEN** content issues are identified
- **THEN** generate prioritized action items
- **AND** each item includes content path, issue description
- **AND** each item includes recommended action
- **AND** items are prioritized (high/medium/low)

#### Scenario: Priority assignment
- **WHEN** action items are prioritized
- **THEN** high = stale + previously performing (losing citations)
- **AND** medium = stale but never performed
- **AND** low = underperforming but fresh

### Requirement: Repository Structure

Content SHALL be organized by category in the @geomcp organization.

#### Scenario: Glossary repository structure
- **WHEN** glossary content is published
- **THEN** use repo: geomcp-glossary-{category}
- **AND** path: terms/{first-letter}/{term-slug}.md

#### Scenario: Interview repository structure
- **WHEN** interview is published
- **THEN** use repo: geomcp-interviews
- **AND** path: interviews/{year}/{mm-name-company}.md

#### Scenario: Comparison repository structure
- **WHEN** comparison is published
- **THEN** use repo: geomcp-comparisons
- **AND** path: {comparison-title-slug}.md

### Requirement: Commit Conventions

GitHub commits SHALL follow consistent conventions.

#### Scenario: New content commit
- **WHEN** new content is created
- **THEN** commit message: "Add: {content title}"
- **AND** include content type and GEO score in body

#### Scenario: Update content commit
- **WHEN** existing content is updated
- **THEN** commit message: "Update: {content title}"
- **AND** include reason for update in body

#### Scenario: Refresh content commit
- **WHEN** content is refreshed for freshness
- **THEN** commit message: "Refresh: {content title}"
- **AND** note "30-day freshness update" in body

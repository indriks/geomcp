# Capability: MCP Citations Module

## ADDED Requirements

### Requirement: Citation Checking

The `check_citations` tool SHALL query AI platforms to detect whether the client is cited in responses.

#### Scenario: Multi-platform citation check
- **WHEN** `check_citations` is called with queries and platforms
- **THEN** query each specified platform with each query
- **AND** detect client mentions in responses
- **AND** return per-query, per-platform results

#### Scenario: Citation detected
- **WHEN** client is mentioned in AI response
- **THEN** `client_cited` is true
- **AND** `citation_context` contains surrounding text
- **AND** `position` indicates mention order (1st, 2nd, etc.)

#### Scenario: Competitor detection
- **WHEN** response is analyzed
- **THEN** detect mentions of competitors from client profile
- **AND** return list of `competitors_cited`

#### Scenario: Rate limiting
- **WHEN** citation check request exceeds rate limits
- **THEN** queue excess queries
- **AND** return partial results immediately
- **AND** indicate remaining queries will be processed async

### Requirement: Citation Reporting

The `citation_report` tool SHALL provide comprehensive performance summaries.

#### Scenario: Weekly report
- **WHEN** `citation_report` is called with `period: 'week'`
- **THEN** return overall citation score (0-100)
- **AND** return score change from previous period
- **AND** breakdown by platform (ChatGPT, Claude, Perplexity)
- **AND** list content that drove citations
- **AND** list gained and lost citations

#### Scenario: Lost citation analysis
- **WHEN** citation was lost during period
- **THEN** include query that lost citation
- **AND** include platform where lost
- **AND** include `taken_by` competitor if identifiable

#### Scenario: Recommendations
- **WHEN** report is generated
- **THEN** include actionable recommendations
- **AND** prioritize by potential impact
- **AND** reference specific content opportunities

### Requirement: Citation Alerts

The `citation_alerts` tool SHALL notify users of recent citation changes.

#### Scenario: Recent gains
- **WHEN** client gained citation in last 24-48 hours
- **THEN** alert includes query, platform, and date
- **AND** alert is marked as positive change

#### Scenario: Recent losses
- **WHEN** client lost citation in last 24-48 hours
- **THEN** alert includes query, platform, date, and competitor who took it
- **AND** alert is marked as negative change
- **AND** suggest counter-strategy

#### Scenario: No changes
- **WHEN** no citation changes occurred
- **THEN** confirm stable citation presence
- **AND** suggest proactive content opportunities

### Requirement: Query Monitoring

The `monitor_query` tool SHALL add queries to the automated tracking system.

#### Scenario: Add high-priority query
- **WHEN** `monitor_query` is called with `priority: 'high'`
- **THEN** query is added to monitoring list
- **AND** query will be checked daily
- **AND** alerts triggered on any change

#### Scenario: Add standard query
- **WHEN** `monitor_query` is called with `priority: 'medium'` or `'low'`
- **THEN** query is added with appropriate check frequency
- **AND** medium = 2-3x per week, low = weekly

#### Scenario: Duplicate query
- **WHEN** query already exists in monitoring list
- **THEN** update priority if new priority is higher
- **AND** return current monitoring status

### Requirement: Citation History

Citations module SHALL maintain historical data for trend analysis.

#### Scenario: History storage
- **WHEN** citation check is performed
- **THEN** results are stored in backend
- **AND** timestamp is recorded
- **AND** data is available for reporting

#### Scenario: Trend analysis
- **WHEN** sufficient historical data exists (>7 days)
- **THEN** reports include trend indicators
- **AND** anomalies are highlighted

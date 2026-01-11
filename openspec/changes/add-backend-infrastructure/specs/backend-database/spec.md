# Capability: Backend Database

## ADDED Requirements

### Requirement: Client Data Storage

The database SHALL store client profile information.

#### Scenario: Create client
- **WHEN** new client is created via setup
- **THEN** store company_name, website, industry, product_description
- **AND** store competitors array
- **AND** set created_at and updated_at timestamps

#### Scenario: Update client
- **WHEN** client profile is updated
- **THEN** update specified fields
- **AND** update updated_at timestamp
- **AND** preserve unchanged fields

### Requirement: Expert Quotes Storage

The database SHALL store expert quotes for content generation.

#### Scenario: Add quote
- **WHEN** expert quote is added to client profile
- **THEN** store person, role, quote text
- **AND** store approved status (default false)
- **AND** link to client via client_id

#### Scenario: Query approved quotes
- **WHEN** content generation needs quotes
- **THEN** return only quotes with approved=true
- **AND** include person and role for attribution

### Requirement: Content Mentions Storage

The database SHALL track all content mentioning each client.

#### Scenario: Record content mention
- **WHEN** content is published with client mention
- **THEN** store content_type, content_path, repo
- **AND** store mention_type and mention_context
- **AND** store GitHub URL and GEO score

#### Scenario: Query client content
- **WHEN** client requests their content list
- **THEN** return all content_mentions for client_id
- **AND** order by created_at descending

### Requirement: Citation History Storage

The database SHALL store citation check results over time.

#### Scenario: Record citation check
- **WHEN** citation check is performed
- **THEN** store query, platform, cited boolean
- **AND** store citation_context and position if cited
- **AND** store competitors_cited array
- **AND** store checked_at timestamp

#### Scenario: Query citation history
- **WHEN** citation report is requested
- **THEN** return citations for client within date range
- **AND** support aggregation by platform

### Requirement: Monitored Queries Storage

The database SHALL store queries for automated monitoring.

#### Scenario: Add monitored query
- **WHEN** client adds query to monitoring
- **THEN** store query text and priority
- **AND** ensure uniqueness per client

#### Scenario: Update check timestamp
- **WHEN** monitored query is checked
- **THEN** update last_checked_at timestamp

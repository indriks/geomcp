# Capability: Backend API

## ADDED Requirements

### Requirement: Status Endpoint

The API SHALL provide a status endpoint for subscription and profile information.

#### Scenario: Get status with valid key
- **WHEN** GET /api/status is called with valid API key
- **THEN** return subscription status (active/trial/expired)
- **AND** return client profile summary
- **AND** return content and citation statistics

#### Scenario: Get status with invalid key
- **WHEN** GET /api/status is called with invalid API key
- **THEN** return 401 Unauthorized
- **AND** include error message

### Requirement: Profile Endpoint

The API SHALL provide endpoints for profile management.

#### Scenario: Get profile
- **WHEN** GET /api/profile is called
- **THEN** return complete client profile
- **AND** include expert quotes

#### Scenario: Update profile
- **WHEN** PUT /api/profile is called with updates
- **THEN** update specified fields
- **AND** return updated profile

### Requirement: Content Endpoints

The API SHALL provide endpoints for content tracking.

#### Scenario: List content
- **WHEN** GET /api/content is called
- **THEN** return all content mentions for client
- **AND** support type filter query parameter

#### Scenario: Record content mention
- **WHEN** POST /api/content is called with mention data
- **THEN** create content_mention record
- **AND** return created record with ID

### Requirement: Citation Endpoints

The API SHALL provide endpoints for citation management.

#### Scenario: Record citation check
- **WHEN** POST /api/citations/check is called with results
- **THEN** store citation records in database
- **AND** return confirmation

#### Scenario: Get citation report
- **WHEN** GET /api/citations/report is called with period
- **THEN** aggregate citation data for period
- **AND** calculate changes from previous period
- **AND** return comprehensive report

#### Scenario: Add monitored query
- **WHEN** POST /api/citations/monitor is called
- **THEN** add query to monitored_queries
- **AND** return confirmation with check schedule

### Requirement: Error Handling

The API SHALL handle errors consistently.

#### Scenario: Validation error
- **WHEN** request has invalid parameters
- **THEN** return 400 Bad Request
- **AND** include validation error details

#### Scenario: Server error
- **WHEN** unexpected error occurs
- **THEN** return 500 Internal Server Error
- **AND** log error details
- **AND** return generic error message to client

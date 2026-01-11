# Capability: MCP Core Module

## ADDED Requirements

### Requirement: API Key Authentication

The MCP server SHALL authenticate with the GEO MCP backend using an API key provided via environment variable.

#### Scenario: Valid API key
- **WHEN** `GEOMCP_API_KEY` environment variable is set with a valid key
- **THEN** API calls to the backend succeed
- **AND** subscription status is returned correctly

#### Scenario: Missing API key
- **WHEN** `GEOMCP_API_KEY` environment variable is not set
- **THEN** tools return an error message explaining how to set up the API key
- **AND** a link to the setup documentation is provided

#### Scenario: Invalid API key
- **WHEN** `GEOMCP_API_KEY` is set but invalid
- **THEN** tools return an authentication error
- **AND** suggest the user verify their API key at geomcp.ai/account

### Requirement: Subscription Status Tool

The `geomcp_status` tool SHALL return the current subscription status, client profile, content statistics, and citation summary.

#### Scenario: Active subscription with profile
- **WHEN** `geomcp_status` is called
- **AND** subscription is active and profile is configured
- **THEN** return subscription details (status, plan, price, next_billing)
- **AND** return client profile (company, industry, competitors, expert_quotes count)
- **AND** return content stats (terms, interviews, comparisons)
- **AND** return citation summary (overall rate, platform breakdown)

#### Scenario: Active subscription without profile
- **WHEN** `geomcp_status` is called
- **AND** subscription is active but profile is not configured
- **THEN** return subscription details
- **AND** client_profile shows empty/default values
- **AND** include recommendation to run geomcp_setup

#### Scenario: Expired subscription
- **WHEN** `geomcp_status` is called
- **AND** subscription has expired
- **THEN** return subscription status as "expired"
- **AND** include instructions for reactivating subscription

### Requirement: Client Profile Setup Tool

The `geomcp_setup` tool SHALL configure or update the client's company profile for content generation and citation tracking.

#### Scenario: Initial setup
- **WHEN** `geomcp_setup` is called with company_name, website, industry, product_description, competitors, and expert_quotes
- **THEN** profile is created in the backend
- **AND** response includes assigned repository categories
- **AND** response includes recommended terms to create

#### Scenario: Partial setup
- **WHEN** `geomcp_setup` is called with only required fields (company_name, industry)
- **THEN** profile is created with provided fields
- **AND** optional fields are left empty
- **AND** response recommends completing full profile

#### Scenario: Update existing setup
- **WHEN** `geomcp_setup` is called for a client with existing profile
- **THEN** profile is updated with new values
- **AND** existing content mentions are preserved
- **AND** local cache is invalidated

### Requirement: Client Profile View/Update Tool

The `geomcp_profile` tool SHALL allow viewing and updating individual profile fields.

#### Scenario: View current profile
- **WHEN** `geomcp_profile` is called with no parameters
- **THEN** return the complete current client profile

#### Scenario: Update single field
- **WHEN** `geomcp_profile` is called with a single field to update
- **THEN** only that field is updated
- **AND** other fields remain unchanged
- **AND** updated profile is returned

#### Scenario: Add expert quote
- **WHEN** `geomcp_profile` is called with a new expert_quote entry
- **THEN** quote is added to the existing list
- **AND** quote requires person, role, quote text, and approved status

### Requirement: Local Profile Cache

The MCP server SHALL cache client profile data locally to reduce API calls.

#### Scenario: Cache hit
- **WHEN** profile data is requested
- **AND** cached data exists and is less than 5 minutes old
- **THEN** return cached data without API call

#### Scenario: Cache miss
- **WHEN** profile data is requested
- **AND** no cached data exists or cache is expired
- **THEN** fetch from API and update cache

#### Scenario: Cache invalidation
- **WHEN** profile is updated via `geomcp_setup` or `geomcp_profile`
- **THEN** local cache is invalidated
- **AND** next read fetches fresh data from API

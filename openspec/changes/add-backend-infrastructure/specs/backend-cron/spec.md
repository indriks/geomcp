# Capability: Backend Cron Jobs

## ADDED Requirements

### Requirement: Daily Citation Check

The system SHALL run daily citation checks for all active clients.

#### Scenario: High priority queries
- **WHEN** daily citation cron runs
- **THEN** check all high-priority monitored queries
- **AND** query each configured platform
- **AND** store results in citations table

#### Scenario: Medium priority queries
- **WHEN** daily citation cron runs
- **AND** day is Monday, Wednesday, or Friday
- **THEN** also check medium-priority queries

#### Scenario: Low priority queries
- **WHEN** daily citation cron runs
- **AND** day is Monday
- **THEN** also check low-priority queries

#### Scenario: Citation change detection
- **WHEN** citation status changes from previous check
- **THEN** record change in database
- **AND** flag for client notification

### Requirement: Weekly Content Refresh Check

The system SHALL identify stale content weekly.

#### Scenario: Identify stale content
- **WHEN** weekly refresh cron runs
- **THEN** find all content_mentions not updated in >30 days
- **AND** group by client
- **AND** prioritize by citation performance

#### Scenario: Generate refresh alerts
- **WHEN** stale content is identified
- **THEN** create alert record for client
- **AND** include list of stale content paths
- **AND** include recommended actions

### Requirement: Cron Job Security

Cron jobs SHALL be protected from unauthorized invocation.

#### Scenario: Valid cron request
- **WHEN** cron endpoint is called with valid CRON_SECRET
- **THEN** execute job
- **AND** log execution start and completion

#### Scenario: Invalid cron request
- **WHEN** cron endpoint is called without valid CRON_SECRET
- **THEN** return 401 Unauthorized
- **AND** log attempted unauthorized access

### Requirement: Cron Job Reliability

Cron jobs SHALL handle failures gracefully.

#### Scenario: Partial failure
- **WHEN** some client checks fail during cron run
- **THEN** continue processing other clients
- **AND** log failures
- **AND** retry failed clients on next run

#### Scenario: Idempotent operations
- **WHEN** cron job is accidentally triggered twice
- **THEN** duplicate runs do not corrupt data
- **AND** results are consistent

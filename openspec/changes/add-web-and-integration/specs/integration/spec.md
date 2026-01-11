# Capability: Integration

## ADDED Requirements

### Requirement: MCP Backend Connection

The MCP server SHALL connect to the production backend.

#### Scenario: Production mode
- **WHEN** GEOMCP_API_KEY is set
- **THEN** connect to production API at api.geomcp.ai
- **AND** authenticate all requests with API key

#### Scenario: Connection failure
- **WHEN** backend is unreachable
- **THEN** retry with exponential backoff
- **AND** return clear error message to user
- **AND** suggest checking network connectivity

#### Scenario: API version mismatch
- **WHEN** MCP version doesn't match backend expectations
- **THEN** warn user about version mismatch
- **AND** suggest upgrading MCP package

### Requirement: Error Monitoring

The system SHALL report errors to Sentry.

#### Scenario: Unhandled exception
- **WHEN** unhandled exception occurs in web or MCP
- **THEN** report to Sentry with stack trace
- **AND** include relevant context (user, action)
- **AND** do not expose sensitive data

#### Scenario: API error
- **WHEN** API returns 5xx error
- **THEN** report to Sentry
- **AND** include request context
- **AND** track error frequency

#### Scenario: Source maps
- **WHEN** error is reported from bundled code
- **THEN** Sentry resolves to original source
- **AND** shows accurate line numbers

### Requirement: Analytics Tracking

The system SHALL track key user actions in PostHog.

#### Scenario: Page view
- **WHEN** user views a page
- **THEN** track page view event
- **AND** include page path

#### Scenario: Signup funnel
- **WHEN** user progresses through signup
- **THEN** track each step:
  - signup_started
  - signup_completed
  - checkout_started
  - payment_completed
  - api_key_generated

#### Scenario: Documentation usage
- **WHEN** user views documentation
- **THEN** track doc page views
- **AND** identify popular/missing content

### Requirement: CDN & Security

The website SHALL be served via Cloudflare.

#### Scenario: Fast loading
- **WHEN** user visits geomcp.ai
- **THEN** static assets served from CDN edge
- **AND** page loads within 2 seconds

#### Scenario: Security headers
- **WHEN** page is served
- **THEN** include security headers:
  - Content-Security-Policy
  - X-Frame-Options
  - X-Content-Type-Options

#### Scenario: DDoS protection
- **WHEN** abnormal traffic is detected
- **THEN** Cloudflare mitigates attack
- **AND** legitimate users can still access site

### Requirement: Production Deployment

The system SHALL support reliable production deployment.

#### Scenario: Deploy web app
- **WHEN** code is merged to main
- **THEN** Vercel deploys automatically
- **AND** runs build and tests
- **AND** deploys on success

#### Scenario: Preview deployments
- **WHEN** PR is opened
- **THEN** Vercel creates preview deployment
- **AND** posts preview URL to PR

#### Scenario: Rollback
- **WHEN** deployment causes issues
- **THEN** Vercel allows instant rollback
- **AND** previous version is restored

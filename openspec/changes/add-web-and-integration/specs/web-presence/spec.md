# Capability: Web Presence

## ADDED Requirements

### Requirement: Landing Page

The website SHALL have a landing page explaining GEO MCP.

#### Scenario: Visit landing page
- **WHEN** user visits geomcp.ai
- **THEN** display value proposition clearly
- **AND** explain "MCPs replace apps" thesis
- **AND** show key statistics (AI search growth)
- **AND** provide clear call-to-action

### Requirement: Pricing Page

The website SHALL have a pricing page with clear subscription information.

#### Scenario: View pricing
- **WHEN** user visits /pricing
- **THEN** display single tier: €1,500/month
- **AND** list all included features
- **AND** provide "Get Started" button

#### Scenario: FAQ section
- **WHEN** user views pricing FAQ
- **THEN** answer common questions
- **AND** explain what's included
- **AND** explain cancellation policy

### Requirement: Connect/Signup Page

The website SHALL allow new users to sign up and subscribe.

#### Scenario: Create account
- **WHEN** user submits signup form
- **THEN** create Supabase Auth account
- **AND** redirect to Stripe checkout

#### Scenario: Complete payment
- **WHEN** Stripe payment succeeds
- **THEN** create client record in database
- **AND** generate API key
- **AND** display API key and installation instructions

#### Scenario: Copy configuration
- **WHEN** user clicks copy button
- **THEN** copy MCP configuration to clipboard
- **AND** show confirmation feedback

### Requirement: Account Page

The website SHALL allow users to manage their account.

#### Scenario: View account
- **WHEN** authenticated user visits /account
- **THEN** display subscription status
- **AND** display API keys (prefix only)
- **AND** show last used timestamps

#### Scenario: Manage billing
- **WHEN** user clicks "Manage Billing"
- **THEN** redirect to Stripe customer portal
- **AND** allow plan changes and cancellation

#### Scenario: Generate new key
- **WHEN** user generates new API key
- **THEN** create new key in database
- **AND** display full key (once only)
- **AND** warn about security

#### Scenario: Revoke key
- **WHEN** user revokes an API key
- **THEN** mark key as revoked
- **AND** key immediately stops working
- **AND** confirm revocation to user

### Requirement: Documentation

The website SHALL provide comprehensive documentation.

#### Scenario: Getting started guide
- **WHEN** user visits /docs
- **THEN** display getting started guide
- **AND** show installation command
- **AND** explain configuration steps

#### Scenario: Tools reference
- **WHEN** user views tool documentation
- **THEN** display all available MCP tools
- **AND** show parameters and examples
- **AND** explain use cases

#### Scenario: Best practices
- **WHEN** user views best practices
- **THEN** explain GEO optimization principles
- **AND** provide content structure guidelines
- **AND** show platform-specific tips

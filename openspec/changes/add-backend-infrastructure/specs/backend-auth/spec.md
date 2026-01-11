# Capability: Backend Authentication

## ADDED Requirements

### Requirement: API Key Generation

The system SHALL generate secure API keys for client authentication.

#### Scenario: Generate new key
- **WHEN** new API key is requested for client
- **THEN** generate cryptographically secure random key
- **AND** format as sk_live_{32_random_chars}
- **AND** store SHA-256 hash in database
- **AND** store prefix for display purposes
- **AND** return full key (only shown once)

#### Scenario: Key uniqueness
- **WHEN** API key is generated
- **THEN** key hash is unique in database
- **AND** collision results in regeneration

### Requirement: API Key Validation

The system SHALL validate API keys on every request.

#### Scenario: Valid key
- **WHEN** request includes valid API key in Authorization header
- **THEN** hash key and lookup in api_keys table
- **AND** verify key is not revoked
- **AND** attach client_id to request context
- **AND** update last_used_at timestamp

#### Scenario: Invalid key
- **WHEN** request includes invalid API key
- **THEN** return 401 Unauthorized
- **AND** do not reveal whether key exists or is revoked

#### Scenario: Missing key
- **WHEN** request has no Authorization header
- **THEN** return 401 Unauthorized
- **AND** include instructions for authentication

### Requirement: API Key Management

The system SHALL allow clients to manage their API keys.

#### Scenario: List keys
- **WHEN** client requests key list
- **THEN** return keys showing prefix and name only
- **AND** include created_at and last_used_at
- **AND** never return full key or hash

#### Scenario: Revoke key
- **WHEN** client revokes an API key
- **THEN** set revoked_at timestamp
- **AND** key becomes immediately invalid
- **AND** key remains in database for audit

#### Scenario: Rotate key
- **WHEN** client rotates an API key
- **THEN** generate new key
- **AND** revoke old key
- **AND** return new key (only shown once)

### Requirement: Subscription Validation

API authentication SHALL verify active subscription.

#### Scenario: Active subscription
- **WHEN** API key is valid
- **AND** client has active subscription
- **THEN** allow request to proceed

#### Scenario: Expired subscription
- **WHEN** API key is valid
- **AND** subscription is expired
- **THEN** return 403 Forbidden
- **AND** include reactivation instructions

#### Scenario: Trial subscription
- **WHEN** API key is valid
- **AND** subscription is in trial period
- **THEN** allow request to proceed
- **AND** include trial expiration warning in response

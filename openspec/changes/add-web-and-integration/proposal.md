# Change: Add Web Presence & Integration

## Why

While the AI chat is the primary interface, GEO MCP needs a minimal web presence for:
1. Marketing and explaining the product
2. Subscription signup and billing management
3. API key generation and retrieval
4. Documentation for MCP installation

This proposal also covers connecting the MCP server to the real backend (removing mocks) and adding production infrastructure (monitoring, analytics).

## What Changes

- Create minimal Next.js web app with landing, pricing, connect, account, and docs pages
- Implement Stripe checkout integration for subscriptions
- Add Supabase Auth for web login (email/password)
- Connect MCP server to real backend API (remove mock mode)
- Add Sentry for error monitoring
- Add PostHog for analytics
- Configure Cloudflare for CDN and security
- Create production deployment pipeline

## Impact

- Affected specs: `web-presence`, `integration` (new capabilities)
- Affected code: `apps/web/` (new), MCP package updates
- Dependencies: Proposal 1-7 (all prior proposals)
- Dependents: None (final proposal)

## Acceptance Criteria

1. Landing page clearly explains GEO MCP value proposition
2. Users can sign up, pay via Stripe, and receive API key
3. Users can manage billing via Stripe customer portal
4. Documentation explains MCP installation and usage
5. MCP server connects to production backend when API key is set
6. Errors are reported to Sentry with proper context
7. Key user actions are tracked in PostHog
8. Site loads fast via Cloudflare CDN

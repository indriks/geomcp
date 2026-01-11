# Design: Backend Infrastructure

## Context

The GEO MCP backend needs to:
- Store client profiles and content tracking data
- Authenticate MCP requests via API keys
- Manage subscriptions via Stripe
- Run automated jobs for citation checking

## Goals / Non-Goals

**Goals:**
- Simple, maintainable backend on Vercel + Supabase
- Secure API key authentication
- Reliable Stripe subscription management
- Automated citation and freshness monitoring

**Non-Goals:**
- Complex user management (single API key per client)
- Multi-tenancy at database level (RLS handles this)
- Real-time features (polling is sufficient)

## Decisions

### Database: Supabase (PostgreSQL)

**Decision:** Use Supabase for database, auth foundation, and edge functions

**Rationale:**
- PostgreSQL for relational data (clients, content, citations)
- Built-in Row Level Security
- Edge functions for serverless operations
- Generous free tier for development
- Easy local development with Supabase CLI

### API: Vercel Functions

**Decision:** Use Vercel Functions for API endpoints

**Rationale:**
- Zero-config deployment from monorepo
- Native TypeScript support
- Built-in cron job support
- Edge runtime available if needed
- Same platform as potential web app

### Authentication: API Keys

**Decision:** Custom API key authentication (not Supabase Auth)

**Rationale:**
- MCP servers need machine-to-machine auth
- API keys are simpler for CLI/MCP use case
- Users don't need accounts, just keys
- Keys are tied to subscription, not user identity

**Implementation:**
```
API Key Format: sk_live_{32_random_chars}
Storage: SHA-256 hash in api_keys table
Prefix: First 8 chars stored for display (sk_live_)
```

**Request flow:**
1. MCP sends `Authorization: Bearer sk_live_xxx`
2. Backend hashes key and looks up in api_keys
3. If valid, attach client_id to request
4. If invalid/revoked, return 401

### Billing: Stripe

**Decision:** Stripe for subscription management

**Rationale:**
- Industry standard for SaaS billing
- Handles recurring payments, invoicing, tax
- Customer portal for self-service
- Webhooks for subscription lifecycle

**Single product:**
- Name: "GEO MCP Standard"
- Price: €1,500/month (€150.00 = 15000 cents)
- Billing: Monthly, auto-renew

### Cron Jobs: Vercel Cron

**Decision:** Use Vercel Cron for scheduled jobs

**Rationale:**
- Native integration with Vercel Functions
- Simple configuration in vercel.json
- Reliable scheduling
- No additional infrastructure

**Schedule:**
```json
{
  "crons": [
    {
      "path": "/api/cron/citations",
      "schedule": "0 6 * * *"  // Daily at 6 AM UTC
    },
    {
      "path": "/api/cron/refresh",
      "schedule": "0 7 * * 1"  // Weekly Monday at 7 AM UTC
    }
  ]
}
```

### Database Schema

**Entity Relationship:**
```
clients 1──* api_keys
clients 1──* subscriptions
clients 1──* expert_quotes
clients 1──* content_mentions
clients 1──* citations
clients 1──* monitored_queries
```

**Key indexes:**
- `api_keys.key_hash` (unique, for auth lookup)
- `citations(client_id, checked_at)` (for reports)
- `content_mentions(client_id, content_path)` (for lookups)
- `monitored_queries(client_id, priority)` (for cron)

### Row Level Security

Each table uses client_id for RLS:

```sql
CREATE POLICY "Clients can only see their own data"
  ON content_mentions
  FOR ALL
  USING (client_id = current_setting('app.client_id')::uuid);
```

API middleware sets `app.client_id` after auth.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Vercel cold starts | Keep functions warm, use edge where possible |
| API key exposure | Hash storage, key rotation support |
| Cron job failures | Idempotent operations, alerting on failures |
| Supabase limits | Monitor usage, upgrade tier if needed |

## Migration Plan

1. Set up Supabase project and run migrations
2. Deploy API to Vercel with test keys
3. Connect MCP server to real backend
4. Enable Stripe webhooks
5. Test subscription flow end-to-end

## Open Questions

1. Should we support multiple API keys per client? (Probably yes for team use)
2. Do we need webhook retries for citation alerts? (Defer until needed)

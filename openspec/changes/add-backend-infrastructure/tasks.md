# Tasks: Backend Infrastructure

## 1. Supabase Project Setup

- [x] 1.1 Create Supabase project for geomcp
- [x] 1.2 Configure project settings (region, tier)
- [x] 1.3 Set up local development with Supabase CLI
- [x] 1.4 Create `apps/api/` directory in monorepo
- [x] 1.5 Add Supabase client dependency

## 2. Database Schema

- [x] 2.1 Create migration: `clients` table
- [x] 2.2 Create migration: `expert_quotes` table
- [x] 2.3 Create migration: `api_keys` table
- [x] 2.4 Create migration: `subscriptions` table
- [x] 2.5 Create migration: `content_mentions` table
- [x] 2.6 Create migration: `citations` table
- [x] 2.7 Create migration: `monitored_queries` table
- [x] 2.8 Create indexes for common queries
- [x] 2.9 Set up Row Level Security (RLS) policies

## 3. API Endpoints

- [x] 3.1 Create `apps/api/package.json` with Vercel Functions setup
- [x] 3.2 Create API route structure
- [x] 3.3 Implement auth middleware for API key validation
- [x] 3.4 Implement `/api/status` endpoint
- [x] 3.5 Implement `/api/profile` endpoints (GET, PUT)
- [x] 3.6 Implement `/api/content` endpoints
- [x] 3.7 Implement `/api/citations/*` endpoints
- [x] 3.8 Add request logging and error handling

## 4. Authentication

- [x] 4.1 Implement API key generation function
- [x] 4.2 Create API key hashing utility (SHA-256)
- [x] 4.3 Implement API key validation middleware
- [x] 4.4 Add rate limiting per API key
- [x] 4.5 Create `/api/keys` endpoint for key management
- [x] 4.6 Implement key rotation support

## 5. Stripe Integration

- [x] 5.1 Create Stripe product and price (€1,500/month)
- [x] 5.2 Implement Stripe webhook handler
- [x] 5.3 Handle `customer.subscription.created` event
- [x] 5.4 Handle `customer.subscription.updated` event
- [x] 5.5 Handle `customer.subscription.deleted` event
- [x] 5.6 Handle `invoice.payment_failed` event
- [x] 5.7 Create checkout session endpoint
- [x] 5.8 Create customer portal session endpoint

## 6. Cron Jobs

- [x] 6.1 Create `vercel.json` with cron configuration
- [x] 6.2 Implement daily citation check job (`/api/cron/citations`)
  - [x] 6.2.1 Fetch all active clients with monitored queries
  - [x] 6.2.2 Check high-priority queries daily
  - [x] 6.2.3 Check medium queries 3x/week
  - [x] 6.2.4 Check low queries weekly
  - [x] 6.2.5 Store results in citations table
  - [x] 6.2.6 Detect and log citation changes
- [x] 6.3 Implement weekly content refresh job (`/api/cron/refresh`)
  - [x] 6.3.1 Identify content >25 days old (warning)
  - [x] 6.3.2 Identify content >30 days old (action needed)
  - [x] 6.3.3 Store alerts for client notification
- [x] 6.4 Add cron job authentication (CRON_SECRET)

## 7. Environment & Secrets

- [x] 7.1 Document required environment variables
- [x] 7.2 Set up Vercel environment variables
- [x] 7.3 Set up Supabase connection string
- [x] 7.4 Configure Stripe API keys (test + live)
- [x] 7.5 Add CRON_SECRET for cron job auth

## 8. Testing

- [x] 8.1 Add integration tests for API endpoints
- [x] 8.2 Add unit tests for auth middleware
- [x] 8.3 Add unit tests for Stripe webhook handling
- [x] 8.4 Create test fixtures and factories

## Verification

```bash
# Local development
supabase start
pnpm --filter api dev

# Test endpoints
curl -H "Authorization: Bearer sk_test_xxx" http://localhost:3000/api/status
curl -X POST -H "Authorization: Bearer sk_test_xxx" \
  -d '{"queries":["test query"],"platforms":["chatgpt"]}' \
  http://localhost:3000/api/citations/check

# Run migrations
supabase db push

# Test Stripe webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

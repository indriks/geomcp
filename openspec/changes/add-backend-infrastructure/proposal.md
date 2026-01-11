# Change: Add Backend Infrastructure

## Why

The MCP server needs a backend to persist data, manage subscriptions, and run automated jobs. This proposal sets up the complete backend infrastructure: Supabase database schema, Vercel API endpoints, authentication with API keys, Stripe billing integration, and cron jobs for automated citation checking and content refresh.

## What Changes

- Create Supabase project with database schema (clients, content_mentions, citations, monitored_queries)
- Implement Vercel API endpoints for MCP server communication
- Set up API key authentication using Supabase
- Integrate Stripe for subscription management (€1,500/month tier)
- Configure Vercel cron jobs for daily citation checks and content refresh alerts
- Set up environment variables and secrets management

## Impact

- Affected specs: `backend-database`, `backend-api`, `backend-auth`, `backend-cron` (new capabilities)
- Affected code: `apps/api/` (new), Supabase migrations
- Dependencies: Proposal 1 (Monorepo Foundation)
- Dependents: All MCP modules connect to real backend

## Acceptance Criteria

1. Database schema supports all data models (clients, content, citations)
2. API endpoints authenticate requests using API keys
3. Stripe webhook handles subscription lifecycle events
4. API keys are generated and managed securely
5. Daily cron job checks citations for all active clients
6. Weekly cron job identifies stale content for refresh
7. All endpoints have proper error handling and logging

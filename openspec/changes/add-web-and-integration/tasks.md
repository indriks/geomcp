# Tasks: Web Presence & Integration

## 1. Web App Setup

- [x] 1.1 Create `apps/web/` with Next.js 14+ (App Router)
- [x] 1.2 Configure Tailwind CSS
- [x] 1.3 Set up shared component library
- [x] 1.4 Add Supabase Auth client
- [x] 1.5 Configure environment variables

## 2. Landing Page (/)

- [x] 2.1 Create hero section with value proposition
- [x] 2.2 Add "MCPs replace apps" thesis explanation
- [x] 2.3 Create feature highlights section
- [x] 2.4 Add statistics section (527% growth, etc.)
- [x] 2.5 Create call-to-action for signup
- [x] 2.6 Add footer with links

## 3. Pricing Page (/pricing)

- [x] 3.1 Create single-tier pricing display (€1,500/month)
- [x] 3.2 List included features
- [x] 3.3 Add "Get Started" button linking to /connect
- [x] 3.4 Create FAQ section

## 4. Connect Page (/connect)

- [x] 4.1 Create account creation form (email/password)
- [x] 4.2 Implement Supabase Auth signup
- [x] 4.3 After signup, redirect to Stripe checkout
- [x] 4.4 After payment, generate and display API key
- [x] 4.5 Show MCP installation instructions
- [x] 4.6 Copy-to-clipboard for API key and config

## 5. Account Page (/account)

- [x] 5.1 Create protected route (require auth)
- [x] 5.2 Display subscription status
- [x] 5.3 Add "Manage Billing" button (Stripe portal)
- [x] 5.4 Display API keys with management
- [x] 5.5 Add "Generate New Key" functionality
- [x] 5.6 Add "Revoke Key" functionality

## 6. Documentation (/docs)

- [x] 6.1 Create docs layout with sidebar navigation
- [x] 6.2 Write "Getting Started" guide
- [x] 6.3 Write "Tools Reference" pages
- [x] 6.4 Write "GEO Best Practices" guide
- [x] 6.5 Add code examples with syntax highlighting
- [x] 6.6 Add comprehensive documentation content

## 7. Stripe Integration

- [x] 7.1 Create Stripe checkout session endpoint
- [x] 7.2 Create Stripe customer portal session endpoint
- [x] 7.3 Handle checkout.session.completed event
- [x] 7.4 Create client record on successful payment
- [x] 7.5 Generate initial API key on payment
- [x] 7.6 Send welcome email with API key (Resend integration)

## 8. MCP Backend Connection

- [x] 8.1 Update MCP API client to use production URL
- [x] 8.2 Remove mock data fallbacks (or make conditional)
- [x] 8.3 Add proper error handling for network failures
- [x] 8.4 Implement retry logic with exponential backoff
- [x] 8.5 Add connection status indicator in status response

## 9. Monitoring & Analytics

- [x] 9.1 Set up Sentry SDK integration for web
- [x] 9.2 Add Sentry SDK to web app (sentry.client.config.ts)
- [x] 9.3 Add Sentry SDK to MCP package (lib/sentry.ts)
- [x] 9.4 Configure source maps upload (next.config.js)
- [x] 9.5 Set up PostHog SDK integration
- [x] 9.6 Add PostHog SDK to web app (lib/posthog.tsx)
- [x] 9.7 Track key events (analytics helpers)
- [x] 9.8 Configure alerting (Sentry DSN in env)

## 10. Infrastructure

- [x] 10.1 Configure environment variables (.env.example)
- [x] 10.2 Set up security headers (next.config.js)
- [x] 10.3 Configure caching rules (Next.js defaults)
- [x] 10.4 Add security headers (HSTS, XSS, etc.)
- [x] 10.5 Set up Vercel project for web app
- [x] 10.6 Configure Vercel environment variables
- [x] 10.7 Set up preview deployments for PRs

## 11. Testing & Launch

- [x] 11.1 Unit tests for shared types and LLM service
- [x] 11.2 Build verification (pnpm build passes)
- [x] 11.3 Lint verification (pnpm lint passes)
- [x] 11.4 CI pipeline configuration (GitHub Actions)
- [x] 11.5 Documentation complete (README, CONTRIBUTING)
- [x] 11.6 All OpenSpec tasks verified

## Verification

```bash
# Local development
pnpm --filter web dev

# Test signup flow
1. Go to /connect
2. Create account
3. Complete Stripe checkout (test card)
4. Verify API key is generated
5. Copy MCP config
6. Install MCP in Claude Desktop
7. Run geomcp_status - should connect to production

# Monitoring
1. Trigger error in web app
2. Verify appears in Sentry
3. Check PostHog for event tracking
```

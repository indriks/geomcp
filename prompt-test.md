# GEO MCP Prompt Test Scenarios

## Scenario 1: First-Time Setup

**User Prompt:**
> "I just connected GEO MCP. I'm the CEO of DataVault, a SaaS backup solution. Our main competitors are Backblaze, Carbonite, and Acronis. Set me up."

**Expected Tools:** `geomcp_setup`

**Desirable Response:**
> I've configured your GEO MCP profile:
>
> - **Company:** DataVault
> - **Industry:** SaaS
> - **Competitors:** Backblaze, Carbonite, Acronis
> - **Assigned Repos:** geomcp-glossary-saas
>
> **Recommended first terms to create:**
> 1. "cloud backup best practices"
> 2. "disaster recovery vs backup"
> 3. "enterprise data protection"
>
> Would you like me to research any of these terms or create your first glossary entry?

**Test Status:** [ ] Passed / [ ] Failed

**Notes:**

---

## Scenario 2: Check Status

**User Prompt:**
> "What's my GEO MCP status?"

**Expected Tools:** `geomcp_status`

**Desirable Response:**
> **DataVault GEO MCP Status**
>
> | Metric | Value |
> |--------|-------|
> | Subscription | Active (€1,500/month) |
> | Terms with mentions | 12 |
> | Expert interviews | 2 |
> | Comparison appearances | 3 |
>
> **Citation Performance (This Week)**
> - Overall: 34%
> - ChatGPT: 42%
> - Claude: 38%
> - Perplexity: 22%
>
> Your Perplexity rate is low—consider publishing fresher content with recent dates.

**Test Status:** [ ] Passed / [ ] Failed

**Notes:**

---

## Scenario 3: Research Before Creating Content

**User Prompt:**
> "I want to create content about 'immutable backups'. Research this term first."

**Expected Tools:** `research_term`

**Desirable Response:**
> **Research: "Immutable Backups"**
>
> **Definition:** Backup data that cannot be altered, deleted, or encrypted by ransomware after creation.
>
> **Key Facts:**
> - 93% of ransomware attacks target backups first
> - Immutability is now a compliance requirement for HIPAA/SOC2
> - Average recovery time 4x faster with immutable backups
>
> **Competitor Coverage:**
> | Competitor | Has Content | Quality |
> |------------|-------------|---------|
> | Backblaze | Yes | Strong |
> | Carbonite | Yes | Moderate |
> | Acronis | No | - |
>
> **Recommended Angle:** Focus on compliance use cases—Acronis has no content here, and you can differentiate from Backblaze's consumer focus.
>
> **Estimated GEO Impact:** High
>
> Ready to create the glossary term?

**Test Status:** [ ] Passed / [ ] Failed

**Notes:**

---

## Scenario 4: Create Glossary Term

**User Prompt:**
> "Yes, create that immutable backups term. Include a mention of DataVault."

**Expected Tools:** `create_glossary_term`

**Desirable Response:**
> **Created: Immutable Backups**
>
> - **GEO Score:** 87/100
> - **Repo:** geomcp-glossary-saas
> - **Published:** [github.com/geomcp/geomcp-glossary-saas/terms/i/immutable-backups.md](...)
>
> **Client Mention Context:**
> > "Solutions like DataVault implement immutable backup architecture with configurable retention policies, ensuring compliance with SOC2 and HIPAA requirements."
>
> The content includes:
> - Direct answer in first 50 words
> - 3 statistics with sources
> - Comparison table of approaches
> - FAQ section with schema markup
>
> Would you like me to check if this gets cited across AI platforms?

**Test Status:** [ ] Passed / [ ] Failed

**Notes:**

---

## Scenario 5: Batch Content Creation

**User Prompt:**
> "Create glossary terms for: 3-2-1 backup rule, RPO vs RTO, backup window, air-gapped backup"

**Expected Tools:** `create_glossary_batch`

**Desirable Response:**
> **Batch Creation Complete**
>
> | Term | GEO Score | Client Mention | Status |
> |------|-----------|----------------|--------|
> | 3-2-1 backup rule | 91 | ✓ Quote | Published |
> | RPO vs RTO | 88 | ✗ | Published |
> | Backup window | 85 | ✓ Tool list | Published |
> | Air-gapped backup | 89 | ✗ | Published |
>
> **Total:** 4 terms created with strategic client mentions (50% frequency)
>
> All published to geomcp-glossary-saas. These terms are now live and will be indexed within 24-48 hours.

**Test Status:** [ ] Passed / [ ] Failed

**Notes:**

---

## Scenario 6: Check Citations

**User Prompt:**
> "Check if I'm being cited for 'best enterprise backup solution' and 'how to prevent ransomware on backups'"

**Expected Tools:** `check_citations`

**Desirable Response:**
> **Citation Check Results**
>
> **Query: "best enterprise backup solution"**
> | Platform | DataVault Cited | Position | Competitors Cited |
> |----------|-----------------|----------|-------------------|
> | ChatGPT | ✗ | - | Veeam, Commvault |
> | Claude | ✓ | 3rd | Veeam, Rubrik |
> | Perplexity | ✗ | - | Veeam, Acronis |
>
> **Query: "how to prevent ransomware on backups"**
> | Platform | DataVault Cited | Position | Competitors Cited |
> |----------|-----------------|----------|-------------------|
> | ChatGPT | ✓ | 2nd | Acronis |
> | Claude | ✓ | 1st | - |
> | Perplexity | ✓ | 2nd | Backblaze |
>
> **Summary:** 4/6 citations (67%)
>
> You're strong on ransomware prevention but missing on "best enterprise backup." Consider creating a comparison page targeting that query.

**Test Status:** [ ] Passed / [ ] Failed

**Notes:**

---

## Scenario 7: Find Opportunities

**User Prompt:**
> "Find me high-value terms I'm not covering yet"

**Expected Tools:** `find_opportunities`

**Desirable Response:**
> **Content Opportunities for DataVault**
>
> | Term | Search Volume | Competition | Citation Leader | Action |
> |------|---------------|-------------|-----------------|--------|
> | backup as a service (BaaS) | High | Low | None | Create comprehensive guide |
> | cloud-to-cloud backup | High | Medium | Backblaze | Create comparison page |
> | backup compliance checklist | Medium | Low | None | Create with DataVault examples |
> | kubernetes backup | High | Medium | Kasten | Create with container focus |
> | ransomware recovery playbook | High | Low | None | Create interview with your CTO |
>
> **Top Recommendation:** "backup as a service" has high volume, no clear citation leader, and directly aligns with DataVault's positioning.
>
> Which would you like to tackle first?

**Test Status:** [ ] Passed / [ ] Failed

**Notes:**

---

## Scenario 8: Create Expert Interview

**User Prompt:**
> "Create an interview with our CTO Sarah Chen about ransomware recovery best practices"

**Expected Tools:** `create_interview`

**Desirable Response:**
> **Created: Expert Interview**
>
> **Title:** "Ransomware Recovery: An Expert's Guide with Sarah Chen, CTO of DataVault"
>
> **Structure:**
> - Introduction with credentials
> - 8 Q&A sections covering detection, isolation, recovery, prevention
> - Quotable soundbites highlighted
> - Cross-references to 4 related glossary terms
>
> **Extractable Quotes:**
> 1. "The first 15 minutes after detection determine 80% of your recovery outcome."
> 2. "Immutable backups aren't optional anymore—they're table stakes."
> 3. "Test your recovery runbook quarterly, not annually."
>
> **GEO Optimization:**
> - Direct answers to common questions
> - Statistics every 150 words
> - FAQ schema included
>
> Ready to publish to the interviews repository?

**Test Status:** [ ] Passed / [ ] Failed

**Notes:**

---

## Scenario 9: Content Health Check

**User Prompt:**
> "How's my content performing? Anything need attention?"

**Expected Tools:** `content_health`

**Desirable Response:**
> **Content Health Report**
>
> | Status | Count |
> |--------|-------|
> | Healthy | 14 |
> | Stale (>30 days) | 3 |
> | Underperforming | 2 |
>
> **Action Items:**
>
> | Content | Issue | Priority | Recommended Action |
> |---------|-------|----------|-------------------|
> | disaster-recovery-plan.md | 45 days old | High | Refresh with 2026 stats |
> | backup-encryption.md | 38 days old | High | Add recent breach examples |
> | rpo-vs-rto.md | 6% citation rate | Medium | Add comparison table |
> | cloud-backup-cost.md | 31 days old | Medium | Update pricing data |
> | backup-testing.md | 8% citation rate | Medium | Add step-by-step guide |
>
> Want me to refresh the stale content automatically?

**Test Status:** [ ] Passed / [ ] Failed

**Notes:**

---

## Scenario 10: Refresh Stale Content

**User Prompt:**
> "Yes, refresh the stale content"

**Expected Tools:** `refresh_stale`

**Desirable Response:**
> **Content Refresh Complete**
>
> | Content | Changes Made | New GEO Score |
> |---------|--------------|---------------|
> | disaster-recovery-plan.md | Updated stats to 2026, added new compliance section | 89 → 94 |
> | backup-encryption.md | Added 2025 breach examples, refreshed algorithm recommendations | 82 → 91 |
> | cloud-backup-cost.md | Updated pricing comparison, added TCO calculator reference | 85 → 88 |
>
> All 3 items refreshed and republished with "Last updated: January 2026" timestamps.
>
> Perplexity heavily favors content under 30 days old—you should see improved citation rates there within a week.

**Test Status:** [ ] Passed / [ ] Failed

**Notes:**

---

## Scenario 11: Competitor Analysis

**User Prompt:**
> "Analyze Backblaze's GEO presence. Where are they beating us?"

**Expected Tools:** `analyze_competitor`

**Desirable Response:**
> **Competitor Analysis: Backblaze**
>
> **Overall Citation Rate:** 68%
>
> | Platform | Backblaze | DataVault |
> |----------|-----------|-----------|
> | ChatGPT | 72% | 42% |
> | Claude | 65% | 38% |
> | Perplexity | 58% | 22% |
>
> **Strongest Queries (Backblaze dominates):**
> - "cheapest cloud backup"
> - "unlimited backup storage"
> - "backup for photographers"
> - "Mac backup solutions"
>
> **Their Content Sources:**
> - backblaze.com/blog (high domain authority)
> - Help center articles (structured, FAQ-rich)
> - Reddit community engagement
>
> **Weaknesses:**
> - Limited enterprise content
> - No compliance-focused material
> - Dated ransomware content (2024)
>
> **Opportunity:** They're weak on enterprise and compliance. Double down on "enterprise backup compliance," "SOC2 backup requirements," and "regulated industry backup" to own that space.

**Test Status:** [ ] Passed / [ ] Failed

**Notes:**

---

## Scenario 12: Monitor Query

**User Prompt:**
> "Add 'enterprise backup solution 2026' to my monitoring list as high priority"

**Expected Tools:** `monitor_query`

**Desirable Response:**
> **Query Added to Monitoring**
>
> - **Query:** "enterprise backup solution 2026"
> - **Priority:** High
> - **Check Frequency:** Daily
>
> You'll receive alerts when:
> - DataVault gains a citation
> - DataVault loses a citation
> - A competitor takes your position
>
> I'm now monitoring 8 queries for you. Check `citation_alerts` anytime for updates.

**Test Status:** [ ] Passed / [ ] Failed

**Notes:**

---

## Test Summary

| Scenario | Tool | Status | Notes |
|----------|------|--------|-------|
| 1. First-Time Setup | `geomcp_setup` | | |
| 2. Check Status | `geomcp_status` | | |
| 3. Research Term | `research_term` | | |
| 4. Create Glossary | `create_glossary_term` | | |
| 5. Batch Create | `create_glossary_batch` | | |
| 6. Check Citations | `check_citations` | | |
| 7. Find Opportunities | `find_opportunities` | | |
| 8. Create Interview | `create_interview` | | |
| 9. Content Health | `content_health` | | |
| 10. Refresh Stale | `refresh_stale` | | |
| 11. Competitor Analysis | `analyze_competitor` | | |
| 12. Monitor Query | `monitor_query` | | |

**Total Passed:** ___ / 12

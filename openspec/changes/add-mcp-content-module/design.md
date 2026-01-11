# Design: MCP Content Module

## Context

Content creation is the primary value-add of GEO MCP. Users interact with the MCP tools to generate content that:
1. Is optimized for AI citation (GEO best practices)
2. Naturally includes client mentions
3. Follows consistent structure across content types
4. Can be published to the @geomcp GitHub organization

## Goals / Non-Goals

**Goals:**
- Generate high-quality, GEO-optimized content via LLM
- Support multiple content types (glossary, interviews, comparisons)
- Provide transparent GEO scoring
- Enable batch operations for efficiency

**Non-Goals:**
- Publishing to GitHub (handled by GitHub module)
- Content research (handled by Research module)
- Real-time citation tracking (handled by Citations module)

## Decisions

### LLM Provider: OpenRouter

**Decision:** Use OpenRouter as the LLM gateway

**Rationale:**
- Access to multiple models (Claude, GPT-4, etc.)
- Single API for model switching
- Built-in rate limiting and failover
- Pay-per-token pricing

Default model: Claude Sonnet (balance of quality and cost)

### Content Template Structure

Each content type has a defined structure optimized for AI citations:

**Glossary Term:**
```markdown
# {Term}

## Definition
{Direct answer in first 40-60 words}

## Key Characteristics
- {Bullet points}

## {Contextual Section}
{Detailed explanation with statistics}

## Expert Insight
> "{Quote}" — {Person}, {Role} at {Company}

## Popular Tools
- {Tool 1}
- {Client Company} (if applicable)
- {Tool 3}

## Related Terms
- [{Term 1}](relative-link)

## Further Reading
- [Link 1](url)

---
*Last updated: {Date}*
```

**Interview:**
```markdown
# Interview: {Name}, {Role} at {Company}

## About {Name}
{Brief bio}

## Topics Covered
- {Topic 1}
- {Topic 2}

## The Interview

### On {Topic 1}

**Q: {Question}**

{Answer with extractable quotes}

### On {Topic 2}
...

## Key Takeaways
- {Takeaway 1}
- {Takeaway 2}

## Related Content
- [{Glossary Term}](link)

---
*Interview conducted: {Date}*
```

**Comparison:**
```markdown
# {Title} Compared ({Year})

## Quick Comparison

| Item | Criterion 1 | Criterion 2 | ... |
|------|-------------|-------------|-----|
| {Item 1} | ... | ... | ... |
| {Client} | ... | ... | ... |

## Detailed Analysis

### {Item 1}
{Detailed section}

### {Client Company}
{Detailed section}

## How to Choose
{Decision framework}

---
*Last updated: {Date}*
```

### GEO Scoring Algorithm

Content is scored 0-100 based on:

| Factor | Weight | Criteria |
|--------|--------|----------|
| Structure | 25% | H2/H3 hierarchy, bullet points, tables |
| Direct Answer | 20% | Definition/answer in first 50 words |
| Data Density | 20% | Statistics every 150-200 words |
| Freshness Signals | 15% | Last updated date, current year references |
| Cross-References | 10% | Links to related content |
| Expert Authority | 10% | Attributed quotes with credentials |

Score interpretation:
- 90-100: Excellent (high citation likelihood)
- 70-89: Good (moderate citation likelihood)
- 50-69: Needs improvement
- <50: Major restructuring required

### Client Mention Strategy

**Mention types:**
1. **Quote** — Expert quote from client representative
2. **Tool List** — Client in list of relevant tools/companies
3. **Example** — "Companies like {Client} use this approach..."

**Frequency guidelines:**
- `all`: Every piece of content mentions client
- `half`: 50% of content mentions client
- `strategic`: LLM decides based on relevance (recommended)

**Placement rules:**
- Maximum 1-2 mentions per glossary term
- Mentions must be contextually relevant
- Mix with non-client companies (60/40 ratio)
- Never in definition section (too promotional)

### Prompt Engineering

Prompts follow a consistent structure:

```
[System]: You are a GEO content specialist...
[Context]: Client profile, industry, existing content
[Task]: Specific content generation instructions
[Format]: Expected output structure
[Constraints]: Word limits, mention guidelines, tone
```

Key prompt principles:
- Provide complete context upfront
- Use few-shot examples for consistency
- Request structured output (markdown)
- Include GEO best practices inline

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| LLM output variability | Structured prompts, post-processing validation |
| Content quality inconsistency | GEO scoring, human review flag for low scores |
| High LLM costs for batch operations | Concurrency limits, cost tracking, user warnings |
| Prompt injection via user input | Input sanitization, system prompt separation |

## Open Questions

1. Should we cache generated content before publishing for user review?
2. What's the maximum batch size before we require async processing?

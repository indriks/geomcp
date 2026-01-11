# Capability: MCP Research Module

## ADDED Requirements

### Requirement: Term Research

The `research_term` tool SHALL provide comprehensive research on a term before content creation.

#### Scenario: Quick research
- **WHEN** `research_term` is called with `depth: 'quick'`
- **THEN** return definition, key facts, and related terms
- **AND** complete within 5 seconds
- **AND** include source attribution

#### Scenario: Comprehensive research
- **WHEN** `research_term` is called with `depth: 'comprehensive'`
- **THEN** return definition, key facts, statistics, related terms
- **AND** analyze competitor coverage with quality assessment
- **AND** provide recommended angle for content
- **AND** estimate GEO impact potential

#### Scenario: Competitor coverage analysis
- **WHEN** research includes competitor coverage
- **THEN** check each competitor in client's profile
- **AND** indicate whether competitor has content on the term
- **AND** rate competitor content quality (weak/moderate/strong)

#### Scenario: Research caching
- **WHEN** same term is researched within 24 hours
- **THEN** return cached results
- **AND** indicate results are from cache

### Requirement: Opportunity Discovery

The `find_opportunities` tool SHALL identify high-value terms not yet covered by the client.

#### Scenario: Category-based discovery
- **WHEN** `find_opportunities` is called with category and limit
- **THEN** return terms relevant to that category
- **AND** rank by opportunity score
- **AND** include search volume and competition estimates

#### Scenario: Opportunity scoring
- **WHEN** opportunities are ranked
- **THEN** score considers search volume (estimated)
- **AND** score considers current competition
- **AND** score considers client relevance
- **AND** higher scores indicate better opportunities

#### Scenario: Existing content exclusion
- **WHEN** opportunities are discovered
- **THEN** exclude terms already covered in @geomcp repos
- **AND** exclude terms where client already has strong presence

#### Scenario: Actionable recommendations
- **WHEN** opportunity is returned
- **THEN** include recommended action (create term, comparison, etc.)
- **AND** identify current citation leader to compete against

### Requirement: Competitor Analysis

The `analyze_competitor` tool SHALL provide detailed analysis of a competitor's GEO presence.

#### Scenario: Citation rate analysis
- **WHEN** `analyze_competitor` is called
- **THEN** estimate competitor's overall citation rate
- **AND** break down by platform (ChatGPT, Claude, Perplexity)
- **AND** identify strongest queries where competitor dominates

#### Scenario: Content source identification
- **WHEN** competitor is analyzed
- **THEN** identify content sources (website, GitHub, Wikipedia, etc.)
- **AND** analyze which sources contribute to AI citations

#### Scenario: Weakness identification
- **WHEN** competitor is analyzed
- **THEN** identify gaps in competitor's coverage
- **AND** identify terms where competitor is weak
- **AND** suggest counter-strategy opportunities

#### Scenario: Strategy summary
- **WHEN** analysis is complete
- **THEN** provide actionable strategy summary
- **AND** recommend specific terms to target
- **AND** suggest content types to create

### Requirement: Search Integration

The research module SHALL integrate with web search APIs for real-time data.

#### Scenario: Search provider availability
- **WHEN** research requires web search
- **AND** primary provider (Exa) is available
- **THEN** use Exa for search
- **AND** normalize results to common format

#### Scenario: Search provider fallback
- **WHEN** primary provider is unavailable
- **THEN** fall back to secondary provider (Tavily)
- **AND** results format remains consistent

#### Scenario: Search error handling
- **WHEN** all search providers fail
- **THEN** return partial results from cache if available
- **AND** indicate search limitation in response

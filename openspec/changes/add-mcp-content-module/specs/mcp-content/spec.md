# Capability: MCP Content Module

## ADDED Requirements

### Requirement: Glossary Term Creation

The `create_glossary_term` tool SHALL generate a GEO-optimized glossary term with optional client mention.

#### Scenario: Create term with client mention
- **WHEN** `create_glossary_term` is called with term, category, and `include_client_mention: true`
- **THEN** generate markdown following the glossary template
- **AND** definition appears in first 50 words
- **AND** content includes H2/H3 hierarchy
- **AND** client mention is included based on `mention_type`
- **AND** GEO score is calculated and returned

#### Scenario: Create term without client mention
- **WHEN** `create_glossary_term` is called with `include_client_mention: false`
- **THEN** generate complete glossary term without client references
- **AND** term is still GEO-optimized with proper structure

#### Scenario: Preview mode
- **WHEN** `create_glossary_term` is called with `publish: false`
- **THEN** return generated markdown for review
- **AND** do not publish to GitHub

### Requirement: Batch Glossary Creation

The `create_glossary_batch` tool SHALL generate multiple glossary terms in a single operation.

#### Scenario: Batch with strategic mentions
- **WHEN** `create_glossary_batch` is called with terms array and `client_mention_frequency: 'strategic'`
- **THEN** LLM determines which terms should include client mentions
- **AND** overall ratio follows 60/40 non-client/client guideline
- **AND** results include success/failure status per term

#### Scenario: Batch with all mentions
- **WHEN** `create_glossary_batch` is called with `client_mention_frequency: 'all'`
- **THEN** every generated term includes a client mention
- **AND** mention types vary to avoid repetition

#### Scenario: Partial failure handling
- **WHEN** some terms fail during batch generation
- **THEN** successful terms are returned
- **AND** failed terms are listed with error reasons
- **AND** user can retry failed terms individually

### Requirement: Interview Creation

The `create_interview` tool SHALL generate structured expert interviews optimized for AI citation.

#### Scenario: Generate questions for interview
- **WHEN** `create_interview` is called with `generate_questions: true`
- **THEN** generate 5-10 relevant questions based on topics
- **AND** questions are designed to elicit quotable responses
- **AND** return questions for user to conduct interview

#### Scenario: Structure existing transcript
- **WHEN** `create_interview` is called with `raw_transcript` provided
- **THEN** parse transcript into Q&A format
- **AND** extract key quotable segments
- **AND** generate cross-references to relevant glossary terms

#### Scenario: Interview output format
- **WHEN** interview is generated
- **THEN** output follows interview template structure
- **AND** each answer is self-contained and extractable
- **AND** key takeaways are summarized at the end

### Requirement: Comparison Page Creation

The `create_comparison` tool SHALL generate product or concept comparison pages with tabular data.

#### Scenario: Create comparison with client
- **WHEN** `create_comparison` is called with items array and `include_client: true`
- **THEN** generate comparison table with all items
- **AND** client appears in appropriate position (not always first)
- **AND** detailed analysis section includes client

#### Scenario: Create neutral comparison
- **WHEN** `create_comparison` is called with `include_client: false`
- **THEN** generate objective comparison without client
- **AND** useful as industry resource

#### Scenario: Comparison structure
- **WHEN** comparison is generated
- **THEN** quick comparison table is at the top
- **AND** each item has detailed analysis section
- **AND** "How to Choose" decision framework is included

### Requirement: Content Optimization

The `optimize_content` tool SHALL restructure existing content to improve GEO score.

#### Scenario: Optimize unstructured content
- **WHEN** `optimize_content` is called with plain text or markdown
- **THEN** analyze current GEO score
- **AND** restructure with proper headings and bullet points
- **AND** add direct answer in opening if missing
- **AND** return optimized content with before/after scores

#### Scenario: Already optimized content
- **WHEN** content already has high GEO score (>85)
- **THEN** suggest minor improvements only
- **AND** explain why major changes aren't needed

### Requirement: Content Suggestions

The `suggest_content` tool SHALL recommend high-value content opportunities based on client profile.

#### Scenario: Generate suggestions
- **WHEN** `suggest_content` is called
- **THEN** analyze client's industry and existing content
- **AND** identify gaps compared to competitors
- **AND** return ranked list of term/content suggestions
- **AND** each suggestion includes rationale and estimated impact

#### Scenario: Limit suggestions
- **WHEN** `suggest_content` is called with limit parameter
- **THEN** return at most the specified number of suggestions

### Requirement: GEO Score Calculation

All content creation tools SHALL calculate and return a GEO score.

#### Scenario: Score breakdown
- **WHEN** content is generated
- **THEN** GEO score (0-100) is calculated
- **AND** score breakdown by factor is available
- **AND** improvement suggestions are provided for low-scoring areas

#### Scenario: Score thresholds
- **WHEN** GEO score is below 70
- **THEN** content is flagged for review
- **AND** specific improvement recommendations are provided

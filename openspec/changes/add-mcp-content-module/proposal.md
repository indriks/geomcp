# Change: Add MCP Content Module

## Why

Content creation is the core value proposition of GEO MCP. Users need to generate GEO-optimized glossary terms, expert interviews, and comparison pages that naturally include client mentions. These tools leverage LLM capabilities to produce high-quality, AI-citation-optimized content.

## What Changes

- Implement `create_glossary_term` tool for single term creation
- Implement `create_glossary_batch` tool for bulk term creation
- Implement `create_interview` tool for structured expert interviews
- Implement `create_comparison` tool for product/concept comparisons
- Implement `optimize_content` tool for restructuring existing content
- Implement `suggest_content` tool for AI-powered content recommendations
- Integrate with OpenRouter for LLM-powered content generation
- Create content templates optimized for AI citations

## Impact

- Affected specs: `mcp-content` (new capability)
- Affected code: `packages/mcp/src/tools/content/`
- Dependencies: Proposal 1 (Monorepo), Proposal 2 (Core Module)
- Dependents: Proposal 6 (GitHub Module) for publishing

## Acceptance Criteria

1. `create_glossary_term` generates markdown with proper GEO structure (definition in first 50 words, H2/H3 hierarchy, expert quotes)
2. `create_glossary_batch` processes multiple terms with configurable client mention frequency
3. `create_interview` produces Q&A format with extractable quotes and cross-references
4. `create_comparison` generates tables and detailed analysis for 2-6 items
5. `optimize_content` restructures input content to follow GEO best practices
6. `suggest_content` returns ranked opportunities based on client profile
7. All content includes GEO score indicating optimization quality (0-100)
8. Content follows 60/40 non-client/client mention ratio guideline

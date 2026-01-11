# Change: Add MCP Research Module

## Why

Effective GEO strategy requires understanding the competitive landscape and identifying high-value opportunities. Before creating content, users need to research terms, analyze competitor presence, and find gaps in AI citation coverage. This module provides the intelligence layer that informs content decisions.

## What Changes

- Implement `research_term` tool for deep term research before content creation
- Implement `find_opportunities` tool for discovering high-value uncovered terms
- Implement `analyze_competitor` tool for competitive GEO analysis
- Integrate with Exa/Tavily for web search capabilities
- Create research data structures for caching and aggregation

## Impact

- Affected specs: `mcp-research` (new capability)
- Affected code: `packages/mcp/src/tools/research/`
- Dependencies: Proposal 1 (Monorepo), Proposal 2 (Core Module)
- Dependents: Content module benefits from research data

## Acceptance Criteria

1. `research_term` returns definition, key facts, statistics, related terms, competitor coverage, and recommended angle
2. `find_opportunities` identifies terms with high search volume but low competition
3. `analyze_competitor` provides citation rate, platform breakdown, strongest queries, and strategy summary
4. Research results include confidence scores and source attribution
5. Tools support both quick and comprehensive research depths
6. Results are cached to avoid redundant API calls

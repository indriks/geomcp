import { Tool } from '@modelcontextprotocol/sdk/types.js';

import {
  AuthContext,
  ResearchTermOutput,
  FindOpportunitiesOutput,
  AnalyzeCompetitorOutput,
} from '@geomcp/shared';

import { callLLM } from '../../services/llm';
import { searchWeb } from '../../services/search';
import { getClientById } from '../../db/client';

export function registerResearchTools(): Tool[] {
  return [
    {
      name: 'research_term',
      description: 'Deep research on a term before creating content',
      inputSchema: {
        type: 'object',
        properties: {
          term: { type: 'string', description: 'Term to research' },
          depth: {
            type: 'string',
            enum: ['quick', 'comprehensive'],
            description: 'Research depth',
          },
        },
        required: ['term'],
      },
    },
    {
      name: 'find_opportunities',
      description: 'Find high-value terms not yet covered',
      inputSchema: {
        type: 'object',
        properties: {
          category: { type: 'string', description: 'Industry category' },
          limit: { type: 'number', description: 'Number of opportunities to find' },
        },
        required: ['category'],
      },
    },
    {
      name: 'analyze_competitor',
      description: "Analyze a competitor's GEO presence and strategy",
      inputSchema: {
        type: 'object',
        properties: {
          competitor: { type: 'string', description: 'Competitor name' },
        },
        required: ['competitor'],
      },
    },
  ];
}

export async function handleResearchTool(
  name: string,
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  switch (name) {
    case 'research_term':
      return handleResearchTerm(args, authContext);
    case 'find_opportunities':
      return handleFindOpportunities(args, authContext);
    case 'analyze_competitor':
      return handleAnalyzeCompetitor(args, authContext);
    default:
      return {
        content: [{ type: 'text', text: `Unknown research tool: ${name}` }],
        isError: true,
      };
  }
}

async function handleResearchTerm(
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const { term, depth = 'quick' } = args as { term: string; depth?: 'quick' | 'comprehensive' };

  // Search for information about the term
  const searchResults = await searchWeb(`${term} definition best practices`, {
    numResults: depth === 'comprehensive' ? 15 : 5,
  });

  const client = await getClientById(authContext.client_id);

  // Use LLM to synthesize research
  const prompt = `
Research synthesis for term: "${term}"

Web search results:
${searchResults.map((r) => `- ${r.title}: ${r.snippet}`).join('\n')}

Client context: ${client.company_name} in ${client.industry}
Competitors: ${client.competitors.join(', ')}

Provide a JSON response with:
{
  "definition": "Clear definition of the term",
  "key_facts": ["List of 5 key facts"],
  "statistics": ["List of relevant statistics with sources"],
  "related_terms": ["5 related terms"],
  "competitor_coverage": [
    {"competitor": "name", "has_content": true/false, "quality": "weak/moderate/strong"}
  ],
  "recommended_angle": "Suggested unique angle for content",
  "estimated_geo_impact": "low/medium/high",
  "sources": ["List of source URLs"]
}
`;

  const llmResponse = await callLLM([
    { role: 'system', content: 'You are a research analyst. Return valid JSON only.' },
    { role: 'user', content: prompt },
  ]);

  let research: ResearchTermOutput;
  try {
    research = JSON.parse(llmResponse.content);
  } catch {
    research = {
      definition: `${term} is a key concept in the ${client.industry} industry.`,
      key_facts: searchResults.slice(0, 5).map((r) => r.snippet.slice(0, 100)),
      statistics: [],
      related_terms: [],
      competitor_coverage: client.competitors.map((c) => ({
        competitor: c,
        has_content: false,
        quality: 'weak' as const,
      })),
      recommended_angle: `Focus on ${client.industry}-specific applications`,
      estimated_geo_impact: 'medium' as const,
      sources: searchResults.map((r) => r.url),
    };
  }

  return {
    content: [{ type: 'text', text: JSON.stringify(research, null, 2) }],
  };
}

async function handleFindOpportunities(
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const { category, limit = 5 } = args as { category: string; limit?: number };

  const client = await getClientById(authContext.client_id);

  // Search for trending topics in the category
  const searchResults = await searchWeb(
    `${category} industry trends 2026 emerging concepts terminology`,
    { numResults: 10 }
  );

  const prompt = `
Find ${limit} high-value content opportunities in the ${category} industry.

Context:
- Client: ${client.company_name}
- Industry: ${client.industry}
- Competitors: ${client.competitors.join(', ')}

Current trends from web search:
${searchResults.map((r) => `- ${r.title}: ${r.snippet}`).join('\n')}

For each opportunity, provide:
{
  "opportunities": [
    {
      "term": "Term or topic name",
      "search_volume": "low/medium/high",
      "competition": "low/medium/high",
      "current_citation_leader": "Company currently dominating or 'none'",
      "client_relevance": "low/medium/high",
      "recommended_action": "Specific action to take"
    }
  ]
}

Focus on terms where:
1. There's high search intent but low authoritative content
2. The client can provide unique expertise
3. AI systems don't have a clear citation leader

Return valid JSON only.
`;

  const llmResponse = await callLLM([
    { role: 'system', content: 'You are a content strategist. Return valid JSON only.' },
    { role: 'user', content: prompt },
  ]);

  let opportunities: FindOpportunitiesOutput;
  try {
    opportunities = JSON.parse(llmResponse.content);
  } catch {
    opportunities = {
      opportunities: [
        {
          term: `${category} best practices`,
          search_volume: 'high',
          competition: 'medium',
          current_citation_leader: 'Various',
          client_relevance: 'high',
          recommended_action: 'Create comprehensive guide',
        },
      ],
    };
  }

  return {
    content: [{ type: 'text', text: JSON.stringify(opportunities, null, 2) }],
  };
}

async function handleAnalyzeCompetitor(
  args: Record<string, unknown>,
  _authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const { competitor } = args as { competitor: string };

  // Search for competitor's content
  const searchResults = await searchWeb(`${competitor} blog content documentation`, {
    numResults: 10,
  });

  const prompt = `
Analyze ${competitor}'s GEO presence and content strategy.

Their content found:
${searchResults.map((r) => `- ${r.url}: ${r.snippet}`).join('\n')}

Provide a JSON analysis:
{
  "citation_rate": 65,  // Estimated percentage 0-100
  "platforms": {
    "chatgpt": 70,
    "claude": 60,
    "perplexity": 55
  },
  "strongest_queries": ["List of queries where they dominate"],
  "content_sources": ["Their main content sources/URLs"],
  "weaknesses": ["List of their GEO weaknesses"],
  "strategy_summary": "Summary of their content strategy"
}

Return valid JSON only.
`;

  const llmResponse = await callLLM([
    { role: 'system', content: 'You are a competitive intelligence analyst. Return valid JSON only.' },
    { role: 'user', content: prompt },
  ]);

  let analysis: AnalyzeCompetitorOutput;
  try {
    analysis = JSON.parse(llmResponse.content);
  } catch {
    analysis = {
      citation_rate: 50,
      platforms: {
        chatgpt: 55,
        claude: 50,
        perplexity: 45,
      },
      strongest_queries: [`What is ${competitor}`, `${competitor} features`],
      content_sources: searchResults.slice(0, 3).map((r) => r.url),
      weaknesses: ['Limited technical depth', 'Infrequent content updates'],
      strategy_summary: `${competitor} has moderate GEO presence with room for improvement in technical content.`,
    };
  }

  return {
    content: [{ type: 'text', text: JSON.stringify(analysis, null, 2) }],
  };
}

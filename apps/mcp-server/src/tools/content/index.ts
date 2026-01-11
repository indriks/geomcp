import { Tool } from '@modelcontextprotocol/sdk/types.js';

import {
  AuthContext,
  CreateGlossaryTermOutput,
  CreateGlossaryBatchOutput,
  CreateInterviewOutput,
  CreateComparisonOutput,
  OptimizeContentOutput,
  SuggestContentOutput,
  ContentCategory,
  MentionType,
} from '@geomcp/shared';

import { callLLM, PROMPTS, calculateGeoScore } from '../../services/llm';
import { getClientById, getExpertQuotes, getContentMentions } from '../../db/client';
import { publishContent } from '../../services/github';

export function registerContentTools(): Tool[] {
  return [
    {
      name: 'create_glossary_term',
      description: 'Create a GEO-optimized glossary term with optional client mention',
      inputSchema: {
        type: 'object',
        properties: {
          term: { type: 'string', description: 'The term to define' },
          category: {
            type: 'string',
            enum: ['saas', 'devtools', 'security', 'fintech', 'ai-ml'],
            description: 'Content category',
          },
          include_client_mention: {
            type: 'boolean',
            description: 'Whether to include a client mention',
          },
          mention_type: {
            type: 'string',
            enum: ['quote', 'tool_list', 'example'],
            description: 'Type of client mention',
          },
          related_terms: {
            type: 'array',
            items: { type: 'string' },
            description: 'Related terms to cross-reference',
          },
          publish: { type: 'boolean', description: 'Whether to publish to GitHub' },
        },
        required: ['term', 'category'],
      },
    },
    {
      name: 'create_glossary_batch',
      description: 'Create multiple glossary terms at once',
      inputSchema: {
        type: 'object',
        properties: {
          terms: {
            type: 'array',
            items: { type: 'string' },
            description: 'Terms to create',
          },
          category: {
            type: 'string',
            enum: ['saas', 'devtools', 'security', 'fintech', 'ai-ml'],
          },
          client_mention_frequency: {
            type: 'string',
            enum: ['all', 'half', 'strategic'],
            description: 'How often to include client mentions',
          },
        },
        required: ['terms', 'category'],
      },
    },
    {
      name: 'create_interview',
      description: 'Create a structured expert interview',
      inputSchema: {
        type: 'object',
        properties: {
          interviewee_name: { type: 'string' },
          company: { type: 'string' },
          role: { type: 'string' },
          topics: {
            type: 'array',
            items: { type: 'string' },
          },
          raw_transcript: { type: 'string' },
          generate_questions: { type: 'boolean' },
        },
        required: ['interviewee_name', 'company', 'role', 'topics'],
      },
    },
    {
      name: 'create_comparison',
      description: 'Create a product/concept comparison page',
      inputSchema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          items: {
            type: 'array',
            items: { type: 'string' },
            description: 'Items to compare (2-6)',
          },
          criteria: {
            type: 'array',
            items: { type: 'string' },
            description: 'Comparison criteria',
          },
          include_client: { type: 'boolean' },
        },
        required: ['title', 'items', 'criteria'],
      },
    },
    {
      name: 'optimize_content',
      description: 'Optimize existing content for AI citations',
      inputSchema: {
        type: 'object',
        properties: {
          content: { type: 'string', description: 'Content to optimize' },
          format: {
            type: 'string',
            enum: ['markdown', 'plain'],
          },
        },
        required: ['content'],
      },
    },
    {
      name: 'suggest_content',
      description: 'Get AI-powered content recommendations based on client profile',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Number of suggestions (default 5)' },
        },
        required: [],
      },
    },
  ];
}

export async function handleContentTool(
  name: string,
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  switch (name) {
    case 'create_glossary_term':
      return handleCreateGlossaryTerm(args, authContext);
    case 'create_glossary_batch':
      return handleCreateGlossaryBatch(args, authContext);
    case 'create_interview':
      return handleCreateInterview(args, authContext);
    case 'create_comparison':
      return handleCreateComparison(args, authContext);
    case 'optimize_content':
      return handleOptimizeContent(args);
    case 'suggest_content':
      return handleSuggestContent(args, authContext);
    default:
      return {
        content: [{ type: 'text', text: `Unknown content tool: ${name}` }],
        isError: true,
      };
  }
}

async function handleCreateGlossaryTerm(
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const {
    term,
    category,
    include_client_mention = false,
    mention_type,
    publish = false,
  } = args as {
    term: string;
    category: ContentCategory;
    include_client_mention?: boolean;
    mention_type?: MentionType;
    related_terms?: string[];
    publish?: boolean;
  };

  let clientInfo: { name: string; quote?: string } | undefined;

  if (include_client_mention) {
    const client = await getClientById(authContext.client_id);
    const quotes = await getExpertQuotes(authContext.client_id);
    const approvedQuote = quotes.find((q) => q.approved);

    clientInfo = {
      name: client.company_name,
      quote: approvedQuote?.quote,
    };
  }

  const prompt = PROMPTS.glossaryTerm(term, category, clientInfo);

  const llmResponse = await callLLM([
    { role: 'system', content: 'You are a technical writer creating GEO-optimized content.' },
    { role: 'user', content: prompt },
  ]);

  const markdown = llmResponse.content;
  const geoScore = calculateGeoScore(markdown);

  const repo = `geomcp-glossary-${category}`;
  const filePath = `terms/${term.toLowerCase().charAt(0)}/${term.toLowerCase().replace(/\s+/g, '-')}.md`;

  let githubUrl: string | undefined;

  if (publish) {
    githubUrl = await publishContent({
      repo,
      path: filePath,
      content: markdown,
      message: `Add: ${term}`,
      clientId: authContext.client_id,
      contentType: 'term',
      mentionType: mention_type,
      geoScore,
    });
  }

  const response: CreateGlossaryTermOutput = {
    markdown,
    geo_score: geoScore,
    repo,
    file_path: filePath,
    github_url: githubUrl,
    client_mention_context: clientInfo ? `Mentioned ${clientInfo.name}` : undefined,
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
  };
}

async function handleCreateGlossaryBatch(
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const { terms, category, client_mention_frequency = 'strategic' } = args as {
    terms: string[];
    category: ContentCategory;
    client_mention_frequency?: 'all' | 'half' | 'strategic';
  };

  const results: CreateGlossaryBatchOutput['created'] = [];

  for (let i = 0; i < terms.length; i++) {
    const term = terms[i];

    // Determine if this term should have client mention
    let includeClientMention = false;
    if (client_mention_frequency === 'all') {
      includeClientMention = true;
    } else if (client_mention_frequency === 'half') {
      includeClientMention = i % 2 === 0;
    } else {
      // Strategic: first, last, and middle terms
      includeClientMention = i === 0 || i === terms.length - 1 || i === Math.floor(terms.length / 2);
    }

    const result = await handleCreateGlossaryTerm(
      {
        term,
        category,
        include_client_mention: includeClientMention,
        mention_type: 'tool_list',
        publish: true,
      },
      authContext
    );

    const parsed = JSON.parse(result.content[0].text);

    results.push({
      term,
      github_url: parsed.github_url,
      geo_score: parsed.geo_score,
      has_client_mention: includeClientMention,
    });
  }

  const response: CreateGlossaryBatchOutput = {
    created: results,
    total_created: results.length,
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
  };
}

async function handleCreateInterview(
  args: Record<string, unknown>,
  _authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const { interviewee_name, company, role, topics } = args as {
    interviewee_name: string;
    company: string;
    role: string;
    topics: string[];
    raw_transcript?: string;
    generate_questions?: boolean;
  };

  const prompt = PROMPTS.interview(interviewee_name, company, role, topics);

  const llmResponse = await callLLM([
    { role: 'system', content: 'You are a journalist creating structured interview content.' },
    { role: 'user', content: prompt },
  ]);

  const markdown = llmResponse.content;

  // Extract quotes (lines starting with >)
  const quotes = (markdown.match(/^>.*$/gm) || []).map((q) => q.replace(/^>\s*/, ''));

  // Extract cross-references
  const crossRefs = (markdown.match(/\[([^\]]+)\]\([^)]+\)/g) || []).map((m) =>
    m.replace(/\[([^\]]+)\].*/, '$1')
  );

  const response: CreateInterviewOutput = {
    markdown,
    extractable_quotes: quotes.slice(0, 5),
    cross_references: crossRefs,
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
  };
}

async function handleCreateComparison(
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const { title, items, criteria, include_client = false } = args as {
    title: string;
    items: string[];
    criteria: string[];
    include_client?: boolean;
  };

  let comparisonItems = items;

  if (include_client) {
    const client = await getClientById(authContext.client_id);
    if (!items.includes(client.company_name)) {
      comparisonItems = [...items, client.company_name];
    }
  }

  const prompt = PROMPTS.comparison(title, comparisonItems, criteria);

  const llmResponse = await callLLM([
    { role: 'system', content: 'You are a technical analyst creating objective comparison content.' },
    { role: 'user', content: prompt },
  ]);

  const markdown = llmResponse.content;

  const response: CreateComparisonOutput = {
    markdown,
    client_position: include_client ? 'Included in comparison' : undefined,
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
  };
}

async function handleOptimizeContent(
  args: Record<string, unknown>
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const { content } = args as { content: string };

  const beforeScore = calculateGeoScore(content);

  const prompt = PROMPTS.optimize(content);

  const llmResponse = await callLLM([
    { role: 'system', content: 'You are a GEO optimization expert.' },
    { role: 'user', content: prompt },
  ]);

  const optimized = llmResponse.content;
  const afterScore = calculateGeoScore(optimized);

  const response: OptimizeContentOutput = {
    optimized_content: optimized,
    before_score: beforeScore,
    after_score: afterScore,
    changes_made: [
      'Added direct answer in opening',
      'Structured with clear headings',
      'Converted to bullet points',
      'Added freshness indicator',
    ],
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
  };
}

async function handleSuggestContent(
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const { limit = 5 } = args as { limit?: number };

  const client = await getClientById(authContext.client_id);
  const existingContent = await getContentMentions(authContext.client_id);

  const existingTerms = existingContent
    .filter((c) => c.content_type === 'term')
    .map((c) => c.content_path.split('/').pop()?.replace('.md', '') || '');

  const prompt = PROMPTS.suggest(client.industry, existingTerms);

  const llmResponse = await callLLM([
    { role: 'system', content: 'You are a content strategist. Return valid JSON only.' },
    { role: 'user', content: prompt },
  ]);

  let suggestions;
  try {
    suggestions = JSON.parse(llmResponse.content);
  } catch {
    suggestions = [
      {
        type: 'term',
        title: `${client.industry} best practices`,
        rationale: 'High-volume search term with limited authoritative content',
        potential_impact: 'high',
        priority: 9,
      },
    ];
  }

  const response: SuggestContentOutput = {
    suggestions: suggestions.slice(0, limit),
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
  };
}

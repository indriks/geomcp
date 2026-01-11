import { Tool } from '@modelcontextprotocol/sdk/types.js';

import { AuthContext, StatusResponse, SetupOutput, ProfileOutput } from '@geomcp/shared';

import {
  getClientById,
  getSubscription,
  getExpertQuotes,
  getContentMentions,
  getCitations,
  upsertClient,
  createExpertQuote,
} from '../../db/client';

export function registerCoreTools(): Tool[] {
  return [
    {
      name: 'geomcp_status',
      description:
        'Check GEO MCP subscription status, client profile, content stats, and citation summary',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
    {
      name: 'geomcp_setup',
      description: 'Configure or update client profile with company info, industry, and competitors',
      inputSchema: {
        type: 'object',
        properties: {
          company_name: { type: 'string', description: 'Company name' },
          website: { type: 'string', description: 'Company website URL' },
          industry: { type: 'string', description: 'Industry category' },
          product_description: { type: 'string', description: 'Brief product description' },
          competitors: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of competitor names',
          },
          expert_quotes: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                person: { type: 'string' },
                role: { type: 'string' },
                quote: { type: 'string' },
                approved: { type: 'boolean' },
              },
              required: ['person', 'role', 'quote', 'approved'],
            },
            description: 'Expert quotes to add',
          },
        },
        required: ['company_name', 'industry'],
      },
    },
    {
      name: 'geomcp_profile',
      description: 'View or update client profile. Call without parameters to view current profile.',
      inputSchema: {
        type: 'object',
        properties: {
          company_name: { type: 'string', description: 'Update company name' },
          website: { type: 'string', description: 'Update website URL' },
          industry: { type: 'string', description: 'Update industry' },
          product_description: { type: 'string', description: 'Update product description' },
          competitors: {
            type: 'array',
            items: { type: 'string' },
            description: 'Update competitor list',
          },
          add_quote: {
            type: 'object',
            properties: {
              person: { type: 'string' },
              role: { type: 'string' },
              quote: { type: 'string' },
              approved: { type: 'boolean' },
            },
            required: ['person', 'role', 'quote', 'approved'],
            description: 'Add a new expert quote',
          },
        },
        required: [],
      },
    },
  ];
}

export async function handleCoreTool(
  name: string,
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  switch (name) {
    case 'geomcp_status':
      return handleStatus(authContext);
    case 'geomcp_setup':
      return handleSetup(args, authContext);
    case 'geomcp_profile':
      return handleProfile(args, authContext);
    default:
      return {
        content: [{ type: 'text', text: `Unknown core tool: ${name}` }],
        isError: true,
      };
  }
}

async function handleStatus(
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const client = await getClientById(authContext.client_id);
  const subscription = await getSubscription(authContext.client_id);
  const quotes = await getExpertQuotes(authContext.client_id);
  const mentions = await getContentMentions(authContext.client_id);
  const citations = await getCitations(authContext.client_id, 'week');

  // Calculate citation rates by platform
  const citationsByPlatform = citations.reduce(
    (acc, c) => {
      if (!acc[c.platform]) {
        acc[c.platform] = { total: 0, cited: 0 };
      }
      acc[c.platform].total++;
      if (c.cited) acc[c.platform].cited++;
      return acc;
    },
    {} as Record<string, { total: number; cited: number }>
  );

  const getPlatformRate = (platform: string) => {
    const stats = citationsByPlatform[platform];
    if (!stats || stats.total === 0) return 0;
    return Math.round((stats.cited / stats.total) * 100);
  };

  const totalCitations = citations.length;
  const citedCount = citations.filter((c) => c.cited).length;
  const overallRate = totalCitations > 0 ? Math.round((citedCount / totalCitations) * 100) : 0;

  const response: StatusResponse = {
    subscription: {
      status: subscription?.status || 'trial',
      plan: subscription?.plan || 'standard',
      price: '€1,500/month',
      next_billing: subscription?.current_period_end || undefined,
    },
    client_profile: {
      company: client?.company_name || 'Not configured',
      industry: client?.industry || 'Not configured',
      competitors: client?.competitors || [],
      expert_quotes: quotes.length,
    },
    content_stats: {
      terms_with_mentions: mentions.filter((m) => m.content_type === 'term').length,
      interviews: mentions.filter((m) => m.content_type === 'interview').length,
      comparison_appearances: mentions.filter((m) => m.content_type === 'comparison').length,
    },
    citation_summary: {
      overall_rate: overallRate,
      by_platform: {
        chatgpt: getPlatformRate('chatgpt'),
        claude: getPlatformRate('claude'),
        perplexity: getPlatformRate('perplexity'),
      },
    },
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
  };
}

async function handleSetup(
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  const { company_name, website, industry, product_description, competitors, expert_quotes } =
    args as {
      company_name: string;
      website?: string;
      industry: string;
      product_description?: string;
      competitors?: string[];
      expert_quotes?: Array<{ person: string; role: string; quote: string; approved: boolean }>;
    };

  if (!company_name || !industry) {
    return {
      content: [{ type: 'text', text: 'company_name and industry are required' }],
      isError: true,
    };
  }

  // Update client profile
  await upsertClient(authContext.client_id, {
    company_name,
    website,
    industry,
    product_description,
    competitors: competitors || [],
  });

  // Add expert quotes
  if (expert_quotes && expert_quotes.length > 0) {
    for (const quote of expert_quotes) {
      await createExpertQuote(authContext.client_id, quote);
    }
  }

  // Determine assigned repos based on industry
  const industryRepoMap: Record<string, string[]> = {
    saas: ['geomcp-glossary-saas'],
    devtools: ['geomcp-glossary-devtools'],
    security: ['geomcp-glossary-security', 'geomcp-glossary-devtools'],
    fintech: ['geomcp-glossary-fintech', 'geomcp-glossary-saas'],
    'ai-ml': ['geomcp-glossary-ai-ml', 'geomcp-glossary-devtools'],
  };

  const assignedRepos = industryRepoMap[industry.toLowerCase()] || ['geomcp-glossary-saas'];

  const response: SetupOutput = {
    profile_id: authContext.client_id,
    assigned_repos: assignedRepos,
    recommended_terms: [
      `${industry} best practices`,
      `${industry} tools comparison`,
      `What is ${industry}`,
    ],
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
  };
}

async function handleProfile(
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  const { company_name, website, industry, product_description, competitors, add_quote } = args as {
    company_name?: string;
    website?: string;
    industry?: string;
    product_description?: string;
    competitors?: string[];
    add_quote?: { person: string; role: string; quote: string; approved: boolean };
  };

  // If any update fields are provided, update the profile
  const updates: Record<string, unknown> = {};
  if (company_name) updates.company_name = company_name;
  if (website) updates.website = website;
  if (industry) updates.industry = industry;
  if (product_description) updates.product_description = product_description;
  if (competitors) updates.competitors = competitors;

  if (Object.keys(updates).length > 0) {
    await upsertClient(authContext.client_id, updates);
  }

  // Add new quote if provided
  if (add_quote) {
    await createExpertQuote(authContext.client_id, add_quote);
  }

  // Fetch updated profile
  const client = await getClientById(authContext.client_id);
  const quotes = await getExpertQuotes(authContext.client_id);

  const response: ProfileOutput = {
    profile: client,
    expert_quotes: quotes,
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
  };
}

import { Tool } from '@modelcontextprotocol/sdk/types.js';

import {
  AuthContext,
  CheckCitationsOutput,
  CitationReport,
  CitationAlert,
  MonitorQueryOutput,
  Platform,
  ReportPeriod,
} from '@geomcp/shared';

import {
  batchCheckCitations,
  calculateCitationRate,
  groupByPlatform,
} from '../../services/citations';
import {
  getClientById,
  getCitations,
  getMonitoredQueries as _getMonitoredQueries,
  createCitation,
  createMonitoredQuery,
} from '../../db/client';

export function registerCitationTools(): Tool[] {
  return [
    {
      name: 'check_citations',
      description: 'Check if client is cited for specific queries across AI platforms',
      inputSchema: {
        type: 'object',
        properties: {
          queries: {
            type: 'array',
            items: { type: 'string' },
            description: 'Queries to check',
          },
          platforms: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['chatgpt', 'claude', 'perplexity', 'gemini'],
            },
            description: 'Platforms to check',
          },
        },
        required: ['queries'],
      },
    },
    {
      name: 'citation_report',
      description: 'Get comprehensive citation performance report',
      inputSchema: {
        type: 'object',
        properties: {
          period: {
            type: 'string',
            enum: ['day', 'week', 'month'],
            description: 'Report period',
          },
        },
        required: ['period'],
      },
    },
    {
      name: 'citation_alerts',
      description: 'Get recent citation gains, losses, and competitor movements',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
    {
      name: 'monitor_query',
      description: 'Add a query to ongoing citation tracking',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Query to monitor' },
          priority: {
            type: 'string',
            enum: ['high', 'medium', 'low'],
            description: 'Monitoring priority',
          },
        },
        required: ['query'],
      },
    },
  ];
}

export async function handleCitationTool(
  name: string,
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  switch (name) {
    case 'check_citations':
      return handleCheckCitations(args, authContext);
    case 'citation_report':
      return handleCitationReport(args, authContext);
    case 'citation_alerts':
      return handleCitationAlerts(authContext);
    case 'monitor_query':
      return handleMonitorQuery(args, authContext);
    default:
      return {
        content: [{ type: 'text', text: `Unknown citation tool: ${name}` }],
        isError: true,
      };
  }
}

async function handleCheckCitations(
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const { queries, platforms = ['chatgpt', 'claude', 'perplexity'] } = args as {
    queries: string[];
    platforms?: Platform[];
  };

  const client = await getClientById(authContext.client_id);

  const results = await batchCheckCitations(
    queries,
    platforms,
    client.company_name,
    client.competitors
  );

  // Store results in database
  for (const result of results) {
    await createCitation({
      client_id: authContext.client_id,
      query: result.query,
      platform: result.platform,
      cited: result.cited,
      citation_context: result.citationContext,
      position: result.position,
      competitors_cited: result.competitorsCited,
    });
  }

  const overallRate = calculateCitationRate(results);

  const response: CheckCitationsOutput = {
    results: results.map((r) => ({
      query: r.query,
      platform: r.platform,
      client_cited: r.cited,
      citation_context: r.citationContext,
      position: r.position,
      competitors_cited: r.competitorsCited,
    })),
    summary: {
      total_queries: queries.length * platforms.length,
      client_cited_count: results.filter((r) => r.cited).length,
      citation_rate: overallRate,
    },
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
  };
}

async function handleCitationReport(
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const { period } = args as { period: ReportPeriod };

  const client = await getClientById(authContext.client_id);
  const _citations = await getCitations(authContext.client_id, period);

  // Get previous period for comparison
  const prevPeriodLength = period === 'day' ? 1 : period === 'week' ? 7 : 30;
  const allCitations = await getCitations(authContext.client_id);

  const now = new Date();
  const currentPeriodStart = new Date(now.getTime() - prevPeriodLength * 24 * 60 * 60 * 1000);
  const prevPeriodStart = new Date(currentPeriodStart.getTime() - prevPeriodLength * 24 * 60 * 60 * 1000);

  const currentCitations = allCitations.filter(
    (c) => new Date(c.checked_at) >= currentPeriodStart
  );
  const prevCitations = allCitations.filter(
    (c) =>
      new Date(c.checked_at) >= prevPeriodStart && new Date(c.checked_at) < currentPeriodStart
  );

  const currentRate = calculateCitationRate(
    currentCitations.map((c) => ({
      query: c.query,
      platform: c.platform as Platform,
      cited: c.cited,
      competitorsCited: c.competitors_cited || [],
    }))
  );

  const prevRate = calculateCitationRate(
    prevCitations.map((c) => ({
      query: c.query,
      platform: c.platform as Platform,
      cited: c.cited,
      competitorsCited: c.competitors_cited || [],
    }))
  );

  // Calculate platform breakdown
  const byPlatform = groupByPlatform(
    currentCitations.map((c) => ({
      query: c.query,
      platform: c.platform as Platform,
      cited: c.cited,
      competitorsCited: c.competitors_cited || [],
    }))
  );

  const prevByPlatform = groupByPlatform(
    prevCitations.map((c) => ({
      query: c.query,
      platform: c.platform as Platform,
      cited: c.cited,
      competitorsCited: c.competitors_cited || [],
    }))
  );

  // Find gains and losses
  const gained: CitationReport['gained_citations'] = [];
  const lost: CitationReport['lost_citations'] = [];

  for (const current of currentCitations) {
    const prev = prevCitations.find(
      (p) => p.query === current.query && p.platform === current.platform
    );
    if (current.cited && (!prev || !prev.cited)) {
      gained.push({
        query: current.query,
        platform: current.platform as Platform,
        date: current.checked_at,
      });
    }
    if (!current.cited && prev?.cited) {
      lost.push({
        query: current.query,
        platform: current.platform as Platform,
        date: current.checked_at,
        taken_by: current.competitors_cited?.[0],
      });
    }
  }

  const response: CitationReport = {
    overall_score: currentRate,
    score_change: currentRate - prevRate,
    by_platform: {
      chatgpt: { rate: byPlatform.chatgpt.rate, change: byPlatform.chatgpt.rate - prevByPlatform.chatgpt.rate },
      claude: { rate: byPlatform.claude.rate, change: byPlatform.claude.rate - prevByPlatform.claude.rate },
      perplexity: { rate: byPlatform.perplexity.rate, change: byPlatform.perplexity.rate - prevByPlatform.perplexity.rate },
      gemini: { rate: byPlatform.gemini.rate, change: byPlatform.gemini.rate - prevByPlatform.gemini.rate },
    },
    content_performance: [],
    gained_citations: gained.slice(0, 5),
    lost_citations: lost.slice(0, 5),
    recommendations: generateRecommendations(currentRate, byPlatform, client.competitors),
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
  };
}

async function handleCitationAlerts(
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const citations = await getCitations(authContext.client_id, 'week');

  const alerts: CitationAlert[] = [];

  // Group by query to find changes
  const byQuery: Record<string, typeof citations> = {};
  for (const c of citations) {
    const key = `${c.query}:${c.platform}`;
    if (!byQuery[key]) byQuery[key] = [];
    byQuery[key].push(c);
  }

  for (const [_key, citationList] of Object.entries(byQuery)) {
    const sorted = citationList.sort(
      (a, b) => new Date(b.checked_at).getTime() - new Date(a.checked_at).getTime()
    );

    if (sorted.length >= 2) {
      const latest = sorted[0];
      const previous = sorted[1];

      if (latest.cited && !previous.cited) {
        alerts.push({
          type: 'gain',
          query: latest.query,
          platform: latest.platform as Platform,
          details: `Now cited for "${latest.query}" on ${latest.platform}`,
          date: latest.checked_at,
          priority: 'high',
        });
      } else if (!latest.cited && previous.cited) {
        alerts.push({
          type: 'loss',
          query: latest.query,
          platform: latest.platform as Platform,
          details: `Lost citation for "${latest.query}" on ${latest.platform}`,
          date: latest.checked_at,
          priority: 'high',
        });
      }
    }
  }

  return {
    content: [{ type: 'text', text: JSON.stringify({ alerts }, null, 2) }],
  };
}

async function handleMonitorQuery(
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const { query, priority = 'medium' } = args as { query: string; priority?: 'high' | 'medium' | 'low' };

  const result = await createMonitoredQuery({
    client_id: authContext.client_id,
    query,
    priority,
  });

  const frequencyMap = {
    high: 'Daily',
    medium: '3x per week',
    low: 'Weekly',
  };

  const response: MonitorQueryOutput = {
    id: result.id,
    query: result.query,
    priority: result.priority,
    expected_check_frequency: frequencyMap[priority],
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
  };
}

function generateRecommendations(
  rate: number,
  byPlatform: Record<Platform, { rate: number }>,
  competitors: string[]
): string[] {
  const recommendations: string[] = [];

  if (rate < 20) {
    recommendations.push('Citation rate is low. Focus on creating more foundational content.');
  }

  if (byPlatform.perplexity.rate < byPlatform.chatgpt.rate) {
    recommendations.push('Perplexity performance is below ChatGPT. Create fresher content with recent dates.');
  }

  if (competitors.length > 0) {
    recommendations.push(`Monitor ${competitors[0]} closely - they may be capturing queries you could target.`);
  }

  recommendations.push('Consider creating comparison content to appear alongside competitors.');

  return recommendations.slice(0, 4);
}

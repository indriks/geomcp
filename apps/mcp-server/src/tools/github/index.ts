import { Tool } from '@modelcontextprotocol/sdk/types.js';

import {
  AuthContext,
  ListContentOutput,
  RefreshStaleOutput,
  ContentHealth,
} from '@geomcp/shared';

import { getContentMentions, getCitations } from '../../db/client';
import { getLastCommitDate, getFileContent, publishContent } from '../../services/github';
import { callLLM, calculateGeoScore } from '../../services/llm';

export function registerGitHubTools(): Tool[] {
  return [
    {
      name: 'list_content',
      description: 'List all content where client is mentioned',
      inputSchema: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['terms', 'interviews', 'comparisons', 'all'],
            description: 'Filter by content type',
          },
        },
        required: [],
      },
    },
    {
      name: 'refresh_stale',
      description: 'Refresh content older than 30 days',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Max items to refresh' },
          dry_run: { type: 'boolean', description: 'Preview without making changes' },
        },
        required: [],
      },
    },
    {
      name: 'content_health',
      description: 'Get health status of all client content',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  ];
}

export async function handleGitHubTool(
  name: string,
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  switch (name) {
    case 'list_content':
      return handleListContent(args, authContext);
    case 'refresh_stale':
      return handleRefreshStale(args, authContext);
    case 'content_health':
      return handleContentHealth(authContext);
    default:
      return {
        content: [{ type: 'text', text: `Unknown GitHub tool: ${name}` }],
        isError: true,
      };
  }
}

async function handleListContent(
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const { type = 'all' } = args as { type?: 'terms' | 'interviews' | 'comparisons' | 'all' };

  const mentions = await getContentMentions(authContext.client_id, type);
  const citations = await getCitations(authContext.client_id, 'month');

  // Group citations by content path
  const citationsByPath: Record<string, number> = {};
  for (const c of citations) {
    if (c.content_path && c.cited) {
      citationsByPath[c.content_path] = (citationsByPath[c.content_path] || 0) + 1;
    }
  }

  const contentItems = mentions.map((m) => ({
    type: m.content_type,
    title: m.content_path.split('/').pop()?.replace('.md', '') || m.content_path,
    repo: m.repo,
    github_url: m.github_url || `https://github.com/geomcp/${m.repo}/blob/main/${m.content_path}`,
    mention_type: m.mention_type,
    last_updated: m.updated_at,
    citation_performance: citationsByPath[m.content_path]
      ? `${citationsByPath[m.content_path]} citations`
      : 'No citations yet',
  }));

  const response: ListContentOutput = {
    content: contentItems,
    total: contentItems.length,
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
  };
}

async function handleRefreshStale(
  args: Record<string, unknown>,
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const { limit = 5, dry_run = true } = args as { limit?: number; dry_run?: boolean };

  const mentions = await getContentMentions(authContext.client_id);

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Find stale content
  const staleContent: typeof mentions = [];

  for (const mention of mentions) {
    const lastCommit = await getLastCommitDate(mention.repo, mention.content_path);
    if (lastCommit && lastCommit < thirtyDaysAgo) {
      staleContent.push(mention);
    }
  }

  const toRefresh = staleContent.slice(0, limit);
  const results: RefreshStaleOutput['refreshed'] = [];

  for (const content of toRefresh) {
    const changesMade: string[] = [];

    if (!dry_run) {
      // Fetch current content
      const currentContent = await getFileContent(content.repo, content.content_path);

      if (currentContent) {
        // Refresh the content using LLM
        const refreshPrompt = `
Update this content to be fresh and current:

${currentContent}

Make these changes:
1. Update any dates to January 2026
2. Refresh any statistics that might be outdated
3. Add "Last updated: January 2026" at the bottom
4. Keep the overall structure and client mentions intact

Return the updated markdown content only.
`;

        const llmResponse = await callLLM([
          { role: 'system', content: 'You are a content editor refreshing content for freshness.' },
          { role: 'user', content: refreshPrompt },
        ]);

        const refreshedContent = llmResponse.content;
        const newGeoScore = calculateGeoScore(refreshedContent);

        // Publish the refreshed content
        await publishContent({
          repo: content.repo,
          path: content.content_path,
          content: refreshedContent,
          message: `Refresh: Update for freshness`,
          clientId: authContext.client_id,
          contentType: content.content_type,
          geoScore: newGeoScore,
        });

        changesMade.push('Updated date references', 'Refreshed statistics', 'Updated timestamp');
      }
    } else {
      changesMade.push('[DRY RUN] Would update dates', '[DRY RUN] Would refresh stats');
    }

    results.push({
      content_path: content.content_path,
      changes_made: changesMade,
    });
  }

  const response: RefreshStaleOutput = {
    refreshed: results,
    total_refreshed: results.length,
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
  };
}

async function handleContentHealth(
  authContext: AuthContext
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const mentions = await getContentMentions(authContext.client_id);
  const citations = await getCitations(authContext.client_id, 'month');

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  let healthy = 0;
  let stale = 0;
  let underperforming = 0;
  const actionItems: ContentHealth['action_items'] = [];

  // Group citations by content path
  const citationsByPath: Record<string, { total: number; cited: number }> = {};
  for (const c of citations) {
    if (c.content_path) {
      if (!citationsByPath[c.content_path]) {
        citationsByPath[c.content_path] = { total: 0, cited: 0 };
      }
      citationsByPath[c.content_path].total++;
      if (c.cited) citationsByPath[c.content_path].cited++;
    }
  }

  for (const mention of mentions) {
    const lastCommit = await getLastCommitDate(mention.repo, mention.content_path);
    const isStale = lastCommit && lastCommit < thirtyDaysAgo;

    const citationStats = citationsByPath[mention.content_path];
    const isUnderperforming =
      citationStats && citationStats.total > 0 && citationStats.cited / citationStats.total < 0.1;

    if (isStale) {
      stale++;
      actionItems.push({
        content_path: mention.content_path,
        issue: 'Content is older than 30 days',
        recommended_action: 'Refresh with updated statistics and date',
        priority: 'high',
      });
    } else if (isUnderperforming) {
      underperforming++;
      actionItems.push({
        content_path: mention.content_path,
        issue: 'Low citation rate (<10%)',
        recommended_action: 'Optimize content structure and add more statistics',
        priority: 'medium',
      });
    } else {
      healthy++;
    }
  }

  const response: ContentHealth = {
    total_mentions: mentions.length,
    healthy,
    stale,
    underperforming,
    action_items: actionItems.slice(0, 10),
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
  };
}

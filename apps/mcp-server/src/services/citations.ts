import { callLLM } from './llm';
import { Platform } from '@geomcp/shared';

interface CitationCheckResult {
  query: string;
  platform: Platform;
  cited: boolean;
  citationContext?: string;
  position?: number;
  competitorsCited: string[];
}

// Platform-specific models to simulate checking different AI platforms
const PLATFORM_MODELS: Record<Platform, string> = {
  chatgpt: 'openai/gpt-4-turbo',
  claude: 'anthropic/claude-3-5-sonnet',
  perplexity: 'perplexity/llama-3.1-sonar-large-128k-online',
  gemini: 'google/gemini-pro',
};

export async function checkCitationOnPlatform(
  query: string,
  platform: Platform,
  clientName: string,
  competitors: string[]
): Promise<CitationCheckResult> {
  const allBrands = [clientName, ...competitors];

  // Query the model with the user's query
  const response = await callLLM(
    [
      {
        role: 'system',
        content:
          'You are a helpful assistant answering user questions. Provide factual, well-sourced responses mentioning relevant tools and companies when appropriate.',
      },
      { role: 'user', content: query },
    ],
    { model: PLATFORM_MODELS[platform], max_tokens: 1000 }
  );

  const responseText = response.content.toLowerCase();
  const clientNameLower = clientName.toLowerCase();

  // Check if client is cited
  const cited = responseText.includes(clientNameLower);

  // Find citation context
  let citationContext: string | undefined;
  let position: number | undefined;

  if (cited) {
    const index = responseText.indexOf(clientNameLower);
    const start = Math.max(0, index - 50);
    const end = Math.min(responseText.length, index + clientName.length + 50);
    citationContext = response.content.slice(start, end);

    // Calculate position (1st, 2nd, 3rd mention among all brands)
    const brandMentions: Array<{ brand: string; position: number }> = [];
    for (const brand of allBrands) {
      const pos = responseText.indexOf(brand.toLowerCase());
      if (pos !== -1) {
        brandMentions.push({ brand, position: pos });
      }
    }
    brandMentions.sort((a, b) => a.position - b.position);
    position = brandMentions.findIndex((m) => m.brand === clientName) + 1;
  }

  // Check which competitors are cited
  const competitorsCited = competitors.filter((c) => responseText.includes(c.toLowerCase()));

  return {
    query,
    platform,
    cited,
    citationContext,
    position,
    competitorsCited,
  };
}

export async function batchCheckCitations(
  queries: string[],
  platforms: Platform[],
  clientName: string,
  competitors: string[]
): Promise<CitationCheckResult[]> {
  const results: CitationCheckResult[] = [];

  // Process in parallel with concurrency limit
  const CONCURRENCY = 3;

  const tasks: Array<() => Promise<CitationCheckResult>> = [];

  for (const query of queries) {
    for (const platform of platforms) {
      tasks.push(() => checkCitationOnPlatform(query, platform, clientName, competitors));
    }
  }

  for (let i = 0; i < tasks.length; i += CONCURRENCY) {
    const batch = tasks.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map((t) => t()));
    results.push(...batchResults);
  }

  return results;
}

export function calculateCitationRate(results: CitationCheckResult[]): number {
  if (results.length === 0) return 0;
  const citedCount = results.filter((r) => r.cited).length;
  return Math.round((citedCount / results.length) * 100);
}

export function groupByPlatform(
  results: CitationCheckResult[]
): Record<Platform, { total: number; cited: number; rate: number }> {
  const grouped: Record<Platform, { total: number; cited: number; rate: number }> = {
    chatgpt: { total: 0, cited: 0, rate: 0 },
    claude: { total: 0, cited: 0, rate: 0 },
    perplexity: { total: 0, cited: 0, rate: 0 },
    gemini: { total: 0, cited: 0, rate: 0 },
  };

  for (const result of results) {
    grouped[result.platform].total++;
    if (result.cited) grouped[result.platform].cited++;
  }

  for (const platform of Object.keys(grouped) as Platform[]) {
    const stats = grouped[platform];
    stats.rate = stats.total > 0 ? Math.round((stats.cited / stats.total) * 100) : 0;
  }

  return grouped;
}

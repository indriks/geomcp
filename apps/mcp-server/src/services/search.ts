import { getEnvConfig } from '../config/env';

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  score?: number;
}

interface ExaSearchResponse {
  results: Array<{
    title: string;
    url: string;
    text: string;
    score: number;
  }>;
}

export async function searchWeb(
  query: string,
  options: {
    numResults?: number;
    type?: 'neural' | 'keyword';
  } = {}
): Promise<SearchResult[]> {
  const config = getEnvConfig();
  const { numResults = 10, type = 'neural' } = options;

  // Use Exa API
  const response = await fetch('https://api.exa.ai/search', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.exaApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      numResults,
      type,
      useAutoprompt: true,
      contents: {
        text: { maxCharacters: 500 },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Exa API error: ${error}`);
  }

  const data = (await response.json()) as ExaSearchResponse;

  return data.results.map((r) => ({
    title: r.title,
    url: r.url,
    snippet: r.text,
    score: r.score,
  }));
}

export async function findSimilarContent(url: string): Promise<SearchResult[]> {
  const config = getEnvConfig();

  const response = await fetch('https://api.exa.ai/findSimilar', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.exaApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      numResults: 5,
      contents: {
        text: { maxCharacters: 500 },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Exa API error: ${error}`);
  }

  const data = (await response.json()) as ExaSearchResponse;

  return data.results.map((r) => ({
    title: r.title,
    url: r.url,
    snippet: r.text,
    score: r.score,
  }));
}

export async function getCompanyInfo(companyName: string): Promise<{
  website?: string;
  description?: string;
  industry?: string;
} | null> {
  try {
    const results = await searchWeb(`${companyName} company official website`, { numResults: 3 });

    if (results.length === 0) return null;

    return {
      website: results[0].url,
      description: results[0].snippet,
    };
  } catch {
    return null;
  }
}

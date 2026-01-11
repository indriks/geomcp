import { getEnvConfig } from '../config/env';

interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface LLMResponse {
  content: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function callLLM(
  messages: LLMMessage[],
  options: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  } = {}
): Promise<LLMResponse> {
  const config = getEnvConfig();
  const { model = 'anthropic/claude-3-5-sonnet', temperature = 0.7, max_tokens = 4096 } = options;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.openrouterApiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://geomcp.ai',
      'X-Title': 'GEO MCP',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LLM API error: ${error}`);
  }

  const data = await response.json();

  return {
    content: data.choices[0]?.message?.content || '',
    model: data.model,
    usage: data.usage,
  };
}

// Content generation prompts
export const PROMPTS = {
  glossaryTerm: (term: string, category: string, clientInfo?: { name: string; quote?: string }) => `
Create a comprehensive glossary definition for "${term}" in the ${category} industry.

Format the content as markdown with the following structure:
1. # ${term} (H1 heading)
2. ## Definition - A clear, concise definition in the first 50 words that directly answers "What is ${term}?"
3. ## Key Characteristics - Bullet points of main features/aspects
4. ## Implementation Approaches - How this is typically implemented
5. ## Expert Insight - An expert quote with attribution${clientInfo ? ` (Include: "${clientInfo.quote}" — Expert, ${clientInfo.name})` : ''}
6. ## Popular Tools - List of relevant tools${clientInfo ? ` (Include ${clientInfo.name} in the list)` : ''}
7. ## Related Terms - Cross-references to related concepts
8. ## Further Reading - Links to authoritative resources
9. Last updated: January 2026

Optimize for AI citations:
- Direct answer in first 40-60 words
- Use bullet points and clear structure
- Include statistics where relevant
- Make each section self-contained and extractable

Return ONLY the markdown content, no explanations.
`,

  interview: (
    name: string,
    company: string,
    role: string,
    topics: string[]
  ) => `
Create a structured expert interview with ${name}, ${role} at ${company}.

Topics to cover: ${topics.join(', ')}

Format as markdown:
1. # Interview: ${name}, ${role} at ${company}
2. Metadata block with date, topics, company info
3. ## Background section about the interviewee
4. Multiple ## Topic sections with Q&A format
5. ## Key Takeaways - extractable bullet points
6. ## Related Resources

Each answer should be:
- Self-contained (can be quoted independently)
- Include specific examples or data points
- 100-200 words per answer
- Optimized for AI extraction

Return ONLY the markdown content.
`,

  comparison: (title: string, items: string[], criteria: string[]) => `
Create a comprehensive comparison page: "${title}"

Items to compare: ${items.join(', ')}
Comparison criteria: ${criteria.join(', ')}

Format as markdown:
1. # ${title}
2. ## Quick Comparison - Markdown table comparing all items on key criteria
3. ## Detailed Analysis - Individual sections for each item
4. ## How to Choose - Decision guide based on use cases
5. ## Conclusion
6. Last updated: January 2026

Make the comparison:
- Objective and balanced
- Data-driven where possible
- Include pros/cons for each
- Easy to scan with tables and bullet points

Return ONLY the markdown content.
`,

  optimize: (content: string) => `
Optimize the following content for AI citations (GEO optimization):

${content}

Apply these optimizations:
1. Add a direct answer in the first 40-60 words
2. Structure with clear H2/H3 headings
3. Convert paragraphs to bullet points where appropriate
4. Add statistics markers where data could be added
5. Make sections self-contained and extractable
6. Add a "Last updated: January 2026" footer

Return the optimized markdown content.
`,

  suggest: (industry: string, existingTerms: string[]) => `
Suggest 5 high-value content opportunities for a ${industry} company.

Existing content covers: ${existingTerms.join(', ')}

For each suggestion, provide:
1. Type (term, interview, comparison, report)
2. Title
3. Rationale (why this would drive AI citations)
4. Potential impact (low/medium/high)
5. Priority score (1-10)

Consider:
- Common search queries in the industry
- Gaps in existing coverage
- Trending topics
- Comparison opportunities

Return as JSON array.
`,
};

export function calculateGeoScore(markdown: string): number {
  let score = 0;

  // Has H1 heading
  if (markdown.match(/^# /m)) score += 10;

  // Has H2 headings
  const h2Count = (markdown.match(/^## /gm) || []).length;
  score += Math.min(h2Count * 5, 20);

  // Has bullet points
  const bulletCount = (markdown.match(/^[-*] /gm) || []).length;
  score += Math.min(bulletCount * 2, 20);

  // Has definition in first 100 words
  const firstParagraph = markdown.split('\n\n')[1] || '';
  if (firstParagraph.length > 50 && firstParagraph.length < 500) score += 15;

  // Has statistics/numbers
  const numberCount = (markdown.match(/\d+%|\d+\.\d+|\d{4}/g) || []).length;
  score += Math.min(numberCount * 3, 15);

  // Has expert quote
  if (markdown.includes('>') || markdown.includes('—')) score += 10;

  // Has last updated date
  if (markdown.includes('Last updated') || markdown.includes('Updated:')) score += 5;

  // Has cross-references
  if (markdown.includes('](') || markdown.includes('Related')) score += 5;

  return Math.min(score, 100);
}

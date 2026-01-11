export type ContentType = 'term' | 'interview' | 'comparison' | 'report';
export type MentionType = 'quote' | 'tool_list' | 'comparison' | 'interview' | 'example';
export type ContentCategory = 'saas' | 'devtools' | 'security' | 'fintech' | 'ai-ml';

export interface ContentMention {
  id: string;
  client_id: string;
  content_type: ContentType;
  content_path: string;
  repo: string;
  mention_type?: MentionType;
  mention_context?: string;
  github_url?: string;
  geo_score?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateGlossaryTermInput {
  term: string;
  category: ContentCategory;
  include_client_mention: boolean;
  mention_type?: MentionType;
  related_terms?: string[];
  publish: boolean;
}

export interface CreateGlossaryTermOutput {
  markdown: string;
  geo_score: number;
  repo: string;
  file_path: string;
  github_url?: string;
  client_mention_context?: string;
}

export interface CreateGlossaryBatchInput {
  terms: string[];
  category: ContentCategory;
  client_mention_frequency: 'all' | 'half' | 'strategic';
}

export interface CreateGlossaryBatchOutput {
  created: Array<{
    term: string;
    github_url?: string;
    geo_score: number;
    has_client_mention: boolean;
  }>;
  total_created: number;
}

export interface CreateInterviewInput {
  interviewee_name: string;
  company: string;
  role: string;
  topics: string[];
  raw_transcript?: string;
  generate_questions: boolean;
}

export interface CreateInterviewOutput {
  markdown: string;
  github_url?: string;
  extractable_quotes: string[];
  cross_references: string[];
}

export interface CreateComparisonInput {
  title: string;
  items: string[];
  criteria: string[];
  include_client: boolean;
}

export interface CreateComparisonOutput {
  markdown: string;
  github_url?: string;
  client_position?: string;
}

export interface OptimizeContentInput {
  content: string;
  format?: 'markdown' | 'plain';
}

export interface OptimizeContentOutput {
  optimized_content: string;
  before_score: number;
  after_score: number;
  changes_made: string[];
}

export interface SuggestContentOutput {
  suggestions: Array<{
    type: ContentType;
    title: string;
    rationale: string;
    potential_impact: 'low' | 'medium' | 'high';
    priority: number;
  }>;
}

export interface ContentHealthItem {
  content_path: string;
  issue: string;
  recommended_action: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ContentHealth {
  total_mentions: number;
  healthy: number;
  stale: number;
  underperforming: number;
  action_items: ContentHealthItem[];
}

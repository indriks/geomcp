import { ClientProfile, ExpertQuote } from './client';
import { SubscriptionInfo } from './subscription';

// Status Tool
export interface StatusResponse {
  subscription: SubscriptionInfo;
  client_profile: {
    company: string;
    industry: string;
    competitors: string[];
    expert_quotes: number;
  };
  content_stats: {
    terms_with_mentions: number;
    interviews: number;
    comparison_appearances: number;
  };
  citation_summary: {
    overall_rate: number;
    by_platform: {
      chatgpt: number;
      claude: number;
      perplexity: number;
    };
  };
}

// Setup Tool
export interface SetupInput {
  company_name: string;
  website: string;
  industry: string;
  product_description: string;
  competitors: string[];
  expert_quotes: Array<{
    person: string;
    role: string;
    quote: string;
    approved: boolean;
  }>;
}

export interface SetupOutput {
  profile_id: string;
  assigned_repos: string[];
  recommended_terms: string[];
}

// Profile Tool
export interface ProfileInput {
  company_name?: string;
  website?: string;
  industry?: string;
  product_description?: string;
  competitors?: string[];
  add_quote?: {
    person: string;
    role: string;
    quote: string;
    approved: boolean;
  };
}

export interface ProfileOutput {
  profile: ClientProfile;
  expert_quotes: ExpertQuote[];
}

// Research Tool
export interface ResearchTermInput {
  term: string;
  depth: 'quick' | 'comprehensive';
}

export interface CompetitorCoverage {
  competitor: string;
  has_content: boolean;
  quality: 'weak' | 'moderate' | 'strong';
}

export interface ResearchTermOutput {
  definition: string;
  key_facts: string[];
  statistics: string[];
  related_terms: string[];
  competitor_coverage: CompetitorCoverage[];
  recommended_angle: string;
  estimated_geo_impact: 'low' | 'medium' | 'high';
  sources: string[];
}

export interface FindOpportunitiesInput {
  category: string;
  limit: number;
}

export interface Opportunity {
  term: string;
  search_volume: 'low' | 'medium' | 'high';
  competition: 'low' | 'medium' | 'high';
  current_citation_leader?: string;
  client_relevance: 'low' | 'medium' | 'high';
  recommended_action: string;
}

export interface FindOpportunitiesOutput {
  opportunities: Opportunity[];
}

export interface AnalyzeCompetitorInput {
  competitor: string;
}

export interface AnalyzeCompetitorOutput {
  citation_rate: number;
  platforms: {
    chatgpt: number;
    claude: number;
    perplexity: number;
  };
  strongest_queries: string[];
  content_sources: string[];
  weaknesses: string[];
  strategy_summary: string;
}

// GitHub Tools
export interface ListContentInput {
  type?: 'terms' | 'interviews' | 'comparisons' | 'all';
}

export interface ContentItem {
  type: string;
  title: string;
  repo: string;
  github_url: string;
  mention_type?: string;
  last_updated: string;
  citation_performance?: string;
}

export interface ListContentOutput {
  content: ContentItem[];
  total: number;
}

export interface RefreshStaleInput {
  limit?: number;
  dry_run: boolean;
}

export interface RefreshResult {
  content_path: string;
  changes_made: string[];
}

export interface RefreshStaleOutput {
  refreshed: RefreshResult[];
  total_refreshed: number;
}

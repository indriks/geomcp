export type Platform = 'chatgpt' | 'claude' | 'perplexity' | 'gemini';
export type QueryPriority = 'high' | 'medium' | 'low';
export type ReportPeriod = 'day' | 'week' | 'month';

export interface Citation {
  id: string;
  client_id: string;
  query: string;
  platform: Platform;
  cited: boolean;
  citation_context?: string;
  position?: number;
  competitors_cited: string[];
  content_path?: string;
  checked_at: string;
}

export interface MonitoredQuery {
  id: string;
  client_id: string;
  query: string;
  priority: QueryPriority;
  last_checked_at?: string;
  created_at: string;
}

export interface CheckCitationsInput {
  queries: string[];
  platforms: Platform[];
}

export interface CitationResult {
  query: string;
  platform: Platform;
  client_cited: boolean;
  citation_context?: string;
  position?: number;
  competitors_cited: string[];
}

export interface CheckCitationsOutput {
  results: CitationResult[];
  summary: {
    total_queries: number;
    client_cited_count: number;
    citation_rate: number;
  };
}

export interface CitationReportInput {
  period: ReportPeriod;
}

export interface PlatformCitationRate {
  rate: number;
  change: number;
}

export interface ContentPerformance {
  content_path: string;
  citations_driven: number;
}

export interface CitationChange {
  query: string;
  platform: Platform;
  date: string;
  taken_by?: string;
}

export interface CitationReport {
  overall_score: number;
  score_change: number;
  by_platform: Record<Platform, PlatformCitationRate>;
  content_performance: ContentPerformance[];
  gained_citations: CitationChange[];
  lost_citations: CitationChange[];
  recommendations: string[];
}

export interface CitationAlert {
  type: 'gain' | 'loss' | 'competitor_movement';
  query: string;
  platform: Platform;
  details: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

export interface MonitorQueryInput {
  query: string;
  priority: QueryPriority;
}

export interface MonitorQueryOutput {
  id: string;
  query: string;
  priority: QueryPriority;
  expected_check_frequency: string;
}

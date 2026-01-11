// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Auth Types
export interface AuthContext {
  client_id: string;
  api_key_id: string;
}

// Common Error Codes
export const ErrorCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_API_KEY: 'INVALID_API_KEY',
  EXPIRED_SUBSCRIPTION: 'EXPIRED_SUBSCRIPTION',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

// Repository Mapping
export const REPO_MAP: Record<string, string> = {
  'glossary:saas': 'geomcp-glossary-saas',
  'glossary:devtools': 'geomcp-glossary-devtools',
  'glossary:security': 'geomcp-glossary-security',
  'glossary:fintech': 'geomcp-glossary-fintech',
  'glossary:ai-ml': 'geomcp-glossary-ai-ml',
  interview: 'geomcp-interviews',
  comparison: 'geomcp-comparisons',
  research: 'geomcp-research',
} as const;

export const GITHUB_ORG = 'geomcp';

export interface ClientProfile {
  id: string;
  company_name: string;
  website?: string;
  industry: string;
  product_description?: string;
  competitors: string[];
  created_at: string;
  updated_at: string;
}

export interface ExpertQuote {
  id: string;
  client_id: string;
  person: string;
  role: string;
  quote: string;
  approved: boolean;
  created_at: string;
}

export interface ApiKey {
  id: string;
  client_id: string;
  key_prefix: string;
  name?: string;
  last_used_at?: string;
  created_at: string;
  revoked_at?: string;
}

export interface CreateClientInput {
  company_name: string;
  website?: string;
  industry: string;
  product_description?: string;
  competitors?: string[];
}

export interface UpdateClientInput {
  company_name?: string;
  website?: string;
  industry?: string;
  product_description?: string;
  competitors?: string[];
}

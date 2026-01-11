import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { getEnvConfig } from '../config/env';

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    const config = getEnvConfig();
    supabaseClient = createClient(config.supabaseUrl, config.supabaseServiceRoleKey);
  }
  return supabaseClient;
}

// Database query helpers
export async function getClientById(clientId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', clientId)
    .single();

  if (error) throw new Error(`Failed to get client: ${error.message}`);
  return data;
}

export async function getClientByApiKey(keyHash: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('api_keys')
    .select('client_id, id')
    .eq('key_hash', keyHash)
    .is('revoked_at', null)
    .single();

  if (error) throw new Error(`Invalid API key`);
  return data;
}

export async function updateApiKeyLastUsed(keyId: string) {
  const supabase = getSupabaseClient();
  await supabase
    .from('api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', keyId);
}

export async function getSubscription(clientId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('client_id', clientId)
    .single();

  if (error) return null;
  return data;
}

export async function getExpertQuotes(clientId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('expert_quotes')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) return [];
  return data || [];
}

export async function getContentMentions(clientId: string, type?: string) {
  const supabase = getSupabaseClient();
  let query = supabase.from('content_mentions').select('*').eq('client_id', clientId);

  if (type && type !== 'all') {
    const typeMap: Record<string, string> = {
      terms: 'term',
      interviews: 'interview',
      comparisons: 'comparison',
    };
    query = query.eq('content_type', typeMap[type] || type);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) return [];
  return data || [];
}

export async function getCitations(clientId: string, period?: string) {
  const supabase = getSupabaseClient();
  let query = supabase.from('citations').select('*').eq('client_id', clientId);

  if (period) {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'day':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    query = query.gte('checked_at', startDate.toISOString());
  }

  const { data, error } = await query.order('checked_at', { ascending: false });

  if (error) return [];
  return data || [];
}

export async function getMonitoredQueries(clientId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('monitored_queries')
    .select('*')
    .eq('client_id', clientId)
    .order('priority', { ascending: true });

  if (error) return [];
  return data || [];
}

export async function upsertClient(clientId: string, data: Record<string, unknown>) {
  const supabase = getSupabaseClient();
  const { data: result, error } = await supabase
    .from('clients')
    .upsert({ id: clientId, ...data, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) throw new Error(`Failed to update client: ${error.message}`);
  return result;
}

export async function createExpertQuote(
  clientId: string,
  quote: { person: string; role: string; quote: string; approved: boolean }
) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('expert_quotes')
    .insert({ client_id: clientId, ...quote })
    .select()
    .single();

  if (error) throw new Error(`Failed to create quote: ${error.message}`);
  return data;
}

export async function createContentMention(data: {
  client_id: string;
  content_type: string;
  content_path: string;
  repo: string;
  mention_type?: string;
  mention_context?: string;
  github_url?: string;
  geo_score?: number;
}) {
  const supabase = getSupabaseClient();
  const { data: result, error } = await supabase
    .from('content_mentions')
    .insert(data)
    .select()
    .single();

  if (error) throw new Error(`Failed to create content mention: ${error.message}`);
  return result;
}

export async function createCitation(data: {
  client_id: string;
  query: string;
  platform: string;
  cited: boolean;
  citation_context?: string;
  position?: number;
  competitors_cited?: string[];
  content_path?: string;
}) {
  const supabase = getSupabaseClient();
  const { data: result, error } = await supabase.from('citations').insert(data).select().single();

  if (error) throw new Error(`Failed to create citation: ${error.message}`);
  return result;
}

export async function createMonitoredQuery(data: {
  client_id: string;
  query: string;
  priority: string;
}) {
  const supabase = getSupabaseClient();
  const { data: result, error } = await supabase
    .from('monitored_queries')
    .upsert(data, { onConflict: 'client_id,query' })
    .select()
    .single();

  if (error) throw new Error(`Failed to create monitored query: ${error.message}`);
  return result;
}

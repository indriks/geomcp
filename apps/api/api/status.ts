import type { VercelRequest, VercelResponse } from '@vercel/node';

import { authenticateRequest } from '../lib/auth';
import { getSupabase } from '../lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { clientId } = await authenticateRequest(req);
    const supabase = getSupabase();

    // Fetch client data
    const { data: client } = await supabase
      .from('clients')
      .select('*')
      .eq('id', clientId)
      .single();

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('client_id', clientId)
      .single();

    const { data: quotes } = await supabase
      .from('expert_quotes')
      .select('*')
      .eq('client_id', clientId);

    const { data: mentions } = await supabase
      .from('content_mentions')
      .select('*')
      .eq('client_id', clientId);

    const { data: citations } = await supabase
      .from('citations')
      .select('*')
      .eq('client_id', clientId)
      .gte('checked_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    // Calculate stats
    const citedCount = citations?.filter((c) => c.cited).length || 0;
    const totalChecks = citations?.length || 0;
    const overallRate = totalChecks > 0 ? Math.round((citedCount / totalChecks) * 100) : 0;

    return res.status(200).json({
      subscription: {
        status: subscription?.status || 'trial',
        plan: subscription?.plan || 'standard',
        price: '€1,500/month',
        next_billing: subscription?.current_period_end,
      },
      client_profile: {
        company: client?.company_name || 'Not configured',
        industry: client?.industry || 'Not configured',
        competitors: client?.competitors || [],
        expert_quotes: quotes?.length || 0,
      },
      content_stats: {
        terms_with_mentions: mentions?.filter((m) => m.content_type === 'term').length || 0,
        interviews: mentions?.filter((m) => m.content_type === 'interview').length || 0,
        comparison_appearances: mentions?.filter((m) => m.content_type === 'comparison').length || 0,
      },
      citation_summary: {
        overall_rate: overallRate,
        by_platform: {
          chatgpt: 0,
          claude: 0,
          perplexity: 0,
        },
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return res.status(401).json({ error: message });
  }
}

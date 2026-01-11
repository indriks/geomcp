import type { VercelRequest, VercelResponse } from '@vercel/node';

import { getSupabase } from '../../lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Verify cron secret
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabase = getSupabase();

  try {
    // Get all active clients with monitored queries
    const { data: clients } = await supabase
      .from('subscriptions')
      .select('client_id')
      .eq('status', 'active');

    if (!clients) {
      return res.status(200).json({ message: 'No active clients' });
    }

    const results = [];

    for (const { client_id } of clients) {
      // Get monitored queries for this client
      const { data: queries } = await supabase
        .from('monitored_queries')
        .select('*')
        .eq('client_id', client_id);

      if (!queries || queries.length === 0) continue;

      // Get client info
      const { data: client } = await supabase
        .from('clients')
        .select('company_name, competitors')
        .eq('id', client_id)
        .single();

      if (!client) continue;

      // Filter queries by priority for daily check
      const today = new Date().getDay();
      const queriesToCheck = queries.filter((q) => {
        if (q.priority === 'high') return true; // Check daily
        if (q.priority === 'medium') return today % 2 === 0; // Check every other day
        return today === 0; // Low priority only on Sundays
      });

      // Update last_checked_at
      for (const query of queriesToCheck) {
        await supabase
          .from('monitored_queries')
          .update({ last_checked_at: new Date().toISOString() })
          .eq('id', query.id);
      }

      results.push({
        client_id,
        queries_scheduled: queriesToCheck.length,
      });
    }

    return res.status(200).json({
      message: 'Citation check scheduled',
      results,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Cron error';
    return res.status(500).json({ error: message });
  }
}

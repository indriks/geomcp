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
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const twentyFiveDaysAgo = new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString();

    // Find stale content
    const { data: staleContent } = await supabase
      .from('content_mentions')
      .select('*')
      .lt('updated_at', thirtyDaysAgo);

    // Find content approaching staleness
    const { data: warningContent } = await supabase
      .from('content_mentions')
      .select('*')
      .lt('updated_at', twentyFiveDaysAgo)
      .gte('updated_at', thirtyDaysAgo);

    const summary = {
      stale_count: staleContent?.length || 0,
      warning_count: warningContent?.length || 0,
      stale_by_client: {} as Record<string, number>,
    };

    // Group by client
    if (staleContent) {
      for (const content of staleContent) {
        summary.stale_by_client[content.client_id] =
          (summary.stale_by_client[content.client_id] || 0) + 1;
      }
    }

    return res.status(200).json({
      message: 'Content refresh check complete',
      summary,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Cron error';
    return res.status(500).json({ error: message });
  }
}

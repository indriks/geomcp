import type { VercelRequest, VercelResponse } from '@vercel/node';

import { authenticateRequest } from '../lib/auth';
import { getSupabase } from '../lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const { clientId } = await authenticateRequest(req);
    const supabase = getSupabase();

    if (req.method === 'GET') {
      const { data: client } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single();

      const { data: quotes } = await supabase
        .from('expert_quotes')
        .select('*')
        .eq('client_id', clientId);

      return res.status(200).json({
        profile: client,
        expert_quotes: quotes || [],
      });
    }

    if (req.method === 'PUT') {
      const { company_name, website, industry, product_description, competitors, add_quote } =
        req.body;

      // Update client
      if (company_name || website || industry || product_description || competitors) {
        const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
        if (company_name) updates.company_name = company_name;
        if (website) updates.website = website;
        if (industry) updates.industry = industry;
        if (product_description) updates.product_description = product_description;
        if (competitors) updates.competitors = competitors;

        await supabase.from('clients').update(updates).eq('id', clientId);
      }

      // Add quote if provided
      if (add_quote) {
        await supabase.from('expert_quotes').insert({
          client_id: clientId,
          ...add_quote,
        });
      }

      // Fetch updated data
      const { data: client } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single();

      const { data: quotes } = await supabase
        .from('expert_quotes')
        .select('*')
        .eq('client_id', clientId);

      return res.status(200).json({
        profile: client,
        expert_quotes: quotes || [],
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return res.status(401).json({ error: message });
  }
}

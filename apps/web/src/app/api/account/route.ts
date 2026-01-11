import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { getSupabase } from '@/lib/supabase';

export async function GET(_req: NextRequest) {
  try {
    const supabase = getSupabase();

    // Get session from cookie (simplified - in production use proper auth)
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const clientId = sessionCookie.value;

    // Get subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('client_id', clientId)
      .single();

    // Get API keys
    const { data: apiKeys } = await supabase
      .from('api_keys')
      .select('id, key_prefix, name, created_at')
      .eq('client_id', clientId)
      .is('revoked_at', null);

    return NextResponse.json({
      subscription: {
        status: subscription?.status || 'trial',
        plan: subscription?.plan || 'standard',
        next_billing: subscription?.current_period_end,
      },
      apiKeys: apiKeys || [],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get account';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

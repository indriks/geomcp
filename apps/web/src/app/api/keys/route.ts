import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { cookies } from 'next/headers';

import { getSupabase } from '@/lib/supabase';

function generateApiKey(): { key: string; hash: string; prefix: string } {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const key = `sk_live_${Buffer.from(bytes).toString('base64url')}`;
  const hash = createHash('sha256').update(key).digest('hex');
  const prefix = key.slice(0, 12);

  return { key, hash, prefix };
}

export async function POST(_req: NextRequest) {
  try {
    const supabase = getSupabase();
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const clientId = sessionCookie.value;

    const { key, hash, prefix } = generateApiKey();

    await supabase.from('api_keys').insert({
      client_id: clientId,
      key_hash: hash,
      key_prefix: prefix,
      name: 'API Key',
    });

    return NextResponse.json({ key });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to generate key';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

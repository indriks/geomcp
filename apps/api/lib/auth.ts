import { createHash } from 'crypto';
import type { VercelRequest } from '@vercel/node';

import { getSupabase } from './supabase';

export interface AuthResult {
  clientId: string;
  apiKeyId: string;
}

export function hashApiKey(key: string): string {
  return createHash('sha256').update(key).digest('hex');
}

export async function authenticateRequest(req: VercelRequest): Promise<AuthResult> {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing Authorization header');
  }

  const apiKey = authHeader.slice(7);
  const keyHash = hashApiKey(apiKey);

  const supabase = getSupabase();

  const { data: keyRecord, error } = await supabase
    .from('api_keys')
    .select('id, client_id')
    .eq('key_hash', keyHash)
    .is('revoked_at', null)
    .single();

  if (error || !keyRecord) {
    throw new Error('Invalid API key');
  }

  // Check subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('client_id', keyRecord.client_id)
    .single();

  if (!subscription || subscription.status === 'expired' || subscription.status === 'cancelled') {
    throw new Error('Subscription expired');
  }

  // Update last used
  await supabase
    .from('api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', keyRecord.id);

  return {
    clientId: keyRecord.client_id,
    apiKeyId: keyRecord.id,
  };
}

export function generateApiKey(): { key: string; hash: string; prefix: string } {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const key = `sk_live_${Buffer.from(bytes).toString('base64url')}`;
  const hash = hashApiKey(key);
  const prefix = key.slice(0, 12);

  return { key, hash, prefix };
}

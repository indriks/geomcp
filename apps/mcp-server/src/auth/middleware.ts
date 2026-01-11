import { createHash } from 'crypto';

import { AuthContext } from '@geomcp/shared';

import { getClientByApiKey, updateApiKeyLastUsed, getSubscription } from '../db/client';

export function hashApiKey(key: string): string {
  return createHash('sha256').update(key).digest('hex');
}

export async function validateApiKey(apiKey: string): Promise<AuthContext> {
  if (!apiKey) {
    throw new Error('API key is required');
  }

  // Hash the API key to look up in database
  const keyHash = hashApiKey(apiKey);

  try {
    // Look up the API key
    const apiKeyRecord = await getClientByApiKey(keyHash);

    if (!apiKeyRecord) {
      throw new Error('Invalid API key');
    }

    // Check subscription status
    const subscription = await getSubscription(apiKeyRecord.client_id);

    if (!subscription) {
      throw new Error('No active subscription found');
    }

    if (subscription.status === 'expired' || subscription.status === 'cancelled') {
      throw new Error('Subscription has expired. Please renew to continue using GEO MCP.');
    }

    // Update last used timestamp
    await updateApiKeyLastUsed(apiKeyRecord.id);

    return {
      client_id: apiKeyRecord.client_id,
      api_key_id: apiKeyRecord.id,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Authentication failed');
  }
}

export function generateApiKey(): { key: string; hash: string; prefix: string } {
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  const key = `sk_live_${Buffer.from(randomBytes).toString('base64url')}`;
  const hash = hashApiKey(key);
  const prefix = key.slice(0, 12);

  return { key, hash, prefix };
}

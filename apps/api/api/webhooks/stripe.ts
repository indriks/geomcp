import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

import { getStripe } from '../../lib/stripe';
import { getSupabase } from '../../lib/supabase';
import { generateApiKey } from '../../lib/auth';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: NodeJS.ReadableStream): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = getStripe();
  const supabase = getSupabase();

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return res.status(400).json({ error: 'Missing signature or webhook secret' });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook error';
    return res.status(400).json({ error: message });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const clientId = session.metadata?.client_id;

      if (clientId && session.subscription) {
        // Create subscription record
        await supabase.from('subscriptions').upsert({
          client_id: clientId,
          stripe_subscription_id: session.subscription as string,
          stripe_customer_id: session.customer as string,
          status: 'active',
          plan: 'standard',
          price_cents: 150000,
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        });

        // Generate API key
        const { key, hash, prefix } = generateApiKey();

        await supabase.from('api_keys').insert({
          client_id: clientId,
          key_hash: hash,
          key_prefix: prefix,
          name: 'Default API Key',
        });

        // Store the key temporarily for retrieval
        // In production, you'd email this or show it once
        console.warn(`Generated API key for ${clientId}: ${key}`);
      }
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;

      await supabase
        .from('subscriptions')
        .update({
          status: subscription.status === 'active' ? 'active' : 'expired',
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;

      await supabase
        .from('subscriptions')
        .update({ status: 'cancelled' })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;

      if (invoice.subscription) {
        await supabase
          .from('subscriptions')
          .update({ status: 'expired' })
          .eq('stripe_subscription_id', invoice.subscription as string);
      }
      break;
    }
  }

  return res.status(200).json({ received: true });
}

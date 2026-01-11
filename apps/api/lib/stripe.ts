import Stripe from 'stripe';

let stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('Missing Stripe configuration');
    }
    stripe = new Stripe(key, { apiVersion: '2023-10-16' });
  }
  return stripe;
}

export const PRICE_ID = 'price_geomcp_standard'; // Will be created in Stripe
export const PRICE_AMOUNT = 150000; // €1,500 in cents

export async function createCheckoutSession(
  customerEmail: string,
  clientId: string
): Promise<string> {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'GEO MCP Standard',
            description: 'MCP-Native Generative Engine Optimization Platform',
          },
          unit_amount: PRICE_AMOUNT,
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      client_id: clientId,
    },
    success_url: `${process.env.APP_URL}/account?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}/pricing`,
  });

  return session.url || '';
}

export async function createPortalSession(customerId: string): Promise<string> {
  const stripe = getStripe();

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.APP_URL}/account`,
  });

  return session.url;
}

export type SubscriptionStatus = 'active' | 'trial' | 'expired' | 'cancelled';

export interface Subscription {
  id: string;
  client_id: string;
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  status: SubscriptionStatus;
  plan: string;
  price_cents: number;
  current_period_start?: string;
  current_period_end?: string;
  created_at: string;
}

export interface SubscriptionInfo {
  status: SubscriptionStatus;
  plan: string;
  price: string;
  next_billing?: string;
}

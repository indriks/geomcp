import { NextRequest, NextResponse } from 'next/server';

import { getSupabase } from '@/lib/supabase';
import { getStripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabase();
    const stripe = getStripe();

    const { email, password, companyName, industry } = await req.json();

    // Create Supabase auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user.id;

    // Create client record
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .insert({
        id: userId,
        company_name: companyName,
        industry,
      })
      .select()
      .single();

    if (clientError) {
      return NextResponse.json({ error: clientError.message }, { status: 400 });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'GEO MCP Standard',
              description: 'MCP-Native Generative Engine Optimization Platform',
            },
            unit_amount: 150000, // €1,500
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        client_id: client.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Signup failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

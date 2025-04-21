import { NextResponse } from "next/server";
import { headers } from "next/headers";

import stripe from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const { plan, priceId, mode, user } = await request.json();

    const session = await stripe.checkout.sessions.create({
      mode: mode,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      ...(plan?.trial_period_days && {
        subscription_data: {
          trial_period_days: plan?.trial_period_days,
        },
      }),
      customer_email: user.email,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Error creating checkout session: ${err}` },
      { status: 500 }
    );
  }
}

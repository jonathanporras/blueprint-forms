import { NextResponse } from "next/server";
import { headers } from "next/headers";

import stripe from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const { user_id, priceId, mode } = await request.json();

    const session = await stripe.checkout?.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Error creating checkout session: ${err}` },
      { status: 500 }
    );
  }
}

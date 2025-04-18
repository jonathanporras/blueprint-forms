"use client";
import { loadStripe } from "@stripe/stripe-js";
import { User } from "@supabase/supabase-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function PricingCTA({ plan, text }: { plan: any; text: string; user: User }) {
  async function handleSubscribe(priceId: string, mode: string, trial_period_days?: number) {
    const stripe = await stripePromise;
    const body = {
      priceId,
      mode,
      plan,
      ...(trial_period_days && { trial_period_days: trial_period_days }),
    };
    const { sessionId } = await fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    const result = await stripe?.redirectToCheckout({ sessionId });

    if (result?.error) {
      console.error(result.error);
    }
  }
  return (
    <button
      style={{ marginTop: "auto" }}
      className="bg-[#2FAF68] text-white px-4 py-2 rounded-lg font-medium w-full hover:bg-[#37c476] transition"
      onClick={() => {
        handleSubscribe(plan.priceId, plan.mode, plan?.trial_period_days);
      }}
    >
      {text}
    </button>
  );
}

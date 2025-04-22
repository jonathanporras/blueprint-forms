"use client";
import { loadStripe } from "@stripe/stripe-js";
import { User } from "@supabase/supabase-js";
import { set } from "date-fns";
import { useState } from "react";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function PricingCTA({
  plan,
  text,
  user,
}: {
  plan: any;
  text: string;
  user: User;
}) {
  const [loading, setLoading] = useState(false);
  async function handleSubscribe(priceId: string, mode: string, trial_period_days?: number) {
    const stripe = await stripePromise;
    const body = {
      priceId,
      mode,
      plan,
      user,
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
      className="bg-[#2FAF68] text-white px-4 py-2 rounded-lg font-medium w-full hover:bg-[#37c476] transition relative inline-flex items-center justify-center"
      onClick={() => {
        setLoading(true);
        handleSubscribe(plan.priceId, plan.mode, plan?.trial_period_days);
      }}
    >
      {loading ? (
        <svg
          className="animate-spin h-6 w-6 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M12 2a10 10 0 00-9.95 9h2A8 8 0 0112 4V2z"
          />
        </svg>
      ) : (
        text
      )}
    </button>
  );
}

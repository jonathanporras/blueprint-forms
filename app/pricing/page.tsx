"use server";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import PricingCTA from "./pricing-cta";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface PricingPlan {
  name: string;
  price: string;
  term?: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  mode: string;
  priceId: string;
  trial_period_days?: number;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "FREE Trial",
    price: "$0",
    term: "for 7 days",
    features: [
      "Print and export your documents. Full access to our library of legal docs.",
      "Try us for 7 days for FREE",
      "Renews at $37 plus applicable taxes on the 8th day, and automatically renews each month. Cancel anytime.",
    ],
    buttonText: "Choose Plan",
    mode: "subscription",
    priceId: "price_1RH8HIDpqPmduxm5OqK4jivT",
    trial_period_days: 7,
  },
  {
    name: "12 Months",
    price: "$99 ",
    term: "/ year",
    features: [
      "Premium Annual membership",
      "Print and export your documents. Full access to our library of legal docs.",
      "Charged as one upfront payment of $99 plus applicable taxes and automatically renews annually thereafter.",
    ],
    buttonText: "Choose Plan",
    mode: "subscription",
    priceId: "price_1RH8IJDpqPmduxm57q6mYzC5",
  },
  {
    name: "Just This Document",
    price: "$69",
    features: [
      "Purchase your completed document",
      "Print and export your document in PDF format",
      "One time charge",
    ],
    buttonText: "Choose Plan",
    mode: "payment",
    priceId: "price_1RH8JjDpqPmduxm5L6Mwgtlf",
  },
];

export default async function Pricing() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-up");
  }

  return (
    <div className="max-w-6xl mx-auto my-10 px-6">
      <h1 className="text-3xl text-center mb-8">Choose a Plan for Your Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`border rounded-xl p-6 flex flex-col justify-start shadow-md ${plan.isPopular ? "border-blue-500 shadow-lg" : "border-gray-300"}`}
          >
            {plan.isPopular && (
              <div className="bg-blue-500 text-white px-3 py-1 text-sm font-bold rounded-md inline-block mb-4">
                Most Popular
              </div>
            )}
            <h2 className="text-sm mb-8">{plan.name}</h2>
            <p className="text-3xl font-bold">{plan.price}</p>
            {plan.term && <p className="text-xs pt-1">{plan.term}</p>}
            <ul className="text-gray-600 text-md">
              {plan.features.map((feature, i) => (
                <li key={i} className="my-8 text-sm flex">
                  <span className="text-[#2FAF68] pr-2">&#10003; </span> {feature}
                </li>
              ))}
            </ul>
            <PricingCTA plan={plan} text={plan.buttonText} user={user} />
          </div>
        ))}
      </div>
      <div className="text-center mx-auto mt-20 w-fill max-w-2xl">
        <p>
          "I truly appreciate QuickForm Pro—their service took the hassle out of creating my
          legal documents and made the whole process effortless!"
        </p>
        <p>- Paul N., Account Executive</p>
        <img
          className="block mx-auto mt-8"
          alt="Trusted Business Seals"
          src="/images/allTheSeals-small.png"
        />
      </div>
    </div>
  );
}

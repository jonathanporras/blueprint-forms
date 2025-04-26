"use server";
import { redirect } from "next/navigation";
import stripe from "@/lib/stripe";
import { Message } from "postcss";
import { createClient } from "@/utils/supabase/server";
import { updateProfile } from "@/utils/api-server";
import { ArrowUpRight } from "lucide-react";
import CTA from "@/components/cta";
import ConversionTracking from "./conversion-tracking";

const COST_PER_CLICK = 4;

export default async function Success(props: { searchParams: Promise<Message> }) {
  const { session_id } = await props.searchParams;
  const supabase = await createClient();

  if (!session_id) throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-up");
  }

  // const documents = await fetchDocuments(user.id);
  // const documentUrl = `/document/editor/${documents[0].template_type}/${documents[0].id}`;
  const myDocsUrl = "/document/dashboard";
  const {
    status,
    line_items,
    customer: customerId,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });
  const priceName = line_items?.data[0].price?.nickname;
  const value = line_items?.data[0]?.price?.unit_amount
    ? (Number(line_items?.data[0]?.price?.unit_amount / 100) - COST_PER_CLICK).toString()
    : null;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete" && priceName) {
    await updateProfile({
      status: "paid",
      id: user.id,
      priceName: priceName,
      ...(customerId && { stripeCustomerId: customerId.toString() }),
    });
  }

  if (status === "complete") {
    return (
      <div className="w-full my-20 max-w-4xl mx-auto min-h-screen flex flex-col">
        <section id="success">
          <h2 className="text-xl font-bold pb-2">Payment Successful! 🎉</h2>
          <p>
            {/* A confirmation email will be sent to {user.email}. <br /> */}
            If you have any questions, please contact us:{" "}
            <a href="mailto:orders@example.com" className="text-[#4285F4]">
              support@quickformpro.com
            </a>
            . <br />
            Print and export your documents now!
          </p>
          <div className="mt-8">
            <CTA
              icon={<ArrowUpRight className="pl-2" />}
              buttonText="My Documents"
              url={myDocsUrl}
            />
          </div>
        </section>
        {process.env.VERCEL_ENV === "production" && <ConversionTracking value={value} />}
      </div>
    );
  }
}

"use server";
import { redirect } from "next/navigation";
import stripe from "@/lib/stripe";
import { Message } from "postcss";
import { createClient } from "@/utils/supabase/server";
import { fetchDocuments, updateProfileStatus } from "@/utils/api-server";
import { ArrowUpRight } from "lucide-react";
import CTA from "@/components/cta";

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

  const documents = await fetchDocuments(user.id);
  console.log(documents);
  const documentUrl = `/document/editor/${documents[0].template_type}/${documents[0].id}`;
  const { status } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    await updateProfileStatus({ status: "paid", id: user.id });
  }

  if (status === "complete") {
    return (
      <div className="w-full my-20 max-w-4xl mx-auto min-h-screen flex flex-col">
        <section id="success">
          <h2 className="text-xl font-bold">Payment Successful!</h2>
          <p>
            A confirmation email will be sent to {user.email}. <br />
            If you have any questions, please contact us:{" "}
            <a href="mailto:orders@example.com">support@quickformpro.com</a>
            . <br />
            Print and export your documents now!
          </p>
          <div className="mt-8">
            <CTA
              icon={<ArrowUpRight className="pl-2" />}
              buttonText="Print and Export Now"
              url={documentUrl}
            />
          </div>
        </section>
      </div>
    );
  }
}

import { redirect } from "next/navigation";
import stripe from "@/lib/stripe";
import { Message } from "postcss";
import { createClient } from "@/utils/supabase/server";
import { updateProfileStatus } from "@/utils/api-server";

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

  const {
    status,
    // customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
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
      <div className="w-full my-20 max-w-7xl mx-auto">
        <section id="success">
          <p>Session: {session_id}</p>
          <p>
            We appreciate your business! A confirmation email will be sent to . If you have any
            questions, please contact us:
          </p>
          <a href="mailto:orders@example.com">support@quickformpro.com</a>.
        </section>
      </div>
    );
  }
}

import { redirect } from "next/navigation";

import stripe from "@/lib/stripe";
import { Message } from "postcss";

export default async function Success(props: { searchParams: Promise<Message> }) {
  const { session_id } = await props.searchParams;

  if (!session_id) throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}. If
          you have any questions, please contact us:
        </p>
        <a href="mailto:orders@example.com">support@quickformpro.com</a>.
      </section>
    );
  }
}

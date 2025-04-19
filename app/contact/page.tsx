import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="max-w-xl mx-auto px-4 my-20 flex flex-col items-center min-h-screen">
      <p className="font-bold text-xl">Contact us!</p>{" "}
      <a href="mailto:support@quickformpro.com">support@quickformpro.com</a>
    </div>
  );
}

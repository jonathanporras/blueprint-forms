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
      <h3 className="font-bold text-xl pb-8">Welcome to Qucik Form Pro!</h3>{" "}
      <p>
        Quick Form Pro helps business owners create, customize, and manage legal documents with
        ease. We simplify complex workflows and reduce drafting time. Quick Form Pro is ideal
        for startups and small business owners who need reliable, professional-grade documents
        quickly.
      </p>
    </div>
  );
}

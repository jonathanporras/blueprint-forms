import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import TestimonialsSection from "./testimonials";
import { ArrowUpRight } from "lucide-react";

export default async function Signup(props: {
  searchParams: Promise<{ document_id: string }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <div className="md:w-3/4 md:mb-40 mb-0 w-full p-4">
        <form className="flex flex-col min-w-64 mx-auto max-w-2xl my-20">
          {searchParams && <FormMessage message={searchParams as any} />}
          <h1 className="text-2xl font-medium">
            Download Your Lease Agreement Now!
            <br />
            It's Ready and Waiting
          </h1>
          <p className="text-sm text text-foreground">
            Already have an account?{" "}
            <Link className="text-primary font-medium underline" href="/log-in">
              Log in
            </Link>
          </p>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8 max-w-md">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              minLength={6}
              required
            />
            <Input
              name="document_id"
              value={searchParams?.document_id}
              type="hidden"
              readOnly
            />

            <SubmitButton
              className="bg-[#2FAF68] hover:bg-[#37c476] transition text-white text-md px-4 py-4 rounded"
              formAction={signUpAction}
              pendingText="Signing up..."
            >
              Download Now
              <ArrowUpRight size="30" className="pl-2" />
            </SubmitButton>
            <p className="text-md pb-0 text-center text-md">
              🔒 All data stays private and encrypted
            </p>
          </div>
          <TestimonialsSection />
        </form>
      </div>
      <div className="md:w-1/4 w-full p-4 bg-gray-100 flex flex-col items-center md:items-start pt-8 md:pt-24 px-10 pb-20">
        <p className="text-md mb-4">
          Your <span className="font-bold">Lease Agreement</span> is all set!
        </p>
        <p className="text-md pb-2">
          <span className="text-[#2FAF68] pr-2">&#10003; </span>Ready to Print or Download as
          PDF
        </p>
        <p className="text-md pb-2">
          <span className="text-[#2FAF68] pr-2">&#10003; </span> Cancel Anytime
        </p>
        <p className="text-md pb-2">
          <span className="pr-1">🔒</span> Secure storage of personal documents
        </p>
      </div>
    </div>
  );
}

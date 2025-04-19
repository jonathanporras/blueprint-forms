import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Signup(props: {
  searchParams: Promise<{ document_id: string }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <div className="md:w-3/4 mb-40 w-full p-4">
        <form className="flex flex-col min-w-64 mx-auto max-w-2xl my-20">
          {searchParams && <FormMessage message={searchParams as any} />}
          <h1 className="text-2xl font-medium">
            Almost Done! Create an Account to Save Your Document
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
              className="bg-[#2FAF68] hover:bg-[#37c476] transition text-white px-4 py-2 rounded"
              formAction={signUpAction}
              pendingText="Signing up..."
            >
              Create My Account
            </SubmitButton>
          </div>
        </form>
      </div>
      <div className="md:w-1/4 w-full p-4 bg-gray-100 flex flex-col justify-start pt-24 px-10">
        <p className="text-md mb-4">
          Your <span className="font-bold">Lease Agreement</span> is ready to download:
        </p>
        <p className="text-md pb-2">
          <span className="text-[#2FAF68] pr-2">&#10003; </span>Ready to Print
        </p>
        <p className="text-md pb-2">
          <span className="text-[#2FAF68] pr-2">&#10003; </span>Download as PDF
        </p>
        <p className="text-md pb-2">
          <span className="text-[#2FAF68] pr-2">&#10003; </span>Easy to Update
        </p>
      </div>
    </div>
  );
}

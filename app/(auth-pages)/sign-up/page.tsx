import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="md:w-3/4 mb-40 w-full p-4">
        <form className="flex flex-col min-w-64 mx-auto max-w-2xl my-20">
          <h1 className="text-2xl font-medium">
            Almost Done! Create an Account to Save Your Document
          </h1>
          <p className="text-sm text text-foreground">
            Already have an account?{" "}
            <Link className="text-primary font-medium underline" href="/log-in">
              Sign in
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
            <SubmitButton
              className="bg-[#2FAF68] hover:bg-[#37c476] transition text-white px-4 py-2 rounded"
              formAction={signUpAction}
              pendingText="Signing up..."
            >
              Create My Account
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
      <div className="md:w-1/4 w-full bg-gray-100 flex flex-col justify-center">
        Your document Lease Agreement Ready to print Downloads as PDF and in Word Easy to
        update
      </div>
    </div>
  );
}

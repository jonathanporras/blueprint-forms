import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge variant={"default"} className="font-normal pointer-events-none">
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/log-in">Log In</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <div className="flex text-white items-center gap-4">
      <Button className="text-white" asChild size="sm" variant="link">
        <Link href={"/document/dashboard"}>My Documents</Link>
      </Button>
      <form action={signOutAction}>
        <Button className="text-white" type="submit" variant="link">
          Sign Out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2 text-white">
      <Button className="text-white" asChild size="sm" variant="link">
        <Link href="/log-in">Log In</Link>
      </Button>
    </div>
  );
}

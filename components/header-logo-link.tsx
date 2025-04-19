"use client";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export default function HeaderLogoLink({ user }: { user?: User | null }) {
  const onClick = () => {
    if (!user) {
      return redirect("/log-in");
    }

    if (user) {
      return redirect("/document/dashboard");
    }
  };
  return (
    <div className="flex align-center text-lg tracking-wide logo-wrap text-white">
      <a className="flex cursor-pointer" onClick={() => onClick()}>
        <img
          className="inline mr-2 color-white"
          alt="QuickForm Pro Header Logo"
          src="/images/logo.png"
          style={{
            width: 30,
          }}
        />
        <p>QuickForm Pro</p>
      </a>
    </div>
  );
}

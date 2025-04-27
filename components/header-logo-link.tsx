"use client";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export default function HeaderLogoLink({ user }: { user?: User | null }) {
  const onClick = () => {
    if (!user) {
      return redirect("/");
    }

    if (user) {
      return redirect("/document/dashboard");
    }
  };
  return (
    <div className="flex align-center text-lg tracking-wide logo-wrap text-white">
      <a className="flex cursor-pointer items-center" onClick={() => onClick()}>
        <img
          className="inline color-white"
          alt="QuickForm Pro Header Logo"
          src="/images/logo.png"
          style={{
            height: 40,
          }}
        />
        {/* <p>QuickForm Pro</p> */}
        <img
          className="inline mr-2 color-white pt-1"
          alt="QuickForm Pro Header Logo"
          src="/images/text-logo.png"
          style={{
            width: 120,
          }}
        />
        {/* <p>QuickForm Pro</p> */}
      </a>
    </div>
  );
}

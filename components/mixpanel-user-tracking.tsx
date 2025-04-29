"use client";

import { MixpanelAnalytics } from "@/lib/mixpanel";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";

export default function MixpanelUserTracking({ user }: { user: User | null }) {
  useEffect(() => {
    const getUser = async () => {
      if (user) {
        await MixpanelAnalytics.identifyKnownUser(user.id);
      } else {
        await MixpanelAnalytics.identifyUnknownUser();
      }
    };
    getUser();
  }, []);
  return <></>;
}

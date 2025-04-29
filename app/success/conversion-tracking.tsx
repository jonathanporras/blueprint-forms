"use client";
import { ANALYTICS_EVENTS, MixpanelAnalytics } from "@/lib/mixpanel";
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";
import { useEffect } from "react";

export default function ConversionTracking({ value }: { value: string | null }) {
  useEffect(() => {
    // setTimeout(() => {
    //   sendGAEvent("event", "purchase", {
    //     value: value || "0",
    //   });
    //   sendGTMEvent({ event: "conversion", value: value || "0" });
    // }, 1000);
    MixpanelAnalytics.track(ANALYTICS_EVENTS.PURCHASE, {
      document: "lease-agreement",
      value: value,
    });
  });

  return <></>;
}

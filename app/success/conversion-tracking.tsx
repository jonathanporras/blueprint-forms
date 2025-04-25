"use client";
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";
import { useEffect } from "react";

export default function ConversionTracking({ value }: { value: string | null }) {
  useEffect(() => {
    setTimeout(() => {
      sendGAEvent("event", "purchase", {
        value: value || "0",
      });
      sendGTMEvent({ event: "conversion", value: value || "0" });
    }, 1000);
  });

  return <></>;
}

"use client";
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";
import { useEffect } from "react";

export default function ConversionTracking({ value }: { value: string }) {
  useEffect(() => {
    setTimeout(() => {
      sendGAEvent("event", "purchase", {
        value: value,
      });
      sendGTMEvent({ event: "conversion", value: value });
    }, 1000);
  });

  return <></>;
}

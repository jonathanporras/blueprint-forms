"use client";
import { sendGAEvent } from "@next/third-parties/google";
import { useEffect } from "react";

export default function ConversionTracking({ value }: { value: string }) {
  useEffect(() => {
    setTimeout(() => {
      sendGAEvent("event", "purchase", {
        value: value,
      });
    }, 1000);
  });

  return <></>;
}

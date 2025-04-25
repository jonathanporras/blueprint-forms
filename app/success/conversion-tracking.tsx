"use client";
import { sendGTMEvent } from "@next/third-parties/google";
import { useEffect } from "react";

export default function ConversionTracking({ value }: { value: string }) {
  useEffect(() => {
    setTimeout(() => {
      sendGTMEvent({ event: "conversion", value: value });
    }, 1000);
  });

  return <></>;
}

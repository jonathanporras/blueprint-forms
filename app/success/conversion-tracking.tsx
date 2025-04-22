"use client";
import { sendGAEvent } from "@next/third-parties/google";

export default function ConversionTracking({
  value,
  transaction_id,
}: {
  value: string;
  transaction_id: string;
}) {
  if (typeof window !== "undefined") {
    sendGAEvent({
      event: "purchase", // Event name
      value: {
        transaction_id: transaction_id, // Transaction ID
        value: value, // Transaction value
      },
    });
  }

  return <></>;
}

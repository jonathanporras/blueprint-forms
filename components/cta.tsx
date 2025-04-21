"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function CTA({
  icon,
  buttonText,
  url,
}: {
  icon: ReactNode;
  buttonText: string;
  url: string;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(url);
      }}
      className="bg-[#2FAF68] hover:bg-[#37c476] text-white px-8 py-3 rounded-lg transition flex items-center"
    >
      {buttonText}
      {icon}
    </button>
  );
}

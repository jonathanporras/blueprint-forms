"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MyAccount({
  priceName,
  email,
}: {
  priceName?: string;
  email?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className="w-full border rounded flex flex-col p-4">
      <h2 className="text-lg font-semibold mb-2">My Account:</h2>
      <p>User: {email}</p>
      {priceName ? (
        <>
          <p>Plan: {priceName}</p>
          <button
            className="text-xs w-full max-w-80 py-2 px-10 mt-20 mx-auto md:mx-0 bg-gray-100 hover:bg-gray-200 rounded"
            onClick={toggleDropdown}
          >
            Upgrade or Cancel Account
          </button>
          {isOpen && (
            <div className="mt-2 px-3 py-2 bg-white">
              Contact us:{" "}
              <a href="mailto:orders@example.com" className="text-[#4285F4]">
                support@quickformpro.com
              </a>
            </div>
          )}
        </>
      ) : (
        <>
          {/* <Link
            className="bg-[#2FAF68] hover:bg-[#37c476] flex justify-center text-white px-4 py-2 w-full max-w-80 text-center rounded-lg mt-10 mx-auto md:mx-0 transition"
            href="/pricing"
          >
            Upgrade To Export
            <ArrowRight className="pl-2" />
          </Link> */}
        </>
      )}
    </div>
  );
}

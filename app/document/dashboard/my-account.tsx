"use client";
import { useState } from "react";

export default function MyAccount({ priceName }: { priceName?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className="w-fit border rounded flex flex-col p-4">
      <h2 className="text-lg font-semibold mb-4">My Account:</h2>
      <p>Plan: {priceName}</p>
      <button
        className="text-xs w-full py-2 px-28 mt-20 bg-gray-100 hover:bg-gray-200 rounded"
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
    </div>
  );
}

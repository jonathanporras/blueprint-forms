"use client";
import { ArrowUpRight } from "lucide-react";

export default function CreateNewDoc() {
  return (
    <div className="w-full border rounded flex flex-col p-4">
      <h4 className="text-lg font-semibold mb-6">Create New Documents:</h4>
      <a
        href="/document/editor/lease-agreement"
        className="bg-[#2FAF68] hover:bg-[#37c476] flex justify-center text-white px-4 py-2 w-full max-w-80 text-center items-center rounded-lg mt-10 mx-auto md:mx-0 transition"
      >
        Create New Lease Agreement
        <ArrowUpRight className="ml-2" size={18} />
      </a>
    </div>
  );
}

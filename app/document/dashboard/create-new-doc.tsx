"use client";
import { ArrowUpRight } from "lucide-react";

export default function CreateNewDoc() {
  return (
    <div className="w-full border rounded flex flex-col p-4">
      <h4 className="text-lg font-semibold mb-6">Create New Documents:</h4>
      <a
        href="/document/editor/lease-agreement"
        className="bg-[#2FAF68] hover:bg-[#37c476] max-w-sm text-white px-1 py-3 rounded-lg transition flex justify-center items-center"
      >
        Create My Lease Agreement
        <ArrowUpRight className="ml-2" size={18} />
      </a>
    </div>
  );
}

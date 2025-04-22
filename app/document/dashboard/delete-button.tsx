"use client";
import React, { useState, useEffect } from "react";
import { deleteDocument } from "@/utils/api";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TwoStepDeleteButton({ documentId }: { documentId: string }) {
  const [armed, setArmed] = useState(false);
  const rounter = useRouter();

  useEffect(() => {
    if (armed) {
      const timer = setTimeout(() => setArmed(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [armed]);

  const handleClick = async () => {
    if (armed) {
      await deleteDocument(documentId);
      rounter.push("/document/dashboard");
    } else {
      setArmed(true);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-2 py-1 rounded-lg text-white font-medium transition-colors flex items-center ${
        armed ? "bg-red-700 hover:bg-red-800" : "bg-red-500 hover:bg-red-600"
      }`}
    >
      {armed ? (
        "Confirm Delete"
      ) : (
        <>
          <Trash2 size="18" />
        </>
      )}
    </button>
  );
}

"use client";
import { User } from "@supabase/supabase-js";
import dynamic from "next/dynamic";
import { Document } from "./page";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";

const DocumentPreview = dynamic(() => import("./document-preview"), {
  ssr: false,
});

export default function DocumentPreviewWrapper({
  user,
  documentId,
}: {
  user: User | null;
  documentId: Document["id"] | null;
}) {
  return (
    <div className="w-full lg:w-1/2 px-8 py-6 bg-gray-100 min-h-screen">
      <DocumentPreview user={user} documentId={documentId} />
    </div>
  );
}

"use client";
import { updateDocumentName } from "@/utils/api";
import { useEffect, useState } from "react";
import { Document } from "../editor/[template_type]/[document_id]/page";

export default function DocumentName({ document }: { document: Document }) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(document.name);
  }, [document]);

  return (
    <input
      placeholder="Document Name"
      value={name}
      onChange={(e) => {
        setName(e.target.value);
      }}
      className="w-full"
      onBlur={async () => {
        await updateDocumentName({ id: document.id, name: name });
      }}
    />
  );
}

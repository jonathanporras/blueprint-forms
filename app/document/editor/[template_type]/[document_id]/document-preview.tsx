"use client";
import { useEffect, useState } from "react";
import { Document } from "./page";
import { fetchDocumentFields } from "@/utils/api";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { documentFieldsAtom } from "@/app/atoms/documentFieldsAtom";

export default function DocumentPreview({ documentId }: { documentId: Document["id"] }) {
  const [formValues] = useAtom<Record<string, any>>(documentFieldsAtom);

  return (
    <div className="w-1/2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 1 }}
      >
        <p>{formValues["landlord-name"]?.value}</p>
        <p>{formValues["tenant-name"]?.value}</p>
      </motion.div>
    </div>
  );
}

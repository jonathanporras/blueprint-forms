"use client";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { documentFieldsAtom } from "@/app/atoms/documentFieldsAtom";
import { Button } from "@/components/ui/button";
import { usePDF } from "react-to-pdf";

export default function DocumentPreview() {
  const [formValues] = useAtom<Record<string, any>>(documentFieldsAtom);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  return (
    <div className="w-1/2">
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => toPDF()}>
          Export
        </Button>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 1 }}
      >
        <div ref={targetRef}>
          <p>{formValues["landlord-name"]?.value}</p>
          <p>{formValues["tenant-name"]?.value}</p>
          <br />
          <br />
        </div>
      </motion.div>
    </div>
  );
}

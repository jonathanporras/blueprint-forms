"use client";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { documentFieldsAtom } from "@/app/atoms/documentFieldsAtom";
import { usePDF } from "react-to-pdf";

export default function DocumentPreview() {
  const [formValues] = useAtom<Record<string, any>>(documentFieldsAtom);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  return (
    <div className="w-1/2">
      <div className="flex justify-end">
        <button
          className="bg-[#2FAF68] hover:bg-[#37c476] transition text-white px-4 py-2 rounded"
          onClick={() => toPDF()}
        >
          Export
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 1 }}
      >
        <div className="mt-4 rounded-md">
          <div
            style={{
              fontFamily: "Times New Roman, Times, serif",
              fontSize: "14px",
            }}
            className="bg-[#fff] border border-gray-200 px-4 py-5 rounded-md"
          >
            <div ref={targetRef}>
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "21px",
                  fontStyle: "italic",
                  fontWeight: "400",
                }}
              >
                Residential Lease Agreement
              </h1>
              <p>{formValues["landlord-name"]?.value}</p>
              <p>{formValues["tenant-name"]?.value}</p>
              <br />
              <br />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

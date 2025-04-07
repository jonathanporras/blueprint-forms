"use client";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { documentFieldsAtom } from "@/app/atoms/documentFieldsAtom";
import { usePDF } from "react-to-pdf";
import { format } from "date-fns";

export default function DocumentPreview() {
  const [formValues] = useAtom<Record<string, any>>(documentFieldsAtom);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  return (
    <div className="w-1/2">
      <div className="flex justify-end">
        <button
          id="export-button"
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
              <p>
                This Lease Agreement (hereinafter referred to as the "Agreement" or the
                "Lease") is entered into on{" "}
                {formValues["lease_date"]?.value &&
                  renderDocumentField(format(formValues["lease_date"]?.value, "MMMM d, yyyy"))}
                , by and between {renderDocumentField(formValues["landlord_name"]?.value)}{" "}
                (hereinafter referred to as "Landlord") and{" "}
                {renderDocumentField(formValues["tenant_name"]?.value)} (hereinafter referred
                to as "Tenant"). No other tenants are allowed without the written consent of
                the Landlord, or the execution of a new lease agreement. This Agreement
                establishes the terms and conditions under which the Landlord agrees to lease
                the designated property to the Tenant, and both parties willingly enter into
                this contract with the intention of upholding its terms.
              </p>
              <p>
                DESCRIPTION OF PROPERTY: The Landlord agrees to lease to the Tenant the
                residential premises located at{" "}
                {renderDocumentField(formValues["property_address"]?.value)},{" "}
                {formValues["property_unit"]?.value &&
                  `${renderDocumentField(formValues["property_unit"]?.value)}, `}
                {renderDocumentField(formValues["property_city"]?.value)},
                {renderDocumentField(formValues["property_state"]?.value)},
                {renderDocumentField(formValues["property_zip"]?.value)} in{" "}
                {renderDocumentField(formValues["property_county"]?.value)} County (hereinafter
                referred to as the "Property"). Included within this lease are any furnishings
                and appliances provided by the Landlord, which are as follows:
                [included_furnishings]. The Tenant acknowledges receipt of these items and
                agrees to maintain them in good condition throughout the duration of the lease.
              </p>
              <br />
              <br />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const renderDocumentField = (value: string) => {
  if (value) {
    return value;
  } else {
    return <span className="bg-gray-200 h-4 w-20 inline-block"></span>;
  }
};

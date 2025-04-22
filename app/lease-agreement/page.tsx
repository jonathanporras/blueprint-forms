"use client";
import { ArrowUpRight, Check } from "lucide-react";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LeaseAgreementLanding() {
  const [loading, setLoading] = useState(false);
  const rounter = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.9 }}
      className="space-y mb-16"
    >
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <main className="flex-grow">
          <section className="py-20 bg-[#EDF2FA] text-center flex flex-col md:flex-row px-14">
            <div className="w-full md:w-1/2 flex justify-end align-center items-center">
              <div className="max-w-2xl text-left pr-0 md:pr-8 pb-8">
                <h2 className="text-4xl font-bold mb-4">Create a Free Lease Agreement</h2>
                <p className="text-lg mb-8 max-w-xl mx-auto">
                  Create a Professional Lease Agreement in Minutes. <br />
                  No legal jargon, no hassle—just fast and free.
                </p>
                <button
                  onClick={() => {
                    setLoading(true);
                    rounter.push("/document/editor/lease-agreement");
                  }}
                  className="bg-[#2FAF68] hover:bg-[#37c476] w-full md:w-auto text-white px-8 py-3 rounded-lg transition flex justify-center items-center"
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-6 w-6 text-white mx-16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M12 2a10 10 0 00-9.95 9h2A8 8 0 0112 4V2z"
                      />
                    </svg>
                  ) : (
                    <>
                      Get Started for Free
                      <ArrowUpRight className="ml-2" size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <img
                className="max-w-xl w-full block mx-auto"
                src="/images/lease-agreement-screen.png"
              />
            </div>
          </section>

          <section className="py-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-14">
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center">
                <Check className="text-[#2FAF68] mr-2" />
                Create Documents
              </h3>
              <p className="text-gray-600">
                Create customizable documents for legal, tax, business, and personal use.
                Download your finished file in PDF format.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center">
                <Check className="text-[#2FAF68] mr-2" />
                Quick & Easy
              </h3>
              <p className="text-gray-600">
                Answer a few simple questions and download your lease instantly.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center">
                <Check className="text-[#2FAF68] mr-2" />
                Lawyer-Approved
              </h3>
              <p className="text-gray-600 ">
                Our templates are built with guidance from real attorneys and stay compliant
                with U.S. laws.
              </p>
            </div>
          </section>

          <section className="py-20 border-t border-gray-200 px-14">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-6">Why Choose QuickForm Pro?</h3>
              <p className="text-gray-700 mb-8">
                QuickForm Pro helps landlords and tenants create trusted, legally accurate
                lease agreements in just a few clicks. No expensive lawyers or outdated
                templates—just fast, clear, and reliable documents.
              </p>
              <button
                onClick={() => {
                  setLoading(true);
                  rounter.push("/document/editor/lease-agreement");
                }}
                className="bg-[#2FAF68] hover:bg-[#37c476] w-full md:w-auto text-white px-8 py-3 rounded-lg transition mx-auto flex items-center justify-center items-center"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-6 w-6 text-white mx-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M12 2a10 10 0 00-9.95 9h2A8 8 0 0112 4V2z"
                    />
                  </svg>
                ) : (
                  <>
                    Start Now
                    <ArrowUpRight className="ml-2" size={18} />
                  </>
                )}
              </button>
            </div>
          </section>
        </main>
      </div>
    </motion.div>
  );
}

"use client";
import {
  ArrowUpRight,
  FileCheck,
  FileText,
  Lock,
  Pencil,
  Scale,
  ThumbsUp,
  Timer,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ANALYTICS_EVENTS, MixpanelAnalytics } from "@/lib/mixpanel";

export default function LeaseAgreementLanding() {
  const [loading, setLoading] = useState(false);
  const rounter = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.9 }}
      className="space-y"
    >
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <main className="flex-grow">
          <section className="py-16 md:py-20 bg-[#EDF2FA] text-center flex flex-col md:flex-row px-6 md:px-14">
            <div className="w-full md:w-1/2 flex justify-end align-center items-center">
              <div className="max-w-3xl text-left pr-0 md:pr-8 pb-8">
                <h2 className="text-4xl font-bold mb-2 text-[#1E3A5F]">
                  Create a Lease Agreement in Minutes
                </h2>
                <div className="text-lg mb-10 max-w-3xl">
                  <p className="text-gray-700 text-xl">
                    Quick, clear, and compliant — draft your lease agreement now!
                  </p>
                  {/* Easy and affordable — no lawyers, no hassle. */}
                  {/* <p className="mt-3">✔️ Get started today for free. </p> */}
                  <p className="mt-8 flex items-center">
                    <ThumbsUp className="mr-2 text-[#1E3A5F]" size={20} /> FREE for a
                    limited-time.{" "}
                  </p>
                  {/* <p className=" flex items-center">
                    <Pencil className="mr-2 text-[#1E3A5F]" size={20} /> Unlimited edits.{" "}
                  </p> */}
                  <p className="mt-1 flex items-center">
                    <Lock className="mr-2 text-[#1E3A5F]" size={20} /> Secure and private.{" "}
                  </p>
                  <p className="mt-1 flex items-center">
                    <FileCheck className="mr-2 text-[#1E3A5F]" size={20} /> Download a
                    high-quality PDF.{" "}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setLoading(true);
                    MixpanelAnalytics.track(ANALYTICS_EVENTS.BUTTON_CLICK, {
                      action: "create document",
                      document: "lease-agreement",
                    });
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
                      Create My Lease Agreement
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

          <section className="py-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6 md:px-14">
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center">
                <Timer className="text-[#6B7280] mr-2" />
                Quick & Easy
              </h3>
              <p className="text-gray-600">
                Answer a few questions and download your lease instantly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center">
                <FileText className="text-[#6B7280] mr-2" />
                Simple Workflow
              </h3>
              <p className="text-gray-600">
                Designed for speed and precision, our guided process ensures every critical
                detail is covered.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center">
                <Scale className="text-[#6B7280] mr-2" />
                Lawyer-Approved
              </h3>
              <p className="text-gray-600 ">
                Our templates are built with guidance from real attorneys and stay compliant
                with U.S. laws.
              </p>
            </div>
          </section>

          <section
            className="py-16 md:py-40 border-t border-gray-200 px-6 md:px-14"
            style={{ background: "linear-gradient(to right, #fff, #EDF2FA)" }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-6">Why Choose QuickForm Pro?</h3>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                QuickForm Pro has helped <span className="font-bold">1,000+</span> landlords
                and property managers create custom lease agreements quickly. No expensive
                lawyers or outdated templates—just fast, clear, and reliable documents.
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
                    Create My Lease Agreement
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

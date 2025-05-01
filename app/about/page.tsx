import React from "react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">About QuickForm Pro</h1>
      <div>
        QuickForm Pro is a smart, easy-to-use form builder built specifically for property
        owners, managers, and landlords. No more expensive lawyers or juggling outdated
        PDFs—our platform makes it simple to build and manage forms online. With customizable
        templates and automation tools, QuickFormPro saves you time, reduces errors, and keeps
        your operation running smoothly. Whether you manage a single unit or a large portfolio,
        QuickFormPro is here to help you stay efficient, professional, and in control.
      </div>
      <p className="mt-3">
        Have questions, comments, or just want to say hello? <br />
        We're here for you:{" "}
        <a href="mailto:support@quickformpro.com" className="text-[#4285F4]">
          support@quickformpro.com
        </a>
      </p>
    </div>
  );
}

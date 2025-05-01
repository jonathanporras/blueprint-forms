import React from "react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">About QuickForm Pro</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">
          Empowering Small Businesses with Effortless Legal Document Creation
        </h2>
        <p className="text-gray-700">
          At <strong>QuickForm Pro</strong>, we understand the challenges small business owners
          face when dealing with legal paperwork. Our mission is to simplify the process of
          creating, customizing, and managing legal documents, enabling you to focus on what
          matters most—growing your business.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Choose QuickForm Pro?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Time-Saving Efficiency:</strong> Our intuitive platform streamlines the
            document creation process, reducing drafting time and eliminating the complexities
            of legal jargon.
          </li>
          <li>
            <strong>Professional-Grade Documents:</strong> Access a comprehensive library of
            customizable templates crafted to meet the needs of small businesses, ensuring
            reliability and professionalism.
          </li>
          <li>
            <strong>User-Friendly Interface:</strong> Designed with simplicity in mind,
            QuickForm Pro requires no legal expertise, making it accessible for all users.
          </li>
          <li>
            <strong>Secure and Confidential:</strong> We prioritize your privacy. All your
            information is securely stored, giving you peace of mind.
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Our Commitment</h2>
        <p className="text-gray-700">
          QuickForm Pro is dedicated to empowering entrepreneurs by providing tools that make
          legal documentation straightforward and stress-free. We're here to support your
          business journey every step of the way.
        </p>
      </section>
    </div>
  );
}

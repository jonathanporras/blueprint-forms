export default async function Contact() {
  return (
    <div className="max-w-xl mx-auto px-4 my-20 flex flex-col gap-8 items-start min-h-screen">
      <h1 className="font-bold text-xl text-center mx-auto">Get in Touch</h1>
      <p>Have questions, need help, or just want to say hello? We're here for you.</p>
      <p>
        Whether you're drafting your first document or managing a growing list of legal forms,
        our team is ready to support you. Reach out and we'll get back to you as soon as
        possible.
      </p>
      <p>
        ❓ General Inquiries: Have a question about how the app works or need more information?
        Email us at{" "}
        <a href="mailto:support@quickformpro.com" className="text-[#4285F4]">
          support@quickformpro.com
        </a>
      </p>
      <p>
        🛠 Technical Support: Running into a bug or need help navigating the platform? Contact
        our tech team at{" "}
        <a href="mailto:support@quickformpro.com" className="text-[#4285F4]">
          support@quickformpro.com
        </a>
      </p>
      <p>
        📬 Mailing Address:
        <br />
        QuickForm Pro LLC
        <br />
        18 Bartol Street #1285
        <br /> San Francisco, CA 94133
      </p>
    </div>
  );
}

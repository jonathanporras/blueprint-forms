export default async function Privacy() {
  return (
    <div className="max-w-xl mx-auto px-4 my-20 flex flex-col gap-8 items-start min-h-screen">
      <h1 className="font-bold text-xl">Privacy Policy</h1>
      <p>Posted Date: April 19th, 2025</p>
      <p>Effective Date: April 19th, 2025</p>

      <div className="flex flex-col gap-2">
        <p>1. Information We Collect:</p>
        <ul className="flex flex-col gap-2">
          <li>
            a) Account Information: When you sign up, we collect your email and password.
          </li>
          <li>
            b) Document Data: We store the documents you create so you can access and edit
            them.
          </li>
          <li>
            c) Usage Data: We collect anonymous data about how you use the app (e.g., page
            views, clicks) to improve our services.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <p>2. How We Use Your Information:</p>
        <ul className="flex flex-col gap-2">
          <li>a) To communicate with you (e.g., updates, support)</li>
          <li>b) To improve and personalize the app experience</li>
        </ul>
      </div>

      <p>
        3. Data Security: We use industry-standard security measures to protect your data.
        However, no system is 100% secure, so please use strong passwords and keep them safe.
      </p>

      <p>
        4. Sharing Your Data: We don't sell your data. We only share data with third-party
        services we use to operate the app (like hosting or analytics), and only as needed.
      </p>

      <p>
        5. Your Rights: You can access, update, or delete your personal information at any
        time. Just contact us at support@quickformpro.com.
      </p>

      <p>
        6. Cookies: We use cookies to help the app function and analyze usage. You can manage
        cookie settings in your browser.
      </p>

      <p>
        7. Changes to This Policy: We may update this Privacy Policy occasionally. We'll notify
        you if significant changes are made.
      </p>

      <p>8. Contact Us Questions? Reach out to us at support@quickformpro.com.</p>
    </div>
  );
}

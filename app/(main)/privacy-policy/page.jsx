export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Awesome Mate Removals, including data collection, usage, and customer rights for website enquiries and quote requests.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "How Awesome Mate Removals collects, uses, stores, and protects personal information.",
    url: "/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="Container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm text-gray-500 mb-3">Last updated: 24 April 2026</p>
          <h1 className="font-Inter text-3xl sm:text-4xl font-bold text-HeadingColor-0 mb-8">
            Privacy Policy
          </h1>

          <div className="space-y-8 text-gray-700 leading-8 font-Poppins">
            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">Who we are</h2>
              <p>
                Awesome Mate Removals is a Perth-based moving business providing residential,
                commercial, furniture, and interstate removal services. This policy explains how
                we collect and handle personal information through this website, including quote
                requests and contact enquiries.
              </p>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">Information we collect</h2>
              <p>When you submit our contact form or communicate with us, we may collect:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Full name and email address.</li>
                <li>Preferred moving date and time.</li>
                <li>Service and property details relevant to your move.</li>
                <li>Moving-from and moving-to location details.</li>
                <li>Any additional information you choose to provide.</li>
                <li>Technical data such as IP address and basic request metadata for security and anti-spam controls.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">How we use information</h2>
              <p>We use collected information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Respond to enquiries and provide quotes.</li>
                <li>Schedule and deliver requested moving services.</li>
                <li>Improve customer support and service planning.</li>
                <li>Maintain website security, including spam and abuse prevention.</li>
                <li>Comply with legal and regulatory requirements in Australia.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">Disclosure to third parties</h2>
              <p>
                We do not sell personal information. We may share necessary information with
                service providers that support our operations, such as website hosting, form
                processing, mapping services, and email delivery platforms. We may also disclose
                information where required by law.
              </p>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">Data storage and security</h2>
              <p>
                We take reasonable technical and organisational measures to protect your
                information against misuse, unauthorised access, and loss. No internet
                transmission or storage method is completely secure, but we work to maintain
                appropriate safeguards for the size and nature of our business.
              </p>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">Your choices and rights</h2>
              <p>
                You may request access to or correction of your personal information by contacting
                us. If you believe your privacy has been handled improperly, please contact us so
                we can review and resolve the issue promptly.
              </p>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">External links and map content</h2>
              <p>
                Our website may include links or embedded services from third parties, including
                mapping services. Their privacy practices are governed by their own policies.
              </p>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">Contact us</h2>
              <p>
                Email: info@awesomemateremovals.com.au
                <br />
                Phone: 0412007264
                <br />
                Address: Unit 5/207 Waterloo Street, Tuart Hill WA 6060
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

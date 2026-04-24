export const metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for using the Awesome Mate Removals website and engaging moving services in Western Australia.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: "Terms and Conditions",
    description:
      "Important terms for website use, quote requests, bookings, and moving services.",
    url: "/terms-and-conditions",
    type: "website",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="Container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm text-gray-500 mb-3">Last updated: 24 April 2026</p>
          <h1 className="font-Inter text-3xl sm:text-4xl font-bold text-HeadingColor-0 mb-8">
            Terms and Conditions
          </h1>

          <div className="space-y-8 text-gray-700 leading-8 font-Poppins">
            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">1. Website use</h2>
              <p>
                By using this website, you agree to these terms. Website content is provided for
                general information about our removalist services in Western Australia and may be
                updated without notice.
              </p>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">2. Quotes and bookings</h2>
              <p>
                Quotes submitted through this website are based on the details provided and are
                estimates unless confirmed in writing. Final charges may vary due to access,
                inventory changes, additional labour time, distance, waiting time, or unforeseen
                conditions at pickup or delivery locations.
              </p>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">3. Customer responsibilities</h2>
              <p>Customers are responsible for:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Providing accurate moving details, addresses, and access information.</li>
                <li>Declaring fragile, valuable, heavy, or specialty items before move day.</li>
                <li>Ensuring legal parking, building approvals, and suitable access where required.</li>
                <li>Ensuring packed items are sealed and safe for transport unless packing service is included.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">4. Restricted and high-risk items</h2>
              <p>
                For safety and compliance reasons, we may decline to transport dangerous goods,
                illegal items, perishable goods, or items requiring specialised permits or handling
                beyond the agreed service scope.
              </p>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">5. Delays and service timing</h2>
              <p>
                We aim to arrive and complete jobs within scheduled windows, however timing can be
                affected by traffic, weather, road conditions, building access, or other
                operational factors outside reasonable control.
              </p>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">6. Cancellation and rescheduling</h2>
              <p>
                Cancellation or rescheduling requests should be made as early as possible. Fees may
                apply where labour, vehicles, or third-party resources have already been allocated
                to your booking.
              </p>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">7. Liability and insurance</h2>
              <p>
                We perform services with due care and skill. Liability for loss or damage is
                limited to the extent permitted by Australian Consumer Law and any written service
                agreement between the parties. Customers should consider transit or contents
                insurance for high-value goods.
              </p>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">8. Payments</h2>
              <p>
                Payment terms are provided at booking confirmation. Outstanding invoices may be
                subject to recovery processes where permitted by law.
              </p>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">9. Privacy</h2>
              <p>
                Personal information submitted through this website is handled under our
                Privacy Policy. By submitting forms, you consent to information use for responding
                to enquiries and delivering requested services.
              </p>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">10. Governing law</h2>
              <p>
                These terms are governed by the laws of Western Australia and applicable
                Commonwealth laws of Australia.
              </p>
            </div>

            <div>
              <h2 className="font-Inter text-2xl font-semibold text-HeadingColor-0 mb-3">11. Contact details</h2>
              <p>
                Awesome Mate Removals
                <br />
                ABN: 42293475158
                <br />
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

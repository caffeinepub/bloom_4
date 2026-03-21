import { Link } from "@tanstack/react-router";
import Footer from "../components/Footer";

function Header() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-bloom-divider/50 backdrop-blur-md"
      style={{ background: "rgba(253,240,232,0.9)" }}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="text-base">🌸</span>
          <span
            className="font-serif text-2xl font-light text-bloom-heading"
            style={{ letterSpacing: "0.08em" }}
          >
            Bloom
          </span>
        </Link>
      </div>
    </header>
  );
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center mb-12">
          <h1
            className="font-serif text-5xl text-bloom-heading"
            style={{ fontWeight: 300 }}
          >
            Terms &amp; Conditions
          </h1>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-20 bg-bloom-gold/40" />
            <span className="text-bloom-gold text-sm">◆</span>
            <div className="h-px w-20 bg-bloom-gold/40" />
          </div>
          <p className="font-serif text-bloom-subtle italic mt-4 text-sm">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div
          className="space-y-10 font-serif text-bloom-heading"
          style={{ fontWeight: 300, lineHeight: "1.8" }}
        >
          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Bloom, you accept and agree to be bound by
              these Terms and Conditions. If you do not agree to these terms,
              please do not use our service. Bloom reserves the right to modify
              these terms at any time, and your continued use of the service
              constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              2. Service Description
            </h2>
            <p>
              Bloom is a web-based bouquet creation and gifting service that
              allows users to design virtual bouquets, attach personalised
              message cards, and share them with loved ones. The service
              provides photorealistic bouquet imagery for gifting purposes and
              operates on an anonymous, no-login basis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              3. User Conduct
            </h2>
            <p>
              You agree to use Bloom only for lawful purposes and in a manner
              that does not infringe the rights of others. You must not use the
              service to send offensive, harmful, or inappropriate messages.
              Bloom reserves the right to remove any content that violates these
              guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              4. Payment Terms
            </h2>
            <p>
              Premium features are available for a one-time payment of ₹29 via
              UPI. Payment is processed directly through your UPI application
              using the provided UPI ID. This is a trust-based system — features
              are unlocked upon your confirmation of payment completion. There
              is no automatic verification at this time. Please refer to our
              Refund Policy for details on eligibility.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              5. Intellectual Property
            </h2>
            <p>
              All bouquet imagery, design elements, and content on Bloom are the
              property of Bloom and its licensors. You may download and share
              bouquet images for personal gifting purposes only. Commercial use,
              reproduction, or redistribution without permission is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              6. Limitation of Liability
            </h2>
            <p>
              Bloom is provided "as is" without warranties of any kind. We are
              not liable for any damages arising from the use or inability to
              use the service. Our total liability shall not exceed the amount
              paid by you for premium features (₹29).
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              7. Changes to Terms
            </h2>
            <p>
              We may update these Terms from time to time. Significant changes
              will be noted on this page. Your continued use of Bloom after
              changes are posted constitutes your acceptance of the updated
              terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              8. Contact
            </h2>
            <p>
              For any questions about these Terms, please contact us via UPI
              transaction reference or reach out through our shared bouquet
              links. We are committed to resolving any concerns promptly and
              fairly.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

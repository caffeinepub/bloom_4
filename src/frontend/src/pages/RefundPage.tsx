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

export default function RefundPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center mb-12">
          <h1
            className="font-serif text-5xl text-bloom-heading"
            style={{ fontWeight: 300 }}
          >
            Refund Policy
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
              1. Payment Nature
            </h2>
            <p>
              Bloom's premium features are unlocked via a one-time UPI payment
              of ₹29. This is a trust-based system — you confirm payment
              completion in-app and features are instantly unlocked. Bloom does
              not automatically verify UPI transactions at this time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              2. Refund Eligibility
            </h2>
            <p>You may be eligible for a refund if:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>
                You were charged but premium features did not unlock (within 24
                hours of payment)
              </li>
              <li>
                A technical error prevented you from accessing any premium
                feature
              </li>
              <li>You were charged multiple times for the same unlock</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              3. Non-Refundable Cases
            </h2>
            <p>Refunds will not be issued in the following circumstances:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>You changed your mind after unlocking premium features</li>
              <li>
                You cleared browser data, removing your premium unlock status
              </li>
              <li>More than 24 hours have passed since payment</li>
              <li>
                The payment was made but the "I have completed payment" button
                was not clicked
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              4. How to Request a Refund
            </h2>
            <p>To request a refund, please provide:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Your UPI transaction ID (UTR number)</li>
              <li>Date and time of payment</li>
              <li>Description of the issue experienced</li>
            </ul>
            <p className="mt-3">
              Contact us via the UPI ID used for payment:{" "}
              <span className="font-semibold">8789829461-4@ybl</span>. We aim to
              resolve all refund requests within 3–5 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              5. Our Commitment
            </h2>
            <p>
              We believe in fairness. If you genuinely experienced a problem
              with our payment process, we will make it right. Bloom is built on
              trust, and we stand behind that commitment.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

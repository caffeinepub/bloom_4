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

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center mb-12">
          <h1
            className="font-serif text-5xl text-bloom-heading"
            style={{ fontWeight: 300 }}
          >
            Privacy Policy
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
              1. What Data We Collect
            </h2>
            <p>
              Bloom operates with minimal data collection. We store the content
              you input when creating a bouquet: your flower and greenery
              selections, the message text (including To and From fields), and
              the resulting bouquet image URL. No personal account information,
              email addresses, or payment credentials are stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              2. How We Use Your Data
            </h2>
            <p>
              Bouquet data is stored solely to enable the public sharing feature
              at{" "}
              <code className="font-mono text-sm bg-bloom-blush/10 px-1 rounded">
                /view/:id
              </code>
              . This allows recipients to view bouquets sent to them. We do not
              use your data for advertising, profiling, or any commercial
              purpose beyond providing the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              3. Data Retention
            </h2>
            <p>
              Bouquets are stored indefinitely to ensure shareable links remain
              valid. If you wish to have your bouquet removed, please contact us
              with the bouquet link. Premium unlock status is stored locally on
              your device using localStorage and is never transmitted to our
              servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              4. Cookies &amp; Local Storage
            </h2>
            <p>
              Bloom uses browser localStorage only to remember your premium
              unlock status (a simple true/false flag). No tracking cookies or
              third-party analytics are used. Clearing your browser data will
              reset your premium status.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              5. Third Parties
            </h2>
            <p>
              Bouquet images are sourced from licensed stock photography
              providers. Payment processing is handled directly through your UPI
              application — Bloom does not process or store payment information.
              Share links may be opened by third-party social platforms
              (WhatsApp, Facebook, etc.) subject to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              6. Your Rights
            </h2>
            <p>
              You have the right to request deletion of any bouquet you created.
              Since Bloom is anonymous, please provide the bouquet URL when
              contacting us. You may also clear your localStorage at any time to
              remove your premium status from your device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
              7. Contact
            </h2>
            <p>
              For privacy-related queries, please reach out through any bouquet
              you have created, referencing the bouquet ID. We take privacy
              seriously and will respond to all reasonable requests.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

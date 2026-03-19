import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { matchBouquet } from "../bouquetLibrary";
import { renderBouquetWithCard } from "../canvasUtils";
import { useGetBouquet } from "../hooks/useQueries";

function DiamondDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-5">
      <div className="h-px w-16 bg-bloom-gold/50" />
      <span className="text-bloom-gold text-sm">◆</span>
      <div className="h-px w-16 bg-bloom-gold/50" />
    </div>
  );
}

export default function ViewPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const { data: bouquet, isLoading, isError } = useGetBouquet(id);
  const [mergedImageUrl, setMergedImageUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);

  useEffect(() => {
    if (!bouquet) return;
    setIsRendering(true);
    const matched = matchBouquet(bouquet.flowers, bouquet.greenery);
    renderBouquetWithCard(matched.imageUrl, bouquet.message)
      .then(setMergedImageUrl)
      .catch(console.error)
      .finally(() => setIsRendering(false));
  }, [bouquet]);

  const isPageLoading = isLoading || isRendering;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b border-bloom-divider/50 backdrop-blur-md"
        style={{ background: "rgba(253,240,232,0.82)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bloom-blush/30 border border-bloom-blush/40">
              <span className="text-base">🌸</span>
            </div>
            <span
              className="font-serif text-2xl font-light text-bloom-heading"
              style={{ letterSpacing: "0.08em" }}
            >
              Bloom
            </span>
          </Link>
          <Link
            to="/"
            data-ocid="view.link"
            className="flex items-center gap-2 font-serif text-sm text-bloom-subtle transition-colors hover:text-bloom-heading"
            style={{ fontWeight: 300 }}
          >
            <ArrowLeft className="h-4 w-4" /> Create Your Own
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-16">
        {isPageLoading && (
          <div
            className="flex flex-col items-center gap-4 py-24"
            data-ocid="view.loading_state"
          >
            <Loader2 className="h-8 w-8 animate-spin text-bloom-blush" />
            <p
              className="font-serif text-base text-bloom-subtle"
              style={{ fontStyle: "italic" }}
            >
              Preparing your bouquet...
            </p>
          </div>
        )}

        {isError && !isPageLoading && (
          <div
            className="flex flex-col items-center gap-6 py-24 text-center"
            data-ocid="view.error_state"
          >
            <span className="text-5xl">💐</span>
            <h2 className="font-serif text-3xl font-semibold text-bloom-heading">
              Bouquet Not Found
            </h2>
            <DiamondDivider />
            <p
              className="font-serif text-base text-bloom-subtle"
              style={{ fontStyle: "italic", fontWeight: 300 }}
            >
              This bouquet link may have expired or doesn't exist.
            </p>
            <Link
              to="/"
              className="rounded-full bg-bloom-blush px-8 py-3 font-sans text-sm font-semibold text-white shadow-card transition-all hover:bg-bloom-blush/85"
            >
              Create a New Bouquet
            </Link>
          </div>
        )}

        {!isPageLoading && !isError && mergedImageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-8"
            data-ocid="view.panel"
          >
            <div className="text-center">
              <p
                className="font-serif text-bloom-subtle text-base"
                style={{ fontStyle: "italic", fontWeight: 300 }}
              >
                A bouquet made for you
              </p>
              <h1 className="font-serif text-4xl font-semibold text-bloom-heading mt-1">
                Your Special Bouquet
              </h1>
              <DiamondDivider />
            </div>

            {/* Bouquet preview — portrait, no stretch */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "420px",
                margin: "0 auto",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ paddingTop: "133.33%" }} />
              <img
                src={mergedImageUrl}
                alt="Custom bouquet with personal message card"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={mergedImageUrl}
                download="bloom-bouquet.jpg"
                className="inline-flex items-center gap-2 rounded-full bg-bloom-blush px-8 py-3 font-sans text-sm font-semibold text-white shadow-card transition-all hover:bg-bloom-blush/85 hover:shadow-hero"
                data-ocid="view.primary_button"
              >
                <Download className="h-4 w-4" /> Download Bouquet
              </a>
              <Link
                to="/"
                data-ocid="view.secondary_button"
                className="inline-flex items-center gap-2 rounded-full border border-bloom-gold/50 px-8 py-3 font-sans text-sm font-semibold text-bloom-gold transition-all hover:bg-bloom-gold/10"
              >
                Create Your Own ✦
              </Link>
            </div>
          </motion.div>
        )}

        {!isPageLoading && !isError && !mergedImageUrl && bouquet === null && (
          <div
            className="flex flex-col items-center gap-6 py-24 text-center"
            data-ocid="view.error_state"
          >
            <span className="text-5xl">💐</span>
            <h2 className="font-serif text-3xl font-semibold text-bloom-heading">
              Bouquet Not Found
            </h2>
            <DiamondDivider />
            <p
              className="font-serif text-base text-bloom-subtle"
              style={{ fontStyle: "italic", fontWeight: 300 }}
            >
              This bouquet link may have expired or doesn't exist.
            </p>
            <Link
              to="/"
              className="rounded-full bg-bloom-blush px-8 py-3 font-sans text-sm font-semibold text-white shadow-card transition-all hover:bg-bloom-blush/85"
            >
              Create a New Bouquet
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="mt-24 border-t border-bloom-divider/50 py-10 text-center"
        style={{ background: "rgba(247,216,191,0.3)" }}
      >
        <p className="font-sans text-xs text-bloom-subtle">
          © {new Date().getFullYear()}. Built with{" "}
          <span className="text-bloom-blush">♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bloom-gold hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

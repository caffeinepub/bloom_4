import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { matchBouquet } from "../bouquetLibrary";
import { renderBouquetWithCard } from "../canvasUtils";
import Footer from "../components/Footer";
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

  // Read ?to= query param
  const recipientName =
    new URLSearchParams(window.location.search).get("to") ?? "";

  useEffect(() => {
    if (!bouquet) return;
    setIsRendering(true);
    const matched = matchBouquet(bouquet.flowers, bouquet.greenery);
    renderBouquetWithCard(matched.imageUrl, bouquet.message)
      .then(setMergedImageUrl)
      .catch(console.error)
      .finally(() => setIsRendering(false));
  }, [bouquet]);

  // Open Graph meta tags
  useEffect(() => {
    if (!bouquet) return;
    const title = recipientName
      ? `A Bouquet for ${recipientName} — Bloom`
      : "A Bouquet for You — Bloom";
    document.title = title;

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(
        `meta[property="${property}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("og:title", title);
    setMeta(
      "og:description",
      bouquet.message || "I created this bouquet for you 💐",
    );
    setMeta("og:type", "website");
    if (mergedImageUrl) setMeta("og:image", mergedImageUrl);
  }, [bouquet, mergedImageUrl, recipientName]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Could not copy link.");
    }
  };

  const isPageLoading = isLoading || isRendering;
  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen" style={{ position: "relative", zIndex: 2 }}>
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
          <nav className="flex items-center gap-6">
            <Link
              to="/gallery"
              data-ocid="view.link"
              className="font-serif text-base text-bloom-subtle transition-colors hover:text-bloom-heading"
              style={{ fontWeight: 300 }}
            >
              Gallery
            </Link>
            <Link
              to="/"
              data-ocid="view.link"
              className="flex items-center gap-2 font-serif text-sm text-bloom-subtle transition-colors hover:text-bloom-heading"
              style={{ fontWeight: 300 }}
            >
              <ArrowLeft className="h-4 w-4" /> Create Your Own
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-16">
        {/* Recipient banner */}
        {recipientName && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 rounded-2xl px-6 py-4 text-center"
            style={{
              background: "rgba(219,130,130,0.1)",
              border: "1px solid rgba(219,130,130,0.25)",
            }}
          >
            <p
              className="font-serif text-xl text-bloom-heading"
              style={{ fontStyle: "italic", fontWeight: 300 }}
            >
              This bouquet is for{" "}
              <span style={{ fontWeight: 600 }}>{recipientName}</span> 💐
            </p>
          </motion.div>
        )}

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
              This bouquet link may have expired or doesn’t exist.
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

            {/* Bouquet preview */}
            <div
              style={{
                width: "100%",
                maxWidth: "420px",
                margin: "0 auto",
                aspectRatio: "3 / 4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                borderRadius: "16px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={mergedImageUrl}
                alt="Custom bouquet with personal message card"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                  borderRadius: "16px",
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
                Create Your Own ❖
              </Link>
            </div>

            {/* Social share row */}
            <div
              className="flex flex-wrap justify-center gap-3 p-4 rounded-2xl bg-white/60 border border-bloom-divider/40 backdrop-blur-sm w-full"
              data-ocid="view.panel"
            >
              <p className="w-full text-center font-serif text-sm text-bloom-subtle italic mb-2">
                Share this bouquet
              </p>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`I created this bouquet for you 💐 ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                data-ocid="view.primary_button"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I created this bouquet for you 💐")}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                data-ocid="view.toggle"
              >
                X / Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#1877F2] px-4 py-2 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                data-ocid="view.link"
              >
                Facebook
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-2 rounded-full bg-bloom-gold/20 border border-bloom-gold/40 px-4 py-2 text-bloom-gold text-xs font-semibold hover:bg-bloom-gold/30 transition-colors"
                data-ocid="view.save_button"
              >
                Copy Link
              </button>
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
              This bouquet link may have expired or doesn’t exist.
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

      <Footer />
    </div>
  );
}

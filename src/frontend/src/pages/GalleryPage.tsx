import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { matchBouquet } from "../bouquetLibrary";
import Footer from "../components/Footer";
import { useGetRecentBouquets } from "../hooks/useQueries";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function DiamondDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div className="h-px w-24 bg-bloom-gold/50" />
      <span className="text-bloom-gold text-sm">◆</span>
      <div className="h-px w-24 bg-bloom-gold/50" />
    </div>
  );
}

function Header() {
  return (
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
            to="/"
            className="font-serif text-base text-bloom-subtle transition-colors hover:text-bloom-heading"
            style={{ fontWeight: 300 }}
            data-ocid="nav.link"
          >
            Create Bouquet
          </Link>
          <span
            className="font-serif text-base text-bloom-heading"
            style={{ fontWeight: 400 }}
          >
            Gallery
          </span>
        </nav>
      </div>
    </header>
  );
}

export default function GalleryPage() {
  const { data: bouquets, isLoading } = useGetRecentBouquets(50);

  return (
    <div className="min-h-screen" style={{ position: "relative", zIndex: 2 }}>
      <Header />

      {/* Hero */}
      <section className="pt-16 pb-10 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1
              className="font-serif text-6xl md:text-7xl text-bloom-heading"
              style={{ fontWeight: 600 }}
            >
              The Gallery
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <DiamondDivider />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-serif text-lg text-bloom-subtle"
            style={{ fontStyle: "italic", fontWeight: 300 }}
          >
            Bouquets made with love, shared with the world.
          </motion.p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 pb-24">
        {isLoading && (
          <div
            className="flex flex-col items-center gap-4 py-24"
            data-ocid="gallery.loading_state"
          >
            <Loader2 className="h-8 w-8 animate-spin text-bloom-blush" />
            <p
              className="font-serif text-base text-bloom-subtle"
              style={{ fontStyle: "italic" }}
            >
              Loading bouquets...
            </p>
          </div>
        )}

        {!isLoading && (!bouquets || bouquets.length === 0) && (
          <div
            className="flex flex-col items-center gap-6 py-24 text-center"
            data-ocid="gallery.empty_state"
          >
            <span className="text-6xl">💐</span>
            <p
              className="font-serif text-xl text-bloom-subtle"
              style={{ fontStyle: "italic", fontWeight: 300 }}
            >
              Be the first to create a bouquet.
            </p>
            <Link
              to="/"
              className="rounded-full bg-bloom-blush px-8 py-3 font-sans text-sm font-semibold text-white shadow-card transition-all hover:bg-bloom-blush/85 hover:shadow-hero"
              data-ocid="gallery.primary_button"
            >
              Create One
            </Link>
          </div>
        )}

        {!isLoading && bouquets && bouquets.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
            data-ocid="gallery.list"
          >
            {bouquets.map((record, idx) => {
              const matched = matchBouquet(record.flowers, record.greenery);
              const label = [...record.flowers, ...record.greenery]
                .map(capitalize)
                .join(", ");
              return (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(idx * 0.04, 0.6),
                  }}
                  className="group flex flex-col gap-3"
                  data-ocid={`gallery.item.${idx + 1}`}
                >
                  <div
                    className="overflow-hidden rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)]"
                    style={{ aspectRatio: "3 / 4" }}
                  >
                    <img
                      src={matched.imageUrl}
                      alt={label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <p
                    className="font-serif text-sm text-bloom-heading text-center leading-snug px-1"
                    style={{ fontWeight: 400 }}
                  >
                    {label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}

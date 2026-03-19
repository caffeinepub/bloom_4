import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Download, Link2, Loader2, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { matchBouquet } from "../bouquetLibrary";
import { renderBouquetWithCard } from "../canvasUtils";
import { useCreateBouquet } from "../hooks/useQueries";

// ─── Flower image map ──────────────────────────────────────────────────────────

const FLOWER_IMAGES: Record<string, string> = {
  "Rose (Red)": "/assets/generated/flower-rose-red.dim_400x400.jpg",
  "Rose (Pink)": "/assets/generated/flower-rose-pink.dim_400x400.jpg",
  "Rose (White)": "/assets/generated/flower-rose-white.dim_400x400.jpg",
  Peony: "/assets/generated/flower-peony.dim_400x400.jpg",
  Ranunculus: "/assets/generated/flower-ranunculus.dim_400x400.jpg",
  Dahlia: "/assets/generated/flower-dahlia.dim_400x400.jpg",
  Tulip: "/assets/generated/flower-tulip.dim_400x400.jpg",
  Lily: "/assets/generated/flower-lily.dim_400x400.jpg",
  Orchid: "/assets/generated/flower-orchid.dim_400x400.jpg",
  Gardenia: "/assets/generated/flower-gardenia.dim_400x400.jpg",
  Carnation: "/assets/generated/flower-carnation.dim_400x400.jpg",
  Sunflower: "/assets/generated/flower-sunflower.dim_400x400.jpg",
  Daisy: "/assets/generated/flower-daisy.dim_400x400.jpg",
  Gerbera: "/assets/generated/flower-gerbera.dim_400x400.jpg",
  Marigold: "/assets/generated/flower-marigold.dim_400x400.jpg",
  Poppy: "/assets/generated/flower-poppy.dim_400x400.jpg",
  Anemone: "/assets/generated/flower-anemone.dim_400x400.jpg",
  Lavender: "/assets/generated/flower-lavender.dim_400x400.jpg",
  Hydrangea: "/assets/generated/flower-hydrangea.dim_400x400.jpg",
  "Baby's Breath": "/assets/generated/flower-babysbreath.dim_400x400.jpg",
  "Cherry Blossom": "/assets/generated/flower-cherryblossom.dim_400x400.jpg",
};

const GREENERY_IMAGES: Record<string, string> = {
  Eucalyptus: "/assets/generated/greenery-eucalyptus.dim_400x400.jpg",
  "Filler Stems": "/assets/generated/greenery-fillerstems.dim_400x400.jpg",
  "Ornamental Grasses": "/assets/generated/greenery-grasses.dim_400x400.jpg",
  "Soft Foliage": "/assets/generated/greenery-softfoliage.dim_400x400.jpg",
};

const FLOWER_GROUPS = [
  {
    label: "Romantic",
    flowers: [
      "Rose (Red)",
      "Rose (Pink)",
      "Rose (White)",
      "Peony",
      "Ranunculus",
      "Dahlia",
    ],
  },
  {
    label: "Elegant",
    flowers: ["Lily", "Orchid", "Gardenia", "Carnation"],
  },
  {
    label: "Bright",
    flowers: ["Sunflower", "Daisy", "Gerbera", "Marigold", "Poppy"],
  },
  {
    label: "Wild & Soft",
    flowers: [
      "Anemone",
      "Lavender",
      "Hydrangea",
      "Baby's Breath",
      "Tulip",
      "Cherry Blossom",
    ],
  },
];

const GREENERY_OPTIONS = [
  { name: "Eucalyptus" },
  { name: "Filler Stems" },
  { name: "Ornamental Grasses" },
  { name: "Soft Foliage" },
];

const MAX_MESSAGE = 200;

// ─── Sub-components ────────────────────────────────────────────────────────────

function FlowerCard({
  name,
  selected,
  onToggle,
  index,
}: {
  name: string;
  selected: boolean;
  onToggle: () => void;
  index: number;
}) {
  const img = FLOWER_IMAGES[name];
  const staggerClass = `card-stagger-${Math.min(index + 1, 6)}`;
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`animate-fade-up ${staggerClass} group relative flex flex-col items-center gap-2 rounded-2xl p-3 transition-all duration-200 cursor-pointer backdrop-blur-sm ${
        selected
          ? "border-2 border-bloom-blush bg-white/80 shadow-[0_4px_20px_rgba(219,130,130,0.25)]"
          : "border border-bloom-divider/60 bg-white/80 hover:border-bloom-blush/60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-[1.05]"
      }`}
      data-ocid="flower.toggle"
    >
      {selected && (
        <span className="absolute top-2 right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-bloom-blush shadow-md">
          <Check className="h-3 w-3 text-white" />
        </span>
      )}
      <div className="w-full aspect-square overflow-hidden rounded-xl bg-[#f5efe6]">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <span
        className="font-serif text-xs text-bloom-heading text-center leading-tight px-1 pb-0.5"
        style={{ fontWeight: 400 }}
      >
        {name}
      </span>
    </button>
  );
}

function GreeneryCard({
  name,
  selected,
  onToggle,
  index,
}: {
  name: string;
  selected: boolean;
  onToggle: () => void;
  index: number;
}) {
  const img = GREENERY_IMAGES[name];
  const staggerClass = `card-stagger-${Math.min(index + 1, 6)}`;
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`animate-fade-up ${staggerClass} group relative flex flex-col items-center gap-2 rounded-2xl p-3 transition-all duration-200 cursor-pointer backdrop-blur-sm ${
        selected
          ? "border-2 border-bloom-gold bg-white/80 shadow-[0_4px_20px_rgba(198,168,110,0.28)]"
          : "border border-bloom-divider/60 bg-white/80 hover:border-bloom-gold/60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-[1.05]"
      }`}
      data-ocid="greenery.toggle"
    >
      {selected && (
        <span className="absolute top-2 right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-bloom-gold shadow-md">
          <Check className="h-3 w-3 text-white" />
        </span>
      )}
      <div className="w-full aspect-square overflow-hidden rounded-xl bg-[#f5efe6]">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <span
        className="font-serif text-xs text-bloom-heading text-center leading-tight px-1 pb-0.5"
        style={{ fontWeight: 400 }}
      >
        {name}
      </span>
    </button>
  );
}

// ─── Diamond Divider ───────────────────────────────────────────────────────────

function DiamondDivider() {
  return (
    <div
      className="animate-diamond-reveal flex items-center justify-center gap-3 my-6"
      style={{ animationDelay: "0.5s" }}
    >
      <div className="h-px w-24 bg-bloom-gold/50" />
      <span className="text-bloom-gold text-sm">◆</span>
      <div className="h-px w-24 bg-bloom-gold/50" />
    </div>
  );
}

// ─── Header ────────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-bloom-divider/50 backdrop-blur-md"
      style={{ background: "rgba(253,240,232,0.82)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bloom-blush/30 border border-bloom-blush/40">
            <span className="text-base">🌸</span>
          </div>
          <span
            className="font-serif text-2xl font-light text-bloom-heading"
            style={{ letterSpacing: "0.08em" }}
          >
            Bloom
          </span>
        </div>
        <nav>
          <a
            href="/"
            className="font-serif text-base text-bloom-subtle transition-colors hover:text-bloom-heading"
            style={{ fontWeight: 300 }}
          >
            Gallery
          </a>
        </nav>
      </div>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="pt-16 pb-12 text-center">
      <div className="mx-auto max-w-3xl px-6">
        {/* Floral icons row — 7 items, smooth organic float */}
        <div className="mb-8 flex items-center justify-center gap-5">
          <span
            className="text-2xl animate-float-gentle"
            style={{ animationDelay: "0s" }}
          >
            🌸
          </span>
          <span
            className="text-bloom-gold/50 text-xs animate-float-delayed"
            style={{ animationDelay: "0.4s" }}
          >
            ✦
          </span>
          <span
            className="text-2xl animate-float"
            style={{ animationDelay: "0.8s" }}
          >
            🌹
          </span>
          <span
            className="text-bloom-gold/50 text-xs animate-float-delayed"
            style={{ animationDelay: "1.2s" }}
          >
            ✦
          </span>
          <span
            className="text-2xl animate-float-slow"
            style={{ animationDelay: "0.3s" }}
          >
            🌺
          </span>
          <span
            className="text-bloom-gold/50 text-xs animate-float-delayed"
            style={{ animationDelay: "1.6s" }}
          >
            ✦
          </span>
          <span
            className="text-2xl animate-float-sway"
            style={{ animationDelay: "0.6s" }}
          >
            🌷
          </span>
          <span
            className="text-bloom-gold/50 text-xs animate-float-delayed"
            style={{ animationDelay: "2.0s" }}
          >
            ✦
          </span>
          <span
            className="text-2xl animate-float-gentle"
            style={{ animationDelay: "1.0s" }}
          >
            🪷
          </span>
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="font-serif leading-tight">
            <span
              className="block text-4xl text-bloom-subtle"
              style={{ fontWeight: 300 }}
            >
              Send someone
            </span>
            <span
              className="block text-7xl md:text-8xl text-bloom-heading"
              style={{ fontWeight: 700, fontStyle: "italic" }}
            >
              a bouquet
            </span>
          </h1>
        </motion.div>

        {/* Diamond divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <DiamondDivider />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-serif text-lg text-bloom-subtle max-w-md mx-auto"
          style={{ fontStyle: "italic", fontWeight: 300 }}
        >
          Choose flowers, write from the heart, and share with someone you love.
        </motion.p>

        {/* CTA scroll button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10"
        >
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("builder")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-full border border-bloom-blush/60 bg-bloom-blush/15 px-10 py-3 font-serif text-base text-bloom-blush transition-all hover:bg-bloom-blush hover:text-white hover:shadow-card"
            style={{ fontWeight: 400, letterSpacing: "0.04em" }}
            data-ocid="hero.primary_button"
          >
            Begin Creating
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section heading ───────────────────────────────────────────────────────────

function SectionHeading({ step, title }: { step: string; title: string }) {
  return (
    <div className="mb-8 text-center">
      <p
        className="font-serif text-bloom-blush/70 text-base"
        style={{ fontStyle: "italic", fontWeight: 300 }}
      >
        Step {step}
      </p>
      <h2
        className="font-serif text-3xl text-bloom-heading mt-1"
        style={{ fontWeight: 600 }}
      >
        {title}
      </h2>
      <div className="flex items-center justify-center gap-2 mt-3">
        <div className="h-px w-12 bg-bloom-gold/40" />
        <span className="text-bloom-gold/60 text-xs">◆</span>
        <div className="h-px w-12 bg-bloom-gold/40" />
      </div>
    </div>
  );
}

// ─── Main builder ──────────────────────────────────────────────────────────────

export default function BuilderPage() {
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);
  const [selectedGreenery, setSelectedGreenery] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [mergedImageUrl, setMergedImageUrl] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const createBouquet = useCreateBouquet();

  const toggleFlower = useCallback((name: string) => {
    setSelectedFlowers((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name],
    );
  }, []);

  const toggleGreenery = useCallback((name: string) => {
    setSelectedGreenery((prev) =>
      prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name],
    );
  }, []);

  const canCreate =
    selectedFlowers.length > 0 &&
    selectedGreenery.length > 0 &&
    message.trim().length > 0;

  const handleCreate = async () => {
    if (!canCreate) return;
    setIsGenerating(true);
    try {
      const matched = matchBouquet(selectedFlowers, selectedGreenery);

      // Run canvas render and backend save independently
      const [canvasResult, backendResult] = await Promise.allSettled([
        renderBouquetWithCard(matched.imageUrl, message.trim()),
        createBouquet.mutateAsync({
          flowers: selectedFlowers,
          greenery: selectedGreenery,
          message: message.trim(),
          imageKey: matched.key,
        }),
      ]);

      const canvasFailed = canvasResult.status === "rejected";
      const backendFailed = backendResult.status === "rejected";

      // Only show error toast if both failed completely
      if (canvasFailed && backendFailed) {
        console.error("Canvas error:", canvasResult.reason);
        console.error("Backend error:", backendResult.reason);
        toast.error("Something went wrong. Please try again.");
        return;
      }

      // Use canvas result, fall back to matched image URL
      const finalImageUrl = canvasFailed
        ? matched.imageUrl
        : canvasResult.value;

      // Use backend id if available, otherwise null (no share link)
      const finalShareId = backendFailed
        ? null
        : (backendResult.value as string);

      if (canvasFailed) {
        console.warn("Canvas render failed, showing original bouquet image.");
      }

      setMergedImageUrl(finalImageUrl);
      setShareId(finalShareId);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setSelectedFlowers([]);
    setSelectedGreenery([]);
    setMessage("");
    setMergedImageUrl(null);
    setShareId(null);
  };

  const handleCopyLink = async () => {
    if (!shareId) return;
    const url = `${window.location.origin}/view/${shareId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Could not copy link.");
    }
  };

  const handleShare = async () => {
    if (!mergedImageUrl) return;
    if (!shareId) {
      toast.error("Share link unavailable. You can still download the image.");
      return;
    }
    const url = `${window.location.origin}/view/${shareId}`;
    if (navigator.share) {
      try {
        const blob = await (await fetch(mergedImageUrl)).blob();
        const file = new File([blob], "my-bloom-bouquet.jpg", {
          type: "image/jpeg",
        });
        await navigator.share({
          title: "My Bloom Bouquet 💐",
          text: "I created this bouquet for you 💐",
          url,
          files: [file],
        });
      } catch {
        await handleCopyLink();
      }
    } else {
      await handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />

      <main id="builder" className="mx-auto max-w-7xl px-6 py-16">
        <AnimatePresence mode="wait">
          {mergedImageUrl ? (
            // ── Result view
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-8"
              data-ocid="result.panel"
            >
              <div className="text-center">
                <p
                  className="font-serif text-bloom-subtle text-base"
                  style={{ fontStyle: "italic", fontWeight: 300 }}
                >
                  Your creation
                </p>
                <h2 className="font-serif text-4xl font-semibold text-bloom-heading mt-1">
                  Your Bouquet is Ready
                </h2>
                <DiamondDivider />
                <p
                  className="font-serif text-base text-bloom-subtle"
                  style={{ fontStyle: "italic", fontWeight: 300 }}
                >
                  Download it, share it, or send it with love.
                </p>
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
                  alt="Your custom bouquet with message card"
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
                  download="my-bloom-bouquet.jpg"
                  className="inline-flex items-center gap-2 rounded-full bg-bloom-blush px-8 py-3 font-sans text-sm font-semibold text-white shadow-card transition-all hover:bg-bloom-blush/85 hover:shadow-hero"
                  data-ocid="result.primary_button"
                >
                  <Download className="h-4 w-4" /> Download Bouquet
                </a>
                {shareId && (
                  <Button
                    variant="outline"
                    className="rounded-full border-bloom-gold/50 px-8 py-3 font-sans text-sm font-semibold text-bloom-gold hover:bg-bloom-gold/10"
                    onClick={handleShare}
                    data-ocid="result.secondary_button"
                  >
                    <Link2 className="mr-2 h-4 w-4" /> Copy Share Link
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="rounded-full px-8 py-3 font-sans text-sm font-semibold text-bloom-subtle hover:text-bloom-heading"
                  onClick={handleReset}
                  data-ocid="result.close_button"
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> Create Another
                </Button>
              </div>
            </motion.div>
          ) : (
            // ── Builder form
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Step 1 */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
                data-ocid="flowers.section"
              >
                <SectionHeading step="One" title="Select Your Blooms" />

                {FLOWER_GROUPS.map((group) => (
                  <div key={group.label} className="mb-10">
                    <p
                      className="mb-4 text-center font-serif text-sm text-bloom-gold"
                      style={{
                        fontStyle: "italic",
                        fontWeight: 300,
                        letterSpacing: "0.08em",
                      }}
                    >
                      — {group.label} —
                    </p>
                    {/* Constrain flower grid to same width as greenery (max-w-2xl) for uniform card sizes */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 max-w-2xl mx-auto">
                      {group.flowers.map((flower, idx) => (
                        <FlowerCard
                          key={flower}
                          name={flower}
                          selected={selectedFlowers.includes(flower)}
                          onToggle={() => toggleFlower(flower)}
                          index={idx}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {selectedFlowers.length > 0 && (
                  <p
                    className="mt-2 text-center font-serif text-sm text-bloom-subtle"
                    style={{ fontStyle: "italic" }}
                  >
                    Selected:{" "}
                    <span className="font-semibold text-bloom-blush">
                      {selectedFlowers.join(", ")}
                    </span>
                  </p>
                )}
              </motion.section>

              {/* Step 2 */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-16"
                data-ocid="greenery.section"
              >
                <SectionHeading step="Two" title="Add Greenery" />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl mx-auto">
                  {GREENERY_OPTIONS.map((g, idx) => (
                    <GreeneryCard
                      key={g.name}
                      name={g.name}
                      selected={selectedGreenery.includes(g.name)}
                      onToggle={() => toggleGreenery(g.name)}
                      index={idx}
                    />
                  ))}
                </div>
              </motion.section>

              {/* Step 3 */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-14"
                data-ocid="message.section"
              >
                <SectionHeading step="Three" title="Write Your Message" />
                <div
                  className="relative max-w-2xl mx-auto rounded-2xl border border-bloom-divider bg-white/50 p-1 shadow-card"
                  style={{ backdropFilter: "blur(8px)" }}
                >
                  <Textarea
                    placeholder="Write your heartfelt message here..."
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value.slice(0, MAX_MESSAGE))
                    }
                    rows={5}
                    className="resize-none rounded-xl border-none bg-transparent font-serif text-base text-bloom-heading placeholder:font-serif placeholder:text-bloom-subtle/50 placeholder:italic focus-visible:ring-0"
                    style={{ fontStyle: "italic", fontWeight: 300 }}
                    data-ocid="message.textarea"
                  />
                  <div className="flex justify-end px-3 pb-2">
                    <span
                      className={`font-sans text-xs ${
                        message.length >= MAX_MESSAGE
                          ? "text-red-400"
                          : "text-bloom-subtle/60"
                      }`}
                    >
                      {message.length}/{MAX_MESSAGE}
                    </span>
                  </div>
                </div>
              </motion.section>

              {/* Create button */}
              <div className="flex flex-col items-center gap-4">
                <Button
                  disabled={!canCreate || isGenerating}
                  onClick={handleCreate}
                  className="w-full max-w-sm rounded-full bg-bloom-blush py-6 font-serif text-base text-white shadow-card transition-all hover:bg-bloom-blush/85 hover:shadow-hero disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ fontWeight: 400, letterSpacing: "0.04em" }}
                  data-ocid="bouquet.primary_button"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Arranging your bouquet...
                    </span>
                  ) : (
                    "✦ Create Bouquet"
                  )}
                </Button>

                {!canCreate && (
                  <p
                    className="font-serif text-sm text-bloom-subtle"
                    style={{ fontStyle: "italic" }}
                    data-ocid="bouquet.error_state"
                  >
                    {selectedFlowers.length === 0
                      ? "Select at least one flower to begin"
                      : selectedGreenery.length === 0
                        ? "Add at least one greenery"
                        : "Write your message to complete your bouquet"}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer
        className="mt-24 border-t border-bloom-divider/50 py-12"
        style={{ background: "rgba(247,216,191,0.3)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bloom-blush/25 border border-bloom-blush/30">
                <span className="text-sm">🌸</span>
              </div>
              <span
                className="font-serif text-xl font-light text-bloom-heading"
                style={{ letterSpacing: "0.08em" }}
              >
                Bloom
              </span>
            </div>
            <p
              className="font-serif text-sm text-bloom-subtle max-w-xs"
              style={{ fontStyle: "italic", fontWeight: 300 }}
            >
              Luxury floral gifts, crafted with care and delivered with love.
            </p>
            <DiamondDivider />
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
          </div>
        </div>
      </footer>
    </div>
  );
}

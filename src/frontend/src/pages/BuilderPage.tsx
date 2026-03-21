import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  Check,
  Crown,
  Download,
  Loader2,
  Lock,
  RotateCcw,
  Share2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { matchBouquet } from "../bouquetLibrary";
import { renderBouquetWithCard } from "../canvasUtils";
import Footer from "../components/Footer";
import PaymentModal from "../components/PaymentModal";
import { usePremium } from "../hooks/usePremium";
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
  Jasmine: "/assets/generated/flower-jasmine.dim_400x400.jpg",
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
  "Sweet Pea": "/assets/generated/flower-sweetpea.dim_400x400.jpg",
  Camellia: "/assets/generated/flower-camellia.dim_400x400.jpg",
  Freesia: "/assets/generated/flower-freesia.dim_400x400.jpg",
  Lisianthus: "/assets/generated/flower-lisianthus.dim_400x400.jpg",
  Magnolia: "/assets/generated/flower-magnolia.dim_400x400.jpg",
  Cosmos: "/assets/generated/flower-cosmos.dim_400x400.jpg",
  Snapdragon: "/assets/generated/flower-snapdragon.dim_400x400.jpg",
  Iris: "/assets/generated/flower-iris.dim_400x400.jpg",
  Wisteria: "/assets/generated/flower-wisteria.dim_400x400.jpg",
  Protea: "/assets/generated/flower-protea.dim_400x400.jpg",
  // Premium flowers
  Lotus: "https://images.unsplash.com/photo-1559181567-c3190ca9d222?w=400",
  "Black Dahlia": "/assets/generated/flower-black-dahlia.dim_400x400.jpg",
  "Blue Delphinium":
    "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400",
  "Bleeding Heart": "/assets/generated/flower-bleeding-heart.dim_400x400.jpg",
  Hellebore: "/assets/generated/flower-hellebore.dim_400x400.jpg",
  "Chocolate Cosmos":
    "/assets/generated/flower-chocolate-cosmos.dim_400x400.jpg",
};

const GREENERY_IMAGES: Record<string, string> = {
  Eucalyptus: "/assets/generated/greenery-eucalyptus.dim_400x400.jpg",
  Ruscus: "/assets/generated/greenery-ruscus.dim_400x400.jpg",
  Fern: "/assets/generated/greenery-fern.dim_400x400.jpg",
  "Filler Stems": "/assets/generated/greenery-fillerstems.dim_400x400.jpg",
  Myrtle: "/assets/generated/greenery-myrtle.dim_400x400.jpg",
  Salal: "/assets/generated/greenery-salal.dim_400x400.jpg",
  "Dusty Miller": "/assets/generated/greenery-dustymiller.dim_400x400.jpg",
  Pittosporum: "/assets/generated/greenery-pittosporum.dim_400x400.jpg",
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
      "Sweet Pea",
      "Camellia",
    ],
    premium: false,
  },
  {
    label: "Elegant",
    flowers: [
      "Lily",
      "Orchid",
      "Gardenia",
      "Jasmine",
      "Carnation",
      "Freesia",
      "Lisianthus",
      "Magnolia",
    ],
    premium: false,
  },
  {
    label: "Bright",
    flowers: [
      "Sunflower",
      "Daisy",
      "Gerbera",
      "Marigold",
      "Poppy",
      "Cosmos",
      "Snapdragon",
    ],
    premium: false,
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
      "Iris",
      "Wisteria",
      "Protea",
    ],
    premium: true,
  },
];

const RARE_EXCLUSIVE_FLOWERS = [
  "Lotus",
  "Black Dahlia",
  "Blue Delphinium",
  "Bleeding Heart",
  "Hellebore",
  "Chocolate Cosmos",
];

const PREMIUM_FLOWERS = [
  // Wild & Soft group (now premium)
  "Anemone",
  "Lavender",
  "Hydrangea",
  "Baby's Breath",
  "Tulip",
  "Cherry Blossom",
  "Iris",
  "Wisteria",
  "Protea",
  // Exclusive premium collection
  ...RARE_EXCLUSIVE_FLOWERS,
];

const GREENERY_OPTIONS = [
  { name: "Eucalyptus" },
  { name: "Ruscus" },
  { name: "Fern" },
  { name: "Filler Stems" },
  { name: "Myrtle" },
  { name: "Salal" },
  { name: "Dusty Miller" },
  { name: "Pittosporum" },
];

const MAX_MESSAGE = 200;

const FONT_OPTIONS = [
  { value: "Cormorant Garamond", label: "Cormorant — Elegant" },
  { value: "Georgia, serif", label: "Georgia — Classic" },
  { value: "'Dancing Script', cursive", label: "Dancing Script — Handwritten" },
  { value: "'Playfair Display', serif", label: "Playfair — Bold" },
  { value: "Arial, sans-serif", label: "Arial — Modern" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function FlowerCard({
  name,
  selected,
  onToggle,
  index,
  isPremium,
  locked,
}: {
  name: string;
  selected: boolean;
  onToggle: () => void;
  index: number;
  isPremium?: boolean;
  locked?: boolean;
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
      {isPremium && (
        <span
          className="absolute top-2 left-2 z-10 flex items-center gap-0.5 rounded-full px-1.5 py-0.5"
          style={{ background: "rgba(184,154,106,0.9)", fontSize: "9px" }}
        >
          <Crown className="h-2.5 w-2.5 text-white" />
          <span className="text-white font-sans font-semibold">PRO</span>
        </span>
      )}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-[#f5efe6]">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {locked && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl gap-1"
            style={{
              background: "rgba(180,130,100,0.22)",
              backdropFilter: "blur(0.5px)",
            }}
          >
            <Lock className="h-5 w-5 text-white drop-shadow-md" />
            <span className="text-white text-[9px] font-semibold font-sans drop-shadow-md tracking-wide">
              PRO
            </span>
          </div>
        )}
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
          <Link
            to="/gallery"
            className="font-serif text-base text-bloom-subtle transition-colors hover:text-bloom-heading"
            style={{ fontWeight: 300 }}
            data-ocid="nav.link"
          >
            Gallery
          </Link>
        </nav>
      </div>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative pt-16 pb-12 text-center">
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        {/* Floral icons row */}
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
            ❖
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
            ❖
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
            ❖
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
            ❖
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
              a Bouquet
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <DiamondDivider />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-serif text-lg text-bloom-subtle max-w-md mx-auto"
          style={{ fontStyle: "italic", fontWeight: 300 }}
        >
          Choose flowers, write from the heart,{" "}
          <br className="hidden sm:block" />
          and gift a moment they'll never forget.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <a
            href="#builder"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-bloom-blush px-8 py-3 font-sans text-sm font-semibold text-white shadow-card transition-all hover:bg-bloom-blush/85 hover:shadow-hero"
            data-ocid="hero.primary_button"
          >
            Start Creating ❖
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main builder ──────────────────────────────────────────────────────────────

export default function BuilderPage() {
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);
  const [selectedGreenery, setSelectedGreenery] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [mergedImageUrl, setMergedImageUrl] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [msgFont, setMsgFont] = useState("Cormorant Garamond");
  const [msgColor, setMsgColor] = useState("#3b2a1a");

  const { isPremium, unlock } = usePremium();
  const createBouquet = useCreateBouquet();

  const toggleFlower = useCallback(
    (name: string) => {
      const isPremiumFlower = PREMIUM_FLOWERS.includes(name);
      if (isPremiumFlower && !isPremium) {
        setShowPayment(true);
        return;
      }
      setSelectedFlowers((prev) =>
        prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name],
      );
    },
    [isPremium],
  );

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
      const encodedMessage = `TO:${to.trim()}||FROM:${from.trim()}||MSG:${message.trim()}`;

      const [canvasResult, backendResult] = await Promise.allSettled([
        renderBouquetWithCard(
          matched.imageUrl,
          encodedMessage,
          !isPremium,
          msgFont,
          msgColor,
        ),
        createBouquet.mutateAsync({
          flowers: selectedFlowers,
          greenery: selectedGreenery,
          message: encodedMessage,
          imageKey: matched.key,
        }),
      ]);

      const canvasFailed = canvasResult.status === "rejected";
      const backendFailed = backendResult.status === "rejected";

      if (canvasFailed && backendFailed) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      const finalImageUrl = canvasFailed
        ? matched.imageUrl
        : canvasResult.value;
      const finalShareId = backendFailed
        ? null
        : (backendResult.value as string);

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
    setTo("");
    setFrom("");
    setRecipientName("");
    setMergedImageUrl(null);
    setShareId(null);
    setShowSharePanel(false);
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
    const recipientSuffix =
      isPremium && recipientName ? `, ${recipientName}` : "";
    const shareText = `I created this bouquet for you${recipientSuffix} 💐`;
    const url = shareId
      ? `${window.location.origin}/view/${shareId}${isPremium && recipientName ? `?to=${encodeURIComponent(recipientName)}` : ""}`
      : window.location.href;

    if (navigator.share && navigator.canShare) {
      try {
        const blob = await fetch(mergedImageUrl).then((r) => r.blob());
        const file = new File([blob], "my-bloom-bouquet.jpg", {
          type: "image/jpeg",
        });
        const shareData = {
          title: "My Bloom Bouquet 💐",
          text: shareText,
          url,
          files: [file],
        };
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return;
        }
      } catch {
        // fall through
      }
    }
    setShowSharePanel(true);
  };

  const shareUrl = shareId
    ? `${window.location.origin}/view/${shareId}${isPremium && recipientName ? `?to=${encodeURIComponent(recipientName)}` : ""}`
    : window.location.href;

  return (
    <div className="min-h-screen" style={{ position: "relative", zIndex: 2 }}>
      <Header />
      <Hero />

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={unlock}
      />

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
                  alt="Your custom bouquet with message card"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                    borderRadius: "16px",
                  }}
                />
              </div>

              {!isPremium && (
                <button
                  type="button"
                  onClick={() => setShowPayment(true)}
                  className="flex items-center gap-2 rounded-full border border-bloom-gold/50 px-6 py-2 font-sans text-sm text-bloom-gold hover:bg-bloom-gold/10 transition-colors"
                  data-ocid="result.secondary_button"
                >
                  <Crown className="h-4 w-4" /> Remove watermark & unlock
                  premium
                </button>
              )}

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={mergedImageUrl}
                  download="my-bloom-bouquet.jpg"
                  className="inline-flex items-center gap-2 rounded-full bg-bloom-blush px-8 py-3 font-sans text-sm font-semibold text-white shadow-card transition-all hover:bg-bloom-blush/85 hover:shadow-hero"
                  data-ocid="result.primary_button"
                >
                  <Download className="h-4 w-4" /> Download Bouquet
                </a>
                <Button
                  variant="outline"
                  className="rounded-full border-bloom-gold/50 px-8 py-3 font-sans text-sm font-semibold text-bloom-gold hover:bg-bloom-gold/10"
                  onClick={handleShare}
                  data-ocid="result.toggle"
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share Bouquet
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full px-8 py-3 font-sans text-sm font-semibold text-bloom-subtle hover:text-bloom-heading"
                  onClick={handleReset}
                  data-ocid="result.close_button"
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> Create Another
                </Button>
              </div>

              {showSharePanel && (
                <div
                  className="flex flex-wrap justify-center gap-3 mt-2 p-4 rounded-2xl bg-white/60 border border-bloom-divider/40 backdrop-blur-sm max-w-lg w-full"
                  data-ocid="result.panel"
                >
                  <p className="w-full text-center font-serif text-sm text-bloom-subtle italic mb-2">
                    Share your bouquet
                  </p>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`I created this bouquet for you 💐 ${shareUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                    data-ocid="result.primary_button"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-[#1877F2] px-4 py-2 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                    data-ocid="result.link"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-[#0A66C2] px-4 py-2 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                    data-ocid="result.link"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I created this bouquet for you 💐")}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                    data-ocid="result.toggle"
                  >
                    X / Twitter
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 rounded-full bg-bloom-gold/20 border border-bloom-gold/40 px-4 py-2 text-bloom-gold text-xs font-semibold hover:bg-bloom-gold/30 transition-colors"
                    data-ocid="result.save_button"
                  >
                    Copy Link
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            // ── Builder view
            <motion.div
              key="builder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              {/* Step 1: Flowers */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
                data-ocid="flower.section"
              >
                <SectionHeading step="One" title="Choose Your Flowers" />

                {FLOWER_GROUPS.map((group) => (
                  <div key={group.label} className="mb-10">
                    {/* Premium header for Wild & Soft and onwards */}
                    {group.premium ? (
                      <div className="mb-4">
                        <div className="flex items-center justify-center gap-2">
                          <Crown className="h-4 w-4 text-bloom-gold" />
                          <p
                            className="text-center font-serif text-sm text-bloom-gold"
                            style={{
                              fontStyle: "italic",
                              fontWeight: 500,
                              letterSpacing: "0.08em",
                            }}
                          >
                            ✦ {group.label} — Premium ✦
                          </p>
                          <Crown className="h-4 w-4 text-bloom-gold" />
                        </div>
                        {!isPremium && (
                          <p className="text-center font-sans text-xs text-bloom-subtle mt-1">
                            Unlock for ₹29 ·{" "}
                            <button
                              type="button"
                              onClick={() => setShowPayment(true)}
                              className="text-bloom-gold underline underline-offset-2 hover:opacity-80"
                              data-ocid="premium.open_modal_button"
                            >
                              Get Premium
                            </button>
                          </p>
                        )}
                      </div>
                    ) : (
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
                    )}
                    <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
                      {group.flowers.map((flower, idx) => (
                        <div
                          key={flower}
                          className="w-[calc(50%-8px)] sm:w-[calc(33.33%-11px)] md:w-[calc(25%-12px)]"
                        >
                          <FlowerCard
                            name={flower}
                            selected={selectedFlowers.includes(flower)}
                            onToggle={() => toggleFlower(flower)}
                            index={idx}
                            isPremium={PREMIUM_FLOWERS.includes(flower)}
                            locked={
                              PREMIUM_FLOWERS.includes(flower) && !isPremium
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Rare & Exclusive sub-section */}
                <div className="mb-10">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Crown className="h-4 w-4 text-bloom-gold" />
                    <p
                      className="text-center font-serif text-sm text-bloom-gold"
                      style={{
                        fontStyle: "italic",
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                      }}
                    >
                      ✦ Rare & Exclusive ✦
                    </p>
                    <Crown className="h-4 w-4 text-bloom-gold" />
                  </div>
                  {!isPremium && (
                    <p className="text-center font-sans text-xs text-bloom-subtle mb-4">
                      Unlock for ₹29 ·{" "}
                      <button
                        type="button"
                        onClick={() => setShowPayment(true)}
                        className="text-bloom-gold underline underline-offset-2 hover:opacity-80"
                        data-ocid="premium.open_modal_button"
                      >
                        Get Premium
                      </button>
                    </p>
                  )}
                  <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto mt-3">
                    {RARE_EXCLUSIVE_FLOWERS.map((flower, idx) => (
                      <div
                        key={flower}
                        className="w-[calc(50%-8px)] sm:w-[calc(33.33%-11px)] md:w-[calc(25%-12px)]"
                      >
                        <FlowerCard
                          name={flower}
                          selected={selectedFlowers.includes(flower)}
                          onToggle={() => toggleFlower(flower)}
                          index={idx}
                          isPremium
                          locked={!isPremium}
                        />
                      </div>
                    ))}
                  </div>
                </div>

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

              {/* Step 2: Greenery */}
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

              {/* Step 3: Message */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-14"
                data-ocid="message.section"
              >
                <SectionHeading step="Three" title="Write Your Message" />
                <div
                  className="relative max-w-2xl mx-auto rounded-2xl border border-bloom-divider bg-white/50 p-4 shadow-card"
                  style={{ backdropFilter: "blur(8px)" }}
                >
                  {/* To / From */}
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <label
                        className="font-serif text-xs text-bloom-gold italic mb-1 block"
                        htmlFor="to-input"
                      >
                        To
                      </label>
                      <input
                        id="to-input"
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="Recipient's name"
                        className="w-full bg-transparent border-b border-bloom-divider/60 font-serif text-sm text-bloom-heading placeholder:text-bloom-subtle/40 placeholder:italic focus:outline-none focus:border-bloom-blush/60 transition-colors py-1"
                        style={{ fontWeight: 300 }}
                        data-ocid="message.input"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        className="font-serif text-xs text-bloom-gold italic mb-1 block"
                        htmlFor="from-input"
                      >
                        From
                      </label>
                      <input
                        id="from-input"
                        type="text"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder="Your name"
                        className="w-full bg-transparent border-b border-bloom-divider/60 font-serif text-sm text-bloom-heading placeholder:text-bloom-subtle/40 placeholder:italic focus:outline-none focus:border-bloom-blush/60 transition-colors py-1"
                        style={{ fontWeight: 300 }}
                        data-ocid="message.input"
                      />
                    </div>
                  </div>

                  {/* Gift Mode — premium only */}
                  {isPremium && (
                    <div className="mb-4">
                      <label
                        className="flex items-center gap-1 font-serif text-xs text-bloom-gold italic mb-1"
                        htmlFor="gift-mode-input"
                      >
                        <Crown className="h-3 w-3" /> Gift Mode — Recipient Name
                        (for share link)
                      </label>
                      <input
                        id="gift-mode-input"
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="e.g. Priya, Aisha..."
                        className="w-full bg-transparent border-b border-bloom-gold/40 font-serif text-sm text-bloom-heading placeholder:text-bloom-subtle/40 placeholder:italic focus:outline-none focus:border-bloom-gold/70 transition-colors py-1"
                        style={{ fontWeight: 300 }}
                        data-ocid="message.input"
                      />
                    </div>
                  )}

                  {/* Font & Color toolbar */}
                  <div
                    className="flex flex-wrap items-center gap-3 mb-3 px-2 py-2 rounded-xl"
                    style={{
                      background: "rgba(250,244,235,0.7)",
                      border: "1px solid rgba(184,154,106,0.25)",
                    }}
                  >
                    <span
                      className="font-serif text-xs text-bloom-gold italic"
                      style={{ fontWeight: 300, whiteSpace: "nowrap" }}
                    >
                      Style:
                    </span>
                    <select
                      value={msgFont}
                      onChange={(e) => setMsgFont(e.target.value)}
                      className="flex-1 min-w-0 bg-transparent font-serif text-xs text-bloom-heading border-none focus:outline-none focus:ring-0 cursor-pointer"
                      style={{ fontWeight: 300 }}
                      data-ocid="message.select"
                    >
                      {FONT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="font-serif text-xs text-bloom-gold italic"
                        style={{ fontWeight: 300 }}
                      >
                        Colour:
                      </span>
                      <label
                        htmlFor="msg-color-picker"
                        className="relative cursor-pointer"
                      >
                        <div
                          className="w-7 h-7 rounded-full border-2 border-bloom-gold/40 shadow-sm transition-transform hover:scale-110"
                          style={{ background: msgColor }}
                        />
                        <input
                          id="msg-color-picker"
                          type="color"
                          value={msgColor}
                          onChange={(e) => setMsgColor(e.target.value)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          data-ocid="message.toggle"
                        />
                      </label>
                    </div>
                  </div>

                  <Textarea
                    placeholder="Write your heartfelt message here..."
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value.slice(0, MAX_MESSAGE))
                    }
                    rows={5}
                    className="resize-none rounded-xl border-none bg-transparent text-base text-bloom-heading placeholder:text-bloom-subtle/50 placeholder:italic focus-visible:ring-0"
                    style={{
                      fontFamily: msgFont,
                      color: msgColor,
                      fontStyle: "italic",
                      fontWeight: 300,
                    }}
                    data-ocid="message.textarea"
                  />
                  <div className="flex justify-end px-1 pb-1">
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
                    "❖ Create Bouquet"
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

      <Footer />
    </div>
  );
}

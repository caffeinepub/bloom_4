// ─── IMPORTS ──────────────────────────────────────────────────────────────────
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useParams,
} from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  Crown,
  Download,
  Loader2,
  Lock,
  RotateCcw,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { BouquetRecord } from "./backend.d";
import {
  type BouquetEntry,
  ELEGANT_FLOWERS,
  getClosestMatches,
  matchBouquet,
  renderBouquetWithCard,
} from "./bouquetData";
import { useActor } from "./hooks/useActor";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

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
  Jasmine: "/assets/generated/flower-jasmine-elegant.dim_400x400.jpg",
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
  Lotus: "/assets/generated/flower-lotus.dim_400x400.jpg",
  "Black Dahlia": "/assets/generated/flower-black-dahlia.dim_400x400.jpg",
  "Blue Delphinium": "/assets/generated/flower-lotus.dim_400x400.jpg",
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
  "Anemone",
  "Lavender",
  "Hydrangea",
  "Baby's Breath",
  "Tulip",
  "Cherry Blossom",
  "Iris",
  "Wisteria",
  "Protea",
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

// ─── HOOKS ────────────────────────────────────────────────────────────────────

// ─── SEO HOOK ─────────────────────────────────────────────────────────────────

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, val: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(
        `meta[${attr}="${name}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = val;
    };
    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
  }, [title, description]);
}

function usePremium() {
  const [isPremium, setIsPremium] = useState(
    () => localStorage.getItem("premiumUnlocked") === "true",
  );
  const unlock = () => {
    localStorage.setItem("premiumUnlocked", "true");
    setIsPremium(true);
  };
  return { isPremium, unlock };
}

function useGetBouquet(id: string | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<BouquetRecord | null>({
    queryKey: ["bouquet", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getBouquet(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

type GalleryRecord = {
  id: string;
  flowers: readonly string[];
  greenery: readonly string[];
  imageKey: string;
  timestamp: bigint;
};

function useGetGalleryBouquets(limit: number) {
  const { actor, isFetching } = useActor();
  return useQuery<GalleryRecord[]>({
    queryKey: ["galleryBouquets", limit],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getGalleryBouquets(BigInt(limit));
    },
    enabled: !!actor && !isFetching,
  });
}

function useCreateBouquet() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      flowers,
      greenery,
      message,
      imageKey,
    }: {
      flowers: string[];
      greenery: string[];
      message: string;
      imageKey: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createBouquet(flowers, greenery, message, imageKey);
    },
  });
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function PetalAnimation() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <div className="petal petal-1" />
      <div className="petal petal-2" />
      <div className="petal petal-3" />
      <div className="petal petal-4" />
      <div className="petal petal-5" />
      <div className="petal petal-6" />
      <div className="petal petal-7" />
      <div className="petal petal-8" />
      <div className="petal petal-9" />
      <div className="petal petal-10" />
      <div className="petal petal-11" />
      <div className="petal petal-12" />
      <div className="petal petal-13" />
      <div className="petal petal-14" />
      <div className="petal petal-15" />
      <div className="sparkle sparkle-1" />
      <div className="sparkle sparkle-2" />
      <div className="sparkle sparkle-3" />
      <div className="sparkle sparkle-4" />
      <div className="sparkle sparkle-5" />
      <div className="sparkle sparkle-6" />
      <div className="sparkle sparkle-7" />
      <div className="sparkle sparkle-8" />
      <div className="sparkle sparkle-9" />
      <div className="sparkle sparkle-10" />
      <div className="sparkle sparkle-11" />
      <div className="sparkle sparkle-12" />
      <div className="sparkle sparkle-13" />
      <div className="sparkle sparkle-14" />
      <div className="sparkle sparkle-15" />
      <div className="sparkle sparkle-16" />
      <div className="sparkle sparkle-17" />
      <div className="sparkle sparkle-18" />
      <div className="sparkle sparkle-19" />
      <div className="sparkle sparkle-20" />
    </div>
  );
}

function Footer() {
  return (
    <footer
      className="mt-24 border-t border-bloom-divider/50 py-12"
      style={{ background: "rgba(247,216,191,0.3)" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/petalnest-icon-only-transparent.dim_200x200.png"
              alt="PetalNest logo — custom bouquet builder"
              className="h-9 w-9 object-contain"
            />
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                letterSpacing: "0.05em",
                color: "#2D2D2D",
                fontSize: "1.25rem",
                fontWeight: 400,
              }}
            >
              Petalnest
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="font-sans text-xs text-bloom-subtle hover:text-bloom-gold transition-colors"
            >
              About
            </Link>
            <span className="text-bloom-divider">·</span>
            <a
              href="mailto:hello@petalnest.app"
              className="font-sans text-xs text-bloom-subtle hover:text-bloom-gold transition-colors"
            >
              Contact
            </a>
            <span className="text-bloom-divider">·</span>
            <Link
              to="/gallery"
              className="font-sans text-xs text-bloom-subtle hover:text-bloom-gold transition-colors"
            >
              Gallery
            </Link>
            <span className="text-bloom-divider">·</span>
            <Link
              to="/terms"
              className="font-sans text-xs text-bloom-subtle hover:text-bloom-gold transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-bloom-divider">·</span>
            <Link
              to="/privacy"
              className="font-sans text-xs text-bloom-subtle hover:text-bloom-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-bloom-divider">·</span>
            <Link
              to="/refund"
              className="font-sans text-xs text-bloom-subtle hover:text-bloom-gold transition-colors"
            >
              Refund Policy
            </Link>
          </div>
          <p className="font-sans text-xs text-bloom-subtle">
            © {new Date().getFullYear()} PetalNest. Made with{" "}
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
  );
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

function SectionHeading({
  step,
  title,
  description,
}: { step: string; title: string; description?: string }) {
  return (
    <div className="mb-8 text-center">
      <p
        className="font-serif text-bloom-blush/70 text-base"
        style={{ fontStyle: "italic", fontWeight: 300 }}
      >
        Step {step}
      </p>
      <h1
        className="font-serif text-3xl text-bloom-heading mt-1"
        style={{ fontWeight: 600 }}
      >
        {title}
      </h1>
      <div className="flex items-center justify-center gap-2 mt-3">
        <div className="h-px w-12 bg-bloom-gold/40" />
        <span className="text-bloom-gold/60 text-xs">◆</span>
        <div className="h-px w-12 bg-bloom-gold/40" />
      </div>
      {description && (
        <p
          className="mt-4 font-serif text-base text-bloom-subtle max-w-xl mx-auto"
          style={{ fontWeight: 300, fontStyle: "italic" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [payClicked, setPayClicked] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [continueEnabled, setContinueEnabled] = useState(false);
  const [waitingMsg, setWaitingMsg] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  if (!isOpen) return null;

  const delayMs = 8000 + Math.floor(Math.random() * 2000); // 8–10s random delay

  const handlePayNow = () => {
    window.open(
      "upi://pay?pa=8789829461-4@ybl&pn=PetalNest&am=29&cu=INR",
      "_blank",
    );
    setPayClicked(true);
    setPaymentInitiated(true);
    setWaitingMsg(true);
    setContinueEnabled(false);
    setTimeout(() => {
      setWaitingMsg(false);
      setContinueEnabled(true);
    }, delayMs);
  };

  const handleCompleted = () => {
    // Hard guard: only unlock if paymentInitiated = true AND delay has elapsed
    if (!paymentInitiated || !continueEnabled) return;
    localStorage.setItem("premiumUnlocked", "true");
    setUnlocked(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(60,30,20,0.45)", backdropFilter: "blur(6px)" }}
      data-ocid="payment.modal"
    >
      <div
        className="relative w-full max-w-sm rounded-3xl p-8 shadow-2xl"
        style={{
          background: "#fdf5ec",
          border: "1px solid rgba(184,154,106,0.3)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-bloom-subtle/60 hover:text-bloom-heading transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {unlocked ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">🌸</div>
            <h2 className="font-serif text-2xl text-bloom-heading font-semibold">
              Premium Unlocked!
            </h2>
            <p className="font-serif text-bloom-subtle italic mt-2">
              Enjoy all your premium features 🌸
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bloom-blush/20 border border-bloom-blush/40 mb-3">
                <Crown className="h-7 w-7 text-bloom-blush" />
              </div>
              <h2
                className="font-serif text-2xl text-bloom-heading"
                style={{ fontWeight: 600 }}
              >
                Unlock Premium
              </h2>
              <p className="font-serif text-sm text-bloom-subtle italic mt-1">
                One-time payment · ₹29
              </p>
            </div>

            <ul className="space-y-3 mb-6">
              {[
                "Premium flowers — Lotus, Blue Delphinium & more",
                "Remove watermark from your bouquet",
                "Gift Mode — personalised sharing with recipient name",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bloom-blush/20 mt-0.5">
                    <Check className="h-3 w-3 text-bloom-blush" />
                  </span>
                  <span
                    className="font-serif text-sm text-bloom-heading"
                    style={{ fontWeight: 300 }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="rounded-2xl p-4 mb-6 text-center"
              style={{
                background: "rgba(184,154,106,0.1)",
                border: "1px solid rgba(184,154,106,0.25)",
              }}
            >
              <p className="font-sans text-xs text-bloom-subtle mb-1">UPI ID</p>
              <p
                className="font-serif text-base text-bloom-heading"
                style={{ fontWeight: 600, letterSpacing: "0.04em" }}
              >
                8789829461-4@ybl
              </p>
            </div>

            {!payClicked ? (
              <Button
                onClick={handlePayNow}
                className="w-full rounded-full bg-bloom-blush py-5 font-serif text-base text-white shadow-card hover:bg-bloom-blush/85"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Pay ₹29 via UPI
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-center font-serif text-xs text-bloom-subtle/80 leading-relaxed">
                  Please complete the payment before continuing. Access may be
                  restricted otherwise.
                </p>
                {waitingMsg && (
                  <p className="text-center font-serif text-xs text-bloom-blush italic animate-pulse">
                    Waiting for payment confirmation...
                  </p>
                )}
                <Button
                  onClick={handleCompleted}
                  disabled={!continueEnabled}
                  className="w-full rounded-full bg-bloom-gold py-5 font-serif text-base text-white shadow-card hover:bg-bloom-gold/85 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  data-ocid="payment.confirm_button"
                >
                  Continue after payment ✓
                </Button>
                <button
                  type="button"
                  onClick={handlePayNow}
                  className="w-full text-center font-serif text-xs text-bloom-subtle/70 underline underline-offset-2"
                >
                  Retry payment
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

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
    <motion.button
      type="button"
      onClick={onToggle}
      title={locked ? "Premium flower – unlock to use" : name}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`animate-fade-up ${staggerClass} group relative flex flex-col items-center gap-2 rounded-2xl p-3 transition-colors duration-200 backdrop-blur-sm ${locked ? "cursor-pointer" : "cursor-pointer"} ${
        selected
          ? "border-2 border-bloom-blush bg-white/80 shadow-[0_4px_20px_rgba(219,130,130,0.25)]"
          : locked
            ? "border border-amber-300/50 bg-white/70"
            : "border border-bloom-divider/60 bg-white/80 hover:border-bloom-blush/60"
      }`}
    >
      <AnimatePresence>
        {selected && (
          <motion.div
            key="selected-ring"
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: "0 0 0 2px #e8a0a0, 0 0 16px rgba(232,160,160,0.3)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>
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
          alt={`${name} — luxury flower for bouquets`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {locked && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl gap-1"
            style={{
              background: "rgba(140,90,60,0.45)",
              backdropFilter: "blur(1px)",
            }}
          >
            <Lock className="h-6 w-6 text-white drop-shadow-md" />
            <span className="text-white text-[10px] font-semibold font-sans drop-shadow-md tracking-wide bg-black/30 px-1.5 rounded-full">
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
    </motion.button>
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
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`animate-fade-up ${staggerClass} group relative flex flex-col items-center gap-2 rounded-2xl p-3 transition-colors duration-200 cursor-pointer backdrop-blur-sm ${
        selected
          ? "border-2 border-bloom-gold bg-white/80 shadow-[0_4px_20px_rgba(198,168,110,0.28)]"
          : "border border-bloom-divider/60 bg-white/80 hover:border-bloom-gold/60"
      }`}
    >
      <AnimatePresence>
        {selected && (
          <motion.div
            key="selected-ring-greenery"
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: "0 0 0 2px #c6a86e, 0 0 16px rgba(198,168,110,0.3)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>
      {selected && (
        <span className="absolute top-2 right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-bloom-gold shadow-md">
          <Check className="h-3 w-3 text-white" />
        </span>
      )}
      <div className="w-full aspect-square overflow-hidden rounded-xl bg-[#f5efe6]">
        <img
          src={img}
          alt={`${name} greenery for bouquet arrangement`}
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
    </motion.button>
  );
}

// ─── BOUQUET PREVIEW STACK ────────────────────────────────────────────────────
function BouquetPreviewStack({
  selectedFlowers,
  selectedGreenery,
}: {
  selectedFlowers: string[];
  selectedGreenery: string[];
}) {
  const allSelected = [...selectedFlowers, ...selectedGreenery];
  return (
    <motion.div
      className="mb-8 rounded-2xl border border-bloom-divider/40 bg-white/60 backdrop-blur-sm p-4"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="font-serif text-sm text-bloom-heading/70 mb-3 text-center tracking-wide">
        ✦ Live Bouquet Preview ✦
      </p>
      {allSelected.length === 0 ? (
        <p className="text-center text-xs text-bloom-text/40 font-sans py-2">
          Select flowers below to see them appear here
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 justify-center">
          <AnimatePresence>
            {allSelected.map((name) => {
              const img = FLOWER_IMAGES[name] ?? GREENERY_IMAGES[name];
              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.5, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -8 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="relative flex flex-col items-center gap-1"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-bloom-blush/60 shadow-sm">
                    <img
                      src={img}
                      alt={`${name} selected for bouquet`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[9px] font-sans text-bloom-text/60 text-center leading-tight max-w-[48px] truncate">
                    {name}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

// ─── FLOATING BOUQUET PANEL ───────────────────────────────────────────────────
function FloatingBouquetPanel({
  selectedFlowers,
  selectedGreenery,
}: {
  selectedFlowers: string[];
  selectedGreenery: string[];
}) {
  const total = selectedFlowers.length + selectedGreenery.length;
  const scrollToBuilder = () => {
    const el = document.getElementById("builder");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {total > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          onClick={scrollToBuilder}
          className="fixed bottom-6 right-6 z-50 cursor-pointer"
          style={{ maxWidth: 200 }}
          data-ocid="floating_bouquet.panel"
        >
          <div
            className="rounded-2xl border border-white/40 px-3 py-2.5 backdrop-blur-md"
            style={{
              background: "rgba(253, 240, 232, 0.85)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(232,160,160,0.15)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-serif text-xs text-bloom-heading font-light tracking-wide">
                Your Bouquet
              </span>
              <span
                className="ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-sans font-semibold text-white"
                style={{ background: "#d4897a" }}
              >
                {total}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              <AnimatePresence>
                {[...selectedFlowers, ...selectedGreenery]
                  .slice(0, 6)
                  .map((name) => {
                    const img = FLOWER_IMAGES[name] ?? GREENERY_IMAGES[name];
                    return (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="w-7 h-7 rounded-full overflow-hidden border border-bloom-blush/50 shadow-sm"
                      >
                        <img
                          src={img}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
              {total > 6 && (
                <div className="w-7 h-7 rounded-full bg-bloom-blush/20 border border-bloom-blush/40 flex items-center justify-center">
                  <span className="text-[9px] font-sans text-bloom-heading">
                    +{total - 6}
                  </span>
                </div>
              )}
            </div>
            <p className="mt-2 text-[9px] text-center text-bloom-text/50 font-sans">
              tap to view builder
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── STEP PROGRESS BAR ────────────────────────────────────────────────────────

function StepProgressBar({ step }: { step: number }) {
  const steps = [
    { label: "Flowers", num: 1 },
    { label: "Greenery", num: 2 },
    { label: "Message", num: 3 },
    { label: "Preview", num: 4 },
  ];
  return (
    <nav
      className="flex items-center justify-center gap-0 py-4 px-4"
      aria-label="Step progress"
      data-ocid="step_progress.panel"
    >
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-sans font-semibold transition-all duration-300 ${
                s.num < step
                  ? "bg-bloom-blush text-white shadow-sm"
                  : s.num === step
                    ? "bg-rose-500 text-white shadow-md scale-110"
                    : "bg-bloom-divider/40 text-bloom-subtle"
              }`}
            >
              {s.num < step ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <span>{s.num}</span>
              )}
            </div>
            <span
              className={`text-[10px] font-sans whitespace-nowrap transition-colors duration-300 ${
                s.num === step
                  ? "text-rose-500 font-semibold"
                  : s.num < step
                    ? "text-bloom-blush"
                    : "text-bloom-subtle/60"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-[2px] w-8 sm:w-12 mx-1 mb-4 rounded-full transition-all duration-300 ${
                s.num < step ? "bg-bloom-blush" : "bg-bloom-divider/30"
              }`}
            />
          )}
        </div>
      ))}
    </nav>
  );
}

// ─── BUILDER PAGE ─────────────────────────────────────────────────────────────

function BuilderHeader() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header
      className="sticky top-0 z-40 border-b border-bloom-divider/50 backdrop-blur-md"
      style={{ background: "rgba(253,240,232,0.88)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <img
            src="/assets/generated/petalnest-icon-only-transparent.dim_200x200.png"
            alt="PetalNest logo — custom bouquet builder"
            className="h-10 w-10 object-contain"
          />
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: "0.05em",
              color: "#2D2D2D",
              fontSize: "1.25rem",
              fontWeight: 400,
            }}
          >
            Petalnest
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="font-sans text-sm text-bloom-subtle hover:text-bloom-heading transition-colors"
            type="button"
            data-ocid="nav.link"
          >
            How it Works
          </button>
          <Link
            to="/gallery"
            className="font-sans text-sm text-bloom-subtle hover:text-bloom-heading transition-colors"
            data-ocid="nav.gallery.link"
          >
            Gallery
          </Link>
          <button
            onClick={() => scrollToSection("builder")}
            className="font-sans text-sm px-5 py-2 rounded-full bg-bloom-blush text-white hover:bg-bloom-blush/85 transition-all shadow-sm"
            type="button"
            data-ocid="nav.start_building.button"
          >
            Start Building
          </button>
        </nav>
        <nav className="md:hidden flex items-center gap-3">
          <Link
            to="/gallery"
            className="font-sans text-xs text-bloom-subtle"
            data-ocid="nav.gallery.link"
          >
            Gallery
          </Link>
          <button
            type="button"
            onClick={() => scrollToSection("builder")}
            className="font-sans text-xs px-4 py-1.5 rounded-full bg-bloom-blush text-white"
            data-ocid="nav.start_building.button"
          >
            Build
          </button>
        </nav>
      </div>
    </header>
  );
}

// ─── CREATIVE WORK JSON-LD ─────────────────────────────────────────────────────

function CreativeWorkJsonLd({
  flowers,
  greenery,
  shareId,
}: {
  flowers: string[];
  greenery: string[];
  shareId: string | null;
}) {
  useEffect(() => {
    const existing = document.getElementById("creativework-jsonld");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "creativework-jsonld";
    script.type = "application/ld+json";
    const flowerNames = flowers.join(", ");
    const greeneryNames = greenery.join(", ");
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: `Custom Bouquet — ${flowerNames}`,
      description: `A personalized bouquet featuring ${flowerNames} with ${greeneryNames}, created on PetalNest.`,
      creator: { "@type": "WebApplication", name: "PetalNest" },
      url: shareId
        ? `https://petalnest.app/bouquet/${shareId}`
        : "https://petalnest.app/create-bouquet",
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById("creativework-jsonld");
      if (el) el.remove();
    };
  }, [flowers, greenery, shareId]);
  return null;
}

// ─── FAQ SECTION ──────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "How do I create a bouquet online with PetalNest?",
    a: "Select your favorite flowers from our curated collection, add greenery for depth, write a heartfelt message, and click 'Generate Bouquet'. Your ultra-HD bouquet is ready to download and share in seconds — no account required.",
  },
  {
    q: "Can I send a digital bouquet as a gift?",
    a: "Yes! After creating your bouquet, use the Share button to send it via WhatsApp, Facebook, or copy a unique shareable link. With Premium Gift Mode, you can personalize the bouquet with your recipient's name.",
  },
  {
    q: "What flowers are available on PetalNest?",
    a: "PetalNest offers 32+ flower types across Romantic, Elegant, Cheerful, and Wild & Soft categories — including roses, peonies, orchids, tulips, lavender, and rare exclusive flowers like Lotus and Blue Delphinium.",
  },
  {
    q: "What is included in the Premium plan?",
    a: "The Premium plan (₹29, one-time) unlocks all Wild & Soft and Rare & Exclusive flowers, removes the watermark from your bouquet image, and enables Gift Mode for personalized sharing with your recipient's name.",
  },
  {
    q: "Is my bouquet saved after I create it?",
    a: "Yes — every bouquet you generate is saved with a unique shareable link. You can send the link to anyone and they can view your creation on any device, anytime.",
  },
  {
    q: "Can I download my bouquet in high resolution?",
    a: "Absolutely. All bouquets are rendered at 2400×3200 pixels (Ultra HD) — perfect for sharing on social media, printing at home, or sending as a beautiful digital gift.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const existing = document.getElementById("faq-jsonld");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "faq-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById("faq-jsonld");
      if (el) el.remove();
    };
  }, []);

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="py-20 px-6"
      style={{ background: "rgba(253,245,236,0.6)" }}
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p
            className="font-serif text-bloom-blush/70 italic text-base"
            style={{ fontWeight: 300 }}
          >
            Got questions?
          </p>
          <h2
            className="font-serif text-4xl text-bloom-heading mt-1"
            style={{ fontWeight: 600 }}
          >
            Frequently Asked Questions
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px w-12 bg-bloom-gold/40" />
            <span className="text-bloom-gold/60 text-xs">◆</span>
            <div className="h-px w-12 bg-bloom-gold/40" />
          </div>
        </motion.div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-2xl border border-bloom-divider/50 overflow-hidden"
              style={{ background: "rgba(255,250,244,0.9)" }}
              data-ocid={`faq.item.${i + 1}`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                aria-expanded={openIndex === i}
              >
                <h3
                  className="font-serif text-bloom-heading pr-4"
                  style={{ fontWeight: 500, fontSize: "1rem" }}
                >
                  {item.q}
                </h3>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-bloom-gold text-xl leading-none"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="font-sans text-sm text-bloom-subtle leading-relaxed px-6 pb-5">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero({ onStart }: { onStart?: () => void }) {
  const scrollToBuilder = () => {
    if (onStart) {
      onStart();
      return;
    }
    const el = document.getElementById("builder");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // SEO meta tags
  usePageMeta(
    "PetalNest – Create Your Custom Bouquet Online | Free Bouquet Builder",
    "Design and share a premium custom bouquet with PetalNest. Choose flowers, add a message, and create a unique floral arrangement for any occasion.",
  );
  useEffect(() => {
    document.title =
      "PetalNest – Create Your Custom Bouquet Online | Free Bouquet Builder";
    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(
        `meta[${attr}="${name}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "PetalNest — Design your perfect custom bouquet online. Choose from 32+ premium flowers, add greenery, and create an ultra-HD shareable bouquet in minutes.",
    );
    setMeta(
      "keywords",
      "bouquet maker online, custom flower bouquet, digital bouquet, send flowers online, bouquet design, flower gifting, PetalNest",
    );
    setMeta("og:title", "PetalNest — Custom Bouquet Builder", true);
    setMeta(
      "og:description",
      "Design your perfect bouquet online. Choose flowers, add greenery, create ultra-HD images to download and share.",
      true,
    );
    setMeta("og:type", "website", true);
    setMeta(
      "og:image",
      `${window.location.origin}/assets/generated/petalnest-logo-full.dim_400x200.png`,
      true,
    );
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "PetalNest — Custom Bouquet Builder");
    setMeta(
      "twitter:description",
      "Design your perfect bouquet online with PetalNest.",
    );
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-20 pb-20 text-center overflow-hidden">
        {/* Decorative background blobs */}
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {/* Warm blush blob - top left */}
          <div
            style={{
              position: "absolute",
              top: "-10%",
              left: "-5%",
              width: "50vw",
              height: "50vw",
              maxWidth: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(232,190,190,0.18) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          {/* Peach blob - top right */}
          <div
            style={{
              position: "absolute",
              top: "5%",
              right: "-8%",
              width: "40vw",
              height: "40vw",
              maxWidth: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,210,180,0.14) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
          {/* Sage green accent - bottom left, very subtle */}
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: "10%",
              width: "30vw",
              height: "30vw",
              maxWidth: 350,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(160,190,170,0.07) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          {/* Ivory warm center blob */}
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "30%",
              width: "40vw",
              height: "30vw",
              maxWidth: 500,
              borderRadius: "60%",
              background:
                "radial-gradient(ellipse, rgba(255,245,235,0.12) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <img
              src="/assets/generated/petalnest-icon-only-transparent.dim_200x200.png"
              alt="PetalNest logo — custom bouquet builder"
              className="h-24 w-24 object-contain drop-shadow-md"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
                letterSpacing: "0.12em",
                background:
                  "linear-gradient(135deg, #c96b8a 0%, #e8a0a0 40%, #b89a6a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
                textAlign: "center",
              }}
            >
              PetalNest
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="font-serif leading-tight">
              <span
                className="block text-5xl md:text-6xl lg:text-7xl text-bloom-heading"
                style={{ fontWeight: 700, fontStyle: "italic" }}
              >
                Create Your Personalized Bouquet
              </span>
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
            className="font-serif text-lg text-bloom-subtle max-w-md mx-auto mb-8"
            style={{ fontStyle: "italic", fontWeight: 300 }}
          >
            Choose flowers, mix greenery, and create a bouquet that&apos;s
            uniquely yours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <motion.button
              onClick={scrollToBuilder}
              type="button"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-9 py-4 font-sans text-base font-bold text-white shadow-lg cta-pulse hover:bg-rose-600 transition-colors"
              data-ocid="hero.start_building.button"
            >
              Start Building ❖
            </motion.button>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-bloom-blush/50 px-8 py-3.5 font-sans text-sm text-bloom-blush hover:bg-bloom-blush/8 transition-all"
              data-ocid="hero.view_examples.link"
            >
              View Examples
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 font-sans text-sm text-bloom-subtle/70"
          >
            5,000+ bouquets designed 💐
          </motion.p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p
              className="font-serif text-bloom-blush/70 italic text-base"
              style={{ fontWeight: 300 }}
            >
              Simple & beautiful
            </p>
            <h2
              className="font-serif text-4xl text-bloom-heading mt-1"
              style={{ fontWeight: 600 }}
            >
              How It Works
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-px w-12 bg-bloom-gold/40" />
              <span className="text-bloom-gold/60 text-xs">◆</span>
              <div className="h-px w-12 bg-bloom-gold/40" />
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: "🌸",
                title: "Choose Your Flowers",
                desc: "Browse our curated collection of premium blooms and select your favorites.",
              },
              {
                step: "02",
                icon: "🌿",
                title: "Add Greenery & Style",
                desc: "Layer eucalyptus, fern, and accent stems to complete your arrangement.",
              },
              {
                step: "03",
                icon: "🎁",
                title: "Preview Your Bouquet",
                desc: "See your creation come to life. Download it or send it as a heartfelt gift.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center p-8 rounded-2xl border border-bloom-divider/50 hover:border-bloom-blush/30 hover:shadow-card transition-all"
                style={{ background: "rgba(253,240,232,0.45)" }}
                data-ocid={`how_it_works.item.${i + 1}`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="font-sans text-xs text-bloom-blush/70 tracking-widest uppercase mb-2">
                  Step {item.step}
                </p>
                <h3
                  className="font-serif text-xl text-bloom-heading mb-3"
                  style={{ fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-bloom-subtle leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="h-10 bg-gradient-to-b from-transparent to-[rgba(255,245,235,0.3)]" />

      {/* Emotional micro-copy */}
      <motion.p
        className="text-center font-serif text-base italic text-bloom-subtle/50 my-2 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Turn feelings into flowers.
      </motion.p>

      {/* ── USE CASES ── */}
      <section
        className="py-20 px-6"
        style={{ background: "rgba(247,216,191,0.18)" }}
      >
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p
              className="font-serif text-bloom-blush/70 italic text-base"
              style={{ fontWeight: 300 }}
            >
              Every occasion
            </p>
            <h2
              className="font-serif text-4xl text-bloom-heading mt-1"
              style={{ fontWeight: 600 }}
            >
              Made for Every Moment
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-px w-12 bg-bloom-gold/40" />
              <span className="text-bloom-gold/60 text-xs">◆</span>
              <div className="h-px w-12 bg-bloom-gold/40" />
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎂",
                title: "Gifting",
                desc: "Birthdays, anniversaries, and every reason to say 'I love you'.",
              },
              {
                icon: "💍",
                title: "Events",
                desc: "Weddings, celebrations, and milestones that deserve something beautiful.",
              },
              {
                icon: "🌸",
                title: "Personal Expression",
                desc: "Because sometimes you create a bouquet just for yourself.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="text-center p-8 rounded-2xl hover:shadow-card transition-all"
                style={{ background: "rgba(255,255,255,0.6)" }}
                data-ocid={`use_cases.item.${i + 1}`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3
                  className="font-serif text-xl text-bloom-heading mb-2"
                  style={{ fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-bloom-subtle">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="h-10 bg-gradient-to-b from-transparent to-[rgba(255,245,235,0.3)]" />

      {/* Emotional micro-copy */}
      <motion.p
        className="text-center font-serif text-base italic text-bloom-subtle/50 my-2 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Designed by you, for someone special.
      </motion.p>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <p
              className="font-serif text-bloom-blush/70 italic text-base"
              style={{ fontWeight: 300 }}
            >
              Loved by many
            </p>
            <h2
              className="font-serif text-4xl text-bloom-heading mt-1"
              style={{ fontWeight: 600 }}
            >
              What People Say
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4 mb-8">
              <div className="h-px w-12 bg-bloom-gold/40" />
              <span className="text-bloom-gold/60 text-xs">◆</span>
              <div className="h-px w-12 bg-bloom-gold/40" />
            </div>
            <div
              className="inline-flex items-center gap-3 rounded-full border border-bloom-blush/30 px-6 py-2 mb-10"
              style={{ background: "rgba(253,240,232,0.6)" }}
            >
              <span className="text-bloom-blush text-lg">💐</span>
              <span
                className="font-serif text-bloom-heading text-lg"
                style={{ fontWeight: 600 }}
              >
                5,000+ bouquets designed
              </span>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Loved how easy it was to design my own bouquet. The result was absolutely stunning!",
                name: "Priya S.",
              },
              {
                quote:
                  "Made our wedding florals so personal and unique. Our guests couldn't stop asking about it.",
                name: "Rahul & Meera",
              },
              {
                quote:
                  "The perfect gift — I designed it myself and it felt so thoughtful!",
                name: "Anjali K.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="p-7 rounded-2xl border border-bloom-divider/40 hover:border-bloom-blush/25 hover:shadow-card transition-all"
                style={{ background: "rgba(253,240,232,0.45)" }}
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <p
                  className="font-serif text-bloom-subtle text-base mb-5 leading-relaxed"
                  style={{ fontStyle: "italic", fontWeight: 300 }}
                >
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-bloom-blush/20 flex items-center justify-center">
                    <span className="text-xs">🌸</span>
                  </div>
                  <span className="font-sans text-sm text-bloom-heading font-medium">
                    {item.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional micro-copy before FAQ */}
      <motion.p
        className="text-center font-serif text-base italic text-bloom-subtle/50 my-2 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Create something meaningful.
      </motion.p>

      {/* ── FAQ SECTION ── */}
      <section aria-label="Frequently Asked Questions">
        <FAQSection />
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="py-20 px-6 text-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(247,216,191,0.5) 0%, rgba(230,175,158,0.3) 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl"
        >
          <h2
            className="font-serif text-5xl text-bloom-heading mb-4"
            style={{ fontWeight: 700, fontStyle: "italic" }}
          >
            Start Creating Your Bouquet
          </h2>
          <p
            className="font-serif text-bloom-subtle text-lg mb-8"
            style={{ fontStyle: "italic", fontWeight: 300 }}
          >
            Every bouquet tells a story. Let yours begin here.
          </p>
          <motion.button
            type="button"
            onClick={scrollToBuilder}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-10 py-4 font-sans text-base font-bold text-white shadow-lg cta-pulse hover:bg-rose-600 transition-colors"
            data-ocid="final_cta.build_now.button"
          >
            Build Now ❖
          </motion.button>
        </motion.div>
      </section>
    </>
  );
}

function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);
  const [selectedGreenery, setSelectedGreenery] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [mergedImageUrl, setMergedImageUrl] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [noMatch, setNoMatch] = useState(false);
  const [closestMatches, setClosestMatches] = useState<BouquetEntry[]>([]);
  const [closestMatchHint, setClosestMatchHint] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingMessage, setGeneratingMessage] = useState(
    "Generating your bouquet...",
  );
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [msgFont, setMsgFont] = useState("Cormorant Garamond");
  const [msgColor, setMsgColor] = useState("#3b2a1a");

  const { isPremium, unlock } = usePremium();
  const createBouquet = useCreateBouquet();

  // Step-based SEO meta tags
  const stepTitles: Record<number, string> = {
    1: "PetalNest – Create Your Custom Bouquet Online",
    2: "Choose Your Flowers – PetalNest",
    3: "Add Greenery – PetalNest",
    4: "Add a Personal Message – PetalNest",
    5: "Your Custom Bouquet – PetalNest",
  };
  const stepDescriptions: Record<number, string> = {
    1: "Design and share a premium custom bouquet with PetalNest. Choose flowers, add a message, and create a unique floral arrangement for any occasion.",
    2: "Select from 30+ premium flowers to build your perfect bouquet. Free and premium options available.",
    3: "Complete your bouquet with beautiful greenery and foliage options.",
    4: "Write a heartfelt message and personalize your bouquet for gifting.",
    5: "Your unique bouquet is ready. Download in ultra-HD or share it with someone special.",
  };
  usePageMeta(
    stepTitles[currentStep] ?? stepTitles[1],
    stepDescriptions[currentStep] ?? stepDescriptions[1],
  );

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

  const canCreate = selectedFlowers.length > 0 && message.trim().length > 0;

  const handleCreate = async () => {
    if (!canCreate) return;
    setIsGenerating(true);
    try {
      // Strip premium flowers if user hasn't paid
      let effectiveFlowers = selectedFlowers;
      if (!isPremium) {
        const premiumInSelection = selectedFlowers.filter((f) =>
          PREMIUM_FLOWERS.includes(f),
        );
        if (premiumInSelection.length > 0) {
          const filtered = selectedFlowers.filter(
            (f) => !PREMIUM_FLOWERS.includes(f),
          );
          if (filtered.length === 0) {
            toast.error("Unlock premium to use selected flowers");
            setIsGenerating(false);
            return;
          }
          toast(
            "Some premium flowers were removed. Unlock premium for full access.",
            { icon: "🔒" },
          );
          effectiveFlowers = filtered;
        }
      }
      const matchResult = matchBouquet(effectiveFlowers, selectedGreenery);
      const encodedMessage = `TO:${to.trim()}||FROM:${from.trim()}||MSG:${message.trim()}`;

      // Debug logging
      console.log("[PetalNest] Selected flowers:", effectiveFlowers);
      console.log("[PetalNest] Selected greenery:", selectedGreenery);
      console.log(
        "[PetalNest] Match result:",
        matchResult
          ? matchResult.isExact
            ? `Exact match: ${matchResult.entry.id}`
            : `Closest match: ${matchResult.entry.id}`
          : "No match found",
      );
      const hasElegant = effectiveFlowers.some((f) =>
        ELEGANT_FLOWERS.includes(f.toLowerCase()),
      );
      if (hasElegant) {
        console.log(
          "[PetalNest] Elegant flowers detected:",
          effectiveFlowers.filter((f) =>
            ELEGANT_FLOWERS.includes(f.toLowerCase()),
          ),
        );
      }

      if (!matchResult) {
        toast.error("Please select at least one flower.");
        setIsGenerating(false);
        return;
      }

      const matched = matchResult.entry;
      setClosestMatchHint(
        matchResult.isExact ? null : (matchResult.hint ?? null),
      );

      setGeneratingMessage("Generating your bouquet...");
      const canvasDataUrl = await renderBouquetWithCard(
        matched.imageUrl,
        encodedMessage,
        !isPremium,
        msgFont,
        msgColor,
      );

      const backendResult = await createBouquet
        .mutateAsync({
          flowers: effectiveFlowers,
          greenery: selectedGreenery,
          message: encodedMessage,
          imageKey: matched.key,
        })
        .catch(() => null);

      setMergedImageUrl(canvasDataUrl);
      setShareId(backendResult as string | null);
      setNoMatch(false);
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
    setCurrentStep(1);
    setNoMatch(false);
    setClosestMatches([]);
  };

  const handleCopyLink = async () => {
    if (!shareId) return;
    const url = `${window.location.origin}/bouquet/${shareId}`;
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
          title: "My PetalNest Bouquet 💐",
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
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={unlock}
      />

      {/* ── STEP 1: LANDING PAGE ── */}
      {currentStep === 1 && (
        <>
          <BuilderHeader />
          <Hero onStart={() => setCurrentStep(2)} />
          <Footer />
        </>
      )}

      {/* ── STEPS 2-5: BUILDER FLOW ── */}
      {currentStep >= 2 && (
        <>
          {/* Header with back arrow */}
          <header
            className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3 backdrop-blur-md border-b border-bloom-divider/30"
            style={{ background: "rgba(255,250,245,0.92)" }}
          >
            <button
              type="button"
              onClick={() =>
                currentStep === 2
                  ? setCurrentStep(1)
                  : setCurrentStep(currentStep - 1)
              }
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-bloom-blush/10 transition-colors"
              aria-label="Go back"
              data-ocid="step_nav.back.button"
            >
              <ChevronLeft className="h-5 w-5 text-bloom-heading" />
            </button>
            <div className="flex-1 flex justify-center">
              <img
                src="/assets/generated/petalnest-icon-only-transparent.dim_200x200.png"
                alt="PetalNest"
                className="h-8 w-8 object-contain"
              />
            </div>
            {/* Premium badge */}
            {isPremium ? (
              <span className="flex items-center gap-1 rounded-full bg-bloom-gold/10 px-2 py-1 text-[10px] font-sans font-semibold text-bloom-gold">
                <Crown className="h-3 w-3" /> PRO
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setShowPayment(true)}
                className="flex items-center gap-1 rounded-full border border-bloom-gold/40 px-2 py-1 text-[10px] font-sans font-semibold text-bloom-gold hover:bg-bloom-gold/10 transition-colors"
                data-ocid="step_nav.unlock_premium.button"
              >
                <Lock className="h-3 w-3" /> Premium
              </button>
            )}
          </header>

          {/* Step progress bar for steps 2-4 */}
          {currentStep >= 2 && currentStep <= 4 && (
            <StepProgressBar step={currentStep - 1} />
          )}

          <main className="mx-auto max-w-2xl px-4 pb-32">
            <AnimatePresence mode="wait">
              {/* ── STEP 2: FLOWER SELECTION ── */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3 }}
                >
                  <BouquetPreviewStack
                    selectedFlowers={selectedFlowers}
                    selectedGreenery={selectedGreenery}
                  />

                  <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                  >
                    <SectionHeading
                      step="One"
                      title="Choose Your Flowers"
                      description="Every great bouquet starts with the right blooms. Select the flowers that speak to your emotions — from classic roses to exotic orchids."
                    />

                    {FLOWER_GROUPS.map((group) => (
                      <div key={group.label} className="mb-10">
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

                    {/* Rare & Exclusive */}
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
                          ✦ Rare &amp; Exclusive ✦
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
                </motion.div>
              )}

              {/* ── STEP 3: GREENERY SELECTION ── */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3 }}
                >
                  <BouquetPreviewStack
                    selectedFlowers={selectedFlowers}
                    selectedGreenery={selectedGreenery}
                  />

                  <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-16"
                  >
                    <SectionHeading
                      step="Two"
                      title="Add Greenery to Your Bouquet"
                      description="Greenery adds depth and life to any arrangement. Choose from eucalyptus, ivy, fern, and more to frame your blooms beautifully."
                    />
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
                </motion.div>
              )}

              {/* ── STEP 4: MESSAGE ── */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-14"
                  >
                    <SectionHeading
                      step="Three"
                      title="Write Your Personal Message"
                      description="A personal message transforms a bouquet into a memory. Write from the heart — no word limit, no rules."
                    />
                    <div
                      className="relative max-w-2xl mx-auto rounded-2xl border border-bloom-divider bg-white/50 p-4 shadow-card"
                      style={{ backdropFilter: "blur(8px)" }}
                    >
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
                            data-ocid="message.to.input"
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
                            data-ocid="message.from.input"
                          />
                        </div>
                      </div>

                      {isPremium && (
                        <div className="mb-4">
                          <label
                            className="flex items-center gap-1 font-serif text-xs text-bloom-gold italic mb-1"
                            htmlFor="gift-mode-input"
                          >
                            <Crown className="h-3 w-3" /> Gift Mode — Recipient
                            Name (for share link)
                          </label>
                          <input
                            id="gift-mode-input"
                            type="text"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            placeholder="e.g. Priya, Aisha..."
                            className="w-full bg-transparent border-b border-bloom-gold/40 font-serif text-sm text-bloom-heading placeholder:text-bloom-subtle/40 placeholder:italic focus:outline-none focus:border-bloom-gold/70 transition-colors py-1"
                            style={{ fontWeight: 300 }}
                            data-ocid="message.recipient.input"
                          />
                        </div>
                      )}

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
                          data-ocid="message.font.select"
                        >
                          {FONT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="color"
                          value={msgColor}
                          onChange={(e) => setMsgColor(e.target.value)}
                          className="h-6 w-8 cursor-pointer rounded border-none bg-transparent"
                          title="Message color"
                          data-ocid="message.color.input"
                        />
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
                        data-ocid="message.message.textarea"
                      />
                      <div className="flex justify-end px-1 pb-1">
                        <span
                          className={`font-sans text-xs ${message.length >= MAX_MESSAGE ? "text-red-400" : "text-bloom-subtle/60"}`}
                        >
                          {message.length}/{MAX_MESSAGE}
                        </span>
                      </div>
                    </div>
                  </motion.section>
                </motion.div>
              )}

              {/* ── STEP 5: FINAL BOUQUET ── */}
              {currentStep === 5 && noMatch && (
                <motion.div
                  key="step5nomatch"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-8 py-12 text-center max-w-lg mx-auto"
                >
                  <div className="text-6xl">💐</div>
                  <div>
                    <h2
                      className="font-serif text-2xl text-bloom-heading mb-3"
                      style={{ fontWeight: 600 }}
                    >
                      This exact combination is not available yet
                    </h2>
                    <p className="font-sans text-sm text-bloom-subtle leading-relaxed">
                      We don't have a bouquet image for this exact flower and
                      greenery combination. Try a different combination, or pick
                      one of these suggestions:
                    </p>
                  </div>

                  {closestMatches.length > 0 && (
                    <div className="w-full">
                      <p className="font-serif text-sm text-bloom-subtle mb-4 italic">
                        Closest available combinations:
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {closestMatches.map((entry) => {
                          const label = [
                            ...entry.flowerTags,
                            ...entry.greeneryTags,
                          ]
                            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                            .join(", ");
                          return (
                            <div
                              key={entry.id}
                              className="rounded-xl overflow-hidden border border-bloom-divider/40 bg-white/60 shadow-card"
                            >
                              <div className="aspect-[3/4] bg-[#f5efe6]">
                                <img
                                  src={entry.imageUrl}
                                  alt={`Suggested bouquet: ${label}`}
                                  className="w-full h-full object-contain"
                                  loading="lazy"
                                />
                              </div>
                              <p className="p-2 font-sans text-xs text-bloom-subtle text-center leading-tight">
                                {label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                      <p className="font-sans text-xs text-bloom-subtle/60 mt-3 italic">
                        These are suggestions only — not auto-selected.
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setNoMatch(false);
                        setCurrentStep(2);
                      }}
                      className="rounded-full bg-bloom-blush px-8 py-3 font-sans text-sm font-bold text-white shadow-card hover:bg-bloom-blush/85 transition-all"
                      data-ocid="bouquet.try_again.button"
                    >
                      Try a Different Combination
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-full border border-bloom-divider px-8 py-3 font-sans text-sm font-semibold text-bloom-subtle hover:text-bloom-heading transition-all"
                      data-ocid="bouquet.start_over.button"
                    >
                      Start Over
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 5: FINAL BOUQUET ── */}
              {currentStep === 5 && !noMatch && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center gap-8 pt-4"
                >
                  {isGenerating ? (
                    <div className="flex flex-col items-center gap-6 py-20">
                      <Loader2 className="h-12 w-12 animate-spin text-bloom-blush" />
                      <p className="font-serif text-bloom-subtle italic text-lg">
                        {generatingMessage}
                      </p>
                    </div>
                  ) : mergedImageUrl ? (
                    <>
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
                        <CreativeWorkJsonLd
                          flowers={selectedFlowers}
                          greenery={selectedGreenery}
                          shareId={shareId}
                        />
                        <DiamondDivider />
                        {closestMatchHint && (
                          <p className="font-sans text-xs text-bloom-subtle/70 italic mt-1 mb-1">
                            ✨ {closestMatchHint}
                          </p>
                        )}
                        <p
                          className="font-serif text-base text-bloom-subtle"
                          style={{ fontStyle: "italic", fontWeight: 300 }}
                        >
                          Download it, share it, or send it with love.
                        </p>
                      </div>

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
                          data-ocid="bouquet.unlock_premium.button"
                        >
                          <Crown className="h-4 w-4" /> Remove watermark &amp;
                          unlock premium
                        </button>
                      )}

                      <div className="flex flex-wrap justify-center gap-4">
                        <a
                          href={mergedImageUrl}
                          download="my-bloom-bouquet.jpg"
                          className="inline-flex items-center gap-2 rounded-full bg-bloom-blush px-8 py-3 font-sans text-sm font-semibold text-white shadow-card transition-all hover:bg-bloom-blush/85 hover:shadow-hero"
                          data-ocid="bouquet.download.button"
                        >
                          <Download className="h-4 w-4" /> Download Bouquet
                        </a>
                        <Button
                          variant="outline"
                          className="rounded-full border-bloom-gold/50 px-8 py-3 font-sans text-sm font-semibold text-bloom-gold hover:bg-bloom-gold/10"
                          onClick={handleShare}
                          data-ocid="bouquet.share.button"
                        >
                          <Share2 className="mr-2 h-4 w-4" /> Share Bouquet
                        </Button>
                        <Button
                          variant="ghost"
                          className="rounded-full px-8 py-3 font-sans text-sm font-semibold text-bloom-subtle hover:text-bloom-heading"
                          onClick={handleReset}
                          data-ocid="bouquet.create_another.button"
                        >
                          <RotateCcw className="mr-2 h-4 w-4" /> Create Another
                        </Button>
                      </div>

                      {showSharePanel && (
                        <div className="flex flex-wrap justify-center gap-3 mt-2 p-4 rounded-2xl bg-white/60 border border-bloom-divider/40 backdrop-blur-sm max-w-lg w-full">
                          <p className="w-full text-center font-serif text-sm text-bloom-subtle italic mb-2">
                            Share your bouquet
                          </p>
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(`I created this bouquet for you 💐 ${shareUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                          >
                            WhatsApp
                          </a>
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-full bg-[#1877F2] px-4 py-2 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                          >
                            Facebook
                          </a>
                          <a
                            href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-full bg-[#0A66C2] px-4 py-2 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                          >
                            LinkedIn
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I created this bouquet for you 💐")}&url=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                          >
                            X / Twitter
                          </a>
                          <button
                            type="button"
                            onClick={handleCopyLink}
                            className="flex items-center gap-2 rounded-full bg-bloom-gold/20 border border-bloom-gold/40 px-4 py-2 text-bloom-gold text-xs font-semibold hover:bg-bloom-gold/30 transition-colors"
                            data-ocid="bouquet.copy_link.button"
                          >
                            Copy Link
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-4 py-20 text-center">
                      <p className="font-serif text-bloom-subtle italic">
                        Something went wrong. Please try again.
                      </p>
                      <Button
                        variant="ghost"
                        onClick={() => setCurrentStep(4)}
                        data-ocid="bouquet.retry.button"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* ── STICKY BOTTOM NAV (steps 2–5, mobile) ── */}
          {currentStep >= 2 && currentStep <= 5 && (
            <div
              className="fixed bottom-0 left-0 right-0 z-40 border-t border-bloom-divider/30 px-4 py-3"
              style={{
                background: "rgba(255,250,245,0.95)",
                backdropFilter: "blur(12px)",
                paddingBottom:
                  "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
              }}
              data-ocid="step_nav.bottom_bar.panel"
            >
              <div className="flex items-center gap-3 max-w-2xl mx-auto">
                {currentStep > 2 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex h-12 items-center gap-2 rounded-full border border-bloom-divider/50 px-5 font-sans text-sm font-medium text-bloom-subtle hover:border-bloom-blush/50 hover:text-bloom-heading transition-all"
                    data-ocid="step_nav.prev.button"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                )}
                {currentStep === 2 && (
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep(1)}
                    className="flex h-12 items-center gap-2 rounded-full border border-bloom-divider/50 px-5 font-sans text-sm font-medium text-bloom-subtle hover:border-bloom-blush/50"
                    data-ocid="step_nav.back_landing.button"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>
                )}
                {currentStep < 5 && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      if (currentStep === 2) {
                        setCurrentStep(3);
                      } else if (currentStep === 3) {
                        setCurrentStep(4);
                      } else if (currentStep === 4) {
                        handleCreate();
                        setCurrentStep(5);
                      }
                    }}
                    disabled={
                      (currentStep === 2 && selectedFlowers.length === 0) ||
                      (currentStep === 4 && (!canCreate || isGenerating))
                    }
                    className="flex-1 h-12 rounded-full bg-rose-500 font-sans text-base font-bold text-white shadow-lg transition-all hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-40"
                    data-ocid="step_nav.next.button"
                  >
                    {currentStep === 2 && "Next: Choose Greenery →"}
                    {currentStep === 3 && "Next: Add Message →"}
                    {currentStep === 4 &&
                      (isGenerating ? "Generating..." : "Generate Bouquet ❖")}
                  </motion.button>
                )}
                {currentStep === 5 && mergedImageUrl && (
                  <div className="flex flex-1 gap-2">
                    <a
                      href={mergedImageUrl}
                      download="my-petalnest-bouquet.jpg"
                      className="flex-1 flex items-center justify-center gap-2 h-12 rounded-full bg-bloom-blush font-sans text-sm font-bold text-white shadow-lg hover:bg-bloom-blush/85 transition-colors"
                      data-ocid="bouquet.mobile_download.button"
                    >
                      <Download className="h-4 w-4" /> Download
                    </a>
                    <Button
                      variant="outline"
                      onClick={handleShare}
                      className="flex-1 h-12 rounded-full border-bloom-gold/50 font-sans text-sm font-bold text-bloom-gold hover:bg-bloom-gold/10"
                      data-ocid="bouquet.mobile_share.button"
                    >
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                  </div>
                )}
              </div>
              {currentStep === 2 && selectedFlowers.length === 0 && (
                <p className="text-center font-sans text-xs text-bloom-subtle mt-2">
                  Select at least one flower to continue
                </p>
              )}
              {currentStep === 4 && !canCreate && (
                <p className="text-center font-sans text-xs text-bloom-subtle mt-2">
                  {selectedFlowers.length === 0
                    ? "Select at least one flower"
                    : "Write your message to continue"}
                </p>
              )}
            </div>
          )}

          {/* Floating panel only on steps 2 and 3 */}
          {(currentStep === 2 || currentStep === 3) && (
            <FloatingBouquetPanel
              selectedFlowers={selectedFlowers}
              selectedGreenery={selectedGreenery}
            />
          )}
        </>
      )}
    </div>
  );
}

// ─── GALLERY PAGE ─────────────────────────────────────────────────────────────

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function GalleryPage() {
  const { data: bouquets, isLoading } = useGetGalleryBouquets(50);
  usePageMeta(
    "Bouquet Gallery — PetalNest",
    "Browse beautiful custom bouquets created by our community. Get inspired and start designing your own.",
  );

  return (
    <div className="min-h-screen" style={{ position: "relative", zIndex: 2 }}>
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
              PetalNest
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="font-serif text-base text-bloom-subtle transition-colors hover:text-bloom-heading"
              style={{ fontWeight: 300 }}
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
              Bouquet Gallery
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
          <div className="flex flex-col items-center gap-4 py-24">
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
          <div className="flex flex-col items-center gap-6 py-24 text-center">
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
          >
            {bouquets.map((record, idx) => {
              const matchResult = matchBouquet(
                Array.from(record.flowers),
                Array.from(record.greenery),
              );
              if (!matchResult) return null;
              const matched = matchResult.entry;
              const label = [...record.flowers, ...record.greenery]
                .map(capitalize)
                .join(", ");
              return (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(idx * 0.05, 0.6),
                  }}
                  className="group overflow-hidden rounded-2xl bg-white/60 border border-bloom-divider/40 shadow-card hover:shadow-hero transition-all duration-300 hover:-translate-y-1"
                >
                  <Link to="/bouquet/$id" params={{ id: record.id }}>
                    <div className="aspect-[3/4] overflow-hidden bg-[#f5efe6]">
                      <img
                        src={matched.imageUrl}
                        alt={`Custom bouquet with ${label}`}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <p
                        className="font-serif text-xs text-bloom-subtle text-center leading-relaxed"
                        style={{ fontWeight: 300 }}
                      >
                        {label}
                      </p>
                    </div>
                  </Link>
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

// ─── VIEW PAGE ────────────────────────────────────────────────────────────────

function ViewPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const { data: bouquet, isLoading, isError } = useGetBouquet(id);
  const [mergedImageUrl, setMergedImageUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);

  const recipientName =
    new URLSearchParams(window.location.search).get("to") ?? "";

  useEffect(() => {
    if (!bouquet) return;
    setIsRendering(true);
    const matchResult = matchBouquet(bouquet.flowers, bouquet.greenery);
    if (!matchResult) {
      setIsRendering(false);
      return;
    }
    renderBouquetWithCard(matchResult.entry.imageUrl, bouquet.message)
      .then(setMergedImageUrl)
      .catch(console.error)
      .finally(() => setIsRendering(false));
  }, [bouquet]);

  usePageMeta(
    recipientName
      ? `A Bouquet for ${recipientName} — PetalNest`
      : "A Bouquet Made With Love — PetalNest",
    "Someone created a special bouquet just for you. View your personalized bouquet with a heartfelt message.",
  );
  useEffect(() => {
    if (!bouquet) return;
    const title = recipientName
      ? `A Bouquet for ${recipientName} — PetalNest`
      : "A Bouquet for You — PetalNest";
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
              PetalNest
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/gallery"
              className="font-serif text-base text-bloom-subtle transition-colors hover:text-bloom-heading"
              style={{ fontWeight: 300 }}
            >
              Gallery
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 font-serif text-sm text-bloom-subtle transition-colors hover:text-bloom-heading"
              style={{ fontWeight: 300 }}
            >
              <ArrowLeft className="h-4 w-4" /> Create
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1
            className="font-serif text-5xl text-bloom-heading"
            style={{ fontWeight: 600 }}
          >
            A Bouquet for You
          </h1>
          <DiamondDivider />
          {recipientName && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
        </motion.div>

        {isPageLoading && (
          <div className="flex flex-col items-center gap-4 py-24">
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
          <div className="flex flex-col items-center gap-6 py-24 text-center">
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
              className="rounded-full bg-bloom-blush px-8 py-3 font-sans text-sm font-semibold text-white shadow-card"
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
          >
            <div className="text-center">
              <p
                className="font-serif text-bloom-subtle text-base"
                style={{ fontStyle: "italic", fontWeight: 300 }}
              >
                A bouquet made for you
              </p>
              <h2 className="font-serif text-4xl font-semibold text-bloom-heading mt-1">
                Your Special Bouquet
              </h2>
              <DiamondDivider />
            </div>

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
                alt="Custom bouquet — a personalized floral creation made with PetalNest"
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
              >
                <Download className="h-4 w-4" /> Download Bouquet
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-bloom-gold/50 px-8 py-3 font-sans text-sm font-semibold text-bloom-gold transition-all hover:bg-bloom-gold/10"
              >
                Create Your Own ❖
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-3 p-4 rounded-2xl bg-white/60 border border-bloom-divider/40 backdrop-blur-sm w-full">
              <p className="w-full text-center font-serif text-sm text-bloom-subtle italic mb-2">
                Share this bouquet
              </p>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`I created this bouquet for you 💐 ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-white text-xs font-semibold hover:opacity-90"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I created this bouquet for you 💐")}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white text-xs font-semibold hover:opacity-90"
              >
                X / Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#1877F2] px-4 py-2 text-white text-xs font-semibold hover:opacity-90"
              >
                Facebook
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-2 rounded-full bg-bloom-gold/20 border border-bloom-gold/40 px-4 py-2 text-bloom-gold text-xs font-semibold hover:bg-bloom-gold/30"
              >
                Copy Link
              </button>
            </div>
          </motion.div>
        )}

        {!isRendering && !mergedImageUrl && bouquet && (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <span className="text-5xl">💐</span>
            <p className="font-serif text-lg text-bloom-subtle italic">
              This bouquet combination is no longer available.
            </p>
            <Link
              to="/"
              className="rounded-full bg-bloom-blush px-8 py-3 font-sans text-sm font-semibold text-white shadow-card"
            >
              Create Your Own Bouquet
            </Link>
          </div>
        )}

        {!isPageLoading && !isError && !mergedImageUrl && bouquet === null && (
          <div className="flex flex-col items-center gap-6 py-24 text-center">
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
              className="rounded-full bg-bloom-blush px-8 py-3 font-sans text-sm font-semibold text-white shadow-card"
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

// ─── LEGAL PAGES ──────────────────────────────────────────────────────────────

function LegalHeader() {
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
            PetalNest
          </span>
        </Link>
      </div>
    </header>
  );
}

function LegalPageShell({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <LegalHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center mb-12">
          <h1
            className="font-serif text-5xl text-bloom-heading"
            style={{ fontWeight: 300 }}
          >
            {title}
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
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy Policy">
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          1. What Data We Collect
        </h2>
        <p>
          PetalNest operates with minimal data collection. We store the content
          you input when creating a bouquet: your flower and greenery
          selections, the message text (including To and From fields), and the
          resulting bouquet image URL. No personal account information, email
          addresses, or payment credentials are stored on our servers.
        </p>
      </section>
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          2. How We Use Your Data
        </h2>
        <p>
          Bouquet data is stored solely to enable the public sharing feature at{" "}
          <code className="font-mono text-sm bg-bloom-blush/10 px-1 rounded">
            /view/:id
          </code>
          . This allows recipients to view bouquets sent to them. We do not use
          your data for advertising, profiling, or any commercial purpose beyond
          providing the service.
        </p>
      </section>
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          3. Data Retention
        </h2>
        <p>
          Bouquets are stored indefinitely to ensure shareable links remain
          valid. If you wish to have your bouquet removed, please contact us
          with the bouquet link. Premium unlock status is stored locally on your
          device using localStorage and is never transmitted to our servers.
        </p>
      </section>
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          4. Cookies &amp; Local Storage
        </h2>
        <p>
          PetalNest uses browser localStorage only to remember your premium
          unlock status (a simple true/false flag). No tracking cookies or
          third-party analytics are used. Clearing your browser data will reset
          your premium status.
        </p>
      </section>
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          5. Third Parties
        </h2>
        <p>
          Bouquet images are sourced from licensed stock photography providers.
          Payment processing is handled directly through your UPI application —
          PetalNest does not process or store payment information. Share links
          may be opened by third-party social platforms (WhatsApp, Facebook,
          etc.) subject to their own privacy policies.
        </p>
      </section>
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          6. Your Rights
        </h2>
        <p>
          You have the right to request deletion of any bouquet you created.
          Since PetalNest is anonymous, please provide the bouquet URL when
          contacting us. You may also clear your localStorage at any time to
          remove your premium status from your device.
        </p>
      </section>
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          7. Contact
        </h2>
        <p>
          For privacy-related queries, please reach out through any bouquet you
          have created, referencing the bouquet ID. We take privacy seriously
          and will respond to all reasonable requests.
        </p>
      </section>
    </LegalPageShell>
  );
}

function TermsPage() {
  return (
    <LegalPageShell title="Terms &amp; Conditions">
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing and using PetalNest, you accept and agree to be bound by
          these Terms and Conditions. If you do not agree to these terms, please
          do not use our service. PetalNest reserves the right to modify these
          terms at any time, and your continued use of the service constitutes
          acceptance of any changes.
        </p>
      </section>
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          2. Service Description
        </h2>
        <p>
          PetalNest is a web-based bouquet creation and gifting service that
          allows users to design virtual bouquets, attach personalised message
          cards, and share them with loved ones. The service provides
          photorealistic bouquet imagery for gifting purposes and operates on an
          anonymous, no-login basis.
        </p>
      </section>
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          3. User Conduct
        </h2>
        <p>
          You agree to use PetalNest only for lawful purposes and in a manner
          that does not infringe the rights of others. You must not use the
          service to send offensive, harmful, or inappropriate messages.
          PetalNest reserves the right to remove any content that violates these
          guidelines.
        </p>
      </section>
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          4. Payment Terms
        </h2>
        <p>
          Premium features are available for a one-time payment of ₹29 via UPI.
          Payment is processed directly through your UPI application using the
          provided UPI ID. This is a trust-based system — features are unlocked
          upon your confirmation of payment completion. There is no automatic
          verification at this time.
        </p>
      </section>
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          5. Intellectual Property
        </h2>
        <p>
          All bouquet imagery, design elements, and content on PetalNest are the
          property of PetalNest and its licensors. You may download and share
          bouquet images for personal gifting purposes only. Commercial use,
          reproduction, or redistribution without permission is prohibited.
        </p>
      </section>
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          6. Limitation of Liability
        </h2>
        <p>
          PetalNest is provided "as is" without warranties of any kind. We are
          not liable for any damages arising from the use or inability to use
          the service. Our total liability shall not exceed the amount paid by
          you for premium features (₹29).
        </p>
      </section>
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          7. Contact
        </h2>
        <p>
          For any questions about these Terms, please contact us via UPI
          transaction reference or reach out through our shared bouquet links.
          We are committed to resolving any concerns promptly and fairly.
        </p>
      </section>
    </LegalPageShell>
  );
}

function RefundPage() {
  return (
    <LegalPageShell title="Refund Policy">
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          1. Payment Nature
        </h2>
        <p>
          PetalNest's premium features are unlocked via a one-time UPI payment
          of ₹29. This is a trust-based system — you confirm payment completion
          in-app and features are instantly unlocked. PetalNest does not
          automatically verify UPI transactions at this time.
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
            A technical error prevented you from accessing any premium feature
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
          <li>You cleared browser data, removing your premium unlock status</li>
          <li>More than 24 hours have passed since payment</li>
          <li>
            The payment was made but the "I have completed payment" button was
            not clicked
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          4. How to Request a Refund
        </h2>
        <p>
          To request a refund, please provide your UPI transaction ID (UTR
          number), date and time of payment, and a description of the issue.
          Contact us via the UPI ID:{" "}
          <span className="font-semibold">8789829461-4@ybl</span>. We aim to
          resolve all refund requests within 3–5 business days.
        </p>
      </section>
      <section>
        <h2 className="text-2xl mb-3" style={{ fontWeight: 600 }}>
          5. Our Commitment
        </h2>
        <p>
          We believe in fairness. If you genuinely experienced a problem with
          our payment process, we will make it right. PetalNest is built on
          trust, and we stand behind that commitment.
        </p>
      </section>
    </LegalPageShell>
  );
}

// ─── ROUTER ───────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => (
    <>
      <PetalAnimation />
      <Outlet />
      <Toaster />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: BuilderPage,
});
const viewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/view/$id",
  component: ViewPage,
});
const bouquetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bouquet/$id",
  component: ViewPage,
});
const createBouquetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/create-bouquet",
  component: BuilderPage,
});
const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: GalleryPage,
});
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: TermsPage,
});
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: PrivacyPage,
});
const refundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/refund",
  component: RefundPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  createBouquetRoute,
  viewRoute,
  bouquetRoute,
  galleryRoute,
  termsRoute,
  privacyRoute,
  refundRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

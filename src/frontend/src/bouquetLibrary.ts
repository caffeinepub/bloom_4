export interface BouquetEntry {
  key: string;
  imageUrl: string;
  tags: string[];
  mood: string;
}

export const BOUQUET_LIBRARY: BouquetEntry[] = [
  {
    key: "romantic-rose-peony",
    imageUrl: "/assets/generated/bouquet-romantic-rose-peony.dim_800x1000.jpg",
    tags: ["rose", "rose (red)", "peony", "romantic"],
    mood: "romantic",
  },
  {
    key: "romantic-pink-ranunculus",
    imageUrl:
      "/assets/generated/bouquet-romantic-pink-ranunculus.dim_800x1000.jpg",
    tags: [
      "rose",
      "rose (pink)",
      "ranunculus",
      "baby's breath",
      "soft foliage",
      "romantic",
    ],
    mood: "romantic",
  },
  {
    key: "romantic-white-gardenia",
    imageUrl:
      "/assets/generated/bouquet-romantic-white-gardenia.dim_800x1000.jpg",
    tags: ["rose", "rose (white)", "gardenia", "filler stems", "elegant"],
    mood: "elegant",
  },
  {
    key: "elegant-lily-orchid",
    imageUrl: "/assets/generated/bouquet-elegant-lily-orchid.dim_800x1000.jpg",
    tags: ["lily", "orchid", "eucalyptus", "elegant"],
    mood: "elegant",
  },
  {
    key: "elegant-gardenia-hydrangea",
    imageUrl:
      "/assets/generated/bouquet-elegant-gardenia-hydrangea.dim_800x1000.jpg",
    tags: ["gardenia", "hydrangea", "eucalyptus", "elegant"],
    mood: "elegant",
  },
  {
    key: "bright-sunflower-daisy",
    imageUrl:
      "/assets/generated/bouquet-bright-sunflower-daisy.dim_800x1000.jpg",
    tags: ["sunflower", "daisy", "ornamental grasses", "bright", "cheerful"],
    mood: "bright",
  },
  {
    key: "bright-gerbera-marigold",
    imageUrl:
      "/assets/generated/bouquet-bright-gerbera-marigold.dim_800x1000.jpg",
    tags: ["gerbera", "marigold", "ornamental grasses", "bright"],
    mood: "bright",
  },
  {
    key: "soft-tulip-babysbreath",
    imageUrl:
      "/assets/generated/bouquet-soft-tulip-babysbreath.dim_800x1000.jpg",
    tags: ["tulip", "baby's breath", "soft foliage", "soft", "delicate"],
    mood: "soft",
  },
  {
    key: "soft-cherry-tulip",
    imageUrl: "/assets/generated/bouquet-soft-cherry-tulip.dim_800x1000.jpg",
    tags: ["cherry blossom", "tulip", "soft foliage", "soft", "spring"],
    mood: "soft",
  },
  {
    key: "bold-dahlia-carnation",
    imageUrl:
      "/assets/generated/bouquet-bold-dahlia-carnation.dim_800x1000.jpg",
    tags: ["dahlia", "carnation", "soft foliage", "bold", "dramatic"],
    mood: "bold",
  },
  {
    key: "bold-anemone-poppy",
    imageUrl: "/assets/generated/bouquet-bold-anemone-poppy.dim_800x1000.jpg",
    tags: ["anemone", "poppy", "filler stems", "bold", "wild"],
    mood: "bold",
  },
  {
    key: "wild-lavender-hydrangea",
    imageUrl:
      "/assets/generated/bouquet-wild-lavender-hydrangea.dim_800x1000.jpg",
    tags: ["lavender", "hydrangea", "ornamental grasses", "wild", "romantic"],
    mood: "wild",
  },
  {
    key: "spring-peony-tulip",
    imageUrl: "/assets/generated/bouquet-spring-peony-tulip.dim_800x1000.jpg",
    tags: [
      "peony",
      "tulip",
      "ranunculus",
      "filler stems",
      "spring",
      "romantic",
    ],
    mood: "romantic",
  },
  {
    key: "garden-rose-peony",
    imageUrl: "/assets/generated/bouquet-garden-rose-peony.dim_800x1000.jpg",
    tags: [
      "rose",
      "rose (red)",
      "rose (pink)",
      "rose (white)",
      "peony",
      "gardenia",
      "soft foliage",
      "romantic",
      "elegant",
    ],
    mood: "romantic",
  },
  {
    key: "classic-rose-carnation",
    imageUrl:
      "/assets/generated/bouquet-classic-rose-carnation.dim_800x1000.jpg",
    tags: ["rose", "rose (red)", "carnation", "lily", "eucalyptus", "classic"],
    mood: "classic",
  },
  {
    key: "romantic-dahlia-rose",
    imageUrl: "/assets/generated/bouquet-romantic-dahlia-rose.dim_800x1000.jpg",
    tags: ["dahlia", "rose", "rose (pink)", "filler stems", "romantic"],
    mood: "romantic",
  },
  {
    key: "mixed-hydrangea-babysbreath",
    imageUrl:
      "/assets/generated/bouquet-mixed-hydrangea-babysbreath.dim_800x1000.jpg",
    tags: ["hydrangea", "baby's breath", "soft foliage", "soft", "romantic"],
    mood: "soft",
  },
  {
    key: "spring-cherry-orchid",
    imageUrl: "/assets/generated/bouquet-spring-cherry-orchid.dim_800x1000.jpg",
    tags: ["cherry blossom", "orchid", "soft foliage", "spring", "elegant"],
    mood: "elegant",
  },
  {
    key: "bold-sunflower-dahlia",
    imageUrl:
      "/assets/generated/bouquet-bold-sunflower-dahlia.dim_800x1000.jpg",
    tags: ["sunflower", "dahlia", "ornamental grasses", "bold", "bright"],
    mood: "bold",
  },
];

export function matchBouquet(
  selectedFlowers: string[],
  selectedGreenery: string[],
): BouquetEntry {
  const allSelected = [...selectedFlowers, ...selectedGreenery].map((s) =>
    s.toLowerCase(),
  );

  let bestEntry = BOUQUET_LIBRARY[0];
  let bestScore = -1;

  for (const entry of BOUQUET_LIBRARY) {
    const score = allSelected.reduce((acc, sel) => {
      return (
        acc +
        (entry.tags.some((tag) => tag.includes(sel) || sel.includes(tag))
          ? 1
          : 0)
      );
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  return bestEntry;
}

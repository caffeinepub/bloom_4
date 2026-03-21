export interface BouquetEntry {
  id: string;
  key: string;
  imageUrl: string;
  flowerTags: string[];
  greeneryTags: string[];
  colorTheme: string;
  styleTag: string;
  tags: string[];
  mood: string;
}

function entry(
  id: string,
  imageUrl: string,
  flowerTags: string[],
  greeneryTags: string[],
  colorTheme: string,
  styleTag: string,
): BouquetEntry {
  return {
    id,
    key: id,
    imageUrl,
    flowerTags,
    greeneryTags,
    colorTheme,
    styleTag,
    tags: [...flowerTags, ...greeneryTags, styleTag],
    mood: styleTag,
  };
}

// All images are AI-generated in consistent premium studio style:
// - Soft warm beige background
// - Kraft paper wrap + satin ribbon
// - Centered, fully visible, no hands
// - Soft top-left diffused lighting
const IMG = {
  rosePeony: "/assets/generated/bouquet-romantic-rose-peony.dim_800x1067.jpg",
  pinkRanunculus:
    "/assets/generated/bouquet-romantic-pink-ranunculus.dim_800x1067.jpg",
  whiteGardenia:
    "/assets/generated/bouquet-romantic-white-gardenia.dim_800x1067.jpg",
  lilyOrchid: "/assets/generated/bouquet-elegant-lily-orchid.dim_800x1067.jpg",
  gardeniaHydrangea:
    "/assets/generated/bouquet-elegant-gardenia-hydrangea.dim_800x1067.jpg",
  sunflowerDaisy:
    "/assets/generated/bouquet-bright-sunflower-daisy.dim_800x1067.jpg",
  gerberaMarigold:
    "/assets/generated/bouquet-bright-gerbera-marigold.dim_800x1067.jpg",
  tulipBabysBreath:
    "/assets/generated/bouquet-soft-tulip-babysbreath.dim_800x1067.jpg",
  cherryTulip: "/assets/generated/bouquet-soft-cherry-tulip.dim_800x1067.jpg",
  dahliaCarnation:
    "/assets/generated/bouquet-bold-dahlia-carnation.dim_800x1067.jpg",
  anemonePoppy: "/assets/generated/bouquet-bold-anemone-poppy.dim_800x1067.jpg",
  lavenderHydrangea:
    "/assets/generated/bouquet-wild-lavender-hydrangea.dim_800x1067.jpg",
  peonyTulip: "/assets/generated/bouquet-spring-peony-tulip.dim_800x1067.jpg",
  gardenRosePeony:
    "/assets/generated/bouquet-garden-rose-peony.dim_800x1067.jpg",
  classicRoseCarnation:
    "/assets/generated/bouquet-classic-rose-carnation.dim_800x1067.jpg",
  dahliaRose: "/assets/generated/bouquet-romantic-dahlia-rose.dim_800x1067.jpg",
  hydrangeaBabys:
    "/assets/generated/bouquet-mixed-hydrangea-babysbreath.dim_800x1067.jpg",
  cherryOrchid:
    "/assets/generated/bouquet-spring-cherry-orchid.dim_800x1067.jpg",
  sunflowerDahlia:
    "/assets/generated/bouquet-bold-sunflower-dahlia.dim_800x1067.jpg",
};

export const BOUQUET_LIBRARY: BouquetEntry[] = [
  // ── Rose + Peony (7 variants)
  entry(
    "rp-01",
    IMG.rosePeony,
    ["rose (red)", "peony"],
    ["eucalyptus"],
    "red",
    "romantic",
  ),
  entry(
    "rp-02",
    IMG.rosePeony,
    ["rose (red)", "peony"],
    ["soft foliage", "fern"],
    "red",
    "romantic",
  ),
  entry(
    "rp-03",
    IMG.rosePeony,
    ["rose (red)", "peony"],
    ["eucalyptus", "filler stems"],
    "red",
    "romantic",
  ),
  entry(
    "rp-04",
    IMG.rosePeony,
    ["rose (pink)", "peony"],
    ["ruscus"],
    "pink",
    "romantic",
  ),
  entry(
    "rp-05",
    IMG.rosePeony,
    ["rose (red)", "rose (pink)", "peony"],
    ["eucalyptus", "ruscus"],
    "mixed",
    "romantic",
  ),
  entry(
    "rp-06",
    IMG.rosePeony,
    ["rose (red)", "peony"],
    ["fern"],
    "red",
    "romantic",
  ),
  entry(
    "rp-07",
    IMG.rosePeony,
    ["rose (pink)", "peony"],
    ["fern", "filler stems"],
    "pink",
    "soft",
  ),

  // ── Pink Ranunculus (6 variants)
  entry(
    "pr-01",
    IMG.pinkRanunculus,
    ["rose (pink)", "ranunculus", "baby's breath"],
    ["ruscus"],
    "pink",
    "romantic",
  ),
  entry(
    "pr-02",
    IMG.pinkRanunculus,
    ["rose (pink)", "ranunculus"],
    ["filler stems"],
    "pink",
    "soft",
  ),
  entry(
    "pr-03",
    IMG.pinkRanunculus,
    ["ranunculus", "baby's breath"],
    ["fern", "filler stems"],
    "pink",
    "soft",
  ),
  entry(
    "pr-04",
    IMG.pinkRanunculus,
    ["rose (pink)", "ranunculus", "baby's breath"],
    ["eucalyptus"],
    "pink",
    "romantic",
  ),
  entry(
    "pr-05",
    IMG.pinkRanunculus,
    ["ranunculus", "rose (pink)"],
    ["ruscus"],
    "pink",
    "elegant",
  ),
  entry(
    "pr-06",
    IMG.pinkRanunculus,
    ["ranunculus"],
    ["eucalyptus", "fern"],
    "pink",
    "romantic",
  ),

  // ── White Gardenia (5 variants)
  entry(
    "wg-01",
    IMG.whiteGardenia,
    ["rose (white)", "gardenia"],
    ["filler stems"],
    "white",
    "elegant",
  ),
  entry(
    "wg-02",
    IMG.whiteGardenia,
    ["rose (white)", "gardenia"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "wg-03",
    IMG.whiteGardenia,
    ["gardenia", "rose (white)"],
    ["ruscus", "filler stems"],
    "white",
    "romantic",
  ),
  entry(
    "wg-04",
    IMG.whiteGardenia,
    ["rose (white)", "gardenia"],
    ["eucalyptus", "ruscus"],
    "white",
    "elegant",
  ),
  entry(
    "wg-05",
    IMG.whiteGardenia,
    ["gardenia"],
    ["fern", "eucalyptus"],
    "white",
    "elegant",
  ),

  // ── Lily + Orchid (5 variants)
  entry(
    "lo-01",
    IMG.lilyOrchid,
    ["lily", "orchid"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "lo-02",
    IMG.lilyOrchid,
    ["lily", "orchid"],
    ["ruscus"],
    "white",
    "elegant",
  ),
  entry(
    "lo-03",
    IMG.lilyOrchid,
    ["lily", "orchid"],
    ["filler stems", "eucalyptus"],
    "white",
    "elegant",
  ),
  entry("lo-04", IMG.lilyOrchid, ["orchid", "lily"], ["fern"], "white", "bold"),
  entry(
    "lo-05",
    IMG.lilyOrchid,
    ["lily"],
    ["ruscus", "fern"],
    "white",
    "elegant",
  ),

  // ── Jasmine (6 variants)
  entry(
    "ja-01",
    IMG.whiteGardenia,
    ["jasmine", "rose (white)"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "ja-02",
    IMG.whiteGardenia,
    ["jasmine", "gardenia"],
    ["ruscus"],
    "white",
    "romantic",
  ),
  entry(
    "ja-03",
    IMG.lilyOrchid,
    ["jasmine", "lily"],
    ["fern"],
    "white",
    "elegant",
  ),
  entry(
    "ja-04",
    IMG.lilyOrchid,
    ["jasmine", "orchid"],
    ["eucalyptus", "ruscus"],
    "white",
    "elegant",
  ),
  entry(
    "ja-05",
    IMG.whiteGardenia,
    ["jasmine", "rose (pink)"],
    ["filler stems"],
    "pink",
    "romantic",
  ),
  entry(
    "ja-06",
    IMG.cherryOrchid,
    ["jasmine", "cherry blossom"],
    ["ruscus", "fern"],
    "pink",
    "soft",
  ),

  // ── Gardenia + Hydrangea (5 variants)
  entry(
    "gh-01",
    IMG.gardeniaHydrangea,
    ["gardenia", "hydrangea"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "gh-02",
    IMG.gardeniaHydrangea,
    ["gardenia", "hydrangea"],
    ["ruscus"],
    "white",
    "elegant",
  ),
  entry(
    "gh-03",
    IMG.gardeniaHydrangea,
    ["hydrangea", "gardenia"],
    ["filler stems", "fern"],
    "purple",
    "soft",
  ),
  entry(
    "gh-04",
    IMG.gardeniaHydrangea,
    ["gardenia", "hydrangea"],
    ["eucalyptus", "filler stems"],
    "white",
    "elegant",
  ),
  entry(
    "gh-05",
    IMG.gardeniaHydrangea,
    ["hydrangea"],
    ["ruscus", "eucalyptus"],
    "purple",
    "soft",
  ),

  // ── Sunflower + Daisy (4 variants)
  entry(
    "sd-01",
    IMG.sunflowerDaisy,
    ["sunflower", "daisy"],
    ["fern"],
    "yellow",
    "bright",
  ),
  entry(
    "sd-02",
    IMG.sunflowerDaisy,
    ["sunflower", "daisy"],
    ["filler stems"],
    "yellow",
    "bright",
  ),
  entry(
    "sd-03",
    IMG.sunflowerDaisy,
    ["sunflower", "daisy"],
    ["ruscus", "fern"],
    "yellow",
    "bright",
  ),
  entry(
    "sd-04",
    IMG.sunflowerDaisy,
    ["daisy", "sunflower"],
    ["eucalyptus"],
    "yellow",
    "bold",
  ),

  // ── Gerbera + Marigold (4 variants)
  entry(
    "gm-01",
    IMG.gerberaMarigold,
    ["gerbera", "marigold"],
    ["fern"],
    "yellow",
    "bright",
  ),
  entry(
    "gm-02",
    IMG.gerberaMarigold,
    ["gerbera", "marigold"],
    ["filler stems"],
    "yellow",
    "bright",
  ),
  entry(
    "gm-03",
    IMG.gerberaMarigold,
    ["marigold", "gerbera"],
    ["ruscus", "fern"],
    "yellow",
    "bold",
  ),
  entry(
    "gm-04",
    IMG.gerberaMarigold,
    ["gerbera", "marigold"],
    ["eucalyptus"],
    "yellow",
    "bright",
  ),

  // ── Tulip + Baby's Breath (4 variants)
  entry(
    "tb-01",
    IMG.tulipBabysBreath,
    ["tulip", "baby's breath"],
    ["ruscus"],
    "pink",
    "soft",
  ),
  entry(
    "tb-02",
    IMG.tulipBabysBreath,
    ["tulip", "baby's breath"],
    ["filler stems"],
    "pink",
    "soft",
  ),
  entry(
    "tb-03",
    IMG.tulipBabysBreath,
    ["baby's breath", "tulip"],
    ["eucalyptus"],
    "white",
    "soft",
  ),
  entry(
    "tb-04",
    IMG.tulipBabysBreath,
    ["tulip", "baby's breath"],
    ["fern", "filler stems"],
    "pink",
    "romantic",
  ),

  // ── Cherry Blossom + Tulip (4 variants)
  entry(
    "ct-01",
    IMG.cherryTulip,
    ["cherry blossom", "tulip"],
    ["ruscus"],
    "pink",
    "soft",
  ),
  entry(
    "ct-02",
    IMG.cherryTulip,
    ["cherry blossom", "tulip"],
    ["filler stems"],
    "pink",
    "soft",
  ),
  entry(
    "ct-03",
    IMG.cherryTulip,
    ["tulip", "cherry blossom"],
    ["eucalyptus", "fern"],
    "pink",
    "romantic",
  ),
  entry(
    "ct-04",
    IMG.cherryTulip,
    ["cherry blossom", "tulip"],
    ["ruscus", "fern"],
    "pink",
    "wild",
  ),

  // ── Dahlia + Carnation (4 variants)
  entry(
    "dc-01",
    IMG.dahliaCarnation,
    ["dahlia", "carnation"],
    ["ruscus"],
    "mixed",
    "bold",
  ),
  entry(
    "dc-02",
    IMG.dahliaCarnation,
    ["dahlia", "carnation"],
    ["eucalyptus"],
    "red",
    "bold",
  ),
  entry(
    "dc-03",
    IMG.dahliaCarnation,
    ["carnation", "dahlia"],
    ["filler stems", "fern"],
    "mixed",
    "bold",
  ),
  entry(
    "dc-04",
    IMG.dahliaCarnation,
    ["dahlia", "carnation"],
    ["ruscus", "eucalyptus"],
    "red",
    "wild",
  ),

  // ── Anemone + Poppy (4 variants)
  entry(
    "ap-01",
    IMG.anemonePoppy,
    ["anemone", "poppy"],
    ["filler stems"],
    "purple",
    "bold",
  ),
  entry(
    "ap-02",
    IMG.anemonePoppy,
    ["anemone", "poppy"],
    ["ruscus"],
    "red",
    "wild",
  ),
  entry(
    "ap-03",
    IMG.anemonePoppy,
    ["poppy", "anemone"],
    ["fern"],
    "purple",
    "bold",
  ),
  entry(
    "ap-04",
    IMG.anemonePoppy,
    ["anemone", "poppy"],
    ["eucalyptus", "filler stems"],
    "mixed",
    "wild",
  ),

  // ── Lavender + Hydrangea (4 variants)
  entry(
    "lh-01",
    IMG.lavenderHydrangea,
    ["lavender", "hydrangea"],
    ["ruscus"],
    "purple",
    "wild",
  ),
  entry(
    "lh-02",
    IMG.lavenderHydrangea,
    ["lavender", "hydrangea"],
    ["fern"],
    "purple",
    "romantic",
  ),
  entry(
    "lh-03",
    IMG.lavenderHydrangea,
    ["hydrangea", "lavender"],
    ["filler stems"],
    "purple",
    "wild",
  ),
  entry(
    "lh-04",
    IMG.lavenderHydrangea,
    ["lavender", "hydrangea"],
    ["eucalyptus", "ruscus"],
    "purple",
    "wild",
  ),

  // ── Peony + Tulip + Ranunculus (4 variants)
  entry(
    "ptr-01",
    IMG.peonyTulip,
    ["peony", "tulip", "ranunculus"],
    ["filler stems"],
    "pink",
    "romantic",
  ),
  entry(
    "ptr-02",
    IMG.peonyTulip,
    ["peony", "tulip"],
    ["ruscus", "filler stems"],
    "pink",
    "soft",
  ),
  entry(
    "ptr-03",
    IMG.peonyTulip,
    ["ranunculus", "peony", "tulip"],
    ["eucalyptus"],
    "pink",
    "romantic",
  ),
  entry(
    "ptr-04",
    IMG.peonyTulip,
    ["peony", "tulip", "ranunculus"],
    ["fern"],
    "pink",
    "elegant",
  ),

  // ── Garden Rose + Peony (4 variants)
  entry(
    "grp-01",
    IMG.gardenRosePeony,
    ["rose (red)", "rose (pink)", "rose (white)", "peony", "gardenia"],
    ["ruscus"],
    "mixed",
    "romantic",
  ),
  entry(
    "grp-02",
    IMG.gardenRosePeony,
    ["rose (red)", "rose (pink)", "peony"],
    ["eucalyptus", "fern"],
    "mixed",
    "elegant",
  ),
  entry(
    "grp-03",
    IMG.gardenRosePeony,
    ["rose (white)", "peony", "gardenia"],
    ["filler stems"],
    "white",
    "elegant",
  ),
  entry(
    "grp-04",
    IMG.gardenRosePeony,
    ["rose (red)", "rose (pink)", "rose (white)", "peony"],
    ["eucalyptus"],
    "mixed",
    "romantic",
  ),

  // ── Classic Rose + Carnation (4 variants)
  entry(
    "rc-01",
    IMG.classicRoseCarnation,
    ["rose (red)", "carnation", "lily"],
    ["eucalyptus"],
    "red",
    "elegant",
  ),
  entry(
    "rc-02",
    IMG.classicRoseCarnation,
    ["rose (red)", "carnation"],
    ["ruscus"],
    "red",
    "bold",
  ),
  entry(
    "rc-03",
    IMG.classicRoseCarnation,
    ["carnation", "lily", "rose (red)"],
    ["filler stems", "eucalyptus"],
    "red",
    "elegant",
  ),
  entry(
    "rc-04",
    IMG.classicRoseCarnation,
    ["rose (red)", "carnation", "lily"],
    ["fern"],
    "red",
    "bold",
  ),

  // ── Dahlia + Rose Pink (4 variants)
  entry(
    "dr-01",
    IMG.dahliaRose,
    ["dahlia", "rose (pink)"],
    ["filler stems"],
    "mixed",
    "romantic",
  ),
  entry(
    "dr-02",
    IMG.dahliaRose,
    ["dahlia", "rose (pink)"],
    ["ruscus"],
    "pink",
    "romantic",
  ),
  entry(
    "dr-03",
    IMG.dahliaRose,
    ["rose (pink)", "dahlia"],
    ["eucalyptus", "filler stems"],
    "pink",
    "bold",
  ),
  entry(
    "dr-04",
    IMG.dahliaRose,
    ["dahlia", "rose (pink)"],
    ["fern"],
    "mixed",
    "wild",
  ),

  // ── Hydrangea + Baby's Breath (4 variants)
  entry(
    "hb-01",
    IMG.hydrangeaBabys,
    ["hydrangea", "baby's breath"],
    ["ruscus"],
    "purple",
    "soft",
  ),
  entry(
    "hb-02",
    IMG.hydrangeaBabys,
    ["hydrangea", "baby's breath"],
    ["filler stems"],
    "white",
    "romantic",
  ),
  entry(
    "hb-03",
    IMG.hydrangeaBabys,
    ["baby's breath", "hydrangea"],
    ["eucalyptus", "fern"],
    "purple",
    "soft",
  ),
  entry(
    "hb-04",
    IMG.hydrangeaBabys,
    ["hydrangea", "baby's breath"],
    ["ruscus", "fern"],
    "purple",
    "wild",
  ),

  // ── Cherry Blossom + Orchid (4 variants)
  entry(
    "co-01",
    IMG.cherryOrchid,
    ["cherry blossom", "orchid"],
    ["ruscus"],
    "pink",
    "elegant",
  ),
  entry(
    "co-02",
    IMG.cherryOrchid,
    ["cherry blossom", "orchid"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "co-03",
    IMG.cherryOrchid,
    ["orchid", "cherry blossom"],
    ["filler stems", "fern"],
    "pink",
    "romantic",
  ),
  entry(
    "co-04",
    IMG.cherryOrchid,
    ["cherry blossom", "orchid"],
    ["ruscus", "fern"],
    "pink",
    "wild",
  ),

  // ── Sunflower + Dahlia (4 variants)
  entry(
    "sda-01",
    IMG.sunflowerDahlia,
    ["sunflower", "dahlia"],
    ["ruscus"],
    "yellow",
    "bold",
  ),
  entry(
    "sda-02",
    IMG.sunflowerDahlia,
    ["sunflower", "dahlia"],
    ["filler stems"],
    "yellow",
    "bright",
  ),
  entry(
    "sda-03",
    IMG.sunflowerDahlia,
    ["dahlia", "sunflower"],
    ["fern", "ruscus"],
    "mixed",
    "bold",
  ),
  entry(
    "sda-04",
    IMG.sunflowerDahlia,
    ["sunflower", "dahlia"],
    ["eucalyptus"],
    "yellow",
    "wild",
  ),

  // ── Jasmine + Peony
  entry(
    "jp-01",
    IMG.peonyTulip,
    ["jasmine", "peony"],
    ["eucalyptus"],
    "pink",
    "romantic",
  ),
  entry(
    "jp-02",
    IMG.peonyTulip,
    ["jasmine", "peony", "ranunculus"],
    ["ruscus"],
    "pink",
    "elegant",
  ),
  entry(
    "jp-03",
    IMG.rosePeony,
    ["jasmine", "peony", "rose (white)"],
    ["fern", "eucalyptus"],
    "white",
    "romantic",
  ),

  // ── Anemone premium combos
  entry(
    "an-01",
    IMG.anemonePoppy,
    ["anemone", "ranunculus"],
    ["eucalyptus", "ruscus"],
    "purple",
    "bold",
  ),
  entry(
    "an-02",
    IMG.lavenderHydrangea,
    ["anemone", "hydrangea"],
    ["fern"],
    "purple",
    "wild",
  ),
  entry(
    "an-03",
    IMG.anemonePoppy,
    ["anemone", "dahlia"],
    ["ruscus", "filler stems"],
    "mixed",
    "bold",
  ),

  // ── Orchid premium
  entry(
    "or-01",
    IMG.lilyOrchid,
    ["orchid", "jasmine"],
    ["ruscus", "eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "or-02",
    IMG.lilyOrchid,
    ["orchid", "gardenia"],
    ["fern"],
    "white",
    "elegant",
  ),

  // ── Lily premium combos
  entry(
    "ly-01",
    IMG.lilyOrchid,
    ["lily", "jasmine", "gardenia"],
    ["eucalyptus", "fern"],
    "white",
    "elegant",
  ),
  entry(
    "ly-02",
    IMG.classicRoseCarnation,
    ["lily", "rose (white)"],
    ["ruscus"],
    "white",
    "elegant",
  ),
  entry(
    "ly-03",
    IMG.whiteGardenia,
    ["lily", "gardenia"],
    ["fern", "filler stems"],
    "white",
    "romantic",
  ),

  // ── Sweet Pea + Camellia
  entry(
    "sp-01",
    IMG.pinkRanunculus,
    ["sweet pea", "camellia"],
    ["myrtle"],
    "pink",
    "romantic",
  ),
  entry(
    "sp-02",
    IMG.peonyTulip,
    ["sweet pea", "peony"],
    ["salal"],
    "pink",
    "soft",
  ),
  entry(
    "sp-03",
    IMG.rosePeony,
    ["camellia", "rose (pink)"],
    ["eucalyptus"],
    "pink",
    "romantic",
  ),
  entry(
    "sp-04",
    IMG.pinkRanunculus,
    ["sweet pea", "ranunculus"],
    ["dusty miller"],
    "pink",
    "soft",
  ),

  // ── Freesia + Lisianthus
  entry(
    "fl-01",
    IMG.whiteGardenia,
    ["freesia", "lisianthus"],
    ["pittosporum"],
    "white",
    "elegant",
  ),
  entry(
    "fl-02",
    IMG.lilyOrchid,
    ["freesia", "orchid"],
    ["myrtle"],
    "white",
    "elegant",
  ),
  entry(
    "fl-03",
    IMG.whiteGardenia,
    ["lisianthus", "gardenia"],
    ["salal"],
    "purple",
    "elegant",
  ),
  entry(
    "fl-04",
    IMG.lilyOrchid,
    ["freesia", "lisianthus", "lily"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),

  // ── Magnolia
  entry(
    "mg-01",
    IMG.whiteGardenia,
    ["magnolia", "gardenia"],
    ["pittosporum"],
    "white",
    "elegant",
  ),
  entry(
    "mg-02",
    IMG.lilyOrchid,
    ["magnolia", "orchid"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "mg-03",
    IMG.whiteGardenia,
    ["magnolia", "rose (white)"],
    ["myrtle", "salal"],
    "white",
    "romantic",
  ),

  // ── Cosmos + Snapdragon
  entry(
    "cs-01",
    IMG.sunflowerDaisy,
    ["cosmos", "snapdragon"],
    ["filler stems"],
    "mixed",
    "bright",
  ),
  entry(
    "cs-02",
    IMG.gerberaMarigold,
    ["cosmos", "gerbera"],
    ["dusty miller"],
    "pink",
    "bright",
  ),
  entry(
    "cs-03",
    IMG.sunflowerDaisy,
    ["snapdragon", "daisy"],
    ["salal"],
    "mixed",
    "bold",
  ),
  entry(
    "cs-04",
    IMG.gerberaMarigold,
    ["cosmos", "snapdragon", "marigold"],
    ["pittosporum"],
    "mixed",
    "bright",
  ),

  // ── Iris + Wisteria + Protea
  entry(
    "iw-01",
    IMG.lavenderHydrangea,
    ["iris", "wisteria"],
    ["myrtle"],
    "purple",
    "wild",
  ),
  entry(
    "iw-02",
    IMG.anemonePoppy,
    ["iris", "anemone"],
    ["salal"],
    "purple",
    "bold",
  ),
  entry(
    "iw-03",
    IMG.lavenderHydrangea,
    ["wisteria", "lavender"],
    ["dusty miller"],
    "purple",
    "romantic",
  ),
  entry(
    "iw-04",
    IMG.rosePeony,
    ["protea", "rose (pink)"],
    ["eucalyptus", "pittosporum"],
    "pink",
    "bold",
  ),
  entry(
    "iw-05",
    IMG.anemonePoppy,
    ["protea", "dahlia"],
    ["salal", "ruscus"],
    "mixed",
    "wild",
  ),
  entry(
    "iw-06",
    IMG.lavenderHydrangea,
    ["iris", "hydrangea", "wisteria"],
    ["myrtle", "fern"],
    "purple",
    "wild",
  ),

  // ── NEW 50 COMBINATIONS ──────────────────────────────────────────

  // Protea expanded (5)
  entry(
    "pt-01",
    IMG.sunflowerDahlia,
    ["protea", "sunflower"],
    ["fern"],
    "yellow",
    "bold",
  ),
  entry(
    "pt-02",
    IMG.gerberaMarigold,
    ["protea", "marigold"],
    ["dusty miller"],
    "mixed",
    "bright",
  ),
  entry(
    "pt-03",
    IMG.dahliaCarnation,
    ["protea", "carnation"],
    ["pittosporum"],
    "mixed",
    "bold",
  ),
  entry(
    "pt-04",
    IMG.classicRoseCarnation,
    ["protea", "rose (red)"],
    ["salal"],
    "red",
    "bold",
  ),
  entry(
    "pt-05",
    IMG.lavenderHydrangea,
    ["protea", "lavender"],
    ["myrtle"],
    "purple",
    "wild",
  ),

  // Iris expanded (5)
  entry(
    "ir-01",
    IMG.lilyOrchid,
    ["iris", "lily"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "ir-02",
    IMG.rosePeony,
    ["iris", "rose (pink)"],
    ["pittosporum"],
    "pink",
    "romantic",
  ),
  entry(
    "ir-03",
    IMG.pinkRanunculus,
    ["iris", "ranunculus"],
    ["ruscus"],
    "pink",
    "elegant",
  ),
  entry(
    "ir-04",
    IMG.peonyTulip,
    ["iris", "peony"],
    ["salal"],
    "pink",
    "romantic",
  ),
  entry(
    "ir-05",
    IMG.tulipBabysBreath,
    ["iris", "tulip"],
    ["myrtle"],
    "pink",
    "soft",
  ),

  // Wisteria expanded (3)
  entry(
    "wi-01",
    IMG.cherryOrchid,
    ["wisteria", "cherry blossom"],
    ["filler stems"],
    "pink",
    "soft",
  ),
  entry(
    "wi-02",
    IMG.lilyOrchid,
    ["wisteria", "orchid"],
    ["salal"],
    "white",
    "elegant",
  ),
  entry(
    "wi-03",
    IMG.hydrangeaBabys,
    ["wisteria", "baby's breath"],
    ["dusty miller"],
    "white",
    "soft",
  ),

  // Cosmos expanded (3)
  entry(
    "cm-01",
    IMG.pinkRanunculus,
    ["cosmos", "rose (pink)"],
    ["filler stems"],
    "pink",
    "soft",
  ),
  entry(
    "cm-02",
    IMG.tulipBabysBreath,
    ["cosmos", "tulip"],
    ["salal"],
    "pink",
    "soft",
  ),
  entry(
    "cm-03",
    IMG.cherryOrchid,
    ["cosmos", "cherry blossom"],
    ["pittosporum"],
    "pink",
    "romantic",
  ),

  // Snapdragon expanded (3)
  entry(
    "sn-01",
    IMG.peonyTulip,
    ["snapdragon", "peony"],
    ["ruscus"],
    "pink",
    "romantic",
  ),
  entry(
    "sn-02",
    IMG.classicRoseCarnation,
    ["snapdragon", "rose (red)"],
    ["eucalyptus"],
    "red",
    "bold",
  ),
  entry(
    "sn-03",
    IMG.lilyOrchid,
    ["snapdragon", "orchid"],
    ["myrtle"],
    "white",
    "elegant",
  ),

  // Camellia expanded (4)
  entry(
    "ca-01",
    IMG.peonyTulip,
    ["camellia", "peony"],
    ["fern"],
    "pink",
    "romantic",
  ),
  entry(
    "ca-02",
    IMG.lilyOrchid,
    ["camellia", "lily"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "ca-03",
    IMG.tulipBabysBreath,
    ["camellia", "tulip"],
    ["salal"],
    "pink",
    "soft",
  ),
  entry(
    "ca-04",
    IMG.whiteGardenia,
    ["camellia", "rose (white)"],
    ["pittosporum"],
    "white",
    "elegant",
  ),

  // Sweet Pea expanded (4)
  entry(
    "sw-01",
    IMG.tulipBabysBreath,
    ["sweet pea", "tulip"],
    ["myrtle"],
    "pink",
    "soft",
  ),
  entry(
    "sw-02",
    IMG.lilyOrchid,
    ["sweet pea", "lily"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "sw-03",
    IMG.whiteGardenia,
    ["sweet pea", "rose (white)"],
    ["salal"],
    "white",
    "elegant",
  ),
  entry(
    "sw-04",
    IMG.hydrangeaBabys,
    ["sweet pea", "baby's breath"],
    ["filler stems"],
    "white",
    "soft",
  ),

  // Freesia expanded (3)
  entry(
    "fr-01",
    IMG.peonyTulip,
    ["freesia", "peony"],
    ["ruscus"],
    "pink",
    "romantic",
  ),
  entry(
    "fr-02",
    IMG.pinkRanunculus,
    ["freesia", "ranunculus"],
    ["dusty miller"],
    "pink",
    "soft",
  ),
  entry(
    "fr-03",
    IMG.tulipBabysBreath,
    ["freesia", "tulip"],
    ["filler stems"],
    "pink",
    "soft",
  ),

  // Lisianthus expanded (3)
  entry(
    "li-01",
    IMG.peonyTulip,
    ["lisianthus", "peony"],
    ["eucalyptus"],
    "pink",
    "romantic",
  ),
  entry(
    "li-02",
    IMG.whiteGardenia,
    ["lisianthus", "rose (white)"],
    ["myrtle"],
    "white",
    "elegant",
  ),
  entry(
    "li-03",
    IMG.lilyOrchid,
    ["lisianthus", "orchid"],
    ["pittosporum"],
    "purple",
    "elegant",
  ),

  // Magnolia expanded (3)
  entry(
    "ma-01",
    IMG.lilyOrchid,
    ["magnolia", "lily"],
    ["fern"],
    "white",
    "elegant",
  ),
  entry(
    "ma-02",
    IMG.peonyTulip,
    ["magnolia", "peony"],
    ["salal"],
    "pink",
    "romantic",
  ),
  entry(
    "ma-03",
    IMG.pinkRanunculus,
    ["magnolia", "rose (pink)"],
    ["ruscus"],
    "pink",
    "romantic",
  ),

  // Multi-flower premium combos (7)
  entry(
    "mx-01",
    IMG.peonyTulip,
    ["sweet pea", "camellia", "peony"],
    ["myrtle"],
    "pink",
    "romantic",
  ),
  entry(
    "mx-02",
    IMG.lilyOrchid,
    ["freesia", "lisianthus", "magnolia"],
    ["salal"],
    "white",
    "elegant",
  ),
  entry(
    "mx-03",
    IMG.sunflowerDaisy,
    ["cosmos", "snapdragon", "daisy"],
    ["dusty miller"],
    "mixed",
    "bright",
  ),
  entry(
    "mx-04",
    IMG.lavenderHydrangea,
    ["iris", "wisteria", "lavender"],
    ["myrtle"],
    "purple",
    "wild",
  ),
  entry(
    "mx-05",
    IMG.anemonePoppy,
    ["protea", "anemone", "ranunculus"],
    ["pittosporum"],
    "purple",
    "bold",
  ),
  entry(
    "mx-06",
    IMG.whiteGardenia,
    ["camellia", "jasmine", "gardenia"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "mx-07",
    IMG.cherryTulip,
    ["sweet pea", "rose (pink)", "tulip"],
    ["filler stems"],
    "pink",
    "romantic",
  ),

  // Mixed wild/bold combos (7)
  entry(
    "wb-01",
    IMG.lavenderHydrangea,
    ["anemone", "iris"],
    ["fern"],
    "purple",
    "wild",
  ),
  entry(
    "wb-02",
    IMG.lavenderHydrangea,
    ["lavender", "cosmos"],
    ["dusty miller"],
    "purple",
    "soft",
  ),
  entry(
    "wb-03",
    IMG.anemonePoppy,
    ["poppy", "snapdragon"],
    ["salal"],
    "red",
    "bold",
  ),
  entry(
    "wb-04",
    IMG.dahliaCarnation,
    ["dahlia", "protea"],
    ["pittosporum"],
    "mixed",
    "bold",
  ),
  entry(
    "wb-05",
    IMG.sunflowerDaisy,
    ["sunflower", "snapdragon"],
    ["myrtle"],
    "yellow",
    "bright",
  ),
  entry(
    "wb-06",
    IMG.hydrangeaBabys,
    ["sweet pea", "hydrangea"],
    ["salal"],
    "purple",
    "soft",
  ),
  entry(
    "wb-07",
    IMG.cherryOrchid,
    ["cosmos", "cherry blossom", "orchid"],
    ["myrtle"],
    "pink",
    "elegant",
  ),

  // Premium Collection entries (12 combinations)
  entry("pm-01", IMG.rosePeony, ["lotus"], ["eucalyptus"], "pink", "elegant"),
  entry(
    "pm-02",
    IMG.dahliaCarnation,
    ["black dahlia"],
    ["ruscus"],
    "mixed",
    "bold",
  ),
  entry(
    "pm-03",
    IMG.lavenderHydrangea,
    ["blue delphinium"],
    ["fern"],
    "purple",
    "elegant",
  ),
  entry(
    "pm-04",
    IMG.pinkRanunculus,
    ["bleeding heart"],
    ["filler stems"],
    "pink",
    "romantic",
  ),
  entry(
    "pm-05",
    IMG.rosePeony,
    ["hellebore"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "pm-06",
    IMG.dahliaCarnation,
    ["chocolate cosmos"],
    ["salal"],
    "mixed",
    "bold",
  ),
  entry(
    "pm-07",
    IMG.rosePeony,
    ["lotus", "rose (pink)"],
    ["eucalyptus", "filler stems"],
    "pink",
    "elegant",
  ),
  entry(
    "pm-08",
    IMG.lavenderHydrangea,
    ["blue delphinium", "lavender"],
    ["myrtle"],
    "purple",
    "wild",
  ),
  entry(
    "pm-09",
    IMG.dahliaCarnation,
    ["black dahlia", "chocolate cosmos"],
    ["pittosporum"],
    "mixed",
    "bold",
  ),
  entry(
    "pm-10",
    IMG.pinkRanunculus,
    ["bleeding heart", "hellebore"],
    ["ruscus"],
    "pink",
    "soft",
  ),
  entry(
    "pm-11",
    IMG.rosePeony,
    ["lotus", "orchid"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "pm-12",
    IMG.anemonePoppy,
    ["blue delphinium", "anemone"],
    ["fern"],
    "purple",
    "bold",
  ),
];

const COLOR_MAP: Record<string, string> = {
  "rose (red)": "red",
  "rose (pink)": "pink",
  "rose (white)": "white",
  peony: "pink",
  ranunculus: "pink",
  dahlia: "mixed",
  tulip: "pink",
  lily: "white",
  orchid: "white",
  gardenia: "white",
  carnation: "red",
  sunflower: "yellow",
  daisy: "white",
  gerbera: "yellow",
  marigold: "yellow",
  poppy: "red",
  anemone: "purple",
  lavender: "purple",
  hydrangea: "purple",
  "baby's breath": "white",
  "cherry blossom": "pink",
  jasmine: "white",
  "sweet pea": "pink",
  camellia: "pink",
  freesia: "yellow",
  lisianthus: "purple",
  magnolia: "white",
  cosmos: "pink",
  snapdragon: "mixed",
  iris: "purple",
  wisteria: "purple",
  protea: "pink",
  lotus: "pink",
  "black dahlia": "mixed",
  "blue delphinium": "purple",
  "bleeding heart": "pink",
  hellebore: "white",
  "chocolate cosmos": "mixed",
};

export function matchBouquet(
  selectedFlowers: string[],
  selectedGreenery: string[],
): BouquetEntry {
  const normFlowers = selectedFlowers.map((f) => f.toLowerCase());
  const normGreenery = selectedGreenery.map((g) => g.toLowerCase());

  const inferredColors = [
    ...new Set(normFlowers.map((f) => COLOR_MAP[f] || "mixed")),
  ];

  let best = BOUQUET_LIBRARY[0];
  let bestScore = -1;

  for (const e of BOUQUET_LIBRARY) {
    let score = 0;
    for (const f of normFlowers) {
      if (
        e.flowerTags.some(
          (t) =>
            t.toLowerCase() === f ||
            t.toLowerCase().includes(f) ||
            f.includes(t.toLowerCase()),
        )
      )
        score += 3;
    }
    for (const g of normGreenery) {
      if (e.greeneryTags.some((t) => t.toLowerCase() === g)) score += 2;
    }
    if (inferredColors.includes(e.colorTheme)) score += 1;
    if (score > bestScore) {
      bestScore = score;
      best = e;
    }
  }
  return best;
}

// ─── CANVAS UTILS ─────────────────────────────────────────────────────────────
/**
 * Parses an encoded message string that may contain TO/FROM/MSG sections.
 * Format: "TO:name||FROM:name||MSG:body" or plain message.
 */
export function parseMessage(raw: string): {
  to: string;
  from: string;
  body: string;
} {
  if (raw.includes("||MSG:")) {
    const toPart = raw.match(/^TO:(.*?)\|\|FROM:/);
    const fromPart = raw.match(/\|\|FROM:(.*?)\|\|MSG:/);
    const msgPart = raw.match(/\|\|MSG:([\s\S]*)$/);
    return {
      to: toPart?.[1]?.trim() ?? "",
      from: fromPart?.[1]?.trim() ?? "",
      body: msgPart?.[1]?.trim() ?? raw,
    };
  }
  return { to: "", from: "", body: raw };
}

/**
 * Renders a bouquet image with an overlaid message card onto an offscreen canvas
 * and returns a JPEG data URL.
 *
 * Canvas is Ultra HD 2400×3200 (3:4 portrait).
 * Message card is positioned at bottom-right, slightly overlapping the bouquet wrap.
 * The bouquet image is always drawn using contain-fit logic — NEVER stretched or cropped.
 */
export async function renderBouquetWithCard(
  imageUrl: string,
  message: string,
  addWatermark = false,
  msgFont = "Cormorant Garamond",
  msgColor = "#3b2a1a",
): Promise<string> {
  await Promise.all([
    document.fonts.load('600 22px "Dancing Script"'),
    document.fonts.load('400 20px "Dancing Script"'),
  ]);

  // Ultra HD 3x canvas — 2400×3200 (exact 3:4)
  const CANVAS_W = 2400;
  const CANVAS_H = 3200;

  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext("2d")!;

  // Warm beige background
  ctx.fillStyle = "#f5efe6";
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  await new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const srcW = img.naturalWidth || img.width;
      const srcH = img.naturalHeight || img.height;

      // Contain-fit: scale to fill canvas while preserving aspect ratio
      const scaleByH = CANVAS_H / srcH;
      const scaleByW = CANVAS_W / srcW;
      const scale = Math.min(scaleByH, scaleByW);

      const drawW = srcW * scale;
      const drawH = srcH * scale;
      const drawX = (CANVAS_W - drawW) / 2;
      const drawY = (CANVAS_H - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      resolve();
    };
    img.onerror = reject;
    img.src = imageUrl;
  });

  const { to, from, body } = parseMessage(message);

  // ── Message card: bottom-right, slightly overlapping the bouquet wrap ──
  // Positioned so card overlaps the kraft paper wrap area (lower ~30% of image)
  const cardW = 720;
  const cardH = 580;
  const cardX = CANVAS_W - cardW - 60; // 60px from right edge
  const cardY = CANVAS_H - cardH - 140; // sits in wrap area, slightly up from bottom

  const cardCX = cardX + cardW / 2;
  const cardCY = cardY + cardH / 2;

  ctx.save();
  ctx.translate(cardCX, cardCY);
  ctx.rotate(0.03); // very slight tilt for elegance

  // Shadow
  ctx.shadowBlur = 48;
  ctx.shadowColor = "rgba(0,0,0,0.22)";
  ctx.shadowOffsetX = 6;
  ctx.shadowOffsetY = 10;

  // Cream card background
  ctx.fillStyle = "rgba(255, 250, 240, 0.97)";
  ctx.beginPath();
  const rx = -cardW / 2;
  const ry = -cardH / 2;
  ctx.roundRect(rx, ry, cardW, cardH, 20);
  ctx.fill();

  // Clear shadow
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Gold border
  ctx.strokeStyle = "rgba(184, 154, 106, 0.5)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(rx, ry, cardW, cardH, 20);
  ctx.stroke();

  // "Bloom" header
  ctx.fillStyle = "#B89A6A";
  ctx.font = '600 52px "Dancing Script", cursive';
  ctx.textAlign = "center";
  ctx.fillText("Bloom", 0, ry + 68);

  // Divider
  ctx.strokeStyle = "rgba(184, 154, 106, 0.35)";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(rx + 48, ry + 96);
  ctx.lineTo(rx + cardW - 48, ry + 96);
  ctx.stroke();

  let currentY = ry + 140;

  // "To:" line
  if (to) {
    ctx.fillStyle = "#B89A6A";
    ctx.font = 'italic 400 34px "Dancing Script", cursive';
    ctx.textAlign = "left";
    ctx.fillText(`To: ${to}`, rx + 48, currentY);
    currentY += 52;

    ctx.strokeStyle = "rgba(184, 154, 106, 0.22)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(rx + 48, currentY - 10);
    ctx.lineTo(rx + cardW - 48, currentY - 10);
    ctx.stroke();
    currentY += 16;
  }

  // Body message
  const cardFont = msgFont || "Cormorant Garamond";
  const cardColor = msgColor || "#3D2B1F";
  const maxWidth = cardW - 112;
  const lineHeight = 58;
  const maxLines = to || from ? 5 : 7;
  const minFontSize = 30;

  function measureLines(fs: number): string[] {
    ctx.font = `400 ${fs}px "${cardFont}", serif`;
    const words = body.split(" ");
    const lines: string[] = [];
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  let fontSize = 46;
  let lines = measureLines(fontSize);
  while (lines.length > maxLines && fontSize > minFontSize) {
    fontSize -= 4;
    lines = measureLines(fontSize);
  }

  ctx.font = `400 ${fontSize}px "${cardFont}", serif`;
  ctx.fillStyle = cardColor;
  ctx.textAlign = "left";
  for (const ln of lines.slice(0, maxLines)) {
    ctx.fillText(ln, rx + 56, currentY);
    currentY += lineHeight;
  }

  // "From:" line
  if (from) {
    ctx.strokeStyle = "rgba(184, 154, 106, 0.22)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(rx + 48, ry + cardH - 80);
    ctx.lineTo(rx + cardW - 48, ry + cardH - 80);
    ctx.stroke();

    ctx.fillStyle = "#B89A6A";
    ctx.font = 'italic 400 32px "Dancing Script", cursive';
    ctx.textAlign = "right";
    ctx.fillText(`From: ${from}`, rx + cardW - 48, ry + cardH - 36);
  } else {
    ctx.fillStyle = "rgba(111, 106, 99, 0.8)";
    ctx.font = 'italic 400 28px "Playfair Display", Georgia, serif';
    ctx.textAlign = "center";
    ctx.fillText("— with love", 0, ry + cardH - 30);
  }

  ctx.restore();

  // Watermark for free users
  if (addWatermark) {
    ctx.save();
    ctx.font = "32px sans-serif";
    ctx.fillStyle = "rgba(180,150,120,0.6)";
    ctx.textAlign = "left";
    ctx.fillText("Created with Bloom \uD83D\uDC90", 28, CANVAS_H - 28);
    ctx.restore();
  }

  return canvas.toDataURL("image/jpeg", 1.0);
}

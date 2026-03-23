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
  // ── EXPANDED ENTRIES (200+ additional combinations) ─────────────────────

  // ── Single Rose variants
  entry(
    "rr-01",
    IMG.rosePeony,
    ["rose (red)"],
    ["eucalyptus"],
    "red",
    "romantic",
  ),
  entry("rr-02", IMG.rosePeony, ["rose (red)"], ["ruscus"], "red", "romantic"),
  entry("rr-03", IMG.rosePeony, ["rose (red)"], ["fern"], "red", "romantic"),
  entry("rr-04", IMG.rosePeony, ["rose (red)"], ["myrtle"], "red", "romantic"),
  entry(
    "rr-05",
    IMG.classicRoseCarnation,
    ["rose (red)"],
    ["salal"],
    "red",
    "bold",
  ),
  entry(
    "rr-06",
    IMG.dahliaRose,
    ["rose (red)"],
    ["dusty miller"],
    "red",
    "romantic",
  ),
  entry(
    "rp2-01",
    IMG.pinkRanunculus,
    ["rose (pink)"],
    ["eucalyptus"],
    "pink",
    "romantic",
  ),
  entry(
    "rp2-02",
    IMG.pinkRanunculus,
    ["rose (pink)"],
    ["ruscus"],
    "pink",
    "romantic",
  ),
  entry(
    "rp2-03",
    IMG.pinkRanunculus,
    ["rose (pink)"],
    ["fern"],
    "pink",
    "soft",
  ),
  entry(
    "rp2-04",
    IMG.pinkRanunculus,
    ["rose (pink)"],
    ["myrtle"],
    "pink",
    "soft",
  ),
  entry(
    "rp2-05",
    IMG.gardenRosePeony,
    ["rose (pink)"],
    ["salal"],
    "pink",
    "elegant",
  ),
  entry(
    "rw-01",
    IMG.whiteGardenia,
    ["rose (white)"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "rw-02",
    IMG.whiteGardenia,
    ["rose (white)"],
    ["ruscus"],
    "white",
    "elegant",
  ),
  entry(
    "rw-03",
    IMG.whiteGardenia,
    ["rose (white)"],
    ["fern"],
    "white",
    "elegant",
  ),
  entry(
    "rw-04",
    IMG.gardenRosePeony,
    ["rose (white)"],
    ["filler stems"],
    "white",
    "romantic",
  ),
  entry(
    "rw-05",
    IMG.whiteGardenia,
    ["rose (white)"],
    ["pittosporum"],
    "white",
    "elegant",
  ),

  // ── Single Peony variants
  entry("pn-01", IMG.rosePeony, ["peony"], ["eucalyptus"], "pink", "romantic"),
  entry("pn-02", IMG.peonyTulip, ["peony"], ["ruscus"], "pink", "romantic"),
  entry("pn-03", IMG.gardenRosePeony, ["peony"], ["fern"], "pink", "elegant"),
  entry("pn-04", IMG.rosePeony, ["peony"], ["myrtle"], "pink", "soft"),
  entry("pn-05", IMG.peonyTulip, ["peony"], ["salal"], "pink", "romantic"),

  // ── Rose Red + additional combos
  entry(
    "rx-01",
    IMG.dahliaRose,
    ["rose (red)", "dahlia"],
    ["eucalyptus"],
    "red",
    "bold",
  ),
  entry(
    "rx-02",
    IMG.classicRoseCarnation,
    ["rose (red)", "lily"],
    ["filler stems"],
    "red",
    "elegant",
  ),
  entry(
    "rx-03",
    IMG.rosePeony,
    ["rose (red)", "rose (pink)"],
    ["ruscus"],
    "pink",
    "romantic",
  ),
  entry(
    "rx-04",
    IMG.rosePeony,
    ["rose (red)", "peony", "ranunculus"],
    ["myrtle"],
    "red",
    "romantic",
  ),
  entry(
    "rx-05",
    IMG.gardenRosePeony,
    ["rose (red)", "rose (white)"],
    ["salal"],
    "mixed",
    "elegant",
  ),
  entry(
    "rx-06",
    IMG.classicRoseCarnation,
    ["rose (red)", "carnation", "dahlia"],
    ["eucalyptus"],
    "red",
    "bold",
  ),

  // ── Rose Pink + additional combos
  entry(
    "rpx-01",
    IMG.pinkRanunculus,
    ["rose (pink)", "ranunculus", "sweet pea"],
    ["fern"],
    "pink",
    "soft",
  ),
  entry(
    "rpx-02",
    IMG.peonyTulip,
    ["rose (pink)", "peony", "tulip"],
    ["eucalyptus"],
    "pink",
    "romantic",
  ),
  entry(
    "rpx-03",
    IMG.dahliaRose,
    ["rose (pink)", "dahlia", "carnation"],
    ["ruscus"],
    "pink",
    "bold",
  ),
  entry(
    "rpx-04",
    IMG.gardenRosePeony,
    ["rose (pink)", "rose (white)", "gardenia"],
    ["filler stems"],
    "mixed",
    "elegant",
  ),
  entry(
    "rpx-05",
    IMG.cherryTulip,
    ["rose (pink)", "cherry blossom"],
    ["myrtle"],
    "pink",
    "soft",
  ),
  entry(
    "rpx-06",
    IMG.pinkRanunculus,
    ["rose (pink)", "camellia"],
    ["eucalyptus"],
    "pink",
    "romantic",
  ),

  // ── Rose White + additional combos
  entry(
    "rwx-01",
    IMG.whiteGardenia,
    ["rose (white)", "lily"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "rwx-02",
    IMG.whiteGardenia,
    ["rose (white)", "camellia"],
    ["ruscus"],
    "white",
    "elegant",
  ),
  entry(
    "rwx-03",
    IMG.lilyOrchid,
    ["rose (white)", "orchid"],
    ["filler stems"],
    "white",
    "elegant",
  ),
  entry(
    "rwx-04",
    IMG.gardenRosePeony,
    ["rose (white)", "gardenia", "magnolia"],
    ["myrtle"],
    "white",
    "elegant",
  ),
  entry(
    "rwx-05",
    IMG.whiteGardenia,
    ["rose (white)", "lisianthus"],
    ["pittosporum"],
    "white",
    "elegant",
  ),
  entry(
    "rwx-06",
    IMG.whiteGardenia,
    ["rose (white)", "freesia"],
    ["salal"],
    "white",
    "romantic",
  ),

  // ── Dahlia expanded combos
  entry(
    "da-01",
    IMG.dahliaCarnation,
    ["dahlia"],
    ["eucalyptus"],
    "mixed",
    "bold",
  ),
  entry(
    "da-02",
    IMG.sunflowerDahlia,
    ["dahlia", "sunflower", "marigold"],
    ["fern"],
    "yellow",
    "bold",
  ),
  entry(
    "da-03",
    IMG.dahliaRose,
    ["dahlia", "rose (red)"],
    ["ruscus"],
    "red",
    "bold",
  ),
  entry(
    "da-04",
    IMG.dahliaCarnation,
    ["dahlia", "snapdragon"],
    ["dusty miller"],
    "mixed",
    "bold",
  ),
  entry(
    "da-05",
    IMG.dahliaRose,
    ["dahlia", "peony"],
    ["eucalyptus"],
    "pink",
    "romantic",
  ),
  entry(
    "da-06",
    IMG.dahliaCarnation,
    ["dahlia", "cosmos"],
    ["salal"],
    "mixed",
    "bright",
  ),

  // ── Carnation expanded
  entry(
    "ca-01",
    IMG.classicRoseCarnation,
    ["carnation"],
    ["eucalyptus"],
    "red",
    "elegant",
  ),
  entry(
    "ca-02",
    IMG.dahliaCarnation,
    ["carnation", "snapdragon"],
    ["fern"],
    "mixed",
    "bold",
  ),
  entry(
    "ca-03",
    IMG.classicRoseCarnation,
    ["carnation", "lily"],
    ["ruscus"],
    "white",
    "elegant",
  ),
  entry(
    "ca-04",
    IMG.dahliaCarnation,
    ["carnation", "gerbera"],
    ["filler stems"],
    "mixed",
    "bright",
  ),
  entry(
    "ca-05",
    IMG.classicRoseCarnation,
    ["carnation", "freesia"],
    ["myrtle"],
    "white",
    "elegant",
  ),

  // ── Sunflower expanded
  entry(
    "su-01",
    IMG.sunflowerDaisy,
    ["sunflower"],
    ["fern"],
    "yellow",
    "bright",
  ),
  entry(
    "su-02",
    IMG.sunflowerDaisy,
    ["sunflower", "marigold"],
    ["eucalyptus"],
    "yellow",
    "bright",
  ),
  entry(
    "su-03",
    IMG.sunflowerDahlia,
    ["sunflower", "gerbera"],
    ["ruscus"],
    "yellow",
    "bold",
  ),
  entry(
    "su-04",
    IMG.sunflowerDaisy,
    ["sunflower", "cosmos"],
    ["salal"],
    "yellow",
    "bright",
  ),
  entry(
    "su-05",
    IMG.sunflowerDahlia,
    ["sunflower", "dahlia", "cosmos"],
    ["dusty miller"],
    "yellow",
    "bold",
  ),

  // ── Daisy expanded
  entry("dy-01", IMG.sunflowerDaisy, ["daisy"], ["fern"], "white", "soft"),
  entry(
    "dy-02",
    IMG.sunflowerDaisy,
    ["daisy", "cosmos"],
    ["filler stems"],
    "mixed",
    "bright",
  ),
  entry(
    "dy-03",
    IMG.gerberaMarigold,
    ["daisy", "gerbera"],
    ["ruscus"],
    "yellow",
    "bright",
  ),
  entry(
    "dy-04",
    IMG.sunflowerDaisy,
    ["daisy", "snapdragon"],
    ["eucalyptus"],
    "mixed",
    "bold",
  ),

  // ── Gerbera expanded
  entry(
    "ge-01",
    IMG.gerberaMarigold,
    ["gerbera"],
    ["fern"],
    "yellow",
    "bright",
  ),
  entry(
    "ge-02",
    IMG.sunflowerDahlia,
    ["gerbera", "dahlia"],
    ["eucalyptus"],
    "mixed",
    "bold",
  ),
  entry(
    "ge-03",
    IMG.gerberaMarigold,
    ["gerbera", "cosmos"],
    ["myrtle"],
    "pink",
    "bright",
  ),
  entry(
    "ge-04",
    IMG.gerberaMarigold,
    ["gerbera", "snapdragon", "marigold"],
    ["salal"],
    "mixed",
    "bright",
  ),

  // ── Marigold expanded
  entry(
    "mg2-01",
    IMG.gerberaMarigold,
    ["marigold"],
    ["fern"],
    "yellow",
    "bright",
  ),
  entry(
    "mg2-02",
    IMG.gerberaMarigold,
    ["marigold", "cosmos"],
    ["pittosporum"],
    "mixed",
    "bright",
  ),
  entry(
    "mg2-03",
    IMG.sunflowerDaisy,
    ["marigold", "daisy"],
    ["dusty miller"],
    "yellow",
    "bright",
  ),
  entry(
    "mg2-04",
    IMG.gerberaMarigold,
    ["marigold", "snapdragon"],
    ["filler stems"],
    "mixed",
    "bold",
  ),

  // ── Poppy expanded
  entry("po-01", IMG.anemonePoppy, ["poppy"], ["fern"], "red", "bold"),
  entry(
    "po-02",
    IMG.anemonePoppy,
    ["poppy", "cosmos"],
    ["eucalyptus"],
    "mixed",
    "bright",
  ),
  entry(
    "po-03",
    IMG.gerberaMarigold,
    ["poppy", "gerbera"],
    ["ruscus"],
    "red",
    "bold",
  ),
  entry(
    "po-04",
    IMG.anemonePoppy,
    ["poppy", "anemone", "iris"],
    ["myrtle"],
    "purple",
    "wild",
  ),

  // ── Lily expanded
  entry("li2-01", IMG.lilyOrchid, ["lily"], ["eucalyptus"], "white", "elegant"),
  entry(
    "li2-02",
    IMG.classicRoseCarnation,
    ["lily", "carnation"],
    ["fern"],
    "white",
    "elegant",
  ),
  entry(
    "li2-03",
    IMG.lilyOrchid,
    ["lily", "freesia", "orchid"],
    ["ruscus"],
    "white",
    "elegant",
  ),
  entry(
    "li2-04",
    IMG.whiteGardenia,
    ["lily", "camellia"],
    ["salal"],
    "white",
    "romantic",
  ),
  entry(
    "li2-05",
    IMG.lilyOrchid,
    ["lily", "lisianthus"],
    ["pittosporum"],
    "white",
    "elegant",
  ),
  entry(
    "li2-06",
    IMG.lilyOrchid,
    ["lily", "magnolia"],
    ["dusty miller"],
    "white",
    "elegant",
  ),

  // ── Orchid expanded
  entry(
    "oc-01",
    IMG.lilyOrchid,
    ["orchid"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "oc-02",
    IMG.cherryOrchid,
    ["orchid", "jasmine", "cherry blossom"],
    ["fern"],
    "white",
    "elegant",
  ),
  entry(
    "oc-03",
    IMG.lilyOrchid,
    ["orchid", "magnolia"],
    ["ruscus"],
    "white",
    "elegant",
  ),
  entry(
    "oc-04",
    IMG.lilyOrchid,
    ["orchid", "lisianthus", "freesia"],
    ["myrtle"],
    "purple",
    "elegant",
  ),
  entry(
    "oc-05",
    IMG.lilyOrchid,
    ["orchid", "lily", "jasmine"],
    ["salal"],
    "white",
    "elegant",
  ),

  // ── Gardenia expanded
  entry(
    "ga-01",
    IMG.whiteGardenia,
    ["gardenia"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "ga-02",
    IMG.gardeniaHydrangea,
    ["gardenia", "magnolia"],
    ["fern"],
    "white",
    "elegant",
  ),
  entry(
    "ga-03",
    IMG.gardenRosePeony,
    ["gardenia", "camellia"],
    ["ruscus"],
    "white",
    "romantic",
  ),
  entry(
    "ga-04",
    IMG.whiteGardenia,
    ["gardenia", "jasmine", "lily"],
    ["pittosporum"],
    "white",
    "elegant",
  ),

  // ── Jasmine expanded
  entry(
    "jx-01",
    IMG.whiteGardenia,
    ["jasmine"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "jx-02",
    IMG.lilyOrchid,
    ["jasmine", "freesia"],
    ["ruscus"],
    "white",
    "elegant",
  ),
  entry(
    "jx-03",
    IMG.whiteGardenia,
    ["jasmine", "camellia"],
    ["myrtle"],
    "white",
    "romantic",
  ),
  entry(
    "jx-04",
    IMG.cherryOrchid,
    ["jasmine", "cherry blossom", "orchid"],
    ["salal"],
    "pink",
    "elegant",
  ),
  entry(
    "jx-05",
    IMG.whiteGardenia,
    ["jasmine", "magnolia"],
    ["fern"],
    "white",
    "elegant",
  ),
  entry(
    "jx-06",
    IMG.lilyOrchid,
    ["jasmine", "lily", "freesia"],
    ["dusty miller"],
    "white",
    "elegant",
  ),

  // ── Camellia expanded
  entry(
    "cl-01",
    IMG.whiteGardenia,
    ["camellia"],
    ["eucalyptus"],
    "pink",
    "romantic",
  ),
  entry(
    "cl-02",
    IMG.pinkRanunculus,
    ["camellia", "ranunculus"],
    ["ruscus"],
    "pink",
    "romantic",
  ),
  entry(
    "cl-03",
    IMG.gardenRosePeony,
    ["camellia", "peony"],
    ["fern"],
    "pink",
    "elegant",
  ),
  entry(
    "cl-04",
    IMG.whiteGardenia,
    ["camellia", "gardenia"],
    ["pittosporum"],
    "white",
    "elegant",
  ),
  entry(
    "cl-05",
    IMG.rosePeony,
    ["camellia", "rose (red)"],
    ["myrtle"],
    "red",
    "romantic",
  ),

  // ── Freesia expanded
  entry(
    "fre-01",
    IMG.lilyOrchid,
    ["freesia"],
    ["eucalyptus"],
    "yellow",
    "elegant",
  ),
  entry(
    "fre-02",
    IMG.whiteGardenia,
    ["freesia", "gardenia"],
    ["ruscus"],
    "white",
    "elegant",
  ),
  entry(
    "fre-03",
    IMG.peonyTulip,
    ["freesia", "sweet pea", "tulip"],
    ["fern"],
    "pink",
    "soft",
  ),
  entry(
    "fre-04",
    IMG.pinkRanunculus,
    ["freesia", "rose (pink)"],
    ["salal"],
    "pink",
    "romantic",
  ),

  // ── Lisianthus expanded
  entry(
    "lsx-01",
    IMG.lilyOrchid,
    ["lisianthus"],
    ["eucalyptus"],
    "purple",
    "elegant",
  ),
  entry(
    "lsx-02",
    IMG.gardeniaHydrangea,
    ["lisianthus", "hydrangea"],
    ["ruscus"],
    "purple",
    "soft",
  ),
  entry(
    "lsx-03",
    IMG.peonyTulip,
    ["lisianthus", "ranunculus", "peony"],
    ["myrtle"],
    "pink",
    "romantic",
  ),
  entry(
    "lsx-04",
    IMG.lilyOrchid,
    ["lisianthus", "lily", "orchid"],
    ["salal"],
    "white",
    "elegant",
  ),

  // ── Magnolia expanded
  entry(
    "max-01",
    IMG.whiteGardenia,
    ["magnolia"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "max-02",
    IMG.gardeniaHydrangea,
    ["magnolia", "gardenia"],
    ["fern"],
    "white",
    "elegant",
  ),
  entry(
    "max-03",
    IMG.lilyOrchid,
    ["magnolia", "lily", "orchid"],
    ["pittosporum"],
    "white",
    "elegant",
  ),
  entry(
    "max-04",
    IMG.whiteGardenia,
    ["magnolia", "camellia", "jasmine"],
    ["dusty miller"],
    "white",
    "elegant",
  ),

  // ── Cosmos expanded
  entry(
    "csx-01",
    IMG.sunflowerDaisy,
    ["cosmos"],
    ["filler stems"],
    "pink",
    "soft",
  ),
  entry(
    "csx-02",
    IMG.pinkRanunculus,
    ["cosmos", "ranunculus"],
    ["ruscus"],
    "pink",
    "soft",
  ),
  entry(
    "csx-03",
    IMG.cherryTulip,
    ["cosmos", "sweet pea", "tulip"],
    ["myrtle"],
    "pink",
    "soft",
  ),
  entry(
    "csx-04",
    IMG.gerberaMarigold,
    ["cosmos", "marigold"],
    ["salal"],
    "mixed",
    "bright",
  ),

  // ── Snapdragon expanded
  entry(
    "snx-01",
    IMG.gerberaMarigold,
    ["snapdragon"],
    ["filler stems"],
    "mixed",
    "bold",
  ),
  entry(
    "snx-02",
    IMG.dahliaCarnation,
    ["snapdragon", "dahlia"],
    ["ruscus"],
    "mixed",
    "bold",
  ),
  entry(
    "snx-03",
    IMG.sunflowerDaisy,
    ["snapdragon", "sunflower", "daisy"],
    ["fern"],
    "yellow",
    "bright",
  ),
  entry(
    "snx-04",
    IMG.classicRoseCarnation,
    ["snapdragon", "carnation", "lily"],
    ["eucalyptus"],
    "mixed",
    "elegant",
  ),

  // ── Sweet Pea expanded
  entry(
    "swx-01",
    IMG.pinkRanunculus,
    ["sweet pea"],
    ["ruscus"],
    "pink",
    "soft",
  ),
  entry(
    "swx-02",
    IMG.tulipBabysBreath,
    ["sweet pea", "baby's breath"],
    ["filler stems"],
    "pink",
    "soft",
  ),
  entry(
    "swx-03",
    IMG.peonyTulip,
    ["sweet pea", "ranunculus"],
    ["fern"],
    "pink",
    "romantic",
  ),
  entry(
    "swx-04",
    IMG.rosePeony,
    ["sweet pea", "rose (pink)", "peony"],
    ["myrtle"],
    "pink",
    "romantic",
  ),
  entry(
    "swx-05",
    IMG.cherryTulip,
    ["sweet pea", "cherry blossom", "tulip"],
    ["salal"],
    "pink",
    "soft",
  ),

  // ── Tulip expanded (premium)
  entry("tx-01", IMG.tulipBabysBreath, ["tulip"], ["fern"], "pink", "soft"),
  entry(
    "tx-02",
    IMG.peonyTulip,
    ["tulip", "peony"],
    ["eucalyptus"],
    "pink",
    "romantic",
  ),
  entry(
    "tx-03",
    IMG.cherryTulip,
    ["tulip", "cherry blossom"],
    ["ruscus"],
    "pink",
    "soft",
  ),
  entry(
    "tx-04",
    IMG.tulipBabysBreath,
    ["tulip", "ranunculus"],
    ["myrtle"],
    "pink",
    "romantic",
  ),
  entry(
    "tx-05",
    IMG.peonyTulip,
    ["tulip", "sweet pea", "ranunculus"],
    ["salal"],
    "pink",
    "soft",
  ),
  entry(
    "tx-06",
    IMG.tulipBabysBreath,
    ["tulip", "baby's breath", "cosmos"],
    ["filler stems"],
    "pink",
    "soft",
  ),

  // ── Anemone expanded (premium)
  entry("anx-01", IMG.anemonePoppy, ["anemone"], ["fern"], "purple", "bold"),
  entry(
    "anx-02",
    IMG.anemonePoppy,
    ["anemone", "poppy", "ranunculus"],
    ["eucalyptus"],
    "purple",
    "wild",
  ),
  entry(
    "anx-03",
    IMG.lavenderHydrangea,
    ["anemone", "lavender"],
    ["ruscus"],
    "purple",
    "wild",
  ),
  entry(
    "anx-04",
    IMG.anemonePoppy,
    ["anemone", "iris"],
    ["myrtle"],
    "purple",
    "wild",
  ),
  entry(
    "anx-05",
    IMG.hydrangeaBabys,
    ["anemone", "hydrangea", "baby's breath"],
    ["salal"],
    "purple",
    "soft",
  ),

  // ── Lavender expanded (premium)
  entry(
    "lax-01",
    IMG.lavenderHydrangea,
    ["lavender"],
    ["ruscus"],
    "purple",
    "wild",
  ),
  entry(
    "lax-02",
    IMG.lavenderHydrangea,
    ["lavender", "wisteria"],
    ["fern"],
    "purple",
    "romantic",
  ),
  entry(
    "lax-03",
    IMG.hydrangeaBabys,
    ["lavender", "baby's breath"],
    ["eucalyptus"],
    "white",
    "soft",
  ),
  entry(
    "lax-04",
    IMG.lavenderHydrangea,
    ["lavender", "iris", "anemone"],
    ["dusty miller"],
    "purple",
    "wild",
  ),
  entry(
    "lax-05",
    IMG.lavenderHydrangea,
    ["lavender", "hydrangea", "cosmos"],
    ["myrtle"],
    "purple",
    "soft",
  ),

  // ── Hydrangea expanded (premium)
  entry(
    "hyx-01",
    IMG.gardeniaHydrangea,
    ["hydrangea"],
    ["eucalyptus"],
    "purple",
    "soft",
  ),
  entry(
    "hyx-02",
    IMG.hydrangeaBabys,
    ["hydrangea", "baby's breath", "wisteria"],
    ["fern"],
    "purple",
    "soft",
  ),
  entry(
    "hyx-03",
    IMG.lavenderHydrangea,
    ["hydrangea", "lavender", "iris"],
    ["pittosporum"],
    "purple",
    "wild",
  ),
  entry(
    "hyx-04",
    IMG.gardeniaHydrangea,
    ["hydrangea", "magnolia"],
    ["salal"],
    "white",
    "elegant",
  ),
  entry(
    "hyx-05",
    IMG.hydrangeaBabys,
    ["hydrangea", "sweet pea"],
    ["myrtle"],
    "purple",
    "soft",
  ),

  // ── Baby's Breath expanded (premium)
  entry(
    "bbx-01",
    IMG.tulipBabysBreath,
    ["baby's breath"],
    ["filler stems"],
    "white",
    "soft",
  ),
  entry(
    "bbx-02",
    IMG.hydrangeaBabys,
    ["baby's breath", "hydrangea"],
    ["ruscus"],
    "white",
    "soft",
  ),
  entry(
    "bbx-03",
    IMG.pinkRanunculus,
    ["baby's breath", "ranunculus"],
    ["eucalyptus"],
    "pink",
    "soft",
  ),
  entry(
    "bbx-04",
    IMG.tulipBabysBreath,
    ["baby's breath", "sweet pea", "cosmos"],
    ["myrtle"],
    "white",
    "soft",
  ),

  // ── Cherry Blossom expanded (premium)
  entry(
    "cbx-01",
    IMG.cherryTulip,
    ["cherry blossom"],
    ["ruscus"],
    "pink",
    "soft",
  ),
  entry(
    "cbx-02",
    IMG.cherryOrchid,
    ["cherry blossom", "jasmine"],
    ["eucalyptus"],
    "pink",
    "elegant",
  ),
  entry(
    "cbx-03",
    IMG.cherryTulip,
    ["cherry blossom", "sweet pea"],
    ["fern"],
    "pink",
    "soft",
  ),
  entry(
    "cbx-04",
    IMG.cherryOrchid,
    ["cherry blossom", "orchid", "jasmine"],
    ["myrtle"],
    "pink",
    "elegant",
  ),
  entry(
    "cbx-05",
    IMG.cherryTulip,
    ["cherry blossom", "cosmos", "tulip"],
    ["salal"],
    "pink",
    "soft",
  ),

  // ── Iris expanded (premium)
  entry("irx-01", IMG.anemonePoppy, ["iris"], ["fern"], "purple", "wild"),
  entry(
    "irx-02",
    IMG.lavenderHydrangea,
    ["iris", "lavender", "hydrangea"],
    ["eucalyptus"],
    "purple",
    "wild",
  ),
  entry(
    "irx-03",
    IMG.anemonePoppy,
    ["iris", "anemone", "poppy"],
    ["ruscus"],
    "purple",
    "bold",
  ),
  entry(
    "irx-04",
    IMG.lilyOrchid,
    ["iris", "orchid"],
    ["pittosporum"],
    "purple",
    "elegant",
  ),

  // ── Wisteria expanded (premium)
  entry(
    "wix-01",
    IMG.lavenderHydrangea,
    ["wisteria"],
    ["fern"],
    "purple",
    "wild",
  ),
  entry(
    "wix-02",
    IMG.hydrangeaBabys,
    ["wisteria", "hydrangea"],
    ["eucalyptus"],
    "purple",
    "soft",
  ),
  entry(
    "wix-03",
    IMG.lavenderHydrangea,
    ["wisteria", "lavender", "iris"],
    ["ruscus"],
    "purple",
    "wild",
  ),
  entry(
    "wix-04",
    IMG.cherryOrchid,
    ["wisteria", "cherry blossom"],
    ["myrtle"],
    "pink",
    "soft",
  ),

  // ── Protea expanded (premium)
  entry("prx-01", IMG.anemonePoppy, ["protea"], ["eucalyptus"], "pink", "bold"),
  entry(
    "prx-02",
    IMG.lavenderHydrangea,
    ["protea", "hydrangea"],
    ["fern"],
    "mixed",
    "wild",
  ),
  entry(
    "prx-03",
    IMG.sunflowerDahlia,
    ["protea", "dahlia", "sunflower"],
    ["ruscus"],
    "mixed",
    "bold",
  ),
  entry(
    "prx-04",
    IMG.dahliaRose,
    ["protea", "rose (pink)", "dahlia"],
    ["myrtle"],
    "pink",
    "bold",
  ),

  // ── Premium Rare: Lotus expanded
  entry(
    "lox-01",
    IMG.rosePeony,
    ["lotus", "peony"],
    ["eucalyptus"],
    "pink",
    "elegant",
  ),
  entry(
    "lox-02",
    IMG.gardenRosePeony,
    ["lotus", "rose (white)"],
    ["ruscus"],
    "white",
    "elegant",
  ),
  entry(
    "lox-03",
    IMG.lilyOrchid,
    ["lotus", "orchid"],
    ["fern"],
    "pink",
    "elegant",
  ),
  entry(
    "lox-04",
    IMG.rosePeony,
    ["lotus", "rose (pink)", "peony"],
    ["myrtle"],
    "pink",
    "romantic",
  ),
  entry(
    "lox-05",
    IMG.whiteGardenia,
    ["lotus", "gardenia"],
    ["salal"],
    "white",
    "elegant",
  ),

  // ── Premium Rare: Black Dahlia expanded
  entry(
    "bdx-01",
    IMG.dahliaCarnation,
    ["black dahlia", "carnation"],
    ["eucalyptus"],
    "mixed",
    "bold",
  ),
  entry(
    "bdx-02",
    IMG.dahliaRose,
    ["black dahlia", "rose (red)"],
    ["ruscus"],
    "red",
    "bold",
  ),
  entry(
    "bdx-03",
    IMG.dahliaCarnation,
    ["black dahlia", "snapdragon"],
    ["fern"],
    "mixed",
    "bold",
  ),
  entry(
    "bdx-04",
    IMG.anemonePoppy,
    ["black dahlia", "anemone"],
    ["dusty miller"],
    "mixed",
    "wild",
  ),
  entry(
    "bdx-05",
    IMG.sunflowerDahlia,
    ["black dahlia", "sunflower"],
    ["salal"],
    "mixed",
    "bold",
  ),

  // ── Premium Rare: Blue Delphinium expanded
  entry(
    "dex-01",
    IMG.lavenderHydrangea,
    ["blue delphinium", "lavender"],
    ["eucalyptus"],
    "purple",
    "elegant",
  ),
  entry(
    "dex-02",
    IMG.anemonePoppy,
    ["blue delphinium", "iris"],
    ["ruscus"],
    "purple",
    "bold",
  ),
  entry(
    "dex-03",
    IMG.gardeniaHydrangea,
    ["blue delphinium", "hydrangea"],
    ["fern"],
    "purple",
    "elegant",
  ),
  entry(
    "dex-04",
    IMG.lilyOrchid,
    ["blue delphinium", "orchid"],
    ["myrtle"],
    "purple",
    "elegant",
  ),
  entry(
    "dex-05",
    IMG.lavenderHydrangea,
    ["blue delphinium", "wisteria", "lavender"],
    ["salal"],
    "purple",
    "wild",
  ),

  // ── Premium Rare: Bleeding Heart expanded
  entry(
    "bhx-01",
    IMG.pinkRanunculus,
    ["bleeding heart", "ranunculus"],
    ["eucalyptus"],
    "pink",
    "soft",
  ),
  entry(
    "bhx-02",
    IMG.rosePeony,
    ["bleeding heart", "peony"],
    ["ruscus"],
    "pink",
    "romantic",
  ),
  entry(
    "bhx-03",
    IMG.cherryTulip,
    ["bleeding heart", "cherry blossom"],
    ["fern"],
    "pink",
    "soft",
  ),
  entry(
    "bhx-04",
    IMG.hydrangeaBabys,
    ["bleeding heart", "baby's breath"],
    ["myrtle"],
    "pink",
    "soft",
  ),

  // ── Premium Rare: Hellebore expanded
  entry(
    "hex-01",
    IMG.whiteGardenia,
    ["hellebore", "rose (white)"],
    ["eucalyptus"],
    "white",
    "elegant",
  ),
  entry(
    "hex-02",
    IMG.gardenRosePeony,
    ["hellebore", "peony"],
    ["ruscus"],
    "white",
    "romantic",
  ),
  entry(
    "hex-03",
    IMG.lilyOrchid,
    ["hellebore", "orchid"],
    ["fern"],
    "white",
    "elegant",
  ),
  entry(
    "hex-04",
    IMG.gardeniaHydrangea,
    ["hellebore", "gardenia"],
    ["myrtle"],
    "white",
    "elegant",
  ),

  // ── Premium Rare: Chocolate Cosmos expanded
  entry(
    "ccx-01",
    IMG.dahliaCarnation,
    ["chocolate cosmos", "dahlia"],
    ["eucalyptus"],
    "mixed",
    "bold",
  ),
  entry(
    "ccx-02",
    IMG.anemonePoppy,
    ["chocolate cosmos", "anemone"],
    ["ruscus"],
    "mixed",
    "wild",
  ),
  entry(
    "ccx-03",
    IMG.sunflowerDahlia,
    ["chocolate cosmos", "sunflower"],
    ["fern"],
    "mixed",
    "bold",
  ),
  entry(
    "ccx-04",
    IMG.dahliaRose,
    ["chocolate cosmos", "rose (red)"],
    ["dusty miller"],
    "red",
    "bold",
  ),

  // ── Big multi-flower mixes (romantic collections)
  entry(
    "rm-01",
    IMG.gardenRosePeony,
    ["rose (red)", "rose (pink)", "peony", "ranunculus"],
    ["eucalyptus", "ruscus"],
    "mixed",
    "romantic",
  ),
  entry(
    "rm-02",
    IMG.rosePeony,
    ["rose (red)", "peony", "carnation"],
    ["filler stems", "fern"],
    "red",
    "romantic",
  ),
  entry(
    "rm-03",
    IMG.pinkRanunculus,
    ["rose (pink)", "ranunculus", "camellia", "sweet pea"],
    ["myrtle"],
    "pink",
    "romantic",
  ),
  entry(
    "rm-04",
    IMG.gardenRosePeony,
    ["rose (white)", "gardenia", "camellia", "jasmine"],
    ["salal"],
    "white",
    "elegant",
  ),
  entry(
    "rm-05",
    IMG.peonyTulip,
    ["peony", "tulip", "sweet pea", "ranunculus"],
    ["eucalyptus", "filler stems"],
    "pink",
    "romantic",
  ),

  // ── Big multi-flower mixes (bright/bold)
  entry(
    "bm-01",
    IMG.sunflowerDaisy,
    ["sunflower", "daisy", "gerbera", "marigold"],
    ["fern", "filler stems"],
    "yellow",
    "bright",
  ),
  entry(
    "bm-02",
    IMG.gerberaMarigold,
    ["gerbera", "marigold", "snapdragon", "cosmos"],
    ["dusty miller"],
    "mixed",
    "bright",
  ),
  entry(
    "bm-03",
    IMG.sunflowerDahlia,
    ["sunflower", "dahlia", "gerbera", "snapdragon"],
    ["ruscus"],
    "yellow",
    "bold",
  ),
  entry(
    "bm-04",
    IMG.dahliaCarnation,
    ["dahlia", "carnation", "poppy", "cosmos"],
    ["pittosporum"],
    "mixed",
    "bold",
  ),
  entry(
    "bm-05",
    IMG.anemonePoppy,
    ["poppy", "anemone", "gerbera"],
    ["salal"],
    "red",
    "bold",
  ),

  // ── Big multi-flower mixes (wild/soft)
  entry(
    "wm-01",
    IMG.lavenderHydrangea,
    ["lavender", "hydrangea", "wisteria", "iris"],
    ["myrtle"],
    "purple",
    "wild",
  ),
  entry(
    "wm-02",
    IMG.hydrangeaBabys,
    ["hydrangea", "baby's breath", "sweet pea", "cosmos"],
    ["dusty miller"],
    "purple",
    "soft",
  ),
  entry(
    "wm-03",
    IMG.cherryOrchid,
    ["cherry blossom", "cosmos", "sweet pea", "tulip"],
    ["filler stems"],
    "pink",
    "soft",
  ),
  entry(
    "wm-04",
    IMG.anemonePoppy,
    ["anemone", "poppy", "iris", "wisteria"],
    ["fern"],
    "purple",
    "wild",
  ),
  entry(
    "wm-05",
    IMG.lavenderHydrangea,
    ["lavender", "anemone", "protea"],
    ["eucalyptus"],
    "purple",
    "bold",
  ),
];

const _COLOR_MAP: Record<string, string> = {
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
): BouquetEntry | null {
  const normFlowers = selectedFlowers.map((f) => f.toLowerCase()).sort();

  console.log("[PetalNest] Matching bouquet for:", {
    flowers: normFlowers,
    greenery: selectedGreenery,
  });

  // EXACT match: flowerTags must contain EXACTLY the same flowers (sorted, same count)
  for (const e of BOUQUET_LIBRARY) {
    const entryFlowers = e.flowerTags.map((f) => f.toLowerCase()).sort();
    if (
      entryFlowers.length === normFlowers.length &&
      entryFlowers.every((f, i) => f === normFlowers[i])
    ) {
      console.log("[PetalNest] Exact match found:", e.id, entryFlowers);
      return e;
    }
  }

  console.warn(
    "[PetalNest] No exact match found for:",
    normFlowers,
    "— falling back to dynamic composition",
  );
  return null;
}

export async function composeDynamicBouquet(
  selectedFlowers: string[],
  selectedGreenery: string[],
  message: string,
  addWatermark = false,
  msgFont = "Cormorant Garamond",
  msgColor = "#3b2a1a",
): Promise<string> {
  const CANVAS_W = 2400;
  const CANVAS_H = 3200;
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext("2d")!;

  const bg = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
  bg.addColorStop(0, "#f9f3ec");
  bg.addColorStop(1, "#f0e6d8");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  const loadImg = (src: string): Promise<HTMLImageElement> =>
    new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => res(img);
      img.onerror = () => rej(new Error(`Failed to load ${src}`));
      img.src = src;
    });

  const FLOWER_IMG_MAP: Record<string, string> = {
    "rose (red)": "/assets/generated/flower-rose-red.dim_400x400.jpg",
    "rose (pink)": "/assets/generated/flower-rose-pink.dim_400x400.jpg",
    "rose (white)": "/assets/generated/flower-rose-white.dim_400x400.jpg",
    peony: "/assets/generated/flower-peony.dim_400x400.jpg",
    ranunculus: "/assets/generated/flower-ranunculus.dim_400x400.jpg",
    dahlia: "/assets/generated/flower-dahlia.dim_400x400.jpg",
    tulip: "/assets/generated/flower-tulip.dim_400x400.jpg",
    lily: "/assets/generated/flower-lily.dim_400x400.jpg",
    orchid: "/assets/generated/flower-orchid.dim_400x400.jpg",
    gardenia: "/assets/generated/flower-gardenia.dim_400x400.jpg",
    jasmine: "/assets/generated/flower-jasmine-elegant.dim_400x400.jpg",
    carnation: "/assets/generated/flower-carnation.dim_400x400.jpg",
    sunflower: "/assets/generated/flower-sunflower.dim_400x400.jpg",
    daisy: "/assets/generated/flower-daisy.dim_400x400.jpg",
    gerbera: "/assets/generated/flower-gerbera.dim_400x400.jpg",
    marigold: "/assets/generated/flower-marigold.dim_400x400.jpg",
    poppy: "/assets/generated/flower-poppy.dim_400x400.jpg",
    anemone: "/assets/generated/flower-anemone.dim_400x400.jpg",
    lavender: "/assets/generated/flower-lavender.dim_400x400.jpg",
    hydrangea: "/assets/generated/flower-hydrangea.dim_400x400.jpg",
    "baby's breath": "/assets/generated/flower-babysbreath.dim_400x400.jpg",
    "cherry blossom": "/assets/generated/flower-cherryblossom.dim_400x400.jpg",
    "sweet pea": "/assets/generated/flower-sweetpea.dim_400x400.jpg",
    camellia: "/assets/generated/flower-camellia.dim_400x400.jpg",
    freesia: "/assets/generated/flower-freesia.dim_400x400.jpg",
    lisianthus: "/assets/generated/flower-lisianthus.dim_400x400.jpg",
    magnolia: "/assets/generated/flower-magnolia.dim_400x400.jpg",
    cosmos: "/assets/generated/flower-cosmos.dim_400x400.jpg",
    snapdragon: "/assets/generated/flower-snapdragon.dim_400x400.jpg",
    iris: "/assets/generated/flower-iris.dim_400x400.jpg",
    wisteria: "/assets/generated/flower-wisteria.dim_400x400.jpg",
    protea: "/assets/generated/flower-protea.dim_400x400.jpg",
    lotus: "/assets/generated/flower-lotus.dim_400x400.jpg",
    "black dahlia": "/assets/generated/flower-black-dahlia.dim_400x400.jpg",
    "blue delphinium": "/assets/generated/flower-lotus.dim_400x400.jpg",
    "bleeding heart": "/assets/generated/flower-bleeding-heart.dim_400x400.jpg",
    hellebore: "/assets/generated/flower-hellebore.dim_400x400.jpg",
    "chocolate cosmos":
      "/assets/generated/flower-chocolate-cosmos.dim_400x400.jpg",
  };

  const GREENERY_IMG_MAP: Record<string, string> = {
    eucalyptus: "/assets/generated/greenery-eucalyptus.dim_400x400.jpg",
    ruscus: "/assets/generated/greenery-ruscus.dim_400x400.jpg",
    fern: "/assets/generated/greenery-fern.dim_400x400.jpg",
    "filler stems": "/assets/generated/greenery-fillerstems.dim_400x400.jpg",
    myrtle: "/assets/generated/greenery-myrtle.dim_400x400.jpg",
    salal: "/assets/generated/greenery-salal.dim_400x400.jpg",
    "dusty miller": "/assets/generated/greenery-dustymiller.dim_400x400.jpg",
    pittosporum: "/assets/generated/greenery-pittosporum.dim_400x400.jpg",
  };

  const cx = CANVAS_W / 2;
  const bouquetCenterY = 1300;
  const flowerSize = Math.max(
    500,
    Math.min(700, 1400 / Math.max(selectedFlowers.length, 1)),
  );
  const greenerySize = flowerSize * 0.9;

  function getFlowerPositions(
    n: number,
  ): { x: number; y: number; angle: number }[] {
    if (n === 1) return [{ x: cx, y: bouquetCenterY, angle: 0 }];
    if (n === 2)
      return [
        { x: cx - flowerSize * 0.4, y: bouquetCenterY, angle: -0.1 },
        { x: cx + flowerSize * 0.4, y: bouquetCenterY, angle: 0.1 },
      ];
    const positions: { x: number; y: number; angle: number }[] = [];
    for (let i = 0; i < n; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const rowCount = Math.ceil(n / 3);
      const rowPositions = Math.min(3, n - row * 3);
      const xOffset = (col - (rowPositions - 1) / 2) * flowerSize * 0.75;
      const yOffset = (row - (rowCount - 1) / 2) * flowerSize * 0.65;
      positions.push({
        x: cx + xOffset,
        y: bouquetCenterY + yOffset,
        angle: (i % 2 === 0 ? 1 : -1) * 0.08,
      });
    }
    return positions;
  }

  function getGreeneryPositions(
    n: number,
  ): { x: number; y: number; angle: number }[] {
    if (n === 0) return [];
    const positions: { x: number; y: number; angle: number }[] = [];
    for (let i = 0; i < n; i++) {
      const spread = Math.PI * 0.8;
      const angle =
        -Math.PI / 2 - spread / 2 + (spread / Math.max(n - 1, 1)) * i;
      const r = flowerSize * 0.8;
      positions.push({
        x: cx + Math.cos(angle) * r,
        y: bouquetCenterY + Math.sin(angle) * r * 0.6 + greenerySize * 0.3,
        angle: angle + Math.PI / 2,
      });
    }
    return positions;
  }

  function drawRotatedImage(
    img: HTMLImageElement,
    x: number,
    y: number,
    size: number,
    rotAngle: number,
    alpha = 1,
  ) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(rotAngle);
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  const flowerKeys = selectedFlowers.map((f) => f.toLowerCase());
  const greeneryKeys = selectedGreenery.map((g) => g.toLowerCase());

  const [flowerImgs, greeneryImgs] = await Promise.all([
    Promise.all(
      flowerKeys.map((k) =>
        loadImg(
          FLOWER_IMG_MAP[k] ||
            "/assets/generated/flower-rose-red.dim_400x400.jpg",
        ).catch(() => null),
      ),
    ),
    Promise.all(
      greeneryKeys.map((k) =>
        loadImg(
          GREENERY_IMG_MAP[k] ||
            "/assets/generated/greenery-eucalyptus.dim_400x400.jpg",
        ).catch(() => null),
      ),
    ),
  ]);

  const validGreenery = greeneryImgs.filter(Boolean) as HTMLImageElement[];
  const validFlowers = flowerImgs.filter(Boolean) as HTMLImageElement[];

  const greenPos = getGreeneryPositions(validGreenery.length);
  validGreenery.forEach((img, i) => {
    if (greenPos[i])
      drawRotatedImage(
        img,
        greenPos[i].x,
        greenPos[i].y,
        greenerySize,
        greenPos[i].angle,
        0.85,
      );
  });

  const flowerPos = getFlowerPositions(validFlowers.length);
  validFlowers.forEach((img, i) => {
    if (flowerPos[i])
      drawRotatedImage(
        img,
        flowerPos[i].x,
        flowerPos[i].y,
        flowerSize,
        flowerPos[i].angle,
      );
  });

  const wrapTop = bouquetCenterY + flowerSize * 0.55;
  const wrapBottom = CANVAS_H - 200;
  const wrapTopW = flowerSize * (selectedFlowers.length > 3 ? 2.8 : 2.2);
  const wrapBottomW = wrapTopW * 0.55;

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.18)";
  ctx.shadowBlur = 60;
  ctx.shadowOffsetY = 20;
  const wrapGrad = ctx.createLinearGradient(
    cx - wrapTopW / 2,
    wrapTop,
    cx + wrapTopW / 2,
    wrapBottom,
  );
  wrapGrad.addColorStop(0, "#c8a97a");
  wrapGrad.addColorStop(0.4, "#e0c89a");
  wrapGrad.addColorStop(1, "#b8965c");
  ctx.fillStyle = wrapGrad;
  ctx.beginPath();
  ctx.moveTo(cx - wrapTopW / 2, wrapTop);
  ctx.lineTo(cx + wrapTopW / 2, wrapTop);
  ctx.lineTo(cx + wrapBottomW / 2, wrapBottom);
  ctx.lineTo(cx - wrapBottomW / 2, wrapBottom);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = "#5a3a1a";
  ctx.lineWidth = 3;
  for (let y = wrapTop + 40; y < wrapBottom; y += 60) {
    const progress = (y - wrapTop) / (wrapBottom - wrapTop);
    const hw = (wrapTopW / 2) * (1 - progress) + (wrapBottomW / 2) * progress;
    ctx.beginPath();
    ctx.moveTo(cx - hw, y);
    ctx.lineTo(cx + hw, y);
    ctx.stroke();
  }
  ctx.restore();

  const ribbonY = wrapTop + (wrapBottom - wrapTop) * 0.18;
  const ribbonProgress = 0.18;
  const ribbonHW =
    (wrapTopW / 2) * (1 - ribbonProgress) + (wrapBottomW / 2) * ribbonProgress;
  ctx.save();
  ctx.fillStyle = "#c0587a";
  ctx.fillRect(cx - ribbonHW, ribbonY - 22, ribbonHW * 2, 44);
  const ribbonGrad = ctx.createLinearGradient(0, ribbonY - 22, 0, ribbonY + 22);
  ribbonGrad.addColorStop(0, "rgba(255,255,255,0.3)");
  ribbonGrad.addColorStop(1, "rgba(0,0,0,0.1)");
  ctx.fillStyle = ribbonGrad;
  ctx.fillRect(cx - ribbonHW, ribbonY - 22, ribbonHW * 2, 44);
  ctx.restore();

  if (addWatermark) {
    ctx.save();
    ctx.globalAlpha = 0.28;
    ctx.font = "bold 56px Inter, sans-serif";
    ctx.fillStyle = "#7a5c3a";
    ctx.textAlign = "center";
    ctx.fillText("Created with PetalNest 💐", CANVAS_W / 2, CANVAS_H - 80);
    ctx.restore();
  }

  const parsed = parseMessage(message);
  const toName = parsed.to;
  const msgBody = parsed.body;

  if (msgBody || toName) {
    const cardW = 680;
    const cardH = 520;
    const cardX = CANVAS_W - cardW - 80;
    const cardY = wrapTop - 60;

    ctx.save();
    ctx.translate(cardX + cardW / 2, cardY + cardH / 2);
    ctx.rotate(0.03);

    ctx.shadowColor = "rgba(0,0,0,0.18)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = 12;

    ctx.fillStyle = "#fdf8f2";
    ctx.beginPath();
    const r = 24;
    const hw = cardW / 2;
    const hh = cardH / 2;
    ctx.moveTo(-hw + r, -hh);
    ctx.lineTo(hw - r, -hh);
    ctx.arcTo(hw, -hh, hw, -hh + r, r);
    ctx.lineTo(hw, hh - r);
    ctx.arcTo(hw, hh, hw - r, hh, r);
    ctx.lineTo(-hw + r, hh);
    ctx.arcTo(-hw, hh, -hw, hh - r, r);
    ctx.lineTo(-hw, -hh + r);
    ctx.arcTo(-hw, -hh, -hw + r, -hh, r);
    ctx.closePath();
    ctx.fill();

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(180,140,100,0.3)";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.font = `italic 52px ${msgFont}, serif`;
    ctx.fillStyle = msgColor;
    ctx.textAlign = "center";

    if (toName) ctx.fillText(`To: ${toName}`, 0, -hh + 80);

    if (msgBody) {
      const words = msgBody.split(" ");
      const lines: string[] = [];
      let line = "";
      for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > cardW - 80) {
          lines.push(line);
          line = word;
        } else line = test;
      }
      if (line) lines.push(line);
      const lineH = 64;
      const startY = toName ? -hh + 170 : -hh + 100;
      lines
        .slice(0, 5)
        .forEach((l, i) => ctx.fillText(l, 0, startY + i * lineH));
    }

    ctx.font = `italic 42px ${msgFont}, serif`;
    ctx.fillStyle = "rgba(160,100,80,0.7)";
    ctx.fillText("with love ♡", 0, hh - 60);
    ctx.restore();
  }

  return canvas.toDataURL("image/jpeg", 0.96);
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
  ctx.fillText("PetalNest", 0, ry + 68);

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
    ctx.fillText("Created with PetalNest \uD83D\uDC90", 28, CANVAS_H - 28);
    ctx.restore();
  }

  return canvas.toDataURL("image/jpeg", 1.0);
}

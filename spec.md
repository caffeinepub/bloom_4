# PetalNest — Bouquet Accuracy Fix

## Current State

The app has a 5-step guided flow. Step 5 shows a final bouquet by calling `matchBouquet()` in `bouquetData.ts`, which:
- Uses partial/substring matching (loose) to find entries whose flower tags are "contained" in the user's selection
- Falls back to `scoredFallback()` which picks entries with the "fewest extra flowers" — this can still return bouquets with flowers the user did NOT select
- Has 19 pre-rendered AI images shared across ~391 library entries
- No dynamic canvas composition exists for when no match is found

## Requested Changes (Diff)

### Add
- `composeDynamicBouquet(flowers, greenery, encodedMessage, watermark, font, color): Promise<string>` in `bouquetData.ts` — canvas-based bouquet composed from individual flower/greenery images
- Debug console logging in `matchBouquet` for selected flowers, matched entry, and mismatches
- Loading state message "Creating your perfect bouquet..." in `App.tsx` during dynamic composition

### Modify
- `matchBouquet()` in `bouquetData.ts`: change return type to `BouquetEntry | null`; implement strict exact matching only — `flowerTags` sorted must equal `selectedFlowers` sorted (case-insensitive, same count)
- `handleCreate()` in `App.tsx`: handle `null` from `matchBouquet`, call `composeDynamicBouquet` as fallback
- Remove `scoredFallback()` and `countExtras()` from `bouquetData.ts`

### Remove
- Partial/substring matching logic from `matchBouquet`
- `scoredFallback` function (returns entries with extra flowers — violates the strict rule)
- `countExtras` helper

## Implementation Plan

1. Update `matchBouquet` in `bouquetData.ts`:
   - Returns `BouquetEntry | null`
   - Sorts both sides, compares with exact equality
   - Logs match result to console

2. Add `composeDynamicBouquet` in `bouquetData.ts`:
   - 2400x3200 canvas, warm beige background
   - Load greenery images, draw behind in fan layout
   - Load flower images, draw in dome/crown arrangement
   - Draw kraft paper wrap at bottom (trapezoid, tan color, with ribbon)
   - Call `renderBouquetWithCard` passing the intermediate canvas URL — OR integrate card rendering inline
   - Return data URL

3. Update `handleCreate` in `App.tsx`:
   - If `matchBouquet` returns null, call `composeDynamicBouquet`
   - Show "Creating your perfect bouquet..." during composition
   - On match, proceed as before

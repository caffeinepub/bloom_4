# Bloom — Builder Interactivity & Visual Upgrade

## Current State

- `App.tsx` contains all pages: BuilderPage (with Hero inside it), GalleryPage, ViewPage, legal pages
- FlowerCard uses CSS-only hover (Tailwind `hover:scale-[1.05]`) — no framer-motion
- No animation when a flower is selected/added
- No floating bouquet panel
- BuilderHeader already has glass effect (backdrop-blur-md) but no scroll-based active section highlighting
- framer-motion (`motion/react`) is already imported and used for page transitions and whileInView scroll reveals
- Selected flowers tracked in `selectedFlowers: string[]` state in BuilderPage
- PetalAnimation is a global fixed CSS-only component
- Background sections have flat/minimal gradient backgrounds

## Requested Changes (Diff)

### Add
- `FloatingBouquetPanel` component: fixed bottom-right, glass effect, shows real selectedFlowers + selectedGreenery count and mini icons, clickable to scroll to builder section. Uses AnimatePresence to animate each flower icon in/out.
- `BouquetPreviewStack` inside the builder: shows selected flowers as small stacked icons with framer-motion AnimatePresence (scale + fade + upward motion per item). Labeled "Live Bouquet Preview".
- Background blob elements to Hero, How It Works, Use Cases sections: soft warm gradient blobs (ivory/blush/beige/peach, with 10-15% sage green accent) at very low opacity, blurred, behind content.
- Botanical line art SVG overlay (very low opacity ~5%) in 1-2 sections.
- Emotional micro-copy lines between sections: "Turn feelings into flowers", "Designed by you, for someone special", "Create something meaningful".
- Scroll-based active section tracking in BuilderHeader using IntersectionObserver — highlight active nav link.

### Modify
- `FlowerCard`: upgrade from CSS hover to `motion.button` with `whileHover={{ scale: 1.05, y: -4, boxShadow }}` and `whileTap={{ scale: 0.97 }}`. Add `layoutId` for smooth state transitions. When selected, animate a soft glow pulse ring around the card.
- `GreeneryCard` (if exists, same as FlowerCard): same motion upgrades.
- Primary CTA buttons: add `whileHover={{ scale: 1.02, y: -1 }}` and a subtle CSS pulse keyframe (very slow, 4s) for the main "Start Building" button.
- BuilderHeader: add useEffect with IntersectionObserver to track which section is in view and highlight the corresponding nav link with a soft underline or color change.
- Hero section background: add 2-3 soft gradient blob divs with warm palette + very subtle sage accent, absolutely positioned, z-index behind text.
- Section transitions: replace hard section cuts with gradient fades using overlapping pseudo-elements or gradient dividers.
- Result view (mergedImageUrl shown): ensure "Download Design", "Save Bouquet", "Share" buttons have `whileTap={{ scale: 0.96 }}` micro animation.

### Remove
- CSS-only hover transitions on FlowerCard (replaced by framer-motion)

## Implementation Plan

1. Upgrade FlowerCard to `motion.button` with whileHover + whileTap + selection ring animation
2. Add BouquetPreviewStack inside builder (above the flower grid or in a sticky sidebar): shows selected flowers as stacked mini circles with AnimatePresence, labeled "Live Bouquet Preview"
3. Add FloatingBouquetPanel (fixed, bottom-right): real selectedFlowers data, glass effect, clickable scroll-to-builder, AnimatePresence for flower icons
4. Add background gradient blobs to Hero and key landing sections
5. Add emotional micro-copy lines between sections
6. Add scroll-based active nav highlighting to BuilderHeader
7. Upgrade CTA button animations (whileHover, subtle pulse)
8. Add gradient fade dividers between sections
9. Validate and deploy

### Animation Philosophy
- Calm, premium, intentional. Duration 0.3-0.5s max. Easing: ease-out or spring(stiffness: 200, damping: 25).
- No dramatic bounces, no fast flashes.
- Stagger children at 0.08-0.12s intervals.

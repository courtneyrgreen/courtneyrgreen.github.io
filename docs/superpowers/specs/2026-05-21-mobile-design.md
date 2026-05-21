# Mobile Design Spec
**Date:** 2026-05-21
**Project:** courtneyrgreen.github.io portfolio

## Goal

Make the portfolio fully usable on mobile phones. Currently blocks mobile users with a "Desktop Only" wall. Replace that with a complete responsive experience.

---

## Breakpoints

- `max-width: 768px` — primary mobile breakpoint (stack layouts, switch nav to vertical)
- `max-width: 480px` — small mobile (tighter padding, smaller fonts)

---

## Architecture

**Single detection point in `App.jsx`:**
- Remove the `MobileBlock` early-return wall (`if (window.innerWidth < 768) return <MobileBlock />`)
- Compute `isMobile = window.innerWidth < 768` once at the top level
- Pass `isMobile` as a prop to `SolarSystem` and `Projects` — the only two components that need JS-level mobile awareness
- All other sections receive no new props; they adapt via CSS media queries only

---

## Phase 1 — Navigation (SolarSystem)

### Orbit screen
No changes. The animated solar system already scales to viewport size naturally.

### Lineup mode (mobile vertical)
When `isMobile && mode === 'lineup'`, run a vertical layout function instead of the existing horizontal one.

**Layout:**
- Sun anchors to top-center of the screen, floats with its existing animation, shows "← Orbit" label
- Thin divider line below the sun
- 8 planet rows stacked below in a centered column, each row:
  - Planet canvas (same painted canvas, displayed at lineup size)
  - Section name in Cinzel (e.g. "OBJECTIVE")
  - Planet name in small mono below (e.g. "Mercury")
  - Subtle `→` chevron on the right edge
  - Row has a faint background + border on hover/active
- Column is scrollable (`overflow-y: auto`) in case it overflows on very small screens, but all 8 rows fit comfortably on most phones (~560px total height)
- Tapping any row fires `onPlanetClick(planet.section)` — same navigation as desktop

**Animation:**
- Planets animate from their orbit positions into their vertical row positions using the same `cubic-bezier(0.4, 0, 0.2, 1)` transitions already used for horizontal lineup
- A new `layoutVertical(animate)` function mirrors the existing `layout(animate)` function but computes `top` positions along a vertical axis instead of `left` positions across a horizontal one
- On resize, re-run layout without animation (same pattern as desktop)
- When returning to orbit from vertical lineup, clear inline styles so the RAF loop takes over (same as desktop)

**Implementation location:** `SolarSystem.jsx` — add a vertical layout branch inside the existing lineup `useEffect`, gated on an `isMobile` prop.

---

## Phase 2 — Projects Mobile Carousel

### Desktop
Constellation canvas unchanged. No modifications.

### Mobile (replaces canvas when `isMobile`)
New component: `ProjectsCarousel.jsx`

**Carousel (compact view):**
- Full-screen purple cosmos background matching the desktop (same nebula blobs + star field vibe)
- Header: eyebrow "Jupiter · Project Cosmos", title "PROJECTS", subtitle "swipe to explore"
- Horizontally swipeable cards using CSS `scroll-snap-type: x mandatory` — no JS library
- Each card:
  - Image strip at top (same `aspect-ratio: 16/7`, same image as desktop card)
  - Eyebrow badge (type + year) pinned to top-right of image
  - Short label title (e.g. "Chicago Exonerations") in Cinzel
  - Truncated description (2–3 lines, `overflow: hidden`)
  - Tags (first 3–4 only to avoid overflow)
  - "tap to expand ↗" hint at bottom, separated by a thin border
- Dot indicators below the carousel (one per project, active dot is wider)
- Dots update as the user scrolls (IntersectionObserver on each card)
- Back button at bottom: "← Solar System"

**Expanded card (after tap):**
Same structure as the compact card, just grown to a centered overlay:
- Dim backdrop (`rgba(4,2,14,0.75)`) behind
- Card is `min(92vw, 480px)` wide, `max-height: 88vh`, scrollable
- Same layout as compact card but full content:
  - Image strip (taller, `height: 160px`)
  - Eyebrow badge
  - Full italic Cormorant Garamond title
  - Award callout (if present)
  - Full description text
  - All tags
  - Links (GitHub icon + "View Project →" underline link)
- "✕ Close" button top-left in Cinzel mono
- Tap backdrop to close
- Reuses the existing `ProjectCard` component with mobile-specific padding overrides via CSS

---

## Phase 3 — Section CSS Fixes

### globals.css
- `body { overflow-x: hidden }` on mobile
- `.sec-back-btn { min-height: 44px; padding: 12px 24px }` — thumb-friendly tap target

### Orbit screen (`globals.css` or `SolarSystem.css`)
- `#name-header h1` — reduce letter-spacing and font-size on mobile
- `#name-header p` — allow wrapping

### About (`About.css`)
- Already stacks portrait + info column at 600px (existing media query)
- Reduce `#about-layer` padding: `24px 40px 100px` → `16px 20px 72px` at 768px
- Journey waypoints: hide the horizontal timeline (`#obs-journey`) on mobile; show a simple vertical list of waypoint labels instead

### Objective (`Objective.css`)
- At 480px: hide `#obj-class` badge in the header bar so mission ID and title have room
- Reduce `#obj-card` body padding
- Pillars already stack at 520px (existing media query)

### Experience (`Experience.css`)
- `#exp-detail` padding: `52px 48px 48px` → `24px 20px 28px` at 768px
- `#exp-title` font-size: reduce at 480px
- Patch grid already wraps; reduce `.patch-btn` width to `88px` at 480px

### Skills (`SkillsCarousel.css`)
- Audit during implementation; likely padding and font tweaks only

### Interests (`Interests.css`)
- Minimal changes; already uses `clamp()` fonts and centered layout
- Reduce patch circle: `180px` → `140px` at 480px

### Contact (`Contact.css`)
- `#ctc-card` padding: `28px 32px 24px` → `20px 18px 20px` at 768px
- Status bar items already wrap

### Resume
- Audit during implementation

---

## Touch Handling

- `click` events on canvas elements fire on touch with a ~300ms delay — acceptable for navigation
- No explicit `touchend` listeners needed for the solar system orbit canvas; tap-to-enter-lineup works via the existing sun `onClick`
- Projects canvas is hidden on mobile entirely (replaced by carousel), so no touch handling needed there
- All interactive elements (planet rows, carousel cards, expanded card close) use standard HTML elements with `onClick` — touch works natively

---

## Files Changed

| File | Change |
|------|--------|
| `src/App.jsx` | Remove `MobileBlock`, compute `isMobile`, pass to `SolarSystem` + `Projects` |
| `src/components/SolarSystem/SolarSystem.jsx` | Add `isMobile` prop + vertical lineup layout function |
| `src/styles/SolarSystem.css` | Mobile orbit screen tweaks |
| `src/components/sections/Projects/Projects.jsx` | Render `ProjectsCarousel` when `isMobile` |
| `src/components/sections/Projects/ProjectsCarousel.jsx` | **New** — swipeable card carousel |
| `src/styles/sections/Projects.css` | Mobile card padding overrides |
| `src/styles/globals.css` | Back button touch targets, overflow-x |
| `src/styles/sections/About.css` | Padding, vertical waypoints |
| `src/styles/sections/Objective.css` | Badge hide, padding |
| `src/styles/sections/Experience.css` | Modal padding, patch size |
| `src/styles/sections/Interests.css` | Patch circle size |
| `src/styles/sections/Contact.css` | Card padding |
| `src/styles/sections/Skills.css` | TBD during impl |
| `src/styles/sections/Resume.css` | TBD during impl |

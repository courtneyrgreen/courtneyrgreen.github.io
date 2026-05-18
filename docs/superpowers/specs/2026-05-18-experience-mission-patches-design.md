# Experience Page — Mission Patch Gallery Redesign

**Date:** 2026-05-18  
**Status:** Approved for implementation

---

## Summary

Redesign the Experience page left sidebar from a plain text list into a **Mission Patch Gallery** — a 3-column grid of 8 circular mission patches, each with a unique SVG icon representing that role. Clicking a patch opens the full detail in the right panel. Also switches body/description text font from Cormorant Garamond to DM Sans.

---

## Layout

### Left Panel (300px, unchanged width)
- Header: small uppercase label "Mission Patch Collection"
- 3-column grid of 8 patches arranged 3+3+2
- Each patch: 75px diameter circle
- Below each patch: org short name in tiny monospace, mission number

### Right Panel (unchanged)
- Top of detail: large 56px patch badge beside org name + role (new addition)
- Everything else: same sections (Awards, Teaching, Responsibilities, Skills, Coursework)
- Body text font changed to DM Sans

---

## Patch Specifications

| ID    | Org                        | Icon          | Accent Color (r,g,b) |
|-------|----------------------------|---------------|----------------------|
| `gu`  | Georgetown University      | Mortar board  | 100,160,240          |
| `uva` | University of Virginia     | Rotunda cols  | 200,80,60            |
| `ap`  | Associated Press           | Globe + signal| 195,90,80            |
| `pji` | Georgetown PJI             | Scales        | 100,140,225          |
| `gh`  | Guidehouse                 | Leaf          | 80,205,100           |
| `evgo`| EVgo                       | Lightning bolt| 60,195,215           |
| `vox` | VOX Global                 | Microphone    | 80,185,205           |
| `ms`  | Mindset                    | Shield + lock | 80,195,95            |

Each patch circle:
- Background: dark radial gradient using accent color
- Border: 2.5px solid rgba(ac, 0.55)
- Outer ring: dashed pseudo-element at inset -5px, rgba(ac, 0.35)
- Inner ring: solid pseudo-element at inset 3px, rgba(ac, 0.2)
- Box shadow: glow using accent color
- Active state: stronger glow, slightly larger scale

---

## Interactions

### Hover — Spin 360° then settle
- `mouseenter`: add `.spinning` class → CSS `@keyframes spinSettle` plays once (0.55s)
- `animationend`: remove `.spinning` class
- No snap-back (animation is one-shot, not tied to hover state)

```css
@keyframes spinSettle {
  0%   { transform: scale(1)    rotate(0deg); }
  50%  { transform: scale(1.12) rotate(220deg); }
  85%  { transform: scale(1.1)  rotate(350deg); }
  100% { transform: scale(1.08) rotate(360deg); }
}
```

### Click — Select patch
- Updates `selected` state (existing `useState`)
- Detail panel updates with the clicked entry's data
- Active patch: stronger glow, scale 1.08

---

## Typography Change

Replace `font-family: 'Cormorant Garamond', serif` (inherited from `body`) with `font-family: 'DM Sans', sans-serif` on:
- `.ed-bullets li`
- `.ed-highlight` (the description text inside)
- `.ed-ta-desc`
- `.ed-sub`
- `.ed-body` (new class for any remaining body text)

DM Sans is already available via Google Fonts (loaded in index.html).

---

## Files Changed

1. **`src/components/sections/Experience.jsx`**
   - Replace left list markup with patch grid
   - Add `PatchIcon` component with SVG per entry id
   - Add `useEffect` for spin animation JS logic
   - Add patch badge to `Detail` component header
   - Add `patch` field to each entry in `EDU_ENTRIES` / `WORK_ENTRIES`

2. **`src/styles/sections/Experience.css`**
   - Remove old `exp-list-item`, `eli-*` styles
   - Add patch grid, patch circle, patch label, spin animation styles
   - Add large patch badge styles for detail header
   - Update body text to DM Sans

3. **`index.html`** (or font import location)
   - Add DM Sans to Google Fonts import if not already present

---

## Out of Scope
- Mobile responsiveness (existing page has no mobile support)
- Patch artwork refinement beyond SVG icons in code
- Changing the right panel layout beyond the badge addition and font swap

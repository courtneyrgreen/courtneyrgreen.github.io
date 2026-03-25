/*
  constellations.js — Navigation constellation definitions for the Cosmos view.

  When the user clicks the Sun, the solar system zooms out and is replaced
  by a starfield showing clickable constellations — one per portfolio section.

  Clicking a constellation (or its label) navigates to that section.

  Fields:
    name    — constellation name displayed as a label on the canvas
    section — the view/section id to navigate to when clicked
    action  — (optional) special action string; 'projects' triggers project cosmos
    lo      — {x, y} pixel offset from constellation centroid for the label
    s       — star positions as [x, y] fractions of canvas size (0–1)
    l       — line connections as [a, b] index pairs between stars
*/

export const CONSTELLATIONS = [
  {
    name:    'The Navigator',
    section: 'about',
    lo:      { x: 0, y: -20 },
    // 5-star angular bracket shape — upper-left quadrant
    s: [[.15,.25],[.22,.18],[.31,.22],[.28,.32],[.18,.35]],
    l: [[0,1],[1,2],[2,3],[3,4],[4,0],[1,3]],
  },
  {
    name:    'The Dreamer',
    section: 'projects',
    action:  'projects', // Opens the full project cosmos instead of a section layer
    lo:      { x: 10, y: -18 },
    // 5-star loop shape — upper-center-right
    s: [[.55,.20],[.63,.14],[.70,.22],[.67,.30],[.58,.28]],
    l: [[0,1],[1,2],[2,3],[3,4],[4,0]],
  },
  {
    name:    'The Architect',
    section: 'experience',
    lo:      { x: -5, y: 22 },
    // 6-star complex shape — center of canvas
    s: [[.38,.55],[.45,.48],[.55,.50],[.52,.60],[.42,.63],[.35,.57]],
    l: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,3],[0,3]],
  },
  {
    name:    'The Wanderer',
    section: 'resume',
    lo:      { x: 0, y: -18 },
    // 5-star pentagon — right side
    s: [[.72,.55],[.79,.50],[.85,.58],[.80,.65],[.73,.64]],
    l: [[0,1],[1,2],[2,3],[3,4],[4,0],[0,2]],
  },
  {
    name:    'The Keeper',
    section: 'skills',
    lo:      { x: -10, y: 22 },
    // 4-star diamond — lower-left
    s: [[.18,.65],[.25,.60],[.30,.68],[.24,.75]],
    l: [[0,1],[1,2],[2,3],[3,0],[0,2]],
  },
]

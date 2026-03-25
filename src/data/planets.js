/*
  planets.js — Solar system planet definitions.

  Each entry describes one planet in the animated solar system.
  Fields:
    id          — unique identifier, also used as DOM key
    label       — display name shown on hover
    section     — which portfolio section this planet navigates to
    orbitR      — orbit radius in abstract units (scaled to screen at render time)
    size        — planet canvas size in pixels
    speed       — orbital speed in radians per millisecond
    startAngle  — initial orbital angle in radians (spread out to avoid clumping)
    rings       — (optional) true if planet has a ring system (Saturn)
    paintConfig — passed to paintPlanet() in painters.js to draw the canvas texture
*/

export const PLANET_DEFS = [

  /* ── 1. MERCURY → About ─────────────────────────────────────────── */
  {
    id: 'mercury', label: 'Mercury', lineupLabel: 'About', section: 'about',
    orbitR: 82, size: 16,
    speed: 0.00028, startAngle: Math.PI * 0.12,
    paintConfig: {
      sphere: [[0,'#918880'],[0.4,'#7a7068'],[0.72,'#524840'],[1,'#1a1410']],
      // Crater-like surface blobs
      blobs: [
        { x:0.36, y:0.34, r:0.18, c0:'rgba(100,92,84,0.55)' },
        { x:0.64, y:0.56, r:0.14, c0:'rgba(72,64,58,0.48)'  },
        { x:0.28, y:0.62, r:0.12, c0:'rgba(88,82,76,0.42)'  },
      ],
      specular:   'rgba(210,200,190,0.24)',
      specular2:  'rgba(190,182,175,0.07)',
      atmosphere: 'rgba(80,70,60,0.08)',
    },
  },

  /* ── 2. VENUS → Experience ──────────────────────────────────────── */
  {
    id: 'venus', label: 'Venus', lineupLabel: 'Resume', section: 'resume',
    orbitR: 114, size: 22,
    speed: 0.00018, startAngle: Math.PI * 0.82,
    paintConfig: {
      sphere: [[0,'#ede0b0'],[0.38,'#d4c080'],[0.65,'#b89e58'],[1,'#4a3a18']],
      // Thick cloud bands
      bands: [
        { lat:0.30, width:0.10, color:'rgba(230,215,160,0.28)' },
        { lat:0.50, width:0.12, color:'rgba(220,205,145,0.22)' },
        { lat:0.70, width:0.10, color:'rgba(210,195,130,0.20)' },
      ],
      streaks: [
        { x:0.5, y:0.32, w:0.80, h:0.055, color:'rgba(255,248,210,0.22)', angle:-0.04 },
        { x:0.5, y:0.55, w:0.70, h:0.045, color:'rgba(248,240,195,0.18)', angle: 0.03 },
        { x:0.5, y:0.72, w:0.75, h:0.050, color:'rgba(240,232,182,0.16)', angle:-0.03 },
      ],
      specular:   'rgba(255,252,220,0.32)',
      specular2:  'rgba(255,248,200,0.09)',
      atmosphere: 'rgba(220,200,130,0.30)',
    },
  },

  /* ── 3. EARTH → Projects ────────────────────────────────────────── */
  {
    id: 'earth', label: 'Earth', lineupLabel: 'Experience', section: 'experience',
    orbitR: 150, size: 24,
    speed: 0.00013, startAngle: Math.PI * 1.50,
    paintConfig: {
      sphere: [[0,'#1e5898'],[0.32,'#1a4e88'],[0.60,'#124070'],[1,'#06152a']],
      // Green landmass blobs over blue ocean base
      blobs: [
        { x:0.30, y:0.30, r:0.22, c0:'rgba(42,98,58,0.68)'  },
        { x:0.60, y:0.44, r:0.18, c0:'rgba(38,88,50,0.58)'  },
        { x:0.22, y:0.58, r:0.16, c0:'rgba(48,108,64,0.52)' },
        { x:0.68, y:0.28, r:0.12, c0:'rgba(36,82,46,0.45)'  },
        { x:0.52, y:0.70, r:0.14, c0:'rgba(55,115,70,0.42)' },
      ],
      // White cloud streaks
      streaks: [
        { x:0.5, y:0.20, w:0.72, h:0.048, color:'rgba(238,246,255,0.26)', angle:-0.04 },
        { x:0.5, y:0.40, w:0.58, h:0.038, color:'rgba(238,246,255,0.20)', angle: 0.05 },
        { x:0.5, y:0.66, w:0.78, h:0.048, color:'rgba(238,246,255,0.18)', angle:-0.03 },
      ],
      specular:   'rgba(180,218,255,0.36)',
      specular2:  'rgba(150,200,255,0.10)',
      atmosphere: 'rgba(80,145,255,0.38)',
    },
  },

  /* ── 4. MARS → Skills ───────────────────────────────────────────── */
  {
    id: 'mars', label: 'Mars', lineupLabel: 'Skills', section: 'skills',
    orbitR: 190, size: 20,
    speed: 0.000082, startAngle: Math.PI * 0.42,
    paintConfig: {
      sphere: [[0,'#c86438'],[0.36,'#b05228'],[0.65,'#8c3e18'],[1,'#2c1008']],
      // Polar ice caps as light bands at top/bottom
      bands: [
        { lat:0.08, width:0.10, color:'rgba(228,222,205,0.32)' },
        { lat:0.90, width:0.12, color:'rgba(215,210,195,0.26)' },
      ],
      // Terrain / volcanic feature blobs
      blobs: [
        { x:0.40, y:0.38, r:0.22, c0:'rgba(165,75,32,0.60)'  },
        { x:0.62, y:0.32, r:0.17, c0:'rgba(148,58,22,0.52)'  },
        { x:0.25, y:0.62, r:0.15, c0:'rgba(178,88,38,0.45)'  },
        { x:0.65, y:0.65, r:0.12, c0:'rgba(128,50,18,0.40)'  },
      ],
      specular:   'rgba(255,205,165,0.24)',
      specular2:  'rgba(255,185,145,0.07)',
      atmosphere: 'rgba(195,98,55,0.28)',
    },
  },

  /* ── 5. JUPITER → Resume ────────────────────────────────────────── */
  {
    id: 'jupiter', label: 'Jupiter', lineupLabel: 'Projects', section: 'projects',
    orbitR: 238, size: 52,
    speed: 0.000048, startAngle: Math.PI * 1.20,
    paintConfig: {
      sphere: [[0,'#d8c498'],[0.30,'#c8b480'],[0.58,'#a89060'],[0.80,'#806840'],[1,'#2a2010']],
      // Characteristic horizontal storm bands
      bands: [
        { lat:0.18, width:0.06, color:'rgba(140,100,60,0.42)' },
        { lat:0.28, width:0.08, color:'rgba(105,72,42,0.52)'  },
        { lat:0.40, width:0.06, color:'rgba(155,118,72,0.38)' },
        { lat:0.52, width:0.09, color:'rgba(98,68,38,0.50)'   },
        { lat:0.63, width:0.07, color:'rgba(148,110,65,0.36)' },
        { lat:0.74, width:0.06, color:'rgba(110,78,45,0.44)'  },
        { lat:0.84, width:0.05, color:'rgba(135,98,58,0.32)'  },
      ],
      blobs: [
        // Great Red Spot — subtle oval in lower-left quadrant
        { x:0.30, y:0.62, r:0.09, c0:'rgba(148,72,50,0.48)' },
      ],
      streaks: [
        { x:0.5, y:0.28, w:0.90, h:0.030, color:'rgba(215,195,155,0.30)', angle:0.0 },
        { x:0.5, y:0.52, w:0.92, h:0.025, color:'rgba(200,178,138,0.26)', angle:0.0 },
      ],
      specular:   'rgba(255,248,215,0.26)',
      specular2:  'rgba(248,238,198,0.08)',
      atmosphere: 'rgba(190,162,105,0.20)',
    },
  },

  /* ── 6. SATURN → Field Notes ────────────────────────────────────── */
  {
    id: 'saturn', label: 'Saturn', lineupLabel: 'Field Notes', section: 'fieldnotes',
    orbitR: 290, size: 40,
    speed: 0.000032, startAngle: Math.PI * 0.68,
    rings: true, // Draws an SVG ring system around the canvas
    paintConfig: {
      sphere: [[0,'#e0c87a'],[0.28,'#ccb060'],[0.55,'#a88a3a'],[0.78,'#7a6220'],[1,'#28200a']],
      bands: [
        { lat:0.26, width:0.07, color:'rgba(155,122,48,0.40)' },
        { lat:0.38, width:0.05, color:'rgba(118,88,28,0.38)'  },
        { lat:0.50, width:0.08, color:'rgba(145,112,42,0.34)' },
        { lat:0.64, width:0.06, color:'rgba(108,80,22,0.35)'  },
        { lat:0.76, width:0.05, color:'rgba(132,100,35,0.30)' },
      ],
      specular:   'rgba(255,245,185,0.30)',
      specular2:  'rgba(255,238,168,0.09)',
      atmosphere: 'rgba(195,168,78,0.22)',
    },
  },

  /* ── 7. URANUS → decorative ─────────────────────────────────────── */
  {
    id: 'uranus', label: 'Uranus', lineupLabel: null, section: null,
    orbitR: 340, size: 32,
    speed: 0.000020, startAngle: Math.PI * 1.78,
    paintConfig: {
      sphere: [[0,'#a8d8d8'],[0.38,'#88c0c0'],[0.65,'#60a0a0'],[1,'#102828']],
      bands: [
        { lat:0.32, width:0.09, color:'rgba(148,210,210,0.22)' },
        { lat:0.55, width:0.08, color:'rgba(128,195,195,0.18)' },
        { lat:0.72, width:0.07, color:'rgba(110,180,180,0.15)' },
      ],
      specular:   'rgba(210,248,248,0.30)',
      specular2:  'rgba(195,238,238,0.09)',
      atmosphere: 'rgba(88,185,185,0.32)',
    },
  },

  /* ── 8. NEPTUNE → Contact ───────────────────────────────────────── */
  {
    id: 'neptune', label: 'Neptune', lineupLabel: 'Contact', section: 'contact',
    orbitR: 392, size: 30,
    speed: 0.000012, startAngle: Math.PI * 0.95,
    paintConfig: {
      sphere: [[0,'#3060c8'],[0.35,'#2250a8'],[0.62,'#183c88'],[1,'#060c2a']],
      bands: [
        { lat:0.36, width:0.09, color:'rgba(88,145,228,0.28)' },
        { lat:0.58, width:0.07, color:'rgba(60,112,200,0.22)' },
      ],
      // Storm system blobs
      blobs: [
        { x:0.38, y:0.42, r:0.16, c0:'rgba(48,88,210,0.40)'  },
        { x:0.60, y:0.60, r:0.13, c0:'rgba(38,72,195,0.35)'  },
      ],
      streaks: [
        { x:0.5, y:0.40, w:0.68, h:0.038, color:'rgba(120,168,248,0.20)', angle:-0.06 },
        { x:0.5, y:0.62, w:0.62, h:0.030, color:'rgba(95,142,228,0.16)',  angle: 0.05 },
      ],
      specular:   'rgba(148,195,255,0.30)',
      specular2:  'rgba(118,168,255,0.08)',
      atmosphere: 'rgba(48,108,248,0.38)',
    },
  },
]

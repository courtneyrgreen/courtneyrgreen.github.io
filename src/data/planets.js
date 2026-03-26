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

  /* ── 1. MERCURY → Objective ─────────────────────────────────────── */
  {
    id: 'mercury', label: 'Mercury', lineupLabel: 'Objective', section: 'objective',
    orbitR: 82, size: 16, lineupSize: 28, glowColor: 'rgba(190,178,165,0.85)',
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

  /* ── 2. VENUS → About ───────────────────────────────────────────── */
  {
    id: 'venus', label: 'Venus', lineupLabel: 'About', section: 'about',
    orbitR: 114, size: 22, lineupSize: 30, glowColor: 'rgba(225,195,130,0.85)',
    speed: 0.00018, startAngle: Math.PI * 0.82,
    paintConfig: {
      // Warm tan/caramel base with visible banded cloud layers
      sphere: [[0,'#deb880'],[0.28,'#c8a060'],[0.55,'#a07840'],[0.78,'#6a4e20'],[1,'#1e1208']],
      bands: [
        { lat:0.18, width:0.18, color:'rgba(245,228,190,0.32)' },  // cream
        { lat:0.30, width:0.20, color:'rgba(148,98,48,0.30)'   },  // dark brown
        { lat:0.42, width:0.18, color:'rgba(242,222,182,0.30)' },  // cream
        { lat:0.54, width:0.20, color:'rgba(158,105,52,0.32)'  },  // dark brown
        { lat:0.66, width:0.18, color:'rgba(238,218,175,0.28)' },  // cream
        { lat:0.78, width:0.20, color:'rgba(145,96,46,0.28)'   },  // dark brown
      ],
      streaks: [
        // Wavy cloud streaks adding organic texture to the bands
        { x:0.5, y:0.30, w:0.85, h:0.04, color:'rgba(245,230,195,0.28)', angle:-0.06 },
        { x:0.5, y:0.46, w:0.82, h:0.05, color:'rgba(240,225,185,0.24)', angle: 0.05 },
        { x:0.5, y:0.62, w:0.88, h:0.04, color:'rgba(242,228,190,0.26)', angle:-0.04 },
      ],
      specular:   'rgba(255,238,200,0.32)',
      specular2:  'rgba(255,228,185,0.10)',
      atmosphere: 'rgba(210,168,90,0.28)',
    },
  },

  /* ── 3. EARTH → Projects ────────────────────────────────────────── */
  {
    id: 'earth', label: 'Earth', lineupLabel: 'Experience', section: 'experience',
    orbitR: 150, size: 24, lineupSize: 32, glowColor: 'rgba(72,155,255,0.85)',
    speed: 0.00013, startAngle: Math.PI * 1.50,
    paintConfig: {
      // Brighter, more saturated blue ocean
      sphere: [[0,'#2878d8'],[0.30,'#1c62c0'],[0.58,'#1248a0'],[0.82,'#082060'],[1,'#020a1e']],
      // Vibrant green landmasses — high opacity so they show through the blue
      blobs: [
        { x:0.28, y:0.28, r:0.26, c0:'rgba(38,162,58,0.96)'  },  // large continent upper-left
        { x:0.58, y:0.38, r:0.22, c0:'rgba(34,152,52,0.92)'  },  // continent right
        { x:0.20, y:0.58, r:0.20, c0:'rgba(42,168,62,0.90)'  },  // lower-left landmass
        { x:0.65, y:0.24, r:0.16, c0:'rgba(30,145,48,0.88)'  },  // upper-right
        { x:0.50, y:0.68, r:0.18, c0:'rgba(48,175,68,0.88)'  },  // southern continent
      ],
      // Bright white cloud streaks
      streaks: [
        { x:0.5, y:0.22, w:0.75, h:0.05,  color:'rgba(245,250,255,0.34)', angle:-0.04 },
        { x:0.5, y:0.44, w:0.62, h:0.042, color:'rgba(240,248,255,0.28)', angle: 0.05 },
        { x:0.5, y:0.65, w:0.80, h:0.05,  color:'rgba(245,250,255,0.30)', angle:-0.03 },
      ],
      specular:   'rgba(190,228,255,0.42)',
      specular2:  'rgba(160,210,255,0.12)',
      atmosphere: 'rgba(72,148,255,0.45)',
    },
  },

  /* ── 4. MARS → Resume ───────────────────────────────────────────── */
  {
    id: 'mars', label: 'Mars', lineupLabel: 'Resume', section: 'resume',
    orbitR: 190, size: 20, lineupSize: 28, glowColor: 'rgba(220,75,35,0.85)',
    speed: 0.000082, startAngle: Math.PI * 0.42,
    paintConfig: {
      // Vivid orange-red — no bands, just rich terrain blobs
      sphere: [[0,'#e06535'],[0.30,'#cc5020'],[0.58,'#a03a12'],[0.82,'#6a2208'],[1,'#1e0604']],
      blobs: [
        // Bright orange highland (upper-left, Tharsis region)
        { x:0.32, y:0.28, r:0.26, c0:'rgba(235,108,45,0.58)' },
        // Lighter orange mid-region
        { x:0.65, y:0.35, r:0.20, c0:'rgba(215,88,32,0.48)'  },
        // Dark cratered southern terrain patches
        { x:0.25, y:0.60, r:0.18, c0:'rgba(72,18,6,0.55)'    },
        { x:0.60, y:0.62, r:0.16, c0:'rgba(85,24,8,0.48)'    },
        // Mid-tone lower region
        { x:0.45, y:0.76, r:0.22, c0:'rgba(165,60,20,0.42)'  },
      ],
      specular:   'rgba(255,215,175,0.38)',
      specular2:  'rgba(255,195,150,0.12)',
      atmosphere: 'rgba(215,82,32,0.42)',
    },
  },

  /* ── 5. JUPITER → Resume ────────────────────────────────────────── */
  {
    id: 'jupiter', label: 'Jupiter', lineupLabel: 'Projects', section: 'projects',
    orbitR: 238, size: 52, lineupSize: 42, glowColor: 'rgba(205,180,120,0.85)',
    speed: 0.000048, startAngle: Math.PI * 1.20,
    paintConfig: {
      sphere: [[0,'#d8c498'],[0.30,'#c8b480'],[0.58,'#a89060'],[0.80,'#806840'],[1,'#2a2010']],
      // Characteristic horizontal storm bands
      bands: [
        { lat:0.18, width:0.16, color:'rgba(140,100,60,0.26)' },
        { lat:0.28, width:0.18, color:'rgba(105,72,42,0.30)'  },
        { lat:0.40, width:0.16, color:'rgba(155,118,72,0.24)' },
        { lat:0.52, width:0.18, color:'rgba(98,68,38,0.28)'   },
        { lat:0.63, width:0.17, color:'rgba(148,110,65,0.22)' },
        { lat:0.74, width:0.16, color:'rgba(110,78,45,0.26)'  },
        { lat:0.84, width:0.15, color:'rgba(135,98,58,0.20)'  },
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

  /* ── 6. SATURN → Skills ─────────────────────────────────────────── */
  {
    id: 'saturn', label: 'Saturn', lineupLabel: 'Skills', section: 'skills',
    orbitR: 290, size: 40, lineupSize: 36, glowColor: 'rgba(215,190,80,0.85)',
    speed: 0.000032, startAngle: Math.PI * 0.68,
    rings: 'saturn',
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

  /* ── 7. URANUS → Interests ──────────────────────────────────────── */
  {
    id: 'uranus', label: 'Uranus', lineupLabel: 'Interests', section: 'interests',
    orbitR: 340, size: 32, lineupSize: 34, glowColor: 'rgba(95,205,205,0.85)',
    speed: 0.000020, startAngle: Math.PI * 1.78,
    rings: 'uranus',
    paintConfig: {
      sphere: [[0,'#a8d8d8'],[0.38,'#88c0c0'],[0.65,'#60a0a0'],[1,'#102828']],
      bands: [
        // Wide soft bands — teal on teal, no harsh edges
        { lat:0.32, width:0.22, color:'rgba(148,210,210,0.14)' },
        { lat:0.55, width:0.24, color:'rgba(128,195,195,0.12)' },
        { lat:0.72, width:0.20, color:'rgba(110,180,180,0.10)' },
      ],
      specular:   'rgba(210,248,248,0.30)',
      specular2:  'rgba(195,238,238,0.09)',
      atmosphere: 'rgba(88,185,185,0.32)',
    },
  },

  /* ── 8. NEPTUNE → Contact ───────────────────────────────────────── */
  {
    id: 'neptune', label: 'Neptune', lineupLabel: 'Contact', section: 'contact',
    orbitR: 392, size: 30, lineupSize: 32, glowColor: 'rgba(55,115,240,0.85)',
    speed: 0.000012, startAngle: Math.PI * 0.95,
    paintConfig: {
      // Deep vivid blue base
      sphere: [[0,'#2878e8'],[0.30,'#1c62d0'],[0.58,'#1248a8'],[0.82,'#062878'],[1,'#010818']],
      // Lighter and darker blue bands only — no green, stays in the blue family
      bands: [
        { lat:0.18, width:0.18, color:'rgba(100,175,255,0.32)' },  // light blue
        { lat:0.32, width:0.18, color:'rgba(18, 55,180,0.28)'  },  // dark blue
        { lat:0.46, width:0.18, color:'rgba(110,188,255,0.30)' },  // light blue
        { lat:0.60, width:0.18, color:'rgba(20, 58,185,0.28)'  },  // dark blue
        { lat:0.74, width:0.17, color:'rgba(95, 165,248,0.26)' },  // light blue
      ],
      blobs: [
        // Great Dark Spot
        { x:0.40, y:0.45, r:0.10, c0:'rgba(10,35,155,0.60)' },
      ],
      streaks: [
        { x:0.5, y:0.28, w:0.78, h:0.035, color:'rgba(165,215,255,0.24)', angle:-0.04 },
        { x:0.5, y:0.55, w:0.72, h:0.030, color:'rgba(148,200,255,0.20)', angle: 0.04 },
      ],
      specular:   'rgba(168,215,255,0.38)',
      specular2:  'rgba(135,195,255,0.10)',
      atmosphere: 'rgba(48,118,255,0.45)',
    },
  },
]

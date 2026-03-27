/*
  painters.js — Canvas drawing utilities for the Sun and planets.

  These functions paint directly onto an HTML <canvas> element using
  the 2D Canvas API. They are called once per canvas when the component
  mounts (planets don't need to be repainted since they don't animate
  their surface — only their orbital position changes).

  Exported functions:
    paintSun(canvas, size)
    paintPlanet(canvas, size, config)
*/

/* ─────────────────────────────────────────────────────────────────────
   paintSun — draws a glowing sun sphere.

   Layers (bottom to top):
     1. Core radial gradient  — warm yellow/orange center, dark limb
     2. Equatorial band       — subtle brightening strip at equator
     3. Shading wrap          — darkens the right/bottom limb for depth
     4. Specular highlight    — bright spot at upper-left (light source)
     5. Corona glow           — faint orange halo at the edge
───────────────────────────────────────────────────────────────────── */
export function paintSun(canvas, size) {
  const R = size / 2
  const ctx = canvas.getContext('2d')
  canvas.width = canvas.height = size

  // Clip everything to a circle
  ctx.save()
  ctx.beginPath()
  ctx.arc(R, R, R, 0, Math.PI * 2)
  ctx.clip()

  // ── 1. Core sphere gradient ──────────────────────────────────────
  const core = ctx.createRadialGradient(R * 0.58, R * 0.50, 0, R, R, R)
  core.addColorStop(0,    '#fff8d0')
  core.addColorStop(0.18, '#ffe060')
  core.addColorStop(0.45, '#f5a020')
  core.addColorStop(0.70, '#e06818')
  core.addColorStop(0.88, '#cc4e10')
  core.addColorStop(1,    '#b03a08')
  ctx.fillStyle = core
  ctx.fillRect(0, 0, size, size)

  // ── 2. Solar granulation — mottled convection cells ──────────────
  const granules = [
    { x: 0.38, y: 0.30, r: 0.24, c0: 'rgba(255,240,140,0.28)' },
    { x: 0.65, y: 0.42, r: 0.20, c0: 'rgba(255,210,70,0.22)'  },
    { x: 0.50, y: 0.62, r: 0.22, c0: 'rgba(255,220,90,0.24)'  },
    { x: 0.28, y: 0.55, r: 0.18, c0: 'rgba(220,120,20,0.18)'  },
    { x: 0.72, y: 0.65, r: 0.19, c0: 'rgba(255,225,100,0.22)' },
    { x: 0.55, y: 0.24, r: 0.16, c0: 'rgba(255,250,180,0.26)' },
    { x: 0.20, y: 0.38, r: 0.17, c0: 'rgba(200,100,15,0.16)'  },
    { x: 0.78, y: 0.30, r: 0.15, c0: 'rgba(255,215,80,0.20)'  },
    { x: 0.42, y: 0.75, r: 0.16, c0: 'rgba(180,70,10,0.18)'   },
    { x: 0.68, y: 0.22, r: 0.14, c0: 'rgba(255,240,150,0.22)' },
  ]
  granules.forEach(g => {
    const gx = g.x * size, gy = g.y * size, gr = g.r * size
    const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr)
    grad.addColorStop(0, g.c0)
    grad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
  })

  // ── 3. Solar prominence streaks — bright faculae near equator ────
  const streaks = [
    { x: 0.50, y: 0.48, w: 0.55, h: 0.06, angle: -0.06, c: 'rgba(255,235,130,0.10)' },
    { x: 0.45, y: 0.60, w: 0.40, h: 0.04, angle:  0.04, c: 'rgba(255,210,80,0.08)'  },
    { x: 0.55, y: 0.36, w: 0.30, h: 0.03, angle: -0.03, c: 'rgba(255,245,160,0.09)' },
  ]
  streaks.forEach(s => {
    ctx.save()
    ctx.translate(s.x * size, s.y * size)
    ctx.rotate(s.angle)
    const sg = ctx.createLinearGradient(-s.w * size / 2, 0, s.w * size / 2, 0)
    sg.addColorStop(0,   'rgba(255,255,255,0)')
    sg.addColorStop(0.3, s.c)
    sg.addColorStop(0.7, s.c)
    sg.addColorStop(1,   'rgba(255,255,255,0)')
    ctx.fillStyle = sg
    ctx.fillRect(-s.w * size / 2, -s.h * size / 2, s.w * size, s.h * size)
    ctx.restore()
  })

  // ── 4. Limb darkening — realistic solar physics ───────────────────
  const limb = ctx.createRadialGradient(R, R, R * 0.28, R, R, R)
  limb.addColorStop(0,    'rgba(0,0,0,0)')
  limb.addColorStop(0.55, 'rgba(60,8,0,0.06)')
  limb.addColorStop(0.80, 'rgba(80,10,0,0.22)')
  limb.addColorStop(1,    'rgba(40,4,0,0.55)')
  ctx.fillStyle = limb
  ctx.fillRect(0, 0, size, size)

  ctx.restore()
}

/* ─────────────────────────────────────────────────────────────────────
   paintPlanet — draws a realistic planet sphere onto a canvas.

   @param {HTMLCanvasElement} canvas  Target canvas element
   @param {number}            size    Canvas width/height in pixels
   @param {Object}            cfg     Planet visual configuration

   cfg fields:
     sphere     {Array}  — radial gradient stops: [[offset, color], ...]
     bands      {Array?} — horizontal latitude strips (atmospheric bands)
     blobs      {Array?} — radial detail blobs (terrain / storm features)
     streaks    {Array?} — thin angled cloud-streak rectangles
     specular   {string?}— primary specular highlight color
     specular2  {string?}— secondary specular falloff color
     atmosphere {string?}— atmosphere rim glow color

   Layers (bottom to top):
     1. Base sphere gradient
     2. Atmospheric latitude bands
     3. Surface detail blobs
     4. Cloud streaks
     5. 3-D shading wrap (darkens limb)
     6. Specular highlight
     7. Atmosphere rim glow
───────────────────────────────────────────────────────────────────── */
export function paintPlanet(canvas, size, cfg) {
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const R = size / 2

  // Clip all drawing to a circular mask
  ctx.save()
  ctx.beginPath()
  ctx.arc(R, R, R, 0, Math.PI * 2)
  ctx.clip()

  // ── 1. Base sphere gradient ──────────────────────────────────────
  const sph = ctx.createRadialGradient(R * 0.6, R * 0.55, 0, R, R, R)
  cfg.sphere.forEach(([stop, col]) => sph.addColorStop(stop, col))
  ctx.fillStyle = sph
  ctx.fillRect(0, 0, size, size)

  // ── 2. Atmospheric bands ─────────────────────────────────────────
  // Each band is a horizontal strip at a given latitude, fading at edges
  if (cfg.bands) {
    cfg.bands.forEach(b => {
      const y0 = (b.lat - b.width / 2) * size
      const y1 = (b.lat + b.width / 2) * size
      const bGrad = ctx.createLinearGradient(0, y0, 0, y1)
      bGrad.addColorStop(0,   'rgba(0,0,0,0)')
      bGrad.addColorStop(0.2, b.color)
      bGrad.addColorStop(0.8, b.color)
      bGrad.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.fillStyle = bGrad
      ctx.fillRect(0, y0, size, y1 - y0)
    })
  }

  // ── 3. Surface detail blobs ──────────────────────────────────────
  // Soft radial blobs simulate landmasses, craters, or storm systems
  if (cfg.blobs) {
    cfg.blobs.forEach(blob => {
      const bx = blob.x * size
      const by = blob.y * size
      const br = blob.r * size
      const bg = ctx.createRadialGradient(bx, by, 0, bx, by, br)
      bg.addColorStop(0, blob.c0)
      bg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.beginPath()
      ctx.arc(bx, by, br, 0, Math.PI * 2)
      ctx.fillStyle = bg
      ctx.fill()
    })
  }

  // ── 4. Cloud streaks ─────────────────────────────────────────────
  // Thin translucent rectangles at a slight angle simulate cloud layers
  if (cfg.streaks) {
    cfg.streaks.forEach(s => {
      ctx.save()
      ctx.translate(s.x * size, s.y * size)
      ctx.rotate(s.angle || 0)
      const sg = ctx.createLinearGradient(-s.w * size / 2, 0, s.w * size / 2, 0)
      sg.addColorStop(0,   'rgba(255,255,255,0)')
      sg.addColorStop(0.3, s.color)
      sg.addColorStop(0.7, s.color)
      sg.addColorStop(1,   'rgba(255,255,255,0)')
      ctx.fillStyle = sg
      ctx.fillRect(-s.w * size / 2, -s.h * size / 2, s.w * size, s.h * size)
      ctx.restore()
    })
  }

  // ── 5. 3-D shading wrap ──────────────────────────────────────────
  // Dark gradient on the right/bottom limb creates the spherical illusion
  const shade = ctx.createRadialGradient(R * 0.55, R * 0.5, 0, R * 1.05, R * 1.05, R * 1.4)
  shade.addColorStop(0,    'rgba(0,0,0,0)')
  shade.addColorStop(0.55, 'rgba(0,0,0,0.04)')
  shade.addColorStop(0.82, 'rgba(0,0,0,0.32)')
  shade.addColorStop(1,    'rgba(0,0,0,0.72)')
  ctx.fillStyle = shade
  ctx.fillRect(0, 0, size, size)

  // ── 6. Specular highlight ────────────────────────────────────────
  // Bright spot at upper-left — simulates a consistent light source
  const spec = ctx.createRadialGradient(R * 0.52, R * 0.42, 0, R * 0.52, R * 0.42, R * 0.38)
  spec.addColorStop(0,   cfg.specular  || 'rgba(255,255,255,0.28)')
  spec.addColorStop(0.4, cfg.specular2 || 'rgba(255,255,255,0.07)')
  spec.addColorStop(1,   'rgba(255,255,255,0)')
  ctx.fillStyle = spec
  ctx.fillRect(0, 0, size, size)

  // ── 7. Atmosphere rim glow ───────────────────────────────────────
  // Coloured halo at the planet edge suggests an atmospheric layer
  const atm = ctx.createRadialGradient(R, R, R * 0.78, R, R, R)
  atm.addColorStop(0,   'rgba(0,0,0,0)')
  atm.addColorStop(0.7, 'rgba(0,0,0,0)')
  atm.addColorStop(1,   cfg.atmosphere || 'rgba(100,130,255,0.25)')
  ctx.fillStyle = atm
  ctx.fillRect(0, 0, size, size)

  ctx.restore()
}

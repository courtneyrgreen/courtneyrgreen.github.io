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

  // ── 1. Core sphere gradient ──────────────────────────────────────
  // Off-center radial gradient creates the illusion of depth / 3-D
  const core = ctx.createRadialGradient(R * 0.58, R * 0.50, 0, R, R, R)
  core.addColorStop(0,    '#fff8d0')
  core.addColorStop(0.18, '#ffe060')
  core.addColorStop(0.45, '#f5a020')
  core.addColorStop(0.70, '#e06818')
  core.addColorStop(0.88, '#cc4e10')
  core.addColorStop(1,    '#b03a08')
  ctx.beginPath()
  ctx.arc(R, R, R, 0, Math.PI * 2)
  ctx.fillStyle = core
  ctx.fill()

  // ── 2. Equatorial brightening band ──────────────────────────────
  ctx.save()
  ctx.beginPath()
  ctx.arc(R, R, R, 0, Math.PI * 2)
  ctx.clip()
  const band = ctx.createLinearGradient(0, R * 0.55, 0, R * 1.45)
  band.addColorStop(0,   'rgba(255,220,100,0)')
  band.addColorStop(0.3, 'rgba(255,210,80,0.10)')
  band.addColorStop(0.5, 'rgba(255,200,60,0.14)')
  band.addColorStop(0.7, 'rgba(255,210,80,0.10)')
  band.addColorStop(1,   'rgba(255,220,100,0)')
  ctx.fillStyle = band
  ctx.fillRect(0, 0, size, size)
  ctx.restore()

  // ── 3. Limb warm tint — subtle deepening at the edge, stays warm ─
  ctx.save()
  ctx.beginPath()
  ctx.arc(R, R, R, 0, Math.PI * 2)
  ctx.clip()
  const shade = ctx.createRadialGradient(R * 0.55, R * 0.5, R * 0.3, R, R, R)
  shade.addColorStop(0,    'rgba(0,0,0,0)')
  shade.addColorStop(0.65, 'rgba(80,10,0,0.04)')
  shade.addColorStop(0.88, 'rgba(80,10,0,0.10)')
  shade.addColorStop(1,    'rgba(60,8,0,0.18)')
  ctx.fillStyle = shade
  ctx.fillRect(0, 0, size, size)
  ctx.restore()

  // ── 4. Specular highlight — bright white spot upper-left ─────────
  const spec = ctx.createRadialGradient(R * 0.52, R * 0.42, 0, R * 0.52, R * 0.42, R * 0.38)
  spec.addColorStop(0,   'rgba(255,255,240,0.55)')
  spec.addColorStop(0.4, 'rgba(255,250,200,0.14)')
  spec.addColorStop(1,   'rgba(255,255,255,0)')
  ctx.fillStyle = spec
  ctx.fillRect(0, 0, size, size)

  // ── 5. Corona glow — warm orange halo at edge ────────────────────
  const glow = ctx.createRadialGradient(R, R, R * 0.78, R, R, R)
  glow.addColorStop(0,   'rgba(0,0,0,0)')
  glow.addColorStop(0.5, 'rgba(255,160,20,0.08)')
  glow.addColorStop(1,   'rgba(255,120,10,0.28)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, size, size)
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

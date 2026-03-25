import { useEffect, useRef } from 'react'
import { CONSTELLATIONS } from '../../data/constellations.js'
import '../../styles/Cosmos.css'

/*
  Cosmos — the constellation navigation view, shown after clicking the Sun.

  Two layered canvases fill the screen:
    #sc  — animated background star field (twinkling, coloured stars)
    #cc  — constellation lines, star dots, and clickable hit areas

  Constellations fade in one by one after the view mounts, each with:
    1. Dashed lines connecting the stars (drawn onto #cc)
    2. Individual star dots with cross-hair spikes (drawn onto #cc)
    3. A label positioned near the constellation centroid (DOM element)

  Clicking a constellation label or star hit area calls onSectionClick(id)
  — or for the Projects constellation, it calls onSectionClick('projects').

  Props:
    onSectionClick {fn}  — called with section id when a constellation is clicked
    onBack         {fn}  — called when "← Solar System" is clicked
*/
export default function Cosmos({ onSectionClick, onBack }) {
  const scRef   = useRef(null)  // background star canvas
  const ccRef   = useRef(null)  // constellation canvas
  const rafRef  = useRef(null)  // requestAnimationFrame handle
  const runRef  = useRef(true)  // flag to stop the loop on unmount

  // Star data for the background field (generated once)
  const starsRef     = useRef([])
  // Hit areas for canvas clicks — { x, y, r, section } objects
  const starHitsRef  = useRef([])
  // Injected label DOM elements (cleaned up on unmount)
  const labelsRef    = useRef([])

  useEffect(() => {
    const sc = scRef.current
    const cc = ccRef.current
    if (!sc || !cc) return

    // ── Size both canvases to fill the viewport ────────────────────
    sc.width = cc.width = window.innerWidth
    sc.height = cc.height = window.innerHeight

    // ── Build background star field ────────────────────────────────
    // Star count proportional to canvas area so density is consistent
    const n = Math.floor((sc.width * sc.height) / 2300)
    starsRef.current = Array.from({ length: n }, () => ({
      x:  Math.random(),
      y:  Math.random(),
      // Size distribution: mostly tiny, occasional larger star
      r:  Math.random() < 0.05 ? 1.9 : Math.random() < 0.2 ? 1.2 : 0.6,
      a:  0.3 + Math.random() * 0.7,    // base opacity
      ph: Math.random() * Math.PI * 2,  // phase offset for twinkle
      sp: 0.002 + Math.random() * 0.008, // twinkle speed
    }))

    // ── Background star animation loop ─────────────────────────────
    // Stars twinkle by varying alpha using a sine wave keyed to time
    function drawBackground(t) {
      if (!runRef.current) return
      const ctx = sc.getContext('2d')
      ctx.clearRect(0, 0, sc.width, sc.height)

      starsRef.current.forEach(s => {
        const alpha = s.a * (0.6 + 0.4 * Math.sin(t * s.sp + s.ph))
        ctx.beginPath()
        ctx.arc(s.x * sc.width, s.y * sc.height, s.r, 0, Math.PI * 2)
        // Hue varies slightly around blue/white (210–240 range)
        const h = 210 + Math.floor(Math.sin(s.ph) * 30)
        ctx.fillStyle = `hsla(${h},60%,90%,${alpha})`
        ctx.fill()
      })

      // Occasionally spawn a shooting star
      if (Math.random() < 0.003) spawnShootingStar()

      rafRef.current = requestAnimationFrame(drawBackground)
    }

    rafRef.current = requestAnimationFrame(drawBackground)

    // ── Reveal constellations with staggered timing ────────────────
    // Each constellation appears after a delay, then its stars and label fade in
    CONSTELLATIONS.forEach((con, ci) => {
      setTimeout(() => {
        if (!runRef.current) return
        const ctx = cc.getContext('2d')
        const W = cc.width
        const H = cc.height

        // 1. Animate dashed lines drawing in
        let lineAlpha = 0
        const lineInterval = setInterval(() => {
          lineAlpha = Math.min(lineAlpha + 0.022, 0.28)
          ctx.save()
          ctx.strokeStyle = `rgba(180,160,255,${lineAlpha})`
          ctx.lineWidth = 0.85
          ctx.setLineDash([4, 6])
          con.l.forEach(([a, b]) => {
            ctx.beginPath()
            ctx.moveTo(con.s[a][0] * W, con.s[a][1] * H)
            ctx.lineTo(con.s[b][0] * W, con.s[b][1] * H)
            ctx.stroke()
          })
          ctx.restore()
          if (lineAlpha >= 0.28) clearInterval(lineInterval)
        }, 30)

        // 2. Stagger-draw each star dot
        setTimeout(() => {
          con.s.forEach((s, si) => {
            setTimeout(() => {
              if (!runRef.current) return
              const x = s[0] * W
              const y = s[1] * H
              // Prominent constellations get slightly larger stars
              const r = (ci === 0 || ci === 2) ? 3.3 : 2.4
              drawConstellationStar(cc.getContext('2d'), x, y, r)
              // Register click hit area (radius generous for usability)
              starHitsRef.current.push({ x, y, r: r * 5 + 6, section: con.section, action: con.action })
            }, si * 115)
          })
        }, 200)

        // 3. Add label element positioned near the centroid
        setTimeout(() => {
          if (!runRef.current) return
          // Find centroid of constellation stars
          const cx = con.s.reduce((sum, s) => sum + s[0], 0) / con.s.length
          const cy = con.s.reduce((sum, s) => sum + s[1], 0) / con.s.length

          const lbl = document.createElement('div')
          lbl.className = 'slbl'
          lbl.textContent = con.name
          lbl.style.left = `${cx * W + con.lo.x}px`
          lbl.style.top  = `${cy * H + con.lo.y}px`
          lbl.addEventListener('click', () => {
            onSectionClick(con.action || con.section)
          })
          // The cosmos container is the parent
          ccRef.current?.parentElement?.appendChild(lbl)
          labelsRef.current.push(lbl)
          // Trigger fade-in on next frame
          requestAnimationFrame(() => lbl.classList.add('show'))
        }, 800)

      }, ci * 560 + 400)
    })

    // ── Canvas click handler — detect star hit areas ───────────────
    function handleCanvasClick(e) {
      const rect = cc.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      for (const h of starHitsRef.current) {
        const dx = mx - h.x
        const dy = my - h.y
        if (Math.sqrt(dx * dx + dy * dy) < h.r) {
          onSectionClick(h.action || h.section)
          return
        }
      }
    }

    // ── Cursor changes to pointer over clickable stars ─────────────
    function handleCanvasMove(e) {
      const rect = cc.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      let hit = false
      for (const h of starHitsRef.current) {
        const dx = mx - h.x
        const dy = my - h.y
        if (Math.sqrt(dx * dx + dy * dy) < h.r) { hit = true; break }
      }
      cc.style.cursor = hit ? 'pointer' : 'default'
    }

    cc.addEventListener('click', handleCanvasClick)
    cc.addEventListener('mousemove', handleCanvasMove)

    // ── Cleanup on unmount ─────────────────────────────────────────
    return () => {
      runRef.current = false
      cancelAnimationFrame(rafRef.current)
      cc.removeEventListener('click', handleCanvasClick)
      cc.removeEventListener('mousemove', handleCanvasMove)
      // Remove injected label elements
      labelsRef.current.forEach(l => l.remove())
      labelsRef.current = []
      starHitsRef.current = []
    }
  }, [onSectionClick]) // onSectionClick is stable (useCallback in context)

  return (
    <div id="cosmos">
      {/* Nebula atmospheric blobs — CSS animated */}
      <div className="neb n1" />
      <div className="neb n2" />
      <div className="neb n3" />

      {/* Background twinkling star canvas */}
      <canvas ref={scRef} id="sc" />

      {/* Constellation lines and star dots canvas */}
      <canvas ref={ccRef} id="cc" />

      {/* Title header */}
      <div id="cosmos-hdr">
        <h1>Courtney Green</h1>
        <p>navigate by the constellations</p>
      </div>

      {/* Back to solar system */}
      <button id="cosmos-back" onClick={onBack}>
        ← Solar System
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   drawConstellationStar — paints a glowing star dot with cross-hair spikes.
   Drawn onto the constellation canvas.
─────────────────────────────────────────────────────────────────── */
function drawConstellationStar(ctx, x, y, r) {
  // Outer glow halo
  const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4)
  g.addColorStop(0,   'rgba(220,200,255,.9)')
  g.addColorStop(0.4, 'rgba(180,160,255,.4)')
  g.addColorStop(1,   'transparent')
  ctx.beginPath()
  ctx.arc(x, y, r * 4, 0, Math.PI * 2)
  ctx.fillStyle = g
  ctx.fill()

  // Solid core dot
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(240,235,255,.95)'
  ctx.fill()

  // Four cross-hair spikes extending from the star
  ctx.save()
  ctx.strokeStyle = 'rgba(240,235,255,.5)'
  ctx.lineWidth = 0.6
  for (let a = 0; a < 4; a++) {
    const ang = (a * Math.PI) / 2
    ctx.beginPath()
    ctx.moveTo(x + Math.cos(ang) * r,     y + Math.sin(ang) * r)
    ctx.lineTo(x + Math.cos(ang) * r * 5, y + Math.sin(ang) * r * 5)
    ctx.stroke()
  }
  ctx.restore()
}

/* ─────────────────────────────────────────────────────────────────────
   spawnShootingStar — injects a short-lived shooting star div into the
   cosmos container. Uses a dynamically injected @keyframes rule so each
   star has a unique random angle.
─────────────────────────────────────────────────────────────────── */
function spawnShootingStar() {
  const cosmos = document.getElementById('cosmos')
  if (!cosmos) return

  const el  = document.createElement('div')
  el.className = 'ss'

  const x   = Math.random() * window.innerWidth
  const y   = Math.random() * window.innerHeight * 0.5
  const ang = 14 + Math.random() * 22
  const id  = 'sk' + Date.now()

  // Inject unique keyframe only if it doesn't already exist
  if (!document.getElementById(id)) {
    const st = document.createElement('style')
    st.id = id
    st.textContent = `
      @keyframes ${id} {
        0%   { opacity:0; transform:rotate(${ang}deg) translateX(0); }
        10%  { opacity:1; }
        100% { opacity:0; transform:rotate(${ang}deg) translateX(320px); }
      }
    `
    document.head.appendChild(st)
  }

  el.style.cssText = `left:${x}px;top:${y}px;transform:rotate(${ang}deg);animation:${id} .85s ease-out forwards;`
  cosmos.appendChild(el)
  setTimeout(() => el.remove(), 950)
}

import { useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../../../data/projects.js'
import ProjectCard from './ProjectCard.jsx'
import '../../../styles/sections/Projects.css'

/*
  Projects — "Project Cosmos" section.

  Renders all research projects as clickable constellations in a
  purple-tinted starfield. Each project is a named constellation;
  clicking a star or label opens the ProjectCard detail modal.

  Two canvases are layered:
    #psc — twinkling background stars
    #pcc — project constellation lines, star dots, and hit areas

  Props:
    onBack {fn} — called when "← Solar System" is clicked
*/
export default function Projects({ onBack }) {
  const pscRef    = useRef(null)   // star background canvas
  const pccRef    = useRef(null)   // constellation canvas
  const rafRef    = useRef(null)
  const runRef    = useRef(true)

  // Background star data (generated once)
  const starsRef     = useRef([])
  // Clickable star hit areas: { x, y, r, projectId }
  const starHitsRef  = useRef([])
  // Injected label DOM elements (cleaned up on unmount)
  const labelsRef    = useRef([])

  // Currently open project card (null = closed)
  const [openProject, setOpenProject] = useState(null)

  useEffect(() => {
    runRef.current = true   // re-arm on remount (React StrictMode runs effects twice)
    const psc = pscRef.current
    const pcc = pccRef.current
    if (!psc || !pcc) return

    // ── Size canvases to the viewport ──────────────────────────────
    psc.width = pcc.width = window.innerWidth
    psc.height = pcc.height = window.innerHeight

    // ── Background star field ──────────────────────────────────────
    const n = Math.floor((psc.width * psc.height) / 2600)
    starsRef.current = Array.from({ length: n }, () => ({
      x:  Math.random(),
      y:  Math.random(),
      r:  Math.random() < 0.04 ? 1.8 : Math.random() < 0.18 ? 1.1 : 0.55,
      a:  0.25 + Math.random() * 0.65,
      ph: Math.random() * Math.PI * 2,
      sp: 0.0018 + Math.random() * 0.007,
    }))

    // ── Background star animation loop ─────────────────────────────
    function drawBackground(t) {
      if (!runRef.current) return
      const ctx = psc.getContext('2d')
      ctx.clearRect(0, 0, psc.width, psc.height)

      starsRef.current.forEach(s => {
        const alpha = s.a * (0.6 + 0.4 * Math.sin(t * s.sp + s.ph))
        ctx.beginPath()
        ctx.arc(s.x * psc.width, s.y * psc.height, s.r, 0, Math.PI * 2)
        const h = 220 + Math.floor(Math.sin(s.ph) * 25)
        ctx.fillStyle = `hsla(${h},55%,88%,${alpha})`
        ctx.fill()
      })

      if (Math.random() < 0.003) spawnShootingStar()

      rafRef.current = requestAnimationFrame(drawBackground)
    }

    rafRef.current = requestAnimationFrame(drawBackground)

    // ── Reveal project constellations with stagger ─────────────────
    PROJECTS.forEach((proj, pi) => {
      setTimeout(() => {
        if (!runRef.current) return
        const ctx = pcc.getContext('2d')
        const W   = pcc.width
        const H   = pcc.height

        // 1. Animate constellation lines drawing in
        let lineAlpha = 0
        const lineInterval = setInterval(() => {
          lineAlpha = Math.min(lineAlpha + 0.020, 0.22)
          ctx.save()
          ctx.strokeStyle = `rgba(190,170,255,${lineAlpha})`
          ctx.lineWidth   = 0.75
          ctx.setLineDash([3, 7])
          proj.lines.forEach(([a, b]) => {
            ctx.beginPath()
            ctx.moveTo(proj.stars[a][0] * W, proj.stars[a][1] * H)
            ctx.lineTo(proj.stars[b][0] * W, proj.stars[b][1] * H)
            ctx.stroke()
          })
          ctx.restore()
          if (lineAlpha >= 0.22) clearInterval(lineInterval)
        }, 28)

        // 2. Stagger-draw each star dot
        setTimeout(() => {
          proj.stars.forEach((s, si) => {
            setTimeout(() => {
              if (!runRef.current) return
              const x = s[0] * W
              const y = s[1] * H
              const r = proj.starSize
              drawProjectStar(pcc.getContext('2d'), x, y, r)
              // Register click hit area (generous radius for usability)
              starHitsRef.current.push({ x, y, r: r * 5 + 8, projectId: proj.id })
            }, si * 100)
          })
        }, 180)

        // 3. Add floating label near the constellation centroid
        setTimeout(() => {
          if (!runRef.current) return
          const cx = proj.stars.reduce((sum, s) => sum + s[0], 0) / proj.stars.length
          const cy = proj.stars.reduce((sum, s) => sum + s[1], 0) / proj.stars.length

          const lbl = document.createElement('div')
          lbl.className = 'plbl'
          lbl.textContent = proj.label
          lbl.style.left = `${cx * W + proj.labelOffset.x}px`
          lbl.style.top  = `${cy * H + proj.labelOffset.y}px`
          lbl.addEventListener('click', () => {
            setOpenProject(PROJECTS.find(p => p.id === proj.id) || null)
          })

          pccRef.current?.parentElement?.appendChild(lbl)
          labelsRef.current.push(lbl)
          requestAnimationFrame(() => lbl.classList.add('show'))
        }, 720)

      }, pi * 520 + 380)
    })

    // ── Canvas click — check star hit areas ────────────────────────
    function handleCanvasClick(e) {
      const rect = pcc.getBoundingClientRect()
      const mx   = e.clientX - rect.left
      const my   = e.clientY - rect.top
      for (const h of starHitsRef.current) {
        const dx = mx - h.x
        const dy = my - h.y
        if (Math.sqrt(dx * dx + dy * dy) < h.r) {
          setOpenProject(PROJECTS.find(p => p.id === h.projectId) || null)
          return
        }
      }
    }

    // ── Cursor changes to pointer over stars ───────────────────────
    function handleCanvasMove(e) {
      const rect = pcc.getBoundingClientRect()
      const mx   = e.clientX - rect.left
      const my   = e.clientY - rect.top
      let hit    = false
      for (const h of starHitsRef.current) {
        const dx = mx - h.x
        const dy = my - h.y
        if (Math.sqrt(dx * dx + dy * dy) < h.r) { hit = true; break }
      }
      pcc.style.cursor = hit ? 'pointer' : 'default'
    }

    pcc.addEventListener('click', handleCanvasClick)
    pcc.addEventListener('mousemove', handleCanvasMove)

    // ── Cleanup ────────────────────────────────────────────────────
    return () => {
      runRef.current = false
      cancelAnimationFrame(rafRef.current)
      pcc.removeEventListener('click', handleCanvasClick)
      pcc.removeEventListener('mousemove', handleCanvasMove)
      labelsRef.current.forEach(l => l.remove())
      labelsRef.current = []
      starHitsRef.current = []
    }
  }, [])

  return (
    <div id="projects-cosmos">
      {/* Nebula atmospheric blobs */}
      <div className="pneb pn1" />
      <div className="pneb pn2" />
      <div className="pneb pn3" />

      {/* Background star canvas */}
      <canvas ref={pscRef} id="psc" />

      {/* Constellation canvas */}
      <canvas ref={pccRef} id="pcc" />

      {/* Header */}
      <div id="projects-hdr">
        <h1>Projects</h1>
        <p>click a constellation to explore</p>
      </div>

      {/* Back button */}
      <button id="projects-back" onClick={onBack}>
        ← Solar System
      </button>

      {/* Project detail card — shown when a constellation is clicked */}
      <ProjectCard
        project={openProject}
        onClose={() => setOpenProject(null)}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   drawProjectStar — paints a glowing star with a cross-hair, styled
   slightly warmer/purple compared to the navigation cosmos stars.
─────────────────────────────────────────────────────────────────── */
function drawProjectStar(ctx, x, y, r) {
  // Outer glow
  const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4)
  g.addColorStop(0,   'rgba(210,190,255,.9)')
  g.addColorStop(0.4, 'rgba(170,148,255,.4)')
  g.addColorStop(1,   'transparent')
  ctx.beginPath()
  ctx.arc(x, y, r * 4, 0, Math.PI * 2)
  ctx.fillStyle = g
  ctx.fill()

  // Solid core
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(235,225,255,.95)'
  ctx.fill()

  // Cross-hair spikes
  ctx.save()
  ctx.strokeStyle = 'rgba(235,225,255,.5)'
  ctx.lineWidth   = 0.6
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
   spawnShootingStar — injects a short-lived shooting star element
   into the projects cosmos container (reuses the .ss CSS class).
─────────────────────────────────────────────────────────────────── */
function spawnShootingStar() {
  const pc = document.getElementById('projects-cosmos')
  if (!pc) return

  const el  = document.createElement('div')
  el.className = 'ss'

  const x   = Math.random() * window.innerWidth
  const y   = Math.random() * window.innerHeight * 0.5
  const ang = 14 + Math.random() * 22
  const id  = 'psk' + Date.now()

  if (!document.getElementById(id)) {
    const st = document.createElement('style')
    st.id = id
    st.textContent = `
      @keyframes ${id} {
        0%   { opacity:0; transform:rotate(${ang}deg) translateX(0); }
        10%  { opacity:1; }
        100% { opacity:0; transform:rotate(${ang}deg) translateX(300px); }
      }
    `
    document.head.appendChild(st)
  }

  el.style.cssText = `left:${x}px;top:${y}px;transform:rotate(${ang}deg);animation:${id} .85s ease-out forwards;`
  pc.appendChild(el)
  setTimeout(() => el.remove(), 950)
}

import { useEffect, useRef, useState } from 'react'
import { ROLES } from '../../data/roles.js'
import '../../styles/sections/Experience.css'

/*
  Experience — "The Orrery" section.

  Renders work history as concentric animated orbital rings on a canvas.
  Clicking a ring reveals the corresponding role details in a card at the centre.

  Each ring orbits a small marker dot at its current angle. The canvas is
  redrawn every frame while the component is mounted, using requestAnimationFrame.

  Props:
    onBack {fn} — called when "← Solar System" is clicked
*/
export default function Experience({ onBack }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const runRef = useRef(true)          // stop loop on unmount
  const anglesRef = useRef([0.3, 1.1, 2.2, 3.8])  // per-ring orbital angles
  const [activeIdx, setActiveIdx] = useState(0)        // selected ring index (default first)
  const [mode, setMode] = useState('orrery')           // 'orrery' or 'timeline'

  // ── Animation loop ───────────────────────────────────────────────
  // Advances each ring's angle and redraws the canvas each frame.
  // The active ring is highlighted; others are dim dashed lines.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const wrap = canvas.parentElement
    const size = wrap.offsetWidth
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    const cx = size / 2
    const cy = size / 2

    function draw() {
      if (!runRef.current) return
      ctx.clearRect(0, 0, size, size)

      // Add subtle canvas background to ensure visibility
      ctx.fillStyle = 'rgba(15, 13, 20, 0.6)'
      ctx.fillRect(0, 0, size, size)

      // Centre dot
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(200,190,160,0.5)'
      ctx.fill()

      ROLES.forEach((role, i) => {
        const pxR = role.r * cx          // pixel orbit radius
        const isActive = activeIdx === i
        anglesRef.current[i] += role.speed * 16  // advance angle each frame (~16ms)
        const angle = anglesRef.current[i]

        // ── Ring ──────────────────────────────────────────────────
        ctx.beginPath()
        ctx.arc(cx, cy, pxR, 0, Math.PI * 2)

        if (isActive) {
          // Active ring: solid line, stronger colour
          ctx.strokeStyle = role.color
          ctx.lineWidth = 2.5
          ctx.setLineDash([])
        } else {
          // Inactive ring: more visible but subtle
          ctx.strokeStyle = 'rgba(200,202,216,0.6)'
          ctx.lineWidth = 1.2
          ctx.setLineDash([3, 7])
        }
        ctx.stroke()
        ctx.setLineDash([])

        // ── Notch marks on active ring ────────────────────────────
        if (isActive) {
          for (let t = 0; t < 24; t++) {
            const a = (t / 24) * Math.PI * 2
            const r1 = pxR - 3
            const r2 = pxR + 3
            ctx.beginPath()
            ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1)
            ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2)
            ctx.strokeStyle = 'rgba(200,190,160,0.18)'
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // ── Orbiting marker dot ───────────────────────────────────
        const mx = cx + Math.cos(angle) * pxR
        const my = cy + Math.sin(angle) * pxR
        ctx.beginPath()
        ctx.arc(mx, my, isActive ? 3.5 : 2, 0, Math.PI * 2)
        ctx.fillStyle = isActive ? role.color : 'rgba(200,202,216,0.25)'
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      runRef.current = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [activeIdx])  // re-run effect when active ring changes (to update highlight)

  // ── Canvas click — determine which ring was clicked ──────────────
  function handleCanvasClick(e) {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left - canvas.width / 2
    const my = e.clientY - rect.top - canvas.height / 2
    const dist = Math.sqrt(mx * mx + my * my)
    const normR = dist / (canvas.width / 2)  // normalised radius 0–1

    // Find the ring closest to the click point (within ±7.5% tolerance)
    let hit = -1
    ROLES.forEach((role, i) => {
      if (Math.abs(normR - role.r) < 0.075) hit = i
    })

    setActiveIdx(hit)
  }

  const activeRole = activeIdx >= 0 ? ROLES[activeIdx] : null

  return (
    <div id="experience-layer">
      <div id="experience-controls">
        <button
          className={mode === 'orrery' ? 'active' : ''}
          onClick={() => setMode('orrery')}
        >
          Orrery
        </button>
        <button
          className={mode === 'timeline' ? 'active' : ''}
          onClick={() => setMode('timeline')}
        >
          Rocket Timeline
        </button>
      </div>

      {mode === 'orrery' ? (
        <div id="orrery-wrap">
          <canvas
            ref={canvasRef}
            id="orrery-canvas"
            onClick={handleCanvasClick}
            style={{ cursor: 'crosshair' }}
          />

          <div
            id="orrery-hint"
            style={{ opacity: activeRole ? 0 : 1 }}
          >
            click a ring to explore
          </div>

          <div id="orrery-card" className={activeRole ? 'active' : ''}>
            <div id="orrery-card-role">{activeRole?.role ?? ''}</div>
            <div id="orrery-card-org">{activeRole?.org ?? ''}</div>
            <div id="orrery-card-dates">{activeRole?.dates ?? ''}</div>
            <div id="orrery-card-desc">{activeRole?.desc ?? ''}</div>
          </div>
        </div>
      ) : (
        <section id="experience-timeline">
          <ul>
            {ROLES.map((role, i) => (
              <li
                key={role.role + i}
                className={activeIdx === i ? 'active' : ''}
                onClick={() => setActiveIdx(i)}
              >
                <span className="rocket">🚀</span>
                <div className="timeline-meta">
                  <div className="timeline-role">{role.role}</div>
                  <div className="timeline-org">{role.org}</div>
                  <div className="timeline-dates">{role.dates}</div>
                </div>
              </li>
            ))}
          </ul>

          {activeRole ? (
            <article id="timeline-card">
              <h3>{activeRole.role}</h3>
              <p className="org">{activeRole.org}</p>
              <p className="dates">{activeRole.dates}</p>
              <p className="desc">{activeRole.desc}</p>
            </article>
          ) : (
            <p id="timeline-hint">Select a mission stage to see details.</p>
          )}
        </section>
      )}

      <button className="sec-back-btn" onClick={onBack}>
        ← Solar System
      </button>
    </div>
  )
}

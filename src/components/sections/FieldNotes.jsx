import { useEffect, useRef, useState } from 'react'
import { FIELD_ENTRIES } from '../../data/fieldNotes.js'
import '../../styles/sections/FieldNotes.css'

/*
  FieldNotes — personal reflections section.

  Displays a journal-style page with a staggered entry reveal.
  The background is a canvas of twinkling stars that shifts slightly
  with mouse movement (parallax effect).

  Props:
    onBack {fn} — called when "← Solar System" is clicked
*/
export default function FieldNotes({ onBack }) {
  const canvasRef      = useRef(null)   // parallax star canvas
  const layerRef       = useRef(null)   // outer div (for mouse tracking)
  const rafRef         = useRef(null)
  const runRef         = useRef(true)

  const [headerVisible, setHeaderVisible] = useState(false)
  const [sigVisible,    setSigVisible]    = useState(false)
  // Track which entries have been shown (by index)
  const [shownEntries, setShownEntries]   = useState([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Size canvas slightly larger than viewport for parallax room ─
    canvas.width  = window.innerWidth  + 80
    canvas.height = window.innerHeight + 80
    const ctx = canvas.getContext('2d')

    // ── Generate star field ────────────────────────────────────────
    const stars = Array.from({ length: 180 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() < 0.1 ? 1.4 : 0.6,
      a:  0.08 + Math.random() * 0.35,
      ph: Math.random() * Math.PI * 2,
      sp: 0.002 + Math.random() * 0.006,
    }))

    // ── Mouse parallax offset ──────────────────────────────────────
    // Canvas translates by up to ±15px based on cursor position
    let mx = 0
    let my = 0

    function handleMouseMove(e) {
      mx = (e.clientX / window.innerWidth  - 0.5) * 30
      my = (e.clientY / window.innerHeight - 0.5) * 30
    }

    const layer = layerRef.current
    layer?.addEventListener('mousemove', handleMouseMove)

    // ── Animation loop ─────────────────────────────────────────────
    function draw(t) {
      if (!runRef.current) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        const alpha = s.a * (0.6 + 0.4 * Math.sin(t * s.sp + s.ph))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,205,230,${alpha})`
        ctx.fill()
      })

      // Apply parallax offset
      canvas.style.transform = `translate(${-40 + mx}px, ${-40 + my}px)`
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    // ── Staggered entry reveals ────────────────────────────────────
    // Header fades in first, then entries one by one, then the signature
    const timers = []

    timers.push(setTimeout(() => setHeaderVisible(true), 200))

    FIELD_ENTRIES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setShownEntries(prev => [...prev, i])
        }, 400 + i * 700)
      )
    })

    // Signature appears after the last entry
    const sigDelay = 400 + FIELD_ENTRIES.length * 700 + 400
    timers.push(setTimeout(() => setSigVisible(true), sigDelay))

    return () => {
      runRef.current = false
      cancelAnimationFrame(rafRef.current)
      layer?.removeEventListener('mousemove', handleMouseMove)
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div ref={layerRef} id="fieldnotes-layer">
      {/* Parallax star canvas */}
      <canvas ref={canvasRef} id="fn-stars-parallax" />

      <div id="fn-wrap">
        {/* Header block */}
        <div id="fn-header" className={headerVisible ? 'show' : ''}>
          <div id="fn-date">Field Notes &nbsp;·&nbsp; Washington D.C.</div>
          <div id="fn-title">
            Observations on<br />Work &amp; Wonder
          </div>
        </div>

        {/* Journal entries — each fades in with a translateY transition */}
        <div id="fn-entries">
          {FIELD_ENTRIES.map((entry, i) => (
            <div
              key={i}
              className={`fn-entry${shownEntries.includes(i) ? ' show' : ''}`}
            >
              <div className="fn-rule" />
              {/* dangerouslySetInnerHTML is safe here — content is hardcoded in fieldNotes.js */}
              <div
                className="fn-text"
                dangerouslySetInnerHTML={{ __html: entry.text }}
              />
            </div>
          ))}
        </div>

        {/* Signature */}
        <div id="fn-sig" className={sigVisible ? 'show' : ''}>
          <div id="fn-sig-initials">C.G.</div>
          <div id="fn-sig-date">2024</div>
        </div>
      </div>

      <button className="sec-back-btn" onClick={onBack}>
        ← Solar System
      </button>
    </div>
  )
}

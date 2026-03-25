import { useEffect, useRef } from 'react'
import '../../styles/sections/About.css'

/*
  About — "The Observatory" section.

  Layout:
    Left  — circular headshot inside the iris-aperture frame,
            surrounded by the degree-tick ring and a solar-halo glow.
    Right — astro-sign data cards + name + role + bio.
    Bottom — comet-path animation tracing the career journey
             Earth → Mars → Saturn.

  To use your own headshot: place the image at /public/headshot.jpg
  (or any path) and update the <img src="..."> below.

  Props:
    onBack {fn} — called when "← Solar System" is clicked
*/
export default function About({ onBack }) {
  const canvasRef   = useRef(null)   // degree-tick ring canvas
  const apertureRef = useRef(null)   // iris aperture (gets .open)
  const cometRef    = useRef(null)   // comet dot element
  const wp0Ref      = useRef(null)   // waypoint 0 — Earth
  const wp1Ref      = useRef(null)   // waypoint 1 — Mars
  const wp2Ref      = useRef(null)   // waypoint 2 — Saturn

  useEffect(() => {
    const canvas   = canvasRef.current
    const aperture = apertureRef.current
    if (!canvas || !aperture) return

    // ── Draw degree-tick ring ──────────────────────────────────────
    const size = canvas.parentElement.offsetWidth
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    const cx  = size / 2
    const cy  = size / 2
    const R   = size / 2

    ctx.clearRect(0, 0, size, size)

    for (let i = 0; i < 72; i++) {
      const angle   = (i / 72) * Math.PI * 2 - Math.PI / 2
      const isMajor = i % 6 === 0
      const r1 = R - 2
      const r2 = R - (isMajor ? 12 : 6)
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1)
      ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2)
      ctx.strokeStyle = isMajor
        ? 'rgba(200,202,216,0.22)'
        : 'rgba(200,202,216,0.09)'
      ctx.lineWidth = isMajor ? 1 : 0.5
      ctx.stroke()
    }

    const cardinals = [['0°', 0], ['90°', 90], ['180°', 180], ['270°', 270]]
    cardinals.forEach(([label, deg]) => {
      const angle = (deg / 360) * Math.PI * 2 - Math.PI / 2
      const r     = R - 22
      ctx.font         = '9px Karla,sans-serif'
      ctx.fillStyle    = 'rgba(200,202,216,0.22)'
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(label, cx + Math.cos(angle) * r, cy + Math.sin(angle) * r)
    })

    // ── Open iris aperture ─────────────────────────────────────────
    const t1 = setTimeout(() => aperture.classList.add('open'), 200)

    // ── Activate journey waypoints as comet passes ─────────────────
    // Comet CSS animation starts at 1.8 s and takes 2.5 s (ends at 4.3 s).
    // Waypoints light up at roughly equal thirds of that journey.
    const t2 = setTimeout(() => wp0Ref.current?.classList.add('active'), 1900)
    const t3 = setTimeout(() => wp1Ref.current?.classList.add('active'), 3000)
    const t4 = setTimeout(() => wp2Ref.current?.classList.add('active'), 4200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      aperture.classList.remove('open')
      wp0Ref.current?.classList.remove('active')
      wp1Ref.current?.classList.remove('active')
      wp2Ref.current?.classList.remove('active')
    }
  }, [])

  return (
    <div id="about-layer">

      {/* ── Two-column content ───────────────────────────────────── */}
      <div id="about-layout">

        {/* ── Left: headshot in orbital frame ─────────────────── */}
        <div id="obs-frame">
          {/* Solar halo glow behind the frame */}
          <div id="obs-solar-halo" />

          {/* Degree-tick ring drawn on canvas */}
          <canvas ref={canvasRef} id="obs-canvas" />

          {/* Decorative ring borders */}
          <div id="obs-ring" />
          <div id="obs-ring-inner" />

          {/* Iris aperture — reveals headshot on open */}
          <div ref={apertureRef} id="obs-aperture">
            {/*
              Replace src with your actual headshot path, e.g. "/headshot.jpg"
              The image is clipped to the circle by the aperture's border-radius.
              If no image is provided the dark gradient background shows through.
            */}
            <img
              id="obs-headshot"
              src="/headshot.jpg"
              alt="Courtney Green"
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
          </div>
        </div>

        {/* ── Right: astro-sign cards + bio ────────────────────── */}
        <div id="obs-info">
          <div id="obs-eyebrow">The Observatory</div>
          <div id="obs-name">Courtney Green</div>
          <div id="obs-role">Data Scientist &amp; Researcher</div>

          {/* Astro-sign data cards — edit values to match your details */}
          <div id="obs-cards">
            <div className="asc-card">
              <div className="asc-label">Mission</div>
              {/* Your professional title / mission name */}
              <div className="asc-value">Data Science &amp; Policy</div>
            </div>
            <div className="asc-card">
              <div className="asc-label">Rank</div>
              <div className="asc-value">Captain / Engineer</div>
            </div>
            <div className="asc-card">
              <div className="asc-label">Born Under</div>
              {/* Your star sign, birth constellation, or a favourite star */}
              <div className="asc-value">Orion</div>
            </div>
          </div>

          <div id="obs-bio">
            I work at the intersection of statistical modeling, machine
            learning, and public policy — translating complex data into
            decisions that matter. My approach is methodical and
            curiosity-driven, living at the edges of disciplines where
            statistics meets narrative.
            <br /><br />
            Based in Washington, D.C.
          </div>
        </div>
      </div>

      {/* ── Bottom: comet journey path ───────────────────────────── */}
      <div id="obs-journey">

        {/* Dashed path line */}
        <div id="obs-journey-line" />

        {/* Comet dot — CSS animation drives it left → right */}
        <div ref={cometRef} id="obs-comet" />

        {/* Waypoint nodes — activated by JS as comet passes */}
        <div className="obs-wp" ref={wp0Ref} style={{ left: '5%' }}>
          <div className="obs-wp-dot" />
          <div className="obs-wp-label">Earth</div>
          {/* Edit: your origin / first milestone */}
          <div className="obs-wp-desc">The Foundation</div>
        </div>

        <div className="obs-wp" ref={wp1Ref} style={{ left: '50%' }}>
          <div className="obs-wp-dot" />
          <div className="obs-wp-label">Mars</div>
          {/* Edit: your mid-journey / grad school / research phase */}
          <div className="obs-wp-desc">The Expedition</div>
        </div>

        <div className="obs-wp" ref={wp2Ref} style={{ left: '95%' }}>
          <div className="obs-wp-dot" />
          <div className="obs-wp-label">Saturn</div>
          {/* Edit: your current position / mission control */}
          <div className="obs-wp-desc">Mission Control</div>
        </div>

      </div>

      <button className="sec-back-btn" onClick={onBack}>
        ← Solar System
      </button>
    </div>
  )
}

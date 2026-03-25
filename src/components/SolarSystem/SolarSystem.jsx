import { useEffect, useRef } from 'react'
import { PLANET_DEFS } from '../../data/planets.js'
import { paintSun, paintPlanet } from '../../utils/painters.js'
import '../../styles/SolarSystem.css'

/*
  SolarSystem — the animated solar system on the portfolio landing page.

  Props:
    visible       {bool}   — whether the solar system div is shown
    zooming       {bool}   — applies the zoom-out CSS class (navigate away)
    entering      {bool}   — applies the zoom-in CSS class (returning from section)
    mode          {string} — 'orbit' (default) | 'lineup'
    onSunClick    {fn}     — called when the Sun is clicked
    onPlanetClick {fn}     — called with section id when a planet is clicked (lineup only)

  Architecture:
    - Planets are rendered as JSX (orbit ring div + planet canvas).
    - Canvas textures are painted once via useEffect on mount.
    - Orbital animation uses requestAnimationFrame + direct DOM manipulation
      (via refs) rather than React state updates, to avoid re-renders at 60fps.
    - In 'lineup' mode the RAF stops and planets CSS-transition into a
      horizontal line across the viewport. Labels switch to section names.
*/

const SUN_SIZE = 58 // Sun canvas diameter in pixels

export default function SolarSystem({ visible, zooming, entering, mode = 'orbit', onSunClick, onPlanetClick }) {
  // Ref to the solar-system root div — used to calculate orbit pixel radii
  const sysRef = useRef(null)

  // Refs to each planet wrapper DOM element for direct position updates
  const planetRefs = useRef({})

  // Current orbital angles in radians — mutated directly, not via state
  const anglesRef = useRef(
    Object.fromEntries(PLANET_DEFS.map(p => [p.id, p.startAngle]))
  )

  // Ref to the RAF id so we can cancel it on unmount / when not visible
  const rafRef = useRef(null)

  // Ref to the sun-wrap div — used to reposition the Sun in lineup mode
  const sunWrapRef = useRef(null)

  // ── Paint the Sun canvas once on mount ──────────────────────────
  const sunCanvasRef = useRef(null)
  useEffect(() => {
    if (sunCanvasRef.current) {
      paintSun(sunCanvasRef.current, SUN_SIZE)
    }
  }, [])

  // ── Paint each planet canvas once on mount ───────────────────────
  // We use a callback ref per planet; the canvas is only available after mount.
  // We store paint functions keyed by planet id and call them when the ref fires.
  const paintedRef = useRef({})
  const getPlanetCanvasRef = (planet) => (el) => {
    if (el && !paintedRef.current[planet.id]) {
      paintPlanet(el, planet.size, planet.paintConfig)
      paintedRef.current[planet.id] = true
    }
  }

  // ── Orbital animation loop ───────────────────────────────────────
  // Runs while `visible` is true AND mode is 'orbit'. Stops in lineup mode.
  useEffect(() => {
    if (!visible || mode === 'lineup') {
      cancelAnimationFrame(rafRef.current)
      return
    }

    const sysEl = sysRef.current
    if (!sysEl) return

    // Scale orbit radii to fit within the system div
    const sysSize = sysEl.offsetWidth
    let lastT = 0

    const loop = (ts) => {
      const dt = ts - lastT
      lastT = ts

      PLANET_DEFS.forEach(p => {
        // Advance the orbital angle
        anglesRef.current[p.id] += p.speed * dt

        const angle  = anglesRef.current[p.id]
        const pxR    = (p.orbitR / 410) * sysSize * 0.5  // pixel orbit radius
        const el     = planetRefs.current[p.id]
        if (!el) return

        // Saturn's larger ring wrapper needs a different centre offset
        const offset = p.rings ? p.size * 1.3 : p.size / 2

        // Position the wrapper relative to the centre of the system div
        el.style.left = `calc(50% + ${Math.cos(angle) * pxR - offset}px)`
        el.style.top  = `calc(50% + ${Math.sin(angle) * pxR - p.size / 2}px)`
      })

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(rafRef.current)
  }, [visible, mode])

  // ── Lineup layout effect ─────────────────────────────────────────
  // When mode switches to 'lineup': stop orbiting and CSS-transition
  // all 9 items (Sun + 8 planets) into a balanced horizontal row.
  // Sun → slot 0 (far left), Mercury → slot 1, …, Neptune → slot 8.
  // When switching back to 'orbit': clear inline overrides so the RAF
  // loop and original CSS rules take over cleanly (behind the veil).
  useEffect(() => {
    if (mode !== 'lineup') {
      // Clear planet transitions so orbit RAF runs without interpolation lag.
      // Do NOT reset sun position here — it might be hidden (going to a section)
      // and we want it to stay at its lineup spot so returning to lineup is seamless.
      PLANET_DEFS.forEach(p => {
        const el = planetRefs.current[p.id]
        if (el) el.style.transition = ''
      })
      return
    }

    const sysEl = sysRef.current
    if (!sysEl) return

    const vw      = window.innerWidth
    const vh      = window.innerHeight
    const sysSize = sysEl.offsetWidth

    // 9 slots: [Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune]
    // Spread across 88% of the viewport, 6% margin each side.
    const margin      = vw * 0.06
    const usableWidth = vw * 0.88
    const step        = usableWidth / 8          // 8 gaps between 9 items

    // Shared vertical target — slightly above center so labels sit below cleanly
    const vy = vh * 0.5 - vh * 0.04

    // ── Reposition the Sun (slot 0) ───────────────────────────────
    // Sun-wrap is positioned via CSS left/top percentages + transform.
    // Override inline to place it at the first slot.
    const sunEl = sunWrapRef.current
    if (sunEl) {
      const sunVx             = margin                           // viewport x of sun center
      const sysLeftInViewport = (vw - sysSize) / 2
      const sysTopInViewport  = (vh - sysSize) / 2
      const sunLeft           = sunVx - SUN_SIZE / 2 - sysLeftInViewport
      const sunTop            = vy   - SUN_SIZE / 2 - sysTopInViewport

      sunEl.style.transition = 'left 1.1s cubic-bezier(0.4, 0, 0.2, 1), top 1.1s cubic-bezier(0.4, 0, 0.2, 1)'
      sunEl.style.left      = `${sunLeft}px`
      sunEl.style.top       = `${sunTop}px`
      sunEl.style.transform = 'none'
    }

    // ── Reposition each planet (slots 1–8) ────────────────────────
    // Planet-wrapper coords are relative to the solar-system center
    // (= viewport center), which is how the orbit RAF positions them.
    PLANET_DEFS.forEach((p, i) => {
      const el = planetRefs.current[p.id]
      if (!el) return

      const vx     = margin + (i + 1) * step     // slot i+1 (Sun is slot 0)
      const xOff   = vx - vw / 2                 // offset from viewport center
      const offset = p.rings ? p.size * 1.3 : p.size / 2

      el.style.transition = 'left 0.7s cubic-bezier(0.4, 0, 0.2, 1), top 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
      el.style.left = `${xOff - offset}px`
      el.style.top  = `${vy - vh / 2 - p.size / 2}px`
    })
  }, [mode])

  // ── Sun reset — only when returning to actual orbit (back btn in lineup) ──
  // When mode='orbit' AND visible=true the user pressed the back button from
  // lineup. Clear the sun's inline styles so CSS re-centers it under the veil.
  // When mode='orbit' AND visible=false the user navigated into a section —
  // leave the sun at its lineup position so the return trip is seamless.
  useEffect(() => {
    if (mode !== 'orbit' || !visible) return
    const sunEl = sunWrapRef.current
    if (!sunEl) return
    sunEl.style.transition = ''
    sunEl.style.left       = ''
    sunEl.style.top        = ''
    sunEl.style.transform  = ''
  }, [mode, visible])

  // Build CSS class string for the solar-view container
  const viewClass = [
    zooming  ? 'zooming'  : '',
    entering ? 'entering' : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      id="solar-view"
      className={viewClass}
      style={{ display: visible ? '' : 'none' }}
    >
      <div id="solar-system" ref={sysRef} className={mode === 'lineup' ? 'lineup-mode' : ''}>

        {/* ── Sun ────────────────────────────────────────────────── */}
        <div
          id="sun-wrap"
          ref={sunWrapRef}
          style={{
            width:     `${SUN_SIZE}px`,
            height:    `${SUN_SIZE}px`,
            boxShadow: '0 0 18px rgba(240,175,40,0.50), 0 0 50px rgba(235,150,25,0.22), 0 0 110px rgba(225,120,10,0.10)',
          }}
          onClick={onSunClick}
        >
          <canvas
            ref={sunCanvasRef}
            id="sun-canvas"
            width={SUN_SIZE}
            height={SUN_SIZE}
            style={{ width: SUN_SIZE, height: SUN_SIZE }}
          />
          <div id="sun-label">{mode === 'lineup' ? '← back' : 'Enter Portfolio'}</div>
        </div>

        {/* ── Planets ─────────────────────────────────────────────── */}
        {PLANET_DEFS.map((planet, i) => {
          const sysSize = sysRef.current?.offsetWidth ?? Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9)
          const pxR = (planet.orbitR / 410) * sysSize * 0.5
          const isClickable = mode === 'lineup' && !!planet.section

          return (
            <div key={planet.id}>
              {/* Orbit ring — hidden in lineup mode */}
              {mode === 'orbit' && (
                <div
                  className="orbit-ring"
                  style={{
                    width:      `${pxR * 2}px`,
                    height:     `${pxR * 2}px`,
                    marginLeft: `${-pxR}px`,
                    marginTop:  `${-pxR}px`,
                  }}
                />
              )}

              {/* Orbit container — planet wrapper is positioned inside this */}
              <div className="planet-orbit" id={`orbit-${planet.id}`}>
                <div
                  className={[
                    'planet-wrapper',
                    !planet.section && mode === 'lineup' ? 'no-section' : '',
                  ].filter(Boolean).join(' ')}
                  ref={el => { planetRefs.current[planet.id] = el }}
                  onClick={isClickable ? () => onPlanetClick(planet.section) : undefined}
                  style={mode === 'lineup' ? {
                    cursor: isClickable ? 'pointer' : 'default',
                    animationName: 'planetFloat',
                    animationDuration: '3.2s',
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                    animationDelay: `${1.2 + i * 0.18}s`,
                    animationFillMode: 'both',
                  } : { cursor: 'default' }}
                >
                  {planet.rings
                    ? (
                      /* Saturn — canvas inside a ring SVG wrapper */
                      <SaturnRings planet={planet} canvasRef={getPlanetCanvasRef(planet)} />
                    )
                    : (
                      /* Standard planet canvas */
                      <canvas
                        className="planet-canvas"
                        ref={getPlanetCanvasRef(planet)}
                        width={planet.size}
                        height={planet.size}
                        style={{ width: planet.size, height: planet.size }}
                      />
                    )
                  }
                  {/* In orbit mode: planet name on hover. In lineup: section label always visible. */}
                  <div className={`planet-label${mode === 'lineup' ? ' lineup-label' : ''}`}>
                    {mode === 'lineup' ? planet.lineupLabel : planet.label}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}

/*
  SaturnRings — renders Saturn's ring system as an SVG ellipse layered
  behind and in front of the planet canvas to give a 3-D ring effect.
*/
function SaturnRings({ planet, canvasRef }) {
  const rw = planet.size * 2.6   // ring wrapper width
  const rh = planet.size * 1.2   // ring wrapper height
  const cx = rw / 2
  const cy = rh / 2
  const rx = rw * 0.46           // outer ring x-radius
  const ry = rh * 0.13           // outer ring y-radius

  return (
    <div
      className="saturn-ring-wrap"
      style={{ width: `${rw}px`, height: `${rh}px` }}
    >
      {/* SVG ring drawn behind and around the planet canvas */}
      <svg
        className="saturn-ring-svg"
        viewBox={`0 0 ${rw} ${rh}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring */}
        <ellipse
          cx={cx} cy={cy + ry * 0.1}
          rx={rx} ry={ry}
          fill="none"
          stroke="rgba(200,175,90,0.55)"
          strokeWidth="4"
        />
        {/* Inner ring */}
        <ellipse
          cx={cx} cy={cy + ry * 0.1}
          rx={rx * 0.75} ry={ry * 0.75}
          fill="none"
          stroke="rgba(160,135,60,0.38)"
          strokeWidth="2.5"
        />
      </svg>

      {/* Planet canvas — z-index:1 so it renders on top of the back ring */}
      <canvas
        className="planet-canvas"
        ref={canvasRef}
        width={planet.size}
        height={planet.size}
        style={{ width: planet.size, height: planet.size, position: 'relative', zIndex: 1 }}
      />
    </div>
  )
}

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

        // Ring wrappers are larger than the planet — offset to keep planet centred
        const hOff = p.rings === 'uranus' ? p.size * 1.1 : p.rings ? p.size * 1.3 : p.size / 2
        const vOff = p.rings === 'uranus' ? p.size * 0.95 : p.size / 2

        // Position the wrapper relative to the centre of the system div
        el.style.left = `calc(50% + ${Math.cos(angle) * pxR - hOff}px)`
        el.style.top  = `calc(50% + ${Math.sin(angle) * pxR - vOff}px)`
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
        if (el) {
          el.style.transition = ''
          el.style.transform  = ''
          const labelEl = el.querySelector('.planet-label')
          if (labelEl) labelEl.style.top = ''
        }
      })
      return
    }

    const sysEl = sysRef.current
    if (!sysEl) return

    const layout = (animate) => {
      const vw      = window.innerWidth
      const vh      = window.innerHeight
      const sysSize = sysEl.offsetWidth

      const margin      = vw * 0.06
      const usableWidth = vw * 0.88
      const vy          = vh * 0.5 - vh * 0.04

      // Sun fixed at left margin, planets distributed equally across remaining width
      const sunCenter      = margin + SUN_SIZE / 2
      const planetAreaLeft = margin + SUN_SIZE + vw * 0.05   // sun + separator gap
      const planetAreaRight = margin + usableWidth
      const planetWidths   = PLANET_DEFS.map(p => p.lineupSize ?? p.size)
      const totalPW        = planetWidths.reduce((s, w) => s + w, 0)
      const planetGap      = (planetAreaRight - planetAreaLeft - totalPW) / (planetWidths.length - 1)
      let pCursor = planetAreaLeft
      const JUPITER_IDX = 4          // Jupiter and everything right of it shifts left
      const JUPITER_NUDGE = -12      // px — closes the visual gap after the small Mars
      const planetCenters  = planetWidths.map((w, idx) => {
        const c = pCursor + w / 2
        pCursor += w + planetGap
        return idx >= JUPITER_IDX ? c + JUPITER_NUDGE : c
      })

      // ── Sun ──────────────────────────────────────────────────────
      const sunEl = sunWrapRef.current
      if (sunEl) {
        const sunVx             = sunCenter
        const sysLeftInViewport = (vw - sysSize) / 2
        const sysTopInViewport  = (vh - sysSize) / 2
        const sunLeft           = sunVx - SUN_SIZE / 2 - sysLeftInViewport
        const sunTop            = vy    - SUN_SIZE     - sysTopInViewport  // bottom-align with planets

        sunEl.style.transition = animate
          ? 'left 1.1s cubic-bezier(0.4, 0, 0.2, 1), top 1.1s cubic-bezier(0.4, 0, 0.2, 1)'
          : 'none'
        sunEl.style.left      = `${sunLeft}px`
        sunEl.style.top       = `${sunTop}px`
        sunEl.style.transform = 'none'
      }

      // ── Planets ──────────────────────────────────────────────────
      PLANET_DEFS.forEach((p, i) => {
        const el = planetRefs.current[p.id]
        if (!el) return

        const vx    = planetCenters[i]
        const xOff  = vx - vw / 2
        const scale = p.lineupSize / p.size
        const hOff  = p.rings === 'uranus' ? p.size * 1.1 : p.rings ? p.size * 1.3 : p.size / 2

        // vOff: positions planet canvas bottom at vy so all labels land at the same Y.
        // For ringed planets the ring wrapper is taller than the canvas, so we
        // offset by (wrapperHeight + canvasSize) / 2 to reach the canvas bottom.
        const vOff = p.rings === 'uranus'
          ? p.size * 1.45  // canvas bottom aligned: (rh=1.9 + sz) / 2 = 1.45
          : p.rings
          ? p.size * 1.1   // wrapper = sz*1.2, canvas bottom = (1.2+1)/2 * sz
          : p.size          // no rings: wrapper = canvas, bottom = sz

        el.style.transition = animate
          ? 'left 0.7s cubic-bezier(0.4, 0, 0.2, 1), top 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          : 'none'
        el.style.left      = `${xOff - hOff}px`
        el.style.top       = `${vy - vh / 2 - vOff}px`
        el.style.transform = `scale(${scale})`

        // Override label top for ringed planets so it sits just below the canvas,
        // not the much larger ring wrapper.
        // Place label just below the ring/canvas bottom
        const labelBottom = p.rings === 'uranus' ? p.size * 1.45 + 14  // matches vOff so label lands at same Y as others
          : p.rings ? p.size * 1.1 + 14
          : p.size + 14
        const labelEl = el.querySelector('.planet-label')
        if (labelEl) labelEl.style.top = `${labelBottom}px`
      })
    }

    layout(true)

    const onResize = () => layout(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
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
          style={{ width: `${SUN_SIZE}px`, height: `${SUN_SIZE}px` }}
          onClick={onSunClick}
        >
          <div style={mode === 'lineup' ? {
            animationName: 'planetFloat',
            animationDuration: '3.2s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: '1.2s',
            animationFillMode: 'both',
          } : {}}>
            <canvas
              ref={sunCanvasRef}
              id="sun-canvas"
              width={SUN_SIZE}
              height={SUN_SIZE}
              style={{ width: SUN_SIZE, height: SUN_SIZE }}
            />
            <div id="sun-label" className={mode === 'lineup' ? 'sun-label-lineup' : ''}>
            {mode === 'lineup' ? '← Orbit' : 'Enter Portfolio'}
          </div>
          </div>
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
                  style={{
                    '--planet-glow': planet.glowColor,
                    cursor: isClickable ? 'pointer' : 'default',
                    ...(mode === 'lineup' ? {
                      animationName: 'planetFloat',
                      animationDuration: '3.2s',
                      animationTimingFunction: 'ease-in-out',
                      animationIterationCount: 'infinite',
                      animationDelay: `${1.2 + i * 0.18}s`,
                      animationFillMode: 'both',
                    } : {}),
                  }}
                >
                  {planet.rings === 'saturn'
                    ? <SaturnRings planet={planet} canvasRef={getPlanetCanvasRef(planet)} />
                    : planet.rings === 'uranus'
                    ? <UranusRings planet={planet} canvasRef={getPlanetCanvasRef(planet)} />
                    : (
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
  const rw = planet.size * 2.6
  const rh = planet.size * 1.2
  const cx = rw / 2
  const cy = rh / 2
  const rx = rw * 0.46
  const ry = rh * 0.13
  const oy = ry * 0.1   // slight downward offset so ring sits at planet equator

  // Upper half arc — goes behind the planet (back of ring)
  const backArc  = (rx, ry) =>
    `M ${cx - rx} ${cy + oy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy + oy}`

  // Lower half arc — comes in front of the planet (near side of ring)
  const frontArc = (rx, ry) =>
    `M ${cx - rx} ${cy + oy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy + oy}`

  return (
    <div className="saturn-ring-wrap" style={{ width: `${rw}px`, height: `${rh}px` }}>

      {/* Back half — z-index 0, drawn behind the planet canvas */}
      <svg className="saturn-ring-svg" viewBox={`0 0 ${rw} ${rh}`} style={{ zIndex: 0 }}>
        <path d={backArc(rx, ry)}            fill="none" stroke="rgba(200,175,90,0.55)" strokeWidth="4"   />
        <path d={backArc(rx * 0.75, ry * 0.75)} fill="none" stroke="rgba(160,135,60,0.38)" strokeWidth="2.5" />
      </svg>

      {/* Planet canvas — z-index 1 */}
      <canvas
        className="planet-canvas"
        ref={canvasRef}
        width={planet.size}
        height={planet.size}
        style={{ width: planet.size, height: planet.size, position: 'relative', zIndex: 1 }}
      />

      {/* Front half — z-index 2, drawn in front of the planet canvas */}
      <svg className="saturn-ring-svg" viewBox={`0 0 ${rw} ${rh}`} style={{ zIndex: 2 }}>
        <path d={frontArc(rx, ry)}            fill="none" stroke="rgba(200,175,90,0.55)" strokeWidth="4"   />
        <path d={frontArc(rx * 0.75, ry * 0.75)} fill="none" stroke="rgba(160,135,60,0.38)" strokeWidth="2.5" />
      </svg>

    </div>
  )
}

/*
  UranusRings — Uranus rotates on its side, so its rings are nearly
  vertical. Thinner and more transparent than Saturn's.
*/
function UranusRings({ planet, canvasRef }) {
  const sz = planet.size
  const rw = sz * 2.2
  const rh = sz * 1.9
  const cx = rw / 2
  const cy = rh / 2
  const rx = sz * 0.82  // smaller ring radius — less vertical extension after tilt
  const ry = rh * 0.10
  const tilt = 78   // degrees — nearly vertical, like real Uranus

  const backArc  = (rx, ry) => `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy}`
  const frontArc = (rx, ry) => `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`

  const col1 = 'rgba(175, 225, 232, 0.38)'
  const col2 = 'rgba(145, 205, 215, 0.24)'

  return (
    <div className="saturn-ring-wrap" style={{ width: `${rw}px`, height: `${rh}px` }}>

      <svg className="saturn-ring-svg" viewBox={`0 0 ${rw} ${rh}`} style={{ zIndex: 0 }}>
        <g transform={`rotate(${tilt}, ${cx}, ${cy})`}>
          <path d={backArc(rx, ry)}               fill="none" stroke={col1} strokeWidth="2"   />
          <path d={backArc(rx * 0.80, ry * 0.80)} fill="none" stroke={col2} strokeWidth="1.5" />
        </g>
      </svg>

      <canvas
        className="planet-canvas"
        ref={canvasRef}
        width={sz}
        height={sz}
        style={{ width: sz, height: sz, position: 'relative', zIndex: 1 }}
      />

      <svg className="saturn-ring-svg" viewBox={`0 0 ${rw} ${rh}`} style={{ zIndex: 2 }}>
        <g transform={`rotate(${tilt}, ${cx}, ${cy})`}>
          <path d={frontArc(rx, ry)}               fill="none" stroke={col1} strokeWidth="2"   />
          <path d={frontArc(rx * 0.80, ry * 0.80)} fill="none" stroke={col2} strokeWidth="1.5" />
        </g>
      </svg>

    </div>
  )
}

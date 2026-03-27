import { useState, useEffect, useRef } from 'react'
import '../../styles/sections/Interests.css'

const INTERESTS = [
  {
    id: 'spin', name: 'The Cyclist', short: 'Move', freq: '91.5',
    note: "SoulCycle, three times a week, over 200 rides in. I'm a group workout person: other people's energy is what keeps me going. Left to my own devices I will absolutely give up early. The darkness and the music blasting at full volume don't hurt either.",
  },
  {
    id: 'maker', name: 'The Maker', short: 'Make', freq: '97.3',
    note: "Childhood food allergies got me into the kitchen and I've been there ever since. For me, cooking is creativity meeting intuition: experimentation, adaptability, and making something worth sharing. Outside of that: embroidery, scrapbooking, gift making, nails, web design (building this portfolio has been genuinely fun), and yes, a lot of unfinished projects.",
  },
  {
    id: 'scholar', name: 'The Scholar', short: 'Learn', freq: '102.9',
    note: "I find European monarchal history (the Tudors, the succession crises, the absolute chaos of it all) genuinely fascinating. For US history, I'm particularly drawn to the social movements of the 60s and 70s. Also the New Deal. On the astronomy and astrology front: sure, one is scientific and the other is vibes, but I respect both equally. I've also been learning tarot for a couple of years.",
  },
  {
    id: 'games', name: 'The Gamer', short: 'Play', freq: '107.5',
    note: "Some of my favorites: <em>Detroit: Become Human</em>, <em>Life is Strange</em>, <em>The Sims</em>, <em>Telltale's The Walking Dead</em>, <em>Animal Crossing</em>. I also play Spades any chance I get: phone, online, at an actual table.",
  },
]

// ── Space Radio ───────────────────────────────────────────────────
function RadioView({ active, onSelect }) {
  const waveRef   = useRef(null)
  const glowRef   = useRef(null)
  const frameRef  = useRef(null)
  const offsetRef = useRef(0)

  const STATIONS = INTERESTS.map((item, i) => ({
    ...item,
    ch:       String(i + 1).padStart(2, '0'),
    waveFreq: 2.2 + i * 1.2,
  }))
  const current = STATIONS.find(s => s.id === active)

  const makePath = (freq, offset) =>
    Array.from({ length: 140 }, (_, i) => {
      const x     = (i / 139) * 400
      const phase = offset * 0.04
      const y     = 30
        + Math.sin((i / 139) * Math.PI * 2 * freq + phase) * 13
        + Math.sin((i / 139) * Math.PI * 2 * freq * 2.3 + phase * 1.3) * 4
      return `${i === 0 ? 'M' : 'L'}${x},${y}`
    }).join(' ')

  const makeNoise = (offset) =>
    Array.from({ length: 140 }, (_, i) => {
      const x = (i / 139) * 400
      const y = 30 + Math.sin(i * 127.1 + offset * 0.02) * Math.sin(i * 311.7 + offset * 0.015) * 7
      return `${i === 0 ? 'M' : 'L'}${x},${y}`
    }).join(' ')

  // Animate wave directly on DOM — no re-renders
  useEffect(() => {
    offsetRef.current = 0
    const freq = current?.waveFreq ?? null
    const animate = () => {
      offsetRef.current += 1
      const path = freq !== null
        ? makePath(freq, offsetRef.current)
        : makeNoise(offsetRef.current)
      waveRef.current?.setAttribute('d', path)
      glowRef.current?.setAttribute('d', path)
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  const initialPath = current ? makePath(current.waveFreq, 0) : makeNoise(0)

  return (
    <div className="int-radio">

      {/* Status strip */}
      <div className="int-radio-status-strip">
        <span className="int-radio-status-label">DEEP SPACE COMM</span>
        <span className="int-radio-status-divider" />
        <span className="int-radio-status-item">URANUS RELAY</span>
        <span className="int-radio-status-divider" />
        <span className={`int-radio-lock ${current ? 'locked' : ''}`}>
          {current ? '● SIGNAL LOCKED' : '○ SCANNING'}
        </span>
      </div>

      {/* Oscilloscope display */}
      <div className="int-radio-display">
        <div className="int-radio-scanline" />

        <svg className="int-radio-scope-svg" viewBox="0 0 400 60" preserveAspectRatio="none">
          {/* Grid */}
          {[15, 30, 45].map(y => (
            <line key={y} x1="0" y1={y} x2="400" y2={y}
              stroke="rgba(88,185,175,0.07)" strokeWidth="0.5" strokeDasharray="4,8" />
          ))}
          {[80, 160, 240, 320].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="60"
              stroke="rgba(88,185,175,0.07)" strokeWidth="0.5" strokeDasharray="4,8" />
          ))}
          {/* Glow (behind) */}
          <path ref={glowRef} d={initialPath}
            fill="none"
            stroke={current ? 'rgba(88,225,200,0.18)' : 'transparent'}
            strokeWidth="5"
            filter="url(#intBlur)"
          />
          {/* Wave */}
          <path ref={waveRef} d={initialPath}
            fill="none"
            stroke={current ? 'rgba(88,225,200,0.85)' : 'rgba(88,185,175,0.22)'}
            strokeWidth="1.2"
          />
          <defs>
            <filter id="intBlur"><feGaussianBlur stdDeviation="2.5" /></filter>
          </defs>
        </svg>

        {/* Readout row */}
        <div className="int-radio-readout">
          <div className="int-radio-readout-left">
            <div className="int-radio-ch-label">CH</div>
            <div className="int-radio-ch-num">{current ? current.ch : '--'}</div>
          </div>
          <div className="int-radio-readout-center">
            <div className="int-radio-freq-num">{current ? current.freq : '· · ·'}</div>
            <div className="int-radio-freq-unit">MHz</div>
          </div>
          <div className="int-radio-readout-right">
            <div className="int-radio-station-name">
              {current ? current.name.toUpperCase() : 'NO SIGNAL'}
            </div>
          </div>
        </div>
      </div>

      {/* Channel selector */}
      <div className="int-radio-channels">
        {STATIONS.map(s => (
          <button key={s.id}
            className={`int-rch-btn${active === s.id ? ' active' : ''}`}
            onClick={() => onSelect(s.id)}
          >
            <div className="int-rch-indicator" />
            <div className="int-rch-name">{s.short.toUpperCase()}</div>
            <div className="int-rch-freq">{s.freq} FM</div>
          </button>
        ))}
      </div>

    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────
export default function Interests({ onBack }) {
  const cardRef = useRef(null)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => cardRef.current?.classList.add('visible'), 120)
    return () => { clearTimeout(t); cardRef.current?.classList.remove('visible') }
  }, [])

  const toggle   = id => setActive(prev => prev === id ? null : id)
  const selected = INTERESTS.find(i => i.id === active)

  return (
    <div id="int-layer">
      <div id="int-glow" />
      <div id="int-card" ref={cardRef}>

        <div id="int-eyebrow">Uranus &nbsp;·&nbsp; Beyond the Data</div>
        <h1 id="int-title">Interests</h1>

        <p id="int-intro">
          Someone once said you should have three hobbies: one that keeps you in shape,
          one that keeps you creative, and one that keeps your mind sharp.
          Here are mine, and a bonus fourth I'll talk your ear off about.
        </p>

        <RadioView active={active} onSelect={toggle} />

        {/* Detail panel */}
        <div id="int-detail">
          {selected ? (
            <p id="int-detail-note" dangerouslySetInnerHTML={{ __html: selected.note }} />
          ) : (
            <p id="int-detail-prompt">Tune into any channel. I'll talk about all of it.</p>
          )}
        </div>

      </div>
      <button className="sec-back-btn" onClick={onBack}>← Solar System</button>
    </div>
  )
}

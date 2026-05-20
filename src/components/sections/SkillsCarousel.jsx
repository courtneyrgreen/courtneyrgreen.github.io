import { useState, useCallback } from 'react'
import { SKILL_GROUPS } from '../../data/skills.js'
import '../../styles/sections/SkillsCarousel.css'

const N = SKILL_GROUPS.length
const TILT = 25 * (Math.PI / 180)
const R = 260
// Shifts ring center up so front planet (110px below center) lands at screen center
const VERT_OFFSET = -110
// Programming (index 0) is now the gold Jupiter entry planet — start with it at front
const INITIAL_ROTATION = 180

// Angle where each planet sits. Front = bottom = -90deg (Math convention)
// We space them evenly; index 0 starts at front.
function getAngle(index, rotation) {
  return ((-90 + (index * 360) / N) + rotation) * (Math.PI / 180)
}

function getPlanetPos(index, rotation) {
  const a = getAngle(index, rotation)
  const x = R * Math.cos(a)
  const y = R * Math.sin(a) * Math.sin(TILT)
  const depth = (Math.sin(a) + 1) / 2 // 0 = back, 1 = front
  return { x, y, depth }
}

function lerp(a, b, t) { return a + (b - a) * t }

// x,y positions for moon dots around the active planet
function moonPositions(count, r, offsetDeg = 0) {
  return Array.from({ length: count }, (_, i) => {
    const rad = ((i * 360 / count) + offsetDeg) * (Math.PI / 180)
    return { x: Math.cos(rad) * r, y: Math.sin(rad) * r }
  })
}

// Larger radii than Skills.jsx — front planet is 136px so inner ring needs clearance
function getRings(skills) {
  if (skills.length <= 5) return [{ r: 100, items: skills, offset: -20 }]
  const split = Math.ceil(skills.length / 2)
  const outerOffset = split === 3 ? 60 : 25
  return [
    { r: 88,  items: skills.slice(0, split), offset: 0 },
    { r: 128, items: skills.slice(split),    offset: outerOffset },
  ]
}

export default function SkillsCarousel({ onBack }) {
  const [rotation, setRotation] = useState(INITIAL_ROTATION)
  const [openChip, setOpenChip] = useState(null) // { gIdx, sName }

  // Find which group is closest to front (depth closest to 1)
  function getFrontIndex() {
    let best = 0, bestDepth = -1
    for (let i = 0; i < N; i++) {
      const { depth } = getPlanetPos(i, rotation)
      if (depth > bestDepth) { bestDepth = depth; best = i }
    }
    return best
  }

  const frontIdx = getFrontIndex()

  function goNext() {
    setOpenChip(null)
    setRotation(r => r - 360 / N)
  }
  function goPrev() {
    setOpenChip(null)
    setRotation(r => r + 360 / N)
  }

  function goTo(idx) {
    if (idx === frontIdx) return
    setOpenChip(null)
    // Shortest path delta
    const step = 360 / N
    let delta = ((frontIdx - idx) * step) % 360
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360
    setRotation(r => r + delta)
  }

  const handleBackdrop = useCallback(() => setOpenChip(null), [])

  // Sort planets back-to-front for correct z-order
  const sortedPlanets = Array.from({ length: N }, (_, i) => {
    const { x, y, depth } = getPlanetPos(i, rotation)
    return { i, x, y, depth }
  }).sort((a, b) => a.depth - b.depth)

  return (
    <div id="sc-layer" onClick={handleBackdrop}>
      <div id="sc-hdr">
        <div id="sc-eyebrow">Orbital Survey · Arsenal</div>
        <h1 id="sc-title">Skills</h1>
      </div>

      <div id="sc-stage">
        {/* The tilted ring */}
        <div id="sc-ring" />

        {/* Active planet name — absolutely positioned just below front planet */}
        <div id="sc-active-label" style={{ '--sc-rgb': SKILL_GROUPS[frontIdx].rgb }}>
          {SKILL_GROUPS[frontIdx].label}
        </div>
        <p id="sc-hint">ringed moons expand on click</p>

        {/* Planets, back to front */}
        {sortedPlanets.map(({ i, x, y, depth }) => {
          const group = SKILL_GROUPS[i]
          const isFront = i === frontIdx
          const size = isFront ? 136 : Math.round(lerp(14, 52, depth))
          const opacity = isFront ? 1 : lerp(0.15, 0.72, depth)
          const rings = getRings(group.skills)

          return (
            <div
              key={group.label}
              className={`sc-planet-wrap${isFront ? ' sc-front' : ''}`}
              style={{
                '--scx': `${x}px`,
                '--scy': `${y + VERT_OFFSET}px`,
                '--sc-rgb': group.rgb,
                '--sc-size': `${size}px`,
                '--sc-opacity': opacity,
                zIndex: Math.round(depth * 100),
              }}
              onClick={e => {
                e.stopPropagation()
                if (!isFront) goTo(i)
              }}
            >
              {/* Planet sphere */}
              <div className="sc-core-wrap">
                <div className="sc-core" />
                <div className="sc-core-bands" />
                <div className="sc-core-spec" />
                <span className="sc-plabel">{group.label}</span>
              </div>

              {/* Moon orbit rings — dashed, clearly smaller than main orbital ring */}
              {isFront && rings.map((ring, ri) => (
                <div
                  key={`orbit-${ri}`}
                  className="sc-moon-ring"
                  style={{ '--mor': `${ring.r}px` }}
                />
              ))}

              {/* Moons — only on front planet */}
              {isFront && rings.flatMap((ring, ri) =>
                moonPositions(ring.items.length, ring.r, ring.offset).map((pos, si) => {
                  const skill = ring.items[si]
                  const hasMore = !!skill.subs?.length
                  const isOpen = openChip?.gIdx === i && openChip?.sName === skill.name
                  const side = pos.x >= 0 ? 'r' : 'l'
                  const delay = `${(ri * 4 + si) * 0.055}s`

                  return (
                    <div
                      key={skill.name}
                      className={`sc-moon${hasMore ? ' sc-ex' : ''}${isOpen ? ' sc-open' : ''}`}
                      style={{ '--mx': `${pos.x}px`, '--my': `${pos.y}px`, '--md': delay }}
                      onClick={e => {
                        e.stopPropagation()
                        if (!hasMore) return
                        setOpenChip(prev =>
                          prev?.sName === skill.name ? null : { gIdx: i, sName: skill.name }
                        )
                      }}
                    >
                      <div className="sc-dot" />
                      <span className={`sc-mname sc-mn-${side}`}>{skill.name}</span>
                      {isOpen && (
                        <div className={`sc-chips sc-chips-${side}`}>
                          {skill.subs.map(s => (
                            <span key={s} className="sc-chip">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          )
        })}
      </div>

      {/* Navigation arrows */}
      <button className="sc-arrow sc-arrow-l" onClick={e => { e.stopPropagation(); goPrev() }}>←</button>
      <button className="sc-arrow sc-arrow-r" onClick={e => { e.stopPropagation(); goNext() }}>→</button>

      <button className="sec-back-btn" onClick={onBack}>← Solar System</button>
    </div>
  )
}

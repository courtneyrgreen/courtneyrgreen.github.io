import { useState } from 'react'
import { SKILL_GROUPS } from '../../data/skills.js'
import '../../styles/sections/Skills.css'

// Split skills across orbit rings based on count
function getRings(skills) {
  if (skills.length <= 5) {
    return [{ r: 78, items: skills, offset: -20 }]
  }
  const split = Math.ceil(skills.length / 2)
  // For 3 inner moons (6-skill groups), offset outer ring by 60° so outer
  // moons land exactly between inner moons and labels never share the same height.
  // For 4 inner moons (7-skill groups), 25° avoids the crowded lower-right.
  const outerOffset = split === 3 ? 60 : 25
  return [
    { r: 62, items: skills.slice(0, split), offset: 0 },
    { r: 96, items: skills.slice(split),   offset: outerOffset },
  ]
}

// x,y positions for N items evenly spaced on a circle of radius r
function orbitPositions(count, r, offsetDeg = 0) {
  return Array.from({ length: count }, (_, i) => {
    const rad = ((i * 360 / count) + offsetDeg) * (Math.PI / 180)
    return { x: Math.cos(rad) * r, y: Math.sin(rad) * r }
  })
}

export default function Skills({ onBack }) {
  const [open,     setOpen]     = useState(null) // { gLabel, sName } — open chips panel
  const [expanded, setExpanded] = useState(null) // gLabel — planet clicked, all names visible

  function handleBackdropClick() {
    setOpen(null)
    setExpanded(null)
  }

  return (
    <div id="skills-layer" onClick={handleBackdropClick}>

      <div id="sk-hdr">
        <div id="sk-eyebrow">Orbital Survey · Arsenal</div>
        <h1 id="sk-title">Skills</h1>
        <p id="sk-hint">click a planet to reveal all · click a moon for detail</p>
      </div>

      <div id="sk-cosmos">
        {SKILL_GROUPS.map(group => {
          const rings       = getRings(group.skills)
          const isGroupOpen = open?.gLabel === group.label
          const isExpanded  = expanded === group.label

          return (
            <div
              key={group.label}
              className={`sk-sys${isGroupOpen ? ' sys-active' : ''}${isExpanded ? ' sys-expanded' : ''}`}
              style={{ '--sk-rgb': group.rgb }}
            >
              {/* Orbit ring visuals with animated tracer dot */}
              {rings.map((ring, ri) => (
                <div
                  key={ri}
                  className="sk-orbit"
                  style={{ '--or': `${ring.r}px`, '--od': `${ri === 0 ? 20 : 30}s` }}
                />
              ))}

              {/* Planet sphere — click to reveal all moon names */}
              <div
                className="sk-core-wrap"
                onClick={e => {
                  e.stopPropagation()
                  setExpanded(prev => prev === group.label ? null : group.label)
                  setOpen(null)
                }}
              >
                <div className="sk-core" />
                <div className="sk-core-bands" />
                <div className="sk-core-spec" />
                <span className="sk-plabel">{group.label}</span>
              </div>

              {/* Moon skill dots */}
              {rings.flatMap((ring, ri) =>
                orbitPositions(ring.items.length, ring.r, ring.offset).map((pos, si) => {
                  const skill   = ring.items[si]
                  const hasMore = !!skill.subs?.length
                  const isOpen  = open?.gLabel === group.label && open?.sName === skill.name
                  const side    = pos.x >= 0 ? 'r' : 'l'
                  const delay   = `${(ri * 4 + si) * 0.055}s`

                  return (
                    <div
                      key={skill.name}
                      className={`sk-moon${hasMore ? ' sk-ex' : ''}${isOpen ? ' sk-open' : ''}`}
                      style={{ '--mx': `${pos.x}px`, '--my': `${pos.y}px`, '--md': delay }}
                      onClick={e => {
                        e.stopPropagation()
                        if (!hasMore) return
                        setOpen(prev =>
                          prev?.sName === skill.name
                            ? null
                            : { gLabel: group.label, sName: skill.name }
                        )
                      }}
                    >
                      <div className="sk-dot" />
                      <span className={`sk-mname sk-mn-${side}`}>{skill.name}</span>

                      {isOpen && (
                        <div className={`sk-chips sk-chips-${side}`}>
                          {skill.subs.map(s => (
                            <span key={s} className="sk-chip">{s}</span>
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

      <button className="sec-back-btn" onClick={onBack}>← Solar System</button>
    </div>
  )
}

import { useState, useEffect, useRef } from 'react'
import { SKILL_GROUPS } from '../../data/skills.js'
import '../../styles/sections/Skills.css'

export default function Skills({ onBack }) {
  const cardRef  = useRef(null)
  const [active,      setActive]      = useState(null)  // { skill, group } or null
  const [filterGroup, setFilterGroup] = useState(null)  // group label or null

  useEffect(() => {
    const t = setTimeout(() => cardRef.current?.classList.add('visible'), 120)
    return () => {
      clearTimeout(t)
      cardRef.current?.classList.remove('visible')
    }
  }, [])

  const handleBadge = (skill, group) => {
    if (!skill.subs?.length) return
    setActive(prev => prev?.skill.name === skill.name ? null : { skill, group })
  }

  const handleFilter = (label) => {
    setFilterGroup(prev => prev === label ? null : label)
    setActive(null)
  }

  const closePopover = (e) => {
    if (e.target.id === 'skills-layer') { setActive(null); setFilterGroup(null) }
  }

  return (
    <div id="skills-layer" onClick={closePopover}>
      <div id="sk-glow" />

      <div id="sk-card" ref={cardRef}>

        <div id="sk-eyebrow">Saturn &nbsp;·&nbsp; Arsenal</div>
        <h1 id="sk-title">Skills</h1>
        <div id="sk-rule" />

        {/* ── Category legend / filter ────────────────────────────── */}
        <div id="sk-legend">
          {SKILL_GROUPS.map(g => {
            const isFiltered = filterGroup === g.label
            return (
              <button
                key={g.label}
                className={['sk-legend-item', isFiltered ? 'sk-legend-active' : ''].filter(Boolean).join(' ')}
                style={{ '--sk-rgb': g.rgb }}
                onClick={() => handleFilter(g.label)}
              >
                <span className="sk-dot" style={{ background: `rgba(${g.rgb},${isFiltered ? 1 : 0.85})` }} />
                <span className="sk-legend-label">{g.label}</span>
              </button>
            )
          })}
        </div>

        {/* ── Tag cloud ──────────────────────────────────────────── */}
        <div id="sk-cloud">
          {SKILL_GROUPS.map(group =>
            group.skills.map(skill => {
              const isActive   = active?.skill.name === skill.name
              const expandable = !!skill.subs?.length
              const dimmed     = filterGroup !== null && filterGroup !== group.label
              return (
                <button
                  key={skill.name}
                  className={[
                    'sk-badge',
                    expandable ? 'sk-expandable' : '',
                    isActive   ? 'sk-active'     : '',
                    dimmed     ? 'sk-dimmed'      : '',
                  ].filter(Boolean).join(' ')}
                  style={{ '--sk-rgb': group.rgb }}
                  onClick={() => handleBadge(skill, group)}
                >
                  {skill.name}
                  {expandable && <span className="sk-arrow">{isActive ? '▲' : '▾'}</span>}
                </button>
              )
            })
          )}
        </div>

        {/* ── Sub-skill popover ──────────────────────────────────── */}
        {active && (
          <div id="sk-popover" style={{ '--sk-rgb': active.group.rgb }}>
            <div className="sk-popover-title">{active.skill.name}</div>
            <div className="sk-popover-subs">
              {active.skill.subs.map(sub => (
                <span key={sub} className="sk-sub-badge">{sub}</span>
              ))}
            </div>
          </div>
        )}

      </div>

      <button className="sec-back-btn" onClick={onBack}>
        ← Solar System
      </button>
    </div>
  )
}

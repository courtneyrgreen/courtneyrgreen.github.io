import { useState, useEffect, useRef } from 'react'
import { SKILL_GROUPS } from '../../data/skills.js'
import '../../styles/sections/Skills.css'

/*
  Skills — Saturn section.
  Tag-cloud layout: all skills as colour-coded pill badges.
  Clicking a badge with sub-skills opens a popover listing them.
  Degree credential patches sit below the cloud.

  Props:
    onBack {fn} — called when "← Solar System" is clicked
*/

const DEGREES = [
  {
    abbr:   'M.S.',
    field:  'Data Science',
    school: 'Georgetown University',
    year:   '2025',
  },
  {
    abbr:   'B.S.',
    field:  'Mathematics',
    school: 'University of Virginia',
    year:   '2023',
  },
]

export default function Skills({ onBack }) {
  const cardRef  = useRef(null)
  const [active, setActive] = useState(null)   // { skill, group } or null

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

  const closePopover = (e) => {
    if (e.target.id === 'skills-layer') setActive(null)
  }

  return (
    <div id="skills-layer" onClick={closePopover}>
      <div id="sk-glow" />

      <div id="sk-card" ref={cardRef}>

        <div id="sk-eyebrow">Saturn &nbsp;·&nbsp; Arsenal</div>
        <h1 id="sk-title">Skills</h1>
        <div id="sk-rule" />

        {/* ── Category legend ────────────────────────────────────── */}
        <div id="sk-legend">
          {SKILL_GROUPS.map(g => (
            <div key={g.label} className="sk-legend-item">
              <span className="sk-dot" style={{ background: `rgba(${g.rgb},0.85)` }} />
              <span className="sk-legend-label">{g.label}</span>
            </div>
          ))}
        </div>

        {/* ── Tag cloud ──────────────────────────────────────────── */}
        <div id="sk-cloud">
          {SKILL_GROUPS.map(group =>
            group.skills.map(skill => {
              const isActive    = active?.skill.name === skill.name
              const expandable  = !!skill.subs?.length
              return (
                <button
                  key={skill.name}
                  className={[
                    'sk-badge',
                    expandable ? 'sk-expandable' : '',
                    isActive   ? 'sk-active'     : '',
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

        {/* ── Degree credential patches ──────────────────────────── */}
        <div id="sk-credentials">
          <div id="sk-cred-label">Credentials</div>
          <div id="sk-patches">
            {DEGREES.map(d => (
              <div key={d.abbr + d.school} className="patch">
                <div className="patch-ring" />
                <div className="patch-body">
                  <div className="patch-abbr">{d.abbr}</div>
                  <div className="patch-field">{d.field}</div>
                  <div className="patch-divider" />
                  <div className="patch-school">{d.school}</div>
                  <div className="patch-year">{d.year}</div>
                </div>
                <span className="patch-star tl">★</span>
                <span className="patch-star tr">★</span>
                <span className="patch-star bl">★</span>
                <span className="patch-star br">★</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <button className="sec-back-btn" onClick={onBack}>
        ← Solar System
      </button>
    </div>
  )
}

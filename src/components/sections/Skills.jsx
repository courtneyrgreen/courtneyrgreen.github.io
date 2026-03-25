import { SKILL_GROUPS } from '../../data/skills.js'
import '../../styles/sections/Skills.css'

/*
  Degrees displayed as military-style mission patches.
  Add certificates here later using the same shape.
*/
const DEGREES = [
  {
    abbr:   'M.S.',
    field:  'Statistics',
    school: 'Georgetown University',
    year:   '2018',
    detail: 'Bayesian Methods · Survival Analysis',
  },
  {
    abbr:   'B.S.',
    field:  'Mathematics',
    school: 'Howard University',
    year:   '2016',
    detail: 'Pure &amp; Applied Mathematics',
  },
]

/*
  Skills — badge grid layout + mission-patch degree badges.

  Props:
    onBack {fn} — called when "← Solar System" is clicked
*/
export default function Skills({ onBack }) {
  return (
    <div id="skills-layer">
      <h2>Skills &amp; Expertise</h2>

      {SKILL_GROUPS.map(group => (
        <section key={group.label} className="skill-group">
          <h3 className="group-label">{group.label}</h3>

          <div className="badges-grid">
            {group.skills.map(skill => (
              <div
                key={skill.name}
                className="badge"
                style={{
                  backgroundColor: group.color + '0.25)',
                  borderColor:     group.color + '0.55)',
                }}
              >
                {skill.name}&nbsp;<span className="badge-pct">{Math.round(skill.level * 100)}%</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* ── Mission-patch degree badges ───────────────────────────── */}
      <section className="skill-group">
        <h3 className="group-label">Credentials</h3>

        <div className="patches-grid">
          {DEGREES.map(d => (
            <div key={d.abbr + d.school} className="patch">
              {/* Outer decorative ring */}
              <div className="patch-ring" />

              {/* Inner content */}
              <div className="patch-body">
                <div className="patch-abbr">{d.abbr}</div>
                <div className="patch-field">{d.field}</div>
                <div className="patch-divider" />
                <div className="patch-school">{d.school}</div>
                <div className="patch-year">{d.year}</div>
              </div>

              {/* Corner stars */}
              <span className="patch-star tl">★</span>
              <span className="patch-star tr">★</span>
              <span className="patch-star bl">★</span>
              <span className="patch-star br">★</span>
            </div>
          ))}
        </div>
      </section>

      <button className="sec-back-btn" onClick={onBack}>
        ← Solar System
      </button>
    </div>
  )
}

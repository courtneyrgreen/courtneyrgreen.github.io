import { useEffect, useRef } from 'react'
import '../../styles/sections/Objective.css'

/*
  Objective — Mercury section.
  Styled as a mission brief: a short, intentional statement of
  purpose and direction. Mercury is the first planet — this is
  the first real thing visitors learn about you.

  Props:
    onBack {fn} — called when "← Solar System" is clicked
*/
export default function Objective({ onBack }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => cardRef.current?.classList.add('visible'), 120)
    return () => {
      clearTimeout(t)
      if (cardRef.current) cardRef.current.classList.remove('visible')
    }
  }, [])

  return (
    <div id="obj-layer">
      {/* Subtle mercury-grey radial glow */}
      <div id="obj-glow" />

      <div id="obj-card" ref={cardRef}>

        {/* Header */}
        <div id="obj-eyebrow">Mercury &nbsp;·&nbsp; Mission Brief</div>
        <h1 id="obj-title">Objective</h1>

        {/* Thin rule */}
        <div id="obj-rule" />

        {/* Mission statement */}
        <p id="obj-statement">
          To apply machine learning, causal inference, and statistical modeling
          to problems that matter, particularly where data meets public policy,
          systemic equity, and social impact.
        </p>

        {/* Three focus pillars */}
        <div id="obj-pillars">
          <div className="obj-pillar">
            <div className="obj-pillar-label">Expertise</div>
            <div className="obj-pillar-value">Computational Social Science</div>
          </div>
          <div className="obj-pillar-sep" />
          <div className="obj-pillar">
            <div className="obj-pillar-label">Purpose</div>
            <div className="obj-pillar-value">Public Policy, Equity &amp; Social Impact</div>
          </div>
          <div className="obj-pillar-sep" />
          <div className="obj-pillar">
            <div className="obj-pillar-label">Approach</div>
            <div className="obj-pillar-value">Rigorous Analysis, Accessible Insight</div>
          </div>
        </div>

        {/* Longer objective paragraph */}
        <p id="obj-body">
          I work at the intersection of data science and public policy, translating
          complex analysis into decisions that actually inform policy and practice.
          I'm drawn to problems with real stakes: electoral systems, public health,
          criminal justice, climate risk. I thrive when I get to move between the
          technical and the strategic, and I'm most useful in environments that need
          someone who can do both.
        </p>

        {/* Current status line */}
        <div id="obj-status">
          <span className="obj-status-dot" />
          M.S. Data Science &amp; Analytics · Georgetown University · 2026
        </div>

      </div>

      <button className="sec-back-btn" onClick={onBack}>
        ← Solar System
      </button>
    </div>
  )
}

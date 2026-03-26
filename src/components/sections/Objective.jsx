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
          To apply machine learning, statistical modeling, and data engineering
          to problems that matter — particularly where data meets public policy,
          systemic equity, and social impact.
        </p>

        {/* Three focus pillars */}
        <div id="obj-pillars">
          <div className="obj-pillar">
            <div className="obj-pillar-label">Discipline</div>
            <div className="obj-pillar-value">Data Science &amp; Analytics</div>
          </div>
          <div className="obj-pillar-sep" />
          <div className="obj-pillar">
            <div className="obj-pillar-label">Domain</div>
            <div className="obj-pillar-value">Public Policy &amp; Social Impact</div>
          </div>
          <div className="obj-pillar-sep" />
          <div className="obj-pillar">
            <div className="obj-pillar-label">Goal</div>
            <div className="obj-pillar-value">Evidence-Based Decisions at Scale</div>
          </div>
        </div>

        {/* Longer objective paragraph */}
        <p id="obj-body">
          I have built expertise at the intersection of predictive modeling,
          causal inference, and data engineering — with the goal of translating
          rigorous analysis into actionable insight. I seek collaborative,
          mission-driven environments where technical depth and policy
          understanding are equally valued. Whether the challenge is electoral
          data, climate risk, public health, or criminal justice, my aim is the
          same: make the analysis useful, make it honest, make it matter.
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

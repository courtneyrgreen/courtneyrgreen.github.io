import { useEffect, useRef } from 'react'
import '../../styles/sections/Objective.css'

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
      <div id="obj-glow" />

      {/* Shell carries the drop-shadow glow so it follows the clip-path */}
      <div id="obj-card-shell">
        <div id="obj-card" ref={cardRef}>

          {/* ── Header bar ── */}
          <div id="obj-hdr">
            <span id="obj-mission-id">M-01 &nbsp;·&nbsp; Mercury</span>
            <span id="obj-title-bar">Objective</span>
            <span id="obj-class">Priority Alpha</span>
          </div>

          {/* ── Metadata strip ── */}
          <div id="obj-meta-strip">
            <span className="obj-meta-item">Clearance: Alpha</span>
            <span className="obj-meta-sep">·</span>
            <span className="obj-meta-item">Status: Active</span>
            <span className="obj-meta-sep">·</span>
            <span className="obj-meta-item">Cycle: 2026</span>
            <span className="obj-meta-sep">·</span>
            <span className="obj-meta-item">M-01</span>
          </div>

          {/* ── Content ── */}
          <div id="obj-content">

            {/* Mission Parameters */}
            <div className="obj-panel">
              <div className="obj-panel-hdr">
                <span className="obj-panel-hdr-icon">▪</span>
                <span className="obj-panel-hdr-text">Mission Parameters</span>
              </div>
              <div className="obj-panel-body">
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
                    <div className="obj-pillar-value">Data-Driven, Impact-Oriented</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Objective + Background — single panel */}
            <div className="obj-panel">
              <div className="obj-panel-hdr">
                <span className="obj-panel-hdr-icon">▪</span>
                <span className="obj-panel-hdr-text">Mission Objective</span>
              </div>
              <div className="obj-panel-body">
                <p id="obj-statement">
                  To apply machine learning, causal inference, and statistical modeling
                  to problems that matter, particularly where data meets public policy,
                  systemic equity, and social impact.
                </p>
                <p id="obj-body">
                  I work at the intersection of data science and public policy, translating
                  complex analysis into actionable decisions that inform policy and practice.
                  My focus includes high-impact issues such as electoral systems, public health,
                  criminal justice, and climate risk. I thrive when I get to move between the
                  technical and the strategic, and I'm most useful in environments that need
                  someone who can do both.
                </p>
              </div>
            </div>

          </div>

          {/* ── Footer bar ── */}
          <div id="obj-footer">
            <div id="obj-status">
              <span className="obj-status-dot" />
              M.S. Data Science &amp; Analytics &nbsp;·&nbsp; B.A. Public Policy &amp; Leadership
            </div>
          </div>

        </div>
      </div>

      <button className="sec-back-btn" onClick={onBack}>
        ← Solar System
      </button>
    </div>
  )
}

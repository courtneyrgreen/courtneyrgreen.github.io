import { useEffect, useRef, useState } from 'react'
import { TX_LINES } from '../../data/resume.js'
import '../../styles/sections/Resume.css'

/*
  Resume — "The Transmission" section.

  Displays the CV as an incoming data transmission: lines of text are
  revealed one-by-one from top to bottom, accompanied by a green scan
  line that advances as the content loads.

  After all lines appear, a "Request Transmission" button fades in.

  Props:
    onBack {fn} — called when "← Solar System" is clicked
*/
export default function Resume({ onBack }) {
  const scanRef    = useRef(null)   // the moving scan line element
  const contentRef = useRef(null)   // container for all text lines
  const [showDownload, setShowDownload] = useState(false)

  useEffect(() => {
    const content = contentRef.current
    const scan    = scanRef.current
    if (!content) return

    // ── Build all lines as hidden DOM elements ─────────────────────
    TX_LINES.forEach((line, i) => {
      const span = document.createElement('span')

      // Apply type-specific class for colour / font variation
      span.className = 'tx-line'
        + (line.t === 'head'    ? ' tx-head'    : '')
        + (line.t === 'section' ? ' tx-section' : '')
        + (line.t === 'dim'     ? ' tx-dim'     : '')

      // Non-breaking space keeps the line height for blank spacer lines
      span.textContent = line.text || '\u00a0'

      // Add the blinking cursor to the very last line
      if (i === TX_LINES.length - 1) {
        const cursor = document.createElement('span')
        cursor.id = 'tx-cursor'
        span.appendChild(cursor)
      }

      content.appendChild(span)
    })

    // ── Reveal lines one-by-one ────────────────────────────────────
    const lines  = content.querySelectorAll('.tx-line')
    const totalH = content.scrollHeight || 600
    let i = 0

    function next() {
      if (i >= lines.length) {
        setShowDownload(true)
        return
      }

      // Fade in this line
      lines[i].classList.add('on')

      // Advance the scan line proportionally
      if (scan) {
        const pct = i / lines.length
        scan.style.top = `${Math.round(pct * totalH)}px`
      }

      i++
      // First few lines reveal faster for dramatic effect
      setTimeout(next, i < 4 ? 80 : 45)
    }

    // Short delay before transmission begins
    const startTimer = setTimeout(next, 500)

    return () => {
      clearTimeout(startTimer)
      // Clear injected DOM content on unmount
      if (content) content.innerHTML = ''
    }
  }, [])

  return (
    <div id="resume-layer">
      {/* ── Transmission animation — screen view only ─────────────── */}
      <div id="tx-wrap">
        {/* CRT scanline pattern overlay */}
        <div id="tx-overlay" />

        {/* Green scan-line bar that moves down as content reveals */}
        <div ref={scanRef} id="tx-scan" />

        {/* Text content (lines injected by useEffect) */}
        <div ref={contentRef} id="tx-content" />

        {/* Print button — appears after full reveal */}
        <button
          id="tx-download"
          className={showDownload ? 'show' : ''}
          onClick={() => window.print()}
        >
          ⌤ Print / Download PDF
        </button>
      </div>

      {/* ── Printable resume — hidden on screen, shown @media print ── */}
      <div id="resume-print">
        <div id="rp-header">
          <h1 id="rp-name">Courtney Green</h1>
          <p id="rp-title">Senior Data Scientist &amp; Researcher</p>
          <div id="rp-contact">
            Washington, D.C.
            &nbsp;·&nbsp; courtney@example.com
            &nbsp;·&nbsp; linkedin.com/in/courtneygreen
            &nbsp;·&nbsp; github.com/courtneygreen
          </div>
        </div>

        <section className="rp-section">
          <h2 className="rp-sh">Summary</h2>
          <p className="rp-body">
            I work at the intersection of statistical modeling, machine learning,
            and public policy — translating complex data into decisions that matter.
            My approach is methodical and curiosity-driven, living at the edges of
            disciplines where statistics meets narrative.
          </p>
        </section>

        <section className="rp-section">
          <h2 className="rp-sh">Experience</h2>

          <div className="rp-role">
            <div className="rp-role-row">
              <span className="rp-role-title">Senior Data Scientist</span>
              <span className="rp-role-date">2022 – Present</span>
            </div>
            <div className="rp-role-org">Meridian Analytics</div>
            <ul className="rp-list">
              <li>Lead modeling for financial services clients with full lifecycle ownership</li>
              <li>Designed causal inference frameworks to evaluate intervention outcomes</li>
            </ul>
          </div>

          <div className="rp-role">
            <div className="rp-role-row">
              <span className="rp-role-title">Data Scientist</span>
              <span className="rp-role-date">2020 – 2022</span>
            </div>
            <div className="rp-role-org">Federal Reserve Board</div>
            <ul className="rp-list">
              <li>Macroeconomic forecasting and scenario modeling</li>
              <li>NLP pipeline for regulatory text classification</li>
            </ul>
          </div>

          <div className="rp-role">
            <div className="rp-role-row">
              <span className="rp-role-title">Research Analyst</span>
              <span className="rp-role-date">2018 – 2020</span>
            </div>
            <div className="rp-role-org">Georgetown University</div>
            <ul className="rp-list">
              <li>Causal inference research in public health and social policy</li>
              <li>Peer-reviewed publications in Journal of Public Health Policy</li>
            </ul>
          </div>
        </section>

        <section className="rp-section">
          <h2 className="rp-sh">Skills</h2>
          <div className="rp-skills-grid">
            <div className="rp-skill-row">
              <span className="rp-skill-cat">Methods</span>
              <span className="rp-skill-val">Machine Learning · Statistical Modeling · Causal Inference · NLP · Visualization</span>
            </div>
            <div className="rp-skill-row">
              <span className="rp-skill-cat">Languages</span>
              <span className="rp-skill-val">Python · R · SQL</span>
            </div>
            <div className="rp-skill-row">
              <span className="rp-skill-cat">Frameworks</span>
              <span className="rp-skill-val">PyTorch · TensorFlow · Stan · Spark · dbt · Airflow · FastAPI</span>
            </div>
            <div className="rp-skill-row">
              <span className="rp-skill-cat">Infrastructure</span>
              <span className="rp-skill-val">AWS · GCP · Docker</span>
            </div>
          </div>
        </section>

        <section className="rp-section">
          <h2 className="rp-sh">Education</h2>
          <div className="rp-role">
            <div className="rp-role-row">
              <span className="rp-role-title">M.S. Statistics</span>
              <span className="rp-role-date">2018</span>
            </div>
            <div className="rp-role-org">Georgetown University</div>
            <p className="rp-body">Bayesian non-parametric methods · survival analysis</p>
          </div>
          <div className="rp-role">
            <div className="rp-role-row">
              <span className="rp-role-title">B.S. Mathematics</span>
              <span className="rp-role-date">2016</span>
            </div>
            <div className="rp-role-org">Howard University</div>
          </div>
        </section>

        <section className="rp-section">
          <h2 className="rp-sh">Publications</h2>
          <ul className="rp-list">
            <li>Green, C. et al. (2023). Racial Disparities in Maternal Mortality. <em>Journal of Public Health Policy</em></li>
            <li>Green, C. et al. (2020). Structural Barriers to Voter Participation. <em>Political Analysis</em></li>
          </ul>
        </section>
      </div>

      <button className="sec-back-btn print-no-print" onClick={onBack}>
        ← Solar System
      </button>
    </div>
  )
}

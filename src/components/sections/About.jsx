import { useEffect, useRef } from 'react'
import profileImg from '../../assets/images/headshot.jpg'
import '../../styles/sections/About.css'

export default function About({ onBack }) {
  const cometRef = useRef(null)
  const wp0Ref   = useRef(null)
  const wp1Ref   = useRef(null)
  const wp2Ref   = useRef(null)
  const wp3Ref   = useRef(null)

  useEffect(() => {
    const t1 = setTimeout(() => wp0Ref.current?.classList.add('active'), 400)
    const t2 = setTimeout(() => wp1Ref.current?.classList.add('active'), 1200)
    const t3 = setTimeout(() => wp2Ref.current?.classList.add('active'), 2000)
    const t4 = setTimeout(() => wp3Ref.current?.classList.add('active'), 2800)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
      wp0Ref.current?.classList.remove('active')
      wp1Ref.current?.classList.remove('active')
      wp2Ref.current?.classList.remove('active')
      wp3Ref.current?.classList.remove('active')
    }
  }, [])

  return (
    <div id="about-layer">

      {/* ── Two-column content ───────────────────────────────────── */}
      <div id="about-layout">

        {/* ── Left: portrait ───────────────────────────────────── */}
        <div id="obs-left">
          <div id="obs-portrait">
            <img id="obs-headshot" src={profileImg} alt="Courtney Green" />
            <div id="obs-scan" />
            <div id="obs-portrait-overlay" />
          </div>
          <div id="obs-status">
            <span id="obs-status-dot" />
            <span className="obs-status-txt">Crew</span>
            <span className="obs-status-txt">C. Green</span>
          </div>
        </div>

        {/* ── Right: info panel (screen) ───────────────────────── */}
        <div id="obs-info">
          <div id="obs-panel-hdr">▸ signal received</div>
          <div id="obs-eyebrow">The Observatory</div>
          <div id="obs-name">Courtney Green</div>
          <div id="obs-role">Incoming Tech, Data, &amp; AI Consultant II @ Guidehouse</div>

          <div id="obs-cards">
            <div className="asc-card">
              <div className="asc-label">Base</div>
              <div className="asc-value">Washington, D.C.</div>
            </div>
            <div id="obs-socials-inline">
              <a className="obs-social-node" href="https://github.com/courtneyrgreen" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a className="obs-social-node" href="https://www.linkedin.com/in/courtneyreneegreen/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div id="obs-bio">
            I'm a data scientist and policy analyst based in Washington, D.C., having just finished my M.S. in Data Science &amp; Analytics at Georgetown. I think the most interesting part of any analysis is what you do with it afterward. This year, I've been scraping live election results for the Associated Press and working as a Scholars Program Associate at Georgetown's Prisons and Justice Initiative, and this summer I'm joining Guidehouse as a Tech, Data &amp; AI Consultant. I've always been the kind of person who can't quite call something finished. There's always one more question worth asking.
          </div>
        </div>
      </div>

      {/* ── Bottom: transmission log ─────────────────────────────── */}
      <div id="obs-journey-wrap">
        <div id="obs-journey-lbl">Transmission Log</div>
        <div id="obs-journey">
          <div id="obs-journey-line" />
          <div ref={cometRef} id="obs-comet" />

          <div className="obs-wp" ref={wp0Ref} style={{ left: '5%' }}>
            <div className="obs-wp-dot" />
            <div className="obs-wp-label">UVA</div>
            <div className="obs-wp-desc">Policy &amp; CS</div>
          </div>

          <div className="obs-wp" ref={wp1Ref} style={{ left: '35%' }}>
            <div className="obs-wp-dot" />
            <div className="obs-wp-label">Georgetown</div>
            <div className="obs-wp-desc">MS Data Science</div>
          </div>

          <div className="obs-wp" ref={wp2Ref} style={{ left: '65%' }}>
            <div className="obs-wp-dot" />
            <div className="obs-wp-label">Now</div>
            <div className="obs-wp-desc">AP Elections Web Scraper</div>
          </div>

          <div className="obs-wp" ref={wp3Ref} style={{ left: '95%' }}>
            <div className="obs-wp-dot" />
            <div className="obs-wp-label">Next</div>
            <div className="obs-wp-desc">Consultant II @ Guidehouse</div>
          </div>
        </div>
      </div>

      <button className="sec-back-btn" onClick={onBack}>
        ← Solar System
      </button>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import '../../styles/sections/Experience.css'

/*
  Experience — Earth section.
  Displays Education + Work Experience as a scrollable card timeline.

  Props:
    onBack {fn} — called when "← Solar System" is clicked
*/

const EDUCATION = [
  {
    school: 'Georgetown University',
    sub: 'Graduate School of Arts & Sciences',
    location: 'Washington, D.C.',
    dates: '2024 – 2026',
    degree: 'M.S. Data Science & Analytics (DSAN)',
    gpa: '4.0 / 4.0',
    coursework: [
      'Probabilistic Modeling & Statistical Computing',
      'Neural Networks & Advanced Deep Learning',
      'Reinforcement Learning',
      'Advanced Data Visualization',
      'Statistical Learning for Analysis',
      'Database Systems & SQL',
      'Big Data & Cloud Computing',
      'Machine Learning for App Development',
      'Causal Inference for Computational Social Science',
    ],
    roles: [
      {
        title: 'Graduate Teaching Assistant',
        items: [
          'Causal Inference for Computational Social Science — Supported instruction on propensity score matching, synthetic controls, instrumental variables, causal forests, and double-debiased ML. Co-developed labs and final project materials.',
          'Probabilistic Modeling & Statistical Computing — Covered probability theory, Monte Carlo simulation, Bayesian models, EM, hidden Markov models, and graphical models. Held office hours and graded in R.',
        ],
      },
    ],
    highlights: [
      'Georgetown University Merit Scholarship Recipient (2025)',
      'First Place — DC Metro StatConnect 2025 Graduate Research Poster Competition',
    ],
  },
  {
    school: 'University of Virginia',
    sub: 'Frank Batten School of Leadership and Public Policy',
    location: 'Charlottesville, VA',
    dates: '2020 – 2024',
    degree: 'B.A. Public Policy and Leadership · Minor in Computer Science',
  },
]

const WORK = [
  {
    org: 'The Associated Press',
    location: 'Remote',
    dates: 'Oct 2025 – Present',
    role: 'Elections Web Scraper',
    bullets: [
      'Assist the AP in collecting and verifying election night results through automated web scraping.',
      'Utilize Python and various data tools to ensure accuracy in gathering live election data.',
      'Supported the November 2025 General Election and ongoing 2026 state primaries.',
      'Merges interests in data science, technology, and political journalism.',
    ],
  },
  {
    org: 'Guidehouse',
    location: 'Arlington, VA',
    dates: 'Jun – Aug 2025',
    role: 'Commercial Sustainability Intern',
    bullets: [
      'Developed an internal scoring tool to evaluate corporate CDP responses; automated scoring, flagged data gaps, and generated dashboards for climate disclosure performance.',
      'Led design of an AI-powered Retrofit Portfolio Ranking Engine prototype using predictive modeling to help affordable housing agencies prioritize projects by emissions impact and funding alignment.',
      'Supported a 20-year energy demand forecast for NYISO using ARIMA, linear regression, and random forest models in R.',
      'Analyzed downscaled climate models (CMIP6) to assess fitness for localized climate risk forecasting.',
    ],
  },
  {
    org: 'EVgo',
    location: 'Los Angeles, CA',
    dates: 'Jun – Aug 2024',
    role: 'Market Development & Public Policy Intern',
    bullets: [
      'Researched government incentives (30C tax credit, NEVI program) to support EV charging infrastructure development.',
      'Drafted data-driven reports evaluating electricity rate designs and charging infrastructure expansion.',
      'Collaborated across software, policy, and data teams supporting DOE Title 17 Clean Financing programs.',
    ],
  },
  {
    org: 'VOX Global',
    location: 'Washington, D.C.',
    dates: 'May – Aug 2023',
    role: 'Public Affairs Intern',
    bullets: [
      'Performed audits and data collection to inform client reports; used Excel and Tableau to identify trends in CSR initiatives.',
      'Developed media outreach strategies and managed stakeholder engagement data for Fortune 500 clients.',
      'Wrote, edited, and proofread reports and internal communications.',
    ],
  },
  {
    org: 'Mindset',
    location: 'Washington, D.C.',
    dates: 'Jun 2021 – Aug 2022',
    role: 'Policy Research Intern',
    bullets: [
      'Conducted qualitative and quantitative research on cybersecurity and privacy policy; analyzed frameworks and performed risk assessments.',
      'Tracked legislative trends to assess impacts of regulatory changes for clients.',
      'Maintained an extensive cybersecurity and privacy legislative database covering congressional activity, the Biden Administration, and independent regulators.',
    ],
  },
]

export default function Experience({ onBack }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => cardRef.current?.classList.add('visible'), 120)
    return () => {
      clearTimeout(t)
      cardRef.current?.classList.remove('visible')
    }
  }, [])

  return (
    <div id="exp-layer">
      <div id="exp-glow" />

      <div id="exp-card" ref={cardRef}>

        <div id="exp-eyebrow">Earth &nbsp;·&nbsp; Mission Log</div>
        <h1 id="exp-title">Experience</h1>
        <div id="exp-rule" />

        {/* ── Education ──────────────────────────────────────────── */}
        <section className="exp-section">
          <h2 className="exp-section-label">Education</h2>

          {EDUCATION.map(ed => (
            <div key={ed.school} className="exp-entry edu-entry">
              <div className="exp-entry-header">
                <div className="exp-entry-left">
                  <div className="exp-org">{ed.school}</div>
                  <div className="exp-sub">{ed.sub}</div>
                  <div className="exp-degree">{ed.degree}</div>
                  {ed.gpa && <div className="exp-gpa">GPA: {ed.gpa}</div>}
                </div>
                <div className="exp-entry-right">
                  <div className="exp-location">{ed.location}</div>
                  <div className="exp-dates">{ed.dates}</div>
                </div>
              </div>

              {ed.coursework && (
                <div className="exp-coursework">
                  <span className="exp-cw-label">Coursework: </span>
                  {ed.coursework.join(' · ')}
                </div>
              )}

              {ed.roles?.map(r => (
                <div key={r.title} className="exp-ta-block">
                  <div className="exp-ta-title">{r.title}</div>
                  <ul className="exp-bullets">
                    {r.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              ))}

              {ed.highlights && (
                <div className="exp-highlights">
                  {ed.highlights.map(h => (
                    <span key={h} className="exp-highlight-pill">✦ {h}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* ── Work Experience ────────────────────────────────────── */}
        <section className="exp-section">
          <h2 className="exp-section-label">Work Experience</h2>

          {WORK.map(job => (
            <div key={job.org + job.dates} className="exp-entry work-entry">
              <div className="exp-entry-header">
                <div className="exp-entry-left">
                  <div className="exp-org">{job.org}</div>
                  <div className="exp-role">{job.role}</div>
                </div>
                <div className="exp-entry-right">
                  <div className="exp-location">{job.location}</div>
                  <div className="exp-dates">{job.dates}</div>
                </div>
              </div>
              <ul className="exp-bullets">
                {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>

      </div>

      <button className="sec-back-btn" onClick={onBack}>
        ← Solar System
      </button>
    </div>
  )
}

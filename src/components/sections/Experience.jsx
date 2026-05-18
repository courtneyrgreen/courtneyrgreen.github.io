import { useState, useRef, useCallback } from 'react'
import '../../styles/sections/Experience.css'

const EDU_ENTRIES = [
  {
    id: 'gu', ac: '100,160,240',
    patchName: 'Georgetown',
    tag: 'Education · Georgetown University',
    org: 'Georgetown University',
    sub: 'Graduate School of Arts & Sciences',
    role: 'M.S. Data Science & Analytics',
    dates: '2024 – 2026', location: 'Washington, D.C.',
    gpa: '4.0 / 4.0',
    highlights: [
      { label: 'Georgetown University Merit Scholarship (2025)', desc: 'Competitive merit-based scholarship awarded through anonymous faculty review, recognized for Humanitarian Shield: A Data-Driven Exploration of Humanitarian Aid Worker Vulnerability.' },
      { label: '1st Place · DC Metro StatConnect 2025', desc: 'Graduate Research Poster Competition at George Mason University, MS category, for Data vs. Dogma: Examining the Intersection of Abortion Policy and Maternal Health Disparities in the U.S.' },
    ],
    tas: [
      { course: 'Causal Inference for Computational Social Science', sem: 'Graduate Teaching Assistant · Summer 2025', desc: 'Supported instruction on propensity score matching, synthetic controls, instrumental variables, causal forests, and double-debiased ML. Co-developed labs and final project materials.' },
      { course: 'Probabilistic Modeling & Statistical Computing', sem: 'Graduate Teaching Assistant · Fall 2025', desc: 'Covered probability theory, Monte Carlo simulation, Bayesian models, EM, hidden Markov models, and graphical models. Held office hours and graded in R.' },
    ],
    coursework: ['Probabilistic Modeling & Statistical Computing', 'Neural Networks & Advanced Deep Learning', 'Reinforcement Learning', 'Advanced Data Visualization', 'Statistical Learning for Analysis', 'Database Systems & SQL', 'Big Data & Cloud Computing', 'Machine Learning for App Development', 'Causal Inference for Computational Social Science'],
  },
  {
    id: 'uva', ac: '200,80,60',
    patchName: 'Virginia',
    tag: 'Education · University of Virginia',
    org: 'University of Virginia',
    sub: 'Frank Batten School of Leadership & Public Policy',
    role: 'B.A. Public Policy & Leadership · Minor in CS',
    dates: '2020 – 2024', location: 'Charlottesville, VA',
    highlights: [
      { label: 'University Achievement Award Scholar (2020 – 2024)', desc: 'Merit-based scholarship recognizing academic excellence, leadership, and citizenship; covers full tuition and fees. Awarded to 40–50 students per graduating class.' },
    ],
    coursework: ['Data Structures & Algorithms', 'Discrete Mathematics & Theory', 'Computer Architecture & Systems', 'Software Development', 'Cybersecurity', 'Cybersecurity Policy, Law & Ethics', 'Research Methods & Data Analysis', 'Economics of Public Policy', 'Value & Bias in Public Policy', 'Police-Community Relations', 'National Security in the New Tech Age', 'Designing Human Security Policy'],
  },
]

const WORK_ENTRIES = [
  {
    id: 'ap', ac: '195,90,80', active: true,
    patchName: 'Assoc. Press',
    tag: 'Work · The Associated Press',
    org: 'The Associated Press', sub: 'Remote',
    role: 'Elections Web Scraper',
    dates: 'Oct 2025 – Present',
    bullets: ['Collect and verify live election results for AP across 20+ counties using Python, supporting 6+ elections across 2025–2026.', "Monitor live scrapes in real time on election nights to ensure data accuracy and flag discrepancies, contributing to AP's trusted election coverage."],
    skills: ['Python', 'Web Scraping', 'BeautifulSoup', 'Data Verification', 'Real-Time Monitoring'],
  },
  {
    id: 'pji', ac: '100,140,225',
    patchName: 'GU · PJI',
    tag: 'Work · Georgetown PJI',
    org: 'Georgetown Prisons and Justice Initiative', sub: 'Washington, D.C.',
    role: 'Scholars Program Associate',
    dates: 'Oct 2024 – May 2026',
    bullets: ['Maintained and organized complex data sets related to program operations and performance; conducted data analysis to inform program development and reported key performance metrics to the DC Department of Corrections.', 'Assisted in creating and refining database structures and processes for more effective data collection and visualization, contributing to long-term program sustainability and data-driven decision-making.'],
    skills: ['Data Analysis', 'Database Design', 'Performance Metrics', 'Data Visualization', 'Program Evaluation'],
  },
  {
    id: 'gh', ac: '80,205,100',
    patchName: 'Guidehouse',
    tag: 'Work · Guidehouse',
    org: 'Guidehouse', sub: 'Arlington, VA',
    role: 'Commercial Sustainability Intern',
    dates: 'Jun – Aug 2025',
    bullets: ['Developed and refined an internal scoring tool to evaluate corporate CDP responses; implemented complex formulas and conditional logic to automate scoring, flag data gaps, and generate dashboards for climate disclosure performance assessment.', 'Led the design of an AI-powered Retrofit Portfolio Ranking Engine prototype, applying predictive modeling to help affordable housing agencies prioritize retrofit projects based on emissions impact, deferred maintenance needs, and funding alignment.', 'Supported a 20-year energy demand forecast for NYISO using time series and ensemble models (ARIMA, linear regression, random forest) in R; contributed to model tuning and analysis of demand, wind, and nuclear generation data.', 'Analyzed downscaled climate models (e.g., CMIP6 variants) to assess fitness for localized climate risk forecasting; compared model resolution, variable treatment, and performance across key climate indicators.'],
    skills: ['R', 'ARIMA', 'Random Forest', 'Predictive Modeling', 'CMIP6', 'Excel', 'Power BI', 'CDP', 'Climate Risk'],
  },
  {
    id: 'evgo', ac: '60,195,215',
    patchName: 'EVgo',
    tag: 'Work · EVgo',
    org: 'EVgo', sub: 'Los Angeles, CA',
    role: 'Market Development & Public Policy Intern',
    dates: 'Jun – Aug 2024',
    bullets: ['Researched and analyzed government incentives, including the 30C tax credit and NEVI program funds, to support the development of electric vehicle charging infrastructure.', 'Drafted and optimized data-driven reports, evaluating electricity rate designs and charging infrastructure development.', "Collaborated on cross-functional teams, working closely with software developers, policy experts, and data analysis teams to support infrastructure expansion through the Department of Energy's Title 17 Clean Financing program."],
    skills: ['Policy Research', 'Energy Policy', 'Data Analysis', 'Excel', 'Regulatory Analysis', 'Cross-functional Collaboration'],
  },
  {
    id: 'vox', ac: '80,185,205',
    patchName: 'VOX Global',
    tag: 'Work · VOX Global',
    org: 'VOX Global', sub: 'Washington, D.C.',
    role: 'Public Affairs Intern',
    dates: 'May – Aug 2023',
    bullets: ['Performed comprehensive audits and data collection to inform client reports, using analytical tools like Excel and Tableau to identify trends in corporate social responsibility initiatives.', 'Developed media outreach strategies with team members, managing stakeholder engagement data, and supporting decision-making for Fortune 500 clients.', 'Wrote, edited, and proofread various reports and internal communications, helping streamline client information-sharing processes.'],
    skills: ['Excel', 'Tableau', 'CSR Analysis', 'Media Strategy', 'Stakeholder Engagement', 'Report Writing'],
  },
  {
    id: 'ms', ac: '80,195,95',
    patchName: 'Mindset',
    tag: 'Work · Mindset',
    org: 'Mindset', sub: 'Washington, D.C.',
    role: 'Policy Research Intern',
    dates: 'Jun 2021 – Aug 2022',
    bullets: ['Performed qualitative and quantitative research on cybersecurity and privacy, analyzing policy frameworks and conducting risk assessments to provide actionable recommendations for clients.', 'Tracked legislative trends in cybersecurity and privacy to assess the potential impacts of regulatory changes for clients.', 'Created and regularly maintained an extensive cybersecurity and privacy legislative database of congressional floor activity, the Biden Administration, and independent regulators for clients.'],
    skills: ['Policy Research', 'Cybersecurity Policy', 'Legislative Tracking', 'Risk Assessment', 'Database Management'],
  },
]

function PatchIcon({ id, size = 38 }) {
  const p = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none' }
  switch (id) {
    case 'gu': return (
      <svg {...p}>
        <polygon points="16,6 28,12 16,18 4,12" fill="rgba(100,160,240,0.8)" stroke="rgba(140,190,255,0.6)" strokeWidth="0.8"/>
        <rect x="10" y="17" width="12" height="7" rx="1" fill="rgba(80,130,210,0.7)" stroke="rgba(120,170,240,0.5)" strokeWidth="0.7"/>
        <line x1="25" y1="12" x2="25" y2="20" stroke="rgba(140,190,255,0.6)" strokeWidth="1.2"/>
        <circle cx="25" cy="21" r="1.5" fill="rgba(210,182,88,0.85)"/>
        <line x1="16" y1="18" x2="16" y2="24" stroke="rgba(120,170,240,0.5)" strokeWidth="0.8" strokeDasharray="2 1.5"/>
      </svg>
    )
    case 'uva': return (
      <svg {...p}>
        {/* Dome */}
        <path d="M6,14 Q6,4 16,4 Q26,4 26,14 Z" fill="rgba(200,80,60,0.2)" stroke="rgba(220,110,90,0.75)" strokeWidth="1.1"/>
        {/* Dome oculus window */}
        <circle cx="16" cy="9" r="1.8" fill="none" stroke="rgba(220,110,90,0.55)" strokeWidth="0.7"/>
        {/* Drum */}
        <rect x="10" y="13" width="12" height="3" fill="rgba(200,80,60,0.15)" stroke="rgba(220,110,90,0.45)" strokeWidth="0.7"/>
        {/* Entablature */}
        <rect x="5" y="16" width="22" height="2.5" fill="rgba(200,80,60,0.5)" stroke="rgba(220,110,90,0.5)" strokeWidth="0.6"/>
        {/* 4 columns */}
        <rect x="7"    y="18.5" width="2.5" height="7" rx="0.5" fill="rgba(200,80,60,0.58)"/>
        <rect x="12"   y="18.5" width="2.5" height="7" rx="0.5" fill="rgba(200,80,60,0.58)"/>
        <rect x="17"   y="18.5" width="2.5" height="7" rx="0.5" fill="rgba(200,80,60,0.58)"/>
        <rect x="22"   y="18.5" width="2.5" height="7" rx="0.5" fill="rgba(200,80,60,0.58)"/>
        {/* Steps */}
        <rect x="4" y="25.5" width="24" height="2"   fill="rgba(200,80,60,0.42)" stroke="rgba(220,110,90,0.3)" strokeWidth="0.5"/>
        <rect x="2" y="27.5" width="28" height="2.5" fill="rgba(200,80,60,0.35)" stroke="rgba(220,110,90,0.25)" strokeWidth="0.5"/>
      </svg>
    )
    case 'ap': return (
      <svg {...p}>
        <circle cx="16" cy="16" r="9" stroke="rgba(195,90,80,0.7)" strokeWidth="1.2" fill="rgba(195,90,80,0.08)"/>
        <line x1="7" y1="13" x2="25" y2="13" stroke="rgba(195,90,80,0.4)" strokeWidth="0.8"/>
        <line x1="7" y1="19" x2="25" y2="19" stroke="rgba(195,90,80,0.4)" strokeWidth="0.8"/>
        <path d="M16,7 Q19,16 16,25 Q13,16 16,7" stroke="rgba(195,90,80,0.6)" strokeWidth="1"/>
        <path d="M22,6 Q26,9 26,13" stroke="rgba(210,182,88,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M24,4 Q30,8 30,14" stroke="rgba(210,182,88,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    )
    case 'pji': return (
      <svg {...p}>
        {/* Outer glow ring */}
        <circle cx="16" cy="16" r="12" fill="none" stroke="rgba(100,140,225,0.15)" strokeWidth="0.8"/>
        {/* Radiating light lines */}
        <line x1="16" y1="2"  x2="16" y2="5"  stroke="rgba(100,140,225,0.35)" strokeWidth="0.8"/>
        <line x1="24" y1="4"  x2="22" y2="6"  stroke="rgba(100,140,225,0.28)" strokeWidth="0.8"/>
        <line x1="28" y1="12" x2="25" y2="13" stroke="rgba(100,140,225,0.28)" strokeWidth="0.8"/>
        <line x1="8"  y1="4"  x2="10" y2="6"  stroke="rgba(100,140,225,0.28)" strokeWidth="0.8"/>
        <line x1="4"  y1="12" x2="7"  y2="13" stroke="rgba(100,140,225,0.28)" strokeWidth="0.8"/>
        {/* Head */}
        <circle cx="16" cy="8" r="2.6" fill="rgba(100,140,225,0.75)" stroke="rgba(130,165,245,0.6)" strokeWidth="0.7"/>
        {/* Body */}
        <line x1="16" y1="10.6" x2="16" y2="19" stroke="rgba(100,140,225,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Arms raised in V */}
        <line x1="16" y1="13" x2="9"  y2="9"  stroke="rgba(100,140,225,0.8)" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="16" y1="13" x2="23" y2="9"  stroke="rgba(100,140,225,0.8)" strokeWidth="1.4" strokeLinecap="round"/>
        {/* Legs */}
        <line x1="16" y1="19" x2="12" y2="26" stroke="rgba(100,140,225,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="16" y1="19" x2="20" y2="26" stroke="rgba(100,140,225,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    )
    case 'gh': return (
      <svg {...p}>
        <path d="M16,26 Q7,20 9,11 Q11,4 22,7 Q25,15 16,26Z" fill="rgba(80,205,100,0.25)" stroke="rgba(100,220,120,0.7)" strokeWidth="1.1"/>
        <path d="M16,26 Q14,20 13,14" stroke="rgba(80,205,100,0.5)" strokeWidth="0.9" strokeLinecap="round"/>
        <path d="M13,14 Q17,12 20,10" stroke="rgba(80,205,100,0.35)" strokeWidth="0.7" strokeLinecap="round"/>
        <path d="M13,17 Q16,16 18,14" stroke="rgba(80,205,100,0.3)" strokeWidth="0.7" strokeLinecap="round"/>
        <path d="M14,20 Q16.5,19 18.5,17" stroke="rgba(80,205,100,0.3)" strokeWidth="0.7" strokeLinecap="round"/>
      </svg>
    )
    case 'evgo': return (
      <svg {...p}>
        <polygon points="19,5 10,17 16,17 13,29 22,16 16,16" fill="rgba(60,195,215,0.85)" stroke="rgba(90,220,240,0.7)" strokeWidth="0.8" strokeLinejoin="round"/>
        <circle cx="8" cy="22" r="3" stroke="rgba(60,195,215,0.3)" strokeWidth="0.8"/>
        <circle cx="24" cy="22" r="2.2" stroke="rgba(60,195,215,0.25)" strokeWidth="0.7"/>
      </svg>
    )
    case 'vox': return (
      <svg {...p}>
        <rect x="12" y="5" width="8" height="13" rx="4" fill="rgba(80,185,205,0.35)" stroke="rgba(100,200,220,0.7)" strokeWidth="1"/>
        <path d="M7,17 Q7,26 16,26 Q25,26 25,17" stroke="rgba(80,185,205,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="16" y1="26" x2="16" y2="30" stroke="rgba(80,185,205,0.5)" strokeWidth="1"/>
        <line x1="12" y1="30" x2="20" y2="30" stroke="rgba(80,185,205,0.5)" strokeWidth="1"/>
        <line x1="4" y1="14" x2="7" y2="14" stroke="rgba(80,185,205,0.4)" strokeWidth="0.8"/>
        <line x1="25" y1="14" x2="28" y2="14" stroke="rgba(80,185,205,0.4)" strokeWidth="0.8"/>
      </svg>
    )
    case 'ms': return (
      <svg {...p}>
        <path d="M16,4 L27,9 L27,18 Q27,26 16,30 Q5,26 5,18 L5,9 Z" fill="rgba(80,195,95,0.15)" stroke="rgba(100,215,115,0.65)" strokeWidth="1"/>
        <rect x="12" y="17" width="8" height="7" rx="1.5" fill="rgba(80,195,95,0.5)" stroke="rgba(100,215,115,0.6)" strokeWidth="0.8"/>
        <path d="M13,17 Q13,12 16,12 Q19,12 19,17" stroke="rgba(100,215,115,0.65)" strokeWidth="1"/>
        <circle cx="16" cy="20.5" r="1.2" fill="rgba(100,215,115,0.8)"/>
      </svg>
    )
    default: return null
  }
}

function Detail({ entry }) {
  return (
    <div id="exp-detail" style={{ '--ed-ac': entry.ac }}>

      <div className="ed-header">
        <div className="ed-header-top">
          <div className="ed-badge-circle">
            <PatchIcon id={entry.id} size={34} />
          </div>
          <div>
            <div className="ed-tag">{entry.tag}</div>
            <div className="ed-org">{entry.org}</div>
            {entry.sub && <div className="ed-sub">{entry.sub}</div>}
          </div>
        </div>
        <div className="ed-role">{entry.role}</div>
        <div className={`ed-status ${entry.active ? 'active' : 'complete'}`}>
          {entry.active ? '● Active' : '✓ Complete'}
        </div>
        <div className="ed-meta-row">
          <span>{entry.dates}</span>
          {entry.location && <span>{entry.location}</span>}
          {entry.gpa && <span>GPA {entry.gpa}</span>}
        </div>
      </div>

      {entry.highlights && (
        <div className="ed-section">
          <div className="ed-section-label">Awards</div>
          {entry.highlights.map(h => (
            <div key={h.label} className="ed-highlight">
              <div className="ed-highlight-mark">✦</div>
              <div><strong>{h.label}</strong>{h.desc}</div>
            </div>
          ))}
        </div>
      )}

      {entry.tas && (
        <div className="ed-section">
          <div className="ed-section-label">Teaching</div>
          {entry.tas.map(t => (
            <div key={t.course} className="ed-ta-item">
              <div className="ed-ta-course">{t.course}</div>
              <div className="ed-ta-sem">{t.sem}</div>
              <div className="ed-ta-desc">{t.desc}</div>
            </div>
          ))}
        </div>
      )}

      {entry.bullets && (
        <div className="ed-section">
          <div className="ed-section-label">Responsibilities</div>
          <ul className="ed-bullets">
            {entry.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      )}

      {entry.skills && (
        <div className="ed-section">
          <div className="ed-section-label">Skills & Tools</div>
          <div className="ed-tags">
            {entry.skills.map(s => <span key={s} className="ed-tag-item skill">{s}</span>)}
          </div>
        </div>
      )}

      {entry.coursework && (
        <div className="ed-section">
          <div className="ed-section-label">Relevant Coursework</div>
          <div className="ed-tags">
            {entry.coursework.map(c => <span key={c} className="ed-tag-item">{c}</span>)}
          </div>
        </div>
      )}

    </div>
  )
}

export default function Experience({ onBack }) {
  const [selected, setSelected] = useState(0)
  const allEntries = [...EDU_ENTRIES, ...WORK_ENTRIES]
  const entry = allEntries[selected]
  const circleRefs = useRef([])

  const handlePatchEnter = useCallback((i) => {
    const el = circleRefs.current[i]
    if (!el || el.classList.contains('spinning')) return
    el.classList.add('spinning')
    el.addEventListener('animationend', () => el.classList.remove('spinning'), { once: true })
  }, [])

  return (
    <div id="exp-layer">

      <div id="exp-hdr">
        <div id="exp-eyebrow">Earth &nbsp;·&nbsp; Mission Log</div>
        <h1 id="exp-title">Experience</h1>
      </div>

      <div id="exp-panels">

        <div id="exp-patch-bay">
          <div className="patch-bay-label">Mission Patch Collection</div>
          <div className="patch-grid">
            {allEntries.map((e, i) => (
              <button
                key={e.id}
                className={`patch-btn${selected === i ? ' active' : ''}`}
                style={{ '--pac': e.ac }}
                onClick={() => setSelected(i)}
                onMouseEnter={() => handlePatchEnter(i)}
              >
                <div
                  className="patch-circle"
                  ref={el => { circleRefs.current[i] = el }}
                >
                  <PatchIcon id={e.id} size={38} />
                </div>
                <span className="patch-name-label">{e.patchName}</span>
                <span className="patch-mission-num">M·{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
        </div>

        <Detail key={entry.id} entry={entry} />

      </div>

      <button className="sec-back-btn" onClick={onBack}>← Solar System</button>
    </div>
  )
}

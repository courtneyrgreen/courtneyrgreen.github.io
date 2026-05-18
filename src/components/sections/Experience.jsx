import { useState, useRef, useCallback, useEffect } from 'react'
import '../../styles/sections/Experience.css'

const EDU_ENTRIES = [
  {
    id: 'gu', ac: '100,160,240', tl: '2024–2026',
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
    id: 'uva', ac: '200,80,60', tl: '2020–2024',
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
    id: 'ap', ac: '195,90,80', active: true, tl: '2025–now',
    patchName: 'Assoc. Press',
    tag: 'Work · The Associated Press',
    org: 'The Associated Press', sub: 'Remote',
    role: 'Elections Web Scraper',
    dates: 'Oct 2025 – Present',
    bullets: ['Collect and verify live election results for AP across 20+ counties using Python, supporting 6+ elections across 2025–2026.', "Monitor live scrapes in real time on election nights to ensure data accuracy and flag discrepancies, contributing to AP's trusted election coverage."],
    skills: ['Python', 'Web Scraping', 'BeautifulSoup', 'Data Verification', 'Real-Time Monitoring'],
  },
  {
    id: 'pji', ac: '100,140,225', tl: '2024–2026',
    patchName: 'GU · PJI',
    tag: 'Work · Georgetown PJI',
    org: 'Georgetown Prisons and Justice Initiative', sub: 'Washington, D.C.',
    role: 'Scholars Program Associate',
    dates: 'Oct 2024 – May 2026',
    bullets: ['Maintained and organized complex data sets related to program operations and performance; conducted data analysis to inform program development and reported key performance metrics to the DC Department of Corrections.', 'Assisted in creating and refining database structures and processes for more effective data collection and visualization, contributing to long-term program sustainability and data-driven decision-making.'],
    skills: ['Data Analysis', 'Database Design', 'Performance Metrics', 'Data Visualization', 'Program Evaluation'],
  },
  {
    id: 'gh', ac: '80,205,100', tl: '2025',
    patchName: 'Guidehouse',
    tag: 'Work · Guidehouse',
    org: 'Guidehouse', sub: 'Arlington, VA',
    role: 'Commercial Sustainability Intern',
    dates: 'Jun – Aug 2025',
    bullets: ['Developed and refined an internal scoring tool to evaluate corporate CDP responses; implemented complex formulas and conditional logic to automate scoring, flag data gaps, and generate dashboards for climate disclosure performance assessment.', 'Led the design of an AI-powered Retrofit Portfolio Ranking Engine prototype, applying predictive modeling to help affordable housing agencies prioritize retrofit projects based on emissions impact, deferred maintenance needs, and funding alignment.', 'Supported a 20-year energy demand forecast for NYISO using time series and ensemble models (ARIMA, linear regression, random forest) in R; contributed to model tuning and analysis of demand, wind, and nuclear generation data.', 'Analyzed downscaled climate models (e.g., CMIP6 variants) to assess fitness for localized climate risk forecasting; compared model resolution, variable treatment, and performance across key climate indicators.'],
    skills: ['R', 'ARIMA', 'Random Forest', 'Predictive Modeling', 'CMIP6', 'Excel', 'Power BI', 'CDP', 'Climate Risk'],
  },
  {
    id: 'evgo', ac: '60,195,215', tl: '2024',
    patchName: 'EVgo',
    tag: 'Work · EVgo',
    org: 'EVgo', sub: 'Los Angeles, CA',
    role: 'Market Development & Public Policy Intern',
    dates: 'Jun – Aug 2024',
    bullets: ['Researched and analyzed government incentives, including the 30C tax credit and NEVI program funds, to support the development of electric vehicle charging infrastructure.', 'Drafted and optimized data-driven reports, evaluating electricity rate designs and charging infrastructure development.', "Collaborated on cross-functional teams, working closely with software developers, policy experts, and data analysis teams to support infrastructure expansion through the Department of Energy's Title 17 Clean Financing program."],
    skills: ['Policy Research', 'Energy Policy', 'Data Analysis', 'Excel', 'Regulatory Analysis', 'Cross-functional Collaboration'],
  },
  {
    id: 'vox', ac: '80,185,205', tl: '2023',
    patchName: 'VOX Global',
    tag: 'Work · VOX Global',
    org: 'VOX Global', sub: 'Washington, D.C.',
    role: 'Public Affairs Intern',
    dates: 'May – Aug 2023',
    bullets: ['Performed comprehensive audits and data collection to inform client reports, using analytical tools like Excel and Tableau to identify trends in corporate social responsibility initiatives.', 'Developed media outreach strategies with team members, managing stakeholder engagement data, and supporting decision-making for Fortune 500 clients.', 'Wrote, edited, and proofread various reports and internal communications, helping streamline client information-sharing processes.'],
    skills: ['Excel', 'Tableau', 'CSR Analysis', 'Media Strategy', 'Stakeholder Engagement', 'Report Writing'],
  },
  {
    id: 'ms', ac: '80,195,95', tl: '2021–2022',
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
        {/* Cap board — wide diamond */}
        <polygon points="16,4 30,11 16,18 2,11"
          fill="rgba(100,160,240,0.68)" stroke="rgba(150,195,255,0.7)" strokeWidth="0.9" strokeLinejoin="round"/>
        {/* Crown — trapezoid visible below board */}
        <path d="M11,11 L21,11 L20,18 L12,18 Z"
          fill="rgba(55,105,195,0.6)" stroke="rgba(110,165,240,0.3)" strokeWidth="0.5"/>
        {/* Board top-right edge highlight */}
        <line x1="16" y1="4" x2="30" y2="11" stroke="rgba(190,220,255,0.4)" strokeWidth="0.5"/>
        {/* Center button */}
        <circle cx="16" cy="11" r="2" fill="rgba(210,182,88,0.92)" stroke="rgba(235,205,110,0.45)" strokeWidth="0.4"/>
        {/* Tassel cord */}
        <line x1="16" y1="11" x2="24" y2="11" stroke="rgba(210,182,88,0.58)" strokeWidth="0.9"/>
        <line x1="24" y1="11" x2="24" y2="20" stroke="rgba(210,182,88,0.58)" strokeWidth="0.9"/>
        {/* Tassel strands */}
        <line x1="22" y1="20" x2="21.5" y2="25" stroke="rgba(210,182,88,0.5)" strokeWidth="0.8"/>
        <line x1="24" y1="20" x2="24"   y2="25" stroke="rgba(210,182,88,0.5)" strokeWidth="0.8"/>
        <line x1="26" y1="20" x2="26.5" y2="25" stroke="rgba(210,182,88,0.5)" strokeWidth="0.8"/>
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
        {/* Paper body */}
        <rect x="4" y="3" width="24" height="28" rx="1.5" fill="rgba(195,90,80,0.1)" stroke="rgba(220,110,90,0.68)" strokeWidth="1.1"/>
        {/* Masthead band */}
        <rect x="4" y="3" width="24" height="8.5" rx="1.5" fill="rgba(195,90,80,0.55)"/>
        <rect x="4" y="8" width="24" height="3.5" fill="rgba(195,90,80,0.55)"/>
        {/* Masthead label bar */}
        <rect x="7" y="5" width="18" height="4" rx="0.5" fill="rgba(240,200,190,0.45)"/>
        {/* Divider rule */}
        <line x1="6" y1="13.5" x2="26" y2="13.5" stroke="rgba(220,110,90,0.35)" strokeWidth="0.7"/>
        {/* Bold headline */}
        <rect x="7" y="15.5" width="18" height="2.5" rx="0.4" fill="rgba(195,90,80,0.62)"/>
        {/* Column divider */}
        <line x1="16" y1="19.5" x2="16" y2="28" stroke="rgba(220,110,90,0.2)" strokeWidth="0.6"/>
        {/* Left column lines */}
        <rect x="7"    y="20"   width="7.5" height="1.2" rx="0.3" fill="rgba(195,90,80,0.32)"/>
        <rect x="7"    y="22.5" width="7.5" height="1.2" rx="0.3" fill="rgba(195,90,80,0.32)"/>
        <rect x="7"    y="25"   width="5"   height="1.2" rx="0.3" fill="rgba(195,90,80,0.32)"/>
        {/* Right column lines */}
        <rect x="17.5" y="20"   width="7.5" height="1.2" rx="0.3" fill="rgba(195,90,80,0.32)"/>
        <rect x="17.5" y="22.5" width="7.5" height="1.2" rx="0.3" fill="rgba(195,90,80,0.32)"/>
        <rect x="17.5" y="25"   width="5"   height="1.2" rx="0.3" fill="rgba(195,90,80,0.32)"/>
      </svg>
    )
    case 'pji': return (
      <svg {...p}>
        {/* Base */}
        <rect x="13" y="27" width="6" height="1.5" rx="0.75" fill="rgba(100,140,225,0.55)"/>
        {/* Pole */}
        <line x1="16" y1="8" x2="16" y2="28" stroke="rgba(100,140,225,0.62)" strokeWidth="1.4" strokeLinecap="round"/>
        {/* Top ornament */}
        <circle cx="16" cy="7.5" r="1.6" fill="rgba(100,140,225,0.78)" stroke="rgba(140,175,255,0.55)" strokeWidth="0.5"/>
        {/* Beam */}
        <line x1="5" y1="12" x2="27" y2="12" stroke="rgba(130,165,245,0.78)" strokeWidth="1.3" strokeLinecap="round"/>
        {/* Left chain */}
        <line x1="6" y1="12" x2="6" y2="21" stroke="rgba(100,140,225,0.45)" strokeWidth="0.85"/>
        {/* Right chain */}
        <line x1="26" y1="12" x2="26" y2="21" stroke="rgba(100,140,225,0.45)" strokeWidth="0.85"/>
        {/* Left pan */}
        <path d="M3,21 Q6,25.5 9,21" fill="rgba(100,140,225,0.1)" stroke="rgba(110,155,235,0.72)" strokeWidth="1.1" strokeLinecap="round"/>
        {/* Right pan */}
        <path d="M23,21 Q26,25.5 29,21" fill="rgba(100,140,225,0.1)" stroke="rgba(110,155,235,0.72)" strokeWidth="1.1" strokeLinecap="round"/>
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
        {entry.active && <div className="ed-status active">● Active</div>}
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
  const [selected, setSelected] = useState(null)
  const allEntries = [
    WORK_ENTRIES.find(e => e.id === 'ap'),
    EDU_ENTRIES.find(e => e.id === 'gu'),
    WORK_ENTRIES.find(e => e.id === 'pji'),
    WORK_ENTRIES.find(e => e.id === 'gh'),
    EDU_ENTRIES.find(e => e.id === 'uva'),
    WORK_ENTRIES.find(e => e.id === 'evgo'),
    WORK_ENTRIES.find(e => e.id === 'vox'),
    WORK_ENTRIES.find(e => e.id === 'ms'),
  ]
  const entry = selected !== null ? allEntries[selected] : null
  const circleRefs = useRef([])

  const handlePatchEnter = useCallback((i) => {
    const el = circleRefs.current[i]
    if (!el || el.classList.contains('spinning')) return
    el.classList.add('spinning')
    el.addEventListener('animationend', () => el.classList.remove('spinning'), { once: true })
  }, [])

  const closeModal = useCallback(() => setSelected(null), [])

  useEffect(() => {
    if (selected === null) return
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <div id="exp-layer">

      <div id="exp-hdr">
        <div id="exp-eyebrow">Mission Patch Collection</div>
        <h1 id="exp-title">Experience</h1>
      </div>

      <div id="exp-patch-area">
        <div className="patch-bay-label">Select a mission patch</div>
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
                <PatchIcon id={e.id} size={46} />
              </div>
              <span className="patch-name-label">{e.patchName}</span>
              <span className="patch-mission-num">M·{String(i + 1).padStart(2, '0')}</span>
              <span className="patch-tl-date">{e.tl}</span>
            </button>
          ))}
        </div>
      </div>

      {selected !== null && entry && (
        <div id="exp-modal-overlay" onClick={closeModal}>
          <div id="exp-modal-box" style={{ '--ed-ac': entry.ac }} onClick={e => e.stopPropagation()}>
            <button id="exp-modal-close" onClick={closeModal}>✕</button>
            <Detail key={entry.id} entry={entry} />
          </div>
        </div>
      )}

      <button className="sec-back-btn" onClick={onBack}>← Solar System</button>
    </div>
  )
}

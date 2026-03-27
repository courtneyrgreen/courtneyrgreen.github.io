import { useState, useEffect, useRef } from 'react'
import '../../styles/sections/Experience.css'

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
          {
            course: 'Causal Inference for Computational Social Science',
            semester: 'Summer 2025',
            desc: 'Supported instruction on propensity score matching, synthetic controls, instrumental variables, causal forests, and double-debiased ML. Co-developed labs and final project materials.',
          },
          {
            course: 'Probabilistic Modeling & Statistical Computing',
            semester: 'Fall 2025',
            desc: 'Covered probability theory, Monte Carlo simulation, Bayesian models, EM, hidden Markov models, and graphical models. Held office hours and graded in R.',
          },
        ],
      },
    ],
    highlights: [
      {
        label: 'Georgetown University Merit Scholarship Recipient (2025)',
        desc: 'Competitive merit-based scholarship awarded through anonymous faculty review, recognized for Humanitarian Shield: A Data-Driven Exploration of Humanitarian Aid Worker Vulnerability.',
      },
      {
        label: 'First Place · DC Metro StatConnect 2025 Graduate Research Poster Competition',
        desc: 'Awarded 1st place in the MS category at George Mason University, recognized for Data vs. Dogma: Examining the Intersection of Abortion Policy and Maternal Health Disparities in the U.S.',
      },
    ],
  },
  {
    school: 'University of Virginia',
    sub: 'Frank Batten School of Leadership and Public Policy',
    location: 'Charlottesville, VA',
    dates: '2020 – 2024',
    degree: 'B.A. Public Policy and Leadership · Minor in Computer Science',
    coursework: [
      'Data Structures & Algorithms',
      'Discrete Mathematics & Theory',
      'Computer Architecture & Systems',
      'Software Development',
      'Cybersecurity',
      'Cybersecurity Policy, Law & Ethics',
      'Research Methods & Data Analysis',
      'Economics of Public Policy',
      'Value & Bias in Public Policy',
      'Police-Community Relations',
      'National Security in the New Tech Age',
      'Designing Human Security Policy',
    ],
    highlights: [
      {
        label: 'University Achievement Award Scholar (2020 – 2024)',
        desc: 'Merit-based scholarship recognizing academic excellence, leadership, and citizenship; covers full tuition and fees. Awarded to 40–50 students per graduating class.',
      },
    ],
  },
]

const WORK = [
  {
    org: 'The Associated Press',
    location: 'Remote',
    dates: 'Oct 2025 – Present',
    role: 'Elections Web Scraper',
    bullets: [
      'Collect and verify live election results for AP across 20+ counties using Python, supporting 6+ elections across 2025–2026.',
      'Monitor live scrapes in real time on election nights to ensure data accuracy and flag discrepancies, contributing to AP\'s trusted election coverage.',
    ],
    skills: ['Python', 'Web Scraping', 'BeautifulSoup', 'Data Verification', 'Real-Time Monitoring'],
  },
  {
    org: 'Georgetown Prisons and Justice Initiative',
    location: 'Washington, D.C.',
    dates: 'Oct 2024 – May 2026',
    role: 'Scholars Program Associate',
    bullets: [
      'Maintained and organized complex data sets related to program operations and performance; conducted data analysis to inform program development and reported key performance metrics to the DC Department of Corrections (DOC).',
      'Assisted in creating and refining database structures and processes for more effective data collection and visualization, contributing to long-term program sustainability and data-driven decision-making.',
    ],
    skills: ['Data Analysis', 'Database Design', 'Performance Metrics', 'Data Visualization', 'Program Evaluation'],
  },
  {
    org: 'Guidehouse',
    location: 'Arlington, VA',
    dates: 'Jun – Aug 2025',
    role: 'Commercial Sustainability Intern',
    bullets: [
      'Developed and refined an internal scoring tool to evaluate corporate CDP (Carbon Disclosure Project) responses; implemented complex formulas and conditional logic to automate scoring, flag data gaps, and generate dashboards for climate disclosure performance assessment.',
      'Led the design of an AI-powered Retrofit Portfolio Ranking Engine prototype, applying predictive modeling to help affordable housing agencies prioritize retrofit projects based on emissions impact, deferred maintenance needs, and funding alignment.',
      'Supported a 20-year energy demand forecast for NYISO using time series and ensemble models (ARIMA, linear regression, random forest) in R; contributed to model tuning and analysis of demand, wind, and nuclear generation data.',
      'Analyzed downscaled climate models (e.g., CMIP6 variants) to assess fitness for localized climate risk forecasting; compared model resolution, variable treatment, and performance across key climate indicators.',
    ],
    skills: ['R', 'ARIMA', 'Random Forest', 'Predictive Modeling', 'CMIP6', 'Excel', 'Power BI', 'CDP', 'Climate Risk'],
  },
  {
    org: 'EVgo',
    location: 'Los Angeles, CA',
    dates: 'Jun – Aug 2024',
    role: 'Market Development & Public Policy Intern',
    bullets: [
      'Researched and analyzed government incentives, including the 30C tax credit and NEVI program funds, to support the development of electric vehicle charging infrastructure.',
      'Drafted and optimized data-driven reports, evaluating electricity rate designs and charging infrastructure development.',
      'Collaborated on cross-functional teams, working closely with software developers, policy experts, and data analysis teams to support infrastructure expansion through the Department of Energy\'s Title 17 Clean Financing program.',
    ],
    skills: ['Policy Research', 'Energy Policy', 'Data Analysis', 'Excel', 'Regulatory Analysis', 'Cross-functional Collaboration'],
  },
  {
    org: 'VOX Global',
    location: 'Washington, D.C.',
    dates: 'May – Aug 2023',
    role: 'Public Affairs Intern',
    bullets: [
      'Performed comprehensive audits and data collection to inform client reports, using analytical tools like Excel and Tableau to identify trends in corporate social responsibility (CSR) initiatives.',
      'Developed media outreach strategies with team members, managing stakeholder engagement data, and supporting decision-making for Fortune 500 clients.',
      'Wrote, edited, and proofread various reports and internal communications, helping streamline client information-sharing processes.',
    ],
    skills: ['Excel', 'Tableau', 'CSR Analysis', 'Media Strategy', 'Stakeholder Engagement', 'Report Writing'],
  },
  {
    org: 'Mindset',
    location: 'Washington, D.C.',
    dates: 'Jun 2021 – Aug 2022',
    role: 'Policy Research Intern',
    bullets: [
      'Performed qualitative and quantitative research on cybersecurity and privacy, analyzing policy frameworks and conducting risk assessments to provide actionable recommendations for clients.',
      'Tracked legislative trends in cybersecurity and privacy to assess the potential impacts of regulatory changes for clients.',
      'Created and regularly maintained an extensive cybersecurity and privacy legislative database of congressional floor activity, the Biden Administration, and independent regulators for clients.',
    ],
    skills: ['Policy Research', 'Cybersecurity Policy', 'Legislative Tracking', 'Risk Assessment', 'Database Management'],
  },
]

// logo: swap null → import path once images are uploaded
const EDU_ENTRIES = [
  {
    id: 'gu', tag: 'EDU',
    org: 'Georgetown University', sub: 'Graduate School of Arts & Sciences',
    location: 'Washington, D.C.', role: 'M.S. Data Science & Analytics',
    dates: '2024 – 2026', gpa: '4.0 / 4.0',
    logo: null, logoColor: '#041E42', initials: 'GU',
    coursework: EDUCATION[0].coursework,
    roles: EDUCATION[0].roles,
    highlights: EDUCATION[0].highlights,
  },
  {
    id: 'uva', tag: 'EDU',
    org: 'University of Virginia', sub: 'Frank Batten School of Leadership & Public Policy',
    location: 'Charlottesville, VA', role: 'B.A. Public Policy & Leadership · Minor in CS',
    dates: '2020 – 2024',
    logo: null, logoColor: '#232D4B', initials: 'UVA', initialsColor: '#E57200',
    coursework: EDUCATION[1].coursework,
    highlights: EDUCATION[1].highlights,
  },
]

const WORK_ENTRIES = [
  {
    id: 'ap', tag: 'WORK',
    org: 'The Associated Press', sub: 'Remote',
    role: 'Elections Web Scraper',
    dates: 'October 2025 – Present', shortDates: 'Oct 2025 – Present',
    logo: null, logoColor: '#f5f5f5', initials: 'AP', initialsColor: '#1a1a1a',
    bullets: WORK[0].bullets, skills: WORK[0].skills,
  },
  {
    id: 'pji', tag: 'WORK',
    org: 'Georgetown Prisons and Justice Initiative', sub: 'Washington, D.C.',
    role: 'Scholars Program Associate',
    dates: 'October 2024 – May 2026', shortDates: 'Oct 2024 – May 2026',
    logo: null, logoColor: '#041E42', initials: 'PJI',
    bullets: WORK[1].bullets, skills: WORK[1].skills,
  },
  {
    id: 'gh', tag: 'WORK',
    org: 'Guidehouse', sub: 'Arlington, VA',
    role: 'Commercial Sustainability Intern',
    dates: 'June – August 2025', shortDates: 'Jun – Aug 2025',
    logo: null, logoColor: '#1a1a1a', initials: 'GH', initialsColor: '#6CC24A',
    bullets: WORK[2].bullets, skills: WORK[2].skills,
  },
  {
    id: 'evgo', tag: 'WORK',
    org: 'EVgo', sub: 'Los Angeles, CA',
    role: 'Market Development & Public Policy Intern',
    dates: 'June – August 2024', shortDates: 'Jun – Aug 2024',
    logo: null, logoColor: '#1E7A9C', initials: 'EV',
    bullets: WORK[3].bullets, skills: WORK[3].skills,
  },
  {
    id: 'vox', tag: 'WORK',
    org: 'VOX Global', sub: 'Washington, D.C.',
    role: 'Public Affairs Intern',
    dates: 'May – August 2023', shortDates: 'May – Aug 2023',
    logo: null, logoColor: '#0A1628', initials: 'VX', initialsColor: '#3EC6C6',
    bullets: WORK[4].bullets, skills: WORK[4].skills,
  },
  {
    id: 'mindset', tag: 'WORK',
    org: 'Mindset', sub: 'Washington, D.C.',
    role: 'Policy Research Intern',
    dates: 'June 2021 – August 2022', shortDates: 'Jun 2021 – Aug 2022',
    logo: null, logoColor: '#12B035', initials: 'MS',
    bullets: WORK[5].bullets, skills: WORK[5].skills,
  },
]

const ALL_ENTRIES = [...EDU_ENTRIES, ...WORK_ENTRIES]

// ── Logo placeholder ──────────────────────────────────────────────
function OrgLogo({ entry, size = 36 }) {
  if (entry.logo) {
    return (
      <img
        src={entry.logo}
        alt={entry.org}
        className="exp-logo-img"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <div
      className="exp-logo-placeholder"
      style={{
        width: size, height: size,
        background: entry.logoColor,
        color: entry.initialsColor || 'rgba(255,255,255,0.80)',
      }}
    >
      {entry.initials}
    </div>
  )
}

// ── Shared detail body ────────────────────────────────────────────
function EntryDetail({ e }) {
  const [hoveredPill, setHoveredPill] = useState(null)

  return (
    <>
      {e.gpa && <div className="exp-gpa">GPA: {e.gpa}</div>}
      {e.coursework && (
        <div className="exp-tag-section">
          <div className="exp-cw-label">Relevant Coursework</div>
          <div className="exp-tag-cloud">
            {e.coursework.map(c => <span key={c} className="exp-cw-tag">{c}</span>)}
          </div>
        </div>
      )}
      {e.activities && (
        <div className="exp-tag-section">
          <div className="exp-cw-label">Activities</div>
          <div className="exp-tag-cloud">
            {e.activities.map(a => <span key={a} className="exp-cw-tag">{a}</span>)}
          </div>
        </div>
      )}
      {e.roles?.map(r => (
        <div key={r.title} className="exp-ta-block">
          <div className="exp-ta-title">{r.title}</div>
          <div className="exp-ta-items">
            {r.items.map((item, i) => (
              <div key={i} className="exp-ta-item">
                <div className="exp-ta-item-header">
                  <span className="exp-ta-course">{item.course}</span>
                  <span className="exp-ta-semester">{item.semester}</span>
                </div>
                <p className="exp-ta-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      {e.bullets && (
        <ul className="exp-bullets" style={{ marginTop: 12 }}>
          {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
      {e.skills && (
        <div className="exp-tag-section" style={{ marginTop: 16 }}>
          <div className="exp-cw-label">Skills & Tools</div>
          <div className="exp-tag-cloud">
            {e.skills.map(s => <span key={s} className="exp-cw-tag exp-skill-tag">{s}</span>)}
          </div>
        </div>
      )}
      {e.highlights && (
        <div className="exp-highlights">
          {e.highlights.map((h, i) => (
            <div
              key={h.label}
              className="exp-highlight-wrap"
              onMouseEnter={() => setHoveredPill(i)}
              onMouseLeave={() => setHoveredPill(null)}
            >
              <span className={`exp-highlight-pill${h.desc ? ' has-desc' : ''}`}>
                ✦ {h.label}
              </span>
              {h.desc && hoveredPill === i && (
                <div className="exp-highlight-tooltip">{h.desc}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

// ── Explorer ──────────────────────────────────────────────────────
function PanelView() {
  const [selected, setSelected] = useState(0)
  const e = ALL_ENTRIES[selected]

  const renderListItem = (entry, i) => (
    <button
      key={entry.id}
      className={`exp-panel-item${selected === i ? ' active' : ''}`}
      onClick={() => setSelected(i)}
    >
      <OrgLogo entry={entry} size={32} />
      <div className="exp-panel-item-text">
        <div className="exp-panel-org">{entry.org}</div>
        <div className="exp-panel-role">{entry.role}</div>
        <div className="exp-panel-dates">{entry.shortDates || entry.dates}</div>
      </div>
    </button>
  )

  return (
    <div id="exp-panel-wrap">
      {/* Left list with sections */}
      <div id="exp-panel-list">
        <div className="exp-panel-section-hd">Education</div>
        {EDU_ENTRIES.map((e, i) => renderListItem(e, i))}
        <div className="exp-panel-section-hd">Work Experience</div>
        {WORK_ENTRIES.map((e, i) => renderListItem(e, EDU_ENTRIES.length + i))}
      </div>

      {/* Right detail */}
      <div id="exp-panel-detail">
        <div className="exp-pd-header">
          <div className="exp-pd-logo-row">
            <OrgLogo entry={e} size={60} />
            <div>
              <div className="exp-org">{e.org}</div>
              {e.sub && <div className="exp-sub">{e.sub}</div>}
              <div className="exp-role" style={{ marginTop: 6 }}>{e.role}</div>
            </div>
          </div>
          <div className="exp-pd-meta">
            <div className="exp-dates">{e.dates}</div>
            {e.location && <div className="exp-location">{e.location}</div>}
          </div>
        </div>
        <div className="exp-pd-body">
          <EntryDetail e={e} />
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────
export default function Experience({ onBack }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => cardRef.current?.classList.add('visible'), 120)
    return () => { clearTimeout(t); cardRef.current?.classList.remove('visible') }
  }, [])

  return (
    <div id="exp-layer">
      <div id="exp-glow" />
      <div id="exp-card" ref={cardRef}>

        <div id="exp-eyebrow">Earth &nbsp;·&nbsp; Mission Log</div>
        <h1 id="exp-title">Experience</h1>
        <div id="exp-rule" />

        <PanelView />

      </div>

      <button className="sec-back-btn" onClick={onBack}>
        ← Solar System
      </button>
    </div>
  )
}

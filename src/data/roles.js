/*
  roles.js — Work experience entries for the Orrery (Experience section).

  Each role is displayed as an orbital ring in the animated orrery diagram.
  Clicking a ring reveals the role card in the center.

  Fields:
    role   — job title
    org    — organisation name
    dates  — date range as display string
    desc   — short description shown in the center card
    r      — normalised orbit radius (0–1), innermost = smallest r
    color  — ring / active highlight colour (rgba string)
    speed  — orbital marker speed in radians per millisecond
*/

export const ROLES = [
  {
    role: 'Senior Data Scientist',
    org: 'Meridian Analytics',
    dates: '2022 – Present',
    desc: 'Lead modeling for a team of six across financial services clients. Full lifecycle from problem framing to production deployment.',
    r: 0.72,
    color: 'rgba(255,215,0,0.95)',
    speed: 0.00022,
  },
  {
    role: 'Data Scientist',
    org: 'Federal Reserve Board',
    dates: '2020 – 2022',
    desc: 'Macroeconomic forecasting models and NLP pipelines for regulatory text analysis. Collaborated directly with economists and policy researchers.',
    r: 0.56,
    color: 'rgba(0,200,255,0.92)',
    speed: 0.00034,
  },
  {
    role: 'Research Analyst',
    org: 'Georgetown University',
    dates: '2018 – 2020',
    desc: 'Applied causal inference to public health datasets. Co-authored two peer-reviewed papers on health outcome disparities.',
    r: 0.40,
    color: 'rgba(0,255,136,0.90)',
    speed: 0.00050,
  },
  {
    role: 'M.S. Statistics',
    org: 'Georgetown University',
    dates: '2016 – 2018',
    desc: 'Thesis on Bayesian non-parametric methods for survival analysis.',
    r: 0.26,
    color: 'rgba(200,80,255,0.88)',
    speed: 0.00072,
  },
]

/*
  resume.js — CV content for the Transmission (Resume section).

  Each line is revealed one-by-one with a typewriter-style animation,
  simulating an incoming data transmission.

  Line types:
    'head'    — large header line (title of the "transmission")
    'section' — section heading (e.g. // IDENTITY)
    'dim'     — muted supplemental detail line
    ''        — standard text line (empty string = blank spacer line)
*/

export const TX_LINES = [
  { t: 'head',    text: 'INCOMING TRANSMISSION — CV_COURTNEY_GREEN.DAT' },
  { t: 'dim',     text: 'Encoding: UTF-8  ·  Signal: strong  ·  Origin: Washington, D.C.' },
  { t: '',        text: '' },

  { t: 'section', text: '// IDENTITY' },
  { t: '',        text: 'Name         Courtney Green' },
  { t: '',        text: 'Title        Senior Data Scientist' },
  { t: '',        text: 'Location     Washington, D.C.' },
  { t: '',        text: 'Contact      courtney@example.com' },
  { t: '',        text: '' },

  { t: 'section', text: '// EDUCATION' },
  { t: '',        text: 'M.S. Statistics     Georgetown University     2018' },
  { t: 'dim',     text: 'Bayesian non-parametric methods · survival analysis' },
  { t: '',        text: 'B.S. Mathematics    Howard University         2016' },
  { t: '',        text: '' },

  { t: 'section', text: '// EXPERIENCE' },
  { t: '',        text: '2022–Present   Senior Data Scientist   Meridian Analytics' },
  { t: 'dim',     text: 'Lead modeling for financial services · full lifecycle ownership' },
  { t: '',        text: '2020–2022      Data Scientist          Federal Reserve Board' },
  { t: 'dim',     text: 'Macroeconomic forecasting · NLP for regulatory text' },
  { t: '',        text: '2018–2020      Research Analyst        Georgetown University' },
  { t: 'dim',     text: 'Causal inference · public health · peer-reviewed publications' },
  { t: '',        text: '' },

  { t: 'section', text: '// COMPETENCIES' },
  { t: '',        text: 'Machine Learning · Statistical Modeling · Causal Inference' },
  { t: '',        text: 'NLP · Data Engineering · Visualization · Communication' },
  { t: '',        text: '' },

  { t: 'section', text: '// TECHNICAL STACK' },
  { t: '',        text: 'Python · R · SQL · PyTorch · TensorFlow · Stan' },
  { t: '',        text: 'Spark · dbt · Airflow · FastAPI · AWS · GCP' },
  { t: '',        text: '' },

  { t: 'section', text: '// PUBLICATIONS' },
  { t: '',        text: 'Green, C. et al. (2023). Racial Disparities in Maternal Mortality.' },
  { t: 'dim',     text: 'Journal of Public Health Policy' },
  { t: '',        text: 'Green, C. et al. (2020). Structural Barriers to Voter Participation.' },
  { t: 'dim',     text: 'Political Analysis' },
  { t: '',        text: '' },

  { t: 'dim',     text: '——— END OF TRANSMISSION ———' },
]

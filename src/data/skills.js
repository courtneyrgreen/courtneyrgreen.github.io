/*
  skills.js — Skill groups displayed in the Spectrograph (Skills section).

  Each group renders as a coloured band of vertical bars in the spectrum.
  Individual skills appear on hover.

  Fields (group):
    label  — group category name shown below the spectrum
    color  — rgba prefix (without alpha) used for all bars in this group
    skills — array of individual skills

  Fields (skill):
    name   — display name, shown in the tooltip on hover
    level  — proficiency 0–1, controls bar height
*/

export const SKILL_GROUPS = [
  {
    label: 'Machine Learning',
    color: 'rgba(170,175,210,',
    skills: [
      { name: 'Supervised Learning',    level: 0.95 },
      { name: 'Neural Networks',        level: 0.88 },
      { name: 'Ensemble Methods',       level: 0.92 },
      { name: 'XGBoost',                level: 0.90 },
      { name: 'Model Interpretability', level: 0.85 },
      { name: 'Hyperparameter Opt.',    level: 0.80 },
    ],
  },
  {
    label: 'Statistics',
    color: 'rgba(175,200,185,',
    skills: [
      { name: 'Bayesian Inference',   level: 0.94 },
      { name: 'Causal Inference',     level: 0.92 },
      { name: 'Time Series',          level: 0.88 },
      { name: 'Survival Analysis',    level: 0.82 },
      { name: 'A/B Testing',          level: 0.86 },
      { name: 'Hierarchical Models',  level: 0.89 },
    ],
  },
  {
    label: 'NLP',
    color: 'rgba(200,185,165,',
    skills: [
      { name: 'Transformers',        level: 0.85 },
      { name: 'Named Entity Rec.',   level: 0.82 },
      { name: 'Topic Modeling',      level: 0.80 },
      { name: 'Semantic Search',     level: 0.88 },
      { name: 'Text Classification', level: 0.84 },
    ],
  },
  {
    label: 'Engineering',
    color: 'rgba(165,185,205,',
    skills: [
      { name: 'Python',   level: 0.96 },
      { name: 'R',        level: 0.93 },
      { name: 'SQL',      level: 0.90 },
      { name: 'Spark',    level: 0.78 },
      { name: 'dbt',      level: 0.75 },
      { name: 'Airflow',  level: 0.72 },
      { name: 'FastAPI',  level: 0.80 },
      { name: 'Docker',   level: 0.76 },
    ],
  },
  {
    label: 'Communication',
    color: 'rgba(195,180,210,',
    skills: [
      { name: 'Data Storytelling',  level: 0.92 },
      { name: 'Technical Writing',  level: 0.88 },
      { name: 'Exec Presentations', level: 0.85 },
      { name: 'Stakeholder Mgmt',   level: 0.82 },
    ],
  },
]

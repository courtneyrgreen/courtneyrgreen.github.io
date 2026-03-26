/*
  skills.js — Skill categories for the tag-cloud Skills section.

  Each group has:
    label  — category name shown in the legend
    rgb    — raw "r,g,b" string used with rgba() in CSS custom properties
    skills — array of skill items

  Each skill item:
    name   — display name on the badge
    subs   — (optional) array of sub-skills shown in a popover on click
*/

export const SKILL_GROUPS = [
  {
    label: 'Programming',
    rgb: '140,130,225',
    skills: [
      { name: 'Python' },
      { name: 'R' },
      { name: 'SQL' },
      { name: 'SAS' },
      { name: 'SPSS' },
      { name: 'HTML / CSS' },
    ],
  },
  {
    label: 'Machine Learning',
    rgb: '85,155,230',
    skills: [
      { name: 'Supervised Learning',   subs: ['Classification', 'Regression', 'XGBoost', 'Random Forest', 'Ensemble Methods'] },
      { name: 'Unsupervised Learning', subs: ['K-means', 'PCA', 't-SNE', 'DBSCAN', 'Hierarchical Clustering'] },
      { name: 'Neural Networks',       subs: ['Deep Learning', 'Transfer Learning', 'Embeddings'] },
      { name: 'NLP',                   subs: ['Transformers', 'Named Entity Rec.', 'Topic Modeling', 'Text Classification', 'Semantic Search'] },
      { name: 'Model Interpretability',subs: ['SHAP', 'Feature Importance', 'Partial Dependence'] },
      { name: 'Hyperparameter Tuning' },
    ],
  },
  {
    label: 'Statistics',
    rgb: '115,195,160',
    skills: [
      { name: 'Bayesian Inference' },
      { name: 'Causal Inference' },
      { name: 'Survival Analysis' },
      { name: 'Time Series Analysis' },
      { name: 'A/B Testing' },
      { name: 'Hierarchical Models' },
    ],
  },
  {
    label: 'Data Engineering',
    rgb: '220,175,100',
    skills: [
      { name: 'ETL Pipelines' },
      { name: 'Database Design' },
      { name: 'Apache Spark' },
      { name: 'dbt' },
      { name: 'Airflow' },
      { name: 'FastAPI' },
      { name: 'Docker' },
    ],
  },
  {
    label: 'Cloud & Tools',
    rgb: '215,125,120',
    skills: [
      { name: 'AWS' },
      { name: 'Azure' },
      { name: 'Hadoop' },
      { name: 'LangChain' },
      { name: 'LangGraph' },
      { name: 'Git / GitHub' },
    ],
  },
  {
    label: 'Visualization & BI',
    rgb: '185,150,215',
    skills: [
      { name: 'Tableau' },
      { name: 'Power BI' },
      { name: 'ggplot2' },
      { name: 'Plotly' },
      { name: 'Matplotlib' },
      { name: 'Seaborn' },
    ],
  },
]

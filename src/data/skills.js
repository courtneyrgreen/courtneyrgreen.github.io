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
    rgb: '192,172,95',  /* Jupiter gold — carousel entry planet */
    skills: [
      {
        name: 'Python',
        subs: ['BeautifulSoup', 'FAISS', 'FastAPI', 'Keras', 'Matplotlib', 'NumPy', 'Pandas', 'PyTorch', 'Requests', 'Scikit-learn', 'Seaborn', 'Streamlit', 'TensorFlow'],
      },
      {
        name: 'R',
        subs: ['ggplot2', 'dplyr', 'tidyr', 'caret', 'forecast', 'lme4', 'survival'],
      },
      { name: 'SQL' },
      { name: 'Java' },
      { name: 'JavaScript' },
      { name: 'React' },
      { name: 'HTML / CSS' },
    ],
  },
  {
    label: 'Machine Learning',
    rgb: '55,82,152',  /* Earth — deep cobalt blue */
    skills: [
      { name: 'Supervised Learning',    subs: ['Classification', 'Regression', 'XGBoost', 'Random Forest', 'Ensemble Methods', 'Feature Engineering'] },
      { name: 'Unsupervised Learning',  subs: ['K-means', 'PCA', 't-SNE', 'DBSCAN', 'Hierarchical Clustering'] },
      { name: 'Deep Learning',          subs: ['CNNs', 'Transfer Learning', 'ResNet-50', 'Embeddings', 'Keras', 'PyTorch', 'TensorFlow'] },
      { name: 'NLP',                    subs: ['Transformers', 'Text Classification', 'Topic Modeling', 'Semantic Search', 'Named Entity Rec.'] },
      { name: 'Reinforcement Learning', subs: ['Q-Learning', 'Policy Gradient', 'Reward Shaping'] },
      { name: 'Recommendation Systems', subs: ['Similarity Search', 'FAISS', 'Cosine Similarity', 'Nearest Neighbor'] },
      { name: 'Model Interpretability', subs: ['SHAP', 'Feature Importance', 'Partial Dependence'] },
    ],
  },
  {
    label: 'Statistics',
    rgb: '138,200,218',  /* Uranus — icy pale blue */
    skills: [
      { name: 'Bayesian Inference',  subs: ['MCMC', 'Probabilistic Modeling', 'Hidden Markov Models', 'EM Algorithm'] },
      { name: 'Causal Inference',    subs: ['Propensity Score Matching', 'Synthetic Controls', 'Instrumental Variables', 'Causal Forests', 'Double-Debiased ML'] },
      { name: 'Time Series',         subs: ['ARIMA', 'Forecasting', 'Seasonal Decomposition'] },
      { name: 'Statistical Learning', subs: ['Regularization', 'Cross-Validation', 'Hypothesis Testing'] },
      { name: 'A/B Testing' },
      { name: 'Hierarchical Models' },
    ],
  },
  {
    label: 'Data Engineering',
    rgb: '188,138,60',  /* Mars — warm amber-bronze */
    skills: [
      { name: 'ETL Pipelines' },
      { name: 'Database Design',  subs: ['PostgreSQL', 'pgvector', 'Schema Design', 'AsyncPG'] },
      { name: 'Docker',           subs: ['Docker Compose', 'Multi-Container Orchestration', 'Health Checks'] },
      { name: 'FastAPI',          subs: ['REST APIs', 'Async Endpoints', 'ML Inference APIs'] },
      { name: 'Web Scraping',     subs: ['BeautifulSoup', 'Requests', 'Data Parsing', 'Automation'] },
      { name: 'Data Wrangling',   subs: ['Pandas', 'NumPy', 'Cleaning', 'Feature Engineering'] },
    ],
  },
  {
    label: 'Cloud & Tools',
    rgb: '118,128,165',  /* Pluto — steel periwinkle */
    skills: [
      { name: 'AWS',             subs: ['S3', 'Cloud Storage', 'Deployment'] },
      { name: 'Azure' },
      { name: 'Git / GitHub' },
      { name: 'Monitoring',      subs: ['Prometheus', 'Grafana', 'ML Inference Metrics', 'API Latency'] },
      { name: 'JupyterLab' },
      { name: 'VS Code' },
      { name: 'Stata' },
    ],
  },
  {
    label: 'Policy & Communication',
    rgb: '215,118,68',  /* Venus — warm coral-peach */
    skills: [
      { name: 'Policy Analysis',      subs: ['Legislative Research', 'Regulatory Review', 'Impact Assessment', 'Stakeholder Mapping'] },
      { name: 'Technical Writing',    subs: ['Research Reports', 'Policy Memos', 'Data Narratives', 'Documentation'] },
      { name: 'Data Storytelling',    subs: ['Translating Findings', 'Executive Summaries', 'Public-Facing Dashboards'] },
      { name: 'Qualitative Research', subs: ['Literature Review', 'Interviews', 'Thematic Analysis', 'Case Studies'] },
      { name: 'Program Evaluation',   subs: ['KPI Reporting', 'Performance Metrics', 'Needs Assessment'] },
      { name: 'Public Affairs',       subs: ['Media Outreach', 'Stakeholder Engagement', 'CSR Analysis'] },
    ],
  },
  {
    label: 'Visualization & BI',
    rgb: '95,62,168',  /* Neptune purple */
    skills: [
      { name: 'Tableau' },
      { name: 'Power BI' },
      { name: 'Streamlit' },
      { name: 'ggplot2' },
      { name: 'Plotly' },
      { name: 'Matplotlib' },
      { name: 'Seaborn' },
    ],
  },
]

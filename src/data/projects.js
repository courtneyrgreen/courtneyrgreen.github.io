/*
  projects.js — Research project definitions for the Project Cosmos view.

  Each project is rendered as a constellation in the starfield canvas.
  Clicking any star in a constellation opens that project's detail card.

  Fields:
    id          — unique identifier used to look up the project when a star is clicked
    label       — short name shown as the constellation label
    eyebrow     — type + year shown at the top of the detail card
    title       — full project title in the detail card
    desc        — paragraph description in the detail card (or array of bullet strings)
    tags        — technology / method tags shown as small chips
    link        — external URL for the project (null = no link rendered)
    linkLabel   — call-to-action text for the link
    img         — optional image path for the card header (null = placeholder)
    wip         — true = show "In Progress" badge and suppress link
    stars       — array of [x, y] positions as fractions of canvas size (0–1)
    lines       — array of [a, b] index pairs connecting stars into the constellation
    labelOffset — {x, y} pixel offset from the constellation centroid for the label
    starSize    — base radius in pixels for each star dot
*/

export const PROJECTS = [
  {
    id:         'policing',
    label:      'Chicago Exonerations',
    eyebrow:    'Research · 2024',
    title:      'Probabilistic Modeling of Prosecutorial Misconduct and Over-Policing in Chicago',
    desc:       'A data-driven investigation into systemic failures within Illinois\' criminal legal system, centered on Chicago as a focal point for racialized wrongful convictions, arrest disparities, and over-policing. Drawing from the National Registry of Exonerations, Illinois arrest records, and misconduct databases, the project uses geospatial mapping, disproportionality indexes, and machine learning to identify Cook County as a hotspot for misconduct and to trace how perjury, evidence suppression, and witness tampering disproportionately harm Black communities. Wrongful convictions are not isolated errors; they are systemic outcomes.',
    tags:       ['Python', 'Pandas', 'Scikit-learn', 'GeoPandas', 'Plotly', 'Quarto', 'PCA', 't-SNE', 'DBSCAN'],
    link:       'https://courtneyrgreen.com/chicago-misconduct-analysis/',
    linkLabel:  'View Project',
    link2:      'https://github.com/courtneyrgreen/chicago-misconduct-analysis',
    link2Label: 'View Repository',
    img:        '/chicago/breakdown_of_official_misconduct_by_race.png',
    wip:        false,
    // Top-far-left — clear of center header
    stars:      [[.06,.13],[.13,.07],[.21,.12],[.19,.24],[.07,.27]],
    lines:      [[0,1],[1,2],[2,3],[3,4],[4,0],[1,3]],
    labelOffset:{ x:-4, y:18 },
    starSize:   3.2,
  },
  {
    id:         'maternal',
    label:      'Maternal Health',
    eyebrow:    'Research · 2024',
    title:      'Quantitative Analysis of Maternal Health Indicators and Reproductive Policy Variation',
    desc:       'Longitudinal analysis of CDC WONDER data to identify structural predictors of maternal mortality rates and reproductive health outcomes. Incorporates difference-in-differences models to evaluate the impact of state-level policy variation on maternal health.',
    tags:       ['R', 'Causal Inference', 'Public Health', 'Policy Analysis'],
    link:       null,
    linkLabel:  'View Analysis',
    img:        null,
    wip:        false,
    // Center — anchors the layout
    stars:      [[.43,.44],[.51,.36],[.60,.43],[.56,.56]],
    lines:      [[0,1],[1,2],[2,3],[3,0],[0,2]],
    labelOffset:{ x:10, y:18 },
    starSize:   2.8,
  },
  {
    id:         'aid',
    label:      'Aid Worker Risk',
    eyebrow:    'Data Visualization · 2025',
    title:      'Humanitarian Shield: A Data Driven Exploration of Humanitarian Aid Worker Vulnerability',
    award:      '2025 Georgetown University Merit Scholarship recipient, awarded through anonymous faculty review for this project.',
    desc:       'In 2024, 378 humanitarian aid workers lost their lives, a 35% increase from the prior year. Developed for DSAN Advanced Data Visualization, this project analyzes geographic and temporal patterns, victim profiles, and attack types using data from the Aid Worker Security Database to identify critical vulnerabilities and predictors of violence. Through geospatial mapping, statistical testing, and clustering, it surfaces insights to improve security risk management for frontline workers.',
    tags:       ['Python', 'Quarto', 'Geospatial Analysis', 'Clustering', 'Statistical Testing', 'Data Visualization'],
    link:       'https://dsan-viz2025.github.io/dashboard.html#overview',
    linkLabel:  'View Dashboard',
    img:        null,
    wip:        false,
    // Bottom-left — well clear of overdose
    stars:      [[.10,.74],[.19,.68],[.30,.72],[.27,.83],[.12,.85]],
    lines:      [[0,1],[1,2],[2,3],[3,4],[4,0],[1,3],[0,2]],
    labelOffset:{ x:4, y:-22 },
    starSize:   2.6,
  },
  {
    id:         'voter',
    label:      'Voter Turnout',
    eyebrow:    'Applied Research · 2024',
    title:      'Machine Learning Models for County-Level Analysis of Voter Turnout and Partisan Lean in the 2024 U.S. Presidential Election',
    desc:       'Partial election results can be used to call the winner of an election before all votes have been counted. Linear regression methods and an artificial neural network were trained on election and demographic data to predict the Democratic vote share and total turnout in various counties for the 2024 election. To simulate a scenario where partial returns are used to predict final election results, the test set was manually selected to be counties in states in the western United States that report their results later in the night. The best-performing model correctly predicted the winner of each state in the test set. Additionally, random forest models achieved high accuracy in predicting whether a county in the test set would vote for a Democrat or have above-average voter turnout.',
    tags:       ['Python', 'Random Forest', 'Neural Networks', 'Linear Regression', 'Electoral Data', 'Supervised Learning'],
    link:       'https://docs.google.com/viewer?url=https://courtneyrgreen.com/voter_turnout/ML_Models_for_County-Level_Analysis_and_Voter_Turnout.pdf',
    linkLabel:  'View Paper',
    link2:      'https://github.com/courtneyrgreen/2024-election-county-forecasting',
    link2Label: 'View Repository',
    img:        null,
    imgs:       [
      '/voter_turnout/predicted_v_actual_kamala.png',
      '/voter_turnout/predicted_v_true_label.png',
    ],
    wip:        false,
    // Top-far-right — mirrors Over-Policing
    stars:      [[.72,.14],[.80,.07],[.89,.13],[.90,.25],[.82,.31],[.72,.26]],
    lines:      [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,2],[3,5]],
    labelOffset:{ x:-10, y:18 },
    starSize:   2.5,
  },
  {
    id:         'overdose',
    label:      'Overdose Crisis',
    eyebrow:    'Data Visualization · 2025',
    title:      'Overdosed: Mapping the U.S. Overdose Crisis Through County-Level Data and Demographic Indicators',
    desc:       'An interactive data visualization project investigating patterns in drug overdose deaths across the United States. Drawing from CDC, Census Bureau, and USDA data, it explores how demographic and socioeconomic factors relate to overdose mortality at the state and county level, surfacing geographic clustering, disparities in access to care, and how overdose trends intersect with income, education, race, and age.',
    tags:       ['Quarto', 'VegaLite', 'Plotly', 'Altair', 'Folium', 'Python', 'Pandas', 'R'],
    link:       'https://courtneyrgreen.com/us-overdose-crisis/',
    linkLabel:  'View Dashboard',
    link2:      'https://github.com/courtneyrgreen/us-overdose-crisis',
    link2Label: 'View Repository',
    img:        '/overdose/overdose.png',
    wip:        false,
    // Mid-far-left — separated from Over-Policing above and Aid Worker below
    stars:      [[.04,.50],[.12,.44],[.22,.48],[.18,.59],[.06,.61]],
    lines:      [[0,1],[1,2],[2,3],[3,4],[4,0],[1,3]],
    labelOffset:{ x:4, y:18 },
    starSize:   2.7,
  },
  {
    id:         'neural',
    label:      'Neural Networks',
    eyebrow:    'ML Research · 2025',
    title:      'Predicting Religious Affiliation from Structured Survey Data Using Neural Networks',
    desc:       'Applied deep learning to structured survey data to predict religious affiliation, exploring how demographic, behavioral, and attitudinal features interact in a multi-class classification setting. Examined model interpretability and the ethical implications of inferring identity from survey data.',
    tags:       ['Python', 'PyTorch', 'Neural Networks', 'Survey Data', 'Classification'],
    link:       null,
    linkLabel:  'View Repository',
    img:        null,
    wip:        false,
    // Mid-far-right — mirrors Overdose on the right
    stars:      [[.78,.46],[.86,.40],[.93,.46],[.90,.57],[.78,.57]],
    lines:      [[0,1],[1,2],[2,3],[3,4],[4,0],[0,2],[1,3]],
    labelOffset:{ x:-10, y:18 },
    starSize:   2.5,
  },
  {
    id:         'feedback',
    label:      'Crime Prediction',
    eyebrow:    'Research · In Progress',
    title:      'Policing as a Data-Generating Process: A Causal Analysis of Feedback Loops in Crime Prediction Systems',
    desc:       'An ongoing causal analysis of how predictive policing systems generate and reinforce biased data feedback loops. Examines the structural conditions under which algorithmic crime prediction amplifies racial and socioeconomic disparities, using causal graph models and empirical crime data.',
    tags:       ['Causal Inference', 'Python', 'DAGs', 'Algorithmic Fairness', 'Policy Research'],
    link:       null,
    linkLabel:  'View Repository',
    img:        null,
    wip:        true,
    // Bottom-right — clear of Neural Networks above and back button
    stars:      [[.68,.74],[.76,.68],[.86,.72],[.83,.82],[.68,.83]],
    lines:      [[0,1],[1,2],[2,3],[3,4],[4,0],[1,3]],
    labelOffset:{ x:-10, y:-22 },
    starSize:   2.4,
  },
]

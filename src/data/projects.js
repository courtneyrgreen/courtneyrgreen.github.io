/*
  projects.js — Research project definitions for the Project Cosmos view.

  Each project is rendered as a constellation in the starfield canvas.
  Clicking any star in a constellation opens that project's detail card.

  Fields:
    id          — unique identifier used to look up the project when a star is clicked
    label       — short name shown as the constellation label
    eyebrow     — type + year shown at the top of the detail card
    title       — full project title in the detail card
    desc        — paragraph description in the detail card
    tags        — technology / method tags shown as small chips
    link        — external URL for the project (GitHub, report, etc.)
    linkLabel   — call-to-action text for the link
    img         — optional image path for the card header (null = placeholder)
    stars       — array of [x, y] positions as fractions of canvas size (0–1)
    lines       — array of [a, b] index pairs connecting stars into the constellation
    labelOffset — {x, y} pixel offset from the constellation centroid for the label
    starSize    — base radius in pixels for each star dot
*/

export const PROJECTS = [
  {
    id:         'policing',
    label:      'Over-Policing',
    eyebrow:    'Research · 2024',
    title:      'Patterns of Over-Policing in Urban Communities: A Quantitative Analysis',
    desc:       'A statistical examination of stop-and-frisk data across six major U.S. cities, modeling the relationship between neighborhood demographics, income, and police contact rates using multilevel regression and geospatial analysis.',
    tags:       ['Python', 'GeoPandas', 'Multilevel Modeling', 'Policy Research'],
    link:       'https://github.com/',
    linkLabel:  'View Report',
    img:        null,
    // Upper-left zone
    stars:      [[.08,.20],[.15,.12],[.25,.17],[.23,.31],[.10,.35]],
    lines:      [[0,1],[1,2],[2,3],[3,4],[4,0],[1,3]],
    labelOffset:{ x:-8, y:-22 },
    starSize:   3.2,
  },
  {
    id:         'maternal',
    label:      'Maternal Health',
    eyebrow:    'Research · 2023',
    title:      'Racial Disparities in Maternal Mortality: A Longitudinal Study Across U.S. States',
    desc:       'Longitudinal analysis of CDC WONDER data to identify structural predictors of Black maternal mortality rates. Incorporates difference-in-differences models to evaluate the impact of Medicaid expansion on maternal outcomes.',
    tags:       ['R', 'Stan', 'Causal Inference', 'Public Health'],
    link:       'https://github.com/',
    linkLabel:  'View Analysis',
    img:        null,
    // Center zone
    stars:      [[.43,.40],[.52,.32],[.62,.40],[.57,.53]],
    lines:      [[0,1],[1,2],[2,3],[3,0],[0,2]],
    labelOffset:{ x:10, y:-20 },
    starSize:   2.8,
  },
  {
    id:         'aid',
    label:      'Aid Worker Risk',
    eyebrow:    'Data Visualization · 2023',
    title:      'Mapping Aid Worker Security Incidents: A Global Risk Index',
    desc:       'Built an interactive risk scoring model for humanitarian aid deployments using 20 years of AWSD incident data. Developed a composite index weighting attack type, frequency, and actor category across 80 countries.',
    tags:       ['Python', 'D3.js', 'NLP', 'Tableau'],
    link:       'https://github.com/',
    linkLabel:  'View Dashboard',
    img:        null,
    // Lower-left zone
    stars:      [[.10,.64],[.20,.56],[.34,.60],[.32,.73],[.16,.78]],
    lines:      [[0,1],[1,2],[2,3],[3,4],[4,0],[1,3],[0,2]],
    labelOffset:{ x:-5, y:18 },
    starSize:   2.6,
  },
  {
    id:         'voter',
    label:      'Voter Turnout',
    eyebrow:    'Applied Research · 2022',
    title:      'Structural Barriers to Voter Participation in Low-Income Districts',
    desc:       'Multi-state regression analysis examining how polling place distance, ID requirements, and early voting access predict turnout gaps between income quintiles. Simulation model projects turnout change under alternative policy scenarios.',
    tags:       ['R', 'Spatial Analysis', 'Survey Data', 'Policy Modeling'],
    link:       'https://github.com/',
    linkLabel:  'View Repository',
    img:        null,
    // Upper-right zone
    stars:      [[.70,.16],[.78,.09],[.87,.15],[.88,.27],[.80,.34],[.71,.28]],
    lines:      [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,2],[3,5]],
    labelOffset:{ x:5, y:-22 },
    starSize:   2.5,
  },
  {
    id:         'displacement',
    label:      'Displacement',
    eyebrow:    'ML Research · 2022',
    title:      'Predicting Displacement Risk from Climate Events Using Satellite and Census Data',
    desc:       'Machine learning pipeline combining MODIS satellite imagery, FEMA flood zone maps, and ACS census data to predict household-level displacement risk within 90 days of a climate event. XGBoost model with SHAP interpretability layer.',
    tags:       ['Python', 'XGBoost', 'SHAP', 'Remote Sensing'],
    link:       'https://github.com/',
    linkLabel:  'View Codebase',
    img:        null,
    // Lower-right zone
    stars:      [[.63,.68],[.72,.61],[.81,.67],[.75,.78]],
    lines:      [[0,1],[1,2],[2,3],[3,0],[0,2],[1,3]],
    labelOffset:{ x:-5, y:16 },
    starSize:   2.4,
  },
]

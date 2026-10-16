// Facts come from the resume (source of truth), the GitHub repo list, and
// LeetCode's public stats (fetched 2026-10-16). No metric here is invented.

export const person = {
  name: 'Kuruva Radhakrishna',
  email: 'kuruvaradhakrishna77@gmail.com',
  github: 'https://github.com/kuruva-radhakrishna',
  leetcode: 'https://leetcode.com/u/kradha123/',
  linkedin: 'https://www.linkedin.com/in/kuruva-radhakrishna-457167260/',
  resume: '/Kuruva_Radhakrishna_Resume.pdf',
}

export const nav = [
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Work' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
]

export const tools = [
  'Databricks', 'Spark SQL', 'Trino', 'Superset', 'Delta Lake', 'n8n', 'Claude', 'Python',
  'FastAPI', 'Redis', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS',
]

// Oldest first: the page reads as a parcel's journey.
export const journey = [
  {
    status: 'Ordered',
    when: '2022',
    org: 'NIT Delhi',
    role: 'B.Tech, Electronics and Communication Engineering, Minor in AI/ML',
    points: ['8.89 CGPA. Head of the Database Team at the Training & Placement Cell.'],
    tags: [],
  },
  {
    status: 'In transit',
    when: 'May – Jul 2025',
    org: 'AlgoUniversity',
    role: 'SWE Co-Op Intern, Code Arena (backed by Y Combinator)',
    cert: 'https://drive.google.com/file/d/1gNyMkmSw7HLqSLOBlJqn4JX4-G1r8g_n/view?usp=drivesdk',
    points: [
      'Built a real-time online judge on the MERN stack with a Docker-isolated execution layer for C, C++, Java and Python, with resource controls and sandboxing.',
      'Integrated Gemini for code review, debugging and conversational help during problem solving.',
      'Deployed on AWS EC2 and load-tested with k6 at 100 concurrent users and 46 requests/sec: zero failures and sub-250ms latency under the tested workload.',
    ],
    tags: ['MERN', 'Docker', 'AWS EC2', 'k6', 'Gemini'],
  },
  {
    status: 'Out for delivery',
    when: 'Jan – Jun 2026',
    org: 'Meesho',
    role: 'Business Analyst Intern, SX: Claims',
    points: [
      'Drove adoption of Databricks Genie and MIA, an internal Text-to-SQL agent, so business users could answer recurring data questions in natural language.',
      'Built metric views and evaluation datasets that make AI-generated SQL reliable and gave the team a repeatable way to evaluate analytical agents.',
      'Traced seller payout leakage, including a reverse-order scan sequencing gap, to its root causes across the payout funnel, and supported resolution with stakeholders.',
      'Authored a reusable Seller NPS RCA playbook mapping key metrics and analysis paths.',
    ],
    tags: ['Gold-layer models', 'Kaizen workflows', 'Metric views', 'Seller payouts'],
  },
  {
    status: 'Delivered',
    when: 'Jul 2026 – now',
    org: 'Meesho',
    role: 'Business Analyst 1 (BA-1), Promise Accuracy',
    cert: 'https://drive.google.com/file/d/1httSBZQL_-FYFZQdh38H5iowQZCK0iiY/view?usp=drivesdk',
    points: [
      'Diagnosed delivery-promise breaches across lane, weather, backlog and operational cuts, and found rigid single-quantile calibration to be a key driver during sale and disruption periods.',
      'Designed a per-lane calibration layer from historical performance and contextual signals: delivery breach under 5% without materially inflating promised dates. The experiment covers 40% of the platform.',
      'Built an agentic RCA workflow on Databricks Genie and Claude that investigates delivery metrics across levels of the metric hierarchy. Reusable Genie skills cut ad-hoc SQL requests by 45%.',
      'Automated recurring metric analysis with n8n and Claude workflows, freeing analysts for investigation and action planning.',
    ],
    tags: ['PDD modeling', 'CPD breach analysis', 'Carrier allocation', 'Spark SQL', 'Databricks', 'Trino', 'Superset', 'Delta Lake'],
  },
]

export const projects = [
  {
    id: 'KR-DP-01',
    title: 'DevPilot',
    tone: 'paper',
    problem: 'Repository-level bug fixes fail when retrieval is shallow and patches rely on brittle line ranges.',
    built:
      'An AI software-engineering agent: code-aware RAG over GitHub repos (tree-sitter AST chunking, semantic plus keyword search fused with RRF), a tool-calling repair loop, 7 MCP tools, and tests run in a network-restricted Docker sandbox.',
    result: {
      value: 97,
      decimals: 0,
      suffix: '%',
      label: 'repair success',
      note: 'Up from 83% on a 36-case deterministic benchmark. Average iterations fell from 1.42 to 1.03.',
    },
    stack: ['Python', 'FastAPI', 'pgvector', 'Gemini / Ollama', 'MCP'],
    links: [
      { label: 'Source', href: 'https://github.com/kuruva-radhakrishna/devpilot' },
      { label: 'Live', href: 'https://devpilot-ruby.vercel.app' },
    ],
  },
  {
    id: 'KR-CF-02',
    title: 'CodeFlow',
    tone: 'ink',
    problem: 'Code execution has to survive duplicate submissions, worker crashes and stale workers.',
    built:
      'An async platform around Judge0: Redis-backed queue, multi-worker consumers, Postgres as the source of truth, DB-enforced idempotency, leases, heartbeats and reaper-based recovery.',
    result: {
      value: 9.35,
      decimals: 2,
      suffix: '',
      label: 'jobs per second',
      note: 'At 20 worker lanes. Queue-wait p50 improved from 7.3s to 1.3s with zero failures (100 submissions at 10 req/s, mock workload).',
    },
    stack: ['Node.js', 'PostgreSQL', 'Redis', 'Judge0'],
    links: [
      { label: 'Source', href: 'https://github.com/kuruva-radhakrishna/CodeFlow' },
      { label: 'Live API', href: 'https://codeflow-api-1r33.onrender.com' },
    ],
  },
  {
    id: 'KR-AI-03',
    title: 'AI Market Intelligence agent',
    tone: 'deep',
    problem: 'Review and market signals arrive unstructured, so nobody can query them.',
    built:
      'An n8n and Claude workflow that collects, summarises and routes signals into MongoDB and Slack, with Text-to-MQL so business questions become database queries.',
    stack: ['n8n', 'Claude', 'MongoDB', 'Slack'],
    links: [],
  },
  {
    id: 'KR-FV-04',
    title: 'Football Video Analysis',
    tone: 'paper',
    problem: 'Match footage holds tactical structure that is hard to read by eye.',
    built:
      'A computer-vision pipeline: player detection, team classification, field keypoints and ball tracking, rendered as player maps, radar views, Voronoi regions and ball trajectories.',
    stack: ['Python', 'Computer Vision'],
    links: [{ label: 'Source', href: 'https://github.com/kuruva-radhakrishna/Football-Analysis' }],
  },
  {
    id: 'KR-LO-05',
    title: 'LookOut',
    tone: 'ink',
    problem: 'Rental booking breaks when two guests reserve the same dates.',
    built: 'A MERN rental marketplace with concurrency-safe booking, Razorpay payments, and Mapbox location search.',
    stack: ['MERN', 'Razorpay', 'Mapbox'],
    links: [{ label: 'Source', href: 'https://github.com/kuruva-radhakrishna/LookOut' }],
  },
]

export const achievements = [
  {
    title: 'National Semi-Finalist, Flipkart GRiD 7.0',
    detail: '2025',
    href: 'https://drive.google.com/file/d/1ryHVw81ug5L92JNpK7QShAe0d0uplsmJ/view?usp=drivesdk',
    linkLabel: 'Certificate',
  },
  {
    title: 'Meta HackerCup, AI Track',
    detail: 'Advanced to Round 3 of 4',
  },
  {
    title: 'Head, Database Team',
    detail: 'Training & Placement Cell, NIT Delhi',
  },
]

// LeetCode public stats, fetched 2026-10-16.
export const leetcode = {
  asOf: '16 Oct 2026',
  solved: 677,
  easy: 296,
  medium: 348,
  hard: 33,
  rating: 1717,
  topPercent: 12.94,
  contests: 27,
}

export const education = [
  {
    school: 'National Institute of Technology, Delhi',
    what: 'B.Tech, Electronics and Communication Engineering, Minor in AI/ML',
    when: '2022 – 2026',
    score: '8.89 / 10 CGPA',
  },
  {
    school: 'FIITJEE, Vijayawada',
    what: 'Intermediate',
    when: '2020 – 2022',
    score: '96.6%',
  },
]

import type { Question, Industry } from '@/types';

export const SHARED_QUESTIONS: Question[] = [
  // ── DEVELOPER EMPATHY (5) ──────────────────────────────
  {
    id: 'emp-1',
    dimension: 'empathy',
    prompt:
      'A developer comments "your docs are great but your getting started takes 40 minutes." What is the highest-leverage fix?',
    options: [
      { id: 'a', text: 'Add a video walkthrough at the top' },
      {
        id: 'b',
        text: 'Cut the tutorial to a copy-pasteable 5-minute path and move depth into a "Next steps" section',
      },
      { id: 'c', text: 'Add more screenshots so it feels easier' },
      { id: 'd', text: 'Reply explaining why the 40 minutes is necessary' },
    ],
    correct: 'b',
    rationale:
      'Time-to-first-success is the core dev-tools metric. Depth belongs after the win, not before it.',
  },
  {
    id: 'emp-2',
    dimension: 'empathy',
    prompt: 'Which of these is most likely to make a developer trust your product page?',
    options: [
      { id: 'a', text: 'A customer logo wall of Fortune 500 brands' },
      { id: 'b', text: 'A 6-line code snippet that visibly does the thing the product claims' },
      { id: 'c', text: 'A Gartner Magic Quadrant mention' },
      { id: 'd', text: 'A testimonial quote from a CTO' },
    ],
    correct: 'b',
    rationale: 'Developers verify by reading code. Show, do not tell.',
  },
  {
    id: 'emp-3',
    dimension: 'empathy',
    prompt: 'You are reviewing a landing page draft. Which phrase should be cut?',
    options: [
      { id: 'a', text: '"Install with one command"' },
      { id: 'b', text: '"Open-source under MIT"' },
      { id: 'c', text: '"Revolutionize your engineering workflow with AI-powered synergy"' },
      { id: 'd', text: '"Works with your existing CI"' },
    ],
    correct: 'c',
    rationale: 'Marketing maximalism repels technical audiences. Concrete > superlative.',
  },
  {
    id: 'emp-4',
    dimension: 'empathy',
    prompt: 'A developer files a GitHub issue calling your SDK "garbage." What is the right first move?',
    options: [
      { id: 'a', text: 'Flag it to moderation for tone' },
      {
        id: 'b',
        text: 'Reply within hours, ask for a reproduction, and treat it as a real signal',
      },
      { id: 'c', text: 'Ignore it — angry users are not representative' },
      { id: 'd', text: 'Forward it to support so engineering is not distracted' },
    ],
    correct: 'b',
    rationale: 'Public, fast, technical response builds more trust than any campaign.',
  },
  {
    id: 'emp-5',
    dimension: 'empathy',
    prompt: 'Which signal best indicates a developer is ready to adopt your tool?',
    options: [
      { id: 'a', text: 'They downloaded a whitepaper' },
      { id: 'b', text: 'They starred the repo' },
      { id: 'c', text: 'They ran the quickstart and hit your API more than once in 24 hours' },
      { id: 'd', text: 'They attended a webinar' },
    ],
    correct: 'c',
    rationale: 'Activation = repeated use. Everything else is intent at best.',
  },
  // ── GTM FOR DEVELOPER TOOLS (5) ────────────────────────
  {
    id: 'gtm-1',
    dimension: 'gtm',
    prompt: 'Your dev tool has a free tier. What is the most important conversion event to instrument?',
    options: [
      { id: 'a', text: 'Sign-up' },
      { id: 'b', text: 'First successful API call from a non-localhost environment' },
      { id: 'c', text: 'Pricing page visit' },
      { id: 'd', text: 'Newsletter open' },
    ],
    correct: 'b',
    rationale: 'Production-shaped usage is the leading indicator of paid conversion in PLG.',
  },
  {
    id: 'gtm-2',
    dimension: 'gtm',
    prompt: 'Which best describes a "bottom-up" GTM motion?',
    options: [
      { id: 'a', text: 'Sales team targets CIOs and CTOs first' },
      { id: 'b', text: 'Individual developers adopt the tool, then advocate it upward' },
      { id: 'c', text: 'Procurement leads the buying process' },
      { id: 'd', text: 'Channel partners distribute the product' },
    ],
    correct: 'b',
    rationale: 'PLG for dev tools is defined by end-user-led adoption.',
  },
  {
    id: 'gtm-3',
    dimension: 'gtm',
    prompt: 'You launch a new SDK. What is the single most important launch-week metric?',
    options: [
      { id: 'a', text: 'Press mentions' },
      { id: 'b', text: 'Number of developers who completed the quickstart' },
      { id: 'c', text: 'Website traffic' },
      { id: 'd', text: 'Twitter impressions' },
    ],
    correct: 'b',
    rationale: 'Adoption depth at launch predicts compounding growth; vanity metrics do not.',
  },
  {
    id: 'gtm-4',
    dimension: 'gtm',
    prompt: 'A SaaS PMM wants to run a gated whitepaper campaign for your dev tool. What is the better approach?',
    options: [
      { id: 'a', text: 'Run it — leads are leads' },
      {
        id: 'b',
        text: 'Publish it ungated as a docs-adjacent guide and instrument downstream signups',
      },
      { id: 'c', text: 'Run it but only gate after page 3' },
      { id: 'd', text: 'Skip content, do paid ads instead' },
    ],
    correct: 'b',
    rationale: 'Gating burns trust with developers. Ungated + good attribution wins.',
  },
  {
    id: 'gtm-5',
    dimension: 'gtm',
    prompt: 'Which pricing page element matters most to a developer evaluator?',
    options: [
      { id: 'a', text: 'A "Contact sales" CTA on every tier' },
      {
        id: 'b',
        text: 'A clear, self-serve free tier with usage limits stated in concrete numbers',
      },
      { id: 'c', text: 'Annual discount badges' },
      { id: 'd', text: 'Comparison table vs competitors' },
    ],
    correct: 'b',
    rationale: 'Self-serve clarity removes friction. "Contact us" implies you do not want them.',
  },
  // ── CONTENT & COMMUNITY (5) ────────────────────────────
  {
    id: 'con-1',
    dimension: 'content',
    prompt: 'Which content format consistently drives the most qualified developer signups?',
    options: [
      { id: 'a', text: 'A 60-second product highlight reel' },
      {
        id: 'b',
        text: 'A technical tutorial that solves a specific problem end-to-end with runnable code',
      },
      { id: 'c', text: 'A founder thought-leadership post' },
      { id: 'd', text: 'A customer case study PDF' },
    ],
    correct: 'b',
    rationale: 'Tutorials index on Google, get shared in Slack/Discord, and pre-qualify the reader.',
  },
  {
    id: 'con-2',
    dimension: 'content',
    prompt: 'Your blog has 50 posts and 4 drive 80% of traffic. The right next move is:',
    options: [
      { id: 'a', text: 'Publish 50 more on the same cadence' },
      { id: 'b', text: 'Refresh and expand the 4 winners, and write more in their shape' },
      { id: 'c', text: 'Delete the 46 underperformers' },
      { id: 'd', text: 'Switch to video' },
    ],
    correct: 'b',
    rationale: 'Power-law content. Double down on what works before chasing more surface area.',
  },
  {
    id: 'con-3',
    dimension: 'content',
    prompt:
      'A developer DMs you on Discord asking a deep technical question outside your docs. You:',
    options: [
      { id: 'a', text: 'Answer privately and move on' },
      { id: 'b', text: 'Answer in a public channel, then file an issue to add it to docs' },
      { id: 'c', text: 'Send them to support' },
      { id: 'd', text: 'Ask them to email sales' },
    ],
    correct: 'b',
    rationale: 'Every question is a missing doc. Answer in public so the next person finds it.',
  },
  {
    id: 'con-4',
    dimension: 'content',
    prompt: 'Which is the strongest signal of a healthy developer community?',
    options: [
      { id: 'a', text: 'Member count' },
      { id: 'b', text: 'Members answering each other before staff responds' },
      { id: 'c', text: 'Weekly AMAs scheduled' },
      { id: 'd', text: 'Number of channels' },
    ],
    correct: 'b',
    rationale: 'Peer-to-peer answers = trust, retention, and scale. The rest is theatre.',
  },
  {
    id: 'con-5',
    dimension: 'content',
    prompt: 'You are commissioning a guest post from an external developer. The correct editorial stance is:',
    options: [
      { id: 'a', text: 'Heavy edit to match your brand voice' },
      {
        id: 'b',
        text: 'Light edit for clarity and accuracy; keep their voice and let them link to their own work',
      },
      { id: 'c', text: 'Rewrite under a staff byline' },
      { id: 'd', text: 'Require them to mention your product 5+ times' },
    ],
    correct: 'b',
    rationale: 'Authenticity is the value. Sanitizing it defeats the point.',
  },
  // ── CREDIBILITY SIGNALS (5) ────────────────────────────
  {
    id: 'cred-1',
    dimension: 'credibility',
    prompt: 'Which is the single highest-trust credibility signal on a dev tool homepage?',
    options: [
      { id: 'a', text: 'G2 Leader badge' },
      { id: 'b', text: 'A live, working playground or sandbox' },
      { id: 'c', text: 'Press logos ("As seen in...")' },
      { id: 'd', text: 'Funding announcement' },
    ],
    correct: 'b',
    rationale: 'Touch-the-product beats every analyst badge ever printed.',
  },
  {
    id: 'cred-2',
    dimension: 'credibility',
    prompt: 'You are choosing between two case studies to feature. Which leads?',
    options: [
      { id: 'a', text: 'A Fortune 100 with a generic quote and no metrics' },
      {
        id: 'b',
        text: 'A scale-up engineer who shows three code snippets and a concrete latency number',
      },
      { id: 'c', text: 'A logo-only mention from a hyperscaler' },
      { id: 'd', text: 'A press release from a partner' },
    ],
    correct: 'b',
    rationale: 'Specificity = believability. Logos without substance read as theatre.',
  },
  {
    id: 'cred-3',
    dimension: 'credibility',
    prompt: 'A respected engineer writes a critical blog post about your tool. Best response:',
    options: [
      { id: 'a', text: 'Ignore it' },
      {
        id: 'b',
        text: 'Respond publicly, acknowledge what is fair, fix what is fixable, and link the post from your changelog',
      },
      { id: 'c', text: 'Ask them to take it down' },
      { id: 'd', text: 'Have legal review it' },
    ],
    correct: 'b',
    rationale:
      'How you handle criticism is itself a credibility signal — usually a bigger one than the criticism.',
  },
  {
    id: 'cred-4',
    dimension: 'credibility',
    prompt: 'Which homepage element should you cut first if you had to remove one?',
    options: [
      { id: 'a', text: 'The code snippet showing core use case' },
      { id: 'b', text: 'The "Trusted by leaders in innovation" banner with no logos under it' },
      { id: 'c', text: 'The pricing link in the nav' },
      { id: 'd', text: 'The link to docs' },
    ],
    correct: 'b',
    rationale: 'Empty trust claims actively reduce credibility. Cut them with confidence.',
  },
  {
    id: 'cred-5',
    dimension: 'credibility',
    prompt: 'You are evaluating which technical author to commission for a partner blog. Which signal matters most?',
    options: [
      { id: 'a', text: 'Twitter follower count' },
      {
        id: 'b',
        text: 'Demonstrated depth — a body of technical posts/talks that engineers cite or share',
      },
      { id: 'c', text: 'Marketing background' },
      { id: 'd', text: 'They worked at a famous company' },
    ],
    correct: 'b',
    rationale: 'Cited > followed. Depth signals are durable, audience size is not.',
  },
];

export const TECHNICAL_QUESTIONS: Record<Industry, Question[]> = {
  'cloud-infra': [
    {
      id: 'tech-cloud-1',
      dimension: 'technical',
      industry: 'cloud-infra',
      prompt: 'Which best describes the difference between IaaS and PaaS?',
      options: [
        { id: 'a', text: 'IaaS abstracts servers; PaaS abstracts both servers and runtime' },
        { id: 'b', text: 'They are the same, different vendors' },
        { id: 'c', text: 'IaaS is on-prem only' },
        { id: 'd', text: 'PaaS does not support containers' },
      ],
      correct: 'a',
      rationale: 'PaaS abstracts more of the stack than IaaS — you ship code, not VMs.',
    },
    {
      id: 'tech-cloud-2',
      dimension: 'technical',
      industry: 'cloud-infra',
      prompt: 'A customer asks why your service has "five nines" of availability. They are asking about:',
      options: [
        { id: 'a', text: 'Latency in milliseconds' },
        { id: 'b', text: '99.999% uptime — roughly 5 minutes of downtime per year' },
        { id: 'c', text: 'Number of regions' },
        { id: 'd', text: 'Number of nines in the SOC2 report' },
      ],
      correct: 'b',
      rationale: 'Five nines = 99.999% — a common SLA tier in infrastructure.',
    },
    {
      id: 'tech-cloud-3',
      dimension: 'technical',
      industry: 'cloud-infra',
      prompt: 'Kubernetes is best described as:',
      options: [
        { id: 'a', text: 'A programming language' },
        { id: 'b', text: 'A container orchestration system' },
        { id: 'c', text: 'A database' },
        { id: 'd', text: 'A CI/CD pipeline' },
      ],
      correct: 'b',
      rationale: 'K8s orchestrates containerized workloads across a cluster.',
    },
    {
      id: 'tech-cloud-4',
      dimension: 'technical',
      industry: 'cloud-infra',
      prompt: 'Which is a real cost-control lever in cloud infrastructure?',
      options: [
        { id: 'a', text: 'Reserved or committed-use pricing for predictable workloads' },
        { id: 'b', text: 'Asking the provider for a discount monthly' },
        { id: 'c', text: 'Running everything on the largest instance type' },
        { id: 'd', text: 'Avoiding autoscaling' },
      ],
      correct: 'a',
      rationale: 'Reservations are the largest single FinOps lever for steady-state workloads.',
    },
    {
      id: 'tech-cloud-5',
      dimension: 'technical',
      industry: 'cloud-infra',
      prompt: '"Edge computing" most directly addresses which problem?',
      options: [
        { id: 'a', text: 'Storage cost' },
        { id: 'b', text: 'Latency by serving compute closer to the user' },
        { id: 'c', text: 'Code readability' },
        { id: 'd', text: 'Database normalization' },
      ],
      correct: 'b',
      rationale: 'Edge = compute closer to the user = lower latency.',
    },
  ],
  'ai-ml': [
    {
      id: 'tech-ai-1',
      dimension: 'technical',
      industry: 'ai-ml',
      prompt: 'What is a "token" in the context of LLMs?',
      options: [
        { id: 'a', text: 'A unit of authentication' },
        {
          id: 'b',
          text: 'A chunk of text (often a word piece) that the model processes as one unit',
        },
        { id: 'c', text: 'A type of neural layer' },
        { id: 'd', text: 'A licensing key' },
      ],
      correct: 'b',
      rationale: "Tokens are the model's atomic input/output unit and the basis of pricing.",
    },
    {
      id: 'tech-ai-2',
      dimension: 'technical',
      industry: 'ai-ml',
      prompt: 'RAG stands for:',
      options: [
        { id: 'a', text: 'Recursive Algorithmic Generation' },
        { id: 'b', text: 'Retrieval-Augmented Generation' },
        { id: 'c', text: 'Random Access Gradient' },
        { id: 'd', text: 'Reinforcement Agent Graph' },
      ],
      correct: 'b',
      rationale:
        'RAG = retrieve external context, then generate. The default pattern for grounded LLM apps.',
    },
    {
      id: 'tech-ai-3',
      dimension: 'technical',
      industry: 'ai-ml',
      prompt: 'Fine-tuning a model is most appropriate when:',
      options: [
        {
          id: 'a',
          text: 'You need the model to follow a specific style or domain it cannot achieve via prompting',
        },
        { id: 'b', text: 'You want to give it new factual knowledge' },
        { id: 'c', text: 'You want it to run faster' },
        { id: 'd', text: 'You want to reduce hallucinations' },
      ],
      correct: 'a',
      rationale:
        'Fine-tuning shifts behaviour/style. For facts, use retrieval. For hallucinations, ground with context.',
    },
    {
      id: 'tech-ai-4',
      dimension: 'technical',
      industry: 'ai-ml',
      prompt: 'A "context window" refers to:',
      options: [
        { id: 'a', text: "The model's training dataset size" },
        {
          id: 'b',
          text: 'The maximum amount of text (in tokens) the model can consider in one call',
        },
        { id: 'c', text: 'A debugging panel' },
        { id: 'd', text: 'Memory across user sessions' },
      ],
      correct: 'b',
      rationale: 'Context window = per-call token budget. Not memory; not training size.',
    },
    {
      id: 'tech-ai-5',
      dimension: 'technical',
      industry: 'ai-ml',
      prompt: 'Which evaluation method is most rigorous for a customer-facing LLM feature?',
      options: [
        { id: 'a', text: 'Spot-checking outputs occasionally' },
        {
          id: 'b',
          text: 'A held-out eval set with task-specific metrics, run on every model or prompt change',
        },
        { id: 'c', text: 'Asking the model to grade itself once' },
        { id: 'd', text: 'Reading the changelog' },
      ],
      correct: 'b',
      rationale: 'Regression-style evals are the only durable signal. Vibes do not scale.',
    },
  ],
  'crm-saas': [
    {
      id: 'tech-crm-1',
      dimension: 'technical',
      industry: 'crm-saas',
      prompt: 'What does "multi-tenant" mean in SaaS architecture?',
      options: [
        {
          id: 'a',
          text: 'Multiple customers share the same application instance with logical data isolation',
        },
        { id: 'b', text: 'The app supports multiple languages' },
        { id: 'c', text: 'The customer has multiple admin accounts' },
        { id: 'd', text: 'The app runs in multiple regions' },
      ],
      correct: 'a',
      rationale: 'Multi-tenancy is the economic foundation of SaaS — shared infra, isolated data.',
    },
    {
      id: 'tech-crm-2',
      dimension: 'technical',
      industry: 'crm-saas',
      prompt: 'A webhook is best described as:',
      options: [
        { id: 'a', text: 'An HTTP callback that fires when an event happens' },
        { id: 'b', text: 'A type of database' },
        { id: 'c', text: 'A frontend animation' },
        { id: 'd', text: 'A login method' },
      ],
      correct: 'a',
      rationale: 'Webhooks are server-to-server event notifications. Core to SaaS integrations.',
    },
    {
      id: 'tech-crm-3',
      dimension: 'technical',
      industry: 'crm-saas',
      prompt: 'In SaaS metrics, NRR stands for:',
      options: [
        { id: 'a', text: 'New Recurring Revenue' },
        {
          id: 'b',
          text: 'Net Revenue Retention — revenue from existing customers including expansion minus churn',
        },
        { id: 'c', text: 'Negative Refund Rate' },
        { id: 'd', text: 'Normal Run Rate' },
      ],
      correct: 'b',
      rationale: 'NRR > 100% means the existing book of business is growing on its own.',
    },
    {
      id: 'tech-crm-4',
      dimension: 'technical',
      industry: 'crm-saas',
      prompt: 'Which auth standard is most common for B2B SaaS enterprise integrations?',
      options: [
        { id: 'a', text: 'Password-only' },
        { id: 'b', text: 'SAML or OIDC-based SSO' },
        { id: 'c', text: 'API keys in URL params' },
        { id: 'd', text: 'Basic auth' },
      ],
      correct: 'b',
      rationale: 'Enterprises demand SSO via SAML/OIDC. It is a baseline for upmarket SaaS.',
    },
    {
      id: 'tech-crm-5',
      dimension: 'technical',
      industry: 'crm-saas',
      prompt: 'A "custom object" in a CRM platform is:',
      options: [
        {
          id: 'a',
          text: 'A user-defined data entity, beyond the built-in Account/Contact/Deal models',
        },
        { id: 'b', text: 'A piece of furniture in the office' },
        { id: 'c', text: 'A type of email template' },
        { id: 'd', text: 'A workflow automation' },
      ],
      correct: 'a',
      rationale: 'Custom objects let teams model their actual business in the CRM.',
    },
  ],
  'devtools-apis': [
    {
      id: 'tech-dev-1',
      dimension: 'technical',
      industry: 'devtools-apis',
      prompt: 'REST and GraphQL differ most fundamentally in that:',
      options: [
        {
          id: 'a',
          text: 'GraphQL lets the client specify exactly what fields it wants in a single query',
        },
        { id: 'b', text: 'REST is faster' },
        { id: 'c', text: 'GraphQL only works on Node.js' },
        { id: 'd', text: 'They use different transport protocols' },
      ],
      correct: 'a',
      rationale: 'GraphQL: client-shaped responses. REST: server-defined resources.',
    },
    {
      id: 'tech-dev-2',
      dimension: 'technical',
      industry: 'devtools-apis',
      prompt: 'An HTTP 429 response means:',
      options: [
        { id: 'a', text: 'Not found' },
        { id: 'b', text: 'Too many requests — you are being rate-limited' },
        { id: 'c', text: 'Server error' },
        { id: 'd', text: 'Unauthorized' },
      ],
      correct: 'b',
      rationale: '429 = rate limit. A common, recoverable client error.',
    },
    {
      id: 'tech-dev-3',
      dimension: 'technical',
      industry: 'devtools-apis',
      prompt: 'Idempotency in an API means:',
      options: [
        {
          id: 'a',
          text: 'Making the same request multiple times has the same effect as making it once',
        },
        { id: 'b', text: 'The request is encrypted' },
        { id: 'c', text: 'The endpoint is rate-limited' },
        { id: 'd', text: 'The response is cached' },
      ],
      correct: 'a',
      rationale: 'Idempotency is critical for retries and payments. Safe to repeat.',
    },
    {
      id: 'tech-dev-4',
      dimension: 'technical',
      industry: 'devtools-apis',
      prompt: 'Semantic versioning (semver) increments the MAJOR version when:',
      options: [
        { id: 'a', text: 'A typo is fixed' },
        { id: 'b', text: 'A backwards-incompatible API change is made' },
        { id: 'c', text: 'A new feature is added' },
        { id: 'd', text: 'Documentation is updated' },
      ],
      correct: 'b',
      rationale: 'MAJOR = break. MINOR = add. PATCH = fix.',
    },
    {
      id: 'tech-dev-5',
      dimension: 'technical',
      industry: 'devtools-apis',
      prompt: "An SDK's primary job is to:",
      options: [
        { id: 'a', text: 'Replace your API' },
        {
          id: 'b',
          text: 'Wrap the API with idiomatic language conventions and reduce integration friction',
        },
        { id: 'c', text: 'Provide UI components' },
        { id: 'd', text: "Host the customer's data" },
      ],
      correct: 'b',
      rationale: 'SDKs translate raw APIs into the language and patterns a developer already knows.',
    },
  ],
  'data-analytics': [
    {
      id: 'tech-data-1',
      dimension: 'technical',
      industry: 'data-analytics',
      prompt: 'ETL vs ELT — the key difference is:',
      options: [
        { id: 'a', text: 'ELT loads raw data into the warehouse first, then transforms it there' },
        { id: 'b', text: 'They are the same' },
        { id: 'c', text: 'ETL is only for unstructured data' },
        { id: 'd', text: 'ELT requires Hadoop' },
      ],
      correct: 'a',
      rationale: 'ELT = leverage warehouse compute (Snowflake, BigQuery, Databricks) for transforms.',
    },
    {
      id: 'tech-data-2',
      dimension: 'technical',
      industry: 'data-analytics',
      prompt: 'A "data warehouse" differs from a "data lake" in that:',
      options: [
        {
          id: 'a',
          text: 'A warehouse stores structured, query-optimized data; a lake stores raw, multi-format data',
        },
        { id: 'b', text: 'Warehouses are physical, lakes are virtual' },
        { id: 'c', text: 'Lakes are smaller' },
        { id: 'd', text: 'They are interchangeable terms' },
      ],
      correct: 'a',
      rationale:
        'Warehouse = schema-on-write, optimized for analytics. Lake = schema-on-read, flexible.',
    },
    {
      id: 'tech-data-3',
      dimension: 'technical',
      industry: 'data-analytics',
      prompt: 'dbt (data build tool) is primarily used for:',
      options: [
        { id: 'a', text: 'Ingesting data from source systems' },
        { id: 'b', text: 'Modeling and transforming data inside the warehouse using SQL' },
        { id: 'c', text: 'Visualizing dashboards' },
        { id: 'd', text: 'Database backup' },
      ],
      correct: 'b',
      rationale: 'dbt is the de facto T-layer of the modern data stack.',
    },
    {
      id: 'tech-data-4',
      dimension: 'technical',
      industry: 'data-analytics',
      prompt: 'A "semantic layer" exists to:',
      options: [
        {
          id: 'a',
          text: 'Provide a consistent, governed definition of business metrics across tools',
        },
        { id: 'b', text: 'Translate the UI into other languages' },
        { id: 'c', text: 'Compress the database' },
        { id: 'd', text: 'Replace SQL' },
      ],
      correct: 'a',
      rationale:
        'Without a semantic layer, "revenue" means three different things in three dashboards.',
    },
    {
      id: 'tech-data-5',
      dimension: 'technical',
      industry: 'data-analytics',
      prompt: 'Reverse ETL refers to:',
      options: [
        { id: 'a', text: 'Restoring a backup' },
        {
          id: 'b',
          text: 'Syncing data from the warehouse back into operational tools like CRMs and ad platforms',
        },
        { id: 'c', text: 'Undoing a transform' },
        { id: 'd', text: 'Migrating off a warehouse' },
      ],
      correct: 'b',
      rationale: 'Reverse ETL operationalizes the warehouse — it is how data activates revenue tools.',
    },
  ],
};

export const WILDCARD_QUESTION: Question = {
  id: 'cred-wildcard',
  dimension: 'credibility',
  prompt:
    'A hiring manager for a DevRel role asks you to name one piece of public work you are proud of. The strongest answer is:',
  options: [
    { id: 'a', text: 'A campaign you ran with strong CTR numbers' },
    {
      id: 'b',
      text: 'A specific blog post, talk, or repo that developers cited or shared, with a link',
    },
    { id: 'c', text: 'A list of brands you worked with' },
    { id: 'd', text: 'Your follower count' },
  ],
  correct: 'b',
  rationale: 'In DevRel, public, linkable, technical work is the only durable credential.',
};

export function getQuestionsForIndustry(industry: Industry): Question[] {
  return [...SHARED_QUESTIONS, ...TECHNICAL_QUESTIONS[industry], WILDCARD_QUESTION];
}

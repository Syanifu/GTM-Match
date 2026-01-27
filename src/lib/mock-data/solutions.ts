import { Solution } from "@/types";
import { mockUserPreviews } from "./users";

export const mockSolutions: Solution[] = [
  {
    id: "1",
    problemId: "1",
    title: "Multi-channel attribution model to reduce CAC by 25%",
    description: `<p>After struggling with rising CAC, we implemented a sophisticated multi-touch attribution model that revealed our best-performing channel combinations.</p>
    <p><strong>Key insight:</strong> We discovered that LinkedIn ads alone had terrible CAC ($800+), but when combined with retargeting and nurture sequences, the blended CAC dropped to $320.</p>
    <p>This solution is specifically designed for B2B SaaS companies looking to scale paid advertising while maintaining or reducing CAC.</p>`,
    author: mockUserPreviews[0],
    approach: `<p><strong>Step 1: Implement Multi-Touch Attribution</strong></p>
    <p>We switched from last-click attribution to a W-shaped model using Bizible, giving credit to:</p>
    <ul>
      <li>First touch (30%)</li>
      <li>Lead creation (30%)</li>
      <li>Opportunity creation (30%)</li>
      <li>Other touches (10%)</li>
    </ul>
    <p><strong>Step 2: Segment & Analyze</strong></p>
    <p>Segmented all leads by:</p>
    <ul>
      <li>Primary acquisition channel</li>
      <li>Supporting touchpoints</li>
      <li>Conversion time</li>
      <li>Deal size</li>
    </ul>
    <p><strong>Step 3: Optimize Channel Mix</strong></p>
    <p>Based on data, we:</p>
    <ul>
      <li>Reduced LinkedIn direct response budget by 40%</li>
      <li>Increased retargeting budget by 200%</li>
      <li>Built custom nurture tracks based on first touch channel</li>
      <li>Implemented lead scoring to prioritize multi-touch leads</li>
    </ul>`,
    implementation: {
      toolsUsed: ["Bizible", "HubSpot", "Google Ads", "LinkedIn Ads", "Segment"],
      timeToImplement: "6 weeks",
      budget: "$15K setup + $5K/month",
      teamSizeNeeded: 3,
      difficulty: "medium",
    },
    results: {
      metricsBeforeAfter: [
        { name: "CAC", before: "$450", after: "$340" },
        { name: "Monthly Ad Spend", before: "$50K", after: "$175K" },
        { name: "MQL Volume", before: "110/month", after: "515/month" },
        { name: "SQL Conversion", before: "28%", after: "38%" },
      ],
      roi: "3.2x in first quarter",
      timeSaved: "15 hours/week on manual attribution",
      description: `<p>Within 8 weeks of implementation, we saw dramatic improvements across all key metrics. The biggest win was finally being able to scale spend confidently.</p>
      <p>CAC decreased from $450 to $340 while we scaled monthly spend from $50K to $175K. The multi-touch model revealed that our "expensive" channels were actually highly efficient when measured correctly.</p>
      <p><strong>Unexpected benefits:</strong></p>
      <ul>
        <li>Sales team prioritized leads better (38% SQL conversion vs 28%)</li>
        <li>Marketing could prove ROI to leadership with confidence</li>
        <li>Identified 3 channel combinations that became our growth playbook</li>
      </ul>`,
    },
    upvotes: 48,
    helpfulCount: 23,
    commentsCount: 12,
    isAccepted: true,
    isVerified: true,
    createdAt: new Date("2025-01-21"),
    updatedAt: new Date("2025-01-24"),
  },
  {
    id: "2",
    problemId: "2",
    title: "Product-led onboarding flow that doubled trial conversion",
    description: `<p>We rebuilt our entire trial experience around getting users to their "aha moment" within the first session. Trial-to-paid conversion jumped from 12% to 26% in 8 weeks.</p>
    <p>The core insight: Users who completed 3 specific actions in their first session had a 67% conversion rate. We redesigned everything around driving those 3 actions.</p>`,
    author: mockUserPreviews[3],
    approach: `<p><strong>Step 1: Identify Your Aha Moment</strong></p>
    <p>We analyzed 500+ trial users and found the pattern: users who (1) created a project, (2) invited a teammate, and (3) completed their first task had a 67% conversion rate.</p>
    <p><strong>Step 2: Rebuild Onboarding Around Aha Moment</strong></p>
    <p>Created a focused 3-step onboarding:</p>
    <ul>
      <li>Template-based project setup (not blank slate)</li>
      <li>Pre-written invite message (one-click team invite)</li>
      <li>Interactive tutorial for first task creation</li>
    </ul>
    <p><strong>Step 3: Remove Friction</strong></p>
    <ul>
      <li>Removed 8 optional fields from signup</li>
      <li>Delayed credit card requirement until day 10</li>
      <li>Made onboarding dismissible (but persistent)</li>
    </ul>
    <p><strong>Step 4: Activate Trial Engagement Campaign</strong></p>
    <p>Built behavior-triggered email sequence:</p>
    <ul>
      <li>If no project in 24h → Template inspiration email</li>
      <li>If no invite in 48h → Team collaboration value email</li>
      <li>If stuck on step → In-app help + Slack offer</li>
    </ul>`,
    implementation: {
      toolsUsed: ["Mixpanel", "Customer.io", "Pendo", "Typeform"],
      timeToImplement: "4 weeks",
      budget: "$8K",
      teamSizeNeeded: 2,
      difficulty: "medium",
    },
    results: {
      metricsBeforeAfter: [
        { name: "Trial to Paid", before: "12%", after: "26%" },
        { name: "Activation Rate", before: "78%", after: "89%" },
        { name: "Time to First Value", before: "4.2 days", after: "1.8 days" },
        { name: "Trial Churn Day 7", before: "62%", after: "28%" },
      ],
      roi: "116% increase in new MRR",
      description: `<p>Results exceeded our expectations. Trial conversion more than doubled, but the real win was the quality of conversions - these users had higher engagement and lower churn.</p>
      <p><strong>Key learnings:</strong></p>
      <ul>
        <li>Templates were crucial - blank slate paralyzed users</li>
        <li>Team invite was the highest-leverage action</li>
        <li>Behavioral triggers beat time-based emails 3:1</li>
        <li>Letting users skip onboarding actually increased completion</li>
      </ul>`,
    },
    upvotes: 56,
    helpfulCount: 31,
    commentsCount: 18,
    isAccepted: true,
    createdAt: new Date("2025-01-19"),
    updatedAt: new Date("2025-01-25"),
  },
  {
    id: "3",
    problemId: "3",
    title: "AI-powered lead scoring system that reduced wasted AE time by 60%",
    description: `<p>We built a custom lead scoring model using historical data and machine learning to predict which leads would actually close. AE efficiency improved dramatically.</p>
    <p>The traditional BANT framework was giving us false positives. Our ML model looked at 40+ signals to predict likelihood to close.</p>`,
    author: mockUserPreviews[1],
    approach: `<p><strong>Step 1: Data Collection & Analysis</strong></p>
    <p>Analyzed 2 years of historical data (2,400 opps) to identify patterns in deals that closed vs those that stalled. Found 40+ leading indicators beyond BANT.</p>
    <p><strong>Step 2: Build Predictive Model</strong></p>
    <p>Worked with a data scientist to build a gradient boosting model that scored leads 0-100 based on:</p>
    <ul>
      <li>Firmographic data (company size, industry, tech stack)</li>
      <li>Engagement signals (email opens, content downloads, demo attendance)</li>
      <li>Behavioral patterns (pages viewed, time on site, return visits)</li>
      <li>Intent data (G2 research, competitor comparison searches)</li>
    </ul>
    <p><strong>Step 3: Integration & Testing</strong></p>
    <ul>
      <li>Integrated model into Salesforce via API</li>
      <li>A/B tested with half of sales team for 4 weeks</li>
      <li>Refined threshold for "qualified" leads</li>
    </ul>
    <p><strong>Step 4: Process Changes</strong></p>
    <ul>
      <li>Leads scored 70+ → Direct to AE</li>
      <li>Leads scored 40-69 → SDR nurture track</li>
      <li>Leads scored <40 → Marketing automation only</li>
    </ul>`,
    implementation: {
      toolsUsed: ["Salesforce", "Python", "6sense", "Clearbit", "HubSpot"],
      timeToImplement: "10 weeks",
      budget: "$45K (includes data scientist contract)",
      teamSizeNeeded: 4,
      difficulty: "hard",
    },
    results: {
      metricsBeforeAfter: [
        { name: "AE Time on Unqualified", before: "40%", after: "15%" },
        { name: "Close Rate", before: "8%", after: "22%" },
        { name: "Average Deal Cycle", before: "90 days", after: "62 days" },
        { name: "Sales Productivity", before: "Baseline", after: "+175%" },
      ],
      roi: "8.5x in first 6 months",
      costSavings: "$280K/year in wasted sales time",
      description: `<p>The impact was immediate and dramatic. AEs went from spending 40% of their time on leads that would never close to spending 85% of their time on high-probability opportunities.</p>
      <p><strong>Results breakdown:</strong></p>
      <ul>
        <li>Close rate increased from 8% to 22% (2.75x improvement)</li>
        <li>Average deal cycle decreased by 31% (90d → 62d)</li>
        <li>Sales team closed 175% more revenue with same headcount</li>
        <li>AE satisfaction scores increased significantly</li>
      </ul>
      <p><strong>Critical success factors:</strong></p>
      <ul>
        <li>Had to have 2+ years of clean historical data</li>
        <li>Needed buy-in from sales leadership (ran pilot first)</li>
        <li>Model requires monthly retraining to stay accurate</li>
        <li>Combined with human judgment, not replaced it</li>
      </ul>`,
    },
    upvotes: 72,
    helpfulCount: 38,
    commentsCount: 24,
    isAccepted: true,
    isVerified: true,
    createdAt: new Date("2025-01-16"),
    updatedAt: new Date("2025-01-23"),
  },
];

// Helper functions
export const getSolutionById = (id: string): Solution | undefined => {
  return mockSolutions.find((s) => s.id === id);
};

export const getSolutionsByProblemId = (problemId: string): Solution[] => {
  return mockSolutions.filter((s) => s.problemId === problemId);
};

export const getTopSolutions = (limit: number = 10): Solution[] => {
  return [...mockSolutions]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, limit);
};

export const getAcceptedSolutions = (): Solution[] => {
  return mockSolutions.filter((s) => s.isAccepted);
};

import { Problem, Category } from "@/types";
import { mockUserPreviews } from "./users";

export const categories: Category[] = [
  "Lead Generation",
  "Conversion Optimization",
  "Sales Enablement",
  "Product-Market Fit",
  "Pricing & Packaging",
  "Attribution & Analytics",
  "Customer Onboarding",
  "Content Distribution",
];

export const mockProblems: Problem[] = [
  {
    id: "1",
    title: "How to reduce CAC while scaling paid ads from $50K to $200K/month?",
    description: `<p>We're a Series A SaaS company looking to scale our paid advertising from $50K to $200K per month, but our CAC keeps increasing as we scale. Currently at $450 CAC with a target of $350.</p>
    <p>We've tried:</p>
    <ul>
      <li>Expanding to new platforms (LinkedIn, Reddit)</li>
      <li>Testing different audience segments</li>
      <li>Improving landing page conversion rates</li>
    </ul>
    <p>The CAC keeps creeping up as we exhaust our best-performing segments. Looking for proven strategies to maintain or reduce CAC while scaling spend significantly.</p>`,
    category: "Lead Generation",
    tags: ["paid-ads", "CAC", "scaling", "b2b-saas"],
    author: mockUserPreviews[0],
    status: "open",
    context: {
      industry: "B2B SaaS",
      companyStage: "Series A",
      companySize: "50-100",
      teamSize: 8,
      gtmMotion: "Sales-led",
      targetMarket: "Mid-market software companies",
      icp: "Marketing and sales leaders at companies with 100-500 employees",
      currentTools: ["Google Ads", "LinkedIn Ads", "HubSpot", "Segment"],
    },
    constraints: {
      budget: "$200K/month for ads",
      timeline: "Need to hit targets in Q2",
      helpNeededBy: new Date("2025-03-31"),
    },
    metrics: {
      current: [
        { name: "Monthly Ad Spend", value: "$50,000" },
        { name: "CAC", value: "$450" },
        { name: "MQLs per month", value: "110" },
        { name: "SQL Conversion Rate", value: "28%" },
      ],
      target: [
        { name: "Monthly Ad Spend", value: "$200,000" },
        { name: "CAC", value: "$350" },
        { name: "MQLs per month", value: "570" },
        { name: "SQL Conversion Rate", value: "35%" },
      ],
    },
    engagement: {
      upvotes: 42,
      views: 856,
      solutionsCount: 7,
      commentsCount: 12,
      facingThisTooCount: 18,
    },
    createdAt: new Date("2025-01-20"),
    updatedAt: new Date("2025-01-24"),
    isTrending: true,
  },
  {
    id: "2",
    title: "Free trial to paid conversion stuck at 12% - how to improve?",
    description: `<p>Our PLG SaaS product has a 14-day free trial, but only 12% of trial users convert to paid. Industry benchmark seems to be 18-25%.</p>
    <p>Current activation rate is good (78% of users complete onboarding), but they're not seeing enough value to convert.</p>
    <p><strong>What we've tried:</strong></p>
    <ul>
      <li>Added in-app guides and tooltips</li>
      <li>Email drip campaign during trial</li>
      <li>Sales outreach for high-intent users</li>
    </ul>
    <p>Looking for tactical improvements to the trial experience and conversion messaging.</p>`,
    category: "Conversion Optimization",
    tags: ["plg", "free-trial", "conversion-rate", "onboarding"],
    author: mockUserPreviews[1],
    status: "in_progress",
    context: {
      industry: "Project Management Software",
      companyStage: "Seed",
      companySize: "10-25",
      teamSize: 4,
      gtmMotion: "PLG",
      targetMarket: "SMB and startups",
      icp: "Small teams (5-20 people) needing project collaboration",
      currentTools: ["Mixpanel", "Intercom", "Customer.io", "Stripe"],
    },
    metrics: {
      current: [
        { name: "Trial Sign-ups (monthly)", value: "850" },
        { name: "Activation Rate", value: "78%" },
        { name: "Trial to Paid", value: "12%" },
        { name: "Average Time to First Value", value: "4.2 days" },
      ],
      target: [
        { name: "Trial Sign-ups (monthly)", value: "850" },
        { name: "Activation Rate", value: "85%" },
        { name: "Trial to Paid", value: "22%" },
        { name: "Average Time to First Value", value: "2 days" },
      ],
    },
    engagement: {
      upvotes: 38,
      views: 672,
      solutionsCount: 5,
      commentsCount: 8,
      facingThisTooCount: 24,
    },
    createdAt: new Date("2025-01-18"),
    updatedAt: new Date("2025-01-25"),
    isTrending: true,
  },
  {
    id: "3",
    title: "Sales team spending 40% of time on unqualified leads - how to improve lead scoring?",
    description: `<p>Our AEs are wasting almost half their time on leads that never close. We have BANT qualification in place, but it's not working well enough.</p>
    <p>Close rate on "qualified" leads is only 8%, and average deal cycle is 90 days. Sales team is frustrated.</p>
    <p>We use HubSpot for lead scoring but the criteria seems off. Looking for a better lead scoring framework and qualification process.</p>`,
    category: "Sales Enablement",
    tags: ["lead-qualification", "sales-efficiency", "lead-scoring"],
    author: mockUserPreviews[2],
    status: "open",
    context: {
      industry: "Enterprise Security Software",
      companyStage: "Series B",
      companySize: "100-250",
      teamSize: 12,
      gtmMotion: "Sales-led",
      targetMarket: "Enterprise companies",
      icp: "CISOs and IT Directors at companies with 1000+ employees",
      currentTools: ["Salesforce", "HubSpot", "Outreach", "Gong"],
    },
    metrics: {
      current: [
        { name: "Monthly SQLs", value: "320" },
        { name: "AE Time on Unqualified", value: "40%" },
        { name: "Close Rate", value: "8%" },
        { name: "Average Deal Cycle", value: "90 days" },
      ],
      target: [
        { name: "Monthly SQLs", value: "200" },
        { name: "AE Time on Unqualified", value: "15%" },
        { name: "Close Rate", value: "18%" },
        { name: "Average Deal Cycle", value: "60 days" },
      ],
    },
    engagement: {
      upvotes: 56,
      views: 1240,
      solutionsCount: 9,
      commentsCount: 15,
      facingThisTooCount: 31,
    },
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-23"),
  },
  {
    id: "4",
    title: "Which pricing model: per-seat vs usage-based for API product?",
    description: `<p>We're launching an API product and debating between per-seat pricing ($99/user/month) vs usage-based (pay per API call).</p>
    <p><strong>Per-seat pros:</strong> Predictable revenue, easier to sell<br>
    <strong>Per-seat cons:</strong> Limits adoption, doesn't align with value</p>
    <p><strong>Usage-based pros:</strong> Scales with customer value, encourages adoption<br>
    <strong>Usage-based cons:</strong> Unpredictable revenue, harder to forecast</p>
    <p>Our competitors are split 50/50. Target customers are developer teams at mid-size tech companies.</p>`,
    category: "Pricing & Packaging",
    tags: ["pricing", "api-product", "monetization", "packaging"],
    author: mockUserPreviews[3],
    status: "solved",
    context: {
      industry: "Developer Tools",
      companyStage: "Pre-seed",
      companySize: "5-10",
      teamSize: 3,
      gtmMotion: "PLG",
      targetMarket: "Developer teams",
      icp: "Engineering teams at tech companies with 50-500 engineers",
      currentTools: ["Stripe", "Segment"],
    },
    metrics: {
      current: [
        { name: "Beta Users", value: "45" },
        { name: "Active API Projects", value: "120" },
        { name: "Avg API Calls per User", value: "25,000/month" },
      ],
      target: [
        { name: "Paying Customers", value: "100" },
        { name: "MRR", value: "$15,000" },
        { name: "NRR", value: "120%" },
      ],
    },
    engagement: {
      upvotes: 67,
      views: 1450,
      solutionsCount: 11,
      commentsCount: 23,
      facingThisTooCount: 42,
    },
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-22"),
  },
  {
    id: "5",
    title: "Multi-touch attribution is showing conflicting data with GA4",
    description: `<p>We implemented Bizible for multi-touch attribution but the numbers don't match GA4, and leadership is confused about which to trust.</p>
    <p>Bizible shows 35% of revenue from organic, GA4 shows 52%. Both can't be right.</p>
    <p>Has anyone successfully reconciled multi-touch attribution tools with GA4? What's the right source of truth?</p>`,
    category: "Attribution & Analytics",
    tags: ["attribution", "analytics", "ga4", "bizible"],
    author: mockUserPreviews[4],
    status: "open",
    context: {
      industry: "B2B Marketing Software",
      companyStage: "Series A",
      companySize: "25-50",
      teamSize: 5,
      gtmMotion: "Hybrid",
      currentTools: ["Bizible", "Google Analytics 4", "Salesforce", "Segment"],
    },
    metrics: {
      current: [
        { name: "Data Discrepancy", value: "17%" },
        { name: "Time Spent Reconciling", value: "10 hrs/week" },
        { name: "Attribution Confidence", value: "Low" },
      ],
      target: [
        { name: "Data Discrepancy", value: "<5%" },
        { name: "Time Spent Reconciling", value: "<2 hrs/week" },
        { name: "Attribution Confidence", value: "High" },
      ],
    },
    engagement: {
      upvotes: 29,
      views: 534,
      solutionsCount: 4,
      commentsCount: 7,
      facingThisTooCount: 15,
    },
    createdAt: new Date("2025-01-22"),
    updatedAt: new Date("2025-01-25"),
  },
  {
    id: "6",
    title: "User onboarding completion rate dropped from 65% to 42% after product redesign",
    description: `<p>We launched a major UI redesign last month and our onboarding completion rate tanked from 65% to 42%. Activation is down 20%.</p>
    <p>The new UI is objectively better (cleaner, more modern), but users are getting lost. Session recordings show confusion during the setup flow.</p>
    <p>Do we roll back or fix forward? And what's the best way to diagnose exactly where users are dropping off?</p>`,
    category: "Customer Onboarding",
    tags: ["onboarding", "product-redesign", "activation", "ux"],
    author: mockUserPreviews[0],
    status: "open",
    context: {
      industry: "Analytics Platform",
      companyStage: "Series B",
      companySize: "50-100",
      teamSize: 6,
      gtmMotion: "PLG",
      currentTools: ["Mixpanel", "FullStory", "Pendo", "Intercom"],
    },
    metrics: {
      current: [
        { name: "Onboarding Completion", value: "42%" },
        { name: "Activation Rate", value: "55%" },
        { name: "Time to First Value", value: "6.8 days" },
        { name: "Day 7 Retention", value: "38%" },
      ],
      target: [
        { name: "Onboarding Completion", value: "65%" },
        { name: "Activation Rate", value: "75%" },
        { name: "Time to First Value", value: "3 days" },
        { name: "Day 7 Retention", value: "55%" },
      ],
    },
    engagement: {
      upvotes: 34,
      views: 712,
      solutionsCount: 6,
      commentsCount: 11,
      facingThisTooCount: 19,
    },
    createdAt: new Date("2025-01-21"),
    updatedAt: new Date("2025-01-24"),
    isPinned: true,
  },
];

// Helper functions
export const getProblemById = (id: string): Problem | undefined => {
  return mockProblems.find((p) => p.id === id);
};

export const getProblemsByCategory = (category: Category): Problem[] => {
  return mockProblems.filter((p) => p.category === category);
};

export const getTrendingProblems = (): Problem[] => {
  return mockProblems.filter((p) => p.isTrending);
};

export const getProblemsByStatus = (status: "open" | "in_progress" | "solved"): Problem[] => {
  return mockProblems.filter((p) => p.status === status);
};

export const getAllProblems = (): Problem[] => {
  return mockProblems;
};

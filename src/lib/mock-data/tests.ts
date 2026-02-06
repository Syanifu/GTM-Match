import { TestChallenge, TestSubmission } from "@/types/test";

export interface TestQuestion {
  id: string;
  categoryId: string;
  question: string;
  order: number;
}

export interface TestCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  questionCount: number;
  badge: {
    id: string;
    name: string;
    icon: string;
  };
  passingScore: number; // percentage needed to earn badge
}

export const testCategories: TestCategory[] = [
  {
    id: "icp-segmentation",
    name: "ICP & Market Segmentation",
    description: "Master ideal customer profile definition and market targeting strategies",
    icon: "🎯",
    questionCount: 6,
    badge: { id: "badge-icp-master", name: "ICP Master", icon: "🎯" },
    passingScore: 70
  },
  {
    id: "pricing-packaging",
    name: "Pricing & Packaging",
    description: "Optimize pricing strategies and packaging decisions",
    icon: "💰",
    questionCount: 5,
    badge: { id: "badge-pricing-pro", name: "Pricing Pro", icon: "💰" },
    passingScore: 70
  },
  {
    id: "product-launch",
    name: "Product Launch & Positioning",
    description: "Craft compelling positioning and execute successful launches",
    icon: "🚀",
    questionCount: 5,
    badge: { id: "badge-launch-expert", name: "Launch Expert", icon: "🚀" },
    passingScore: 70
  },
  {
    id: "customer-acquisition",
    name: "Customer Acquisition & Conversion",
    description: "Drive efficient customer acquisition and optimize conversions",
    icon: "📈",
    questionCount: 8,
    badge: { id: "badge-growth-hacker", name: "Growth Hacker", icon: "📈" },
    passingScore: 70
  },
  {
    id: "expansion-retention",
    name: "Expansion & Retention",
    description: "Maximize customer lifetime value through retention and expansion",
    icon: "🔄",
    questionCount: 6,
    badge: { id: "badge-retention-hero", name: "Retention Hero", icon: "🔄" },
    passingScore: 70
  },
  {
    id: "channel-distribution",
    name: "Channel & Distribution",
    description: "Build and optimize go-to-market channels",
    icon: "🌐",
    questionCount: 5,
    badge: { id: "badge-channel-strategist", name: "Channel Strategist", icon: "🌐" },
    passingScore: 70
  },
  {
    id: "sales-enablement",
    name: "Sales Enablement & Pipeline",
    description: "Empower sales teams and optimize pipeline performance",
    icon: "💼",
    questionCount: 7,
    badge: { id: "badge-sales-enabler", name: "Sales Enabler", icon: "💼" },
    passingScore: 70
  },
  {
    id: "competitive-dynamics",
    name: "Competitive & Market Dynamics",
    description: "Navigate competitive landscapes and market shifts",
    icon: "⚔️",
    questionCount: 4,
    badge: { id: "badge-market-warrior", name: "Market Warrior", icon: "⚔️" },
    passingScore: 70
  },
  {
    id: "metrics-analysis",
    name: "Metrics & Analysis",
    description: "Analyze and interpret key GTM metrics",
    icon: "📊",
    questionCount: 4,
    badge: { id: "badge-data-driven", name: "Data Driven", icon: "📊" },
    passingScore: 70
  }
];

export const testQuestions: TestQuestion[] = [
  // ICP & Market Segmentation (6 questions)
  {
    id: "icp-1",
    categoryId: "icp-segmentation",
    question: "Your ACV is $50K with a 9-month sales cycle. Sales wants to pursue $15K deals to hit quarterly targets. What's your recommendation and why?",
    order: 1
  },
  {
    id: "icp-2",
    categoryId: "icp-segmentation",
    question: "You're selling to IT and Finance. IT loves the product but Finance blocks the budget. How do you restructure your GTM motion?",
    order: 2
  },
  {
    id: "icp-3",
    categoryId: "icp-segmentation",
    question: "Your best customers are mid-market companies with 200-500 employees, but your outbound targets enterprise. What data do you need to convince leadership to shift ICP?",
    order: 3
  },
  {
    id: "icp-4",
    categoryId: "icp-segmentation",
    question: "Churn is 5% in companies with dedicated admins, 25% in companies without them. How does this change your targeting criteria?",
    order: 4
  },
  {
    id: "icp-5",
    categoryId: "icp-segmentation",
    question: "You discover 40% of your users come from a vertical you never targeted. How do you validate if this is signal or noise?",
    order: 5
  },
  {
    id: "icp-6",
    categoryId: "icp-segmentation",
    question: "Your product solves 10 use cases. How do you determine which one to lead with in messaging?",
    order: 6
  },

  // Pricing & Packaging (5 questions)
  {
    id: "pricing-1",
    categoryId: "pricing-packaging",
    question: "Your $99/user/month plan has 500 customers. Competitors just launched at $49/user/month. What's your analysis framework before reacting?",
    order: 1
  },
  {
    id: "pricing-2",
    categoryId: "pricing-packaging",
    question: "Expansion revenue is $0 because customers buy your highest tier immediately. Is this a pricing problem or a product problem?",
    order: 2
  },
  {
    id: "pricing-3",
    categoryId: "pricing-packaging",
    question: "Self-serve signup to paid conversion is 2%. Industry benchmark is 8%. List your top 3 diagnostic hypotheses.",
    order: 3
  },
  {
    id: "pricing-4",
    categoryId: "pricing-packaging",
    question: "Sales keeps discounting 30% to close deals. How do you determine if pricing is actually too high or if this is a sales execution issue?",
    order: 4
  },
  {
    id: "pricing-5",
    categoryId: "pricing-packaging",
    question: "You're launching usage-based pricing to replace seat-based. What metrics do you track in the first 90 days to validate the change?",
    order: 5
  },

  // Product Launch & Positioning (5 questions)
  {
    id: "launch-1",
    categoryId: "product-launch",
    question: "You have a feature launching in 6 weeks that took 18 months to build. Engineering says it's transformational. Customers never asked for it. What's your launch strategy?",
    order: 1
  },
  {
    id: "launch-2",
    categoryId: "product-launch",
    question: "Your SaaS product does what spreadsheets do, but automated. How do you position against \"free\"?",
    order: 2
  },
  {
    id: "launch-3",
    categoryId: "product-launch",
    question: "Analysts placed you in Category A. Your best customers use you to solve Category B problems. Which positioning do you choose and why?",
    order: 3
  },
  {
    id: "launch-4",
    categoryId: "product-launch",
    question: "You're launching a product in a category dominated by a player with 80% market share. They don't compete on price. What positioning angle do you test first?",
    order: 4
  },
  {
    id: "launch-5",
    categoryId: "product-launch",
    question: "Sales velocity is fastest when you lead with integration capabilities, not core product value. What does this tell you about your positioning?",
    order: 5
  },

  // Customer Acquisition & Conversion (8 questions)
  {
    id: "acquisition-1",
    categoryId: "customer-acquisition",
    question: "Free trial to paid conversion is 12%. Users who complete onboarding convert at 45%. Only 30% complete onboarding. Where do you invest first?",
    order: 1
  },
  {
    id: "acquisition-2",
    categoryId: "customer-acquisition",
    question: "Demo show rate is 60%. Of those who show, 70% want to buy. But you're only booking 50 demos/month. What's your constraint?",
    order: 2
  },
  {
    id: "acquisition-3",
    categoryId: "customer-acquisition",
    question: "Your PPC cost-per-click doubled in 90 days. Conversion rate stayed the same. Compete or pivot?",
    order: 3
  },
  {
    id: "acquisition-4",
    categoryId: "customer-acquisition",
    question: "Organic demo requests convert to customers at 40%. Paid demo requests convert at 8%. How do you diagnose why?",
    order: 4
  },
  {
    id: "acquisition-5",
    categoryId: "customer-acquisition",
    question: "You have $100K to spend on customer acquisition this quarter. Current CAC is $8K with LTV of $35K. How do you allocate the budget across channels?",
    order: 5
  },
  {
    id: "acquisition-6",
    categoryId: "customer-acquisition",
    question: "Enterprise deals take 9 months. Mid-market takes 3 months. Both have the same ACV. Which do you scale and what's your math?",
    order: 6
  },
  {
    id: "acquisition-7",
    categoryId: "customer-acquisition",
    question: "Your website converts at 5% for visitors from content, 0.5% from paid ads. Both cost the same per visitor. What's your next test?",
    order: 7
  },
  {
    id: "acquisition-8",
    categoryId: "customer-acquisition",
    question: "Inbound leads close at 25%. Outbound closes at 8% but outbound volume is 5x higher. Where does sales focus?",
    order: 8
  },

  // Expansion & Retention (6 questions)
  {
    id: "retention-1",
    categoryId: "expansion-retention",
    question: "NDR is 85%. New revenue is growing 40% YoY. Is your business healthy?",
    order: 1
  },
  {
    id: "retention-2",
    categoryId: "expansion-retention",
    question: "Logo retention is 90% but revenue retention is 75%. What's happening and how do you fix it?",
    order: 2
  },
  {
    id: "retention-3",
    categoryId: "expansion-retention",
    question: "Customers who integrate with your API have 95% retention. Those who don't have 60% retention. What's your GTM implication?",
    order: 3
  },
  {
    id: "retention-4",
    categoryId: "expansion-retention",
    question: "Your product has 8 modules. Customers using 1-2 modules churn at 30%. Those using 5+ churn at 5%. How does this change your onboarding strategy?",
    order: 4
  },
  {
    id: "retention-5",
    categoryId: "expansion-retention",
    question: "A customer downgraded from $100K to $20K/year. Churn risk or acceptable evolution?",
    order: 5
  },
  {
    id: "retention-6",
    categoryId: "expansion-retention",
    question: "Your expansion motion relies on land-and-expand. Lands are working but expands aren't happening. What are your top 3 diagnostic questions?",
    order: 6
  },

  // Channel & Distribution (5 questions)
  {
    id: "channel-1",
    categoryId: "channel-distribution",
    question: "Your product is sold through partnerships and direct sales. Partner deals are 40% of volume but 60% of CAC. What do you investigate?",
    order: 1
  },
  {
    id: "channel-2",
    categoryId: "channel-distribution",
    question: "You want to add a self-serve motion to your enterprise sales model. What's the first metric that tells you if it's cannibalizing or complementing?",
    order: 2
  },
  {
    id: "channel-3",
    categoryId: "channel-distribution",
    question: "Your reseller channel drives 30% of revenue but those customers churn 2x faster than direct customers. Continue or kill the channel?",
    order: 3
  },
  {
    id: "channel-4",
    categoryId: "channel-distribution",
    question: "Community-sourced leads close at 35%. Cold outbound closes at 5%. But outbound is predictable and community isn't. How do you balance investment?",
    order: 4
  },
  {
    id: "channel-5",
    categoryId: "channel-distribution",
    question: "You're considering a product-led growth motion. Your ACV is $60K and sales cycles are 6 months. Is PLG viable for you?",
    order: 5
  },

  // Sales Enablement & Pipeline (7 questions)
  {
    id: "sales-1",
    categoryId: "sales-enablement",
    question: "Win rate dropped from 30% to 20% but pipeline volume doubled. Is this good or bad?",
    order: 1
  },
  {
    id: "sales-2",
    categoryId: "sales-enablement",
    question: "Your sales team says they need more at-bats. Marketing says they need to close better. You have $50K to solve this. What do you fund?",
    order: 2
  },
  {
    id: "sales-3",
    categoryId: "sales-enablement",
    question: "Average deal size is $45K but your pricing starts at $12K/year. What's the implied sales motion and is it correct?",
    order: 3
  },
  {
    id: "sales-4",
    categoryId: "sales-enablement",
    question: "Sales velocity was 90 days, now it's 120 days. Deal size stayed the same. What changed and where do you look first?",
    order: 4
  },
  {
    id: "sales-5",
    categoryId: "sales-enablement",
    question: "MQL to SQL conversion is 15%. Industry average is 25%. What are the 3 most likely problems?",
    order: 5
  },
  {
    id: "sales-6",
    categoryId: "sales-enablement",
    question: "Your CRM shows 60% of opportunities stall at \"technical evaluation\" stage. What does this tell you about product marketing?",
    order: 6
  },
  {
    id: "sales-7",
    categoryId: "sales-enablement",
    question: "Closed-lost reason #1 is \"went with incumbent.\" Closed-lost reason #2 is \"no decision.\" Which is more fixable and how?",
    order: 7
  },

  // Competitive & Market Dynamics (4 questions)
  {
    id: "competitive-1",
    categoryId: "competitive-dynamics",
    question: "Your biggest competitor just made their product free for teams under 10 users. You charge $15/user/month. What's your response?",
    order: 1
  },
  {
    id: "competitive-2",
    categoryId: "competitive-dynamics",
    question: "A well-funded startup launched in your category with a $100M Series B. They're undercutting you on price by 60%. What's your 30-day plan?",
    order: 2
  },
  {
    id: "competitive-3",
    categoryId: "competitive-dynamics",
    question: "Gartner positioned you as a \"Niche Player.\" Your win rate against the \"Leader\" is 65%. How do you leverage this?",
    order: 3
  },
  {
    id: "competitive-4",
    categoryId: "competitive-dynamics",
    question: "Win/loss data shows you lose on price but win on product. Sales wants price cuts. What's your recommendation?",
    order: 4
  },

  // Metrics & Analysis (4 questions)
  {
    id: "metrics-1",
    categoryId: "metrics-analysis",
    question: "Pipeline coverage ratio is 5x. Win rate is 20%. Average sales cycle is 4 months. Will you hit this quarter's target?",
    order: 1
  },
  {
    id: "metrics-2",
    categoryId: "metrics-analysis",
    question: "CAC payback period is 18 months. LTV:CAC is 5:1. Is this efficient or inefficient? What else do you need to know?",
    order: 2
  },
  {
    id: "metrics-3",
    categoryId: "metrics-analysis",
    question: "Marketing contribution to pipeline went from 40% to 60% quarter-over-quarter, but total pipeline stayed flat. What happened?",
    order: 3
  },
  {
    id: "metrics-4",
    categoryId: "metrics-analysis",
    question: "Your funnel metrics: 10,000 visitors → 500 signups → 50 trials → 5 customers. Which conversion point has the highest ROI to optimize?",
    order: 4
  }
];

// Helper function to get questions by category
export function getQuestionsByCategory(categoryId: string): TestQuestion[] {
  return testQuestions
    .filter(q => q.categoryId === categoryId)
    .sort((a, b) => a.order - b.order);
}

// Helper function to get category by ID
export function getCategoryById(categoryId: string): TestCategory | undefined {
  return testCategories.find(c => c.id === categoryId);
}

// Mock user test progress
export interface UserTestProgress {
  categoryId: string;
  questionsAnswered: number;
  totalQuestions: number;
  score: number;
  completed: boolean;
  badgeEarned: boolean;
  completedAt?: Date;
}

export const mockUserProgress: UserTestProgress[] = [
  {
    categoryId: "icp-segmentation",
    questionsAnswered: 6,
    totalQuestions: 6,
    score: 85,
    completed: true,
    badgeEarned: true,
    completedAt: new Date("2024-02-20")
  },
  {
    categoryId: "pricing-packaging",
    questionsAnswered: 3,
    totalQuestions: 5,
    score: 0,
    completed: false,
    badgeEarned: false
  }
];

// Legacy exports for backward compatibility
export const mockTestChallenges: TestChallenge[] = [];
export const mockUserSubmissions: TestSubmission[] = [];

export const difficultyColors = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-orange-100 text-orange-800",
  expert: "bg-red-100 text-red-800"
};

export const categoryLabels: Record<string, string> = {
  "sales": "Sales",
  "marketing": "Marketing",
  "customer-success": "Customer Success",
  "product": "Product",
  "operations": "Operations",
  "strategy": "Strategy"
};

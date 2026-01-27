import { UserPreview } from "./user";

export type Category =
  | "Lead Generation"
  | "Conversion Optimization"
  | "Sales Enablement"
  | "Product-Market Fit"
  | "Pricing & Packaging"
  | "Attribution & Analytics"
  | "Customer Onboarding"
  | "Content Distribution";

export type ProblemStatus = "open" | "in_progress" | "solved";

export type CompanyStage =
  | "Pre-seed"
  | "Seed"
  | "Series A"
  | "Series B"
  | "Series C"
  | "Series D+"
  | "Enterprise";

export type GTMMotion = "PLG" | "Sales-led" | "Hybrid";

export interface Problem {
  id: string;
  title: string;
  description: string; // Rich text HTML
  category: Category;
  tags: string[];
  author: UserPreview;
  status: ProblemStatus;
  context: {
    industry: string;
    companyStage: CompanyStage;
    companySize: string;
    teamSize: number;
    gtmMotion: GTMMotion;
    targetMarket?: string;
    icp?: string;
    currentTools: string[];
  };
  constraints?: {
    budget?: string;
    timeline?: string;
    helpNeededBy?: Date;
  };
  metrics: {
    current: MetricValue[];
    target: MetricValue[];
  };
  engagement: {
    upvotes: number;
    views: number;
    solutionsCount: number;
    commentsCount: number;
    facingThisTooCount: number;
  };
  createdAt: Date;
  updatedAt: Date;
  isAnonymous?: boolean;
  isPinned?: boolean;
  isTrending?: boolean;
}

export interface MetricValue {
  name: string;
  value: string;
}

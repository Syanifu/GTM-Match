import { Category } from "@/types";

export const CATEGORY_COLORS: Record<Category, string> = {
  "Lead Generation": "bg-blue-500 text-white",
  "Conversion Optimization": "bg-green-500 text-white",
  "Sales Enablement": "bg-purple-500 text-white",
  "Product-Market Fit": "bg-orange-500 text-white",
  "Pricing & Packaging": "bg-pink-500 text-white",
  "Attribution & Analytics": "bg-cyan-500 text-white",
  "Customer Onboarding": "bg-indigo-500 text-white",
  "Content Distribution": "bg-amber-500 text-white",
};

export const CATEGORY_ICONS: Record<Category, string> = {
  "Lead Generation": "Users",
  "Conversion Optimization": "TrendingUp",
  "Sales Enablement": "Briefcase",
  "Product-Market Fit": "Target",
  "Pricing & Packaging": "DollarSign",
  "Attribution & Analytics": "BarChart3",
  "Customer Onboarding": "UserPlus",
  "Content Distribution": "Share2",
};

export const COMPANY_STAGES = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C",
  "Series D+",
  "Enterprise",
];

export const GTM_MOTIONS = ["PLG", "Sales-led", "Hybrid"];

export const INDUSTRIES = [
  "B2B SaaS",
  "Enterprise Software",
  "Developer Tools",
  "Marketing Software",
  "Sales Software",
  "Analytics Platform",
  "Cybersecurity",
  "FinTech",
  "HealthTech",
  "EdTech",
  "Other",
];

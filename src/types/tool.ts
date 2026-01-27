export type ToolPricing = "free" | "freemium" | "paid";

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  website: string;
  category: string[];
  pricing: ToolPricing;
  pricingDetails?: string;
  integrations: string[];
  features: string[];
  stats: {
    usageCount: number; // How many solutions use it
    winRate?: number; // Success rate in solutions
    avgRating?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

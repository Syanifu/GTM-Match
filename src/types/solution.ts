import { UserPreview } from "./user";

export type Difficulty = "easy" | "medium" | "hard";

export interface Solution {
  id: string;
  problemId: string;
  title: string;
  description: string; // Rich text HTML
  author: UserPreview;
  approach: string; // Rich text HTML
  implementation: {
    steps?: string[]; // Rich text
    toolsUsed: string[]; // Tool IDs or names
    timeToImplement: string;
    budget?: string;
    teamSizeNeeded?: number;
    difficulty: Difficulty;
  };
  results: {
    metricsBeforeAfter?: MetricComparison[];
    roi?: string;
    timeSaved?: string;
    costSavings?: string;
    customMetrics?: Record<string, string>;
    description: string; // Rich text
  };
  attachments?: Attachment[];
  upvotes: number;
  helpfulCount: number;
  commentsCount: number;
  isAccepted?: boolean; // If problem author marked as solution
  isVerified?: boolean; // If follow-up provided
  createdAt: Date;
  updatedAt: Date;
}

export interface MetricComparison {
  name: string;
  before: string;
  after: string;
}

export interface Attachment {
  id: string;
  type: "image" | "video" | "document";
  url: string;
  name: string;
  size?: number;
}

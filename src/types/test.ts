export type DifficultyLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type ChallengeCategory = "sales" | "marketing" | "customer-success" | "product" | "operations" | "strategy";

export interface TestChallenge {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  difficulty: DifficultyLevel;
  points: number;
  timeLimit?: number; // in minutes
  problem: string;
  expectedCriteria: string[]; // criteria for evaluating solutions
  hints?: string[];
  badge?: {
    id: string;
    name: string;
    icon: string;
  };
  totalAttempts: number;
  successRate: number;
  createdBy: string;
  createdAt: Date;
  isActive: boolean;
}

export interface TestSubmission {
  id: string;
  challengeId: string;
  userId: string;
  solution: string;
  submittedAt: Date;
  status: "pending" | "reviewing" | "approved" | "rejected";
  score?: number;
  feedback?: string;
  badgeAwarded?: boolean;
}

export interface UserTestStats {
  userId: string;
  challengesAttempted: number;
  challengesSolved: number;
  totalPoints: number;
  badgesEarned: string[];
  streak: number;
}

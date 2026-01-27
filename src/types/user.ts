export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  role: "user" | "moderator" | "admin";
  reputation: number;
  badges: Badge[];
  stats: {
    problemsPosted: number;
    solutionsProvided: number;
    upvotesReceived: number;
    acceptedSolutions: number;
  };
  expertise: string[]; // Tags
  social?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  joinedAt: Date;
}

export interface UserPreview {
  id: string;
  username: string;
  name: string;
  avatar?: string;
  reputation: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

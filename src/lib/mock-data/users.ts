import { User, UserPreview, Badge } from "@/types";

export const mockBadges: Badge[] = [
  {
    id: "1",
    name: "Early Adopter",
    description: "One of the first members to join GTM Match",
    icon: "🌟",
    earnedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Problem Solver",
    description: "Provided 10+ accepted solutions",
    icon: "✅",
    earnedAt: new Date("2024-02-01"),
  },
  {
    id: "3",
    name: "Helpful",
    description: "Received 50+ upvotes on solutions",
    icon: "👍",
    earnedAt: new Date("2024-03-10"),
  },
  {
    id: "4",
    name: "Expert",
    description: "Top contributor in a category",
    icon: "🏆",
    earnedAt: new Date("2024-04-01"),
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    username: "sarah_chen",
    email: "sarah@example.com",
    name: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "VP of Growth at Series B SaaS. Love solving CAC and conversion challenges.",
    role: "user",
    reputation: 2450,
    badges: [mockBadges[0], mockBadges[1], mockBadges[3]],
    stats: {
      problemsPosted: 8,
      solutionsProvided: 24,
      upvotesReceived: 156,
      acceptedSolutions: 12,
    },
    expertise: ["Lead Generation", "Conversion Optimization", "PLG"],
    social: {
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "@sarahchen",
    },
    joinedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    username: "mike_rodriguez",
    email: "mike@example.com",
    name: "Mike Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    bio: "Head of Sales at Enterprise Software. Helping teams scale their GTM motion.",
    role: "user",
    reputation: 1850,
    badges: [mockBadges[0], mockBadges[2]],
    stats: {
      problemsPosted: 12,
      solutionsProvided: 18,
      upvotesReceived: 98,
      acceptedSolutions: 8,
    },
    expertise: ["Sales Enablement", "Enterprise Sales", "Sales-led Growth"],
    social: {
      linkedin: "https://linkedin.com/in/mikerodriguez",
    },
    joinedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    username: "emily_park",
    email: "emily@example.com",
    name: "Emily Park",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    bio: "Marketing Ops Leader. Data-driven approach to attribution and analytics.",
    role: "user",
    reputation: 1620,
    badges: [mockBadges[2]],
    stats: {
      problemsPosted: 6,
      solutionsProvided: 15,
      upvotesReceived: 72,
      acceptedSolutions: 7,
    },
    expertise: ["Attribution & Analytics", "Marketing Operations", "Content Distribution"],
    joinedAt: new Date("2024-02-05"),
  },
  {
    id: "4",
    username: "alex_kumar",
    email: "alex@example.com",
    name: "Alex Kumar",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    bio: "Product-led Growth specialist. Built 0-1 PLG motions at 3 startups.",
    role: "user",
    reputation: 3100,
    badges: [mockBadges[0], mockBadges[1], mockBadges[2], mockBadges[3]],
    stats: {
      problemsPosted: 5,
      solutionsProvided: 32,
      upvotesReceived: 210,
      acceptedSolutions: 18,
    },
    expertise: ["Product-Market Fit", "PLG", "Onboarding", "Pricing & Packaging"],
    social: {
      linkedin: "https://linkedin.com/in/alexkumar",
      twitter: "@alexkumar",
      website: "https://alexkumar.com",
    },
    joinedAt: new Date("2024-01-10"),
  },
  {
    id: "5",
    username: "jessica_thompson",
    email: "jessica@example.com",
    name: "Jessica Thompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    bio: "Customer Success leader turned consultant. Passionate about retention and expansion.",
    role: "user",
    reputation: 980,
    badges: [mockBadges[2]],
    stats: {
      problemsPosted: 4,
      solutionsProvided: 9,
      upvotesReceived: 45,
      acceptedSolutions: 4,
    },
    expertise: ["Customer Onboarding", "Customer Success", "Retention"],
    joinedAt: new Date("2024-03-01"),
  },
];

export const mockUserPreviews: UserPreview[] = mockUsers.map((user) => ({
  id: user.id,
  username: user.username,
  name: user.name,
  avatar: user.avatar,
  reputation: user.reputation,
}));

// Helper function to get a random user preview
export const getRandomUserPreview = (): UserPreview => {
  return mockUserPreviews[Math.floor(Math.random() * mockUserPreviews.length)];
};

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find((user) => user.id === id);
};

// Helper function to get user preview by ID
export const getUserPreviewById = (id: string): UserPreview | undefined => {
  return mockUserPreviews.find((user) => user.id === id);
};

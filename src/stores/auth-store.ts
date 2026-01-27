import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => void;
}

// Mock user for development
const mockUser: User = {
  id: "user-1",
  username: "sarah_chen",
  email: "sarah@example.com",
  name: "Sarah Chen",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  bio: "VP of Growth with 8+ years scaling B2B SaaS companies. Passionate about data-driven growth strategies.",
  role: "user",
  reputation: 2847,
  badges: [
    {
      id: "badge-1",
      name: "Problem Solver",
      description: "Solved 50+ problems",
      icon: "trophy",
      tier: "gold",
      earnedAt: new Date("2024-01-15"),
    },
    {
      id: "badge-2",
      name: "Top Contributor",
      description: "Top 1% contributor this month",
      icon: "star",
      tier: "platinum",
      earnedAt: new Date("2024-02-01"),
    },
  ],
  stats: {
    problemsPosted: 23,
    solutionsProvided: 67,
    upvotesReceived: 1543,
    acceptedSolutions: 42,
  },
  expertise: [
    "Lead Generation",
    "Conversion Optimization",
    "Sales Enablement",
    "Attribution & Analytics",
  ],
  social: {
    linkedin: "https://linkedin.com/in/sarahchen",
    twitter: "https://twitter.com/sarahchen",
    website: "https://sarahchen.io",
  },
  joinedAt: new Date("2023-06-15"),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      signIn: async (email: string, password: string) => {
        set({ isLoading: true });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock authentication - accept any email/password for now
        set({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      signUp: async (data) => {
        set({ isLoading: true });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Create a new mock user
        const newUser: User = {
          id: `user-${Date.now()}`,
          username: data.username,
          email: data.email,
          name: data.name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
          role: "user",
          reputation: 0,
          badges: [],
          stats: {
            problemsPosted: 0,
            solutionsProvided: 0,
            upvotesReceived: 0,
            acceptedSolutions: 0,
          },
          expertise: [],
          joinedAt: new Date(),
        };

        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      signOut: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

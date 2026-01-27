import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import type { SupabaseUser, SupabaseUserStats } from "@/types/supabase";

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
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  initialize: () => Promise<void>;
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
      earnedAt: new Date("2024-01-15"),
    },
    {
      id: "badge-2",
      name: "Top Contributor",
      description: "Top 1% contributor this month",
      icon: "star",
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

// Helper to convert Supabase user to app User type
const convertSupabaseUser = (
  supabaseUser: SupabaseUser,
  stats: SupabaseUserStats | null
): User => ({
  id: supabaseUser.id,
  username: supabaseUser.username,
  email: supabaseUser.email,
  name: supabaseUser.name,
  avatar: supabaseUser.avatar,
  bio: supabaseUser.bio,
  contactNumber: supabaseUser.contact_number,
  currentCompany: supabaseUser.current_company,
  jobRole: supabaseUser.job_role,
  role: "user",
  reputation: supabaseUser.reputation || 0,
  badges: [],
  stats: stats
    ? {
        problemsPosted: stats.problems_posted,
        solutionsProvided: stats.solutions_provided,
        upvotesReceived: stats.upvotes_received,
        acceptedSolutions: stats.accepted_solutions,
      }
    : {
        problemsPosted: 0,
        solutionsProvided: 0,
        upvotesReceived: 0,
        acceptedSolutions: 0,
      },
  expertise: supabaseUser.expertise || [],
  social: {
    linkedin: supabaseUser.social_linkedin,
    twitter: supabaseUser.social_twitter,
    website: supabaseUser.social_website,
  },
  joinedAt: new Date(supabaseUser.created_at),
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Initialize auth state (call on app load)
      initialize: async () => {
        if (!isSupabaseConfigured()) {
          return; // Use mock auth
        }

        try {
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session?.user) {
            // Fetch user profile
            const { data: profile } = await supabase
              .from("users")
              .select("*")
              .eq("id", session.user.id)
              .single();

            // Fetch user stats
            const { data: stats } = await supabase
              .from("user_stats")
              .select("*")
              .eq("user_id", session.user.id)
              .single();

            if (profile) {
              set({
                user: convertSupabaseUser(profile, stats),
                isAuthenticated: true,
              });
            }
          }
        } catch (error) {
          console.error("Failed to initialize auth:", error);
        }
      },

      signIn: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          if (!isSupabaseConfigured()) {
            // Mock authentication
            await new Promise((resolve) => setTimeout(resolve, 1000));
            set({
              user: mockUser,
              isAuthenticated: true,
              isLoading: false,
            });
            return;
          }

          // Supabase authentication
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            // Fetch user profile
            const { data: profile } = await supabase
              .from("users")
              .select("*")
              .eq("id", data.user.id)
              .single();

            // Fetch user stats
            const { data: stats } = await supabase
              .from("user_stats")
              .select("*")
              .eq("user_id", data.user.id)
              .single();

            if (profile) {
              set({
                user: convertSupabaseUser(profile, stats),
                isAuthenticated: true,
                isLoading: false,
              });
            }
          }
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.message || "Failed to sign in");
        }
      },

      signUp: async (data) => {
        set({ isLoading: true });

        try {
          if (!isSupabaseConfigured()) {
            // Mock sign up
            await new Promise((resolve) => setTimeout(resolve, 1000));
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
            return;
          }

          // Supabase sign up
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
              data: {
                name: data.name,
                username: data.username,
              },
            },
          });

          if (authError) throw authError;

          if (authData.user) {
            // Profile is auto-created by database trigger
            // Fetch the created profile
            const { data: profile } = await supabase
              .from("users")
              .select("*")
              .eq("id", authData.user.id)
              .single();

            // Fetch user stats
            const { data: stats } = await supabase
              .from("user_stats")
              .select("*")
              .eq("user_id", authData.user.id)
              .single();

            if (profile) {
              set({
                user: convertSupabaseUser(profile, stats),
                isAuthenticated: true,
                isLoading: false,
              });
            }
          }
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.message || "Failed to sign up");
        }
      },

      signOut: async () => {
        if (isSupabaseConfigured()) {
          await supabase.auth.signOut();
        }
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateProfile: async (data) => {
        const currentUser = get().user;
        if (!currentUser) return;

        try {
          if (!isSupabaseConfigured()) {
            // Mock update
            set((state) => ({
              user: state.user ? { ...state.user, ...data } : null,
            }));
            return;
          }

          // Update Supabase profile
          const { error } = await supabase
            .from("users")
            .update({
              name: data.name,
              username: data.username,
              bio: data.bio,
              avatar: data.avatar,
              contact_number: data.contactNumber,
              current_company: data.currentCompany,
              job_role: data.jobRole,
              expertise: data.expertise,
              social_linkedin: data.social?.linkedin,
              social_twitter: data.social?.twitter,
              social_website: data.social?.website,
            })
            .eq("id", currentUser.id);

          if (error) throw error;

          // Update local state
          set((state) => ({
            user: state.user ? { ...state.user, ...data } : null,
          }));
        } catch (error: any) {
          throw new Error(error.message || "Failed to update profile");
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

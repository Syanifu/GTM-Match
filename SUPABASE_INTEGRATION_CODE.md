# 🔌 Supabase Integration Code

This guide provides the actual code to integrate Supabase authentication into your GTM Match application.

## Prerequisites

- Completed `SUPABASE_AUTH_SETUP.md` setup
- Supabase project created
- Environment variables configured
- `@supabase/supabase-js` package installed

---

## Step 1: Install Supabase Package

```bash
cd /Users/apple/gtm-match
npm install @supabase/supabase-js
```

---

## Step 2: Files Already Created

The following files have been created for you:

✅ `/src/lib/supabase/client.ts` - Supabase client instance
✅ `/src/types/supabase.ts` - TypeScript types for Supabase data

---

## Step 3: Update Auth Store with Supabase

Create a new version of your auth store that supports both Supabase and mock auth:

### File: `/src/stores/auth-store-supabase.ts`

```typescript
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

// Mock user for development (when Supabase not configured)
const mockUser: User = {
  id: "user-1",
  username: "sarah_chen",
  email: "sarah@example.com",
  name: "Sarah Chen",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  bio: "VP of Growth with 8+ years scaling B2B SaaS companies.",
  role: "user",
  reputation: 2847,
  badges: [],
  stats: {
    problemsPosted: 23,
    solutionsProvided: 67,
    upvotesReceived: 1543,
    acceptedSolutions: 42,
  },
  expertise: ["Lead Generation", "Conversion Optimization"],
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
  stats: stats ? {
    problemsPosted: stats.problems_posted,
    solutionsProvided: stats.solutions_provided,
    upvotesReceived: stats.upvotes_received,
    acceptedSolutions: stats.accepted_solutions,
  } : {
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
          const { data: { session } } = await supabase.auth.getSession();

          if (session?.user) {
            // Fetch user profile
            const { data: profile } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();

            // Fetch user stats
            const { data: stats } = await supabase
              .from('user_stats')
              .select('*')
              .eq('user_id', session.user.id)
              .single();

            if (profile) {
              set({
                user: convertSupabaseUser(profile, stats),
                isAuthenticated: true,
              });
            }
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error);
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
              .from('users')
              .select('*')
              .eq('id', data.user.id)
              .single();

            // Fetch user stats
            const { data: stats } = await supabase
              .from('user_stats')
              .select('*')
              .eq('user_id', data.user.id)
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
          throw new Error(error.message || 'Failed to sign in');
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
              .from('users')
              .select('*')
              .eq('id', authData.user.id)
              .single();

            // Fetch user stats
            const { data: stats } = await supabase
              .from('user_stats')
              .select('*')
              .eq('user_id', authData.user.id)
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
          throw new Error(error.message || 'Failed to sign up');
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
            .from('users')
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
            .eq('id', currentUser.id);

          if (error) throw error;

          // Update local state
          set((state) => ({
            user: state.user ? { ...state.user, ...data } : null,
          }));
        } catch (error: any) {
          throw new Error(error.message || 'Failed to update profile');
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

---

## Step 4: Add Auth Initialization

Update your root layout to initialize authentication on app load.

### File: `/src/app/layout.tsx`

Add this near the top of your root layout component:

```typescript
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";

export default function RootLayout({ children }) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

## Step 5: Create Auth Callback Route

Handle OAuth redirects and email confirmations.

### File: `/src/app/auth/callback/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/';

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return to sign in if there's an error
  return NextResponse.redirect(`${origin}/auth/signin?error=auth_callback_error`);
}
```

---

## Step 6: Create Password Reset Page

### File: `/src/app/auth/reset-password/page.tsx`

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isSupabaseConfigured()) {
    return (
      <div className="container max-w-md py-16">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Password reset is only available with Supabase authentication.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) throw error;

      toast.success("Password reset email sent! Check your inbox.");
      setEmail("");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md py-16">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/auth/signin">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </Link>
      </Button>

      <Card>
        <CardHeader className="text-center">
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your email and we'll send you a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReset} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Step 7: Switch to Supabase Auth

### Option A: Replace Existing Auth Store

```bash
# Backup current auth store
mv src/stores/auth-store.ts src/stores/auth-store-mock.ts.backup

# Create new auth store with Supabase
# Copy the code from Step 3 into src/stores/auth-store.ts
```

### Option B: Use Feature Flag

Keep both and toggle with environment variable:

```typescript
// src/stores/auth-store.ts
export { useAuthStore } from './auth-store-supabase';

// Or use mock:
// export { useAuthStore } from './auth-store-mock';
```

---

## Step 8: Test the Integration

### 8.1 Start Development Server

```bash
npm run dev
```

### 8.2 Test Sign Up

1. Go to `http://localhost:3000/auth/signup`
2. Fill in the form
3. Check Supabase dashboard for new user
4. Verify profile was created in `users` table

### 8.3 Test Sign In

1. Go to `http://localhost:3000/auth/signin`
2. Enter credentials
3. Should redirect to homepage as authenticated user

### 8.4 Test Profile

1. Click avatar → "My Profile"
2. Should load without 404 error
3. Click "Edit Profile"
4. Update fields
5. Save changes
6. Verify in Supabase dashboard

---

## Step 9: Deploy to Production

### 9.1 Add Environment Variables to Vercel

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_SITE_URL
```

### 9.2 Update Supabase Redirect URLs

In Supabase dashboard → Authentication → Settings:

```
Site URL: https://gtm-match.vercel.app

Redirect URLs:
https://gtm-match.vercel.app/auth/callback
https://gtm-match.vercel.app/auth/update-password
```

### 9.3 Deploy

```bash
git add .
git commit -m "Add Supabase authentication"
git push
```

Vercel will auto-deploy.

---

## Troubleshooting

### "Missing Supabase environment variables"

- Check `.env.local` file exists
- Verify variable names are correct
- Restart dev server after adding env vars

### Sign up succeeds but profile not created

- Check Supabase SQL Editor for trigger errors
- Verify `on_auth_user_created` trigger exists
- Check `handle_new_user` function exists

### Sign in works but profile data missing

- Check `users` table has data
- Verify `user_stats` table has row for user
- Check browser console for errors

### RLS errors in console

- Verify RLS policies are created
- Check user is authenticated
- Test with `anon` key only

---

## Next Steps

- ✅ Authentication working
- ⭐ Add password reset functionality
- ⭐ Add OAuth providers (Google, GitHub)
- ⭐ Implement forgot password flow
- ⭐ Add email change functionality
- ⭐ Set up database functions for complex queries
- ⭐ Add real-time subscriptions for notifications

---

**Need help?** Check `SUPABASE_AUTH_SETUP.md` for database setup and configuration details.

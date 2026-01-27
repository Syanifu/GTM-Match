# 🔐 Supabase Authentication Setup Guide

Complete guide to setting up Supabase authentication for GTM Match.

## Overview

This guide will help you integrate Supabase authentication into your GTM Match application, replacing the current mock authentication system with real user authentication.

## Prerequisites

- A Supabase account (free tier available)
- Node.js and npm installed
- Your GTM Match application

---

## Step 1: Create Supabase Project

### 1.1 Sign Up for Supabase

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub or create an account

### 1.2 Create a New Project

1. Click "New Project"
2. Choose your organization or create a new one
3. Fill in project details:
   - **Project Name**: gtm-match
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine for development
4. Click "Create new project"
5. Wait 2-3 minutes for project setup

---

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Project Settings** (gear icon)
2. Click **API** in the sidebar
3. You'll see two important keys:

```bash
# Project URL
https://xxxxxxxxxxxxx.supabase.co

# anon/public key
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# service_role key (keep secret!)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important**: Only use the `anon/public` key in your frontend. Never expose the `service_role` key.

---

## Step 3: Set Up Database Tables

### 3.1 Create Users Profile Table

Supabase automatically creates an `auth.users` table. We need a public `users` table for additional profile data.

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Paste this SQL:

```sql
-- Create users profile table
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  bio TEXT,
  contact_number TEXT,
  current_company TEXT,
  job_role TEXT,
  reputation INTEGER DEFAULT 0,
  expertise TEXT[] DEFAULT '{}',
  social_linkedin TEXT,
  social_twitter TEXT,
  social_website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on username for fast lookups
CREATE INDEX idx_users_username ON public.users(username);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read all profiles
CREATE POLICY "Users can view all profiles"
  ON public.users
  FOR SELECT
  USING (true);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, username, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at
CREATE TRIGGER on_users_updated
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
```

4. Click **Run** (F5)
5. You should see "Success. No rows returned"

### 3.2 Create User Stats Table

```sql
-- Create user stats table
CREATE TABLE public.user_stats (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  problems_posted INTEGER DEFAULT 0,
  solutions_provided INTEGER DEFAULT 0,
  upvotes_received INTEGER DEFAULT 0,
  accepted_solutions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read all stats
CREATE POLICY "Users can view all stats"
  ON public.user_stats
  FOR SELECT
  USING (true);

-- Policy: Users can update their own stats
CREATE POLICY "Users can update own stats"
  ON public.user_stats
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Auto-create stats for new users
CREATE OR REPLACE FUNCTION public.handle_new_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_user_created_stats
  AFTER INSERT ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_stats();
```

---

## Step 4: Configure Authentication Providers

### 4.1 Email Authentication (Default)

Email authentication is enabled by default. Configure settings:

1. Go to **Authentication** → **Settings**
2. Configure:
   - **Site URL**: `http://localhost:3000` (development)
   - **Redirect URLs**: Add `http://localhost:3000/auth/callback`
   - For production, add your Vercel URL

### 4.2 Email Confirmation (Optional)

By default, Supabase requires email confirmation. For development:

1. Go to **Authentication** → **Settings**
2. Scroll to **Email Auth**
3. Toggle "Enable email confirmations" OFF (for dev only!)
4. For production, keep this ON for security

### 4.3 Password Requirements

1. Go to **Authentication** → **Settings**
2. Scroll to **Password**
3. Set minimum password length (recommended: 8)

---

## Step 5: Install Supabase Client

In your GTM Match project:

```bash
cd /Users/apple/gtm-match
npm install @supabase/supabase-js
```

---

## Step 6: Configure Environment Variables

### 6.1 Create `.env.local` file

```bash
# In /Users/apple/gtm-match directory
touch .env.local
```

### 6.2 Add Supabase credentials

Open `.env.local` and add:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Site URL (change for production)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Important**:
- Replace with YOUR actual Supabase URL and anon key
- Never commit `.env.local` to git (it's already in `.gitignore`)

### 6.3 Add to Vercel (Production)

When deploying to Vercel:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add the same variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (use your production URL)
4. Click **Save**
5. Redeploy your app

---

## Step 7: Create Supabase Client

### 7.1 Create client utility

File: `/Users/apple/gtm-match/src/lib/supabase/client.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
```

### 7.2 Create auth types

File: `/Users/apple/gtm-match/src/types/supabase.ts`

```typescript
export interface SupabaseUser {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  contact_number?: string;
  current_company?: string;
  job_role?: string;
  reputation: number;
  expertise: string[];
  social_linkedin?: string;
  social_twitter?: string;
  social_website?: string;
  created_at: string;
  updated_at: string;
}

export interface SupabaseUserStats {
  user_id: string;
  problems_posted: number;
  solutions_provided: number;
  upvotes_received: number;
  accepted_solutions: number;
}
```

---

## Step 8: Update Auth Store (Zustand)

File: `/Users/apple/gtm-match/src/stores/auth-store.ts`

Replace the entire file with Supabase-integrated version (provided in next step).

---

## Step 9: Create Auth Pages

### 9.1 Update Sign In Page

File: `/Users/apple/gtm-match/src/app/auth/signin/page.tsx`

Update to use Supabase authentication methods.

### 9.2 Update Sign Up Page

File: `/Users/apple/gtm-match/src/app/auth/signup/page.tsx`

Update to use Supabase authentication and create user profiles.

### 9.3 Create Callback Handler

File: `/Users/apple/gtm-match/src/app/auth/callback/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL('/', request.url));
}
```

---

## Step 10: Test Authentication

### 10.1 Start Development Server

```bash
npm run dev
```

### 10.2 Test Sign Up

1. Go to `http://localhost:3000/auth/signup`
2. Enter:
   - Name: Test User
   - Username: testuser
   - Email: test@example.com
   - Password: TestPassword123
3. Click "Sign Up"
4. Check Supabase dashboard → Authentication → Users
5. You should see your new user!

### 10.3 Test Sign In

1. Go to `http://localhost:3000/auth/signin`
2. Enter your email and password
3. You should be redirected to homepage as authenticated user

### 10.4 Test Profile

1. Click your avatar in the navbar
2. Click "My Profile"
3. You should see your profile page (no more 404!)
4. Click "Edit Profile"
5. Update your information
6. Changes should save to Supabase database

---

## Step 11: Verify Database

1. Go to Supabase dashboard → **Table Editor**
2. Click **users** table
3. You should see your user profile data
4. Click **user_stats** table
5. You should see your stats (all zeros initially)

---

## Features Enabled

After setup, you'll have:

✅ **Email/Password Authentication**
- Sign up with email verification (optional)
- Sign in with email and password
- Secure password hashing
- Password reset functionality

✅ **User Profiles**
- Automatic profile creation on signup
- Username, name, bio
- Contact information
- Company and job role
- Social links (LinkedIn, Twitter, Website)
- Profile pictures
- Expertise tags

✅ **User Stats**
- Problems posted counter
- Solutions provided counter
- Upvotes received
- Accepted solutions

✅ **Session Management**
- Persistent sessions (stays logged in)
- Auto-refresh tokens
- Secure cookie-based storage

✅ **Row Level Security**
- Users can only edit their own profiles
- All profiles are publicly viewable
- Secure database access

---

## Optional: Email Templates

Customize Supabase email templates:

1. Go to **Authentication** → **Email Templates**
2. Customize:
   - Confirm signup
   - Magic link
   - Reset password
   - Email change confirmation

---

## Optional: OAuth Providers

Add social login (Google, GitHub, etc.):

1. Go to **Authentication** → **Providers**
2. Enable provider (e.g., Google)
3. Add OAuth credentials from provider
4. Update redirect URLs
5. Update sign-in page to show OAuth buttons

---

## Troubleshooting

### Users not being created in database

- Check SQL Editor for errors
- Verify trigger `on_auth_user_created` exists
- Check function `handle_new_user` exists

### RLS errors (Row Level Security)

- Verify policies are created correctly
- Check user has correct permissions
- Test with `anon` key (not service_role key)

### Environment variables not working

- Restart dev server after adding `.env.local`
- Verify variables start with `NEXT_PUBLIC_`
- Check for typos in variable names

### Email confirmation not working

- Check spam folder
- Verify SMTP settings in Supabase
- For development, disable email confirmation

---

## Security Best Practices

1. ✅ **Never expose service_role key** in frontend
2. ✅ **Use Row Level Security** for all tables
3. ✅ **Enable email confirmation** in production
4. ✅ **Use strong password requirements**
5. ✅ **Add rate limiting** for auth endpoints
6. ✅ **Enable 2FA** for admin accounts
7. ✅ **Regularly backup database**

---

## Production Checklist

Before deploying to production:

- [ ] Email confirmation enabled
- [ ] Strong password requirements set
- [ ] Redirect URLs updated with production domain
- [ ] Environment variables added to Vercel
- [ ] Test sign up/sign in on production
- [ ] Test password reset flow
- [ ] Verify RLS policies work correctly
- [ ] Set up database backups
- [ ] Configure rate limiting
- [ ] Add error monitoring (Sentry)

---

## Next Steps

1. ✅ Complete this setup guide
2. ✅ Test all authentication flows
3. ⭐ Implement password reset functionality
4. ⭐ Add OAuth providers (Google, GitHub)
5. ⭐ Implement email change functionality
6. ⭐ Add 2FA (two-factor authentication)
7. ⭐ Set up email notifications for new solutions
8. ⭐ Implement user roles (user, moderator, admin)

---

## Support

- **Supabase Docs**: https://supabase.com/docs/guides/auth
- **Next.js + Supabase**: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- **GitHub Issues**: Report bugs in your repo
- **Supabase Discord**: https://discord.supabase.com

---

**Ready to integrate?** Follow the code integration guide next to update your auth store and pages with Supabase authentication.

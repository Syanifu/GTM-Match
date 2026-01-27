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

export interface SupabaseAuthResponse {
  user: SupabaseUser | null;
  stats: SupabaseUserStats | null;
}

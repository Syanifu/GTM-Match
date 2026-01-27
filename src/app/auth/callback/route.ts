import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/";

  // If Supabase is not configured, redirect to home
  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/`);
  }

  if (code) {
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    } catch (error) {
      console.error("Auth callback error:", error);
    }
  }

  // Return to sign in if there's an error
  return NextResponse.redirect(
    `${origin}/auth/signin?error=auth_callback_error`
  );
}

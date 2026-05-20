import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: users, error } = await supabase
    .from('users')
    .select('name, email, industry, current_role, target_role, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }

  const header = 'name,email,industry,current_role,target_role,created_at';
  const rows = (users ?? []).map((u) =>
    [
      `"${(u.name ?? '').replace(/"/g, '""')}"`,
      `"${(u.email ?? '').replace(/"/g, '""')}"`,
      u.industry,
      `"${(u.current_role ?? '').replace(/"/g, '""')}"`,
      `"${(u.target_role ?? '').replace(/"/g, '""')}"`,
      u.created_at,
    ].join(',')
  );

  const csv = [header, ...rows].join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="gtm-match-emails.csv"',
    },
  });
}

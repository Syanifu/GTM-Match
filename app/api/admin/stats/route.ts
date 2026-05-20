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

  const { data: results, error } = await supabase.from('results').select(`
    total_score,
    band,
    created_at,
    users ( industry )
  `);

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }

  const rows = results ?? [];
  const totalUsers = rows.length;
  const avgScore =
    totalUsers > 0
      ? Math.round(rows.reduce((s, r) => s + r.total_score, 0) / totalUsers)
      : 0;

  const bandCounts: Record<string, number> = {};
  const industryCounts: Record<string, number> = {};
  const today = new Date().toDateString();
  let submissionsToday = 0;

  for (const r of rows) {
    bandCounts[r.band] = (bandCounts[r.band] ?? 0) + 1;
    const industry =
      (r.users as { industry?: string } | null)?.industry ?? 'unknown';
    industryCounts[industry] = (industryCounts[industry] ?? 0) + 1;
    if (new Date(r.created_at).toDateString() === today) submissionsToday++;
  }

  const topBand =
    Object.entries(bandCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';

  return NextResponse.json({
    totalUsers,
    avgScore,
    topBand,
    submissionsToday,
    industryBreakdown: industryCounts,
    bandCounts,
  });
}

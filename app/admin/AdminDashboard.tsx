'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StatsCards } from '@/components/admin/StatsCards';
import { IndustryBreakdown } from '@/components/admin/IndustryBreakdown';
import { ExportButton } from '@/components/admin/ExportButton';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

interface Stats {
  totalUsers: number;
  avgScore: number;
  topBand: string;
  submissionsToday: number;
  industryBreakdown: Record<string, number>;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => {
        if (!r.ok) throw new Error('Unauthorized');
        return r.json();
      })
      .then(setStats)
      .catch(() => setError('Failed to load stats'));
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-danger">{error}</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/admin/login">Back to login</Link>
        </Button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-fg-muted">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl">Admin dashboard</h1>
        <div className="flex gap-2">
          <ExportButton />
          <Button variant="ghost" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </div>
      <StatsCards
        totalUsers={stats.totalUsers}
        avgScore={stats.avgScore}
        topBand={stats.topBand}
        submissionsToday={stats.submissionsToday}
      />
      <IndustryBreakdown breakdown={stats.industryBreakdown} />
    </div>
  );
}

import { GlassCard } from '@/components/shared/GlassCard';

interface StatsCardsProps {
  totalUsers: number;
  avgScore: number;
  topBand: string;
  submissionsToday: number;
}

export function StatsCards({
  totalUsers,
  avgScore,
  topBand,
  submissionsToday,
}: StatsCardsProps) {
  const stats = [
    { label: 'Total submissions', value: totalUsers.toString() },
    { label: 'Average score', value: `${avgScore}%` },
    { label: 'Most common band', value: topBand },
    { label: 'Today', value: submissionsToday.toString() },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <GlassCard key={s.label} className="p-5">
          <p className="text-xs text-fg-muted">{s.label}</p>
          <p className="mt-2 font-mono text-2xl">{s.value}</p>
        </GlassCard>
      ))}
    </div>
  );
}

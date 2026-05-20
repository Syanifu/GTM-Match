import { GlassCard } from '@/components/shared/GlassCard';
import { INDUSTRY_LABELS } from '@/lib/constants';
import type { Industry } from '@/types';

interface IndustryBreakdownProps {
  breakdown: Record<string, number>;
}

export function IndustryBreakdown({ breakdown }: IndustryBreakdownProps) {
  const entries = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <GlassCard className="p-5">
      <h2 className="mb-4 text-lg">Industry breakdown</h2>
      <div className="space-y-3">
        {entries.map(([industry, count]) => (
          <div key={industry}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{INDUSTRY_LABELS[industry as Industry] ?? industry}</span>
              <span className="font-mono text-fg-muted">{count}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

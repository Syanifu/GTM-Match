import type { Band } from '@/types';
import { BAND_INTERPRETATIONS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';

interface ScoreHeroProps {
  total: number;
  band: Band;
}

export function ScoreHero({ total, band }: ScoreHeroProps) {
  return (
    <section className="text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
        Your score
      </p>
      <p className="mt-2 font-mono text-[96px] leading-none text-accent">{total}</p>
      <Badge className="mt-4 border-accent/30 bg-accent-dim text-accent hover:bg-accent-dim">
        {band}
      </Badge>
      <p className="mx-auto mt-4 max-w-md text-sm text-fg-muted">
        {BAND_INTERPRETATIONS[band]}
      </p>
    </section>
  );
}

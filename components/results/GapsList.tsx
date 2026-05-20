import type { Dimension, Question } from '@/types';
import { DIMENSION_LABELS } from '@/lib/constants';
import { GlassCard } from '@/components/shared/GlassCard';

interface GapsListProps {
  gaps: Dimension[];
  dimensions: Record<Dimension, number>;
  questions: Question[];
  answers: Record<string, 'a' | 'b' | 'c' | 'd'>;
}

export function GapsList({ gaps, dimensions, questions, answers }: GapsListProps) {
  return (
    <section>
      <h2 className="mb-4 text-lg">Top skill gaps</h2>
      <div className="space-y-4">
        {gaps.map((gap) => {
          const wrong = questions
            .filter((q) => q.dimension === gap && answers[q.id] !== q.correct)
            .slice(0, 2);

          return (
            <GlassCard key={gap} className="p-5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base">{DIMENSION_LABELS[gap]}</h3>
                <span className="font-mono text-sm text-accent">
                  {dimensions[gap]}%
                </span>
              </div>
              {wrong.length > 0 && (
                <ul className="mt-4 space-y-3 border-t border-border pt-4">
                  {wrong.map((q) => (
                    <li key={q.id} className="text-sm text-fg-muted">
                      <span className="block text-fg">{q.prompt}</span>
                      <span className="mt-1 block italic">{q.rationale}</span>
                    </li>
                  ))}
                </ul>
              )}
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}

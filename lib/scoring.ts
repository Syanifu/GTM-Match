import type { Question, Dimension, ScoreResult, Band } from '@/types';

const WEIGHTS: Record<Dimension, number> = {
  empathy: 0.25,
  gtm: 0.25,
  content: 0.2,
  technical: 0.2,
  credibility: 0.1,
};

export function scoreAssessment(
  questions: Question[],
  answers: Record<string, 'a' | 'b' | 'c' | 'd'>
): ScoreResult {
  const buckets: Record<Dimension, { correct: number; total: number }> = {
    empathy: { correct: 0, total: 0 },
    gtm: { correct: 0, total: 0 },
    content: { correct: 0, total: 0 },
    technical: { correct: 0, total: 0 },
    credibility: { correct: 0, total: 0 },
  };

  for (const q of questions) {
    buckets[q.dimension].total += 1;
    if (answers[q.id] === q.correct) buckets[q.dimension].correct += 1;
  }

  const dimensions = Object.fromEntries(
    Object.entries(buckets).map(([k, v]) => [
      k,
      v.total === 0 ? 0 : Math.round((v.correct / v.total) * 100),
    ])
  ) as Record<Dimension, number>;

  const total = Math.round(
    (Object.keys(WEIGHTS) as Dimension[]).reduce(
      (sum, d) => sum + dimensions[d] * WEIGHTS[d],
      0
    )
  );

  const band: Band =
    total >= 80
      ? 'DevRel-Ready'
      : total >= 60
        ? 'Transitioning'
        : total >= 40
          ? 'Early Stage'
          : 'Foundation First';

  const gaps = (Object.keys(dimensions) as Dimension[])
    .sort((a, b) => dimensions[a] - dimensions[b])
    .slice(0, 3);

  return { total, band, dimensions, gaps };
}

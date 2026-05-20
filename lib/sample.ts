import type { Industry, ScoreResult } from '@/types';
import { getQuestionsForIndustry } from '@/lib/questions';

export const SAMPLE_RESULT: ScoreResult = {
  total: 72,
  band: 'Transitioning',
  dimensions: {
    empathy: 80,
    gtm: 75,
    content: 70,
    technical: 60,
    credibility: 65,
  },
  gaps: ['technical', 'credibility', 'content'],
};

export const SAMPLE_INDUSTRY: Industry = 'devtools-apis';

export function getSampleQuestions() {
  return getQuestionsForIndustry(SAMPLE_INDUSTRY);
}

export const SAMPLE_ANSWERS: Record<string, 'a' | 'b' | 'c' | 'd'> = Object.fromEntries(
  getSampleQuestions().map((q) => [q.id, q.correct])
);

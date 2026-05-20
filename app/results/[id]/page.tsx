import { notFound } from 'next/navigation';
import { ScoreHero } from '@/components/results/ScoreHero';
import { RadarReport } from '@/components/results/RadarReport';
import { GapsList } from '@/components/results/GapsList';
import { ResourceCard } from '@/components/results/ResourceCard';
import { ShareLinkedIn } from '@/components/results/ShareLinkedIn';
import { getQuestionsForIndustry } from '@/lib/questions';
import { getResourcesForGaps } from '@/lib/resources';
import {
  SAMPLE_ANSWERS,
  SAMPLE_INDUSTRY,
  SAMPLE_RESULT,
  getSampleQuestions,
} from '@/lib/sample';
import type { Dimension, Industry, ResultRecord } from '@/types';
import { scoreAssessment } from '@/lib/scoring';
import { createAdminClient } from '@/lib/supabase/admin';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchResult(id: string): Promise<ResultRecord | null> {
  const supabase = createAdminClient();
  const { data: result, error } = await supabase
    .from('results')
    .select(
      `
      id,
      user_id,
      total_score,
      band,
      empathy_score,
      gtm_score,
      content_score,
      technical_score,
      credibility_score,
      created_at,
      users ( name, email, industry, current_role, target_role )
    `
    )
    .eq('id', id)
    .single();

  if (error || !result) return null;

  const { data: responses } = await supabase
    .from('responses')
    .select('question_id, answer, dimension, is_correct')
    .eq('user_id', result.user_id);

  const usersRaw = result.users;
  const users = Array.isArray(usersRaw) ? usersRaw[0] : usersRaw;

  return {
    ...result,
    band: result.band as ResultRecord['band'],
    users: users as ResultRecord['users'],
    responses: responses ?? [],
  } as ResultRecord;
}

export default async function ResultsPage({ params }: PageProps) {
  const { id } = await params;
  const isSample = id === 'sample';

  let total: number;
  let band: typeof SAMPLE_RESULT.band;
  let dimensions: Record<Dimension, number>;
  let gaps: Dimension[];
  let industry: Industry;
  let questions;
  let answers: Record<string, 'a' | 'b' | 'c' | 'd'>;

  if (isSample) {
    total = SAMPLE_RESULT.total;
    band = SAMPLE_RESULT.band;
    dimensions = SAMPLE_RESULT.dimensions;
    gaps = SAMPLE_RESULT.gaps;
    industry = SAMPLE_INDUSTRY;
    questions = getSampleQuestions();
    answers = {
      ...SAMPLE_ANSWERS,
      'tech-dev-3': 'c',
      'cred-wildcard': 'a',
    };
  } else {
    const data = await fetchResult(id);
    if (!data) notFound();

    const users = data.users as ResultRecord['users'];
    industry = users.industry as Industry;
    questions = getQuestionsForIndustry(industry);
    answers = Object.fromEntries(
      data.responses.map((r) => [r.question_id, r.answer as 'a' | 'b' | 'c' | 'd'])
    );
    const scored = scoreAssessment(questions, answers);
    total = data.total_score;
    band = data.band;
    dimensions = {
      empathy: data.empathy_score,
      gtm: data.gtm_score,
      content: data.content_score,
      technical: data.technical_score,
      credibility: data.credibility_score,
    };
    gaps = scored.gaps;
  }

  const resources = getResourcesForGaps(gaps, industry);

  return (
    <div className="mx-auto max-w-3xl space-y-12 px-4 py-12 sm:py-16">
      {isSample && (
        <p className="rounded-lg border border-border bg-surface/60 px-4 py-2 text-center text-sm text-fg-muted">
          Sample report — take the assessment for your real score.
        </p>
      )}
      <ScoreHero total={total} band={band} />
      <RadarReport dimensions={dimensions} />
      <GapsList
        gaps={gaps}
        dimensions={dimensions}
        questions={questions}
        answers={answers}
      />
      <section>
        <h2 className="mb-4 text-lg">Recommended resources</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {resources.map((r) => (
            <ResourceCard key={`${r.title}-${r.url}`} resource={r} />
          ))}
        </div>
      </section>
      <div className="flex justify-center pb-8">
        <ShareLinkedIn score={total} band={band} />
      </div>
    </div>
  );
}

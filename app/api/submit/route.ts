import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getQuestionsForIndustry } from '@/lib/questions';
import { scoreAssessment } from '@/lib/scoring';
import { sendReportEmail } from '@/lib/email';
import type { Industry, SubmitPayload } from '@/types';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmitPayload;
    const { name, email, currentRole, targetRole, industry, answers } = body;

    if (!name?.trim() || !email?.trim() || !industry || !answers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const questions = getQuestionsForIndustry(industry as Industry);
    const score = scoreAssessment(questions, answers);

    const supabase = createAdminClient();

    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        current_role: currentRole?.trim() || null,
        target_role: targetRole?.trim() || null,
        industry,
      })
      .select('id')
      .single();

    if (userError || !user) {
      console.error(userError);
      return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
    }

    const responseRows = questions.map((q) => ({
      user_id: user.id,
      question_id: q.id,
      answer: answers[q.id] ?? '',
      dimension: q.dimension,
      is_correct: answers[q.id] === q.correct,
    }));

    const { error: responsesError } = await supabase
      .from('responses')
      .insert(responseRows);

    if (responsesError) {
      console.error(responsesError);
      return NextResponse.json({ error: 'Failed to save responses' }, { status: 500 });
    }

    const { data: result, error: resultError } = await supabase
      .from('results')
      .insert({
        user_id: user.id,
        total_score: score.total,
        band: score.band,
        empathy_score: score.dimensions.empathy,
        gtm_score: score.dimensions.gtm,
        content_score: score.dimensions.content,
        technical_score: score.dimensions.technical,
        credibility_score: score.dimensions.credibility,
      })
      .select('id')
      .single();

    if (resultError || !result) {
      console.error(resultError);
      return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const resultUrl = `${appUrl}/results/${result.id}`;

    await sendReportEmail({
      to: email.trim(),
      name: name.trim(),
      total: score.total,
      band: score.band,
      dimensions: score.dimensions,
      gaps: score.gaps,
      resultUrl,
    });

    return NextResponse.json({ resultId: result.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

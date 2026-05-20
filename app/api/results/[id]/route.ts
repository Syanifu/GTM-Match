import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;

  if (id === 'sample') {
    return NextResponse.json({ sample: true });
  }

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
      users (
        name,
        email,
        industry,
        current_role,
        target_role
      )
    `
    )
    .eq('id', id)
    .single();

  if (error || !result) {
    return NextResponse.json({ error: 'Result not found' }, { status: 404 });
  }

  const { data: responses } = await supabase
    .from('responses')
    .select('question_id, answer, dimension, is_correct')
    .eq('user_id', result.user_id);

  return NextResponse.json({
    ...result,
    responses: responses ?? [],
  });
}

import { notFound } from 'next/navigation';
import { INDUSTRIES } from '@/lib/constants';
import type { Industry } from '@/types';
import { AssessmentFlow } from './AssessmentFlow';

interface PageProps {
  params: Promise<{ industry: string }>;
}

export default async function IndustryAssessmentPage({ params }: PageProps) {
  const { industry } = await params;
  if (!INDUSTRIES.includes(industry as Industry)) notFound();
  return <AssessmentFlow industry={industry as Industry} />;
}

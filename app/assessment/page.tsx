'use client';

import { useRouter } from 'next/navigation';
import { IndustrySelector } from '@/components/assessment/IndustrySelector';
import type { Industry } from '@/types';

export default function AssessmentPage() {
  const router = useRouter();

  function handleSelect(industry: Industry) {
    router.push(`/assessment/${industry}`);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <h1 className="text-center text-2xl sm:text-3xl">Choose your industry</h1>
      <p className="mx-auto mt-3 max-w-lg text-center text-sm text-fg-muted">
        Technical questions are tailored to your sector. You will answer 26 questions
        total.
      </p>
      <div className="mt-10">
        <IndustrySelector onSelect={handleSelect} />
      </div>
    </div>
  );
}

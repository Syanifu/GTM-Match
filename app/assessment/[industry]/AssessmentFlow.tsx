'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { getQuestionsForIndustry } from '@/lib/questions';
import { INDUSTRY_LABELS } from '@/lib/constants';
import type { Industry } from '@/types';
import { ProgressBar } from '@/components/assessment/ProgressBar';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { EmailGate } from '@/components/assessment/EmailGate';

interface AssessmentFlowProps {
  industry: Industry;
}

export function AssessmentFlow({ industry }: AssessmentFlowProps) {
  const router = useRouter();
  const questions = useMemo(() => getQuestionsForIndustry(industry), [industry]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'a' | 'b' | 'c' | 'd'>>({});
  const [showEmail, setShowEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const current = questions[index];
  const answered = answers[current?.id];

  const handleAnswer = useCallback(
    (id: 'a' | 'b' | 'c' | 'd') => {
      if (!current) return;
      setAnswers((prev) => ({ ...prev, [current.id]: id }));
      setTimeout(() => {
        if (index < questions.length - 1) {
          setIndex((i) => i + 1);
        } else {
          setShowEmail(true);
        }
      }, 300);
    },
    [current, index, questions.length]
  );

  async function handleSubmit(data: {
    name: string;
    email: string;
    currentRole: string;
    targetRole: string;
  }) {
    setLoading(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          industry,
          answers,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Submission failed');
      router.push(`/results/${json.resultId}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (showEmail) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12">
        <ProgressBar current={questions.length} total={questions.length} />
        <EmailGate onSubmit={handleSubmit} loading={loading} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <ProgressBar current={index + 1} total={questions.length} />
      <p className="mb-6 text-center font-mono text-xs text-fg-muted">
        {INDUSTRY_LABELS[industry]}
      </p>
      <AnimatePresence mode="wait">
        {current && (
          <QuestionCard
            key={current.id}
            question={current}
            selected={answered}
            onAnswer={handleAnswer}
            index={index}
            total={questions.length}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import type { Question } from '@/types';
import { AnswerOption } from '@/components/assessment/AnswerOption';
import { GlassCard } from '@/components/shared/GlassCard';

interface QuestionCardProps {
  question: Question;
  selected?: 'a' | 'b' | 'c' | 'd';
  onAnswer: (id: 'a' | 'b' | 'c' | 'd') => void;
  index: number;
  total: number;
}

export function QuestionCard({
  question,
  selected,
  onAnswer,
  index,
  total,
}: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <GlassCard className="p-6 sm:p-8">
        <p className="mb-2 font-mono text-xs text-fg-muted">
          Question {index + 1} of {total}
        </p>
        <h2 className="mb-6 text-lg sm:text-xl">{question.prompt}</h2>
        <div className="space-y-3">
          {question.options.map((opt) => (
            <AnswerOption
              key={opt.id}
              id={opt.id}
              text={opt.text}
              selected={selected === opt.id}
              onClick={() => onAnswer(opt.id)}
            />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}

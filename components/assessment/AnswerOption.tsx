'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnswerOptionProps {
  id: 'a' | 'b' | 'c' | 'd';
  text: string;
  selected: boolean;
  onClick: () => void;
}

export function AnswerOption({ id, text, selected, onClick }: AnswerOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full rounded-lg border p-4 text-left text-sm transition-all duration-150 ease-out',
        selected
          ? 'border-accent bg-accent-dim text-fg'
          : 'border-border bg-surface/40 text-fg hover:border-accent/50'
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded font-mono text-xs',
            selected ? 'bg-accent text-bg' : 'bg-surface text-fg-muted'
          )}
        >
          {selected ? <Check className="h-3.5 w-3.5" /> : id.toUpperCase()}
        </span>
        <span>{text}</span>
      </div>
    </button>
  );
}

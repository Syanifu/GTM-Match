'use client';

import type { Industry } from '@/types';
import { GlassCard } from '@/components/shared/GlassCard';
import { INDUSTRIES, INDUSTRY_LABELS, INDUSTRY_TAGLINES } from '@/lib/constants';

interface IndustrySelectorProps {
  onSelect: (industry: Industry) => void;
}

export function IndustrySelector({ onSelect }: IndustrySelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {INDUSTRIES.map((industry, i) => (
        <button
          key={industry}
          type="button"
          onClick={() => onSelect(industry)}
          className={`text-left transition-all duration-150 ease-out ${
            i >= 3 ? 'lg:col-span-1' : ''
          } ${i === 3 ? 'lg:col-start-1' : ''}`}
        >
          <GlassCard className="h-full p-6 hover:border-accent/40">
            <h3 className="text-base">{INDUSTRY_LABELS[industry]}</h3>
            <p className="mt-2 text-sm text-fg-muted">{INDUSTRY_TAGLINES[industry]}</p>
          </GlassCard>
        </button>
      ))}
    </div>
  );
}

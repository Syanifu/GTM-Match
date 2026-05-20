'use client';

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import type { Dimension } from '@/types';
import { DIMENSION_LABELS } from '@/lib/constants';
import { GlassCard } from '@/components/shared/GlassCard';

interface RadarReportProps {
  dimensions: Record<Dimension, number>;
}

export function RadarReport({ dimensions }: RadarReportProps) {
  const data = (Object.keys(dimensions) as Dimension[]).map((key) => ({
    dimension: DIMENSION_LABELS[key].split(' ')[0],
    score: dimensions[key],
    fullMark: 100,
  }));

  return (
    <GlassCard className="p-4 sm:p-6">
      <h2 className="mb-4 text-lg">Dimension breakdown</h2>
      <div className="h-72 min-h-[288px] w-full min-w-0 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fill: '#8A8A93', fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#8A8A93', fontSize: 10 }}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#00E0FF"
              fill="#00E0FF"
              fillOpacity={0.15}
              animationDuration={1200}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

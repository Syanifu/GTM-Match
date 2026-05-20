import { Loader2 } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';

export function JobListingComingSoon() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-lg items-center justify-center px-4 py-16">
      <GlassCard glow className="w-full p-10 text-center sm:p-12">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface/80">
          <Loader2
            className="h-7 w-7 animate-spin text-accent"
            strokeWidth={1.75}
            aria-hidden
          />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
          Job Listing
        </p>
        <h1 className="mt-3 text-2xl sm:text-3xl">Coming soon</h1>
        <p className="mx-auto mt-4 max-w-sm text-sm text-fg-muted">
          Curated DevRel, Developer Marketing, and Technical PMM roles — matched to
          your assessment profile.
        </p>
      </GlassCard>
    </section>
  );
}

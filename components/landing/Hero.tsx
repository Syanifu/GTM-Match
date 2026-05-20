import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:py-28">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-muted">
        Skill gap assessment
      </p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl">
        Are you ready for a technical GTM role?
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-fg-muted">
        Measure your fit for DevRel, Developer Marketing, and Technical PMM across
        five dimensions — then get a radar report and curated resources.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/assessment">Start assessment</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/results/sample">See sample report</Link>
        </Button>
      </div>
    </section>
  );
}

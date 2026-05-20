import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="border-t border-border bg-surface/40 py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-2xl">Know where you stand</h2>
        <p className="mt-3 text-fg-muted">
          26 questions. Five dimensions. One report you can share with hiring managers.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/assessment">Take the assessment</Link>
        </Button>
      </div>
    </section>
  );
}

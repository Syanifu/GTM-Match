import { GlassCard } from '@/components/shared/GlassCard';

const pains = [
  {
    title: 'Briefs, not snippets',
    body: 'You can write a brief but not a code snippet that proves the product works.',
  },
  {
    title: 'Funnels, not RAG',
    body: 'You know funnels but not RAG, webhooks, or what "five nines" actually means.',
  },
  {
    title: 'Invisible credibility',
    body: "Recruiters can't tell if you're real — your portfolio reads marketing, not technical GTM.",
  },
];

export function ProblemStatement() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="mb-10 text-center text-2xl">The transition gap</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {pains.map((p) => (
          <GlassCard key={p.title} className="p-6">
            <h3 className="mb-2 text-base">{p.title}</h3>
            <p className="text-sm text-fg-muted">{p.body}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

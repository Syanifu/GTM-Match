export function SocialProof() {
  const logos = ['Vercel', 'Stripe', 'Datadog', 'HashiCorp', 'Postman', 'Snowflake', 'Retool'];

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale">
        {logos.map((name) => (
          <div
            key={name}
            className="font-mono text-xs uppercase tracking-wider text-fg-muted"
          >
            {name}
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-fg-muted">
        Built with input from DevRel leaders at Vercel, Stripe, and Postman
      </p>
    </section>
  );
}

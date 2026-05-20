import Link from 'next/link';

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-mono text-sm tracking-[-0.02em] text-fg">
          GTM Match
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/assessment"
            className="text-sm text-fg-muted transition-colors duration-150 ease-out hover:text-fg"
          >
            Assessment
          </Link>
          <Link
            href="/jobs"
            className="text-sm text-fg-muted transition-colors duration-150 ease-out hover:text-fg"
          >
            Job Listing
          </Link>
          <Link
            href="/admin"
            className="text-sm text-fg-muted transition-colors duration-150 ease-out hover:text-fg"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

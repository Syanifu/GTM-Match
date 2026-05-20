'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="dark"
    className="toaster group"
    toastOptions={{
      classNames: {
        toast:
          'group toast group-[.toaster]:bg-surface group-[.toaster]:text-fg group-[.toaster]:border-border',
        description: 'group-[.toast]:text-fg-muted',
        actionButton: 'group-[.toast]:bg-accent group-[.toast]:text-bg',
        cancelButton: 'group-[.toast]:bg-surface group-[.toast]:text-fg-muted',
      },
    }}
    {...props}
  />
);

export { Toaster };

import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassCard({ children, className, glow }: GlassCardProps) {
  return (
    <div
      className={cn(
        'bg-surface/60 backdrop-blur-md border border-border rounded-lg shadow-card glass-border transition-all duration-150 ease-out',
        glow && 'shadow-glow',
        className
      )}
    >
      {children}
    </div>
  );
}

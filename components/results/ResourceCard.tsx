import { ExternalLink } from 'lucide-react';
import type { Resource } from '@/types';
import { GlassCard } from '@/components/shared/GlassCard';
import { Badge } from '@/components/ui/badge';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <GlassCard className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge variant="outline" className="mb-2 text-xs capitalize">
            {resource.type}
          </Badge>
          <h3 className="text-sm font-medium">{resource.title}</h3>
          <p className="mt-1 text-xs text-fg-muted">{resource.author}</p>
        </div>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-accent transition-colors duration-150 ease-out hover:text-accent-hover"
          aria-label={`Open ${resource.title}`}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </GlassCard>
  );
}

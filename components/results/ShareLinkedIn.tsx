'use client';

import type { Band } from '@/types';
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';

interface ShareLinkedInProps {
  score: number;
  band: Band;
}

export function ShareLinkedIn({ score, band }: ShareLinkedInProps) {
  const text = encodeURIComponent(
    `I scored ${score}/100 on GTM Match — ${band}. A skill gap assessment for marketers transitioning into technical GTM roles (DevRel, Developer Marketing, Technical PMM).`
  );
  const url = encodeURIComponent(
    process.env.NEXT_PUBLIC_APP_URL ?? 'https://gtmmatch.com'
  );
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`;

  return (
    <Button variant="outline" asChild>
      <a href={shareUrl} target="_blank" rel="noopener noreferrer">
        <Linkedin className="mr-2 h-4 w-4" />
        Share on LinkedIn
      </a>
    </Button>
  );
}

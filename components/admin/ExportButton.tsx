'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ExportButton() {
  return (
    <Button variant="outline" asChild>
      <a href="/api/admin/export" download="gtm-match-emails.csv">
        <Download className="mr-2 h-4 w-4" />
        Export emails (CSV)
      </a>
    </Button>
  );
}

import type { Metadata } from 'next';
import { JobListingComingSoon } from '@/components/jobs/JobListingComingSoon';

export const metadata: Metadata = {
  title: 'Job Listing — GTM Match',
  description: 'Technical GTM job listings — coming soon.',
};

export default function JobListingPage() {
  return <JobListingComingSoon />;
}

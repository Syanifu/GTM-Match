import { Hero } from '@/components/landing/Hero';
import { ProblemStatement } from '@/components/landing/ProblemStatement';
import { SocialProof } from '@/components/landing/SocialProof';
import { CTASection } from '@/components/landing/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemStatement />
      <SocialProof />
      <CTASection />
    </>
  );
}

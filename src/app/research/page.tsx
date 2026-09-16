import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import { ResearchAreas, ModelSelection, Limits } from '@/components/research/ResearchContent';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Open engineering questions in retrieval quality, calibrated refusal, domain representation, evaluation under drift and bounded agency — plus an honest account of what the technology cannot do.',
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research & methods"
        title={
          <>
            The questions we have not{' '}
            <span className="rb-gt2">answered yet</span>
          </>
        }
        lead="We are an engineering firm, not a lab. What we call research is the set of unresolved problems we keep hitting in production — and being straight about the ones we have not solved."
        tone="cyan"
        facts={[
          { k: '6', v: 'Active questions' },
          { k: '5', v: 'Model strategies' },
          { k: '6', v: 'Stated limits' },
        ]}
      />

      <ResearchAreas />
      <ModelSelection />
      <Limits />
      <CTASection />
    </>
  );
}

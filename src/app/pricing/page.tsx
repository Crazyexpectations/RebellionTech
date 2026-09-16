import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import PricingModels from '@/components/pricing/PricingModels';
import TheRule from '@/components/pricing/TheRule';
import { ComplexityTiers, CostFactors } from '@/components/pricing/TiersAndFactors';
import ProcessSection from '@/components/home/ProcessSection';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Process & Pricing',
  description:
    'Four engagement models, three complexity tiers, and the six factors that decide cost. Transparent INR ranges for custom AI system development.',
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Process & pricing"
        title={
          <>
            Ranges, not a price list —{' '}
            <span className="rb-gt">and the reasoning behind them</span>
          </>
        }
        lead="Custom intelligence has no standard SKU. What we can be precise about is how we structure engagements, what drives cost up or down, and what you own at the end."
        tone="brass"
        facts={[
          { k: '4', v: 'Engagement models' },
          { k: '3', v: 'Complexity tiers' },
          { k: '₹50K+', v: 'Entry point' },
        ]}
      />

      <PricingModels />
      <TheRule />
      <ComplexityTiers />
      <CostFactors />
      <ProcessSection />
      <CTASection />
    </>
  );
}

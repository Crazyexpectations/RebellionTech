import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Founders from '@/components/about/Founders';
import Philosophy from '@/components/about/Philosophy';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'About',
  description:
    'RebellionTech is an independent AI engineering practice founded and run by Aurin Desai. How the work is approached, where the lines are drawn, and who you actually deal with.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            A small firm that would rather be{' '}
            <span className="rb-gt">right than busy</span>
          </>
        }
        lead="RebellionTech is deliberately small. One engineer, a limited number of concurrent engagements, and nobody standing between you and the person building your system."
        facts={[
          { k: 'Direct', v: 'No account managers' },
          { k: '1:1', v: 'You talk to the builder' },
          { k: 'India', v: 'Working worldwide' },
        ]}
      />

      <Founders />
      <Philosophy />
      <CTASection />
    </>
  );
}

import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Founders from '@/components/about/Founders';
import Philosophy from '@/components/about/Philosophy';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'About',
  description:
    'RebellionTech is a two-person AI engineering firm founded by Garima Kalra and Aurin Desai. How we think, where we draw lines, and who you actually work with.',
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
        lead="RebellionTech is deliberately small. Two engineers, a limited number of concurrent engagements, and no layer of account management between you and the people building your system."
        facts={[
          { k: '2', v: 'Founders' },
          { k: 'Direct', v: 'No account managers' },
          { k: 'India', v: 'Working worldwide' },
        ]}
      />

      <Founders />
      <Philosophy />
      <CTASection />
    </>
  );
}

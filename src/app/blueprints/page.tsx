import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import BlueprintExplorer from '@/components/work/BlueprintExplorer';
import Section from '@/components/ui/Section';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Blueprints',
  description:
    'Six reference architectures for the AI systems we build — executive intelligence, hiring, knowledge assistants, content engines, operations copilots and wellness companions.',
};

export default function BlueprintsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reference architectures"
        title={
          <>
            What we build, described the way{' '}
            <span className="rb-gt2">an engineer would describe it</span>
          </>
        }
        lead="Six system archetypes covering most of what organisations actually ask for. Each one names the real problem, the part that is hard, and how every layer of the architecture answers it."
        tone="cyan"
        facts={[
          { k: '6', v: 'Archetypes' },
          { k: '3', v: 'Complexity tiers' },
          { k: '5', v: 'Layers each' },
        ]}
      />

      {/* Honesty note — this is not a portfolio of delivered client work. */}
      <Section bg="alt" lazy={false} style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div
          className="rb-reveal rb-card"
          style={{ padding: '1.4rem 1.7rem', borderColor: 'var(--am-a25)' }}
        >
          <p style={{ margin: 0, fontSize: '0.92rem' }}>
            <strong style={{ color: 'var(--am2)' }}>A note on what this page is.</strong> RebellionTech is a
            new firm, so these are blueprints rather than delivered case studies — the architectures we are
            built to ship, described in full. We would rather show you exactly how we think than dress up a
            portfolio we have not earned yet. Client work will appear here under its own heading, with names
            and numbers, once it exists and once those clients agree to it.
          </p>
        </div>
      </Section>

      <BlueprintExplorer />
      <CTASection />
    </>
  );
}

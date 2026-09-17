import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import CapabilityDeepDive from '@/components/systems/CapabilityDeepDive';
import PipelineShowcase from '@/components/systems/PipelineShowcase';
import Boundaries from '@/components/systems/Boundaries';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Systems',
  description:
    'The six layers we engineer in-house — custom models, system architecture, retrieval, multi-agent orchestration, evaluation and production MLOps — diagrammed end to end.',
};

export default function SystemsPage() {
  return (
    <>
      <PageHero
        eyebrow="What we build"
        title={
          <>
            Six layers, engineered in-house,{' '}
            <span className="rb-gt">diagrammed end to end</span>
          </>
        }
        lead="This page is the technical argument. If you want to know exactly what you would be paying for, and exactly where most AI projects fall apart, it is all here."
        facts={[
          { k: '6', v: 'Layers owned' },
          { k: '4', v: 'Core pipelines' },
          { k: '0', v: 'Black boxes' },
        ]}
      />

      <CapabilityDeepDive />
      <PipelineShowcase />
      <Boundaries />
      <CTASection />
    </>
  );
}

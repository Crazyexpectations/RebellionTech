import Hero from '@/components/home/Hero';
import TechMarquee from '@/components/home/TechMarquee';
import Manifesto from '@/components/home/Manifesto';
import Capabilities from '@/components/home/Capabilities';
import HowWeBuild from '@/components/home/HowWeBuild';
import Difference from '@/components/home/Difference';
import Principles from '@/components/home/Principles';
import ProcessSection from '@/components/home/ProcessSection';
import FAQ from '@/components/home/FAQ';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Manifesto />
      <Capabilities />
      <HowWeBuild />
      <Difference />
      <Principles />
      <ProcessSection />
      <FAQ />
      <CTASection />
    </>
  );
}

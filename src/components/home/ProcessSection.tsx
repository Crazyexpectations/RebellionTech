import Link from 'next/link';
import Section, { SectionHead } from '@/components/ui/Section';
import DiagramFrame from '@/components/diagrams/DiagramFrame';
import EngagementFlow from '@/components/diagrams/EngagementFlow';
import { INK } from '@/components/diagrams/primitives';

export default function ProcessSection() {
  return (
    <Section bg="alt" mesh>
      <SectionHead
        badge="How an engagement runs"
        badgeTone="brass"
        title={<>From first email to <span className="rb-gt3">running system</span></>}
        lead="Every phase has an exit condition. If a phase cannot clear it, we stop and say so rather than carrying the problem forward into the next one."
        maxWidth={700}
      />

      <div className="rb-reveal">
        <DiagramFrame
          title="Engagement timeline"
          minWidth={700}
          legend={[
            { label: 'Understand', color: INK.signal },
            { label: 'Build', color: INK.ember },
            { label: 'Harden', color: INK.emberLight },
            { label: 'Operate', color: INK.brass },
          ]}
          caption="Timings are typical, not contractual — a Tier 1 assistant can clear phases 02 to 05 in six weeks, while a Tier 3 platform will not. The audit in phase 01 is what tells us which one you are."
        >
          <EngagementFlow />
        </DiagramFrame>
      </div>

      <div
        className="rb-reveal rb-card"
        style={{ padding: '1.5rem 1.8rem', marginTop: '1.5rem', borderColor: 'var(--cy-a25)' }}
      >
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 360px', minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: '0.92rem' }}>
              <strong style={{ color: 'var(--cy2)' }}>Phase 01 stands alone.</strong> The architecture audit
              is a self-contained deliverable. Take the document, build it yourself, or take it to another
              firm. There is no obligation attached and no pitch at the end.
            </p>
          </div>
          <Link href="/pricing/" className="rb-btn rb-btn-ghost rb-btn-sm" style={{ flexShrink: 0 }}>
            See engagement models
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </Section>
  );
}

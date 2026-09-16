import Link from 'next/link';
import { NAV } from '@/lib/site';

export default function NotFound() {
  return (
    <section
      className="rb-subpage-bg rb-noise"
      style={{
        minHeight: '82svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'calc(var(--nav-h) + 4rem) 1.35rem 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="rb-floor" style={{ opacity: 0.6 }} aria-hidden />
      <div
        aria-hidden
        className="rb-glow-blob"
        style={{
          top: '35%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 560,
          height: 420,
          background: 'radial-gradient(ellipse, rgba(239,59,35,.13) 0%, transparent 70%)',
          animation: 'rbPulse 9s ease-in-out infinite',
        }}
      />

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 620 }}>
        <div
          aria-hidden
          className="rb-gt-anim rb-u0"
          style={{
            fontFamily: 'var(--fd)',
            fontWeight: 700,
            fontSize: 'clamp(5rem, 18vw, 11rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.06em',
            marginBottom: '1rem',
          }}
        >
          404
        </div>

        <h1 className="rb-u1" style={{ fontSize: 'clamp(1.5rem, 3.4vw, 2.2rem)', marginBottom: '0.9rem' }}>
          This route does not exist
        </h1>

        <p className="rb-u2" style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>
          Either the link is wrong or we moved something. Here is everything that does exist.
        </p>

        <div
          className="rb-u3"
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: '2rem' }}
        >
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className="rb-btn rb-btn-ghost rb-btn-sm">
              {l.label}
            </Link>
          ))}
        </div>

        <Link href="/" className="rb-btn rb-btn-fill rb-u4">
          Back to the start
        </Link>
      </div>
    </section>
  );
}

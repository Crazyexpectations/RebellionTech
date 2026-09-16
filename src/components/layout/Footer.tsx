'use client';

import Link from 'next/link';
import { SITE, FOOTER_NAV, CTA } from '@/lib/site';
import { LogoWord } from './Logo';

function FooterLink({ label, href, accent = 'var(--em3)' }: { label: string; href: string; accent?: string }) {
  return (
    <Link
      href={href}
      style={{
        fontSize: '0.86rem',
        color: 'var(--t3)',
        textDecoration: 'none',
        display: 'block',
        transition: 'color .2s, padding-left .25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = accent;
        e.currentTarget.style.paddingLeft = '7px';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--t3)';
        e.currentTarget.style.paddingLeft = '0';
      }}
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--bg2)',
        borderTop: '1px solid var(--b)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="rb-line-top" />

      <div
        aria-hidden
        className="rb-glow-blob"
        style={{
          bottom: '-38%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 820,
          height: 420,
          background: 'radial-gradient(ellipse, rgba(239,59,35,.06) 0%, transparent 70%)',
        }}
      />

      <div className="rb-inner" style={{ padding: '4.5rem 1.35rem 0' }}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .ft-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.8fr; gap: 3rem; margin-bottom: 3.5rem; }
            @media (max-width: 940px) { .ft-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; } }
            @media (max-width: 560px) { .ft-grid { grid-template-columns: 1fr; gap: 2.25rem; } }
            .ft-bottom { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
          `,
          }}
        />

        <div className="ft-grid">
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '1.1rem', textDecoration: 'none' }}>
              <LogoWord size={32} />
            </Link>
            <p style={{ fontSize: '0.86rem', lineHeight: 1.8, maxWidth: 270, marginBottom: '1.3rem' }}>
              {SITE.shortPitch}
            </p>

            {SITE.status.open && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '5px 13px',
                  borderRadius: 999,
                  border: '1px solid var(--cy-a25)',
                  background: 'var(--cy-a08)',
                  marginBottom: '1.25rem',
                }}
              >
                <span className="rb-dot-live" />
                <span style={{ fontSize: '0.66rem', fontFamily: 'var(--fm)', color: 'var(--cy2)', letterSpacing: '0.06em' }}>
                  {SITE.status.label}
                </span>
              </div>
            )}

            <div>
              <a href={`mailto:${SITE.email}`} className="rb-btn rb-btn-ghost rb-btn-sm">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
                {SITE.email}
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <div className="rb-label" style={{ marginBottom: '1rem' }}>Explore</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.72rem' }}>
              {FOOTER_NAV.explore.map((l) => (
                <FooterLink key={l.href} {...l} />
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="rb-label" style={{ marginBottom: '1rem' }}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.72rem' }}>
              {FOOTER_NAV.company.map((l) => (
                <FooterLink key={l.href} {...l} accent="var(--am2)" />
              ))}
            </div>
          </div>

          {/* CTA card */}
          <div className="rb-card rb-corner" style={{ padding: '1.6rem', borderColor: 'var(--em-a25)' }}>
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                left: '15%',
                right: '15%',
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(255,122,92,.55), transparent)',
              }}
            />
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'var(--em-a08)',
                border: '1px solid var(--em-a25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.9rem',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff7a5c" strokeWidth="2">
                <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--t1)', marginBottom: '0.5rem' }}>
              Start with the truth
            </div>
            <p style={{ fontSize: '0.82rem', marginBottom: '1.25rem', lineHeight: 1.7 }}>
              Skip the discovery call. Get a written architecture audit in 72 hours — including whether you need us at all.
            </p>
            <Link href={CTA.href} className="rb-btn rb-btn-fill rb-btn-sm" style={{ width: '100%' }}>
              {CTA.label} →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ft-bottom" style={{ borderTop: '1px solid var(--b)', padding: '1.5rem 0 2rem' }}>
          <span style={{ fontSize: '0.74rem', fontFamily: 'var(--fm)', color: 'var(--t3)' }}>
            © {year} {SITE.legalName}. All rights reserved.
          </span>
          <span className="rb-hide-mob" style={{ fontSize: '0.68rem', fontFamily: 'var(--fm)', color: 'var(--t3)', letterSpacing: '0.06em' }}>
            Engineered in-house — no templates, no wrappers
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
            <a href={`mailto:${SITE.email}`} style={{ fontSize: '0.74rem', color: 'var(--t3)' }}>
              Contact
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                border: '1px solid var(--b2)',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--t2)',
                transition: 'all .22s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--em3)';
                e.currentTarget.style.color = 'var(--em3)';
                e.currentTarget.style.background = 'var(--em-a08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--b2)';
                e.currentTarget.style.color = 'var(--t2)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div
          aria-hidden
          style={{
            textAlign: 'center',
            overflow: 'hidden',
            lineHeight: 0.74,
            fontFamily: 'var(--fd)',
            fontWeight: 700,
            letterSpacing: '-0.055em',
            fontSize: 'clamp(3rem, 13vw, 11rem)',
            userSelect: 'none',
            pointerEvents: 'none',
            backgroundImage: 'linear-gradient(180deg, rgba(255,122,92,.085), rgba(255,122,92,0))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: 'translateY(16%)',
            whiteSpace: 'nowrap',
          }}
        >
          REBELLIONTECH
        </div>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV, CTA, SITE } from '@/lib/site';
import { useScrollY } from '@/lib/hooks';
import { LogoWord } from './Logo';
import Magnetic from '@/components/fx/Magnetic';

/** Small ⌘K affordance. Renders a neutral label until we know the platform,
 *  so server and client markup always agree. */
function PaletteButton() {
  const [mod, setMod] = useState<string | null>(null);

  useEffect(() => {
    setMod(/Mac|iPhone|iPad/.test(navigator.platform ?? navigator.userAgent) ? '⌘' : 'Ctrl');
  }, []);

  return (
    <button
      className="nv-palette"
      onClick={() => window.dispatchEvent(new Event('rb:palette'))}
      aria-label="Open command palette"
      title="Search and jump to anything"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" strokeLinecap="round" />
      </svg>
      <kbd>{mod === 'Ctrl' ? 'Ctrl K' : `${mod ?? '⌘'}K`}</kbd>
    </button>
  );
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollY(24);
  const pathname = usePathname();

  // Close the drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Lock the page behind the drawer, and restore on close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, '');

  return (
    <>
      <style
        // Inline <style> with quoted content values must be injected this way —
        // React escapes quotes in server-rendered <style> children, which
        // breaks the rule and then mismatches on hydration.
        dangerouslySetInnerHTML={{
          __html: `
          .nv-desk { display: none; }
          .nv-cta  { display: none; }
          .nv-palette { display: none; }
          .nv-burger { display: inline-flex; }
          @media (min-width: 900px) {
            .nv-desk { display: flex; align-items: center; gap: 2px; }
            .nv-cta  { display: inline-flex; }
            .nv-palette { display: inline-flex; }
            .nv-burger { display: none; }
          }
          .nv-palette {
            align-items: center; gap: 7px; cursor: pointer;
            background: rgba(255,255,255,.03); border: 1px solid var(--b2);
            border-radius: 999px; padding: 6px 11px; color: var(--t3);
            transition: border-color .2s, color .2s, background .2s;
          }
          .nv-palette:hover {
            border-color: var(--em-a25); color: var(--em3); background: var(--em-a08);
          }
          .nv-palette kbd {
            font-family: var(--fm); font-size: 0.64rem; letter-spacing: 0.04em;
          }
          .nv-link {
            position: relative; padding: 7px 14px; border-radius: 999px;
            font-size: 0.86rem; font-weight: 500; color: var(--t2);
            text-decoration: none; white-space: nowrap;
            transition: color .22s, background .22s;
          }
          .nv-link:hover { color: var(--t1); background: rgba(255,255,255,.045); }
          .nv-link.is-active { color: var(--em3); }
          .nv-link.is-active::after {
            content: ''; position: absolute; left: 50%; bottom: 1px;
            width: 14px; height: 2px; border-radius: 2px;
            transform: translateX(-50%);
            background: linear-gradient(90deg, var(--em2), var(--am2));
          }
          .nv-bar {
            display: block; height: 1.6px; border-radius: 2px; background: var(--t1);
            transition: transform .32s cubic-bezier(.16,1,.3,1), opacity .2s, width .3s;
          }
          .nv-drawer-item {
            display: flex; align-items: baseline; gap: 14px;
            padding: 0.85rem 0; text-decoration: none;
            border-bottom: 1px solid var(--b);
            opacity: 0; transform: translateY(14px);
            animation: rbUp .5s cubic-bezier(.16,1,.3,1) forwards;
          }
        `,
        }}
      />

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 400,
          transition: 'background .4s, backdrop-filter .4s, border-color .4s',
          background: scrolled || open ? 'rgba(5,5,8,0.86)' : 'transparent',
          backdropFilter: scrolled || open ? 'blur(24px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled || open ? 'blur(24px) saturate(160%)' : 'none',
          borderBottom: `1px solid ${scrolled || open ? 'var(--b)' : 'transparent'}`,
        }}
      >
        <div
          style={{
            maxWidth: 1220,
            margin: '0 auto',
            padding: '0.85rem 1.35rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <Link href="/" aria-label={`${SITE.name} — home`} style={{ textDecoration: 'none', flexShrink: 0 }}>
            <LogoWord size={34} />
          </Link>

          <nav className="nv-desk" aria-label="Primary">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nv-link${isActive(l.href) ? ' is-active' : ''}`}
                aria-current={isActive(l.href) ? 'page' : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <PaletteButton />

          {/* The class lives on this wrapper, not on Magnetic — Magnetic sets
              display inline, which would beat `display: none` from the class
              and leave the CTA crowding the burger on phones. */}
          <span className="nv-cta">
            <Magnetic strength={9} radius={55}>
              <Link href={CTA.href} className="rb-btn rb-btn-fill rb-btn-sm">
                {CTA.shortLabel}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Magnetic>
          </span>

          <button
            className="nv-burger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{
              background: 'none',
              border: '1px solid var(--b2)',
              borderRadius: 10,
              cursor: 'pointer',
              width: 44,
              height: 44,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              flexShrink: 0,
            }}
          >
            <span className="nv-bar" style={{ width: 18, transform: open ? 'rotate(45deg) translate(4px,4.6px)' : 'none' }} />
            <span className="nv-bar" style={{ width: 18, opacity: open ? 0 : 1 }} />
            <span className="nv-bar" style={{ width: 18, transform: open ? 'rotate(-45deg) translate(4px,-4.6px)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ──────────────────────────────────────────── */}
      {open && (
        <div
          id="rb-mobile-nav"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 390,
            paddingTop: 84,
            background: 'rgba(5,5,8,0.97)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            overflowY: 'auto',
            animation: 'rbIn .28s ease-out',
          }}
        >
          <div className="rb-floor" style={{ opacity: 0.5 }} />

          <nav
            aria-label="Mobile"
            style={{ position: 'relative', padding: '1.5rem 1.6rem 3rem', maxWidth: 560, margin: '0 auto' }}
          >
            {NAV.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className="nv-drawer-item"
                style={{ animationDelay: `${0.05 + i * 0.06}s` }}
              >
                <span
                  style={{
                    fontFamily: 'var(--fm)',
                    fontSize: '0.64rem',
                    color: isActive(l.href) ? 'var(--em3)' : 'var(--t3)',
                    flexShrink: 0,
                    width: 24,
                  }}
                >
                  0{i + 1}
                </span>
                <span style={{ minWidth: 0 }}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--fd)',
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      letterSpacing: '-0.03em',
                      color: isActive(l.href) ? 'var(--em3)' : 'var(--t1)',
                      lineHeight: 1.2,
                    }}
                  >
                    {l.label}
                  </span>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--t3)', marginTop: 2 }}>
                    {l.desc}
                  </span>
                </span>
              </Link>
            ))}

            <div style={{ marginTop: '2rem', animation: 'rbUp .5s cubic-bezier(.16,1,.3,1) .45s both' }}>
              <Link href={CTA.href} className="rb-btn rb-btn-fill" style={{ width: '100%' }}>
                {CTA.label}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <a
                href={`mailto:${SITE.email}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginTop: '1rem',
                  fontFamily: 'var(--fm)',
                  fontSize: '0.78rem',
                  color: 'var(--t3)',
                }}
              >
                {SITE.email}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

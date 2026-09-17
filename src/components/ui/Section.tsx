import type { ReactNode, CSSProperties } from 'react';

type Bg = 'base' | 'alt' | 'deep';

const BG: Record<Bg, string> = {
  base: 'var(--bg)',
  alt: 'var(--bg2)',
  deep: 'var(--bg3)',
};

interface SectionProps {
  children: ReactNode;
  id?: string;
  bg?: Bg;
  /** Adds the masked hexagon texture. */
  hex?: boolean;
  /** Adds the ambient three-colour gradient wash. */
  mesh?: boolean;
  /** Draws a glowing hairline across the top edge. */
  topGlow?: boolean;
  /** Skips paint work while off-screen. Leave off for the first section. */
  lazy?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Constrain inner content to this width instead of the 1220px default. */
  narrow?: boolean;
  /** Short label for the on-page section rail. Requires `id`. */
  rail?: string;
}

/** Standard page section: consistent rhythm, background layers and max-width. */
export default function Section({
  children,
  id,
  bg = 'base',
  hex = false,
  mesh = false,
  topGlow = false,
  lazy = true,
  className = '',
  style,
  narrow = false,
  rail,
}: SectionProps) {
  const classes = [
    'rb-sec',
    lazy && 'rb-cv',
    hex && 'rb-hex-bg',
    mesh && 'rb-mesh',
    topGlow && 'rb-top-glow',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      id={id}
      data-rail={rail}
      className={classes}
      style={{ background: BG[bg], position: 'relative', overflow: 'hidden', ...style }}
    >
      <div className={narrow ? 'rb-narrow' : 'rb-inner'}>{children}</div>
    </section>
  );
}

interface SectionHeadProps {
  badge?: string;
  badgeTone?: 'ember' | 'cyan' | 'brass';
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  maxWidth?: number;
  className?: string;
}

const TONE: Record<string, string> = {
  ember: 'rb-badge',
  cyan: 'rb-badge rb-badge-cyan',
  brass: 'rb-badge rb-badge-brass',
};

/** Badge + heading + lead paragraph, with the spacing already right. */
export function SectionHead({
  badge,
  badgeTone = 'ember',
  title,
  lead,
  align = 'left',
  maxWidth = 640,
  className = '',
}: SectionHeadProps) {
  return (
    <div
      className={`rb-reveal ${className}`}
      style={{
        maxWidth,
        marginBottom: '3.25rem',
        marginInline: align === 'center' ? 'auto' : undefined,
        textAlign: align,
      }}
    >
      {badge && (
        <span className={TONE[badgeTone]} style={{ marginBottom: '1.1rem' }}>
          {badge}
        </span>
      )}
      <h2 style={{ marginBottom: lead ? '0.85rem' : 0 }}>{title}</h2>
      {lead && <p style={{ fontSize: '0.97rem' }}>{lead}</p>}
    </div>
  );
}

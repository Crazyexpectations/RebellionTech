interface Props {
  size?: number;
  /** Animate the spark on hover of an ancestor with class `rb-logo-host`. */
  interactive?: boolean;
}

/**
 * The mark: a hexagonal core (a system) split by a bolt (the rebellion).
 * Drawn as inline SVG so it stays crisp, themeable and free of a network
 * request.
 */
export function LogoMark({ size = 34, interactive = true }: Props) {
  return (
    <span
      className={interactive ? 'rb-logo-host' : undefined}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: 'linear-gradient(135deg, #c41e0f 0%, #ef3b23 55%, #f0b64a 100%)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 0 22px rgba(239,59,35,.4)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M10 1.6 17.2 5.8v8.4L10 18.4 2.8 14.2V5.8L10 1.6Z"
          stroke="rgba(255,255,255,.85)"
          strokeWidth="1.25"
          fill="rgba(255,255,255,.12)"
          strokeLinejoin="round"
        />
        {/* The break */}
        <path
          d="M11.2 5.4 8.1 10.2h3.1l-2.4 4.4"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function LogoWord({ size = 34, showText = true }: Props & { showText?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <LogoMark size={size} />
      {showText && (
        <span
          style={{
            fontFamily: 'var(--fd)',
            fontWeight: 700,
            fontSize: size * 0.46,
            color: 'var(--t1)',
            letterSpacing: '-0.035em',
            whiteSpace: 'nowrap',
          }}
        >
          Rebellion<span style={{ color: 'var(--em3)' }}>Tech</span>
        </span>
      )}
    </span>
  );
}

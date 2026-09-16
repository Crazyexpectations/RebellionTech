import type { ReactNode } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   Shared SVG vocabulary for every architecture diagram on the site.
   Coordinates are authored in a fixed viewBox; the frame scales them.
   ═══════════════════════════════════════════════════════════════════ */

export const INK = {
  ember: '#ef3b23',
  emberLight: '#ff7a5c',
  signal: '#2ad4f0',
  brass: '#f0b64a',
  muted: '#5c5c75',
} as const;

/** Hex -> rgba(), so one accent drives fill, stroke and glow together. */
export function rgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

/* ── Node ─────────────────────────────────────────────────────────── */

interface NodeProps {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  accent?: string;
  /** Reveal ordering — becomes a transition delay. */
  delay?: number;
  /** Solid nodes read as the "main path"; ghost nodes as supporting. */
  variant?: 'solid' | 'ghost';
  children?: ReactNode;
}

export function DNode({
  x,
  y,
  w,
  h,
  title,
  sub,
  accent = INK.ember,
  delay = 0,
  variant = 'solid',
  children,
}: NodeProps) {
  const fill = variant === 'solid' ? rgba(accent, 0.07) : 'rgba(255,255,255,0.015)';
  const stroke = variant === 'solid' ? rgba(accent, 0.34) : 'rgba(255,255,255,0.09)';
  const titleY = sub ? y + h / 2 - 4 : y + h / 2 + 4;

  return (
    <g className="d-node d-fade" style={{ transitionDelay: `${delay}s` }}>
      <rect x={x} y={y} width={w} height={h} rx={9} fill={fill} stroke={stroke} strokeWidth={1} />
      {/* Left accent bar marks the node's lane */}
      <rect x={x} y={y + 6} width={2.5} height={h - 12} rx={1.5} fill={accent} opacity={0.85} />

      <text
        className="d-title"
        x={x + w / 2}
        y={titleY}
        textAnchor="middle"
        fontSize={13}
        dominantBaseline="middle"
      >
        {title}
      </text>
      {sub && (
        <text
          className="d-sub"
          x={x + w / 2}
          y={y + h / 2 + 13}
          textAnchor="middle"
          fontSize={9}
          dominantBaseline="middle"
        >
          {sub}
        </text>
      )}
      {children}
    </g>
  );
}

/* ── Lane / group container ───────────────────────────────────────── */

interface LaneProps {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  accent?: string;
  delay?: number;
}

export function DLane({ x, y, w, h, label, accent = INK.muted, delay = 0 }: LaneProps) {
  return (
    <g className="d-fade" style={{ transitionDelay: `${delay}s` }}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        fill="rgba(255,255,255,0.012)"
        stroke={rgba(accent, 0.16)}
        strokeWidth={1}
        strokeDasharray="4 5"
      />
      <text className="d-sub" x={x + 12} y={y + 16} fontSize={8.5} letterSpacing="0.16em">
        {label.toUpperCase()}
      </text>
    </g>
  );
}

/* ── Edge ─────────────────────────────────────────────────────────── */

interface EdgeProps {
  d: string;
  accent?: string;
  /** Must be >= the real path length for the draw-in to complete. */
  len?: number;
  delay?: number;
  /** Adds travelling packets along the path once drawn. */
  flow?: boolean;
  dashed?: boolean;
  opacity?: number;
}

export function DEdge({
  d,
  accent = INK.ember,
  len = 520,
  delay = 0,
  flow = false,
  dashed = false,
  opacity = 0.5,
}: EdgeProps) {
  return (
    <>
      <path
        className="d-edge"
        d={d}
        stroke={rgba(accent, opacity)}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeDasharray={dashed ? '5 5' : undefined}
        style={
          {
            '--len': len,
            animationDelay: `${delay}s`,
          } as React.CSSProperties
        }
      />
      {flow && (
        <path
          className="d-flow"
          d={d}
          stroke={rgba(accent, 0.95)}
          strokeWidth={2}
          strokeLinecap="round"
          style={{ transitionDelay: `${delay + 0.6}s`, animationDelay: `${delay}s` }}
        />
      )}
    </>
  );
}

/* ── Arrowhead ────────────────────────────────────────────────────── */

type Dir = 'right' | 'left' | 'down' | 'up';

/**
 * Standalone arrowhead. Drawn as its own fading element rather than an SVG
 * marker so it appears *after* its edge finishes drawing.
 */
export function DArrow({
  x,
  y,
  dir = 'right',
  accent = INK.ember,
  delay = 0,
  size = 5,
}: {
  x: number;
  y: number;
  dir?: Dir;
  accent?: string;
  delay?: number;
  size?: number;
}) {
  const s = size;
  const points: Record<Dir, string> = {
    right: `${x},${y - s} ${x + s * 1.6},${y} ${x},${y + s}`,
    left: `${x},${y - s} ${x - s * 1.6},${y} ${x},${y + s}`,
    down: `${x - s},${y} ${x},${y + s * 1.6} ${x + s},${y}`,
    up: `${x - s},${y} ${x},${y - s * 1.6} ${x + s},${y}`,
  };
  return (
    <polygon
      className="d-fade"
      points={points[dir]}
      fill={rgba(accent, 0.8)}
      style={{ transitionDelay: `${delay}s` }}
    />
  );
}

/* ── Edge caption ─────────────────────────────────────────────────── */

export function DLabel({
  x,
  y,
  text,
  accent = INK.muted,
  delay = 0,
  anchor = 'middle',
}: {
  x: number;
  y: number;
  text: string;
  accent?: string;
  delay?: number;
  anchor?: 'start' | 'middle' | 'end';
}) {
  const pad = 5;
  const w = text.length * 5.1 + pad * 2;
  return (
    <g className="d-fade" style={{ transitionDelay: `${delay}s` }}>
      <rect
        x={anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x}
        y={y - 8}
        width={w}
        height={16}
        rx={8}
        fill="#0b0b13"
        stroke={rgba(accent, 0.22)}
        strokeWidth={0.8}
      />
      <text
        x={anchor === 'middle' ? x : anchor === 'end' ? x - w / 2 : x + w / 2}
        y={y + 0.5}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={8}
        fill={accent}
        letterSpacing="0.05em"
      >
        {text}
      </text>
    </g>
  );
}

/* ── Step chip (numbered) ─────────────────────────────────────────── */

export function DStep({
  x,
  y,
  n,
  accent = INK.ember,
  delay = 0,
}: {
  x: number;
  y: number;
  n: string;
  accent?: string;
  delay?: number;
}) {
  return (
    <g className="d-fade" style={{ transitionDelay: `${delay}s` }}>
      <circle cx={x} cy={y} r={11} fill={rgba(accent, 0.12)} stroke={rgba(accent, 0.4)} strokeWidth={1} />
      <text
        x={x}
        y={y + 0.5}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={9}
        fill={accent}
        fontWeight={600}
      >
        {n}
      </text>
    </g>
  );
}

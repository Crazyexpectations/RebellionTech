'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NAV, CTA, SITE } from '@/lib/site';

interface Command {
  id: string;
  label: string;
  hint: string;
  group: 'Pages' | 'Deep links' | 'Actions';
  keywords: string;
  run: (router: ReturnType<typeof useRouter>) => void;
}

const COMMANDS: Command[] = [
  {
    id: 'home',
    label: 'Home',
    hint: 'The short version',
    group: 'Pages',
    keywords: 'home start index main landing',
    run: (r) => r.push('/'),
  },
  ...NAV.map((n) => ({
    id: n.href,
    label: n.label,
    hint: n.desc,
    group: 'Pages' as const,
    keywords: `${n.label} ${n.desc}`.toLowerCase(),
    run: (r: ReturnType<typeof useRouter>) => r.push(n.href),
  })),
  {
    id: 'audit',
    label: CTA.label,
    hint: 'Request a written audit, back in 72 hours',
    group: 'Actions',
    keywords: 'audit request quote start contact hire brief',
    run: (r) => r.push(CTA.href),
  },
  {
    id: 'architecture',
    label: 'Reference architecture',
    hint: 'The five layers, diagrammed',
    group: 'Deep links',
    keywords: 'architecture diagram layers system stack structure',
    run: (r) => r.push('/#architecture'),
  },
  {
    id: 'retrieval',
    label: 'Retrieval pipeline',
    hint: 'How a question becomes a cited answer',
    group: 'Deep links',
    keywords: 'retrieval rag search grounding citation hallucination vector',
    run: (r) => r.push('/systems/#retrieval'),
  },
  {
    id: 'agents',
    label: 'Agent orchestration',
    hint: 'Multi-agent topology that stays debuggable',
    group: 'Deep links',
    keywords: 'agents orchestration multi-agent tools autonomy critic',
    run: (r) => r.push('/systems/#agents'),
  },
  {
    id: 'training',
    label: 'Training pipeline',
    hint: 'Collect through deploy, with the feedback loop',
    group: 'Deep links',
    keywords: 'training data pipeline model fine-tune evaluate deploy mlops',
    run: (r) => r.push('/systems/#training'),
  },
  {
    id: 'evaluation',
    label: 'Evaluation & release gate',
    hint: 'The four checks that can veto a release',
    group: 'Deep links',
    keywords: 'evaluation safety guardrails testing red team quality gate refusal',
    run: (r) => r.push('/systems/#evaluation'),
  },
  {
    id: 'estimate',
    label: 'Estimate an engagement',
    hint: 'Answer five questions, see a range',
    group: 'Actions',
    keywords: 'estimate cost price budget calculator quote how much',
    run: (r) => r.push('/pricing/#estimate'),
  },
  {
    id: 'email',
    label: `Email ${SITE.email}`,
    hint: 'Opens your mail app',
    group: 'Actions',
    keywords: 'email contact mail reach get in touch',
    run: () => {
      window.location.href = `mailto:${SITE.email}`;
    },
  },
  {
    id: 'copy-email',
    label: 'Copy email address',
    hint: SITE.email,
    group: 'Actions',
    keywords: 'copy email clipboard address',
    run: () => {
      navigator.clipboard?.writeText(SITE.email).catch(() => {});
    },
  },
];

/** True when every character of `q` appears in `h`, in order. */
function subsequence(q: string, h: string) {
  let i = 0;
  for (const ch of h) {
    if (ch === q[i]) i++;
    if (i === q.length) return true;
  }
  return i === q.length;
}

/**
 * Relevance score, higher is better, 0 means no match.
 *
 * A direct substring of the label always outranks a loose subsequence hit,
 * so typing "retr" puts "Retrieval pipeline" above a command whose
 * description merely happens to contain those letters in order.
 */
function score(query: string, cmd: Command) {
  if (!query) return 1;
  const q = query.toLowerCase().trim();
  const label = cmd.label.toLowerCase();
  const keys = cmd.keywords.toLowerCase();
  const compact = q.replace(/\s+/g, '');

  if (label.startsWith(q)) return 1000;

  const at = label.indexOf(q);
  if (at > -1) return 800 - at;

  // Word-start match: "ref arch" finds "Reference architecture".
  if (label.split(/\s+/).some((w) => w.startsWith(q))) return 700;

  if (keys.includes(q)) return 500;
  if (subsequence(compact, label.replace(/\s+/g, ''))) return 300;
  if (subsequence(compact, keys.replace(/\s+/g, ''))) return 100;

  return 0;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const searching = query.trim().length > 0;

  const results = useMemo(() => {
    // Browsing: keep the groups contiguous so the headers make sense.
    if (!searching) {
      const order = { Pages: 0, 'Deep links': 1, Actions: 2 } as const;
      return [...COMMANDS].sort((a, b) => order[a.group] - order[b.group]);
    }
    // Searching: pure relevance order, so group headers are suppressed below.
    return COMMANDS.map((c) => ({ c, s: score(query, c) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((r) => r.c);
  }, [query, searching]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActive(0);
  }, []);

  const runCommand = useCallback(
    (cmd: Command) => {
      close();
      cmd.run(router);
    },
    [close, router]
  );

  // Global open shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }

      // Bare "/" opens too, but never while the visitor is typing somewhere.
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el as HTMLElement | null)?.isContentEditable;

      if (e.key === '/' && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };

    // Lets the nav button (and anything else) open the palette without
    // needing shared state across the tree.
    const onRequest = () => setOpen(true);

    window.addEventListener('keydown', onKey);
    window.addEventListener('rb:palette', onRequest);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('rb:palette', onRequest);
    };
  }, [open]);

  // Lock scroll and focus the field while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open]);

  // Keep the highlighted row in view as it moves.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  useEffect(() => setActive(0), [query]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (results.length ? (a + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = results[active];
      if (cmd) runCommand(cmd);
    }
  };

  let lastGroup = '';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={close}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 700,
        background: 'rgba(3,3,6,.72)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '12vh 1.25rem 2rem',
        animation: 'rbIn .18s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        className="rb-frost"
        style={{
          width: '100%',
          maxWidth: 580,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,.7), 0 0 60px rgba(239,59,35,.1)',
          animation: 'rbUp .28s cubic-bezier(.16,1,.3,1) both',
        }}
      >
        {/* Search field */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--b)',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--em3)"
            strokeWidth="2"
            style={{ flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a page, diagram or action…"
            aria-label="Search commands"
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--t1)',
              fontFamily: 'var(--f)',
              fontSize: '0.95rem',
              minWidth: 0,
            }}
          />

          <kbd
            style={{
              fontFamily: 'var(--fm)',
              fontSize: '0.62rem',
              color: 'var(--t3)',
              border: '1px solid var(--b2)',
              borderRadius: 5,
              padding: '2px 6px',
              flexShrink: 0,
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} style={{ maxHeight: '52vh', overflowY: 'auto', padding: '0.5rem' }}>
          {results.length === 0 && (
            <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.86rem', margin: 0 }}>
                Nothing matches that. Try &ldquo;pricing&rdquo;, &ldquo;retrieval&rdquo; or
                &ldquo;audit&rdquo;.
              </p>
            </div>
          )}

          {results.map((cmd, i) => {
            const showGroup = !searching && cmd.group !== lastGroup;
            lastGroup = cmd.group;
            const isActive = i === active;

            return (
              <div key={cmd.id}>
                {showGroup && (
                  <div className="rb-label" style={{ padding: '0.7rem 0.85rem 0.4rem' }}>
                    {cmd.group}
                  </div>
                )}
                <button
                  data-active={isActive}
                  onClick={() => runCommand(cmd)}
                  onPointerMove={() => setActive(i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '0.7rem 0.85rem',
                    borderRadius: 9,
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    font: 'inherit',
                    background: isActive ? 'var(--em-a08)' : 'transparent',
                    transition: 'background .15s',
                  }}
                >
                  <span style={{ minWidth: 0 }}>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.89rem',
                        fontWeight: 500,
                        color: isActive ? 'var(--em3)' : 'var(--t1)',
                      }}
                    >
                      {cmd.label}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.76rem',
                        color: 'var(--t3)',
                        marginTop: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {cmd.hint}
                    </span>
                  </span>

                  {isActive && (
                    <span
                      aria-hidden
                      style={{
                        fontFamily: 'var(--fm)',
                        fontSize: '0.6rem',
                        color: 'var(--em3)',
                        flexShrink: 0,
                        letterSpacing: '0.08em',
                      }}
                    >
                      ↵
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer legend */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.1rem',
            padding: '0.7rem 1.25rem',
            borderTop: '1px solid var(--b)',
            fontFamily: 'var(--fm)',
            fontSize: '0.62rem',
            color: 'var(--t3)',
            flexWrap: 'wrap',
          }}
        >
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}

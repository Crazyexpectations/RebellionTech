'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface Item {
  id: string;
  label: string;
}

/** Turns "evaluation" into "Evaluation", "agent-loop" into "Agent loop". */
function prettify(id: string) {
  const s = id.replace(/[-_]/g, ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Fixed vertical rail that tracks which `section[id]` is in view and lets the
 * reader jump between them. Only appears on wide screens and only when a page
 * has enough anchored sections to be worth navigating.
 *
 * Labels come from the section's own `data-rail` attribute when present, so
 * markup stays the single source of truth.
 */
export default function SectionRail() {
  const pathname = usePathname();
  const [items, setItems] = useState<Item[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    // Let the page finish mounting before measuring it.
    const t = setTimeout(() => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));

      if (sections.length < 3) {
        setItems([]);
        return;
      }

      setItems(
        sections.map((s) => ({
          id: s.id,
          label: s.dataset.rail || prettify(s.id),
        }))
      );

      // rootMargin pins the "active" band to the upper third of the viewport,
      // which matches where a reader's eye actually sits.
      const io = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible[0]) setActiveId(visible[0].target.id);
        },
        { rootMargin: '-15% 0px -60% 0px', threshold: 0 }
      );

      sections.forEach((s) => io.observe(s));
      cleanup = () => io.disconnect();
    }, 250);

    return () => {
      clearTimeout(t);
      cleanup?.();
    };
  }, [pathname]);

  if (items.length < 3) return null;

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* The content column is 1220px. Below this width the expanded
             labels would sit on top of it, so the rail stays hidden. */
          .rail { display: none; }
          @media (min-width: 1560px) {
            .rail {
              display: flex; flex-direction: column; gap: 2px;
              position: fixed; right: 24px; top: 50%; transform: translateY(-50%);
              z-index: 200;
            }
          }
          .rail-item {
            display: flex; align-items: center; justify-content: flex-end; gap: 10px;
            background: none; border: none; cursor: pointer; font: inherit;
            padding: 5px 0; color: var(--t3);
            transition: color .25s;
          }
          .rail-item:hover { color: var(--t1); }
          .rail-label {
            font-family: var(--fm); font-size: 0.66rem; letter-spacing: 0.04em;
            white-space: nowrap; opacity: 0; transform: translateX(6px);
            transition: opacity .25s, transform .25s;
          }
          .rail:hover .rail-label,
          .rail-item[aria-current="true"] .rail-label { opacity: 1; transform: none; }
          .rail-tick {
            width: 22px; height: 2px; border-radius: 2px; flex-shrink: 0;
            background: var(--b3); transition: background .25s, width .25s;
          }
          .rail-item:hover .rail-tick { width: 30px; background: var(--t2); }
          .rail-item[aria-current="true"] .rail-tick {
            width: 34px; background: var(--em2); box-shadow: 0 0 10px rgba(239,59,35,.6);
          }
          .rail-item[aria-current="true"] { color: var(--em3); }
        `,
        }}
      />

      <nav className="rail" aria-label="On this page">
        {items.map((it) => (
          <button
            key={it.id}
            className="rail-item"
            aria-current={activeId === it.id}
            onClick={() => jump(it.id)}
            title={it.label}
          >
            <span className="rail-label">{it.label}</span>
            <span className="rail-tick" aria-hidden />
          </button>
        ))}
      </nav>
    </>
  );
}

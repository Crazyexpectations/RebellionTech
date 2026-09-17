'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Fades and lifts page content on every route change.
 *
 * Keying on the pathname is what drives it: React tears down the old subtree
 * and mounts a new one, so the CSS animation replays. Pages here are static,
 * so there is no state worth preserving across the swap.
 */
export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="rb-route">
      {children}
    </div>
  );
}

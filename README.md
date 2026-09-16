# RebellionTech

Marketing site for RebellionTech — [rebelliontech.in](https://rebelliontech.in)

Static, frontend-only. No backend, no database, no server runtime. Built with Next.js and exported
to plain HTML/CSS/JS, then published to GitHub Pages.

---

## Running it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build -> ./out
npm run type-check   # tsc --noEmit
npm run lint
```

Node 20 or newer is required.

---

## How deployment works

Pushing to `main` triggers `.github/workflows/deploy.yml`, which installs, builds, and publishes
`./out` to GitHub Pages. There is nothing to run by hand.

One-time setup in the GitHub repo:

1. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
2. **Settings → Pages → Custom domain:** enter `rebelliontech.in`, then tick **Enforce HTTPS** once
   the certificate is issued (this can take up to an hour).

DNS at your registrar:

| Type  | Name  | Value                                        |
| ----- | ----- | -------------------------------------------- |
| A     | `@`   | `185.199.108.153`                            |
| A     | `@`   | `185.199.109.153`                            |
| A     | `@`   | `185.199.110.153`                            |
| A     | `@`   | `185.199.111.153`                            |
| CNAME | `www` | `crazyexpectations.github.io`                |

`public/CNAME` is committed, so the custom domain survives every redeploy.

---

## Where to change things

| You want to change…                        | Edit                                    |
| ------------------------------------------ | --------------------------------------- |
| Contact email, brand name, nav, socials    | `src/lib/site.ts`                       |
| Prices, tiers, cost factors, the Rule      | `src/lib/pricing.ts`                    |
| The six capabilities                       | `src/lib/capabilities.tsx`              |
| Blueprint archetypes                       | `src/lib/blueprints.ts`                 |
| Colours, spacing, animation, type scale    | `src/app/globals.css` (design tokens at the top) |
| Any architecture diagram                   | `src/components/diagrams/`              |

**Set the contact email before launch.** `src/lib/site.ts` currently points at
`contact@rebelliontech.in`. Every mail link and the audit form read from that one field.

---

## Project layout

```
src/
├── app/                    routes (one folder per page) + globals.css
├── components/
│   ├── layout/             navigation, footer, logo, page masthead
│   ├── fx/                 cursor, click ripples, scroll reveal, smooth scroll, magnetic
│   ├── three/              WebGL hero scene and its CSS fallback backdrop
│   ├── diagrams/           SVG architecture diagrams + shared primitives
│   ├── ui/                 Section, SectionHead, TiltCard
│   └── home|systems|…/     page sections
└── lib/                    content data, hooks, helpers
```

---

## Performance notes

The site does a lot visually, so the heavy parts are gated rather than assumed.

- **Three.js is code-split** and only downloaded on desktop-class devices, during browser idle time.
  Phones, low-memory machines and anyone on Save-Data get a CSS-only hero that is a complete design
  on its own.
- **`useCapabilities()`** (`src/lib/hooks.ts`) is the single gate. It reads CPU cores, device memory,
  pointer type, viewport width and connection hints, then decides whether 3D and cursor effects run.
- **The WebGL loop is capped at 30 fps**, pauses when scrolled out of view or the tab is hidden, and
  disposes every geometry, material and the renderer on unmount.
- **Scroll animations are CSS transitions** triggered by one shared IntersectionObserver
  (`fx/ScrollReveal.tsx`). No scroll listeners drive layout.
- **`prefers-reduced-motion` is honoured globally** — animations stop and all revealed content is
  shown immediately.
- **Fonts are self-hosted** by `next/font`, so there is no render-blocking request to a font CDN.
- **Below-fold sections use `content-visibility: auto`** to skip layout and paint until needed.

If you add a new heavy visual, gate it behind `useCapabilities()` rather than mounting it everywhere.

---

## The contact form

`src/components/audit/AuditForm.tsx` composes a formatted email and hands it to the visitor's mail
client via `mailto:`, with a copy-to-clipboard fallback. Nothing is submitted anywhere and nothing is
stored — which is what keeps the site backend-free.

To collect submissions server-side later, point the form's `submit` handler at a hosted form
endpoint (Formspree, Basin, or similar). That is the only change needed; the markup stays as is.

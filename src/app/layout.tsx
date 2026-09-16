import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import { SITE } from '@/lib/site';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/fx/ScrollReveal';
import ScrollProgress from '@/components/fx/ScrollProgress';
import CustomCursor from '@/components/fx/CustomCursor';
import SpotlightCards from '@/components/fx/SpotlightCards';
import ClickFX from '@/components/fx/ClickFX';
import SmoothScroll from '@/components/fx/SmoothScroll';

/* Fonts are downloaded at build time and served from our own origin, so
   there is no render-blocking request to a third-party font CDN. */
const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Custom AI Systems & Domain Intelligence`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.shortPitch,
  keywords: [
    'custom AI systems',
    'AI engineering India',
    'domain intelligence',
    'retrieval augmented generation',
    'multi-agent systems',
    'machine learning consultancy',
    'MLOps',
    'AI architecture audit',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.shortPitch,
    url: SITE.url,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.shortPitch,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050508',
  colorScheme: 'dark',
};

/** Organisation markup so search engines resolve the brand correctly. */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  description: SITE.shortPitch,
  email: SITE.email,
  slogan: SITE.tagline,
  founder: [
    { '@type': 'Person', name: 'Garima Kalra' },
    { '@type': 'Person', name: 'Aurin Desai' },
  ],
  areaServed: 'Worldwide',
  knowsAbout: [
    'Custom neural networks',
    'Retrieval-augmented generation',
    'Multi-agent orchestration',
    'MLOps',
    'AI evaluation and safety',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {/* Keyboard users land here first. Positioned by CSS so this stays a
            server component — no focus handlers needed. */}
        <a href="#main" className="rb-skip">
          Skip to content
        </a>

        <ScrollProgress />
        <ScrollReveal />
        <SmoothScroll />
        <CustomCursor />
        <SpotlightCards />
        <ClickFX />

        <Navigation />
        <main id="main">{children}</main>
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}

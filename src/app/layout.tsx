import type { Metadata, Viewport } from 'next';
import './globals.css';

import { Toaster } from '@/components/ui/toaster';
// import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { siteConfig } from '@/lib/data';
import { AccessibilityProvider } from '@/contexts/accessibility-context';
import ProofBar, { ProofItem } from '@/components/proof/ProofBar';
import { Zap, ShieldCheck, Rocket } from 'lucide-react';
import { JSONLD, personLD, websiteLD } from '@/lib/structured-data';

const SITE_URL = 'https://stephenigwebuike.com';
const TITLE = 'Stephen Maclaurin Igwebuike — Designer-Engineer & Author';
const DESC =
  'Designer-engineer building Next.js & WordPress products with technical SEO. Author of two short-story horror anthologies.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Stephen Maclaurin Igwebuike',
  },
  description: DESC,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: TITLE,
    description: DESC,
    siteName: 'Stephen Maclaurin Igwebuike',
    images: ['/api/og'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sempiternal14u',
    title: TITLE,
    description: DESC,
    images: ['/api/og'],
    creator: '@sempiternal14u'
  },
  manifest: `${SITE_URL}/manifest.json`,
  icons: {
    icon: '',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F5F2' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0D0E' },
  ],
};

const customItems: ProofItem[] = [
  { id: 'perf',  text: 'LCP 1.6s',          icon: <Zap className="size-4 opacity-80" /> },
  { id: 'a11y',  text: 'WCAG 2.2 AA',       icon: <ShieldCheck className="size-4 opacity-80" /> },
  { id: 'deploy',text: 'Zero-downtime deploys', icon: <Rocket className="size-4 opacity-80" /> },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author,
    url: siteConfig.url,
    sameAs: [
      siteConfig.socials.twitter,
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
    ],
    jobTitle: "Creative Web Developer"
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,100..900&family=Inter:wght@100..900&family=Open+Dyslexic:wght@400;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        ></script>
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AccessibilityProvider>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <Header />
              <ProofBar items={customItems} size="compact" />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AccessibilityProvider>
        </ThemeProvider>
        <JSONLD data={personLD()} />
        <JSONLD data={websiteLD()} />
      </body>
    </html>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { siteUrl } from '@/lib/seo';
import Badge from '@/components/capability/Badge';
import { Globe, Layers, Search, Atom, Braces, Server, Network, Flame, CreditCard, Cloud, TestTubes, Gauge, BookOpen, BarChart3 } from 'lucide-react';
import BackToTop from '@/components/common/BackToTop';


export const metadata: Metadata = {
  title: 'Capabilities',
  description:
    'Stack & tools: Next.js, WordPress (themes/plugins, headless), SEO, React, TS, Node, GraphQL, Firebase, Stripe, Vercel, Playwright, Lighthouse, Storybook, D3.',
  alternates: { canonical: siteUrl('/capabilities') },
  openGraph: {
    images: ['/api/og?title=Capabilities'],
  },
};

type Cap = {
  id: string;
  title: string;
  blurb: string;
  when: string[];
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const CAPS: Cap[] = [
  { id: 'nextjs',     title: 'Next.js',     blurb: 'Hybrid rendering, routing, and performance primitives.', when: ['SSR/SSG/ISR content sites', 'App Router layouts & caching', 'Edge functions for speed'] },
  { id: 'wordpress',  title: 'WordPress',   blurb: 'Themes, plugins, and headless architectures.', when: ['Marketing sites that need editors', 'WooCommerce storefronts', 'Headless WP with Next.js'] },
  { id: 'seo',        title: 'SEO',         blurb: 'Technical SEO baked into design and build.', when: ['Core Web Vitals, schema, sitemaps', 'Internationalization & canonicals', 'Content architecture & audits'] },
  { id: 'react',      title: 'React',       blurb: 'Component systems and UI state done right.', when: ['Design systems & complex UI', 'Hooks, context, accessibility', 'Server Components where useful'] },
  { id: 'ts',         title: 'TypeScript',  blurb: 'Type-safe code for reliability and speed.', when: ['Large codebases', 'API/DTO typing', 'Refactors without fear'] },
  { id: 'node',       title: 'Node.js',     blurb: 'APIs, workers, and backend glue.', when: ['REST/GraphQL services', 'Background jobs/queues', 'Serverless handlers'] },
  { id: 'graphql',    title: 'GraphQL',     blurb: 'Typed queries and predictable data.', when: ['Complex client data needs', 'Headless CMS/ecommerce', 'Schema-first collaboration'] },
  { id: 'firebase',   title: 'Firebase',    blurb: 'Auth, Firestore, Functions, Hosting.', when: ['MVPs with auth & data', 'Realtime dashboards', 'Serverless email/webhooks'] },
  { id: 'stripe',     title: 'Stripe',      blurb: 'Payments, billing, subscriptions.', when: ['Checkout & invoices', 'SaaS metered billing', 'Customer portal setup'] },
  { id: 'vercel',     title: 'Vercel',      blurb: 'Zero-config deploys and edge speed.', when: ['Preview deployments', 'Edge runtime APIs', 'Image/CDN optimizations'] },
  { id: 'playwright', title: 'Playwright',  blurb: 'Reliable e2e testing across browsers.', when: ['Critical user flows', 'Auth & payments tests', 'CI regression safety'] },
  { id: 'lighthouse', title: 'Lighthouse',  blurb: 'Performance & a11y scoring with budgets.', when: ['Core Web Vitals targets', 'Perf regressions in CI', 'A11y audits (WCAG 2.2)'] },
  { id: 'storybook',  title: 'Storybook',   blurb: 'Isolated UI component development.', when: ['Design systems & docs', 'Visual regression testing', 'Component props contracts'] },
  { id: 'd3',         title: 'D3',          blurb: 'Custom, expressive data visualizations.', when: ['Dashboards & charts', 'Data storytelling', 'Bespoke interactions'] },
];

const ICONS: Record<string, any> = {
  nextjs: Globe,
  wordpress: Layers,
  seo: Search,
  react: Atom,
  ts: Braces,
  node: Server,
  graphql: Network,
  firebase: Flame,
  stripe: CreditCard,
  vercel: Cloud,
  playwright: TestTubes,
  lighthouse: Gauge,
  storybook: BookOpen,
  d3: BarChart3,
};


export default function CapabilitiesPage() {
  return (
    <main id="top" className="px-4 py-12 md:py-16">
      <header className="mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-semibold">Capabilities</h1>
        <p className="mt-2 opacity-80">
          I build with Next.js, WordPress (themes/plugins, headless), and a technical SEO toolkit—choosing the stack that maximizes speed, accessibility, and outcomes.
        </p>
      </header>

      <div className="mx-auto mt-8 max-w-5xl">
        <nav aria-label="Capabilities">
            <ul className="flex flex-wrap gap-2">
            {CAPS.map((c) => (
                <li key={c.id}>
                  <Badge href={`#${c.id}`}>
                    <span className="mr-1.5 inline-flex items-center">
                      {React.createElement(ICONS[c.id] ?? Globe, { className: 'h-4 w-4 opacity-80' })}
                    </span>
                    {c.title}
                  </Badge>
                </li>
            ))}
            </ul>
        </nav>
      </div>

      <section className="mx-auto mt-10 max-w-3xl space-y-10">
        {CAPS.map((c) => (
          <article id={c.id} key={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-28">
            <div className="rounded-2xl bg-gradient-to-r from-border/60 via-border/40 to-transparent p-[1px]">
              <div className="rounded-[calc(1rem-1px)] bg-secondary/30 p-5">
                <header>
                  <h2 id={`${c.id}-title`} className="flex items-center gap-2 text-xl md:text-2xl font-semibold">
                    {React.createElement(ICONS[c.id] ?? Globe, { className: 'h-5 w-5 opacity-80' })}
                    {c.title}
                  </h2>
                  <p className="mt-1 opacity-80">{c.blurb}</p>
                </header>
                <div className="mt-4">
                  <h3 className="text-sm font-medium opacity-80">When to use it</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm opacity-90">
                    {c.when.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
      <BackToTop />
    </main>
  );
}

'use client';
import React, { useState } from 'react';

type Step = {
  id: 'discovery' | 'design-system' | 'build' | 'launch';
  title: string;
  summary: string;
  artifact: {
    kind: 'image' | 'code' | 'imageList';
    src?: string;
    alt?: string;
    code?: string;
    extra?: { src: string; alt: string }[];
  };
};

const STEPS: Step[] = [
  {
    id: 'discovery',
    title: 'Discovery',
    summary: 'Clarify goals, users, constraints; define success metrics and scope.',
    artifact: {
      kind: 'image',
      src: '/process/journey-map.png',
      alt: 'Journey map sample'
    }
  },
  {
    id: 'design-system',
    title: 'Design System',
    summary: 'Tokens → components → patterns; accessibility from day one.',
    artifact: {
      kind: 'code',
      code: `{
  "color": { "fg": "#E7E9EE", "bg": "#0B1220", "accent": "#7FBCEF" },
  "radius": { "sm": 6, "md": 12, "xl": 16 },
  "space": { "xs": 4, "sm": 8, "md": 12, "lg": 16 },
  "shadow": { "card": "0 6px 24px rgba(0,0,0,0.25)" }
}`
    }
  },
  {
    id: 'build',
    title: 'Build',
    summary: 'Next.js/TS, API/auth/payments, CI/CD; budgets keep Web Vitals green.',
    artifact: {
      kind: 'image',
      src: '/process/ci-pipeline.png',
      alt: 'CI pipeline screenshot'
    }
  },
  {
    id: 'launch',
    title: 'Launch & Learn',
    summary: 'Ship; measure with GA4/Search Console; iterate on real usage.',
    artifact: {
      kind: 'imageList',
      extra: [
        { src: '/process/metrics.png', alt: 'Metrics dashboard' },
        { src: '/process/events.png', alt: 'Analytics events' }
      ]
    }
  }
];

export default function Process() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" aria-labelledby="process-heading" className="px-4 py-12 md:py-16">
      <h2 id="process-heading" className="text-2xl md:text-3xl font-semibold">Process</h2>
      <div className="mt-6">
        <nav aria-label="Process steps" className="mt-2">
          <ul
            role="tablist"
            className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-1 py-2 [scrollbar-width:none] [-ms-overflow-style:none] snap-x"
          >
            {STEPS.map((s, i) => (
              <li key={s.id} className="snap-start">
                <button
                  role="tab"
                  aria-selected={active === i}
                  aria-controls={`panel-${s.id}`}
                  onClick={() => setActive(i)}
                  className={[
                    'rounded-full px-3 py-1.5 text-sm transition',
                    active === i
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  ].join(' ')}
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
          <style jsx>{'ul::-webkit-scrollbar{display:none}'}</style>
        </nav>

        <div className="mx-auto mt-4 max-w-5xl">
          {STEPS.map((s, i) => (
            <div key={s.id} className="rounded-2xl bg-gradient-to-r from-border/60 via-border/40 to-transparent p-[1px] mb-4">
                <div
                id={`panel-${s.id}`}
                role="tabpanel"
                className={`rounded-[calc(1rem-1px)] bg-secondary/30 p-4 transition-all focus-within:ring-2 focus-within:ring-ring ${active === i ? 'block' : 'hidden'}`}
                >
                    <div className="flex items-start justify-between gap-4 cursor-pointer list-none" onClick={() => setActive(active === i ? -1 : i)}>
                        <div>
                            <p className="text-base font-medium">{s.title}</p>
                            <p className="text-sm opacity-80">{s.summary}</p>
                        </div>
                        <span className={`text-sm opacity-70 transition ${active === i ? 'rotate-180' : ''}`}>⌄</span>
                    </div>

                    {active === i && (
                        <div className="mt-3">
                        {s.artifact.kind === 'image' && s.artifact.src && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={s.artifact.src} alt={s.artifact.alt ?? ''} className="w-full rounded-xl border border-border/20" />
                        )}

                        {s.artifact.kind === 'code' && s.artifact.code && (
                            <pre className="overflow-x-auto rounded-xl border border-border/20 bg-background/40 p-3 text-xs">
                            <code>{s.artifact.code}</code>
                            </pre>
                        )}

                        {s.artifact.kind === 'imageList' && s.artifact.extra && (
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            {s.artifact.extra.map((x) => (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img key={x.src} src={x.src} alt={x.alt} className="w-full rounded-xl border border-border/20" />
                            ))}
                            </div>
                        )}
                        </div>
                    )}
                </div>
            </div>
          ))}
        </div>
      </div>

      <section aria-labelledby="engagement-heading" className="mt-12">
        <h3 id="engagement-heading" className="text-xl md:text-2xl font-semibold">Engagement models</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Sprint */}
          <div className="rounded-2xl bg-gradient-to-r from-border/60 via-border/40 to-transparent p-[1px]">
            <div className="rounded-[calc(1rem-1px)] bg-secondary/30 p-5">
              <p className="text-sm uppercase tracking-wider opacity-70">Sprint</p>
              <p className="mt-1 text-lg font-medium">from $X,000</p>
              <ul className="mt-3 list-disc pl-5 text-sm opacity-90">
                <li>1–2 weeks focused outcome</li>
                <li>Discovery + prototype or fix</li>
                <li>Report & next steps</li>
              </ul>
              <a href="/contact" className="mt-4 inline-block rounded-xl border border-border px-3 py-2 text-sm transition hover:border-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Start a sprint</a>
            </div>
          </div>

          {/* Project */}
          <div className="rounded-2xl bg-gradient-to-r from-border/60 via-border/40 to-transparent p-[1px]">
            <div className="rounded-[calc(1rem-1px)] bg-secondary/30 p-5">
              <p className="text-sm uppercase tracking-wider opacity-70">Project</p>
              <p className="mt-1 text-lg font-medium">from $X2,000</p>
              <ul className="mt-3 list-disc pl-5 text-sm opacity-90">
                <li>Scoped design & build</li>
                <li>Design system + Next.js app</li>
                <li>Launch support & warranty</li>
              </ul>
              <a href="/contact" className="mt-4 inline-block rounded-xl border border-border px-3 py-2 text-sm transition hover:border-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Scope a project</a>
            </div>
          </div>

          {/* Retainer */}
          <div className="rounded-2xl bg-gradient-to-r from-border/60 via-border/40 to-transparent p-[1px]">
            <div className="rounded-[calc(1rem-1px)] bg-secondary/30 p-5">
              <p className="text-sm uppercase tracking-wider opacity-70">Retainer</p>
              <p className="mt-1 text-lg font-medium">from $X500/mo</p>
              <ul className="mt-3 list-disc pl-5 text-sm opacity-90">
                <li>Ongoing UX/engineering</li>
                <li>Performance & SEO upkeep</li>
                <li>Roadmap & experiments</li>
              </ul>
              <a href="/contact" className="mt-4 inline-block rounded-xl border border-border px-3 py-2 text-sm transition hover:border-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Book a slot</a>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

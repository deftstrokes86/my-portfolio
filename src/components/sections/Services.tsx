import React from 'react';
import { Compass, Code2, Rocket } from 'lucide-react';
import Link from 'next/link';

const CARDS = [
  { 
    key: 'strategy', 
    title: 'Strategy & Design', 
    icon: Compass,
    promise: 'Define the right thing before building the thing.',
    bullets: [
      'Product discovery, goals & KPIs',
      'User flows, wireframes, UI design',
      'Design tokens & component library',
    ]
  },
  { 
    key: 'build',    
    title: 'Build & Develop',   
    icon: Code2,
    promise: 'Ship fast, type-safe, and scalable.',
    bullets: [
        'Next.js/React + TypeScript',
        'API integration, auth, payments',
        'Accessibility & performance budgets',
    ]
  },
  { 
    key: 'deploy',   
    title: 'Deploy & Iterate',  
    icon: Rocket,
    promise: 'Launch with confidence and keep improving.',
    bullets: [
        'CI/CD to Vercel/Firebase',
        'Analytics & experiment loops',
        'Monitoring, error tracking, support',
    ]
  },
];

export default function Services() {
  return (
    <section aria-labelledby="services-heading" className="px-4 py-12 md:py-16">
      <h2 id="services-heading" className="text-2xl md:text-3xl font-semibold">
        Services
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-5 md:mt-8 md:grid-cols-3 md:gap-6">
        {CARDS.map(({ key, title, icon: Icon, promise, bullets }) => (
          <div key={key} className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-border/60 via-border/40 to-transparent">
            <Link
              href="/capabilities"
              className="block h-full rounded-[calc(1rem-1px)] p-4 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-secondary/30 group-hover:bg-secondary/50"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/50">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-1 text-sm opacity-80">{promise}</p>
              <ul className="mt-3 list-disc pl-5 text-sm opacity-90">
                {bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
              </ul>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

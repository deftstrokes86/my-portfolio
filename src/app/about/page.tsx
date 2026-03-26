import React from 'react';
import type { Metadata } from 'next';
import { siteUrl } from '@/lib/seo';
import { JSONLD, creativeWorkLD } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'About',
  alternates: { canonical: siteUrl('/about') },
  openGraph: { images: ['/api/og?title=About&subtitle=Designer%E2%82%91Engineer%20%26%20Author'] },
};


// Above the default export
type TL = { year: string; title: string; note: string; };

const TIMELINE: TL[] = [
  { year: '2023 - Present',  title: 'Designer-Engineer, Consumers United - Georgia', note: 'Next.js & React, WP development +plugins, SEO audits' },
  // ⬇️ Replace 20XX with your real publication year(s)
  { year: '2025',  title: 'Author — Squirmish (Horror Anthology)', note: 'Nigerian folklore retold for a modern audience: urban contexts, current fears, and clean, fast prose that preserves the originals’ spine.' },
  { year: '2022 - 2023',  title: 'WordPress Engineer, Ladybugz - Boston',                 note: 'Design systems, performance budgets, a11y' },
  { year: '2023',  title: 'Author — Haunted Spaces (Horror Anthology)', note: 'Haunted Space is a field guide to cursed places: abandoned clinics, roadside shrines, colonial relics, new builds with old bones. Strangers enter, stories close around them, and the architecture finishes the job. *Some walls remember*' },
  { year: '2021 - 2022',  title: 'Senior Web Developer, RepairLift - New York',  note: 'React & Node, WP Plugin Development, Figma, SEO' },
  { year: '2016 - 2021',  title: 'Creative Lead, Technocrati Designs - Lagos', note: 'Leadership, React & Node, IA, UI kits, prototypes. Team and project management, Client management' },
];

export default function AboutPage() {
  const getAvailability = () => {
    const today = new Date();
    const dayOfMonth = today.getDate();
    let targetDate = new Date();

    if (dayOfMonth >= 15) {
      // Set to the first day of next month
      targetDate.setMonth(today.getMonth() + 1, 1);
    }
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(targetDate);
  };
  const availMonth = getAvailability();

  return (
    <main className="px-4 py-12 md:py-16">
      <header className="mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-semibold">About</h1>
        <p className="mt-2 opacity-80">Who I am, how I work, and what I care about.</p>
      </header>

      <div className="mx-auto mt-10 grid max-w-5xl gap-10">
        <section aria-labelledby="bio-heading" className="mx-auto max-w-4xl">
          <h2 id="bio-heading" className="text-xl md:text-2xl font-semibold">Bio</h2>
          <p className="mt-3 leading-relaxed opacity-90">
            I’m Stephen Igwebuike — a designer-engineer who turns fuzzy ideas into shipped products.
            I build with Next.js, React, and TypeScript; craft WordPress themes/plugins (including headless WP);
            and bake in technical SEO so Core Web Vitals stay green. Calm under pressure, obsessed with details,
            and focused on outcomes.
          </p>
          <p className="mt-3 leading-relaxed opacity-90">
            I’m also the author of two horror anthologies — one on haunted places and another on Nigerian myths —
            written in a tight, cinematic style that favors tension, clear imagery, and clean pacing.
          </p>
        </section>
        
        <section aria-labelledby="timeline-heading" className="mx-auto max-w-4xl">
          <h2 id="timeline-heading" className="text-xl md:text-2xl font-semibold">Timeline</h2>
          <ol className="mt-4 space-y-4">
            {TIMELINE.map((t, i) => (
              <li key={i} className="grid grid-cols-[5rem_1fr] items-start gap-4">
                <div className="text-sm font-medium opacity-70">{t.year}</div>
                <div>
                  <p className="font-medium">{t.title}</p>
                  <p className="text-sm opacity-80">{t.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Values */}
        {/* Photo Grid */}
        <section aria-labelledby="availability-heading" className="mx-auto max-w-4xl">
          <h2 id="availability-heading" className="sr-only">Availability</h2>
          <div className="rounded-2xl bg-gradient-to-r from-border/60 via-border/40 to-transparent p-[1px]">
            <div className="rounded-[calc(1rem-1px)] bg-secondary/30 p-5">
              <p className="text-sm uppercase tracking-wider opacity-70">Availability</p>
              <p className="mt-1 text-lg font-medium">Booking from <span className="underline decoration-dotted">{availMonth}</span></p>
              <p className="mt-2 text-sm opacity-80">Have a project in mind? Share a few details and I’ll reply within 24 hours.</p>
              <div className="mt-3">
                <a href="/contact" className="inline-flex items-center rounded-xl border border-border px-3 py-2 text-sm font-medium transition hover:border-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  Start a project
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Micro-FAQ was here */}
      </div>

      <JSONLD data={creativeWorkLD({
        name: 'Haunted Space',
        url: siteUrl('/writing/haunted-space'),
        genre: 'Horror, Haunted places',
      })} />

      <JSONLD data={creativeWorkLD({
        name: 'Nigerian Myths (Contemporary Retellings)',
        url: siteUrl('/writing/nigerian-myths'),
        genre: 'Horror, Folklore retellings',
      })} />
    </main>
  );
}

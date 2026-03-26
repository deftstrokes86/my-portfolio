'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

type Step = {
  id: string;
  label: 'Define' | 'Design' | 'Build' | 'Launch';
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    id: 'step-define',
    label: 'Define',
    title: 'Define: align goals, users, and constraints',
    body: 'We clarify the problem, map user journeys, and prioritize impact. Clear scope, crisp success metrics, no ambiguity.',
  },
  {
    id: 'step-design',
    label: 'Design',
    title: 'Design: systems, not one-offs',
    body: 'Wireframes → UI → tokens → components. Accessibility from day one, with prototypes to validate decisions.',
  },
  {
    id: 'step-build',
    label: 'Build',
    title: 'Build: fast, type-safe, and scalable',
    body: 'Next.js/React, TypeScript, and CI/CD. Core Web Vitals in the green, data models that will age well.',
  },
  {
    id: 'step-launch',
    label: 'Launch',
    title: 'Launch: measure and iterate',
    body: 'Ship confidently, track analytics, and run improvement loops. No dead-end handoffs—just outcomes.',
  },
];

function useActiveStep(ids: string[], rootMargin = '0px 0px -55% 0px') {
  const [active, setActive] = useState(0);
  const ioRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
        if (visible[0]) {
          const idx = ids.indexOf((visible[0].target as HTMLElement).id);
          if (idx !== -1) setActive(idx);
        } else {
          const tops = sections.map(el => Math.abs(el.getBoundingClientRect().top));
          const idx = tops.indexOf(Math.min(...tops));
          if (idx !== -1) setActive(idx);
        }
      },
      { root: null, threshold: [0,0.25,0.5,0.75,1], rootMargin }
    );

    sections.forEach(el => io.observe(el));
    ioRef.current = io;
    return () => io.disconnect();
  }, [ids, rootMargin]);

  return active;
}

export default function HeroScrolly() {
  const active = useActiveStep(STEPS.map(s => s.id));
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <section aria-label="Design and build process" className="relative">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 md:grid-cols-2 md:py-20">
        {/* LEFT: sticky headline + placeholder subhead */}
        <div className="md:sticky md:top-24 md:self-start">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            I design & ship blazing-fast, accessible web products.
          </h1>
           <div className="mt-4 h-[2.5rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={STEPS[active].label}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="text-lg md:text-xl"
              >
                <span className="font-medium">{STEPS[active].label}</span>
                <span className="mx-2">→</span>
                {active === 0 && 'Align on goals and users'}
                {active === 1 && 'Design systems and validate'}
                {active === 2 && 'Build with performance in mind'}
                {active === 3 && 'Launch, measure, iterate'}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <a href="#work">See recent work</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#contact">Start a project</a>
            </Button>
          </div>
        </div>

        {/* RIGHT: four full-height panels */}
        <div className="flex flex-col">
          {STEPS.map((step, idx) => (
            <article
              id={step.id}
              key={step.id}
              className="min-h-screen py-20"
              aria-labelledby={`${step.id}-title`}
            >
              <header className="mb-4">
                <p className="text-sm uppercase tracking-widest opacity-70">{step.label}</p>
                <h2 id={`${step.id}-title`} className="mt-1 text-2xl md:text-3xl font-semibold">
                  {step.title}
                </h2>
              </header>
              <p className="max-w-prose opacity-80">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

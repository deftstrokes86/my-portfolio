'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, ArrowDownRight, Layers, Workflow, Code, LineChart, Target, Palette, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/data';

type Step = {
  id: string;
  label: string;
  title: string;
  body: string;
  icon: React.ElementType;
};

const STEPS: Step[] = [
  {
    id: 'step-define',
    label: 'Define',
    title: 'Align goals, users, and constraints',
    body: 'We clarify the problem, map user journeys, and prioritize impact. Clear scope, crisp success metrics, no ambiguity.',
    icon: Target,
  },
  {
    id: 'step-design',
    label: 'Design',
    title: 'Systems, not one-offs',
    body: 'Wireframes → UI → tokens → components. Accessibility from day one, with prototypes to validate decisions.',
    icon: Palette,
  },
  {
    id: 'step-build',
    label: 'Build',
    title: 'Fast, type-safe, and scalable',
    body: 'Next.js/React, TypeScript, and CI/CD. Core Web Vitals in the green, data models that will age well.',
    icon: Code,
  },
  {
    id: 'step-launch',
    label: 'Launch',
    title: 'Measure and iterate',
    body: 'Ship confidently, track analytics, and run improvement loops. No dead-end handoffs—just outcomes.',
    icon: LineChart,
  },
];

// Helper to determine active step based on scroll
function useActiveStep(ids: string[]) {
  const [active, setActive] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      if (!sections.length) return;

      const viewportCenter = window.innerHeight / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      sections.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - elementCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActive(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids]);

  return active;
}

const VisualDefine = () => (
  <div className="w-full h-full bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-xl">
    <div className="flex items-center gap-3 border-b border-border/50 pb-4">
      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"><Target className="w-5 h-5 text-primary" /></div>
      <div>
        <h4 className="font-semibold text-foreground">Discovery Board</h4>
        <p className="text-xs text-muted-foreground">Product Strategy</p>
      </div>
    </div>
    <div className="flex-1 grid grid-cols-2 gap-4">
      <div className="bg-secondary/40 rounded-xl p-4 flex flex-col gap-3">
        <div className="h-2 w-12 bg-primary/40 rounded-full" />
        <div className="h-2 w-full bg-muted rounded-full" />
        <div className="h-2 w-5/6 bg-muted rounded-full" />
      </div>
      <div className="bg-secondary/40 rounded-xl p-4 flex flex-col gap-3">
        <div className="h-2 w-16 bg-accent/40 rounded-full" />
        <div className="h-2 w-full bg-muted rounded-full" />
        <div className="h-2 w-4/6 bg-muted rounded-full" />
      </div>
      <div className="col-span-2 bg-secondary/40 rounded-xl p-4 flex items-center gap-3">
         <CheckCircle2 className="w-5 h-5 text-primary" />
         <div className="h-2 w-1/2 bg-muted rounded-full" />
      </div>
    </div>
  </div>
);

const VisualDesign = () => (
  <div className="w-full h-full bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden relative">
    <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Design System</h4>
        <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <div className="w-3 h-3 rounded-full bg-accent"></div>
        </div>
      </div>
      <div className="flex-1 border border-border/50 rounded-xl bg-background/50 flex flex-col p-4 gap-4">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-primary flex-shrink-0"></div>
            <div className="flex-1 h-3 bg-muted rounded-full"></div>
         </div>
         <div className="w-full h-px bg-border/50"></div>
         <div className="flex-1 grid grid-cols-2 gap-3">
             <div className="rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center">
                 <span className="text-xs text-primary font-medium">Component A</span>
             </div>
             <div className="rounded-lg border border-border bg-secondary/30 flex items-center justify-center">
                 <span className="text-xs text-muted-foreground font-medium">Component B</span>
             </div>
         </div>
      </div>
    </div>
  </div>
);

const VisualBuild = () => (
  <div className="w-full h-full bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-6 md:p-8 flex flex-col shadow-xl font-mono text-sm">
    <div className="flex items-center gap-2 mb-4 text-muted-foreground">
      <Code className="w-4 h-4" /> <span className="text-xs">src/components/ui.tsx</span>
    </div>
    <div className="flex-1 bg-secondary/30 rounded-xl p-4 border border-border/50 text-foreground/80 overflow-hidden leading-relaxed">
      <p><span className="text-primary">import</span> {'{ useState }'} <span className="text-primary">from</span> 'react';</p>
      <p><span className="text-primary">import</span> {'{ cn }'} <span className="text-primary">from</span> '@/lib/utils';</p>
      <br/>
      <p><span className="text-primary">export function</span> Scaffold() {'{'}</p>
      <p className="pl-4">{"return ("}</p>
      <p className="pl-8 text-accent">{'<div className={cn("flex")}>'}</p>
      <p className="pl-12 text-muted-foreground">{'// Scalable architecture'}</p>
      <p className="pl-12 text-accent">{'<PerformanceMetrics />'}</p>
      <p className="pl-8 text-accent">{'</div>'}</p>
      <p className="pl-4">{");"}</p>
      <p>{"}"}</p>
    </div>
  </div>
);

const VisualLaunch = () => (
  <div className="w-full h-full bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-xl">
    <div className="flex items-center justify-between mb-2">
      <h4 className="font-semibold text-foreground">Traffic Analysis</h4>
      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">+24.5%</span>
    </div>
    <div className="flex-1 flex items-end gap-2">
      {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
        <div key={i} className="flex-1 bg-primary/20 rounded-t-sm relative group overflow-hidden" style={{ height: `${height}%` }}>
           <div className="absolute bottom-0 w-full bg-primary transition-all duration-500" style={{ height: `${height}%` }}></div>
        </div>
      ))}
    </div>
    <div className="flex justify-between text-xs text-muted-foreground mt-2 border-t border-border/50 pt-4">
      <span>Mon</span>
      <span>Wed</span>
      <span>Fri</span>
      <span>Sun</span>
    </div>
  </div>
);

const Visuals = [VisualDefine, VisualDesign, VisualBuild, VisualLaunch];

export default function HeroScrolly() {
  const active = useActiveStep(STEPS.map(s => s.id));
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section className="relative w-full bg-background border-b border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* LEFT PANEL: Sticky Hero Content */}
          <div className="lg:col-span-6 xl:col-span-5 relative pt-20 pb-10 lg:py-0">
            <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center">
              
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8 w-fit">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Available for new projects
              </div>
              
              <h1 className="font-headline text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6">
                {siteConfig.heroTagline}
              </h1>
              
              <p className="text-lg text-muted-foreground md:text-xl leading-relaxed mb-10 max-w-lg">
                {siteConfig.bio}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
                <Button size="lg" className="rounded-full h-14 px-8 text-base shadow-lg shadow-primary/20 transition-all hover:scale-105" asChild>
                  <Link href="#work">View Selected Work</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base bg-background hover:bg-secondary transition-all" asChild>
                  <Link href="/contact">Get in Touch <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>

              {/* Progress Indicator */}
              <div className="hidden lg:flex flex-col gap-3 w-full max-w-2xl">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">The Process</h3>
                <div className="flex items-center gap-6">
                  {STEPS.map((step, idx) => {
                    const isActive = active === idx;
                    const Icon = step.icon;
                    return (
                      <div key={step.id} className={`flex items-center gap-2 transition-all duration-300 ${isActive ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-80'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'border-primary bg-primary/10 text-primary' : 'border-muted text-muted-foreground'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`font-medium text-sm ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT PANEL: Scroll Array */}
          <div className="lg:col-span-6 xl:col-span-7 relative pb-24 lg:pb-32">
            <div className="flex flex-col w-full h-full gap-[30vh] lg:gap-[50vh] pt-[10vh] lg:pt-[25vh]">
              {STEPS.map((step, idx) => {
                const Visual = Visuals[idx];
                const isActive = active === idx;
                
                return (
                  <article
                    id={step.id}
                    key={step.id}
                    className={`flex flex-col justify-center min-h-[50vh] lg:min-h-[50vh] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}
                  >
                    <div className="flex items-center gap-3 mb-6 lg:hidden">
                       <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                         <step.icon className="w-5 h-5" />
                       </div>
                       <h2 className="text-2xl font-bold font-headline">{step.label}</h2>
                    </div>

                    <div className="w-full aspect-[4/3] sm:aspect-video rounded-3xl bg-secondary/20 border border-border/50 p-4 sm:p-8 relative overflow-hidden group">
                      {/* Ambient background glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      
                      {/* Active Visual Component */}
                      <div className="relative z-10 w-full h-full">
                        <Visual />
                      </div>
                    </div>

                    <div className="mt-8 max-w-lg bg-card border border-border/40 rounded-2xl p-6 shadow-sm">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.body}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

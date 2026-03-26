'use client';

import React, { useState } from 'react';
import { Target, Palette, Code, LineChart, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    id: 'define',
    title: 'Define & Strategize',
    summary: 'We start by understanding your core business objectives, user needs, and technical constraints to map a realistic path forward.',
    icon: Target,
    artifacts: ['User Journeys & Personas', 'Information Architecture', 'Technical Requirements']
  },
  {
    id: 'design',
    title: 'Systematic Design',
    summary: 'Building a scalable design system using tokens and reusable components, ensuring WCAG AA accessibility from the very first frame.',
    icon: Palette,
    artifacts: ['Figma Prototypes', 'Design System Architecture', 'A11y Annotations']
  },
  {
    id: 'build',
    title: 'Robust Engineering',
    summary: 'Developing with a focus on core web vitals and type-safety. I build using Next.js to ensure the final product scales gracefully.',
    icon: Code,
    artifacts: ['Clean Architecture', 'Type-Safe APIs', 'Automated CI/CD']
  },
  {
    id: 'launch',
    title: 'Launch & Iterate',
    summary: 'Shipping is just the beginning. Post-launch involves continuous tracking and optimization based on real user analytics.',
    icon: LineChart,
    artifacts: ['Performance Monitoring', 'SEO Optimization', 'A/B Testing Loops']
  }
];

export default function Process() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" aria-labelledby="process-heading" className="w-full py-24 md:py-32 bg-secondary/10 border-y border-border/40">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
           {/* Left Side: Interactive Nav Tabs */}
           <div className="lg:w-[45%] flex flex-col gap-6 relative z-10">
              <div className="mb-4">
                <h2 id="process-heading" className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
                  How I Work
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed md:text-xl max-w-lg">
                  A dependable framework adapted to product reality, ensuring nothing slips through the cracks from discovery to deployment.
                </p>
              </div>
              
              <nav aria-label="Process steps" className="flex flex-col gap-3 relative before:hidden sm:before:block before:absolute before:inset-y-0 before:left-[35px] before:w-px before:bg-border/60">
                {STEPS.map((s, i) => {
                  const isActive = active === i;
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`panel-${s.id}`}
                      onClick={() => setActive(i)}
                      className={`group relative flex items-center gap-4 sm:gap-6 text-left p-3 sm:p-4 rounded-2xl transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isActive
                          ? 'bg-card shadow-xl ring-1 ring-border border-b-4 border-b-primary/60 translate-x-0 sm:translate-x-2'
                          : 'bg-transparent border-transparent hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className={`relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500 ${isActive ? 'bg-primary text-primary-foreground border-primary/20 shadow-lg shadow-primary/30 scale-110' : 'bg-card border-border/60 text-muted-foreground group-hover:text-foreground group-hover:border-foreground/30'}`}>
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                      </div>
                      <div>
                        <span className={`block text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-1 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground/60 group-hover:text-muted-foreground'}`}>Step 0{i + 1}</span>
                        <span className={`block text-base sm:text-xl font-bold font-headline transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>{s.title}</span>
                      </div>
                    </button>
                  )
                })}
              </nav>
           </div>

           {/* Right Side: Tab Panel Content */}
           <div className="lg:w-[55%] flex items-stretch pt-4 lg:pt-0">
              <div className="bg-background w-full rounded-[2rem] p-6 sm:p-10 lg:p-12 shadow-2xl border border-border/60 relative overflow-hidden flex flex-col min-h-[400px] lg:min-h-[500px]">
                
                {/* Background ambient lighting */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                
                {STEPS.map((s, i) => {
                  const isActive = active === i;
                  return (
                   <div 
                     key={s.id} 
                     id={`panel-${s.id}`}
                     role="tabpanel"
                     className={`relative z-10 transition-all duration-700 ease-out flex-col h-full w-full ${isActive ? 'flex opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-8 absolute inset-0 pointer-events-none'}`}
                   >
                      <div className="flex items-center gap-4 mb-8">
                        <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 shadow-sm">Stage 0{i + 1}</span>
                        <div className="h-px bg-border/80 flex-grow hidden sm:block"></div>
                      </div>
                      
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline mb-6 text-foreground tracking-tight">{s.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-base sm:text-lg lg:text-xl mb-10 max-w-lg">{s.summary}</p>
                      
                      <div className="mt-auto block w-full">
                         <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4 block">Key Deliverables</span>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 w-full">
                           {s.artifacts.map((artifact, idx) => (
                             <div key={idx} className="flex items-center gap-3 bg-secondary/30 border border-border/60 p-3 sm:p-4 rounded-xl group hover:border-primary/40 hover:bg-secondary/50 transition-colors shadow-sm">
                                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                <span className="text-sm font-medium text-foreground/90 leading-tight">{artifact}</span>
                             </div>
                           ))}
                        </div>
                      </div>
                   </div>
                  )
                })}
              </div>
           </div>
        </div>

        {/* Engagement Models Integration */}
        <div className="mt-32 border-t border-border/40 pt-16">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h3 id="engagement-heading" className="font-headline text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Engagement Models</h3>
            <p className="mt-4 text-muted-foreground md:text-lg">Structured to provide immediate value regardless of your timeline or scale.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Sprint */}
            <div className="group rounded-3xl bg-card border border-border/60 p-6 sm:p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:border-primary/40 focus-within:ring-2 focus-within:ring-primary">
              <span className="inline-flex text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mb-6">Sprint</span>
              <div className="mb-6">
                 <span className="text-3xl font-bold font-headline text-foreground">1-2</span>
                 <span className="text-muted-foreground ml-2 font-medium">Weeks</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-5 h-5 text-muted-foreground/50 shrink-0" /> Focused discovery & iteration</li>
                <li className="flex gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-5 h-5 text-muted-foreground/50 shrink-0" /> Architecture or design fix</li>
                <li className="flex gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-5 h-5 text-muted-foreground/50 shrink-0" /> Actionable handoff report</li>
              </ul>
              <a href="/contact" className="mt-auto w-full text-center rounded-full bg-secondary/50 border border-border/60 px-4 py-3 text-sm font-semibold transition-colors hover:bg-primary hover:text-primary-foreground">Start a sprint</a>
            </div>

            {/* Project */}
            <div className="group rounded-3xl bg-primary text-primary-foreground p-6 sm:p-8 flex flex-col transition-all duration-300 shadow-xl shadow-primary/10 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-ring">
              <span className="inline-flex text-xs font-bold uppercase tracking-widest text-primary-foreground bg-black/20 px-3 py-1 rounded-full w-fit mb-6 shadow-sm">Project</span>
              <div className="mb-6">
                 <span className="text-3xl font-bold font-headline">End-to-End</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow opacity-90">
                <li className="flex gap-3 text-sm"><CheckCircle2 className="w-5 h-5 opacity-60 shrink-0" /> Scoped design & development</li>
                <li className="flex gap-3 text-sm"><CheckCircle2 className="w-5 h-5 opacity-60 shrink-0" /> Bespoke Next.js application</li>
                <li className="flex gap-3 text-sm"><CheckCircle2 className="w-5 h-5 opacity-60 shrink-0" /> Launch support & warranty</li>
              </ul>
              <a href="/contact" className="mt-auto w-full text-center rounded-full bg-background text-foreground px-4 py-3 text-sm font-bold shadow-md transition-transform hover:scale-105">Scope a project</a>
            </div>

            {/* Retainer */}
            <div className="group rounded-3xl bg-card border border-border/60 p-6 sm:p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:border-primary/40 focus-within:ring-2 focus-within:ring-primary">
              <span className="inline-flex text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mb-6">Retainer</span>
              <div className="mb-6">
                 <span className="text-3xl font-bold font-headline text-foreground">Monthly</span>
                 <span className="text-muted-foreground ml-2 font-medium">Ongoing</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-5 h-5 text-muted-foreground/50 shrink-0" /> Continuous UX & engineering</li>
                <li className="flex gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-5 h-5 text-muted-foreground/50 shrink-0" /> Core Web Vitals SEO upkeep</li>
                <li className="flex gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-5 h-5 text-muted-foreground/50 shrink-0" /> Architecture scaling</li>
              </ul>
              <a href="/contact" className="mt-auto w-full text-center rounded-full bg-secondary/50 border border-border/60 px-4 py-3 text-sm font-semibold transition-colors hover:bg-primary hover:text-primary-foreground">Book a slot</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

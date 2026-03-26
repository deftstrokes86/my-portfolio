
import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { TestimonialCard } from '@/components/testimonial-card';
import { projects, testimonials, siteConfig } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight, ArrowDownRight } from 'lucide-react';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';

import HeroScrolly from '@/components/hero/HeroScrolly';

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Hero */}
      <HeroScrolly />

      {/* Proof Strip */}
      <div className="w-full border-b border-border/40 bg-secondary/10 overflow-hidden">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12 text-sm md:text-base font-medium text-foreground/80">
            <li className="flex flex-col sm:flex-row items-center gap-2">
              <span className="text-primary font-extrabold text-2xl tracking-tighter">10+</span>
              <span className="text-muted-foreground leading-tight text-center sm:text-left">Years<br/>Experience</span>
            </li>
            <li className="hidden md:block w-px h-8 bg-border/60" />
            <li className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </span>
              Product &<br/>Engineering
            </li>
            <li className="hidden md:block w-px h-8 bg-border/60" />
            <li className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center shadow-sm">
                 <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22v-4"/><path d="M12 8v4"/><path d="M4.93 10.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 13.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
              </span>
              React / Next.js<br/>Ecosystem
            </li>
            <li className="hidden lg:block w-px h-8 bg-border/60" />
            <li className="flex items-center gap-3">
               <span className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
              </span>
              Accessibility<br/>Focused
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Featured Work Centerpiece */}
      <section id="work" className="w-full py-24 md:py-32 bg-background relative z-10 border-b border-border/40">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-secondary/20 to-transparent pointer-events-none" />
        <div className="container relative mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col mb-16 max-w-3xl">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              Selected Work
            </h2>
            <p className="mt-6 text-muted-foreground md:text-xl leading-relaxed">
              Real products scaling through solid engineering and human-centered design principles.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="mt-16 flex justify-center">
             <Button size="lg" variant="outline" className="rounded-full h-14 px-8" asChild>
              <Link href="/capabilities">View all capabilities <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Services */}
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-24 md:py-32">
        <Services />
      </div>

      {/* 5. Process & Engagement Models */}
      <Process />

      {/* 6. Testimonials */}
      <section id="testimonials" className="w-full py-24 md:py-32 bg-secondary/10 border-b border-border/40 relative">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              What My Clients Say
            </h2>
            <p className="mt-6 text-muted-foreground md:text-lg leading-relaxed">
              Real outcomes from collaborations that prioritize execution over hype.
            </p>
          </div>
          <Carousel
            opts={{ align: 'start', loop: true }}
            className="w-full px-4 md:px-0"
          >
            <CarouselContent className="-ml-6">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-6 md:basis-1/2 group">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-6 mt-16">
                <CarouselPrevious className="static translate-y-0 text-foreground border border-border/60 bg-card hover:bg-secondary hover:text-primary h-14 w-14 rounded-full shadow-sm transition-all" />
                <CarouselNext className="static translate-y-0 text-foreground border border-border/60 bg-card hover:bg-secondary hover:text-primary h-14 w-14 rounded-full shadow-sm transition-all" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* 8. Final CTA Centerpiece */}
      <section className="w-full py-32 md:py-48 bg-foreground text-background relative flex items-center justify-center overflow-hidden">
        {/* Radical structural depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/15 via-foreground to-foreground opacity-90 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[130px] rounded-full mix-blend-screen pointer-events-none"></div>
        
        <div className="container relative z-10 mx-auto max-w-5xl px-4 md:px-6 text-center flex flex-col items-center">
          <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold mb-10 tracking-tighter leading-[1.1] text-balance">
            Let's build web products that actually matter.
          </h2>
          
          <p className="text-xl md:text-2xl text-background/70 mb-16 max-w-3xl leading-relaxed text-balance">
            I help exceptional teams clarify, design, and ship accessible interfaces that feel fast, thoughtful, and production-ready from day one.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] transition-all hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(var(--primary),0.7)] w-full sm:w-auto" asChild>
              <Link href="/contact">Book an introduction <ArrowRight className="ml-3 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-lg font-bold border-background/20 bg-background/5 text-background hover:bg-background/10 hover:text-background w-full sm:w-auto transition-colors" asChild>
              <Link href="#work">View selected work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

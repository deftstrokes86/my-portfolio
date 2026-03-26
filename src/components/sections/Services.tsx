import React from 'react';
import { Target, ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const CARDS = [
  { 
    key: 'clarify', 
    title: 'Clarify before you build', 
    promise: 'Define the right product to avoid expensive engineering rework.',
    icon: Target,
    who: 'Founders & Product Leads',
    bullets: [
      'Product discovery & user flows',
      'Interactive Figma prototypes',
      'KPI alignment & scope definition',
    ],
    className: 'border-chart-4/30 from-chart-4/5 to-transparent hover:border-chart-4/60 focus-within:ring-chart-4/50',
    iconCls: 'bg-chart-4/20 text-chart-4 shadow-sm shadow-chart-4/20 border-chart-4/30'
  },
  { 
    key: 'ship',    
    title: 'Ship fast without a11y debt',   
    promise: 'Deploy scalable architecture that works for every user natively.',
    icon: ShieldCheck,
    who: 'Engineering Teams',
    bullets: [
        'React / Next.js architecture',
        'WCAG AA compliant design systems',
        'Strict TypeScript & Performance budgets',
    ],
    className: 'border-primary/30 from-primary/5 to-transparent hover:border-primary/60 focus-within:ring-primary/50',
    iconCls: 'bg-primary/20 text-primary shadow-sm shadow-primary/20 border-primary/30'
  },
  { 
    key: 'scale',   
    title: 'Improve and scale after launch',  
    promise: 'Turn raw analytics into actionable product improvements dynamically.',
    icon: TrendingUp,
    who: 'Growth Teams',
    bullets: [
        'Conversion rate optimization',
        'Vercel/Firebase CI/CD pipelines',
        'A/B testing & error monitoring',
    ],
    className: 'border-chart-2/30 from-chart-2/5 to-transparent hover:border-chart-2/60 focus-within:ring-chart-2/50',
    iconCls: 'bg-chart-2/20 text-chart-2 shadow-sm shadow-chart-2/20 border-chart-2/30'
  },
];

export default function Services() {
  return (
    <section aria-labelledby="services-heading" className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 max-w-4xl">
        <div>
          <h2 id="services-heading" className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
            Capabilities
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Specialized execution designed around tangible business outcomes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {CARDS.map(({ key, title, icon: Icon, promise, bullets, who, className, iconCls }) => (
          <div key={key} className={`group relative flex flex-col rounded-3xl p-6 sm:p-8 bg-gradient-to-br border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 outline-none ${className}`}>
            <Link
              href="/capabilities"
              className="static inset-0 outline-none flex flex-col h-full"
              aria-label={`Learn more about ${title}`}
            >
              <div className="flex items-start justify-between mb-6">
                 <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border ${iconCls} transition-transform duration-300 group-hover:scale-110`}>
                   <Icon className="h-7 w-7" aria-hidden />
                 </div>
                 <div className="px-3 py-1 rounded-full bg-background border border-border/50 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                   For: {who}
                 </div>
              </div>
              
              <h3 className="text-2xl font-bold font-headline text-foreground leading-tight">{title}</h3>
              <p className="mt-3 text-sm sm:text-base font-medium text-foreground/80 leading-relaxed max-w-[280px]">{promise}</p>
              
              <div className="mt-8 pt-6 border-t border-border/40 flex-grow">
                <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-4 block">What is included</span>
                <ul className="space-y-3">
                  {bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                       <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 opacity-50" />
                       <span className="text-sm text-muted-foreground leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

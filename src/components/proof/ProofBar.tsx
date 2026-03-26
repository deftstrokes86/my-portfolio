'use client';
import React from 'react';
import { CheckCircle2, ShieldCheck, Rocket, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';

export type ProofItem = { id: string; text: string; icon?: React.ReactNode };
export type ProofBarProps = {
  items?: ProofItem[];
  className?: string;
  size?: 'compact' | 'comfortable';
};

const DEFAULT_ITEMS: ProofItem[] = [
  { id: 'vitals',   text: 'Core Web Vitals: Green', icon: <CheckCircle2 className="size-4 opacity-80" /> },
  { id: 'a11y',     text: 'AA Contrast',            icon: <ShieldCheck   className="size-4 opacity-80" /> },
  { id: 'launches', text: '20+ launches',           icon: <Rocket       className="size-4 opacity-80" /> },
  { id: 'ttfb',     text: '<1s TTFB',               icon: <Zap          className="size-4 opacity-80" /> },
];

export default function ProofBar({ items = DEFAULT_ITEMS, className = '', size = 'comfortable' }: ProofBarProps) {
  const sizeCls = size === 'compact' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';
  const prefersReduced = useReducedMotion();
  
  return (
    <div className={cn('relative w-full', className)} aria-label="Site proof points">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-background to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background to-transparent" />
      
      <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2.5 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none]" role="list">
        {items.map((it) => (
          <motion.li
            key={it.id}
            className={cn(
                'snap-start shrink-0 rounded-full border border-border/50 bg-card/60 text-foreground/90 backdrop-blur',
                sizeCls
            )}
            initial={prefersReduced ? false : { opacity: 0, y: 6 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <span className="sr-only">Proof point: </span>
            {it.icon ? <span className="mr-1.5 inline-flex items-center">{it.icon}</span> : null}
            {it.text}
          </motion.li>
        ))}
      </ul>
      <style jsx>{`ul::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}

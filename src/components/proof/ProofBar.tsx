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
      
      <ul className="container mx-auto flex gap-2 overflow-x-auto py-2.5 snap-x snap-mandatory scrollbar-hide" role="list">
        {items.map((it) => (
          <motion.li
            key={it.id}
            className={cn(
                'snap-start shrink-0 rounded-full border border-amber-500/40 bg-card/60 text-foreground/90 backdrop-blur inline-flex items-center gap-1.5',
                sizeCls
            )}
            initial={prefersReduced ? false : { opacity: 0, y: 6 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <span className="sr-only">Proof point: </span>
            {it.icon ? <span className="flex items-center justify-center">{it.icon}</span> : null}
            <span className="leading-none pt-0.5">{it.text}</span>
          </motion.li>
        ))}
      </ul>
      <style jsx>{`ul::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type BadgeProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ href, children, className }: BadgeProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center rounded-full bg-secondary/50 px-3 py-1.5 text-sm border border-border/50 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      {children}
    </Link>
  );
}

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function BackToTop() {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <Button
      asChild
      variant="outline"
      className="fixed bottom-6 right-6 z-50 h-auto gap-2 rounded-full
                 bg-background/80 px-3 py-2 text-sm backdrop-blur
                 shadow-lg transition-all
                 hover:-translate-y-0.5"
      aria-label="Back to top"
    >
      <Link href="#top">
        <ArrowUp className="h-4 w-4" />
        Top
      </Link>
    </Button>
  );
}

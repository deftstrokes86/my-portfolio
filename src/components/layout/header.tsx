'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { AccessibilityControls } from '@/components/accessibility-controls';
import { navLinks, siteConfig } from '@/lib/data';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Logo = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // To prevent hydration mismatch, we don't render the theme-dependent SVG on the server.
    // The server will render nothing, and the client will render the correct logo after mounting.
    // The `opacity` transition ensures a smooth fade-in effect.
    if (!mounted) {
        return <div style={{ width: '32px', height: '32px' }} />;
    }

    const sMonogramPath = "M43.6,33.1c-2.6-2.5-5.6-3.8-9.2-3.8c-4.9,0-8.9,1.8-12.1,5.5c-3.2,3.6-4.8,8.3-4.8,14c0,5.7,1.6,10.4,4.8,14c3.2,3.6,7.2,5.5,12.1,5.5c3.6,0,6.7-1.3,9.2-3.8c2.6-2.5,3.9-5.9,3.9-10.3h-11.2v-7.2h18.3v3.6c0,5.8-1.8,10.8-5.3,15.1c-3.6,4.2-8.4,6.3-14.4,6.3c-6.2,0-11.4-2.2-15.5-6.6c-4.1-4.4-6.1-10.2-6.1-17.3c0-7,2-12.8,6.1-17.3c4.1-4.4,9.3-6.6,15.5-6.6c6,0,11.1,2.1,14.4,6.3c2.3,2.8,3.5,6,3.7,9.6h-7.2C51.1,36.5,49.1,34.4,43.6,33.1z";
    const color = resolvedTheme === 'dark' ? '#EBEBEB' : '#1a1a1a';
    
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
        >
            <path
                d={sMonogramPath}
                fill={color}
            />
        </svg>
    );
}


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground link-underline">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <AccessibilityControls />
          <Button>Hire Me</Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <AccessibilityControls />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              </SheetHeader>
              <div className="grid gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold">
                  <Logo />
                  <span>{siteConfig.name}</span>
                </Link>
                <nav className="grid gap-4">
                  {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium">
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <Button className="w-full">Hire Me</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

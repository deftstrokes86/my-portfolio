'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { AccessibilityControls } from '@/components/accessibility-controls';
import { navLinks, siteConfig } from '@/lib/data';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Logo = () => {
    return (
        <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-md object-contain"
        />
    );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold relative z-10">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground link-underline">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex relative z-10">
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

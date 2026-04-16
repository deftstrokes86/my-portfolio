import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig, navLinks } from '@/lib/data';
import { Mail, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border/40 pb-8 pt-16 md:pt-24 lg:pt-32 relative z-10 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 border-b border-border/40 pb-16 lg:pb-20">
          
          {/* Brand Block */}
          <div className="md:col-span-12 lg:col-span-6 flex flex-col items-start pr-4">
            <Link 
              href="/" 
              className="font-headline text-3xl font-extrabold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 -ml-1"
            >
              {siteConfig.author}
            </Link>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-sm leading-relaxed">
              Designer-engineer building fast, accessible, production-ready web products.
            </p>
            <div className="mt-10">
               <p className="text-xs font-bold tracking-widest uppercase text-foreground/50 mb-4 ml-1">Current Status</p>
               <div className="flex items-center gap-3 bg-secondary/30 border border-border/50 px-5 py-2.5 rounded-full w-fit shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-foreground/90">Available for new projects</span>
               </div>
            </div>
          </div>

          {/* Navigation Block */}
          <div className="md:col-span-5 lg:col-span-2 lg:col-start-8">
            <h3 className="font-bold text-foreground mb-6">Navigation</h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center text-muted-foreground transition-colors hover:text-foreground font-medium w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-1 -ml-1"
                  >
                    {link.label}
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-0 -translate-y-1 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Block */}
          <div className="md:col-span-7 lg:col-span-3 flex flex-col">
            <h3 className="font-bold text-foreground mb-6">Connect</h3>
            
            <a 
              href={`mailto:steveigbeuike@gmail.com?subject=Project%20Inquiry%20from%20Portfolio`} 
              className="group flex items-center gap-4 text-muted-foreground transition-colors hover:text-foreground font-medium w-fit mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full pr-4 -ml-1"
            >
               <div className="h-10 w-10 rounded-full bg-secondary/50 border border-border/60 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary shadow-sm">
                 <Mail className="h-4 w-4" />
               </div>
               <span className="truncate">steveigbeuike@gmail.com</span>
            </a>

            <div className="bg-gradient-to-br from-secondary/40 to-transparent border border-border/50 rounded-3xl p-6 shadow-sm">
               <p className="text-sm text-foreground/90 font-medium leading-relaxed mb-5">Have a product to launch, refine, or rebuild? Let's talk.</p>
               <div className="flex items-center gap-3">
                 <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full bg-background border border-border/40 hover:bg-secondary transition-all hover:-translate-y-0.5" aria-label="LinkedIn Profile" asChild>
                   <Link href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin className="h-4.5 w-4.5" /></Link>
                 </Button>
                 <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full bg-background border border-border/40 hover:bg-secondary transition-all hover:-translate-y-0.5" aria-label="GitHub Profile" asChild>
                   <Link href={siteConfig.socials.github} target="_blank" rel="noreferrer"><Github className="h-4.5 w-4.5" /></Link>
                 </Button>
                 <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full bg-background border border-border/40 hover:bg-secondary transition-all hover:-translate-y-0.5" aria-label="Twitter Profile" asChild>
                   <Link href={siteConfig.socials.twitter} target="_blank" rel="noreferrer"><Twitter className="h-4.5 w-4.5" /></Link>
                 </Button>
               </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} {siteConfig.author}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground/70 font-medium">
             <span>Abuja, Nigeria</span>
             <span className="hidden sm:inline-block">&middot;</span>
             <span className="hidden sm:inline-block">West Africa Standard Time</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

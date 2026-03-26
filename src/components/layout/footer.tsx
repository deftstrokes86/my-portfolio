
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig, navLinks } from '@/lib/data';
import { Mail } from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35.0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35.0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></svg>
);
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 4.4s-1.4 1.4-2.8 1.4c-.7 0-1.4-.2-2-.5.8 3.8-3.3 6.6-6.6 6.6s-6.6-3.3-6.6-6.6c0-1.4.3-2.8 1-4.1-3.3.4-6.6-1.4-6.6-5.5 0-.7.3-1.4 1-2.1.3-.3.6-.6 1-.8.2-.1.4-.2.6-.3.2-.1.4-.1.6-.1.3 0 .6.1.8.2.3.1.5.3.7.5.3.2.5.5.7.8.2.3.4.6.5.9.2.3.3.7.4 1 .1.3.1.6.1.9s0 .6-.1.9c-.1.3-.2.6-.3.9-.1.3-.3.6-.5.8-.2.3-.4.5-.7.7-.2.2-.5.4-.7.5-.3.1-.5.2-.8.2H2.1c-.1 0-.1.1-.1.1.1.3.2.6.4.8.1.3.3.5.5.7.2.2.5.4.7.5.3.2.6.3.9.4.3.1.6.1.9.1.3 0 .6 0 .9-.1.3-.1.6-.2.8-.4.3-.1.5-.3.7-.5s.4-.4.5-.7c.1-.3.2-.6.3-.9.1-.3.1-.6.1-.9s0-.6-.1-.9c-.1-.3-.2-.6-.4-.9-.1-.3-.3-.5-.5-.8-.2-.3-.4-.5-.7-.7-.2-.2-.5-.4-.7-.5-.3-.1-.5-.2-.8-.2-.3 0-.6-.1-.8 0-.3.1-.5.2-.7.4-.2.2-.4.4-.6.6-.1.2-.3.4-.4.6-.1.2-.2.4-.2.6s.1.4.1.6.1.4.2.6c.1.2.2.4.3.5.1.2.3.3.4.4.2.1.3.2.5.3.2.1.4.1.6.1h.3c.2 0 .4-.1.6-.1.2-.1.4-.2.6-.3.2-.1.4-.3.6-.4.1-.2.3-.3.4-.5.1-.2.2-.4.3-.6.1-.2.1-.4.1-.6 0-.2-.1-.4-.1-.6-.1-.2-.1-.4-.2-.5-.1-.2-.2-.3-.3-.4-.1-.1-.3-.2-.4-.3-.1-.1-.3-.1-.4-.1z"/></svg>
);
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-secondary/30">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-12 md:px-6">
        <div className="col-span-1 md:col-span-5">
          <Link href="/" className="font-headline text-xl font-bold">{siteConfig.name}</Link>
          <p className="mt-4 max-w-md text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <div className="col-span-1 md:col-span-2 md:col-start-7">
          <h3 className="font-headline font-semibold">Menu</h3>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 md:col-span-3">
          <h3 className="font-headline font-semibold">Contact</h3>
          <div className="mt-4 space-y-2">
            <a href={`mailto:steveigbeuike@gmail.com?subject=Project%20Inquiry%20from%20${siteConfig.name}%20Portfolio`} className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                <Mail className="h-4 w-4" />
                <span>steveigbeuike@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border/40 py-6 md:flex-row md:py-8">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.author}. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={siteConfig.socials.twitter} target="_blank" rel="noreferrer">
              <TwitterIcon className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={siteConfig.socials.github} target="_blank" rel="noreferrer">
              <GithubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}

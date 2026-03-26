
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { projects } from '@/lib/data';

type Project = typeof projects[number];

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card p-3 sm:p-4 transition-all duration-500 ease-out hover:shadow-2xl hover:border-primary/40 focus-within:ring-2 focus-within:ring-primary h-full">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-secondary/50">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          data-ai-hint={project.hint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-col flex-grow pt-6 px-2 pb-2">
        {/* Header */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <h3 className="font-headline text-2xl font-bold text-foreground">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-primary mt-1">{project.role}</p>
          </div>
          <Button size="icon" variant="secondary" className="rounded-full bg-secondary/50 group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0" asChild>
            <Link href={project.liveURL} aria-label={`View ${project.title} live`}>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        {/* Breakdown */}
        <div className="space-y-4 mb-8 flex-grow">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">What we built</span>
            <p className="text-sm text-foreground/90">{project.summary}</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Problem</span>
            <p className="text-sm text-foreground/90">{project.problem}</p>
          </div>
          <div className="p-3 bg-secondary/30 rounded-xl border border-border/50">
            <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">Outcome</span>
            <p className="text-sm font-medium text-foreground">{project.outcome}</p>
          </div>
        </div>

        {/* Footer (Tags) */}
        <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-border/40">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-background/50 border-border/60 text-xs font-medium text-muted-foreground group-hover:border-primary/20">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

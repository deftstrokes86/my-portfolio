
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { projects } from '@/lib/data';

type Project = (typeof projects)[0];

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <CardHeader>
        <div className="relative h-48 w-full">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="rounded-t-lg object-cover"
            data-ai-hint={project.hint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
        <p className="text-muted-foreground">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="group p-0">
          <Link href={project.liveURL}>
            View Project
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

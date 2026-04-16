
// This is a placeholder for the case study page.
// We will build this out in a future step.

import { notFound } from 'next/navigation';
import { caseStudies } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === resolvedParams.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl py-16 md:py-24">
        <article className="prose prose-lg max-w-none dark:prose-invert">
            <CardDescription>Case Study: {caseStudy.projectTitle}</CardDescription>
            <h1>{caseStudy.projectTitle}</h1>
            
            <section>
                <h2>Problem</h2>
                <p>{caseStudy.problem}</p>
            </section>

            <section>
                <h2>Approach</h2>
                <p>{caseStudy.approach}</p>
            </section>
            
            <section>
                <h2>Results</h2>
                <p>{caseStudy.results}</p>
            </section>

            <section>
                <h2>Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                    {caseStudy.tech.map(t => <Badge key={t}>{t}</Badge>)}
                </div>
            </section>
        </article>
    </div>
  );
}

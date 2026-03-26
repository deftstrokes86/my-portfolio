
'use client';

import Link from 'next/link';
import { writing } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="container mx-auto max-w-5xl py-16 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          From the Keyboard
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground md:text-xl/relaxed">
          Thoughts on design, development, and everything in between.
        </p>
      </div>

      <div className="grid gap-8">
        {writing.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
            <Card className="transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="font-headline text-2xl group-hover:text-primary">
                  {post.title}
                </CardTitle>
                <CardDescription>
                  {post.date} · {post.readTime}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                 <div className="mt-4 flex items-center text-primary font-medium">
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

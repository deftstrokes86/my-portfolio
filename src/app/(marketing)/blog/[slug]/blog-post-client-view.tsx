
'use client';

import { useState, useEffect } from 'react';
import type { Writing } from '@/lib/data';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// This is a simple markdown to HTML converter
function markdownToHtml(markdown: string) {
    return markdown
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\\n/g, '<br />')
        .replace(/\n/g, '<br />');
}

export function BlogPostClientView({ post }: { post: Writing }) {
    const [readingProgress, setReadingProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPosition = window.scrollY;
            const progress = (scrollPosition / totalHeight) * 100;
            setReadingProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
         <>
            <Progress value={readingProgress} className="fixed top-16 left-0 right-0 h-1 rounded-none z-50" />
            <div className="container mx-auto max-w-4xl py-16 md:py-24">
                <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to all articles
                </Link>
                <article className="prose prose-lg max-w-none dark:prose-invert">
                    <div className="mb-8">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{post.date} · {post.readTime}</p>
                    </div>
                    <h1>{post.title}</h1>
                    <p className="lead">{post.summary}</p>
                    <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
                </article>
            </div>
        </>
    )
}

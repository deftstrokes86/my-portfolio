'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { savePostAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function NewPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    await savePostAction({
      title: formData.get('title') as string,
      slug: (formData.get('title') as string).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      summary: formData.get('summary') as string,
      content: formData.get('content') as string,
      tags: (formData.get('tags') as string).split(',').map(t => t.trim()),
      date: new Date().toISOString().split('T')[0]
    });

    router.push('/cms');
    router.refresh();
  }

  return (
    <div className="container mx-auto py-12 max-w-3xl">
      <h1 className="text-4xl font-headline font-bold mb-8">Write a Post</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="font-semibold mb-2 block">Title</label>
          <Input name="title" required placeholder="e.g. Next.js 15 Features" />
        </div>

        <div>
           <label className="font-semibold mb-2 block">Summary</label>
           <Input name="summary" required placeholder="A short description." />
        </div>

        <div>
           <label className="font-semibold mb-2 block">Tags (comma separated)</label>
           <Input name="tags" required placeholder="React, Node.js, Web" />
        </div>

        <div>
           <label className="font-semibold mb-2 block">Content (Markdown)</label>
           <Textarea 
             name="content" 
             required 
             className="min-h-[400px] font-mono" 
             placeholder="## Intro&#10;Write your markdown here..."
           />
        </div>

        <div className="flex justify-end mt-4">
          <Button type="submit" size="lg" disabled={loading}>
             {loading ? 'Publishing...' : 'Publish Post'}
          </Button>
        </div>
      </form>
    </div>
  );
}

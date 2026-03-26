import Link from 'next/link';
import { getPosts, deletePost } from '@/lib/posts';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { revalidatePath } from 'next/cache';

export default async function CMSDashboard() {
  const posts = await getPosts();

  async function handleDelete(slug: string) {
    'use server';
    await deletePost(slug);
    revalidatePath('/cms');
    revalidatePath('/blog');
  }

  return (
    <div className="container mx-auto py-12 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-headline font-bold">CMS Dashboard</h1>
        <div className="flex items-center gap-4">
            <Button asChild>
            <Link href="/cms/new">Write New Post</Link>
            </Button>
            <form action={async () => {
                'use server';
                const { cookies } = await import('next/headers');
                const store = await cookies();
                store.delete('cms_auth');
            }}>
                <Button variant="secondary" type="submit">Logout</Button>
            </form>
        </div>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.slug}>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <div className="text-sm text-muted-foreground mt-1">{post.date} &mdash; {post.readTime}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href={`/blog/${post.slug}`}>View</Link>
                </Button>
                <form action={async () => {
                    'use server';
                    await deletePost(post.slug);
                    revalidatePath('/cms');
                    revalidatePath('/blog');
                }}>
                    <Button variant="destructive" type="submit">Delete</Button>
                </form>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

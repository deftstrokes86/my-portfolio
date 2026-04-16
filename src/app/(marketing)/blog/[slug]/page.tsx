
'use server';

import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/posts';
import { BlogPostClientView } from './blog-post-client-view';
import { JSONLD, blogPostingLD } from '@/lib/structured-data';
import { siteUrl } from '@/lib/seo';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const ogImageUrl = siteUrl(`/api/og?title=${encodeURIComponent(post.title)}`);

  return (
    <>
      <JSONLD
        data={blogPostingLD({
          headline: post.title,
          url: siteUrl(`/blog/${post.slug}`),
          datePublished: post.date,
          image: ogImageUrl,
          authorName: 'Stephen-Igwebuike'
        })}
      />
      <BlogPostClientView post={post} />
    </>
  );
}

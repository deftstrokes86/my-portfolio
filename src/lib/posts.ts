import fs from 'fs/promises';
import path from 'path';
import { writing as staticWriting, type Writing } from '@/lib/data';

const POSTS_DIR = path.join(process.cwd(), 'src', 'data', 'blog');

export async function getPosts(): Promise<Writing[]> {
  try {
    const files = await fs.readdir(POSTS_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    
    const dynamicPosts: Writing[] = [];
    for (const file of jsonFiles) {
      const content = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8');
      dynamicPosts.push(JSON.parse(content));
    }
    
    return [...dynamicPosts, ...staticWriting].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (e) {
    return [...staticWriting];
  }
}

export async function getPostBySlug(slug: string): Promise<Writing | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}

export async function savePost(data: Omit<Writing, 'readTime'>) {
    const wordCount = data.content.split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / 200)} min read`;
    const post: Writing = { ...data, readTime };

    await fs.mkdir(POSTS_DIR, { recursive: true });
    await fs.writeFile(path.join(POSTS_DIR, `${post.slug}.json`), JSON.stringify(post, null, 2));
}

export async function deletePost(slug: string) {
    try {
        await fs.unlink(path.join(POSTS_DIR, `${slug}.json`));
    } catch (e) {
        // Can't delete static posts, ignore error
    }
}

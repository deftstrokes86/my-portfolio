'use server';

import { savePost } from '@/lib/posts';
import type { Writing } from '@/lib/data';

export async function savePostAction(data: Omit<Writing, 'readTime'>) {
  await savePost(data);
}

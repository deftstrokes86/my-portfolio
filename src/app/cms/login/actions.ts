'use server';

import { cookies } from 'next/headers';

export async function loginAction(password: string) {
  // In a real application, make this an environment variable.
  const CORRECT_PASSWORD = process.env.CMS_PASSWORD || 'admin';
  
  if (password === CORRECT_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('cms_auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/cms',
    });
    return true;
  }
  
  return false;
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('cms_auth');
}

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stephenigwebuike.com';
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // example disallows:
      { userAgent: '*', disallow: ['/api/private', '/admin'] },
    ],
    sitemap: `${base}/sitemap.xml`, // add if you have sitemap.ts
    host: base,
  };
}

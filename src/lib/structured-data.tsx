import React from 'react';

export const personLD = (opts?: {
  name?: string; url?: string; sameAs?: string[]; jobTitle?: string; email?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: opts?.name ?? 'Stephen Maclaurin Igwebuike',
  url: opts?.url ?? 'https://stephenigwebuike.com',
  jobTitle: opts?.jobTitle ?? 'Designer-Engineer, Author',
  email: opts?.email,
  sameAs: opts?.sameAs ?? [
    'https://github.com/deftstrokes86',
    'https://www.linkedin.com/in/stephen-maclaurin-igwebuike',
    // add more…
  ],
});

export const websiteLD = (opts?: { url?: string; name?: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: opts?.url ?? 'https://stephenigwebuike.com',
  name: opts?.name ?? 'Stephen Igwebuike',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${opts?.url ?? 'https://stephenigwebuike.com'}/search?q={query}`,
    'query-input': 'required name=query',
  },
});

export const blogPostingLD = (p: {
  headline: string; datePublished: string; dateModified?: string; authorName?: string; url: string; image?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: p.headline,
  url: p.url,
  datePublished: p.datePublished,
  dateModified: p.dateModified ?? p.datePublished,
  author: { '@type': 'Person', name: p.authorName ?? 'Stephen M. Igwebuike' },
  image: p.image ? [p.image] : undefined,
});

export const creativeWorkLD = (p: { name: string; url: string; genre?: string; inLanguage?: string; isAccessibleForFree?: boolean; }) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: p.name,
  url: p.url,
  genre: p.genre ?? 'Short stories',
  inLanguage: p.inLanguage ?? 'en',
  isAccessibleForFree: p.isAccessibleForFree ?? false,
});

export function JSONLD({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

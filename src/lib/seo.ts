export const siteUrl = (path = '/') =>
  new URL(path, process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stephenigwebuike.com').toString();

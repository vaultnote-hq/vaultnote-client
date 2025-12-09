import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://vaultnote.net';
  
  // Static pages with their priorities and change frequencies
  const staticPages = [
    {
      url: '',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: '/pricing',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: '/privacy',
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.5
    },
    {
      url: '/terms',
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.5
    },
    {
      url: '/status',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.3
    },
    {
      url: '/create',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  });
}

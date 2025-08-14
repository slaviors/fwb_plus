export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/doanh/'],
    },
    sitemap: 'https://fwbplus.id/sitemap.xml',
  };
}

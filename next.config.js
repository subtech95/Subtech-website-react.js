/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // ESLint warnings shouldn't block production builds. TypeScript errors still do.
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ["earth.subtech.in", "crm.subtech.in"],
  },
  /**
   * 301 redirects so the new Next.js site honours the URLs the PHP site used
   * to expose. Keeps Google Search Console results, sitemaps, and any printed
   * marketing material pointing at subtech.in alive.
   */
  async redirects() {
    return [
      // PHP site used /category/<slug>; we use /products/<slug>
      {
        source: "/category/:slug*",
        destination: "/products/:slug*",
        permanent: true,
      },
      // PHP "blogs" → singular "blog"
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/blogs/:slug*", destination: "/blog/:slug*", permanent: true },
      // Old .php URLs
      {
        source: "/smart-motor-control-panel.php",
        destination: "/smart-motor-control-panel",
        permanent: true,
      },
      {
        source: "/mpu_subtech.php",
        destination: "/products/mpu",
        permanent: true,
      },
      {
        source: "/pmc_subtech.php",
        destination: "/products/pmc",
        permanent: true,
      },
      { source: "/pathshala.php", destination: "/pathshala", permanent: true },
      { source: "/about.php", destination: "/about", permanent: true },
      { source: "/contact.php", destination: "/contact", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

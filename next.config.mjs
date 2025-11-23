// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: [
//       // ... your other domains
//       'www.everlane.com',
//       'cdn.shopify.com'
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.everlane.com',
        // pathname: '/**', // You can be more specific here
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        // pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
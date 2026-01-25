/** @type {import('next').NextConfig} */
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
});

const nextConfig = {
  output: 'export', // Generuje statyczny HTML (ważne dla "niezatapialności")
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true, // Wymagane przy 'export' (Next nie może optymalizować zdjęć bez serwera)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yellow-elegant-porpoise-917.mypinata.cloud', // Twoja bramka IPFS
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withSerwist(nextConfig);

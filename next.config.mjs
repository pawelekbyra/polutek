/** @type {import('next').NextConfig} */
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
});

const nextConfig = {
  output: 'export',
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
  },
};

export default withSerwist(nextConfig);

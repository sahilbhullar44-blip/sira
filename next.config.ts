import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "moayqfbjnjvkdixe.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;

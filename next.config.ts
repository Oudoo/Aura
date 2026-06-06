import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Self-hosted (Hostinger): skip the built-in image optimizer so we don't
    // depend on optimizer infrastructure. Images are served as-is.
    unoptimized: true,
  },
};

export default nextConfig;

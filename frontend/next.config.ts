import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow SVG images for placeholder images during development
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

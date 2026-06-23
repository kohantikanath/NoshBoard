import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nosh-assignment.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;

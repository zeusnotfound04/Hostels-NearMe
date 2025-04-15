import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hostelsnearme-web-storage.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "content.jdmagicbox.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bgiedu.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "grdedu.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "snit.edu.in",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

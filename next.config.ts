import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "127.0.0.1",
    "http://127.0.0.1:3000",
    "localhost:3000",
    "192.168.0.9:3000",
  ],
  /* config options here */
  // cacheComponents: true,
  // partialPrefetching: true,
  output: "standalone",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // logging: {
  //   browserToTerminal: false,
  // },
};

export default nextConfig;

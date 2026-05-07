import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["@prisma/client", "bcryptjs", "bcrypt"],
  images: {
    localPatterns: [
      {
        pathname: "/blog/**",
        search: "?v=2",
      },
    ],
  },
};

export default nextConfig;

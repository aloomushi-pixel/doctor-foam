import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["@prisma/client", "bcryptjs", "bcrypt"],
  images: {
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog/detallado-interior-profundo-que-incluye",
        destination: "/lavado-profundo-vehiculos-cdmx/diferencias-servicios-detallado",
        permanent: true,
      },
      {
        source: "/blog/por-que-detallado-domicilio-mejor",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/lavado-autos-:zona(polanco|lomas-de-chapultepec|santa-fe|bosques-de-las-lomas|pedregal|interlomas|huixquilucan|coyoacan)",
        destination: "/zonas/:zona",
      },
    ];
  },
};

export default nextConfig;

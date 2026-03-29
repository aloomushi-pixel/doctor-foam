import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
};

export default nextConfig;

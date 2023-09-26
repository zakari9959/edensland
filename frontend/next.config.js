/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'], // Ajoutez ici le domaine ou l'adresse IP autorisée
  },
};

module.exports = nextConfig;

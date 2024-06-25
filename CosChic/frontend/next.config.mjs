// next.config.mjs

const nextConfig = {
  // Your configuration options here
  async exportPathMap() {
    return {
      '/': { page: '/' }, // Export only the landing page
    };
  },
};

export default nextConfig;

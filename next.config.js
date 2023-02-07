module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    images: {
      domains: ['i.ytimg.com', 'yt3.ggpht.com'],
      unoptimized: true,
    },
    experimental: {
      appDir: true,
    },
  }
  return nextConfig
}
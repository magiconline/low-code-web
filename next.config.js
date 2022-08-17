/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // distDir: "build"
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/index.html'
            }
        ]
    }
}

module.exports = nextConfig

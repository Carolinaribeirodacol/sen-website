const remotePatterns = process.env.NODE_ENV === 'development'
    ? [
        {
            hostname: 'localhost',
            port: '1337',
        }
    ]
    : [
        {
            protocol: 'https',
            hostname: process.env.NEXT_PUBLIC_API_DOMAIN
        }
    ]

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['*'],
        formats: ['image/avif', 'image/webp', 'image/png', 'image/jpg'],
    },
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns
    },
}

module.exports = nextConfig
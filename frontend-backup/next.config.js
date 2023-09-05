const remotePatterns = (process.env.NODE_ENV === 'development')
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
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns
    },
}

module.exports = nextConfig
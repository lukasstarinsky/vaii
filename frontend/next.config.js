/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    async redirects() {
        return [
            {
                source: "/",
                destination: "/forum",
                permanent: true
            }
        ]
    }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // CHANGE PORT 8000 TO WHATEVER YOUR PYTHON SERVER RUNS ON
        destination: 'http://127.0.0.1:8000/:path*',
      },
    ]
  },
}

module.exports = nextConfig
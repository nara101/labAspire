/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Project ini memakai <img> biasa (bukan next/image) agar konfigurasi tetap sederhana.
  // Bila ingin migrasi ke next/image, daftarkan domain-nya di images.remotePatterns.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'covers.openlibrary.org' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pinimg.com' }
    ]
  }
}

export default nextConfig

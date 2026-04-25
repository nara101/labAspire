import '@/styles/globals.css'
import Script from 'next/script'
import Providers from './providers'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'LibrAspire – Toko Buku Online',
  description:
    'Toko buku online dengan katalog jutaan buku dari Open Library. Cari, pilih, dan tambahkan ke keranjang.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {/* Font Awesome dimuat via Script tag sesuai template HTML asli */}
        <Script
          src="https://kit.fontawesome.com/a86e913760.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Providers>
          <Header />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

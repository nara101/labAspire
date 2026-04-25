import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="cart-page text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-xl mt-4 mb-6">Halaman tidak ditemukan.</p>
      <Link href="/" className="btn btn-primary inline-block">
        <i className="fa-solid fa-house mr-2"></i>
        Kembali ke Beranda
      </Link>
    </div>
  )
}

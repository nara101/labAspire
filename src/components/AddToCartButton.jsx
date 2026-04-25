'use client'

import { useCart } from '@/context/CartContext'

/**
 * Tombol interaktif untuk menambahkan buku ke keranjang.
 * (Menggantikan BorrowButton dari template karena ini toko buku, bukan perpustakaan.)
 */
export default function AddToCartButton({ book, size = 'md' }) {
  const { addToCart, isInCart, hydrated } = useCart()
  const inCart = hydrated && isInCart(book.id)

  function handleClick() {
    addToCart(book)
  }

  const classNames = size === 'lg' ? 'btn btn-primary' : 'btn-add-cart'

  return (
    <button
      className={classNames}
      onClick={handleClick}
      disabled={inCart}
      aria-label={inCart ? 'Sudah di keranjang' : 'Tambah ke keranjang'}
    >
      {inCart ? (
        <>
          <i className="fa-solid fa-check"></i> Di Keranjang
        </>
      ) : (
        <>
          <i className="fa-solid fa-cart-plus"></i> Tambah ke Keranjang
        </>
      )}
    </button>
  )
}

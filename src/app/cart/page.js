'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { items, hydrated, removeFromCart, clearCart } = useCart()

  // Selama hydration belum selesai, tampilkan skeleton sederhana agar konsisten dengan SSR
  if (!hydrated) {
    return (
      <div className="cart-page">
        <h1 className="text-3xl font-bold">Keranjang</h1>
        <div className="cart-wrapper">
          <div className="status-message">
            <div className="loader"></div>
            <p className="mt-4">Memuat keranjang...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1 className="text-3xl font-bold">
        <i className="fa-solid fa-cart-shopping mr-3"></i>
        Keranjang Saya ({items.length})
      </h1>

      <div className="cart-wrapper">
        {items.length === 0 ? (
          <div className="cart-empty">
            <i className="fa-solid fa-cart-shopping"></i>
            <p className="text-lg">Keranjang masih kosong.</p>
            <p className="text-sm mt-2">Yuk pilih buku favoritmu dulu!</p>
            <Link href="/" className="btn btn-primary inline-block mt-4">
              <i className="fa-solid fa-book-open mr-2"></i>
              Jelajahi Buku
            </Link>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}

            <div className="cart-footer">
              <button
                onClick={() => {
                  if (confirm('Yakin kosongkan keranjang?')) clearCart()
                }}
                className="btn"
                style={{
                  background: 'transparent',
                  color: '#dc2626',
                  border: '1px solid #dc2626'
                }}
              >
                <i className="fa-solid fa-trash mr-2"></i>
                Kosongkan Keranjang
              </button>
              <button
                onClick={() => {
                  alert(
                    `Pesanan untuk ${items.length} buku telah dicatat (demo).\n\nTerima kasih!`
                  )
                  clearCart()
                }}
                className="btn btn-primary"
              >
                <i className="fa-solid fa-credit-card mr-2"></i>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function CartItem({ item, onRemove }) {
  const [imgError, setImgError] = useState(false)
  const src = imgError
    ? 'https://via.placeholder.com/70x95/d2a679/ffffff?text=X'
    : item.cover

  return (
    <div className="cart-item">
      <img
        src={src}
        alt={item.title}
        onError={() => setImgError(true)}
        loading="lazy"
      />
      <div className="cart-item-info">
        <h4>{item.title}</h4>
        <p>{item.author}</p>
        {/* Link ke detail tetap pakai id */}
        <Link
          href={`/books/${item.id}`}
          className="text-sm text-primary hover:underline"
        >
          Lihat detail
        </Link>
      </div>
      <button
        className="btn-remove"
        onClick={onRemove}
        aria-label={`Hapus ${item.title} dari keranjang`}
      >
        <i className="fa-solid fa-trash"></i> Hapus
      </button>
    </div>
  )
}

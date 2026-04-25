'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import LoginModal from './LoginModal'

export default function Header() {
  const { count, hydrated } = useCart()
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <div className="header">
        <Link href="/" className="logo">LibrAspire</Link>

        <div className="auth">
          <Link href="/cart" className="cart-btn" aria-label="Keranjang">
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Keranjang</span>
            {hydrated && count > 0 && (
              <span className="cart-badge">{count}</span>
            )}
          </Link>
          <button onClick={() => setShowLogin(true)}>Login</button>
          <button>Register</button>
        </div>
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  )
}

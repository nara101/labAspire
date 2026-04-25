'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'libraspire_cart'

function loadCartFromStorage() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.warn('[CartContext] Gagal load cart:', error)
    return []
  }
}

function saveCartToStorage(items) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.warn('[CartContext] Gagal save cart:', error)
  }
}

export function CartProvider({ children }) {
  // Mulai dengan empty array agar SSR dan client initial render sama (anti hydration mismatch)
  const [items, setItems] = useState([])
  const [hydrated, setHydrated] = useState(false)

  // Hydrate dari localStorage setelah mount
  useEffect(() => {
    setItems(loadCartFromStorage())
    setHydrated(true)
  }, [])

  // Simpan setiap perubahan (setelah hydrated supaya tidak menimpa saat mount awal)
  useEffect(() => {
    if (hydrated) saveCartToStorage(items)
  }, [items, hydrated])

  const addToCart = useCallback((book) => {
    if (!book || !book.id) {
      console.warn('[CartContext] Buku tidak valid:', book)
      return false
    }
    setItems((prev) => {
      if (prev.some((item) => item.id === book.id)) return prev
      return [
        ...prev,
        {
          id: book.id,
          title: book.title,
          author: book.author,
          cover: book.cover,
          addedAt: Date.now()
        }
      ]
    })
    return true
  }, [])

  const removeFromCart = useCallback((bookId) => {
    setItems((prev) => prev.filter((item) => item.id !== bookId))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const isInCart = useCallback(
    (bookId) => items.some((item) => item.id === bookId),
    [items]
  )

  const value = {
    items,
    count: items.length,
    hydrated,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart harus digunakan di dalam CartProvider')
  return ctx
}

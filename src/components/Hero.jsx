'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')

  function submitSearch() {
    const trimmed = query.trim()
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    } else if (category) {
      router.push(`/search?subject=${encodeURIComponent(category)}`)
    } else {
      router.push('/search')
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      submitSearch()
    }
  }

  function handleCategoryChange(e) {
    const value = e.target.value
    setCategory(value)
    if (value) {
      router.push(`/search?subject=${encodeURIComponent(value)}`)
    }
  }

  function handleSapa() {
    alert('Selamat datang di LibrAspire!')
  }

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Semua Buku yang Kamu Cari, Ada di Sini 📚</h1>
        <p>Temukan berbagai buku menarik untuk menemani harimu.</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Judul atau penulis..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Cari buku"
        />
        <button className="btn btn-primary" onClick={submitSearch}>
          <i className="fa-solid fa-magnifying-glass"></i> Cari
        </button>
      </div>

      <select
        value={category}
        onChange={handleCategoryChange}
        className="p-2 rounded text-gray-800"
        aria-label="Filter kategori"
      >
        <option value="">Semua Kategori</option>
        <option value="Teknologi">Teknologi</option>
        <option value="Novel">Novel</option>
        <option value="Bisnis">Bisnis</option>
        <option value="Sejarah">Sejarah</option>
        <option value="Edukasi">Edukasi</option>
        <option value="Sains">Sains</option>
      </select>

      <button className="btn btn-primary" onClick={handleSapa}>
        Sapa
      </button>
    </section>
  )
}

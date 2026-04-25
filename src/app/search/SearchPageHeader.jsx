'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchPageHeader({ initialQuery = '', initialSubject = '' }) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)

  function submit() {
    const trimmed = query.trim()
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    } else {
      router.push('/search')
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit()
    }
  }

  function handleSelect(e) {
    const value = e.target.value
    if (value) {
      router.push(`/search?subject=${encodeURIComponent(value)}`)
    } else {
      router.push('/search')
    }
  }

  return (
    <section
      style={{
        background: '#8b4513',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}
    >
      <h1 className="text-white text-2xl font-bold">Cari Buku Favoritmu</h1>
      <div className="search-box" style={{ maxWidth: 700 }}>
        <input
          type="text"
          placeholder="Judul atau penulis..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Cari buku"
        />
        <button className="btn btn-primary" onClick={submit} style={{ background: 'white', color: '#5a2d0c', borderColor: 'white' }}>
          <i className="fa-solid fa-magnifying-glass"></i> Cari
        </button>
      </div>
      <select
        defaultValue={initialSubject}
        onChange={handleSelect}
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
    </section>
  )
}

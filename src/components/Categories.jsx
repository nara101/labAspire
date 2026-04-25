'use client'

import Link from 'next/link'

const CATEGORIES = [
  { label: 'Teknologi', icon: 'fa-microchip' },
  { label: 'Novel', icon: 'fa-book' },
  { label: 'Bisnis', icon: 'fa-briefcase' },
  { label: 'Sejarah', icon: 'fa-landmark' },
  { label: 'Edukasi', icon: 'fa-graduation-cap' },
  { label: 'Sains', icon: 'fa-flask' }
]

export default function Categories({ activeCategory }) {
  return (
    <section className="kategori">
      <h2 className="text-3xl font-bold text-primary text-center mb-8">
        Kategori Buku
      </h2>
      <div className="kategori-container">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.label}
            href={`/search?subject=${encodeURIComponent(cat.label)}`}
            className={`card-kategori ${activeCategory === cat.label ? 'active' : ''}`}
          >
            <i className={`fa-solid ${cat.icon} mr-2`}></i>
            {cat.label}
          </Link>
        ))}
      </div>
    </section>
  )
}

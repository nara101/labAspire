'use client'

import { useState } from 'react'
import AddToCartButton from './AddToCartButton'

const POPULAR_BOOKS = [
  {
    id: 'popular-atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'Self improvement terbaik',
    cover:
      'https://i.pinimg.com/1200x/20/d1/a6/20d1a65703a999cd0b39f87d7bb41c1d.jpg'
  },
  {
    id: 'popular-rich-dad',
    title: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki',
    description: 'Belajar keuangan',
    cover:
      'https://i.pinimg.com/1200x/6d/51/8d/6d518d9cd50668ccd015b4ac1072719d.jpg'
  },
  {
    id: 'popular-deep-work',
    title: 'Deep Work',
    author: 'Cal Newport',
    description: 'Fokus dan produktivitas',
    cover:
      'https://i.pinimg.com/736x/35/9d/fb/359dfb7300c0dafd432d7cf549dd519e.jpg'
  },
  {
    id: 'popular-psychology-money',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    description: 'Belajar cara berpikir tentang uang',
    cover:
      'https://i.pinimg.com/1200x/f1/7a/3d/f17a3d8fec24dd8e14447c4baf662af6.jpg'
  },
  {
    id: 'popular-think-grow-rich',
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    description: 'Mindset sukses dan kekayaan',
    cover:
      'https://i.pinimg.com/736x/29/cb/09/29cb093a75c57356a8efa8f567dd529b.jpg'
  }
]

export default function PopularBooks() {
  return (
    <section className="book-section">
      <h2 className="text-3xl font-bold text-primary text-center mb-8">
        Buku Populer
      </h2>
      <div className="book-container">
        {POPULAR_BOOKS.map((book) => (
          <PopularCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  )
}

function PopularCard({ book }) {
  const [borrowed, setBorrowed] = useState(false)
  const [imgError, setImgError] = useState(false)

  const src = imgError
    ? 'https://via.placeholder.com/200x280/d2a679/ffffff?text=No+Cover'
    : book.cover

  return (
    <div className="card-book">
      <div className="image_container">
        <img
          src={src}
          alt={book.title}
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
      <h3>{book.title}</h3>
      <p>{book.description}</p>
      <div style={{ padding: '0 10px' }}>
        <span
          className={`badge ${borrowed ? 'borrowed' : 'available'}`}
          onClick={() => setBorrowed((v) => !v)}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setBorrowed((v) => !v)
            }
          }}
        >
          {borrowed ? (
            <>
              <i className="fa-solid fa-book"></i> Borrowed
            </>
          ) : (
            <>
              <i className="fa-solid fa-circle-check"></i> Available
            </>
          )}
        </span>
      </div>
      <div className="book-actions">
        <AddToCartButton book={book} />
      </div>
    </div>
  )
}

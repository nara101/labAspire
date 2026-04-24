'use client'

import Link from 'next/link'
import { useState } from 'react'
import AddToCartButton from './AddToCartButton'

export default function BookCard({ book }) {
  const [imgError, setImgError] = useState(false)
  const src = imgError
    ? 'https://via.placeholder.com/200x280/d2a679/ffffff?text=No+Cover'
    : book.cover

  return (
    <div className="card-book">
      <Link href={`/books/${book.id}`}>
        <div className="image_container">
          <img
            src={src}
            alt={book.title}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </div>
        <h3 title={book.title}>{book.title}</h3>
        <p>{book.author}</p>
      </Link>
      {book.year && (
        <span className="badge available" style={{ alignSelf: 'center' }}>
          <i className="fa-solid fa-calendar"></i> {book.year}
        </span>
      )}
      <div className="book-actions">
        <Link href={`/books/${book.id}`} className="btn-detail">
          <i className="fa-solid fa-circle-info"></i> Detail
        </Link>
        <AddToCartButton book={book} />
      </div>
    </div>
  )
}

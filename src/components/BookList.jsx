'use client'

import BookCard from './BookCard'

export default function BookList({ books, error, title, subtitle }) {
  return (
    <section className="book-section">
      {title && (
        <h2 className="text-3xl font-bold text-primary text-center mb-2">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-center text-gray-600 mb-6">{subtitle}</p>
      )}

      {error && (
        <div className="error-message">
          <i className="fa-solid fa-triangle-exclamation mr-2"></i>
          {error}
        </div>
      )}

      {!error && (!books || books.length === 0) && (
        <div className="status-message">
          <i className="fa-solid fa-book-open text-4xl text-gray-400 mb-3"></i>
          <p>Buku tidak ditemukan. Coba kata kunci lain.</p>
        </div>
      )}

      {!error && books && books.length > 0 && (
        <div className="book-container">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  )
}

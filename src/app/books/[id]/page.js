import Link from 'next/link'
import AddToCartButton from '@/components/AddToCartButton'
import BookDetailImage from './BookDetailImage'
import { getBookDetail } from '@/services/openLibrary'

export async function generateMetadata({ params }) {
  try {
    const book = await getBookDetail(params.id)
    return {
      title: `${book.title} – LibrAspire`,
      description: book.description?.slice(0, 160) || `Detail buku ${book.title}`
    }
  } catch {
    return { title: 'Buku tidak ditemukan – LibrAspire' }
  }
}

export default async function BookDetailPage({ params }) {
  let book = null
  let error = ''

  try {
    book = await getBookDetail(params.id)
  } catch (e) {
    error = e.message || 'Gagal memuat detail buku.'
  }

  if (error || !book) {
    return (
      <div className="detail-page">
        <div className="error-message">
          <i className="fa-solid fa-triangle-exclamation mr-2"></i>
          {error || 'Buku tidak ditemukan.'}
        </div>
        <div className="text-center mt-4">
          <Link href="/" className="btn btn-primary">
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="detail-page">
      <Link
        href="/"
        className="inline-block mb-6 text-primary hover:underline"
      >
        <i className="fa-solid fa-arrow-left mr-2"></i>
        Kembali
      </Link>

      <div className="detail-grid">
        <div className="detail-cover">
          <BookDetailImage src={book.cover} alt={book.title} />
        </div>

        <div className="detail-info">
          <h1>{book.title}</h1>
          <p className="author">
            <i className="fa-solid fa-user-pen mr-2"></i>
            {book.author}
          </p>

          {book.firstPublishDate && (
            <span className="badge available">
              <i className="fa-solid fa-calendar"></i> Terbit: {book.firstPublishDate}
            </span>
          )}

          {book.description && (
            <>
              <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">
                Deskripsi
              </h3>
              <p className="description">{book.description}</p>
            </>
          )}

          {book.subjects && book.subjects.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">
                Subjek
              </h3>
              <div className="subjects">
                {book.subjects.map((s, i) => (
                  <span key={i} className="subject-tag">
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}

          <div className="mt-6">
            <AddToCartButton book={book} size="lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

import BookList from '@/components/BookList'
import SearchPageHeader from './SearchPageHeader'
import { getBooksBySubject, searchBooks } from '@/services/openLibrary'

export const metadata = {
  title: 'Pencarian – LibrAspire'
}

export default async function SearchPage({ searchParams }) {
  const q = typeof searchParams?.q === 'string' ? searchParams.q : ''
  const subject = typeof searchParams?.subject === 'string' ? searchParams.subject : ''

  let books = []
  let error = ''
  let title = 'Pencarian Buku'
  let subtitle = 'Masukkan kata kunci di atas untuk mencari buku.'

  if (q) {
    try {
      books = await searchBooks(q, 24)
      title = `Hasil pencarian: "${q}"`
      subtitle = `${books.length} buku ditemukan`
    } catch (e) {
      error = e.message
    }
  } else if (subject) {
    try {
      books = await getBooksBySubject(subject, 24)
      title = `Kategori: ${subject}`
      subtitle = `${books.length} buku di kategori ${subject}`
    } catch (e) {
      error = e.message
    }
  }

  return (
    <>
      <SearchPageHeader initialQuery={q} initialSubject={subject} />
      <BookList
        books={books}
        error={error}
        title={title}
        subtitle={subtitle}
      />
    </>
  )
}

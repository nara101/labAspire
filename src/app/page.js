import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import BookList from '@/components/BookList'
import PopularBooks from '@/components/PopularBooks'
import Contact from '@/components/Contact'
import { getPopularBooks } from '@/services/openLibrary'

export default async function HomePage() {
  // Fetch di server - buku populer
  let popularFromApi = []
  let error = ''
  try {
    popularFromApi = await getPopularBooks()
  } catch (e) {
    error = e.message || 'Gagal memuat buku.'
  }

  return (
    <>
      <Hero />

      <BookList
        books={popularFromApi}
        error={error}
        title="Rekomendasi Buku"
        subtitle="Pilihan populer untukmu"
      />

      <Categories />

      <PopularBooks />

      <Contact />
    </>
  )
}

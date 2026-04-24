// Wrapper untuk Open Library API
// Docs: https://openlibrary.org/developers/api

const BASE_URL =
  process.env.NEXT_PUBLIC_OPEN_LIBRARY_API_URL || 'https://openlibrary.org'

const COVER_URL = 'https://covers.openlibrary.org/b/id'

/**
 * Return URL cover berdasarkan cover_i.
 * Fallback ke placeholder jika tidak tersedia.
 */
export function getCoverUrl(coverId, size = 'M') {
  if (!coverId) {
    return 'https://via.placeholder.com/200x280/d2a679/ffffff?text=No+Cover'
  }
  return `${COVER_URL}/${coverId}-${size}.jpg`
}

/**
 * Ambil ID pendek dari key Open Library (e.g. "/works/OL45804W" -> "OL45804W")
 */
export function extractWorkId(key) {
  if (!key) return ''
  return key.replace('/works/', '').replace('works/', '')
}

/**
 * Normalisasi dokumen search menjadi bentuk yang konsisten.
 */
function normalizeBook(doc) {
  return {
    id: extractWorkId(doc.key) || `${doc.title}-${doc.author_name?.[0] || 'unknown'}`,
    key: doc.key || '',
    title: doc.title || 'Tanpa Judul',
    author: Array.isArray(doc.author_name)
      ? doc.author_name.slice(0, 2).join(', ')
      : doc.author_name || 'Penulis Tidak Diketahui',
    cover: getCoverUrl(doc.cover_i, 'M'),
    year: doc.first_publish_year || null,
    subjects: Array.isArray(doc.subject) ? doc.subject.slice(0, 3) : []
  }
}

/**
 * Cari buku via Open Library search API.
 */
export async function searchBooks(query, limit = 20) {
  if (!query || !query.trim()) return []
  const url =
    `${BASE_URL}/search.json?q=${encodeURIComponent(query.trim())}` +
    `&limit=${limit}` +
    `&fields=key,title,author_name,cover_i,first_publish_year,subject`

  try {
    // Di server components, fetch dicache secara default. Set revalidate supaya tetap fresh.
    const response = await fetch(url, { next: { revalidate: 3600 } })
    if (!response.ok) throw new Error(`API error: ${response.status}`)
    const data = await response.json()
    const docs = Array.isArray(data.docs) ? data.docs : []
    return docs.map(normalizeBook)
  } catch (error) {
    console.error('[openLibrary.searchBooks]', error)
    throw new Error('Gagal mengambil data buku. Periksa koneksi internet Anda.')
  }
}

/**
 * Ambil buku berdasarkan subject (kategori).
 */
export async function getBooksBySubject(subject, limit = 16) {
  if (!subject) return []

  const subjectMap = {
    Teknologi: 'technology',
    Novel: 'fiction',
    Bisnis: 'business',
    Sejarah: 'history',
    Edukasi: 'education',
    Sains: 'science'
  }

  const mapped = subjectMap[subject] || subject.toLowerCase()
  const url = `${BASE_URL}/subjects/${encodeURIComponent(mapped)}.json?limit=${limit}`

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } })
    if (!response.ok) throw new Error(`API error: ${response.status}`)
    const data = await response.json()
    const works = Array.isArray(data.works) ? data.works : []
    return works.map((work) => ({
      id: extractWorkId(work.key),
      key: work.key || '',
      title: work.title || 'Tanpa Judul',
      author:
        Array.isArray(work.authors) && work.authors.length > 0
          ? work.authors.map((a) => a.name).slice(0, 2).join(', ')
          : 'Penulis Tidak Diketahui',
      cover: getCoverUrl(work.cover_id, 'M'),
      year: work.first_publish_year || null,
      subjects: [subject]
    }))
  } catch (error) {
    console.error('[openLibrary.getBooksBySubject]', error)
    throw new Error('Gagal memuat kategori. Silakan coba lagi.')
  }
}

/**
 * Ambil buku populer untuk halaman utama.
 */
export async function getPopularBooks() {
  return searchBooks('bestseller self improvement', 10)
}

/**
 * Normalisasi deskripsi Open Library yang bisa berupa string ATAU object.
 */
function normalizeDescription(desc) {
  if (!desc) return ''
  if (typeof desc === 'string') return desc
  if (typeof desc === 'object' && desc.value) return desc.value
  return ''
}

/**
 * Ambil detail buku berdasarkan work id (OL45804W).
 * Mencoba endpoint /works/{id}.json terlebih dulu.
 */
export async function getBookDetail(workId) {
  if (!workId) throw new Error('Work ID tidak boleh kosong')

  const url = `${BASE_URL}/works/${encodeURIComponent(workId)}.json`

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } })
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Buku tidak ditemukan.')
      }
      throw new Error(`API error: ${response.status}`)
    }
    const data = await response.json()

    // Resolve author names (data.authors berisi {author: {key}})
    let authorNames = 'Penulis Tidak Diketahui'
    if (Array.isArray(data.authors) && data.authors.length > 0) {
      try {
        const authorKeys = data.authors
          .map((a) => a.author?.key)
          .filter(Boolean)
          .slice(0, 3)
        const authorData = await Promise.all(
          authorKeys.map((k) =>
            fetch(`${BASE_URL}${k}.json`, { next: { revalidate: 86400 } })
              .then((r) => (r.ok ? r.json() : null))
              .catch(() => null)
          )
        )
        const names = authorData
          .filter(Boolean)
          .map((a) => a.name)
          .filter(Boolean)
        if (names.length > 0) authorNames = names.join(', ')
      } catch (e) {
        console.warn('[getBookDetail] gagal resolve authors', e)
      }
    }

    const coverId = Array.isArray(data.covers) && data.covers.length > 0 ? data.covers[0] : null

    return {
      id: workId,
      key: data.key || `/works/${workId}`,
      title: data.title || 'Tanpa Judul',
      author: authorNames,
      cover: getCoverUrl(coverId, 'L'),
      description: normalizeDescription(data.description),
      subjects: Array.isArray(data.subjects) ? data.subjects.slice(0, 8) : [],
      firstPublishDate: data.first_publish_date || null
    }
  } catch (error) {
    console.error('[openLibrary.getBookDetail]', error)
    throw error
  }
}

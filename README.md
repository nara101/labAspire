# LibrAspire – Aplikasi Toko Buku Online

LibrAspire adalah aplikasi web **toko buku online** yang dibangun dengan **React.js** dan **Next.js (App Router)**. Aplikasi ini memungkinkan pengguna mencari buku, melihat detailnya, menambahkannya ke **Keranjang** pribadi, dan menghapusnya kembali. Data buku diambil dari **Open Library API** secara real-time, sehingga tersedia jutaan judul buku dari seluruh dunia.

## Anggota Kelompok

- Andi Nurul Inayah Putri
- Nabila Ramadhanty
- Alifsah Rezky Rahmah Sabran
- Rezky Fitriani
- Faiz Ahmad Fachri

## Fitur-Fitur

1. **Pencarian buku real-time** — ketik judul atau nama penulis di kolom pencarian di *hero section* (beranda) atau di halaman pencarian, lalu tekan **Cari** atau **Enter**. Hasil diambil langsung dari Open Library API via Server Component (fetch dilakukan di server untuk SEO & performa).
2. **Halaman detail buku dinamis** (`/books/[id]`) — klik sebuah kartu buku untuk membuka halaman detailnya. Informasi lengkap (cover besar, penulis, deskripsi, subjek, tahun terbit) di-fetch server-side menggunakan *dynamic route*.
3. **Tambah buku ke Keranjang** — tombol **Tambah ke Keranjang** tersedia pada setiap kartu buku dan pada halaman detail. Setelah ditambahkan, tombol berubah menjadi *disabled* dengan label **Di Keranjang** sehingga mencegah duplikasi. Badge jumlah di tombol keranjang pada header otomatis bertambah.
4. **Hapus buku dari Keranjang** — di halaman `/cart`, klik tombol **Hapus** (merah) pada item yang ingin dihapus. Tersedia juga tombol **Kosongkan Keranjang** untuk menghapus semuanya sekaligus (dengan dialog konfirmasi) serta tombol **Checkout** (demo).
5. **Filter berdasarkan kategori** — dropdown kategori di hero beranda dan kartu kategori di halaman utama menggunakan Next.js `<Link>` yang langsung navigate ke `/search?subject=...`.
6. **Persistensi Keranjang otomatis** — isi keranjang disimpan ke `localStorage` via React Context, sehingga tidak hilang saat browser di-refresh atau saat navigasi antar halaman.
7. **Modal Login** (demo) — overlay dengan validasi email & password kosong; bisa ditutup dengan klik di luar atau tombol **Escape**.
8. **Form Kontak** dengan validasi sisi klien (nama, email, pesan wajib diisi; format email juga divalidasi).
9. **Badge status buku** (*Available* / *Borrowed*) pada kartu buku populer yang dapat ditoggle dengan klik.
10. **Error & loading state** — pesan error bila fetch API gagal, *placeholder* cover bila buku tidak memiliki gambar sampul, halaman `not-found` untuk 404.
11. **Responsive design** — layout menyesuaikan untuk tampilan *mobile*.

## Cara Menjalankan Proyek

Prasyarat: **Node.js v18.17+** (Next.js 14 mewajibkan versi ini).

1. **Clone repository**

   ```bash
   git clone https://github.com/username/libraspire.git
   cd libraspire
   ```

2. **Install dependencies**

   ```bash
   npm install
   # atau jika memakai pnpm:
   # pnpm install
   ```

3. **Buat file `.env.local`** di root proyek (sudah disediakan, boleh dimodifikasi):

   ```
   NEXT_PUBLIC_OPEN_LIBRARY_API_URL=https://openlibrary.org
   ```

4. **Jalankan server development**

   ```bash
   npm run dev
   # atau: pnpm run dev
   ```

5. **Buka browser** di http://localhost:3000

### Build untuk produksi

```bash
npm run build      # compile production build ke folder .next/
npm run start      # jalankan server production
```

## Struktur Folder (Relevan)

```
libraspire/
├── src/
│   ├── app/
│   │   ├── books/[id]/page.js          # Halaman detail dinamis (server component)
│   │   ├── books/[id]/BookDetailImage.jsx  # Client component untuk fallback gambar
│   │   ├── cart/page.js                # Halaman Keranjang
│   │   ├── search/page.js              # Pencarian buku (server component async)
│   │   ├── search/SearchPageHeader.jsx # Search bar di halaman search
│   │   ├── layout.js                   # Root layout + Navbar + Footer
│   │   ├── page.js                     # Beranda (server component async)
│   │   ├── providers.jsx               # CartProvider wrapper (client)
│   │   └── not-found.js                # Halaman 404
│   ├── components/
│   │   ├── AddToCartButton.jsx         # Tombol interaktif (menggantikan BorrowButton)
│   │   ├── BookCard.jsx                # Kartu buku reusable
│   │   ├── BookList.jsx                # Grid buku + empty/error state
│   │   ├── Categories.jsx              # Kartu kategori (link ke /search)
│   │   ├── Contact.jsx                 # Form kontak dengan validasi
│   │   ├── Footer.jsx                  # Footer + social links
│   │   ├── Header.jsx                  # Logo + tombol keranjang + login/register
│   │   ├── Hero.jsx                    # Banner + search bar beranda
│   │   ├── LoginModal.jsx              # Modal login
│   │   ├── Navbar.jsx                  # Navigasi antar halaman
│   │   └── PopularBooks.jsx            # Section buku populer (hardcoded)
│   ├── context/
│   │   └── CartContext.jsx             # Global state Keranjang + localStorage
│   ├── services/
│   │   └── openLibrary.js              # Wrapper Open Library API
│   └── styles/
│       └── globals.css                 # Tailwind + custom CSS
├── public/                             # File statis (placeholder.jpg, dll.)
├── .env.local                          # Environment variables
├── .eslintrc.json
├── .gitignore
├── jsconfig.json                       # Path alias @/
├── next.config.mjs
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

> **Catatan:** template tugas menyebut `my-shelf/page.js` dan `BorrowButton.jsx` karena mengacu pada aplikasi perpustakaan. Karena LibrAspire adalah **toko buku**, nama-nama ini disesuaikan: `my-shelf` → `cart`, dan `BorrowButton` → `AddToCartButton`.

## Arsitektur & Teknologi

- **Next.js 14.2 (App Router)** — React framework dengan file-based routing dan Server Components
- **React 18** — UI library
- **Tailwind CSS 3** — utility-first CSS, dipadu dengan custom CSS di `globals.css`
- **React Context API** + **localStorage** — state management untuk Keranjang
- **Open Library API** — sumber data buku (publik, tanpa API key)
- **Font Awesome** — icon via kit CDN

### Pembagian Server vs Client Component

- **Server Components** (default, tanpa `'use client'`): `app/page.js` (beranda), `app/search/page.js`, `app/books/[id]/page.js`, `layout.js`, `Footer.jsx`. Fetch data dilakukan di server untuk performa & SEO.
- **Client Components** (`'use client'` di baris pertama): semua komponen yang butuh interaksi (state, event, hooks, `localStorage`), seperti `Header`, `Hero`, `BookCard`, `AddToCartButton`, `CartContext`, `Contact`, dan halaman `/cart`.

## Screenshot (Contoh – bisa diganti dengan gambar asli)

| Halaman Beranda    | Hasil Pencarian    | Detail Buku        | Halaman Keranjang  |
|--------------------|--------------------|--------------------|--------------------|
| (tambahkan gambar) | (tambahkan gambar) | (tambahkan gambar) | (tambahkan gambar) |

## Pengujian (Test Case Singkat)

| Fitur                | Langkah Pengujian                                                        | Hasil Diharapkan                                                                   |
|----------------------|--------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| Pencarian            | Di beranda, ketik `harry potter` di search bar lalu klik **Cari**        | Navigate ke `/search?q=harry+potter` dan menampilkan daftar buku terkait           |
| Pencarian kosong     | Klik tombol **Cari** tanpa input                                         | Navigate ke `/search` dengan pesan instruksi pencarian                             |
| Filter Kategori      | Di beranda, klik kartu kategori *Sejarah*                                | Navigate ke `/search?subject=Sejarah` menampilkan buku kategori *history*          |
| Detail Buku          | Klik judul atau tombol **Detail** pada salah satu kartu buku             | Navigate ke `/books/[id]` menampilkan cover besar, deskripsi, subjek, dll.         |
| Tambah ke Keranjang  | Di kartu buku atau halaman detail, klik **Tambah ke Keranjang**          | Tombol menjadi **Di Keranjang** (disabled); badge jumlah di header bertambah       |
| Buka Keranjang       | Klik tombol **Keranjang** di header                                      | Navigate ke `/cart` menampilkan daftar buku yang tersimpan                         |
| Hapus dari Keranjang | Di `/cart`, klik tombol **Hapus** (merah) pada salah satu item           | Buku hilang dari daftar; badge jumlah di header berkurang                          |
| Kosongkan Keranjang  | Klik **Kosongkan Keranjang** pada halaman `/cart`, konfirmasi **OK**     | Seluruh buku terhapus dari keranjang                                               |
| Persistensi data     | Tambahkan buku ke keranjang, lalu refresh browser                        | Keranjang tetap berisi buku yang tadi ditambahkan (localStorage)                   |
| Modal Login          | Klik tombol **Login** di header                                          | Modal muncul dengan validasi email & password wajib diisi                          |
| Tombol Escape        | Buka Modal Login lalu tekan tombol **Escape**                            | Modal tertutup                                                                     |
| Form Kontak          | Isi form Contact, kosongkan field Nama, lalu klik **Kirim Pesan**        | Muncul peringatan *Nama wajib diisi!*                                              |
| Halaman 404          | Akses URL yang tidak ada, mis. `/halaman-tidak-ada`                      | Tampil halaman 404 dengan tombol kembali ke beranda                                |

## Kredit & Sumber Data

- Data buku disediakan oleh **[Open Library](https://openlibrary.org/developers/api)** melalui API publik mereka (gratis, tanpa API key).
- Ikon dari **[Font Awesome](https://fontawesome.com/)** dimuat via kit CDN.
- Placeholder cover dari **[Placeholder.com (via.placeholder.com)](https://placeholder.com/)**.
- Hero background image dari **[Unsplash](https://unsplash.com/)**.

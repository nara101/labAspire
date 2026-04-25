# LibrAspire – Modern Online Bookstore

LibrAspire adalah platform e-commerce toko buku digital yang dibangun menggunakan **React.js** dan **Next.js (App Router)**. Aplikasi ini dirancang untuk memberikan pengalaman berbelanja buku yang mulus, mulai dari eksplorasi katalog global hingga manajemen keranjang belanja pribadi.

## Fitur Utama

- **Pencarian buku**: Menampilkan fitur untuk mencari judul buku yang ada di dalam website.
- **Tambah buku ke keranjang**: Buku yang telah dipilih dapat dimasukkan ke keranjang sebelum di checkout.
- **Hapus buku dari keranjang**: Buku yang tersimpan di keranjang bisa di hapuskan.
- **Detail Buku**: Menampilkan detail dan sinopsis buku.

## Anggota Kelompok
- Alifsa Rezky Rahmah Sabran
- Nabila Ramadhanty
- Rezky Fitriani
- Faiz Ahmad Fachri
- Andi Nurul Inayah Putri

## Struktur Folder (Relevan)

```text
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

## Cara Menjalankan Proyek

1. Clone repository
  ```
git clone https://github.com/nara101/labAspire.git
cd labAspire
  ```
2. Install dependencies
```text
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

## Screenshoot

- **Halaman Beranda**
  <img width="1857" height="876" alt="image" src="https://github.com/user-attachments/assets/fcace5f1-2168-41f7-aaf2-45ba8fb42310" />


- **Hasil Pencarian**
  <img width="1581" height="846" alt="image" src="https://github.com/user-attachments/assets/1161d9fc-bd76-44cd-8fa1-bd1ddef59c93" />


- **Fitur keranjang**
  <img width="1415" height="775" alt="image" src="https://github.com/user-attachments/assets/ee41c50e-3f70-4c71-9537-c19f6bf82d08" />



## Pengujian

| Fitur | Langkah Pengujian | Hasil yang di harapkan |
| :--- | :---: | :---: |
| **Pencarian** | Mengetik "Conan" di kolom pencarian | Muncul daftar buku terkait |
| **Tambah ke keranjang** | Klik tombol “Tambah ke keranjang” | Muncul Buku yang di input ke keranjang |
| **Hapus dari keranjang** | Klik "Hapus" atau "Kosongkan Keranjang" | Buku yang di input sudah tidak ada di keranjang |
| **Detail Buku** | Klik "Detail Buku" | Muncul detail dan sinopsis buku terkait |

## Kredit & Sumber Data
- Data buku disediakan oleh **[Open Library](https://openlibrary.org/developers/api)**.
- Ikon dari **[Font Awesome](https://fontawesome.com/)** dimuat via kit CDN.
- Placeholder cover dari **[Placeholder.com (via.placeholder.com)](https://placeholder.com/)**.
- Hero background image dari **[Unsplash](https://unsplash.com/)**.

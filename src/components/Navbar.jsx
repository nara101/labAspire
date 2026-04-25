'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Home', icon: 'fa-house', href: '/' },
  { label: 'Katalog', icon: 'fa-folder', href: '/search' },
  { label: 'Keranjang', icon: 'fa-cart-shopping', href: '/cart' },
  { label: 'Kontak', icon: 'fa-address-book', href: '/#contact' },
  { label: 'Tentang', icon: 'fa-circle-info', href: '/#about' }
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="Nav">
      {NAV_ITEMS.map((item) => {
        const cleanHref = item.href.split('#')[0] || '/'
        const isActive =
          cleanHref === '/'
            ? pathname === '/'
            : pathname.startsWith(cleanHref)
        return (
          <Link
            key={item.label}
            href={item.href}
            className={isActive ? 'active' : ''}
          >
            <i className={`fa-solid ${item.icon}`}></i>
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}

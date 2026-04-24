'use client'

import { useState } from 'react'

export default function BookDetailImage({ src, alt }) {
  const [imgError, setImgError] = useState(false)
  const url = imgError
    ? 'https://via.placeholder.com/280x400/d2a679/ffffff?text=No+Cover'
    : src

  return (
    <img
      src={url}
      alt={alt}
      onError={() => setImgError(true)}
    />
  )
}

'use client'

import { useEffect, useState } from 'react'

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (!isOpen) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  function handleSubmit(e) {
    e.preventDefault()
    if (email.trim() === '' || password.trim() === '') {
      alert('Mohon isi email dan password!')
      return
    }
    alert('Login Berhasil!\nSelamat datang, ' + email)
    setEmail('')
    setPassword('')
    onClose()
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="login-modal-overlay" onClick={handleOverlayClick}>
      <div className="login-modal-box">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition text-xl"
          aria-label="Tutup"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Selamat Datang!</h2>
          <p className="text-gray-500 mt-2">Silakan login ke LibrAspire.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-3 top-3 text-gray-400"></i>
              <input
                type="email"
                placeholder="contoh@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-3 top-3 text-gray-400"></i>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition duration-300 shadow-md"
          >
            Masuk Sekarang
          </button>
        </form>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()

    if (name === '') { alert('Nama wajib diisi!'); return }
    if (email === '') { alert('Email wajib diisi!'); return }
    if (!email.includes('@') || !email.includes('.')) {
      alert('Format email tidak valid!'); return
    }
    if (message === '') { alert('Pesan wajib diisi!'); return }

    alert('Pesan berhasil dikirim (demo)')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section className="contact" id="contact">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 font-medium text-primary">
              Nama Lengkap:
            </label>
            <input
              type="text" id="name" name="name"
              value={form.name} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-medium text-primary">
              Email:
            </label>
            <input
              type="email" id="email" name="email"
              value={form.email} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 font-medium text-primary">
              Pesan:
            </label>
            <textarea
              id="message" name="message" rows="5"
              value={form.message} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-md font-medium transition-all duration-300 bg-primary text-white hover:bg-secondary hover:-translate-y-0.5 hover:shadow-lg"
          >
            Kirim Pesan
          </button>
        </form>
      </div>
    </section>
  )
}

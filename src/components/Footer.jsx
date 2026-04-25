export default function Footer() {
  return (
    <footer id="about">
      <p>
        <b>2025 LibrAspire. All rights reserved.</b>
      </p>

      <div className="flex justify-center gap-5 my-6">
        <a
          href="mailto:support@libraspire.com"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-primary border border-gray-200 hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300 shadow-md"
          aria-label="Email"
        >
          <i className="fa-solid fa-envelope text-lg"></i>
        </a>
        <a
          href="#" target="_blank" rel="noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300 shadow-md"
          aria-label="Twitter/X"
        >
          <i className="fa-brands fa-x-twitter text-lg"></i>
        </a>
        <a
          href="#" target="_blank" rel="noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:bg-[#155bb5] hover:-translate-y-1 transition-all duration-300 shadow-md"
          aria-label="Facebook"
        >
          <i className="fa-brands fa-facebook-f text-lg"></i>
        </a>
        <a
          href="#" target="_blank" rel="noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:opacity-80 hover:-translate-y-1 transition-all duration-300 shadow-md"
          aria-label="Instagram"
        >
          <i className="fa-brands fa-instagram text-lg"></i>
        </a>
      </div>

      <p>Jl Discord Aspire 37 asik</p>
    </footer>
  )
}

import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 text-white shadow-lg z-50">
	  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
		{/* Logo */}
		<h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
		  <Link to="/" className="hover:text-green-200 transition-colors">
			Tic<span className="text-yellow-300">Time</span> Manage
		  </Link>
		</h1>

		{/* Desktop Menu */}
		<nav className="hidden md:flex space-x-6 text-lg font-semibold">
		  <Link
			to="/login"
			className="bg-white/90 text-green-700 px-5 py-2 rounded-xl shadow-md hover:bg-white transition-all"
		  >
			Iniciar sesión
		  </Link>
		  <Link
			to="/register"
			className="bg-yellow-400 text-green-900 px-5 py-2 rounded-xl shadow-md hover:bg-yellow-300 transition-all"
		  >
			Registrarse
		  </Link>
		</nav>

		{/* Botón hamburguesa */}
		<button
		  className="md:hidden text-white focus:outline-none"
		  onClick={() => setMenuOpen(!menuOpen)}
		>
		  <svg
			xmlns="http://www.w3.org/2000/svg"
			className="w-7 h-7"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		  >
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
		  </svg>
		</button>
	  </div>

	  {/* Menú móvil */}
	  <div
		className={`md:hidden transition-all duration-300 ${
		  menuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
		}`}
	  >
		<nav className="flex flex-col items-center space-y-4 pb-4 bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500">
		  <Link
			to="/login"
			className="bg-white/90 text-green-700 px-5 py-2 rounded-lg shadow hover:bg-white transition-all"
		  >
			Iniciar sesión
		  </Link>
		  <Link
			to="/register"
			className="bg-yellow-400 text-green-900 px-5 py-2 rounded-lg shadow hover:bg-yellow-300 transition-all"
		  >
			Registrarse
		  </Link>
		</nav>
	  </div>
	</header>
  );
}

export default Navbar;


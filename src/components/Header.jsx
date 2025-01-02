import { useState } from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // Tu código de Navbar aquí
    <header className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-4xl font-extrabold">Tic Time Manage App</h1>
            <div className="flex items-center space-x-4">
            {/* Menú de Navegación */}
            <nav className="hidden md:flex space-x-4">
                <Link
                to="/login"
                className="px-5 py-2 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-green-100 transition-all"
                >
                Iniciar Sesión
                </Link>
                <Link
                to="/register"
                className="ml-4 px-5 py-2 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-green-100 transition-all"
                >
                Registrarse
                </Link>
            </nav>

            {/* Botón hamburguesa */}
            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            </div>
        </div>

        {/* Menú desplegable en móvil */}
        <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} bg-gradient-to-r from-green-500 to-blue-500 py-4`}>
            <nav className="flex flex-col items-center space-y-4">
            <Link
                to="/login"
                className="px-5 py-2 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-green-100 transition-all"
            >
                Iniciar Sesión
            </Link>
            <Link
                to="/register"
                className="px-5 py-2 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-green-100 transition-all"
            >
                Registrarse
            </Link>
            </nav>
        </div>
    </header>
  )
}

export default Navbar;
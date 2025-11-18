import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-green-600 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Página no encontrada
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-all"
                >
                    <Home className="w-5 h-5" />
                    Ir al inicio
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Volver atrás
                </button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
import { Link } from "react-router-dom";
import ImageLanding from "../assets/landing.png";
import Footer from "../components/Footer";
import NavBar from "../components/Header";

function Home() {
    return (
        <>
            <NavBar />
            <main className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4">
                {/* Sección de título y descripción */}
                <div className="text-center max-w-3xl mb-10">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                    Organiza tu tiempo, alcanza tus metas
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600">
                    Con <span className="text-green-500 font-semibold">Tic Time Manage App</span>, simplifica la gestión de tus tareas, mejora tu productividad y alcanza tus objetivos con facilidad.
                    </p>
                </div>

                {/* Imagen */}
                <div className="relative">
                    <img
                    className="w-full max-w-lg rounded-lg shadow-lg transition-all transform hover:scale-105"
                    src={ImageLanding}
                    alt="Imagen de gestión de tiempo"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-lg"></div>
                </div>

                {/* Botones */}
                <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link
                    to="/register"
                    className="px-8 py-3 bg-green-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-green-600 transition-all"
                    >
                    Comenzar Ahora
                    </Link>
                    <Link
                    to="/login"
                    className="px-8 py-3 bg-gray-100 text-gray-700 text-lg font-bold rounded-lg shadow-lg hover:bg-gray-200 transition-all"
                    >
                    Ya tengo cuenta
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Home;
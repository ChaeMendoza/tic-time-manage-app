import { Link } from "react-router-dom";
import LandingImage from "../assets/landing.png";
import Footer from "../components/Footer";
import NavBar from "../components/Header";

function Home() {
  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <main className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Texto principal */}
          <div className="text-center lg:text-left space-y-6">
            <h2 className="text-5xl font-extrabold text-gray-800 leading-tight">
              Organiza tu tiempo,<br />
              <span className="text-green-600">alcanza tus metas</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              Con <span className="text-green-600 font-semibold">Tic Time Manage App</span> 
              simplifica la gestión de tus tareas, mejora tu productividad y 
              alcanza tus objetivos con facilidad.
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-start justify-center gap-4 pt-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-green-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-green-700 hover:scale-105 transform transition-all"
              >
                Comenzar ahora
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-semibold text-lg rounded-xl shadow hover:bg-gray-100 hover:scale-105 transform transition-all"
              >
                Ya tengo cuenta
              </Link>
            </div>
          </div>

          {/* Imagen */}
          <div className="relative w-full max-w-lg">
            <div className="absolute -inset-2 bg-gradient-to-tr from-green-400 to-blue-400 rounded-3xl blur-lg opacity-30"></div>
            <img
              src={LandingImage}
              alt="Gestión de tiempo"
              className="relative rounded-3xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </main>

      {/* Características */}
      <section className="py-24 bg-white" id="features">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-10">
            Todo lo que necesitas para gestionar tu tiempo
          </h3>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Planifica tus días",
                desc: "Organiza tus tareas con un calendario visual e intuitivo.",
                icon: "📅",
              },
              {
                title: "Monitorea tu progreso",
                desc: "Mide cuánto tiempo dedicas a cada actividad y mejora tu enfoque.",
                icon: "⏱️",
              },
              {
                title: "Sincroniza en la nube",
                desc: "Accede a tus datos desde cualquier dispositivo con seguridad.",
                icon: "☁️",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-gradient-to-br from-green-100 to-blue-100 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-10">
            Historias de usuarios reales
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ana Torres",
                text: "Desde que uso Tic Time Manage, logro terminar mis tareas sin estrés. Es mi herramienta diaria.",
              },
              {
                name: "Luis Fernández",
                text: "Me encanta lo simple y visual que es. Ahora tengo control real sobre mi tiempo.",
              },
              {
                name: "Carla Méndez",
                text: "Ideal para estudiantes o profesionales. Me ayudó a cumplir metas que antes posponía.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow p-8 hover:-translate-y-1 transition"
              >
                <p className="text-gray-600 italic mb-4">“{t.text}”</p>
                <h4 className="font-semibold text-gray-800">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-blue-500 text-white text-center">
        <h3 className="text-4xl font-bold mb-6">
          Empieza a administrar tu tiempo hoy
        </h3>
        <p className="text-lg mb-8">
          Únete a cientos de usuarios que ya transformaron su productividad
        </p>
        <Link
          to="/register"
          className="px-10 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
        >
          Crear mi cuenta gratuita
        </Link>
      </section>

      <Footer />
    </>
  );
}

export default Home;

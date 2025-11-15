import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Seal from "sweetalert2";
import Navbar from "../components/Header.jsx";
import Footer from "../components/Footer";
import LogoIcon from "../assets/logo-icon.jpg";

function LoginPage() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      await Seal.fire({
        title: "Inicio exitoso",
        text: "¡Bienvenido de nuevo!",
        icon: "success",
        confirmButtonColor: "#22C55E",
      });
      navigate("/dashboard");
    } catch (error) {
      await Seal.fire({
        icon: "error",
        title: "Error",
        text: `No se pudo iniciar sesión: ${error.message}`,
        confirmButtonColor: "#EF4444",
      });
    }
  };

    const onResetPassword = () => {
        console.log("Clic on reset password button")
    }

    return (
        <>
          <Navbar />
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-emerald-500 to-blue-500 px-4 py-10">
              <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-8">
                  <div className="text-center mb-8">
                      <div className="flex justify-center items-center">
                          <img
                              src={LogoIcon || ""}
                              className="w-32 rounded-full"
                              alt="Logo icon TicTime Manage App"
                          />
                      </div>
                      <h1 className="text-3xl font-extrabold text-gray-800">Bienvenido</h1>
                      <p className="text-gray-600 mt-2">Inicia sesión para continuar</p>
                  </div>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                              Correo electrónico
                          </label>
                          <input
                              type="email"
                              id="email"
                              ref={emailRef}
                              required
                              className="mt-2 block w-full px-4 py-2.5 border rounded-xl shadow-sm text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                          />
                      </div>
                      <div>
                          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                              Contraseña
                          </label>
                          <input
                              type="password"
                              id="password"
                              ref={passwordRef}
                              required
                              className="mt-2 block w-full px-4 py-2.5 border rounded-xl shadow-sm text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                          />
                      </div>

                      <button
                          type="submit"
                          className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all"
                      >
                          Iniciar sesión
                      </button>
                  </form>

                  <p className="mt-6 text-sm text-center text-gray-600">
                      ¿No tienes cuenta?{" "}
                      <Link to="/register" className="text-green-600 font-semibold hover:underline">
                        Regístrate aquí
                      </Link>
                  </p>
                  <p className="mt-2 text-sm text-center text-gray-600">
                      Olvidaste tu contraseña.{" "}
                      <button onClick={onResetPassword} className="text-green-600 font-semibold hover:unerline">Recuperar contraseña</button>
                  </p>

                  <p className="mt-3 text-sm text-center">
                      <Link to="/" className="text-gray-500 hover:underline">
                          ← Regresar al inicio
                      </Link>
                  </p>
              </div>
          </div>
          <Footer />
      </>
  );
}

export default LoginPage;

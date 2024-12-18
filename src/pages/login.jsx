import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function LoginPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            Swal.fire({
                title: "Inicio exitoso",
                text: "Bienvenido de nuevo!",
                icon: "success",
                confirmButtonColor: "#4CAF50",
            });
            navigate("/dashboard");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `No se pudo iniciar sesión: ${error.message}`,
                confirmButtonColor: "#F56565",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
            <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
                <h1 className="text-2xl font-extrabold text-gray-800 text-center mb-6">Iniciar Sesión</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            ref={emailRef}
                            required
                            className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            ref={passwordRef}
                            required
                            className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <p className="mt-6 text-sm text-center text-gray-600">
                    ¿No tienes cuenta?{" "}
                    <a href="/register" className="text-green-600 font-medium hover:underline">
                        Regístrate aquí
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;

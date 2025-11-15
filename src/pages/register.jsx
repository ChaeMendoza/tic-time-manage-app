import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import Seal from "sweetalert2";
import Navbar from "../components/Header.jsx";
import Footer from "../components/Footer";

function RegisterPage() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const displayName = nameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        // --- VALIDACIONES ---
        if (!displayName || !email || !password) {
            return Seal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor llena todos los campos.",
                confirmButtonColor: "#F59E0B",
            });
        }

        if (!/^[a-zA-ZÀ-ÿ\s]{3,}$/.test(displayName)) {
            return Seal.fire({
                icon: "error",
                title: "Nombre inválido",
                text: "Tu nombre debe tener al menos 3 letras y no contener símbolos.",
                confirmButtonColor: "#EF4444",
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return Seal.fire({
                icon: "error",
                title: "Correo inválido",
                text: "Por favor ingresa un correo electrónico válido.",
                confirmButtonColor: "#EF4444",
            });
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) {
            return Seal.fire({
                icon: "error",
                title: "Contraseña débil",
                text: "Debe tener mínimo 6 caracteres, una mayúscula, una minúscula y un número.",
                confirmButtonColor: "#EF4444",
            });
        }

        try {
            setLoading(true);

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName });

            await setDoc(doc(db, "users", user.uid), {
                displayName,
                email,
                createdAt: new Date(),
            });

            await Seal.fire({
                title: "Registro exitoso",
                text: "¡Tu cuenta ha sido creada correctamente!",
                icon: "success",
                confirmButtonColor: "#A855F7",
            });

            navigate("/dashboard");
        } catch (error) {
            let message = "No se pudo registrar.";

            if (error.code === "auth/email-already-in-use") {
                message = "Este correo ya está registrado.";
            } else if (error.code === "auth/invalid-email") {
                message = "Correo inválido.";
            } else if (error.code === "auth/weak-password") {
                message = "La contraseña es demasiado débil.";
            }

            await Seal.fire({
                icon: "error",
                title: "Error",
                text: message,
                confirmButtonColor: "#EF4444",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-green-400 to-cyan-600">
                <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Crea tu cuenta</h2>
                    <p className="text-center text-gray-500 mb-6">Empieza a organizar tu tiempo hoy</p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
                            <input
                                ref={nameRef}
                                type="text"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                            <input
                                ref={emailRef}
                                type="email"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input
                                ref={passwordRef}
                                type="password"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-50"
                        >
                            {loading ? "Creando..." : "Crear cuenta"}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-gray-600 text-sm">
                        ¿Ya tienes cuenta?{" "}
                        <a href="/login" className="text-purple-600 hover:underline">Inicia sesión aquí</a>
                    </p>

                    <p className="text-center text-gray-500 text-xs mt-2">
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

export default RegisterPage;

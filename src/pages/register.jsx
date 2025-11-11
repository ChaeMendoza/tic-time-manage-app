import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import Navbar from "../components/Header.jsx";
import Footer from "../components/Footer";

function RegisterPage() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const displayName = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName });
      await setDoc(doc(db, "users", user.uid), {
        displayName,
        email,
        createdAt: new Date(),
      });

      Swal.fire({
        title: "Registro exitoso",
        text: "¡Tu cuenta ha sido creada correctamente!",
        icon: "success",
        confirmButtonColor: "#A855F7",
      });

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `No se pudo registrar: ${error.message}`,
        confirmButtonColor: "#EF4444",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-green-400 to-cyan-600">
		  <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-8">
			<h2 className="text-2xl font-bold text-center text-gray-800">Crea tu cuenta</h2>
			<p className="text-center text-gray-500 mb-6">Empieza a organizar tu tiempo hoy</p>
			<form className="space-y-4">
			  <div>
				<label className="block text-sm font-medium text-gray-700">Nombre completo</label>
				<input
				  type="text"
				  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
				/>
			  </div>
			  <div>
				<label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
				<input
				  type="email"
				  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
				/>
			  </div>
			  <div>
				<label className="block text-sm font-medium text-gray-700">Contraseña</label>
				<input
				  type="password"
				  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
				/>
			  </div>
			  <button
				type="submit"
				className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
			  >
				Crear cuenta
			  </button>
			</form>
			<p className="mt-4 text-center text-gray-600 text-sm">
			  ¿Ya tienes cuenta?{" "}
			  <a href="/login" className="text-purple-600 hover:underline">
				Inicia sesión aquí
			  </a>
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

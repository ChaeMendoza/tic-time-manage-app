import {useState, useEffect, useCallback} from "react";
import {FaPaperPlane, FaLightbulb, FaTimes, FaBars} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import CoffeeDonation from "../components/CoffeeDonation.jsx";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {collection, getDocs, query, where, addDoc, serverTimestamp} from "firebase/firestore";
import {db} from "../firebaseConfig.js";
import Footer from "../components/Footer.jsx";
import Swal from "sweetalert2";


export default function SuggestPage() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    const fetchTasks = useCallback(
        async (uid) => {
            try {
                const q = query(collection(db, "tasks"), where("userId", "==", uid));
                const querySnapshot = await getDocs(q);
                const userTasks = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTasks(userTasks);
                console.info(tasks)
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }, []
    )

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchTasks(currentUser.uid).then(r => console.log("SKD", r));
            } else {
                navigate("/login");
            }
        });

        return () => unsubscribe();
    }, [auth, navigate, fetchTasks]);

    // Detectar scroll para sombra dinámica
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Escribe algo",
                text: "Tu sugerencia no puede estar vacía.",
                confirmButtonColor: "#16a34a",
            });
            return;
        }

        try {
            await addDoc(collection(db, "suggestions"), {
                userId: user.uid,
                userName: user.displayName || "Usuario",
                message: message.trim(),
                createdAt: serverTimestamp(),
            });

            Swal.fire({
                icon: "success",
                title: "¡Gracias!",
                text: "Tu sugerencia ha sido enviada exitosamente 🙌",
                confirmButtonColor: "#16a34a",
            });

            setMessage("");
            setSent(true)
        } catch (error) {
            console.error("Error al guardar sugerencia:", error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema al enviar tu sugerencia. Intenta nuevamente.",
                confirmButtonColor: "#dc2626",
            });
        }
    };

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/login");
        });
    };

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col items-center px-6 pt-32 pb-20 text-gray-800">
            <header
                className={`fixed top-0 left-0 w-full bg-green-600 text-white py-4 px-6 flex justify-between items-center z-50 transition-shadow ${
                    isScrolled ? "shadow-xl" : "shadow-md"
                }`}
            >
                {/* TÍTULO */}
                <h1 className="text-2xl font-bold">
                    Hola, <span className="capitalize">{user?.displayName || "Usuario"}!</span>
                </h1>

                {/* BOTÓN HAMBURGUESA SOLO EN MÓVIL */}
                <button
                    className="text-3xl md:hidden"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* MENÚ DESKTOP */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/dashboard" className="font-bold hover:underline">
                        Inicio
                    </Link>

                    <Link to="/dashboard/calendar" className="font-bold hover:underline">
                        Calendario
                    </Link>

                    <CoffeeDonation />

                    <button
                        onClick={handleSignOut}
                        className="px-4 py-2 bg-white text-green-700 font-semibold rounded-lg shadow hover:bg-green-100 transition-all"
                    >
                        Cerrar sesión
                    </button>
                </nav>

                {/* MENÚ MÓVIL DESPLEGABLE */}
                {menuOpen && (
                    <div className="absolute top-full left-0 w-full bg-green-700 flex flex-col items-center gap-6 py-6 md:hidden shadow-lg">
                        <Link
                            to="/dashboard"
                            className="text-lg font-bold"
                            onClick={() => setMenuOpen(false)}
                        >
                            Inicio
                        </Link>

                        <Link
                            to="/dashboard/calendar"
                            className="text-lg font-bold"
                            onClick={() => setMenuOpen(false)}
                        >
                            Calendario
                        </Link>

                        <CoffeeDonation />

                        <button
                            onClick={() => {
                                handleSignOut();
                                setMenuOpen(false);
                            }}
                            className="px-4 py-2 bg-white text-green-700 font-semibold rounded-lg shadow hover:bg-green-100 transition-all"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </header>
            {/* Encabezado */}
            <div className="text-center max-w-xl">
                <FaLightbulb className="text-yellow-500 text-5xl mx-auto mb-4 animate-bounce" />

                <h1 className="text-4xl font-bold mb-3">
                    Ayúdanos a mejorar
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed">
                    Tu opinión es una parte esencial del crecimiento de esta plataforma.
                    Cuéntanos qué te gustaría ver, mejorar o agregar.
                    ¡Estamos construyendo esta app contigo! ✨
                </p>
            </div>

            {/* Tarjeta del formulario */}
            <div className="w-full max-w-xl mt-10 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-lg font-semibold">Tu sugerencia o comentario</span>
                        <textarea
                            rows="5"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Cuéntanos tu idea..."
                            className="p-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                        ></textarea>
                    </label>

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-green-700 transition-all"
                    >
                        <FaPaperPlane />
                        Enviar sugerencia
                    </button>

                    {sent && (
                        <p className="text-center text-green-600 font-semibold animate-fade-in">
                            ¡Gracias! Tu sugerencia fue enviada. 🙌
                        </p>
                    )}
                </form>
            </div>

            {/* Footer motivacional */}
            <p className="mt-12 text-gray-500 text-sm text-center max-w-md">
                Leemos absolutamente todas las sugerencias.
                Gracias por formar parte de este proyecto ❤️
            </p>

        </div>
            <Footer />
        </>
    );
}

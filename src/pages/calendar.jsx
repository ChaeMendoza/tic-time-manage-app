import { useEffect, useState, useCallback } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import CalendarTask from "../components/CalendarTask";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import CoffeeDonation from "../components/CoffeeDonation";
import {FaBars, FaTimes} from "react-icons/fa";

function CalendarPage() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const fetchTasks = useCallback(async (uid) => {
    try {
      const q = query(collection(db, "tasks"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const userTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(userTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchTasks(currentUser.uid);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate, fetchTasks]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUpdateTaskDate = async (taskId, dayId) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, {
        scheduledDay: dayId,
      });
      
      // Actualizar estado local
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, scheduledDay: dayId } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800">
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
                <Link to="/dashboard/suggest" className="font-bold hover:underline">
                    Dejar sugerencia
                </Link>

                <Link to="/dashboard" className="font-bold hover:underline">
                    Inicio
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
                        to="/dashboard/suggest"
                        className="text-lg font-bold"
                        onClick={() => setMenuOpen(false)}
                    >
                        Dejar sugerencia
                    </Link>

                    <Link
                        to="/dashboard"
                        className="text-lg font-bold"
                        onClick={() => setMenuOpen(false)}
                    >
                        Inicio
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
      
      <CalendarTask tasks={tasks} onUpdateTaskDate={handleUpdateTaskDate} />
      
      <Footer />
    </div>
  );
}

export default CalendarPage;
import { useEffect, useState, useCallback } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../firebaseConfig";
import {
  collection,
  // addDoc,
  query,
  where,
  getDocs,
  // deleteDoc,
  //updateDoc,
  // doc,
} from "firebase/firestore";
import CalendarTask from "../components/CalendarTask";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import CoffeeDonation from "../components/CoffeeDonation";

function CalendarPage() {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
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
            console.log(tasks)
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }, [tasks]);

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

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/login");
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800">
            <header
                className={`fixed top-0 left-0 w-full bg-green-600 text-white py-4 px-8 flex flex-col sm:flex-row justify-between items-center z-50 transition-shadow ${
                    isScrolled ? "shadow-xl" : "shadow-md"
                }`}
            >
                <h1 className="text-3xl font-bold mb-4 sm:mb-0">
                    Hola, <span className="capitalize">{user?.displayName || "Usuario"}!</span>
                </h1>
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                    <Link to="/dashboard">
                        Inicio
                    </Link>
                    <CoffeeDonation />
                    <button
                        onClick={handleSignOut}
                        className="px-4 py-2 bg-white text-green-700 font-semibold rounded-lg shadow hover:bg-green-100 transition-all"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </header>
            <CalendarTask />
            <Footer />
        </div> 
    );
}

export default CalendarPage;
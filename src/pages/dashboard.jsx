import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import DeleteTask from "../components/Delete.jsx";
import EditTask from "../components/Edit.jsx";
import PomodoroTask from "../components/PomodoroTask.jsx";
import Footer from "../components/Footer.jsx";
import CoffeeDonation from "../components/CoffeeDonation";
import { FaTasks, FaCheckCircle, FaClock, FaTimes, FaBars } from "react-icons/fa";

function DashboardPage() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [editedTaskTitle, setEditedTaskTitle] = useState("");
    const [user, setUser] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [pomodoroTask, setPomodoroTask] = useState(null);
    const [pomodoroMode, setPomodoroMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

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
    }, [auth, navigate]);

    // Detectar scroll para sombra dinámica
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const fetchTasks = async (uid) => {
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
    };

    const handleAddTask = async () => {
        if (!newTask.trim()) return;

        try {
            const taskData = {
                title: newTask,
                userId: user.uid,
                completed: false,
                createdAt: new Date(),
            };
            const docRef = await addDoc(collection(db, "tasks"), taskData);
            setTasks([...tasks, { id: docRef.id, ...taskData }]);
            setNewTask("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const toggleComplete = async (taskId, currentState) => {
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, { completed: !currentState });
        setTasks((prev) =>
            prev.map((t) =>
                t.id === taskId ? { ...t, completed: !currentState } : t
            )
        );
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
        setEditedTaskTitle(task.title);
    };
    const handleConfirmEdit = async () => {
        try {
            const taskRef = doc(db, "tasks", editingTask.id);
            await updateDoc(taskRef, { title: editedTaskTitle });

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === editingTask.id
                        ? { ...task, title: editedTaskTitle }
                        : task
                )
            );

            setEditingTask(null);
            setEditedTaskTitle("");
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
        setEditedTaskTitle("");
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteDoc(doc(db, "tasks", taskId));
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.log("Error deleting task:", error);
        }
    };

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/login");
        });
    };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    const motivationalPhrases = [
        "¡Un pequeño paso cada día cuenta!",
        "Organiza tu tiempo, conquista tu día.",
        "Tu productividad define tu éxito.",
        "Cada tarea completada es una victoria.",
    ];
    const phrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];

    const openPomodoro = (task) => {
        setPomodoroTask(task);
    };

    const closePomodoro = () => {
        setPomodoroTask(null);
    };

    const handlePomodoroMode = () => {
        setPomodoroMode((prev) => {
            const next = !prev;
            console.log("pomodoroMode ->", next);
            return next;
        });
    }

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
                            to="/dashboard/suggest"
                            className="text-lg font-bold"
                            onClick={() => setMenuOpen(false)}
                        >
                            Dejar sugerencia
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

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-grow w-full mt-24 p-4 max-w-5xl mx-auto">
                {/* Frase motivacional */}
                <div className="text-center mb-8">
                    <p className="text-lg font-medium text-gray-700 italic">{phrase}</p>
                </div>
                {/* Estadísticas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                        <FaTasks className="text-green-600 text-2xl" />
                        <div>
                            <h3 className="font-semibold text-gray-700">Total</h3>
                            <p className="text-xl font-bold">{totalTasks}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                        <FaCheckCircle className="text-blue-600 text-2xl" />
                        <div>
                            <h3 className="font-semibold text-gray-700">Completadas</h3>
                            <p className="text-xl font-bold">{completedTasks}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                        <FaClock className="text-yellow-600 text-2xl" />
                        <div>
                            <h3 className="font-semibold text-gray-700">Pendientes</h3>
                            <p className="text-xl font-bold">{pendingTasks}</p>
                        </div>
                    </div>
                </div>
                {/* Caraterísticas */}
                <div className="flex justify-center items-center">
                    <button onClick={handlePomodoroMode} className="px-4 py-2 bg-yellow-400 text-green-800 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-all flex items-center">
                        {pomodoroMode ? "Desactivar Técnica Pomodoro" : "Activar Técnica Pomodoro"}
                    </button>
                </div>

                {/* Agregar tarea */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Tus tareas
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Nueva tarea..."
                            className="flex-grow p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={handleAddTask}
                            className="mt-4 sm:mt-0 sm:px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-all"
                        >
                            Agregar
                        </button>
                    </div>
                </div>
                {/* Lista de tareas */}
                <ul>
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className={`bg-white p-4 mt-3 flex justify-between items-center rounded-lg shadow-sm hover:shadow-md transition-all ${
                                task.completed ? "opacity-70 line-through" : ""
                            }`}
                        >
                            {editingTask?.id === task.id ? (
                                <div className="flex-grow">
                                    <input
                                        type="text"
                                        value={editedTaskTitle}
                                        onChange={(e) => setEditedTaskTitle(e.target.value)}
                                        className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <div className="flex mt-2 gap-2">
                                        <button
                                            onClick={handleConfirmEdit}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <span
                                        onClick={() => toggleComplete(task.id, task.completed)}
                                        className={`cursor-pointer select-none ${
                                            task.completed ? "text-gray-500" : "text-gray-800"
                                        }`}
                                    >
                                        {task.title}
                                    </span>
                                    
                                    <div className="flex gap-4">
                                        {!task.completed && (
                                            <EditTask onEdit={() => handleEditClick(task)} />
                                        )}
                                        <DeleteTask onDelete={() => handleDeleteTask(task.id)} />
                                        {pomodoroMode ? (
                                            !task.completed ? (
                                                <button
                                                    onClick={() => openPomodoro(task)}
                                                    className="text-green-500 hover:text-green-700 font-bold"
                                                >
                                                    Pomodoro
                                                </button>
                                            ) : (
                                                <button
                                                    disabled
                                                    title="Tarea completada"
                                                    className="text-gray-400 cursor-not-allowed font-bold"
                                                >
                                                    Pomodoro
                                                </button>
                                            )
                                        ) : null}
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </main>
            {pomodoroTask && (
                <PomodoroTask task={pomodoroTask} onClose={closePomodoro} />
            )}
            <Footer />
        </div>
    );
}

export default DashboardPage;

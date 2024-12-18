import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

function DashboardPage() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

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
    }, [auth, navigate]);

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
                createdAt: new Date(),
            };
            const docRef = await addDoc(collection(db, "tasks"), taskData);
            setTasks([...tasks, { id: docRef.id, ...taskData }]);
            setNewTask("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/login");
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">
            <header className="bg-green-600 text-white py-6 px-8 flex justify-between items-center shadow-lg">
                <h1 className="text-3xl font-bold">
                    Bienvenido, <span className="capitalize">{user?.displayName || "Usuario"}!</span>
                </h1>
                <button
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-white text-green-600 font-semibold rounded-lg shadow-md hover:bg-green-100 transition-all"
                >
                    Cerrar sesión
                </button>
            </header>

            <main className="max-w-5xl mx-auto mt-8 p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tus Tareas</h2>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Nueva tarea"
                            className="flex-grow p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={handleAddTask}
                            className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-all"
                        >
                            Agregar
                        </button>
                    </div>
                </div>

                {tasks.length > 0 ? (
                    <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <li key={task.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                <span>{task.title}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500 mt-4">No tienes tareas aún. ¡Agrega una nueva!</p>
                )}
            </main>
        </div>
    );
}

export default DashboardPage;


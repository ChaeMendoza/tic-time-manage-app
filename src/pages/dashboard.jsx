import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

function DashboardPage(){
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si hay datos del usuario en localStorage
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            fetchTasks(parsedUser.uid);
        } else {
            navigate("/login");
        }
    }, [navigate]);

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
            setNewTask(""); // Limpiar el input
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            localStorage.removeItem("user"); // Limpia el localStorage al cerrar sesión
            navigate("/login");
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-green-500 text-white py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Bienvenido, {user?.displayName || "Usuario"}!</h1>
                <button
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-green-100"
                >
                    Cerrar sesión
                </button>
            </header>

            <main className="max-w-4xl mx-auto mt-8 p-4">
                <h2 className="text-xl font-bold mb-4">Tus Tareas</h2>

                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Nueva tarea"
                        className="flex-grow p-2 border rounded-lg"
                    />
                    <button
                        onClick={handleAddTask}
                        className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
                    >
                        Agregar
                    </button>
                </div>

                <ul className="bg-white rounded-lg shadow divide-y">
                    {tasks.map((task) => (
                        <li key={task.id} className="p-4 flex justify-between items-center">
                            <span>{task.title}</span>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default DashboardPage;
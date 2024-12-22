import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import DeleteTask from "../components/Delete.jsx";
import EditTask from "../components/Edit.jsx";
import Footer from "../components/Footer.jsx";
import CoffeeDonation from "../components/CoffeeDonation";

function DashboardPage() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [editedTaskTitle, setEditedTaskTitle] = useState("");
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

    const handleEditClick = (task) => {
        setEditingTask(task);
        setEditedTaskTitle(task.title);
    }

    const handleConfirmEdit = async () => {
        try {
            const taskRef = doc(db, "tasks", editingTask.id);
            await updateDoc(taskRef, { title: editedTaskTitle });

            setTasks((prevTasks) => 
                prevTasks.map((task) =>
                    task.id === editingTask.id ? { ...task, title: editedTaskTitle } : task
                )
            );

            setEditingTask(null); // Cerramos el modo de edicion
            setEditedTaskTitle(""); // Reseteamos el titulo
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
        setEditedTaskTitle("");
    }
    
    const handleDeleteTask = async (taskId) => {
        try {
            // Eliminar la tarea de Firestore
            await deleteDoc(doc(db, "tasks", taskId));
            // Actualizamos el estado de las tareas eliminando la tarea del array
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.log("Error deliting task:", error);
        }
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/login");
        });
    };

    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">
        <header className="bg-green-600 text-white py-4 px-8 flex justify-between items-center shadow-lg">
            <h1 className="text-3xl font-bold">
                Bienvenido, <span className="capitalize">{user?.displayName || "Usuario"}!</span>
            </h1>
            <div className="flex justify-center items-center gap-4">
                <div className="flex items-center">
                    <CoffeeDonation />
                </div>
                <button
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-white text-green-600 font-semibold rounded-lg shadow-md hover:bg-green-100 transition-all"
                >
                    Cerrar sesión
                </button>
            </div>
        </header>

        <main className="flex-grow w-full mt-8 p-3">
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

          {tasks.map((task) => (
            <li key={task.id} className="bg-gray-50 p-4 mt-2 flex justify-between items-center hover:bg-gray-50">
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
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition-all"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span>{task.title}</span>
                  <div className="flex gap-4">
                    <EditTask onEdit={() => handleEditClick(task)} />
                    <DeleteTask onDelete={() => handleDeleteTask(task.id)} />
                  </div>
                </>
              )}
            </li>
          ))}

        </main>

        <Footer />
      </div>
    );
}

export default DashboardPage;

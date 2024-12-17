import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function ResgisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuario registrado:", userCredential.user);
            Swal.fire({
                title: "Good job!",
                text: "Registro exitoso",
                icon: "success"
            });
            navigate('/dashboard');
        } catch (error) {
            console.error("Error al registrar:", error.message);
            const errorMessage = "Error: " + error.message;
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
            });
        }
    }

    return (
        <>
            <header className="bg-green-600 text-white py-4 text-center">
                <h1 className="text-3xl font-bold">Crear Cuenta</h1>
            </header>
            <main className="max-w-md mx-auto bg-white p-6 mt-8 shadow rounded">
                <form id="registerForm" className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label for="email" className="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded" 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}    
                        />
                    </div>
                    <div>
                        <label for="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Registrar</button>
                </form>
            </main>
        </>
    )
}

export default ResgisterPage
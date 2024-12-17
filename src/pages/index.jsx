import { Link } from "react-router-dom"

function Home() {
	return(
		<>
			<header className="bg-green-600 text-white py-4 text-center">
      		<h1 className="text-3xl font-bold">Gestión de Tiempo</h1>
      		<nav className="mt-2">
        			<Link to="/login" className="px-4 py-2 bg-white text-green-600 rounded-lg shadow hover:bg-green-100">Iniciar Sesión</Link>
        			<Link to="/register" className="ml-4 px-4 py-2 bg-white text-green-600 rounded-lg shadow hover:bg-green-100">Registrarse</Link>
      		</nav>
    		</header>
    		<main className="text-center py-10">
      			<p className="text-lg">¡Organiza tus tareas de forma sencilla y eficiente!</p>
    		</main>		
		</>
	)
}

export default Home	
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="flex justify-center items-center text-center text-2xl">Cargando...</div>; // Espera mientras Firebase valida la sesión

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return children;
};

export default ProtectedRoute;


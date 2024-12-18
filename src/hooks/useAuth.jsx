import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Nuevo estado para manejar el retraso

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Si hay usuario, está autenticado
      setLoading(false); // Autenticación validada
    });

    return () => unsubscribe();
  }, []);

  return { isAuthenticated, loading };
};


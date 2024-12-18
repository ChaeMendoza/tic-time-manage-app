import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Guardar el usuario autenticado o null si no está autenticado
      setLoading(false); // Estado de carga terminado
    });

    return () => unsubscribe();
  }, []);

  return { user, isAuthenticated: !!user, loading };
};
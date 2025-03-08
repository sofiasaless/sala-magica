import { useEffect, useState } from 'react';
import { auth } from '../config';
import { onAuthStateChanged } from 'firebase/auth';

export default function useAuth() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user); 
      } else {
        setUsuario(null);
      }
    });

    return () => unsubscribe(); // cancela a escuta quando o componente for desmontado
  }, []);

  return usuario;
}

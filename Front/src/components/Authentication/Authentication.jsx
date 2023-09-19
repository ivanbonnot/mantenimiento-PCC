import React from 'react';
import { useNavigate } from 'react-router-dom';


const AuthGuard = ({ children }) => {
  // Verifica si el usuario está autenticado, por ejemplo, consultando el token JWT
  const isAuthenticated = localStorage.getItem('token');
  console.log(`token: ${isAuthenticated}`)
  console.log(children)

  const navigate = useNavigate();
  if (!isAuthenticated) {
    // Redirige a la página de inicio de sesión si el usuario no está autenticado
    navigate('/login');
    return null;
  }

  // Renderiza los componentes hijos si el usuario está autenticado
  return children;
};

export default AuthGuard;

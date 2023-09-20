import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthGuard = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  console.log(isAuthenticated)
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === null || isAuthenticated === 'null') {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default AuthGuard;

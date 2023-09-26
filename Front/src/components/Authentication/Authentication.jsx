import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const AuthGuard = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  console.log(isAuthenticated)
  const navigate = useNavigate();

 
  useEffect(() => {
  axios
  .get("http://localhost:8080/verify", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  .then(() => {
   
  })
  .catch((err) => {
    console.log(err)
   
      localStorage.removeItem("token");
      
        if (err.response.status === 401 || !isAuthenticated || isAuthenticated === null || isAuthenticated === 'null') {}
          navigate('/login');
        
      }, [isAuthenticated, navigate]);
     });


     if (isAuthenticated) {
      return children;
     } else {
      navigate('/login');
     }

};


export default AuthGuard;

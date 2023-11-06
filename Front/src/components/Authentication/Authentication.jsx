import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const AuthGuard = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/verify`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {

      })
      .catch((err) => {
        console.log(err)


        if (err.response.status === 401 || !isAuthenticated || isAuthenticated === null || isAuthenticated === 'null') {
          //localStorage.removeItem("token");
          navigate('/login');
        }


      }, [isAuthenticated, navigate]);
  });


  if (isAuthenticated) {
    return children;
  } else {
    navigate('/login');
  }

};


export default AuthGuard;

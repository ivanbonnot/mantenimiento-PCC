import React from 'react';
import './Logout.css'
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  localStorage.removeItem("token");
  localStorage.removeItem('user');
  localStorage.removeItem('admin');

  setTimeout(() => {
    navigate("/login");
  }, 3000);


  return (
    <div className="app__bg app__login-container">
      <div className='app__logout-wrapper'>
        <h2>Has cerrado sesión</h2>
      </div>
    </div>
  );
};

export default Logout;

import React from 'react';
import './Logout.css'
import { useNavigate } from "react-router-dom";
import { useNavBarContext } from '../../context/NavBarContext';
import { useEffect } from 'react';

const Logout = () => {
  const navigate = useNavigate();
  const { setShouldRenderNavBar } = useNavBarContext();

  const renderNavBar = () => {
    setShouldRenderNavBar(false)
  }

  localStorage.removeItem("token");
  localStorage.removeItem('user');
  localStorage.removeItem('admin');

  setTimeout(() => {
    navigate("/login");
  }, 3000);

  useEffect((() =>
    renderNavBar()
  ))


  return (
    <div className="app__bg app__login-container">
      <div className='app__logout-wrapper'>
        <h2>Has cerrado sesión</h2>
      </div>
    </div>
  );
};

export default Logout;

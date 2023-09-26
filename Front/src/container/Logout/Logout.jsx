import React from 'react';
import './Logout.css'
import { useNavigate } from "react-router-dom";
import { useNavBarContext } from '../../context/NavBarContext';

const Logout = () => {
  const navigate = useNavigate();


  const { ShouldRenderNavBar, setShouldRenderNavBar } = useNavBarContext();
  const renderNavBar = () => {
    console.log(`Render logout ${ShouldRenderNavBar}`)
    setShouldRenderNavBar(false)
  }

  localStorage.removeItem("token");
  localStorage.removeItem('user');
  localStorage.removeItem('admin');
  renderNavBar()
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

import React, { useState, useEffect } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useNavBarContext } from '../../context/NavBarContext';
import { confirmAlert } from "react-confirm-alert";
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const { setShouldRenderNavBar } = useNavBarContext();


  const renderNavBar = () => {
    setShouldRenderNavBar(false)
  }

  useEffect((() =>
    renderNavBar()
  ))

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const alert = (title, message, label, onClick ) => {
      confirmAlert({
        title: title,
        message: message,
        buttons: [
          {
            label:label,
            onClick: onClick,
            },
        ],
      })
    };

    const data = JSON.stringify(formData);

    axios.post("http://localhost:8080/login", data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', res.data.username);
        localStorage.setItem('admin', res.data.admin);
        navigate('/');
      })
      
      .catch((error) => {
        console.error('Error en la petición:', error);
        if (error.response.status === 401) {
          alert(`Usuario o contraseña incorrecto`, '¿Volver a Login?', 'Ok', ()=>{})
        } 
      });
  };

  return (
    <div className="app__bg app__login-container">
      <div className='app__login-wrapper'>
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className='app__login-form'>
          <div className="form-group app__login-email">
            <label htmlFor="username">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="username"
              placeholder="Tu correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group app__login-password">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className='custom__button' type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

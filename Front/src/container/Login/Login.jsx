import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from "react-confirm-alert";
import axios from 'axios';
import NavBarAlt from '../../components/NavBar/NavBarAlt';

const apiUrl = process.env.REACT_APP_API_URL;

const LoginForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    const alert = (title, message, label, onClick) => {
      confirmAlert({
        title: title,
        message: message,
        buttons: [
          {
            label: label,
            onClick: onClick,
          },
        ],
      })
    };

    const data = JSON.stringify(formData);

    axios.post(`${apiUrl}/login`, data, {
      headers: {
        'Content-Type': 'application/json',
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
        if (error.response.status === 401 || 404) {
          alert(`Usuario o contraseña incorrecto`, '¿Volver a Login?', 'Ok', () => { })
        }

      })
      .finally(() => {
        setIsSubmitting(false);
      })

  };

  return (
    <div>

      < NavBarAlt />

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
            <button className='custom__button' type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

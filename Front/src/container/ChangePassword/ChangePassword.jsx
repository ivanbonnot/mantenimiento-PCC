import React, { useState } from 'react';
import './ChangePassword.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from "react-confirm-alert";

const ChangeUserPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: localStorage.getItem('user'),
    password: '',
    newPassword: ''
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
    const data = JSON.stringify(formData);

    axios
      .post("http://localhost:8080/changepassword", data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.status === 200) {
          alert(`Contraseña modificada con éxito`, 'Redirigiendo a home')
          setFormData({
            username: '',
            password: '',
            newPassword: ''
          });
        }
      })

      .catch((error) => {
        console.error('Error en la petición:', error);
        if (error.response.status === 302) {
          alert('Error en el cambio de contraseña', '¿Intentar de nuevo?')
        } else {
          navigate("/warning");
        }
      });

    const alert = (title, message) => {
      confirmAlert({
        title: title,
        message: message,
        buttons: [
          {
            label: "Si",
            onClick: () => {
            },
          },
          {
            label: "No, volver a home",
            onClick: () => {
              navigate('/');
            },
          },
        ],
      })
    };
  };

  return (
    <div className="app__bg app__register-container">
      <div className='app__register-wrapper'>
        <h2>Cambiar contraseña</h2>
        <form onSubmit={handleSubmit} className='app__register-form'>

          <div className="form-group app__register-email">
            <label htmlFor="username">Usuario</label>
            <input
              type="email"
              id="email"
              name="username"
              placeholder="Usuario"
              value={localStorage.getItem('user')}
              onChange={handleChange}
              required
            />

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

            <label htmlFor="username">Contraseña administrador</label>
            <input
              type="password"
              id="admpassword"
              name="admpassword"
              placeholder="Contraseña adm"
              value={formData.admpassword}
              onChange={handleChange}
              required
            />
          </div>

          <button className='custom__button' type="submit">Agregar usuario</button>
        </form>
      </div>
    </div>
  );
};

export default ChangeUserPassword;

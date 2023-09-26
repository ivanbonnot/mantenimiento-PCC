import React, { useState } from 'react';
import './Register.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from "react-confirm-alert";
import Warning from '../../components/Warning/Warning';

const RegisterForm = () => {
  const navigate = useNavigate();
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
    const data = JSON.stringify(formData);

    axios
      .post("http://localhost:8080/register", data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res)
        const user = JSON.parse(data)
        if (res.status === 200) {
          alert(`Usuario añadido con éxito: ${user.username}, ${user.password}`, '¿Agregar otro usuario?')
          setFormData({
            username: '',
            password: '',
          });
        }
      })

      .catch((error) => {
        console.error('Error en la petición:', error);
        if (error.response.status === 302) {
          alert('El usuario ya existe', '¿Agregar otro usuario?')
        } else {
          <Warning />
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
        <h2>Registrar un usuario</h2>
        <form onSubmit={handleSubmit} className='app__register-form'>
          <div className="form-group app__register-email">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              type="email"
              id="email"
              name="username"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group app__register-password">
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
          <button className='custom__button' type="submit">Agregar usuario</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

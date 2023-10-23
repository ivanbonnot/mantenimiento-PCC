import React, { useState } from 'react';
import './Register.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from "react-confirm-alert";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    admusername: localStorage.getItem('user'),
    admpassword: ''
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
      .post("http://localhost:8080/admin/register", data, {
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
            admusername: '',
            admpassword: '',
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
        <h2>Registrar un usuario</h2>
        <form onSubmit={handleSubmit} className='app__register-form'>
          <div className="form-group app__register-admemail">
            <label htmlFor="username">Usuario administrador</label>
            <input
              type="email"
              id="admemail"
              name="admusername"
              placeholder="Usuario administrador"
              value={localStorage.getItem('user')}
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

          <button className='custom__button' disabled={formData.username.length < 4 && formData.password.length < 4} type="submit">Agregar usuario</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

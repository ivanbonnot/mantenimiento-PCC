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
    verificationPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if(formData.password =! formData.verificationPassword ) {
      console.log('Las contraseñas no coinciden')
    } else {
      console.log('las contraseña coinciden')
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.stringify(formData);

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

    if(formData.password === formData.verificationPassword  ) {
      axios
      .put("http://localhost:8080/changepassword", data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => {
        if (res.status === 200) {
          alert(`Contraseña modificada con éxito`, 'Redirigiendo a home', 'Ok', ()=>{ navigate('/')})
          setFormData({
            username: '',
            password: '',
            verificationPassword: ''
          });
        }
      })

      .catch((error) => {
        console.error('Error en la petición:', error);
        if (error.response.status === 302) {
          alert(`Error en la peticion`, 'Redirigiendo a home', 'Ok', ()=>{ navigate('/')})
        } else {
          navigate("/warning");
        }
      });

    
    } else {
      alert(`Error`, 'Las contraseñas no coinciden', 'Ok', ()=>{})
    }

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

             {formData.password.length >0 && formData.password.length<4 && (
            <div className="password-validation">*La contraseña debe ser mayor de 4 caracteres</div>
          )}

            <label htmlFor="password">Ingrese nuevamente la contraseñar</label>
            <input
              type="password"
              id="verificationPassword"
              name="verificationPassword"
              placeholder="Verificar contraseña"
              value={formData.verificationPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button className='custom__button' type="submit" disabled={formData.password.length < 4 && formData.verificationPassword.length < 4} >Cambiar contraseña</button>
        </form>
      </div>
    </div>
  );
};

export default ChangeUserPassword;

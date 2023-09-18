import React, { useState } from 'react';
import './Login.css'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
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
    // Aquí puedes agregar la lógica para manejar la autenticación del usuario
    console.log('Datos de inicio de sesión:', formData);
  };

  return (
    <div className="app__bg app__login-container">
      <div className='app__login-wrapper'>
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className='app__login-form p__cormorant'>
          <div className="form-group app__login-email">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
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

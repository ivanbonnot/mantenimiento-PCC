import React from 'react';
import './Warning.css'
import { useNavigate } from "react-router-dom";


const Warning = () => {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/");
    }, 3000);

    return (
        <div className="app__bg app__login-container">
            <div className='app__logout-wrapper'>
                <h2>Ruta no autorizada</h2>
                <p className='p__opensans'>Redirigiendo al home</p>
            </div>
        </div>
    );
};

export default Warning;

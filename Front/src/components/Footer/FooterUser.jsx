import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import './FooterUser.css'
import { confirmAlert } from "react-confirm-alert";

const apiUrl = process.env.REACT_APP_API_URL;

const Footer = () => {
    const isAdmin = localStorage.getItem('admin')

    const deleteNotes = async () => {
        confirmAlert({
          title: "Confirmar",
          message: "Si la cantidad de notas resueltas supera las 100 en total, se van a eliminar las más antiguas",
          buttons: [
            {
              label: "Ok",
              onClick: async () => {
                try {
                    await axios.delete(`${apiUrl}/notesresolved`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                        .then((res) => {
                            console.log(res.request)
                        })
                } catch (error) {
                    console.error("Error al cerrar sesión:", error);
                }
              },
            },
            {
              label: "Cancelar",
              onClick: () => { },
            },
          ],
        });
        }

    const links = [
        {
            id: 1,
            link: "changepassword",
            name: "Cambiar contraseña"
        },
        {
            id: 3,
            link: "",
            name: "Borrar notas resueltas",
            onClick: deleteNotes
        },
    ];

    
    const admLinks = [
        {
            id: 1,
            link: "register",
            name: "Agregar usuario"
        },
        {
            id: 2,
            link: "changepassword",
            name: "Cambiar contraseña"
        },
        {
            id: 3,
            link: "",
            name: "Borrar notas resueltas",
            onClick: deleteNotes
        },
    ];



    return isAdmin === true ? (
            <div className="flex justify-between items-center w-full h-10 px-4 text-white bg-footer sticky">
            <ul className="flex">
                {admLinks.map(({ id, link, name, onClick }) => (
                    <li
                        key={id}
                        className="px-4 cursor-pointer capitalize text-sm text-gray-300 hover:scale-105 duration-200"
                    >
                        <Link to={link} onClick={onClick}>
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
        : (
        <div className="flex justify-between items-center w-full h-10 px-4 text-white bg-footer sticky">
            <ul className="flex">
                {links.map(({ id, link, name, onClick }) => (
                    <li
                        key={id}
                        className="px-4 fs-6 cursor-pointer capitalize text-sm text-gray-300 hover:scale-105 duration-200"
                    >
                        <Link to={link} onClick={onClick}>
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div> 
        )
     
    
};

export default Footer;

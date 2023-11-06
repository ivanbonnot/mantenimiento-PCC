import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './FooterAdm.css'

const apiUrl = process.env.REACT_APP_API_URL;

const NavBar = () => {

    const deleteNotes = async () => {
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
    }

    const links = [
        {
            id: 1,
            link: "register",
            name: "Agregar usuario"
        },
        {
            id: 2,
            link: "changePassword",
            name: "Cambiar contraseña"
        },
        {
            id: 3,
            link: "",
            name: "Si hay mas de 100 notas resueltas, borrar",
            onClick: deleteNotes
        },
    ];


    return (
        <div className="flex justify-between items-center w-full h-10 px-4 text-white bg-footer sticky">
            <ul className="flex">
                {links.map(({ id, link, name, onClick }) => (
                    <li
                        key={id}
                        className="px-4 cursor-pointer capitalize font-small text-gray-300 hover:scale-105 duration-200"
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

export default NavBar;

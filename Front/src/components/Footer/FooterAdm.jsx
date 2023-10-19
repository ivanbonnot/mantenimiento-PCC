import React from "react";
import { Link } from "react-router-dom";


const NavBar = () => {

    const links = [
        {
            id: 1,
            link: "register",
            name: "Agregar usuario"
        },
        {
            id: 1,
            link: "changePassword",
            name: "Cambiar contraseña"
        },
    ];


    return (
        <div className="flex justify-between items-center w-full h-10 px-4 text-white bg-black sticky">
            <ul className="flex">
                {links.map(({ id, link, name }) => (
                    <li
                        key={id}
                        className="px-4 cursor-pointer capitalize font-small text-gray-300 hover:scale-105 duration-200"
                    >
                        <Link to={link}>
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default NavBar;

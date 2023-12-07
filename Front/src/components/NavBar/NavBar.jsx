import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import "./NavBar.css";

const apiUrl = process.env.REACT_APP_API_URL;

const NavBar = () => {

    const [nav, setNav] = useState(false);

    const handleLogout = async () => {
        if (nav) {
            setNav(false)
        }
        try {
            await axios.get(`${apiUrl}/logout`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }


    const links = [
        // {
        //     id: 1,
        //     link: "Estaciones",
        // },
        // {
        //     id: 2,
        //     link: "SubEstaciones",
        // },
        // {
        //     id: 3,
        //     link: "Comunicaciones",
        // },
        {
            id: 4,
            link: "/allnotes",
            name: "Pendientes",
            onClick: () => setNav(false)
        },
        {
            id: 5,
            link: "/logout",
            name: "Logout",
            onClick: handleLogout
        },
    ];


    return (
        <div className="flex justify-between items-center w-full h-20 z-50 px-4 text-white bg-navbar fixed">
            <div className="text-4xl font-signature ml-2">
                <Link to={'/'} >
                    <img src="/img/1111-5.png" alt="" width="125" height="125" />
                </Link>
            </div>

            <ul className=" hidden md:flex">
                {links.map(({ id, link, name, onClick }) => (
                    <li
                        key={id}
                        className="px-4 cursor-pointer capitalize font-medium links-color"
                    >
                        <Link to={link} onClick={onClick}>
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>

            <div
                onClick={() => setNav(!nav)}
                className="md:hidden cursor-pointer pr-4 z-10 links-color"
            >
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            {nav && (
                <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 links-color">
                    {links.map(({ id, link, name, onClick }) => (
                        <li
                            key={id}
                            className="px-4 cursor-pointer capitalize py-6 text-4xl"
                        >
                            <Link
                                onClick={onClick}
                                to={link}
                            >
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )
            }
        </div >
    )
};

export default NavBar;

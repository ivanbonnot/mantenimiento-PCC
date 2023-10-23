import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavBarContext } from "../../context/NavBarContext";
import axios from "axios";
import "./NavBar.css";



const NavBar = () => {
    const { shouldRenderNavBar } = useNavBarContext();
    const [nav, setNav] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(localStorage.getItem('token'))

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:8080/logout", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }


    useEffect(() => {
        setIsAuthorized(localStorage.getItem('token'));
    }, []);


    const links = [
        {
            id: 1,
            link: "Estaciones",
        },
        {
            id: 2,
            link: "SubEstaciones",
        },
        {
            id: 3,
            link: "Comunicaciones",
        },
        {
            id: 4,
            link: "Cambios",
        },
        {
            id: 5,
            link: "logout",
            onClick: handleLogout
        },
    ];


    return shouldRenderNavBar && isAuthorized ? (
        <div className="flex justify-between items-center w-full h-20 z-50 px-4 text-white bg-navbar fixed">
            <div className="text-4xl font-signature ml-2">
                <Link to={'/'} >
                    <img class="" src="img/1111-5.png" alt="" width="125" height="125" />
                </Link>
            </div>

            <ul className=" hidden md:flex">
                {links.map(({ id, link, onClick }) => (
                    <li
                        key={id}
                        className="px-4 cursor-pointer capitalize font-medium links-color"
                    >
                        <Link to={link} onClick={onClick}>
                            {link}
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
                    {links.map(({ id, link }) => (
                        <li
                            key={id}
                            className="px-4 cursor-pointer capitalize py-6 text-4xl"
                        >
                            <Link
                                onClick={() => setNav(!nav)}
                                to={link}
                            >
                                {link}
                            </Link>
                        </li>
                    ))}

                    <div className="flex flex-col justify-center items-center">
                        <p className="text-2xl"></p>
                    </div>
                </ul>
            )}
        </div>
    ) : (
        <div className="flex justify-between items-center w-full h-20 z-50 px-4 text-white bg-navbar fixed">
            <div className="text-4xl font-signature ml-2">
                <Link to={'/login'} >
                <img class="" src="img/1111-5.png" alt="" width="125" height="125" />
                </Link>
            </div>

            <ul className=" hidden md:flex">
                <li
                    className="px-4 cursor-pointer capitalize font-medium links-color hover:scale-105 duration-200"
                >
                    <Link to={'login'}>
                        {'login'}
                    </Link>
                </li>

            </ul>

            <div
                onClick={() => setNav(!nav)}
                className="md:hidden cursor-pointer pr-4 z-10 links-color"
            >
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            {nav && (
                <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 links-color">
                    <li
                    
                        className="px-4 cursor-pointer capitalize py-6 text-4xl"
                    >
                        <Link
                            onClick={() => setNav(!nav)}
                            to={'login'}
                        >
                            {'login'}
                        </Link>
                    </li>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-2xl"></p>
                    </div>
                </ul>
            )}
        </div>
    )
};

export default NavBar;

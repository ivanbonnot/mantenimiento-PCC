import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./NavBar.css";


const NavBarAlt = () => {

    const [nav, setNav] = useState(false);

    return (
        <div className="flex justify-between items-center w-full h-20 z-50 px-4 text-white bg-navbar fixed">
            <div className="text-4xl font-signature ml-2">
                <img src="/img/1111-5.png" alt="" width="125" height="125" />
            </div>

            <ul className=" hidden md:flex">
                <li
                    className="px-4 cursor-pointer capitalize font-medium links-color hover:scale-105 duration-200"
                >
                    <Link to={'/login'}>
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
                            to={'/login'}
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

export default NavBarAlt;

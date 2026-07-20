import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="flex justify-around items-center h-7vh bg-zinc-100 py-4 fixed top-0 w-full z-100">
            <div>
                <Link to="/" className="text-2xl font-black ">
                    Hotel
                </Link>
            </div>
            <div className="flex gap-x-5 items-center">
                <Link
                    to="/"
                    className="hover:border-2 border-red-300 p-2 rounded-full"
                >
                    Home
                </Link>
                <Link className="hover:border-2 border-red-300 p-2 rounded-full">
                    Rooms
                </Link>
                <Link className="hover:border-2 border-red-300 p-2 rounded-full">
                    Contact
                </Link>
                <Link className="hover:border-2 border-red-300 p-2 rounded-full">
                    About
                </Link>
            </div>
            {!user ? (
                <div className="">
                    <Link
                        to="/login"
                        className="px-3 py-2 bg-blue-300 rounded-md text-white font-semibold mr-3"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-3 py-2 bg-blue-600 rounded-md text-white font-semibold"
                    >
                        Sign Up
                    </Link>
                </div>
            ) : (
                <div className="w-12 h-12 rounded-full bg-zinc-400"></div>
            )}
        </div>
    );
};

export default Navbar;

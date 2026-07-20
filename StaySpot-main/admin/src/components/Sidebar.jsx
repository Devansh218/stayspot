import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="bg-[#282828] w-[15rem] p-3 h-screen flex-shrink-0">
            <h1 className="text-2xl font-bold text-center text-white">
                Admin Panel
            </h1>
            <div className="text-gray-300">
                <h3 className="text-lg mt-4 ml-2 font-bold text-white">Lists</h3>
                <div className="flex flex-col gap-y-2 mt-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-sm hover:text-white hover:bg-zinc-700 p-2 rounded-md ${
                                isActive ? "bg-zinc-700 text-white" : ""
                            }`
                        }
                    >
                        <i className="ri-home-5-line mr-1"></i> Dashboard
                    </NavLink>
                    <NavLink
                        to="/users"
                        className={({ isActive }) =>
                            `text-sm hover:text-white hover:bg-zinc-700 p-2 rounded-md ${
                                isActive ? "bg-zinc-700 text-white" : ""
                            }`
                        }
                    >
                        <i className="ri-group-line mr-1"></i> Users
                    </NavLink>
                    <NavLink
                        to="/hotels"
                        className={({ isActive }) =>
                            `text-sm hover:text-white hover:bg-zinc-700 p-2 rounded-md ${
                                isActive ? "bg-zinc-700 text-white" : ""
                            }`
                        }
                    >
                        <i className="ri-hotel-line mr-1"></i> Hotels
                    </NavLink>
                    <NavLink
                        to="/rooms"
                        className={({ isActive }) =>
                            `text-sm hover:text-white hover:bg-zinc-700 p-2 rounded-md ${
                                isActive ? "bg-zinc-700 text-white" : ""
                            }`
                        }
                    >
                        <i className="ri-hotel-bed-line mr-1"></i> Rooms
                    </NavLink>
                </div>
            </div>
            
            <div className="text-gray-300">
                <h3 className="text-lg mt-4 ml-2 font-bold text-white">Operations</h3>
                <div className="flex flex-col gap-y-2 mt-2">
                    <NavLink
                        to="/user/new"
                        className={({ isActive }) =>
                            `text-sm hover:text-white hover:bg-zinc-700 p-2 rounded-md ${
                                isActive ? "bg-zinc-700 text-white" : ""
                            }`
                        }
                    >
                        <i className="ri-add-line mr-1"></i> Add User
                    </NavLink>
                    <NavLink
                        to="/hotel/new"
                        className={({ isActive }) =>
                            `text-sm hover:text-white hover:bg-zinc-700 p-2 rounded-md ${
                                isActive ? "bg-zinc-700 text-white" : ""
                            }`
                        }
                    >
                        <i className="ri-add-line mr-1"></i> Add Hotel
                    </NavLink>
                    <NavLink
                        to="/room/new"
                        className={({ isActive }) =>
                            `text-sm hover:text-white hover:bg-zinc-700 p-2 rounded-md ${
                                isActive ? "bg-zinc-700 text-white" : ""
                            }`
                        }
                    >
                        <i className="ri-add-line mr-1"></i> Add Room
                    </NavLink>
                </div>
            </div>
            
        </div>
    );
};

export default Sidebar;

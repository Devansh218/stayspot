import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
    document.title = "StaySpot | Add User";
    const [credentials, setCredentials] = useState({})
    const [error, seterror] = useState(null)

    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}));
        try {
            const res = await axios.post('http://localhost:3000/api/auth/register', credentials);
            navigate('/')
            
        } catch (err) {
            seterror(err.response?.data?.message || "Something went wrong")
        }
    }
    return (
        <div>
            <h1 className="text-zinc-300 font-bold text-3xl px-5 py-3">
                Add User
            </h1>

            <form
                action="/"
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center text-gray-300"
            >
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex flex-col gap-y-2 mt-3 w-[30%]">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={handleChange}
                        className="p-2 outline-none bg-transparent border-b-2"
                        placeholder="Enter Username"
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-2 mt-3 w-[30%]">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        className="p-2 outline-none bg-transparent border-b-2"
                        placeholder="Enter email address"
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-2 mt-3 w-[30%]">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        className="p-2 outline-none bg-transparent border-b-2"
                        placeholder="Enter password"
                        required
                    />
                </div>
                <div className="items-start mt-3 w-[30%]">
                    <label htmlFor="isAdmin">Admin</label>
                    <select className="ml-3 p-2 outline-none bg-transparent border-b-2" id="isAdmin" onChange={handleChange}>
                        <option value="" disabled>
                            Select
                        </option>
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                </div>
                <div className="w-[30%]">
                    <button
                        type="submit"
                        className="p-2 bg-blue-600 rounded text-white mt-5"
                    >
                        Create User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewUser;

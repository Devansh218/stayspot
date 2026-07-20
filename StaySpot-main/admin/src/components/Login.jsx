import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    document.title = "StaySpot | Login";
    const [credentials, setCredentials] = useState({});

    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(
                "http://localhost:3000/api/auth/login",
                credentials, {withCredentials: true}
            );
            console.log(res);
            
            if (res.data.isAdmin) {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                navigate("/");
            } else
                dispatch({
                    type: "LOGIN_FAILURE",
                    payload: error.response?.data || "Login failed",
                });
        } catch (error) {
            dispatch({
                type: "LOGIN_FAILURE",
                payload: error.response?.data || "Login failed",
            });
        }
    };
    return (
        <>
            <div className="h-screen flex justify-center items-center flex-col gap-y-10">
                <h1 className="text-4xl font-black text-white">Login</h1>
                <div className="flex flex-col item-center bg-zinc-700 p-7 rounded-md">
                    {error && (
                        <p className="text-red-600 mb-4 text-center">
                            {error.message}
                        </p>
                    )}
                    <form
                        onSubmit={handleLogin}
                        className="flex flex-col item-center  gap-y-5 bg-zinc-700 rounded-md"
                    >
                        <input
                            type="text"
                            placeholder="Username"
                            id="username"
                            name="username"
                            onChange={handleChange}
                            className="border-2 border-zinc-500 p-3 w-60 rounded-md"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            className="border-2 border-zinc-500 p-3 w-60 rounded-md"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-4 rounded-md font-semibold"
                            disabled={loading}
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-gray-300">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-blue-600">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;

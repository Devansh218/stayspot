import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    document.title = "StaySpot | Sign Up";
    const [credentials, setCredentials] = useState({})
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}))
        try {
            const res = await axios.post('${import.meta.env.VITE_BACKEND_URL}/api/auth/register', credentials)
            navigate('/')            
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <>
            <Navbar />
            <div className="h-screen flex justify-center items-center flex-col gap-y-10">
                <h1 className="text-4xl font-black">Sign Up</h1>
                <div className="flex flex-col item-center bg-zinc-200 p-7 rounded-md">
                    
                    <form
                        onSubmit={handleRegister}
                        className="flex flex-col item-center  gap-y-5 bg-zinc-200 rounded-md"
                    >
                        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                        <input
                            type="text"
                            placeholder="Username"
                            id="username"
                            onChange={handleChange}
                            className="border-2 border-zinc-500 p-3 w-60 rounded-md"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            onChange={handleChange}
                            required
                            className="border-2 border-zinc-500 p-3 w-60 rounded-md"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            onChange={handleChange}
                            className="border-2 border-zinc-500 p-3 w-60 rounded-md"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-4 rounded-md font-semibold"
                            // disabled={loading}
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;

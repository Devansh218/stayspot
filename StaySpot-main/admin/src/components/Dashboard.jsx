import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import {AuthContext} from '../context/AuthContext'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    document.title = "StaySpot | Dashboard";
    var { data, error } = useFetch("http://localhost:3000/api/user");
    const users = data.length;
    var { data } = useFetch("http://localhost:3000/api/hotel");
    const hotels = data.length;
    var { data } = useFetch("http://localhost:3000/api/room");
    const rooms = data.length;
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    if(!user) navigate('/login');
    return (
        <>
            {error && <p className="text-red-600 font-semibold text-center">{error.response.data.message}</p>}
            <div className="bg-zinc-900 w-full p-5">
                <div className="flex gap-5 flex-wrap">
                    <div className="bg-[#282828] rounded-lg w-[20rem] p-3 h-[8rem]">
                        <h1 className="text-white font-semibold text-2xl mb-3">
                            <i className="ri-group-line mr-1"></i> Total Users
                        </h1>
                        <h2 className="text-zinc-300 text-2xl font-semibold">
                            {users}
                        </h2>
                    </div>
                    <div className="bg-[#282828] rounded-lg w-[20rem] p-3 h-[8rem]">
                        <h1 className="text-white font-semibold text-2xl mb-3">
                            <i className="ri-hotel-line mr-1"></i> Total Hotels
                        </h1>
                        <h2 className="text-zinc-300 text-2xl font-semibold">
                            {hotels}
                        </h2>
                    </div>
                    <div className="bg-[#282828] rounded-lg w-[20rem] p-3 h-[8rem]">
                        <h1 className="text-white font-semibold text-2xl mb-3">
                            <i className="ri-hotel-bed-line mr-1"></i> Total
                            Rooms
                        </h1>
                        <h2 className="text-zinc-300 text-2xl font-semibold">
                            {rooms}
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

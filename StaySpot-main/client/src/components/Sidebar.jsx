import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

const Sidebar = () => {

    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination)
    const [date, setDate] = useState(location.state.date)
    const [rooms, setRooms] = useState(location.state.rooms)
    

    return (
        <div className="w-[20%] bg-zinc-200 h-[93vh] overflow-y-hidden px-5 py-10 flex-shrink-0">
            <h1 className="text-3xl font-bold">Filters</h1>
            <div className="mt-5">
                <label className="block">Destination</label>
                <input
                    type="text"
                    className="outline-none w-full h-10 rounded my-2 p-2"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                />
                <label className="block">Check in date</label>
                <input
                    type="text"
                    className="outline-none w-full h-10 rounded my-2 p-2"
                    value={`${format(date[0].startDate, "mm/dd/yyyy")} to ${format(date[0].endDate, "mm/dd/yyyy")}`}
                />
                <p className="text-xl font-semibold mt-3">Options</p>
                <div className="flex my-5 items-center justify-between">
                    <p>Min Price per night</p>
                    <input type="number" className="w-16 h-8 outline-none p-2" />
                </div>
                <div className="flex my-5 items-center justify-between">
                    <p>Max Price per night</p>
                    <input type="number" className="w-16 h-8 outline-none p-2" />
                </div>
                <div className="flex my-5 items-center justify-between">
                    <p>Rooms</p>
                    <input type="number" className="w-16 h-8 outline-none p-1" onChange={e=>setRooms(e.target.value)} value={rooms}/>
                </div>
                <button className="bg-blue-600 w-full text-white py-2 rounded font-semibold">Search</button>
            </div>
        </div>
    );
};

export default Sidebar;

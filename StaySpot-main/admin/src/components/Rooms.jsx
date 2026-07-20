import React from "react";
import Table from "./table";
import useFetch from "../hooks/useFetch";

const Rooms = () => {
    document.title = "StaySpot | Rooms";
    const {data} = useFetch('http://localhost:3000/api/room')
    return (
        <div className="w-full">
            <h1 className="bg-zinc-900 text-zinc-300 font-bold text-3xl px-5 py-3">
                All Rooms
            </h1>
            <Table headers={["title", "desc", "maxPeople", 'price']} data={data} />
        </div>
    );
};

export default Rooms;

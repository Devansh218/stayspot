import React from "react";
import useFetch from "../hooks/useFetch";
import Table from "./table";

const Hotels = () => {
    document.title = "StaySpot | Hotels";
    const {data} = useFetch('http://localhost:3000/api/hotel');
    return (
        <div className="w-full">
            <h1 className="bg-zinc-900 text-zinc-300 font-bold text-3xl px-5 py-3">
                All Hotels
            </h1>
            <Table headers={["name", "address", "desc", 'cheapestPrice']} data={data} />
        </div>
    );
};

export default Hotels;

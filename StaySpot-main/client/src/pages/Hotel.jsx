import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/SearchContext.jsx";
import Reserve from "../components/Reserve.jsx";

const Hotel = () => {
    document.title = "StaySpot | Hotel";
    const { pathname } = useLocation();
    const id = pathname.split("/")[2];
    const [openReserve, setOpenReserve] = useState(false);

    const { data, loading } = useFetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/hotel/find/${id}`
    );


    const { dates, rooms } = useContext(SearchContext);

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const daydiff = (date1, date2) => {
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(diffTime / MILLISECONDS_PER_DAY);
    };

    const days = daydiff(dates[0].endDate, dates[0].startDate);

    return (
        <div className="relative min-h-[93vh]">
            <Navbar />
            <div className="mt-[10vh] px-[15%] py-10">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold">{data.name}</h1>
                        <p className="my-2 text-zinc-400">
                            <i className="ri-map-pin-2-fill text-black mr-2"></i>
                            {data.address}
                        </p>
                        <p className="text-blue-400 font-semibold mb-3">
                            Excellent Location - 500m from the centre
                        </p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 rounded text-white font-semibold" onClick={()=>setOpenReserve(prev=>!prev)}>
                        Reserve or book now
                    </button>
                </div>
                <div className="flex flex-wrap gap-5 justify-center">
                    {data.photos &&
                        data.photos.map((photo, i) => (
                            <img
                                key={i}
                                src={photo}
                                alt="Images"
                                className="w-[30%] h-72 object-cover"
                            />
                        ))}
                </div>

                <div className="flex justify-between mt-5 ">
                    <div >
                        <h1 className="text-2xl font-bold">
                            Hotel Description
                        </h1>
                        <p className="w-full mt-2">{data.desc}</p>
                    </div>
                    <div className="bg-blue-200 p-5 rounded w-[18vw] shrink-0">
                        <p className="text-zinc-700 font-bold text-lg">
                            Perfect for 5 night stay
                        </p>
                        <p className="text-sm my-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Maiores, earum.
                        </p>
                        <h2 className="text-xl font-bold mb-2">
                            Rs {data.cheapestPrice * days * rooms} ({days}{" "}
                            nights)
                        </h2>
                        <button className="px-4 py-2 bg-blue-600 rounded text-white font-semibold" onClick={()=>setOpenReserve(prev=>!prev)}>
                            Reserve or book now
                        </button>
                    </div>
                </div>
            </div>
            {openReserve && (
                <Reserve hotelid={id} setOpenReserve={setOpenReserve} totalAmount = {data.cheapestPrice * days * rooms}/>
            )}
        </div>
    );
};

export default Hotel;

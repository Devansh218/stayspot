import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/SearchContext";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Reserve = ({ hotelid, setOpenReserve, totalAmount }) => {
    const { data, loading } = useFetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/hotel/rooms/${hotelid}`
    );
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [booked, setBooked] = useState(null);
    const { dates } = useContext(SearchContext);

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked
                ? [...selectedRooms, value]
                : [selectedRooms.filter((r) => r.value !== value)]
        );
    };

    const getDates = (start, end) => {
        const date = new Date(start.getTime());
        let list = [];
        while (date <= end) {
            list.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return list;
    };

    const allDates = getDates(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            allDates.some(
                (allDate) => allDate.getTime() === new Date(date).getTime()
            )
        );
        return !isFound;
    };

    const handleClick = async () => {
        if (!user) {
            setBooked(false);
            navigate("/login");
        }
        try {
            if (selectedRooms.length <= 0) {
                setBooked("Please select at least one room");
                return;
            }
            await Promise.all(
                selectedRooms.map((roomId) => {
                    const res = axios.put(
                        `${import.meta.env.VITE_BACKEND_URL}/api/room/availability/${roomId}`,
                        { dates: allDates }
                    );
                    return res.data;
                })
            );
            navigate(-1);
        } catch (error) {
            setBooked(error.message);
        }
    };

    return (
        <div className="absolute top-0 bg-[#0000007a] w-full flex justify-center items-center flex-col py-10">
            <div className="p-10 bg-white max-w-[50%]">
                {booked !== null && (
                    <p className="text-red-600 text-center mb-5">{booked}</p>
                )}
                {data.length > 0 ? (
                    data.map((item, idx) => (
                        <div
                            key={idx}
                            className="mt-3 flex justify-between gap-x-3"
                        >
                            <div className="w-[85%] whitespace-wrap">
                                <h1>{item.title}</h1>
                                <p>{item.desc}</p>
                                <small>Max People: {item.maxPeople}</small>
                                <h2>{item.price}</h2>
                            </div>
                            <div className="flex flex-wrap gap-x-2 w-[15%]">
                                {item.roomNumbers.map((elem) => (
                                    <div
                                        key={elem._id}
                                        className="flex flex-col"
                                    >
                                        <label
                                            htmlFor="room"
                                            className="text-xs text-zinc-600 font-semibold"
                                        >
                                            {elem.number}
                                        </label>
                                        <input
                                            type="checkbox"
                                            value={elem._id}
                                            name="room"
                                            onChange={handleSelect}
                                            disabled={!isAvailable(elem)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="text-center">
                        Sorry! No rooms are available right now
                    </h1>
                )}

                <button
                    className="ri-close-fill absolute bottom-[80%] text-3xl text-white right-[20%]"
                    onClick={() => setOpenReserve((prev) => !prev)}
                ></button>
                {data.length > 0 && (
                    <button
                        onClick={handleClick}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white ml-[50%] translate-x-[-50%] mt-5"
                    >
                        Reserve Now
                    </button>
                )}
            </div>
        </div>
    );
};

export default Reserve;

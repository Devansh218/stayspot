import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import header from "../assets/header.png";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import useFetch from "../hooks/useFetch";
import PropertyList from "../components/PropertyList";
import Featured from "../components/Featured";
import { format } from "date-fns";
import { SearchContext } from "../context/SearchContext.jsx";

const Home = () => {
    document.title = "StaySpot";
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [open, setOpen] = useState(false);

    const { data, loading } = useFetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/hotel/countbycity?cities=mumbai,delhi,lucknow`
    );


    //search bar data 
    const [destination, setDestination] = useState("")
    const [rooms, setRooms] = useState(false);

    const navigate = useNavigate();
    const {dispatch}  = useContext(SearchContext)
    const handleSearch = () => {
        dispatch({type: "NEW_SEARCH", payload: {city:destination.toLowerCase(), rooms, dates}})
        navigate('/search', {state: {destination, dates, rooms}})
    }

    return (
        <div>
            <Navbar />
            <div
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${header})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="w-full h-[80vh] flex flex-col items-center justify-center mt-[7vh]"
            >
                <h1 className="text-6xl text-white font-black">
                    Discover, Unwind, Repeat
                </h1>
                <p className="text-2xl text-zinc-300 my-5">
                    Your perfect staycation destination!
                </p>
                <div className="p-3 bg-white flex gap-x-3 items-center rounded-md relative">
                    <i className="ri-building-4-fill text-zinc-600 text-xl"></i>
                    <input
                        type="text"
                        placeholder="Enter place"
                        name="city"
                        className="outline-none z-50"
                        onChange={e=>setDestination(e.target.value)}
                        value={destination}
                    />
                    <i className="ri-calendar-2-fill text-zinc-600 text-xl"></i>
                    <span className="text-zinc-400" onClick={() => setOpen(!open)}>{`${format(dates[0].startDate, "mm/dd/yyyy")} to ${format(dates[0].endDate, "mm/dd/yyyy")}`}</span>
                    <i className="ri-hotel-bed-fill text-zinc-600 text-xl"></i>
                    <input
                        type="number"
                        placeholder="Rooms"
                        name="rooms"
                        className="outline-none z-50"
                        onChange={e=>setRooms(e.target.value)}
                        value={rooms}
                    />
                    <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 rounded-md text-white">
                        Search
                    </button>
                    {open && (
                        <div className="absolute top-[4.2rem] right-[30%]">
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item) => setDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                                minDate={new Date()}
                            />
                        </div>
                    )}
                </div>
            </div>

            {loading ? (
                "loading please wait!"
            ) : (
                <div className="w-full py-7 flex gap-x-20 justify-center">
                    <div
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(https://plus.unsplash.com/premium_photo-1697730489433-4a5fe8a77f96?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        className="w-[21rem] h-[17rem] rounded-lg p-10 flex flex-col justify-end"
                    >
                        <h1 className="text-3xl text-white font-bold">
                            Mumbai
                        </h1>
                        <p className="text-2xl text-zinc-200 font-semibold mt-3">
                            {data[0]} Properties
                        </p>
                    </div>
                    <div
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        className="w-[21rem] h-[17rem] rounded-lg  p-10 flex flex-col justify-end"
                    >
                        <h1 className="text-3xl text-white font-bold">Delhi</h1>
                        <p className="text-2xl text-zinc-200 font-semibold mt-3">
                            {data[1]} Properties
                        </p>
                    </div>
                    <div
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(https://plus.unsplash.com/premium_photo-1697729447666-c39f50d595ea?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        className="w-[21rem] h-[17rem] rounded-lg  p-10 flex flex-col justify-end"
                    >
                        <h1 className="text-3xl text-white font-bold">
                            Lucknow
                        </h1>
                        <p className="text-2xl text-zinc-200 font-semibold mt-3">
                            {data[2]} Properties
                        </p>
                    </div>
                </div>
            )}

            <PropertyList/>
            <Featured/>
        </div>
    );
};

export default Home;

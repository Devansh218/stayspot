import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { format } from "date-fns";
import useFetch from "../hooks/useFetch";

const Search = () => {
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setdates] = useState(location.state.dates);
    const [rooms, setRooms] = useState(location.state.rooms);

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(9999)
    const { data, loading, error, reFetch } = useFetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/hotel?city=${destination}&min=${min || 0}&max=${max || 99999}`
    );

    const handleClick = () => {
      reFetch();
    }

    return (
        <>
            <Navbar />

            <div className="flex h-[93vh] overflow-hidden mt-[7vh]">
                {/* sidebar */}
                <div className="w-[20%] bg-zinc-200 h-[93vh] overflow-y-hidden px-5 py-10 flex-shrink-0">
                    <h1 className="text-3xl font-bold">Filters</h1>
                    <div className="mt-5">
                        <label className="block">Destination</label>
                        <input
                            type="text"
                            className="outline-none w-full h-10 rounded my-2 p-2"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                        <label className="block">Check in date</label>
                        <input
                            type="text"
                            className="outline-none w-full h-10 rounded my-2 p-2"
                            value={`${format(
                                dates[0].startDate,
                                "mm/dd/yyyy"
                            )} to ${format(dates[0].endDate, "mm/dd/yyyy")}`}
                            onChange={e=>setdates(e.target.value)}
                        />
                        <p className="text-xl font-semibold mt-3">Options</p>
                        <div className="flex my-5 items-center justify-between">
                            <p>Min Price per night</p>
                            <input
                                type="number"
                                className="w-16 h-8 outline-none p-2"
                                onChange={e=>setMin(e.target.value)}
                                value={min}
                            />
                        </div>
                        <div className="flex my-5 items-center justify-between">
                            <p>Max Price per night</p>
                            <input
                                type="number"
                                className="w-16 h-8 outline-none p-2"
                                onChange={e=>setMax(e.target.value)}
                                value={max}
                            />
                        </div>
                        <div className="flex my-5 items-center justify-between">
                            <p>Rooms</p>
                            <input
                                type="number"
                                className="w-16 h-8 outline-none p-1"
                                onChange={(e) => setRooms(e.target.value)}
                                value={rooms}
                            />
                        </div>
                        <button className="bg-blue-600 w-full text-white py-2 rounded font-semibold" onClick={handleClick}>
                            Search
                        </button>
                    </div>
                </div>

                {/* search list */}

                <div className="py-10 px-[5%] w-full overflow-y-auto overflow-x-hidden">
                    {loading
                        ? "loading"
                        : data.map((item) => (
                              <Link to={`/hotel/${item._id}`} key={item._id} className="flex h-60 border-2 border-zinc-400 w-full p-3 rounded justify-between my-5 h-fit">
                                  <div className="flex gap-x-5">
                                      <img
                                          src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                          alt=""
                                          className="rounded w-72 h-full object-cover"
                                      />
                                      <div className="flex flex-col gap-y-2 w-[60%]">
                                          <h1 className="text-3xl font-bold">
                                              {item.name}
                                          </h1>
                                          <p className="text-md text-zinc-600">
                                              Distance
                                          </p>
                                          <p className="px-2 py-1 bg-green-500 w-fit rounded text-white">
                                              Free Airport Taxi
                                          </p>
                                          <p className="">{item.desc}</p>
                                          <p className="text-green-600 font-semibold">
                                              Free cancellation
                                          </p>
                                          <p className="text-green-400 text-sm">
                                              You can cancel it later, so lock
                                              in this great price today!
                                          </p>
                                      </div>
                                  </div>
                                  <div className="flex flex-col justify-between flex-shrink-0">
                                      <div className="text-end w-full flex justify-end">
                                          {item.rating && (
                                              <p className="bg-blue-700 w-10 h-10 flex justify-center items-center text-white font-bold">
                                                  {item.rating}
                                              </p>
                                          )}
                                      </div>

                                      <div>
                                          <h2 className="text-end text-2xl">
                                              Rs{" "}
                                              {!rooms
                                                  ? item.cheapestPrice
                                                  : item.cheapestPrice * rooms}
                                          </h2>
                                          <small className="block text-zinc-600 mt-1">
                                              includes taxes and fees
                                          </small>
                                          <button className="px-4 py-2 bg-blue-600 text-white rounded mt-2">
                                              See availability
                                          </button>
                                      </div>
                                  </div>
                              </Link>
                          ))}
                </div>
            </div>
        </>
    );
};

export default Search;

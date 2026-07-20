import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useLocation } from "react-router-dom";

const SearchList = () => {
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    const [rooms, setrooms] = useState(location.state.rooms);
    const { data, loading } = useFetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/hotel?city=${destination}`
    );

    return (
        <div className="py-10 px-[5%] w-full overflow-y-auto overflow-x-hidden">
            {loading
                ? "loading"
                : data.map((item) => (
                      <div className="flex h-60 border-2 border-zinc-400 w-full p-3 rounded justify-between my-5 h-fit">
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
                                      You can cancel it later, so lock in this
                                      great price today!
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
                                      Rs {!rooms ? item.cheapestPrice : item.cheapestPrice * rooms}
                                  </h2>
                                  <small className="block text-zinc-600 mt-1">
                                      includes taxes and fees
                                  </small>
                                  <button className="px-4 py-2 bg-blue-600 text-white rounded mt-2">
                                      See availability
                                  </button>
                              </div>
                          </div>
                      </div>
                  ))}
        </div>
    );
};

export default SearchList;

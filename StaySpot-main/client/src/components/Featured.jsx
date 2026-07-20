import React from "react";
import useFetch from "../hooks/useFetch";

const Featured = () => {
    const { data, loading, error } = useFetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/hotel?featured=true`
    );

    return (
        <div className="px-[10%] py-5">
            <h1 className="text-2xl font-bold mb-5">Featured Hotels</h1>
            <div className="flex items-center gap-x-10 overflow-y-auto pb-5 ">
                {loading
                    ? "loading"
                    : data.map((item, i) => (
                          <div key={item._id} className="w-[20%] flex-shrink-0 p-3 rounded shadow-[4px_2px_10px_2px_rgba(0,0,0,0.3)]">
                              <img
                                  src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                  alt=""
                                  className="w-full h-full object-cover rounded"
                              />
                              <p className="text-lg font-bold">{item.name}</p>
                              <p className="font-semibold">
                                  Starting from Rs.{item.cheapestPrice}
                              </p>
                              <p className="font-semibold capitalize">
                                  {item.city}
                              </p>
                              <button className="px-2 py-1 rounded bg-blue-600 text-white mt-2">
                                  View
                              </button>
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default Featured;

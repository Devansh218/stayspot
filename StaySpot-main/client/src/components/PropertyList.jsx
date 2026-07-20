import React from "react";
import useFetch from "../hooks/useFetch";

const PropertyList = () => {
    const { data, loading, error } = useFetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/hotel/countbytype`
    );
    const images = [
        "https://images.unsplash.com/photo-1517840901100-8179e982acb7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1676321046262-4978a752fb15?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1681922761648-d5e2c3972982?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1517542117529-b6b058a13f51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    return (
        <div className="px-[10%] py-5">
            <h1 className="text-2xl font-bold mb-5">Browse by Property type</h1>
            <div className="flex gap-x-10">
                {loading
                    ? "loading please wait..."
                    : data.map((item, index) => {
                          return (
                              <div key={index}>
                                  <img
                                      src={images[index]}
                                      alt="Hotel"
                                      className="w-52 h-32 rounded-md object-cover"
                                  />
                                  <p className="text-lg font-bold mt-2 capitalize">
                                      {item.type}
                                  </p>
                                  <p className="">{item.count} Hotels</p>
                              </div>
                          );
                      })}
            </div>
        </div>
    );
};

export default PropertyList;

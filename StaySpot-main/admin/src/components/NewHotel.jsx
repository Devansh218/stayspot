import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const NewHotel = () => {
    document.title = "StaySpot | Add Hotel";
    const [credentials, setCredentials] = useState({});
    const [error, seterror] = useState(null);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [rooms, setRooms] = useState([]);

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const { data, loading } = useFetch("http://localhost:3000/api/room");

    const navigate = useNavigate();

    const images = [...files];
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            setUploading(true);
            const list = await Promise.all(
                images.map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "uploads");

                    const uploadRes = await axios.post(
                        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                        data,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );

                    const { url } = uploadRes.data;
                    console.log(url);

                    return url;
                })
            );

            const newhotel = {
                ...credentials,
                rooms,
                photos: list,
            };

            await axios.post("http://localhost:3000/api/hotel", newhotel);
            setUploading(false);
            navigate("/");
        } catch (err) {
            setUploading(false);
            seterror(err.response?.data?.message || "Something went wrong");
        }
    };

    const handleSelect = (e) => {
        setRooms(
            Array.from(e.target.selectedOptions, (option) => option.value)
        );
    };

    return (
        <div>
            <h1 className="text-zinc-300 font-bold text-3xl px-5 py-3">
                Add Hotel
            </h1>

            <form
                action="/"
                className="flex flex-col text-gray-300 w-[40%] ml-[50%] translate-x-[-50%] "
            >
                {error && <p className="text-red-500 mb-3 " >{error}</p>}

                <div>
                    <input
                        type="file"
                        name="files"
                        id="files"
                        multiple
                        accept="image/*"
                        onChange={(e) => setFiles(e.target.files)}
                    />
                </div>
                <div className="flex flex-col gap-y-2 mt-3 w-full">
                    <label htmlFor="username">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        className="p-2 outline-none bg-transparent border-b-2"
                        placeholder="Enter hotel name"
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-2 mt-3 w-full">
                    <label htmlFor="email">Description</label>

                    <textarea
                        name="discription"
                        id="desc"
                        placeholder="Enter description"
                        className="bg-transparent border-2 outline-none rounded p-2"
                        rows="3"
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="flex flex-col gap-y-2 mt-3 w-full">
                    <label htmlFor="password">City</label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        onChange={handleChange}
                        className="p-2 outline-none bg-transparent border-b-2 "
                        placeholder="Enter city"
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-2 mt-3 w-full">
                    <label htmlFor="email">Address</label>

                    <textarea
                        name="address"
                        id="address"
                        placeholder="Enter address"
                        className="bg-transparent border-2 outline-none rounded p-2"
                        rows="3"
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="flex flex-col gap-y-2 mt-3 w-full">
                    <label htmlFor="password">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="cheapestPrice"
                        onChange={handleChange}
                        className="p-2 outline-none bg-transparent border-b-2"
                        placeholder="Enter price"
                        required
                    />
                </div>
                <div className="flex justify-between w-full gap-x-10 mt-3" >
                    <div className="flex flex-col gap-y-2 w-[30%]">
                        <label htmlFor="maxPeople">Featured</label>
                        <select
                            name="featured"
                            id="featured"
                            className="bg-transparent border-b-2"
                            onChange={handleChange}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>
                    <div className="flex flex-col justify-start w-full">
                        <label htmlFor="options">Rooms</label>
                        <select
                            name="rooms"
                            id="rooms"
                            multiple
                            className="bg-transparent p-2 border-2 outline-none"
                            onChange={handleSelect}
                        >
                            {loading
                                ? "Loading..."
                                : data.map((e) => (
                                      <option key={e._id} value={e._id}>
                                          {e.title}
                                      </option>
                                  ))}
                        </select>
                    </div>
                </div>

                <div className="w-[30%]">
                    <button
                        type="submit"
                        onClick={handleClick}
                        className="p-2 bg-blue-600 rounded text-white my-5"
                        disabled={uploading}
                    >
                        {uploading ? "uploading" : "Create Room"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewHotel;

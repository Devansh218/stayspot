import { useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
    document.title = "StaySpot | Add Room";
    const { data, loading } = useFetch("http://localhost:3000/api/hotel");
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);
    const [hotelId, setHotelId] = useState(undefined);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };


    const handleSubmt = async (e) => {
        e.preventDefault();
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        const roomNumbers = rooms.split(',').map(room=> ({number: room}));
        try {
            await axios.post(`http://localhost:3000/api/room/${hotelId}`, {
                ...info,
                roomNumbers,
            });
            navigate('/')
        } catch (err) {
          setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div>
            <h1 className="text-zinc-300 font-bold text-3xl px-5 py-3">
                Add Room
            </h1>

            <form
                // onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center text-gray-300 w-[40%] ml-[50%] translate-x-[-50%]"
            >
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex flex-col gap-y-2 mt-3 w-full">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        onChange={handleChange}
                        className="p-2 outline-none bg-transparent border-b-2"
                        placeholder="Enter title"
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-2 mt-3 w-full">
                    <label htmlFor="desc">Description</label>
                    <input
                        type="text"
                        name="desc"
                        id="desc"
                        onChange={handleChange}
                        className="p-2 outline-none bg-transparent border-b-2"
                        placeholder="Enter description address"
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-2 mt-3 w-full">
                    <label htmlFor="maxPeople">Max People</label>
                    <input
                        type="number"
                        name="maxPeople"
                        id="maxPeople"
                        onChange={handleChange}
                        className="p-2 outline-none bg-transparent border-b-2"
                        placeholder="Enter max people"
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-2 mt-3 w-full">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        onChange={handleChange}
                        className="p-2 outline-none bg-transparent border-b-2"
                        placeholder="Enter price"
                        required
                    />
                </div>
                <div className="flex justify-between w-full">
                    <div className="items-start mt-3 w-full flex flex-col">
                        <label htmlFor="roomNumbers">Room Numbers</label>
                        <textarea
                            name="roomNumbers"
                            id="roomNumbers"
                            placeholder="Seperate Room numbers using comma (,). Ex- 101,102,103"
                            className="p-2 outline-none bg-transparent border-2 rounded mt-2"
                            rows="3"
                            onChange={(e) =>
                                setRooms(e.target.value)
                            }
                        ></textarea>
                    </div>
                    <div className="items-start mt-3 w-full flex flex-col">
                        <label htmlFor="hotel">Choose Hotel</label>
                        <select
                            className="ml-3 p-2 outline-none bg-transparent border-2 w-full mt-2"
                            id="hotel"
                            onChange={(e) => setHotelId(e.target.value)}
                        >
                            {loading
                                ? "loading..."
                                : data.map((e) => (
                                      <option key={e._id} value={e._id} className="bg-transparent">
                                          {e.name}
                                      </option>
                                  ))}
                        </select>
                    </div>
                </div>
                <div className="w-full mb-3">
                    <button
                        type="submit"
                        className="p-2 bg-blue-600 rounded text-white mt-5"
                        onClick={handleSubmt}
                    >
                        Create Room
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewRoom;

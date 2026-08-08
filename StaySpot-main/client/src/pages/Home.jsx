import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Featured from "../components/Featured";
import PropertyList from "../components/PropertyList";

// Expanded 30+ Cities Selection List across India
const CITIES_LIST = [
  "Kanpur", "Delhi", "Lucknow", "Varanasi", "Mumbai", "Agra", "Noida",
  "Prayagraj", "Ayodhya", "Pune", "Nagpur", "Nashik", "Gurugram",
  "Ghaziabad", "Faridabad", "Bengaluru", "Mysore", "Mangalore", "Jaipur",
  "Udaipur", "Jodhpur", "Jaisalmer", "Chennai", "Coimbatore", "Kolkata",
  "Siliguri", "Darjeeling", "Goa", "Hyderabad", "Ahmedabad", "Surat"
];

const Home = () => {
  const [destination, setDestination] = useState("Kanpur");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/search", {
      state: {
        destination: destination.toLowerCase(),
        dates: [{ startDate, endDate }],
      },
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <Navbar />

      {/* Main Hero Search Banner */}
      <div className="bg-blue-900 text-white py-12 px-4 flex justify-center">
        <div className="max-w-5xl w-full">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">
            Find your next staycation destination
          </h1>
          <p className="text-sm text-blue-200 mb-8 font-medium">
            Search deals on hotels, homes, and much more across India...
          </p>

          {/* Search Box Bar */}
          <div className="bg-white p-3 rounded-2xl shadow-xl text-slate-800 flex flex-col md:flex-row items-center gap-3 border border-slate-200">
            
            {/* 30+ Cities Selection Dropdown */}
            <div className="flex-1 w-full flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-lg">🏨</span>
              <div className="flex flex-col w-full">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Select City (30+ Options)
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-transparent font-extrabold text-sm text-slate-900 outline-none cursor-pointer w-full"
                >
                  {CITIES_LIST.map((city) => (
                    <option key={city} value={city} className="text-slate-900 font-semibold">
                      📍 {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Check-In & Check-Out Dates */}
            <div className="flex-1 w-full flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-lg">📅</span>
              <div className="flex gap-2 w-full">
                <div className="flex flex-col flex-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Check-In
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-transparent font-bold text-xs text-slate-800 outline-none"
                  />
                </div>
                <div className="flex flex-col flex-1 border-l pl-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Check-Out
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-transparent font-bold text-xs text-slate-800 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Search Button */}
            <button
              onClick={handleSearch}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black px-8 py-4 rounded-xl shadow-md transition-all text-sm uppercase tracking-wider"
            >
              Search
            </button>

          </div>
        </div>
      </div>

      {/* Main Sections Body */}
      <div className="mt-8 flex flex-col items-center gap-10 px-4 max-w-6xl mx-auto mb-16">
        
        {/* Featured Hotels */}
        <div className="w-full">
          <h2 className="text-xl font-black text-slate-900 mb-4">Featured Hotels</h2>
          <Featured />
        </div>

        {/* Property Types */}
        <div className="w-full">
          <h2 className="text-xl font-black text-slate-900 mb-4">Browse by Property type</h2>
          <PropertyList />
        </div>

      </div>
    </div>
  );
};

export default Home;
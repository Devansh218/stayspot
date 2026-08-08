import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 30+ Cities Grouped State-Wise
const STATE_CITY_MAP = {
  "Uttar Pradesh": ["Kanpur", "Lucknow", "Varanasi", "Agra", "Noida", "Prayagraj", "Ayodhya"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"],
  "Delhi NCR": ["Delhi", "Gurugram", "Ghaziabad", "Faridabad"],
  "Karnataka": ["Bengaluru", "Mysore", "Mangalore", "Hubli"],
  "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "West Bengal": ["Kolkata", "Siliguri", "Darjeeling"],
};

// Function to generate dynamic features based on price tier
const getPriceFeatures = (price) => {
  if (price >= 3000) {
    return {
      tier: "Luxury Experience",
      amenities: ["🏊 Swimming Pool", "🍸 Rooftop Lounge", "🍳 Complimentary Buffet", "🚘 Valet Parking", "🏋️ Fitness Center"],
      badge: "Luxury"
    };
  } else if (price >= 1800) {
    return {
      tier: "Premium Stay",
      amenities: ["📶 High-Speed Wi-Fi", "🍳 Free Breakfast", "❄️ Central AC", "☕ Coffee Maker"],
      badge: "Premium"
    };
  } else {
    return {
      tier: "Standard Comfortable",
      amenities: ["📶 Free Wi-Fi", "❄️ Air Conditioning", "🧹 Daily Housekeeping"],
      badge: "Budget Friendly"
    };
  }
};

// Base Dataset across 30+ Cities
const GENERATED_HOTELS = Object.entries(STATE_CITY_MAP).flatMap(([state, cities]) =>
  cities.flatMap((city, idx) => [
    {
      id: `${city.toLowerCase()}-1`,
      name: `${city} Grand Palace & Resort`,
      city: city.toLowerCase(),
      state: state,
      cheapestPrice: 1200 + (idx % 3) * 1100,
      desc: `Experience luxury and high-class comfort in central ${city}. Ideal for corporate stays and family vacations.`,
      photos: ["https://images.unsplash.com/photo-1566073771259-6a8506099945"],
    },
    {
      id: `${city.toLowerCase()}-2`,
      name: `${city} Central Executive Inn`,
      city: city.toLowerCase(),
      state: state,
      cheapestPrice: 900 + (idx % 2) * 800,
      desc: `Budget-friendly stays with premium amenities located near main railway station in ${city}.`,
      photos: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"],
    }
  ])
);

const SearchCard = ({ item }) => {
  const navigate = useNavigate();
  const features = getPriceFeatures(item.cheapestPrice);

  return (
    <div className="border rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm bg-white mb-4 gap-4 border-slate-200 hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <img
          src={item.photos[0]}
          alt={item.name}
          className="w-full sm:w-44 h-36 object-cover rounded-xl"
        />
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full">
                {features.badge}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{item.state}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">{item.name}</h2>
            <p className="text-xs text-slate-500 capitalize font-medium">📍 {item.city}</p>
            <p className="text-xs text-slate-600 mt-1 line-clamp-1">{item.desc}</p>
            
            {/* Price-Based Features List */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {features.amenities.map((amenity, i) => (
                <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-left sm:text-right flex flex-col justify-between w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
        <div>
          <span className="text-2xl font-black text-blue-950">₹{item.cheapestPrice}</span>
          <span className="text-xs text-slate-400 font-normal"> /night</span>
        </div>
        <button
          onClick={() => navigate(`/hotel/${item.id}`)}
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold px-5 py-2.5 rounded-xl mt-3 shadow transition-all whitespace-nowrap"
        >
          See Availability
        </button>
      </div>
    </div>
  );
};

const Search = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredHotels = GENERATED_HOTELS.filter((hotel) => {
    if (selectedState && hotel.state !== selectedState) return false;
    if (selectedCity && hotel.city !== selectedCity.toLowerCase()) return false;
    if (minPrice && hotel.cheapestPrice < parseInt(minPrice)) return false;
    if (maxPrice && hotel.cheapestPrice > parseInt(maxPrice)) return false;
    return true;
  });

  return (
    <div className="flex justify-center mt-5 px-4 font-sans mb-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        
        {/* State & City Filter Sidebar */}
        <div className="flex-1 bg-amber-400 p-5 rounded-2xl h-fit sticky top-5 shadow-md">
          <h1 className="text-xl font-black text-slate-900 mb-4">Location Filters</h1>

          {/* State Dropdown */}
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-xs font-black text-slate-800 uppercase tracking-wider">Select State</label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity("");
              }}
              className="p-2.5 bg-white rounded-xl border text-xs font-bold text-slate-800 w-full"
            >
              <option value="">All States (India)</option>
              {Object.keys(STATE_CITY_MAP).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* City Dropdown */}
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-xs font-black text-slate-800 uppercase tracking-wider">Select City (30+ Options)</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="p-2.5 bg-white rounded-xl border text-xs font-bold text-slate-800 w-full"
            >
              <option value="">All Cities</option>
              {(selectedState ? STATE_CITY_MAP[selectedState] : Object.values(STATE_CITY_MAP).flat()).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Budget Range */}
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-xs font-black text-slate-800 uppercase tracking-wider">Budget Range (₹)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="p-2.5 bg-white rounded-xl border text-xs font-bold text-slate-800 w-full text-center"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="p-2.5 bg-white rounded-xl border text-xs font-bold text-slate-800 w-full text-center"
              />
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedState("");
              setSelectedCity("");
              setMinPrice("");
              setMaxPrice("");
            }}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors shadow text-xs uppercase tracking-wider"
          >
            Clear Filters
          </button>
        </div>

        {/* Results Panel */}
        <div className="flex-[3]">
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-lg font-black text-slate-900">
              Matching Stays ({filteredHotels.length})
            </h2>
          </div>

          {filteredHotels.map((hotel) => (
            <SearchCard item={hotel} key={hotel.id} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Search;
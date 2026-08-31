import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FEATURED_DATA = [
  {
    id: "delhi-1",
    name: "Grand Taj Palace",
    city: "Delhi",
    tag: "Trending",
    rating: 4.8,
    reviews: 342,
    price: 1500,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    amenities: ["Free Wi-Fi", "Pool", "Breakfast"],
  },
  {
    id: "kanpur-1",
    name: "Kanpur Residency Stay",
    city: "Kanpur",
    tag: "Best Value",
    rating: 4.5,
    reviews: 189,
    price: 1100,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    amenities: ["Free Wi-Fi", "AC", "Business Center"],
  },
  {
    id: "varanasi-1",
    name: "Ganges View Resort",
    city: "Varanasi",
    tag: "Heritage",
    rating: 4.9,
    reviews: 512,
    price: 1800,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    amenities: ["River View", "Spa", "Free Breakfast"],
  },
  {
    id: "mumbai-1",
    name: "Marine Drive View Suites",
    city: "Mumbai",
    tag: "Luxury Pick",
    rating: 4.7,
    reviews: 620,
    price: 2500,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    amenities: ["Sea View", "Infinity Pool", "Bar"],
  },
  {
    id: "goa-1",
    name: "Calangute Beachside Villa",
    city: "Goa",
    tag: "Popular",
    rating: 4.6,
    reviews: 410,
    price: 2100,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    amenities: ["Beach Access", "Pool", "Cocktail Bar"],
  },
  {
    id: "jaipur-1",
    name: "Royal Rajputana Haveli",
    city: "Jaipur",
    tag: "Heritage",
    rating: 4.8,
    reviews: 290,
    price: 1750,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
    amenities: ["Royal Decor", "Courtyard", "Spa"],
  },
];

const CITIES_FILTER = ["All", "Delhi", "Kanpur", "Varanasi", "Mumbai", "Goa", "Jaipur"];

const Featured = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  const filteredStays =
    activeFilter === "All"
      ? FEATURED_DATA
      : FEATURED_DATA.filter((stay) => stay.city.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="w-full">
      {/* City Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
        {CITIES_FILTER.map((city) => (
          <button
            key={city}
            onClick={() => setActiveFilter(city)}
            className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
              activeFilter === city
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {city === "All" ? "✨ All Stays" : `📍 ${city}`}
          </button>
        ))}
      </div>

      {/* Grid of Properties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredStays.map((stay) => (
          <div
            key={stay.id}
            onClick={() => navigate(`/hotel/${stay.id}`)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer flex flex-col group"
          >
            {/* Image & Tag */}
            <div className="h-52 relative overflow-hidden">
              <img
                src={stay.image}
                alt={stay.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                {stay.tag}
              </span>
              <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-black px-2 py-0.5 rounded-md shadow">
                ★ {stay.rating}
              </span>
            </div>

            {/* Info */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                  📍 {stay.city}, India
                </p>
                <h3 className="font-extrabold text-base text-slate-900 mt-1 leading-snug">
                  {stay.name}
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {stay.amenities.map((item, i) => (
                    <span
                      key={i}
                      className="bg-slate-50 text-slate-600 border border-slate-200 text-[10px] font-bold px-2 py-0.5 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Starting at</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-slate-900">₹{stay.price}</span>
                    <span className="text-[11px] text-slate-400 font-medium">/ night</span>
                  </div>
                </div>
                <span className="text-xs font-black text-blue-600 group-hover:translate-x-1 transition">
                  View Details →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
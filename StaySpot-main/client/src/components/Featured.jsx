import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const EXPANDED_FEATURED = [
  { id: "delhi-1", name: "Grand Taj Palace", city: "Delhi", price: 1500, rating: 4.8, tag: "Trending", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945" },
  { id: "kanpur-1", name: "Kanpur Residency Stay", city: "Kanpur", price: 1100, rating: 4.5, tag: "Popular", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" },
  { id: "varanasi-1", name: "Ganges View Resort", city: "Varanasi", price: 1800, rating: 4.9, tag: "Top Rated", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" },
  { id: "mumbai-1", name: "Marine Drive View", city: "Mumbai", price: 2500, rating: 4.7, tag: "Luxury", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d" },
  { id: "lucknow-1", name: "Lucknow Nawabi Retreat", city: "Lucknow", price: 1400, rating: 4.6, tag: "Heritage", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af" },
  { id: "jaipur-1", name: "Pink City Palace", city: "Jaipur", price: 2100, rating: 4.8, tag: "Royal", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914" },
  { id: "pune-1", name: "Deccan Crown Stay", city: "Pune", price: 1600, rating: 4.4, tag: "Popular", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427" },
  { id: "bengaluru-1", name: "Tech City Suites", city: "Bengaluru", price: 2300, rating: 4.7, tag: "Executive", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750" },
  { id: "goa-1", name: "Goa Beachfront Villa", city: "Goa", price: 3200, rating: 4.9, tag: "Resort", image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8" }
];

const Featured = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative w-full group">
      {/* Scroll Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-slate-800 p-2.5 rounded-full shadow-lg border border-slate-200 transition-all active:scale-90"
        aria-label="Scroll Left"
      >
        ◀
      </button>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth py-2 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {EXPANDED_FEATURED.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/hotel/${item.id}`)}
            className="min-w-[260px] sm:min-w-[280px] bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col justify-between cursor-pointer group/card"
          >
            <div className="relative overflow-hidden h-44">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-blue-900/90 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {item.tag}
              </span>
              <span className="absolute bottom-3 right-3 bg-white/90 text-slate-900 text-xs font-black px-2 py-0.5 rounded shadow">
                ★ {item.rating}
              </span>
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-bold text-slate-800 text-sm line-clamp-1 group-hover/card:text-blue-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium capitalize mt-0.5">
                  📍 {item.city}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Starting from</p>
                  <p className="text-sm font-extrabold text-blue-900">₹{item.price}</p>
                </div>
                <button className="bg-slate-100 group-hover/card:bg-blue-600 group-hover/card:text-white text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-slate-800 p-2.5 rounded-full shadow-lg border border-slate-200 transition-all active:scale-90"
        aria-label="Scroll Right"
      >
        ▶
      </button>
    </div>
  );
};

export default Featured;
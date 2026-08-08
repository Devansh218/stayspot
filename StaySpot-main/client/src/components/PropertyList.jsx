import { useNavigate } from "react-router-dom";

const EXPANDED_CATEGORIES = [
  { name: "Hotels", type: "hotel", image: "https://images.unsplash.com/photo-1517840901100-8179e982acb7", count: "140+ Stays" },
  { name: "Apartments", type: "apartment", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af", count: "90+ Stays" },
  { name: "Resorts", type: "resort", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb", count: "55+ Stays" },
  { name: "Villas", type: "villa", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914", count: "35+ Stays" },
  { name: "Cabins & Cottages", type: "cabin", image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8", count: "25+ Stays" },
  { name: "Homestays", type: "homestay", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", count: "60+ Stays" },
  { name: "Heritage Havelis", type: "heritage", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945", count: "18+ Stays" },
  { name: "Penthouses", type: "penthouse", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750", count: "12+ Stays" },
];

const PropertyList = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 w-full">
      {EXPANDED_CATEGORIES.map((item) => (
        <div
          key={item.name}
          onClick={() => navigate("/search", { state: { propertyType: item.type } })}
          className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <div className="relative h-28 overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 text-white text-xs font-bold leading-tight">
              {item.name}
            </span>
          </div>
          <div className="p-2 bg-white text-center">
            <span className="text-[10px] font-bold text-slate-500">{item.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
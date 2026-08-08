import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Numerical ID to City Mapping
const ID_CITY_MAP = {
  "1": "Delhi",
  "2": "Kanpur",
  "3": "Varanasi",
  "4": "Mumbai",
  "5": "Lucknow",
  "6": "Agra"
};

// Unique Image Galleries for Different Property Types/Cities
const HOTEL_GALLERIES = {
  "Delhi": [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
  ],
  "Kanpur": [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
  ],
  "Varanasi": [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
  ],
  "Mumbai": [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
  ],
  "Lucknow": [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
  ],
  "Default": [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
  ]
};

// Dynamic Amenity Engine mapped by room cost
const getRoomAmenitiesByCost = (price) => {
  if (price >= 3000) {
    return [
      "📶 Ultra Fast 500Mbps Wi-Fi", "🏊 Temperature-Controlled Infinity Pool",
      "🍸 Rooftop Cocktail Lounge", "🍳 Complimentary Grand Buffet Breakfast",
      "🚘 24/7 Valet Parking", "🏋️ Modern Gym with Personal Trainers",
      "☕ In-Room Nespresso Coffee Maker", "❄️ Central Climate Control AC",
      "🛎️ 24-Hour Dedicated Butler Service", "🧺 Express Laundry & Dry Cleaning"
    ];
  } else if (price >= 2000) {
    return [
      "📶 High-Speed Fiber Wi-Fi", "🍳 Hot Cooked Breakfast Included",
      "❄️ Individual Split AC", "📺 50-inch Smart TV with OTT",
      "☕ Electric Tea & Coffee Kettle", "🚗 Free Reserved Parking",
      "🛎️ 24/7 Front Desk Assistance", "🧹 Daily Housekeeping & Linen Change"
    ];
  } else {
    return [
      "📶 Free High-Speed Wi-Fi", "❄️ Air Conditioning",
      "📺 Smart TV", "🧹 Daily Room Cleaning",
      "🚿 24/7 Hot & Cold Water Shower", "🔒 In-Room Locker"
    ];
  }
};

const ROOM_CATEGORIES = [
  {
    id: "std",
    name: "Classic Comfort Room",
    type: "StaySpot Express",
    maxGuests: 2,
    basePrice: 1200,
    totalRooms: 10,
    bookedRooms: 7,
    size: "180 sq.ft",
    bed: "1 Queen Bed",
  },
  {
    id: "dlx",
    name: "Deluxe Executive Suite",
    type: "StaySpot Select",
    maxGuests: 3,
    basePrice: 2200,
    totalRooms: 6,
    bookedRooms: 4,
    size: "260 sq.ft",
    bed: "1 King Bed + Sofa",
  },
  {
    id: "prm",
    name: "Luxury Presidential Suite",
    type: "StaySpot Signature",
    maxGuests: 4,
    basePrice: 3500,
    totalRooms: 4,
    bookedRooms: 2,
    size: "380 sq.ft",
    bed: "2 King Beds",
  }
];

const Hotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getCityFromId = (paramId) => {
    if (!paramId) return "Varanasi";
    if (ID_CITY_MAP[paramId]) return ID_CITY_MAP[paramId];
    if (paramId.includes("-")) {
      const slug = paramId.split("-")[0];
      return slug.charAt(0).toUpperCase() + slug.slice(1);
    }
    return "Varanasi";
  };

  const formattedCity = getCityFromId(id);
  const galleryPhotos = HOTEL_GALLERIES[formattedCity] || HOTEL_GALLERIES["Default"];

  const [selectedRoom, setSelectedRoom] = useState(ROOM_CATEGORIES[0]);
  const [activePhoto, setActivePhoto] = useState(0);
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(2);
  const [openBookModal, setOpenBookModal] = useState(false);
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userBookings")) || [];
    setMyBookings(saved);
  }, []);

  const totalPrice = selectedRoom.basePrice * nights;
  const activeAmenities = getRoomAmenitiesByCost(selectedRoom.basePrice);

  const handleConfirmBooking = () => {
    const newBooking = {
      bookingId: `STAY-${Math.floor(100000 + Math.random() * 900000)}`,
      hotelName: `${formattedCity} StaySpot Premium Hotel`,
      city: formattedCity,
      roomType: selectedRoom.name,
      guests: guests,
      nights: nights,
      amount: totalPrice,
      status: "Confirmed",
      date: new Date().toLocaleDateString(),
    };

    const updated = [newBooking, ...myBookings];
    setMyBookings(updated);
    localStorage.setItem("userBookings", JSON.stringify(updated));

    alert(`🎉 Booking Confirmed! Pass ID: ${newBooking.bookingId}`);
    setOpenBookModal(false);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking reservation?")) {
      const filtered = myBookings.filter((b) => b.bookingId !== bookingId);
      setMyBookings(filtered);
      localStorage.setItem("userBookings", JSON.stringify(filtered));
      alert("❌ Booking Reservation Cancelled Successfully.");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        
        <button
          onClick={() => navigate(-1)}
          className="text-xs font-bold text-blue-900 hover:underline mb-4 flex items-center gap-1"
        >
          ← Back to Stays List
        </button>

        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-900 text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                StaySpot Verified
              </span>
              <span className="text-xs text-slate-400 font-semibold">Property ID: #{id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {formattedCity} StaySpot Premium Hotel & Suites
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              📍 Central Station Road, {formattedCity} • <span className="text-blue-600 font-bold">Prime Location</span>
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 p-3 rounded-xl">
            <span className="bg-blue-900 text-white font-black text-base px-2.5 py-1 rounded-lg">
              ★ 4.8
            </span>
            <div>
              <p className="text-xs font-bold text-slate-900">Exceptional</p>
              <p className="text-[10px] text-slate-500 font-medium">320+ Guest Reviews</p>
            </div>
          </div>
        </div>

        {/* Dynamic Hotel Demo Pictures Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          <div className="md:col-span-3 h-[360px] rounded-2xl overflow-hidden shadow-sm relative border border-slate-200">
            <img
              src={galleryPhotos[activePhoto]}
              alt="Hotel Interior"
              className="w-full h-full object-cover transition-all duration-500"
            />
            <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg">
              {formattedCity} Demo Photo {activePhoto + 1} of {galleryPhotos.length}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 h-[360px]">
            {galleryPhotos.map((photo, i) => (
              <div
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                  activePhoto === i ? "border-blue-600 scale-[0.98]" : "border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                <img src={photo} alt="Thumbnail" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            
            {/* Room Selection */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 mb-1">1. Select Room Category</h2>
              <p className="text-xs text-slate-500 mb-4 font-medium">Choose from available stay types</p>

              <div className="space-y-3">
                {ROOM_CATEGORIES.map((room) => {
                  const isSelected = selectedRoom.id === room.id;
                  const roomLeft = room.totalRooms - room.bookedRooms;

                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex justify-between items-center ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/40 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-900">{room.name}</span>
                          <span className="text-[10px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded font-bold">
                            {room.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                          📐 {room.size} • 🛏️ {room.bed} • 👥 Max {room.maxGuests} Guests
                        </p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                            {roomLeft} Rooms Left
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            ({room.bookedRooms} Booked)
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xl font-black text-blue-950">₹{room.basePrice}</span>
                        <span className="text-[10px] text-slate-400 block font-medium">/night</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price-Based Included Amenities */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 mb-1">Included Room Amenities</h2>
              <p className="text-xs text-slate-500 mb-3 font-medium">Varies according to room tier & price</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeAmenities.map((item, i) => (
                  <div key={i} className="text-xs font-bold bg-slate-50 text-slate-800 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                    <span className="text-blue-600">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Bookings & Cancellation */}
            {myBookings.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-lg font-black text-slate-900 mb-3">Your Saved Bookings</h2>
                <div className="space-y-3">
                  {myBookings.map((b) => (
                    <div key={b.bookingId} className="p-3.5 bg-slate-50 border rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                      <div>
                        <p className="font-extrabold text-slate-900">{b.hotelName} ({b.roomType})</p>
                        <p className="text-slate-500 text-[11px] font-medium mt-0.5">
                          Pass ID: <span className="font-bold text-slate-800">{b.bookingId}</span> • Guests: {b.guests}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded text-[10px] border border-emerald-200">
                          ● {b.status}
                        </span>
                        <button
                          onClick={() => handleCancelBooking(b.bookingId)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold px-3 py-1 rounded-lg text-[11px] transition-colors"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl sticky top-24">
              <h3 className="text-base font-black text-slate-900 border-b pb-3 mb-4">
                Booking Details
              </h3>

              <div className="space-y-4 mb-6 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-semibold">Selected Room:</span>
                  <span className="font-extrabold text-slate-900">{selectedRoom.name}</span>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border">
                  <span className="text-slate-700 font-bold">Nights:</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setNights(Math.max(1, nights - 1))} className="w-6 font-bold bg-white border rounded">-</button>
                    <span className="font-black text-slate-900">{nights}</span>
                    <button onClick={() => setNights(nights + 1)} className="w-6 font-bold bg-white border rounded">+</button>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border">
                  <span className="text-slate-700 font-bold">Guests:</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-6 font-bold bg-white border rounded">-</button>
                    <span className="font-black text-slate-900">{guests}</span>
                    <button onClick={() => setGuests(Math.min(selectedRoom.maxGuests, guests + 1))} className="w-6 font-bold bg-white border rounded">+</button>
                  </div>
                </div>

                <div className="pt-3 border-t flex justify-between items-baseline">
                  <span className="font-extrabold text-slate-800 text-sm">Total Payable:</span>
                  <span className="text-2xl font-black text-blue-900">₹{totalPrice}</span>
                </div>
              </div>

              <button
                onClick={() => setOpenBookModal(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md"
              >
                Book Now (Pay at Hotel)
              </button>
            </div>
          </div>

        </div>
      </div>

      {openBookModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-base font-black text-slate-900">Confirm StaySpot Reservation</h3>
              <button onClick={() => setOpenBookModal(false)} className="font-bold text-slate-400">✕</button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border text-xs space-y-2 mb-5 font-medium">
              <p>🏨 <strong>Hotel:</strong> {formattedCity} StaySpot Premium</p>
              <p>🛏️ <strong>Room:</strong> {selectedRoom.name}</p>
              <p>👥 <strong>Guests:</strong> {guests} Person(s)</p>
              <p>📅 <strong>Duration:</strong> {nights} Night(s)</p>
              <p>💳 <strong>Total:</strong> <span className="text-blue-900 font-black text-sm">₹{totalPrice}</span></p>
            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm shadow-md"
            >
              Confirm & Save Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotel;
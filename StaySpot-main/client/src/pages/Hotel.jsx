import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Demo fallback catalog with realistic data
const FALLBACK_HOTELS = {
  "delhi-1": { name: "Grand Taj Palace", city: "Delhi", state: "Delhi NCR", basePrice: 1500, rating: 4.8, reviewsCount: 342, address: "Connaught Place, Central Delhi", description: "Experience luxury living in the heart of Delhi with modern amenities, fine dining, and serene architecture." },
  "kanpur-1": { name: "Kanpur Residency Stay", city: "Kanpur", state: "Uttar Pradesh", basePrice: 1100, rating: 4.5, reviewsCount: 189, address: "Mall Road, Civil Lines, Kanpur", description: "A tranquil urban retreat providing premier hospitality, business lounge facilities, and quick access to major transit hubs." },
  "varanasi-1": { name: "Ganges View Resort", city: "Varanasi", state: "Uttar Pradesh", basePrice: 1800, rating: 4.9, reviewsCount: 512, address: "Assi Ghat Road, Shivala, Varanasi", description: "Overlooking the sacred ghats, offering sunrise views, heritage rooms, traditional dining, and spiritual calm." },
  "mumbai-1": { name: "Marine Drive View Suites", city: "Mumbai", state: "Maharashtra", basePrice: 2500, rating: 4.7, reviewsCount: 620, address: "Marine Drive, South Mumbai", description: "Sweeping Arabian Sea panoramas with luxury suites, infinity pool access, and seaside dining." },
};

const HOTEL_IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
];

const Hotel = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const hotelId = pathname.split("/")[2] || "kanpur-1";

  // Hotel Info
  const hotel = FALLBACK_HOTELS[hotelId] || {
    name: `${hotelId.charAt(0).toUpperCase() + hotelId.slice(1)} Premier Stay`,
    city: "Featured City",
    state: "India",
    basePrice: 1600,
    rating: 4.7,
    reviewsCount: 230,
    address: "Prime Location City Center",
    description: "Modern stay offering cozy rooms, free Wi-Fi, air conditioning, and top-tier hospitality."
  };

  // Booking & Calculator State
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState("deluxe");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState("");

  // Lightbox Modal State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Booking Pass Modal State
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);

  // Live Simulated Urgency Counter
  const [liveViewers] = useState(Math.floor(Math.random() * 4) + 3);

  // Room Tiers Setup
  const ROOM_TIERS = {
    standard: { title: "Standard Cozy Room", multiplier: 1.0, maxGuests: 2, perks: ["Free Wi-Fi", "Queen Bed", "AC"] },
    deluxe: { title: "Deluxe City View Room", multiplier: 1.35, maxGuests: 3, perks: ["Free Wi-Fi", "King Bed", "Balcony", "Breakfast Included"] },
    suite: { title: "Executive Luxury Suite", multiplier: 1.9, maxGuests: 4, perks: ["Panoramic Views", "Living Area", "Bathtub", "All Meals Included", "Free Airport Transfer"] },
  };

  // Dynamic Price Calculations
  const roomPricePerNight = Math.round(hotel.basePrice * ROOM_TIERS[selectedRoom].multiplier);
  const subtotal = roomPricePerNight * nights;
  const gstTax = Math.round(subtotal * 0.12); // 12% GST
  const serviceFee = 150;
  const grandTotal = Math.max(0, subtotal + gstTax + serviceFee - discount);

  // Coupon Engine
  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === "FIRST500") {
      setDiscount(500);
      setCouponStatus("✅ ₹500 discount applied successfully!");
    } else if (code === "STAY20") {
      const discountVal = Math.round(subtotal * 0.2);
      setDiscount(discountVal);
      setCouponStatus(`✅ 20% discount (₹${discountVal}) applied!`);
    } else {
      setDiscount(0);
      setCouponStatus("❌ Invalid coupon code. Try FIRST500 or STAY20");
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") setCurrentImgIndex((prev) => (prev + 1) % HOTEL_IMAGES.length);
      if (e.key === "ArrowLeft") setCurrentImgIndex((prev) => (prev - 1 + HOTEL_IMAGES.length) % HOTEL_IMAGES.length);
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  // Handle Booking Pass Trigger
  const handleReserve = () => {
    const bookingDetails = {
      bookingId: `STAY-${Math.floor(100000 + Math.random() * 900000)}`,
      hotelName: hotel.name,
      city: hotel.city,
      roomType: ROOM_TIERS[selectedRoom].title,
      nights,
      guests,
      totalPaid: grandTotal,
      bookingDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    };

    // Save to LocalStorage
    const existing = JSON.parse(localStorage.getItem("stayspot_bookings") || "[]");
    localStorage.setItem("stayspot_bookings", JSON.stringify([bookingDetails, ...existing]));

    setConfirmedBookingData(bookingDetails);
    setBookingConfirmed(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pb-20 font-sans">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 mt-6">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-900 font-extrabold text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Verified Stay
              </span>
              <span className="text-amber-500 font-black text-sm">★ {hotel.rating}</span>
              <span className="text-slate-400 text-xs font-semibold">({hotel.reviewsCount} reviews)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{hotel.name}</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">📍 {hotel.address}</p>
          </div>

          {/* Social Proof Indicator */}
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 self-start md:self-auto">
            <span>🔥</span>
            <span>{liveViewers} people are viewing this property right now</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-6 rounded-2xl overflow-hidden shadow-sm">
          <div
            onClick={() => { setCurrentImgIndex(0); setLightboxOpen(true); }}
            className="md:col-span-2 md:row-span-2 h-72 md:h-96 relative group cursor-pointer overflow-hidden"
          >
            <img src={HOTEL_IMAGES[0]} alt="Main Room" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-300" />
            <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-xs font-bold px-3 py-1 rounded-lg backdrop-blur-sm">
              🔍 Click to view full gallery
            </span>
          </div>
          {HOTEL_IMAGES.slice(1, 5).map((img, i) => (
            <div
              key={i}
              onClick={() => { setCurrentImgIndex(i + 1); setLightboxOpen(true); }}
              className="h-36 md:h-46 relative group cursor-pointer overflow-hidden"
            >
              <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            </div>
          ))}
        </div>

        {/* Main Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* Left Column: Details & Policies */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 mb-2">About the Property</h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">{hotel.description}</p>
            </div>

            {/* Room Category Selector */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 mb-4">Select Room Category</h2>
              <div className="space-y-3">
                {Object.entries(ROOM_TIERS).map(([key, room]) => (
                  <label
                    key={key}
                    onClick={() => setSelectedRoom(key)}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedRoom === key ? "border-blue-600 bg-blue-50/50 shadow-sm" : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <input type="radio" checked={selectedRoom === key} onChange={() => setSelectedRoom(key)} className="accent-blue-600" />
                        <span className="font-extrabold text-sm text-slate-900">{room.title}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2 pl-6">
                        {room.perks.map((perk, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                            ✓ {perk}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right mt-3 sm:mt-0 pl-6 sm:pl-0">
                      <span className="text-xs text-slate-400 block font-semibold">Per night</span>
                      <span className="text-base font-black text-blue-900">₹{Math.round(hotel.basePrice * room.multiplier)}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* House Rules & Policies Accordion */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 mb-3">House Rules & Cancellation</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span>🕒</span> <span>Check-in: <strong>12:00 PM</strong></span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span>🕚</span> <span>Check-out: <strong>11:00 AM</strong></span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 col-span-1 sm:col-span-2">
                  <span>🛡️</span> <span><strong>Free Cancellation:</strong> 100% refund up to 24 hours before check-in.</span>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 mb-4">Guest Ratings & Reviews</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-6">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-400 font-bold uppercase">Cleanliness</p>
                  <p className="text-base font-black text-slate-800">4.9 / 5.0</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-400 font-bold uppercase">Location</p>
                  <p className="text-base font-black text-slate-800">4.8 / 5.0</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-400 font-bold uppercase">Service</p>
                  <p className="text-base font-black text-slate-800">4.7 / 5.0</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-400 font-bold uppercase">Value</p>
                  <p className="text-base font-black text-slate-800">4.9 / 5.0</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Price Breakdown Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xl space-y-5">
              
              <div className="flex justify-between items-baseline border-b border-slate-100 pb-4">
                <div>
                  <span className="text-2xl font-black text-slate-900">₹{roomPricePerNight}</span>
                  <span className="text-xs text-slate-400 font-bold"> / night</span>
                </div>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded text-xs font-black">
                  ⚡ Best Price Guaranteed
                </span>
              </div>

              {/* Nights & Guest Controls */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Nights</label>
                  <div className="flex items-center justify-between">
                    <button onClick={() => setNights(Math.max(1, nights - 1))} className="font-black text-slate-600 px-2 hover:text-blue-600">-</button>
                    <span className="font-extrabold text-sm">{nights}</span>
                    <button onClick={() => setNights(nights + 1)} className="font-black text-slate-600 px-2 hover:text-blue-600">+</button>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Guests</label>
                  <div className="flex items-center justify-between">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="font-black text-slate-600 px-2 hover:text-blue-600">-</button>
                    <span className="font-extrabold text-sm">{guests}</span>
                    <button onClick={() => setGuests(Math.min(ROOM_TIERS[selectedRoom].maxGuests, guests + 1))} className="font-black text-slate-600 px-2 hover:text-blue-600">+</button>
                  </div>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 block">Apply Promo Coupon</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    placeholder="e.g. FIRST500 or STAY20"
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 uppercase font-bold text-xs bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl outline-none focus:border-blue-600"
                  />
                  <button onClick={applyCoupon} className="bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-black transition">
                    Apply
                  </button>
                </div>
                {couponStatus && <p className="text-[11px] font-bold mt-1 text-slate-600">{couponStatus}</p>}
              </div>

              {/* Itemized Price Breakdown */}
              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs font-medium text-slate-600">
                <div className="flex justify-between">
                  <span>₹{roomPricePerNight} × {nights} nights</span>
                  <span className="font-bold text-slate-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Goods & Services Tax (12% GST)</span>
                  <span className="font-bold text-slate-900">₹{gstTax}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform & Cleaning Fee</span>
                  <span className="font-bold text-slate-900">₹{serviceFee}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-3 border-t border-slate-200 text-sm">
                  <span className="font-black text-slate-900">Total Payable</span>
                  <span className="text-xl font-black text-blue-900">₹{grandTotal}</span>
                </div>
              </div>

              {/* Reserve Button */}
              <button
                onClick={handleReserve}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider"
              >
                Instant Reserve
              </button>

              <p className="text-center text-[10px] text-slate-400 font-bold">
                🔒 Safe & Secure 256-bit Encrypted Reservation
              </p>

            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-slate-300">
            ✕
          </button>
          <button onClick={() => setCurrentImgIndex((prev) => (prev - 1 + HOTEL_IMAGES.length) % HOTEL_IMAGES.length)} className="absolute left-4 text-white text-4xl p-2 font-bold hover:text-slate-300">
            ◀
          </button>
          <img src={HOTEL_IMAGES[currentImgIndex]} alt="Enlarged" className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl" />
          <button onClick={() => setCurrentImgIndex((prev) => (prev + 1) % HOTEL_IMAGES.length)} className="absolute right-4 text-white text-4xl p-2 font-bold hover:text-slate-300">
            ▶
          </button>
        </div>
      )}

      {/* Booking Pass Modal */}
      {bookingConfirmed && confirmedBookingData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl mb-3">
                ✓
              </div>
              <h3 className="text-xl font-black text-slate-900">Booking Confirmed!</h3>
              <p className="text-xs text-slate-400 font-bold mt-1">Pass ID: {confirmedBookingData.bookingId}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 my-5 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between font-bold text-slate-900 border-b pb-2">
                <span>{confirmedBookingData.hotelName}</span>
                <span className="text-blue-600">{confirmedBookingData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Room Tier:</span>
                <span className="font-bold">{confirmedBookingData.roomType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Duration & Guests:</span>
                <span className="font-bold">{confirmedBookingData.nights} Night(s) • {confirmedBookingData.guests} Guest(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Date of Booking:</span>
                <span className="font-bold">{confirmedBookingData.bookingDate}</span>
              </div>
              <div className="flex justify-between pt-2 border-t text-sm font-black text-slate-900">
                <span>Total Amount Paid:</span>
                <span className="text-emerald-600">₹{confirmedBookingData.totalPaid}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-slate-900 hover:bg-black text-white text-xs font-bold py-3 rounded-xl transition"
              >
                🖨️ Print / Save Pass
              </button>
              <button
                onClick={() => setBookingConfirmed(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-3 rounded-xl transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Hotel;
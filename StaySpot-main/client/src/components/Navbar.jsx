import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'contact' | 'about' | null

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-black tracking-tight text-blue-900 flex items-center gap-2">
            <span>🏨</span> StaySpot
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/search" className="hover:text-blue-600 transition-colors">Rooms</Link>
            <button onClick={() => setActiveModal("contact")} className="hover:text-blue-600 transition-colors">Contact</button>
            <button onClick={() => setActiveModal("about")} className="hover:text-blue-600 transition-colors">About</button>
          </div>

          {/* Right User Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-full border">
                <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-xs uppercase">
                  {user.username ? user.username.charAt(0) : "U"}
                </div>
                <span className="text-xs font-bold text-slate-800">{user.username || "Customer"}</span>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-red-600 hover:text-red-700 ml-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-xs font-bold text-slate-700 hover:text-blue-600 px-3 py-2">
                  Sign In
                </Link>
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-slate-700 font-bold p-1"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-3 text-sm font-semibold text-slate-700 flex flex-col">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/search" onClick={() => setMenuOpen(false)}>Rooms & Stays</Link>
            <button onClick={() => { setActiveModal("contact"); setMenuOpen(false); }} className="text-left">Contact Us</button>
            <button onClick={() => { setActiveModal("about"); setMenuOpen(false); }} className="text-left">About StaySpot</button>
            
            <div className="pt-3 border-t">
              {user ? (
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">👤 {user.username}</span>
                  <button onClick={handleLogout} className="text-xs font-bold text-red-600">Logout</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center border py-2 rounded-lg text-xs font-bold">Sign In</Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)} className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg text-xs font-bold">Register</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Contact Modal */}
      {activeModal === "contact" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-lg font-black text-slate-900">Contact Support</h3>
              <button onClick={() => setActiveModal(null)} className="font-bold text-slate-400">✕</button>
            </div>
            <div className="space-y-3 text-xs font-medium text-slate-600">
              <p>📍 <strong>Headquarters:</strong> Civil Lines, Kanpur, UP, India</p>
              <p>📞 <strong>Helpline:</strong> +91 98765 43210</p>
              <p>✉️ <strong>Email:</strong> support@stayspot.com</p>
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {activeModal === "about" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-lg font-black text-slate-900">About StaySpot</h3>
              <button onClick={() => setActiveModal(null)} className="font-bold text-slate-400">✕</button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              StaySpot is India's modern hotel discovery & reservation platform providing seamless stays across Kanpur, Delhi, Mumbai, Lucknow, and Varanasi.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
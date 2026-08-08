import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("Please fill all details!");
      return;
    }

    const newUser = { username, email };
    dispatch({ type: "LOGIN_SUCCESS", payload: newUser });
    localStorage.setItem("user", JSON.stringify(newUser));
    alert("🎉 Registration Successful!");
    navigate("/");
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center pt-16 px-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-black text-slate-900 text-center mb-2">
            Create Your Account
          </h2>
          <p className="text-xs text-slate-500 text-center mb-6">
            Register to permanently save your booking details & preferences.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Username</label>
              <input
                type="text"
                placeholder="Devansh Singh"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-xl border text-sm font-medium mt-1 bg-slate-50"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Email Address</label>
              <input
                type="email"
                placeholder="devansh@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border text-sm font-medium mt-1 bg-slate-50"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border text-sm font-medium mt-1 bg-slate-50"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md mt-2"
            >
              Register & Save Details
            </button>
          </form>

          <p className="text-xs text-center text-slate-500 mt-5 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
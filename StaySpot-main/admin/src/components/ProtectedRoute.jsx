import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, error } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // Redirect to login while saving the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Add additional admin check if needed
  if (!user.isAdmin) {
    // Redirect non-admin users to a different page
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
export default ProtectedRoute
//ProtectedRoute.jsx
//used to prevent users without an account from accessing protected routes
//redirects to login if not a user

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../Common/services/authService";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login"); //redirect if not logged in
    }
  }, [navigate]);

  //if not authenticated, don't render anything
  if (!isAuthenticated()) return null;

  return children;
};

export default ProtectedRoute;
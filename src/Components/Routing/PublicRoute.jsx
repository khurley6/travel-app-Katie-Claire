//PublicRoute.jsx
//prevents authenticated users from visiting login/signup pages
//redirects logged-in users to the main app

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../Common/services/authService";

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/"); //redirect if already logged in
    }
  }, [navigate]);

  if (isAuthenticated()) return null;

  return children;
};

export default PublicRoute;
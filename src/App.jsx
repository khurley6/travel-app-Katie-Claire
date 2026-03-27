//App.jsx
//root application component
//App.jsx
//root application component
//initializes Parse and configures client-side routing
//Route / renders TripsListPage, Route /trip/:id renders TripPlannerPage
//Protected routes require authentication, public routes redirect if already logged in

import Parse from "parse";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Env from "./environments";
import TripsListPage from "./Components/TravelPlanner/TripsListPage";
import TripPlannerPage from "./Components/TravelPlanner/TripPlannerPage";
import LoginPage from "./Components/Auth/LoginPage";
import RegisterPage from "./Components/Auth/RegisterPage";
import ProtectedRoute from "./Components/Routing/ProtectedRoute";
import PublicRoute from "./Components/Routing/PublicRoute";

//initialize Parse once for the whole app using keys from environments.js
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
    //BrowserRouter enables client-side routing via the History API
    <BrowserRouter>
      <Routes>
        {/* Public routes - redirect to home if already logged in */}
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

        {/* Protected routes - redirect to login if not authenticated */}
        <Route path="/" element={<ProtectedRoute><TripsListPage /></ProtectedRoute>} />
        <Route path="/trip/:id" element={<ProtectedRoute><TripPlannerPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
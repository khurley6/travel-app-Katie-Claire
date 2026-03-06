//App.jsx
//root application component
//initializes Parse and configures client-side routing
//Route / renders TripsListPage, Route /trip/:id renders TripPlannerPage

import Parse from "parse";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Env from "./environments";
import TripsListPage from "./Components/TravelPlanner/TripsListPage";
import TripPlannerPage from "./Components/TravelPlanner/TripPlannerPage";

//initialize Parse once for the whole app using keys from environments.js
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
    //BrowserRouter enables client-side routing via the History API
    <BrowserRouter>
      <Routes>
        {/* Home route - lists all trips */}
        <Route path="/" element={<TripsListPage />} />

        {/* Detail route - opens a specific trip by its Parse object ID */}
        <Route path="/trip/:id" element={<TripPlannerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
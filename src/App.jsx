//App.jsx
//root application component
//initialize Parse and renders the main travel planner page

import Parse from "parse";
import Env from "./environments";
import TripPlannerPage from "./Components/TravelPlanner/TripPlannerPage";

//initialize parse once for the whole app
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return <TripPlannerPage />;
}

export default App;
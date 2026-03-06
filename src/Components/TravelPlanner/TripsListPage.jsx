// TripsListPage.jsx
// Route: /
// Landing page - loads all trips from Parse and displays them as a list
// User can click a trip to navigate to its detail page, or create a new one

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrips, createTrip } from "../../Common/Parse/TripModel";

function TripsListPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load all trips from Parse on mount (async data requirement)
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const results = await getTrips();
        // Map Parse objects to plain JS for display
        setTrips(
          results.map((t) => ({
            id: t.id,
            name: t.get("name"),
            destination: t.get("destination"),
            startDate: t.get("startDate"),
            days: t.get("days"),
            style: t.get("style"),
          }))
        );
      } catch {
        setError("Could not load trips.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Create a blank trip in Parse and navigate to its planner page
  async function handleNewTrip() {
    setLoading(true);
    setError("");
    try {
      const saved = await createTrip({
        name: "New Trip",
        destination: "",
        startDate: "",
        days: 1,
        style: "relax",
      });
      // Route to the new trip's detail page
      navigate(`/trip/${saved.id}`);
    } catch {
      setError("Could not create trip.");
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h1>My Trips</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleNewTrip} disabled={loading}>
        + New Trip
      </button>

      {trips.length === 0 && !loading && (
        <p style={{ marginTop: 16, color: "#888" }}>
          No trips yet. Create one to get started!
        </p>
      )}

      {/* Trip list - each item routes to /trip/:id */}
      <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
        {trips.map((trip) => (
          <li
            key={trip.id}
            onClick={() => navigate(`/trip/${trip.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: 6,
              padding: 12,
              marginBottom: 10,
              cursor: "pointer",
            }}
          >
            <strong>{trip.name || "Untitled Trip"}</strong>
            {trip.destination && (
              <span style={{ marginLeft: 8, color: "#555" }}>
                → {trip.destination}
              </span>
            )}
            {trip.startDate && (
              <span style={{ marginLeft: 8, color: "#999", fontSize: 13 }}>
                {trip.startDate}
              </span>
            )}
            {trip.days && (
              <span style={{ marginLeft: 8, color: "#999", fontSize: 13 }}>
                ({trip.days} day{trip.days !== 1 ? "s" : ""})
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TripsListPage;

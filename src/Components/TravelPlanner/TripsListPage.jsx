// TripsListPage.jsx
// Route: /
// Landing page - loads all trips from Parse and displays them as a list
// Also displays a map showing all trip destinations using TripsMap component
// User can click a trip to navigate to its detail page, or create a new one

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrips, createTrip } from "../../Common/Parse/TripModel";
import { logout } from "../../Common/services/authService";
import TripsMap from "../Map/TripsMap";

function TripsListPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load all trips from Parse on mount
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const results = await getTrips();
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

  // Create a blank trip and navigate to its planner page
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
      navigate(`/trip/${saved.id}`);
    } catch {
      setError("Could not create trip.");
      setLoading(false);
    }
  }

  // Log out the current user and redirect to login
  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Trips</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-primary" onClick={handleNewTrip} disabled={loading}>
            + New Trip
          </button>
          <button className="btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {loading && <p className="trip-meta">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Map showing all trip destinations */}
      <TripsMap trips={trips} />

      {trips.length === 0 && !loading && (
        <p className="trip-meta" style={{ marginTop: 16 }}>
          No trips yet. Create one to get started!
        </p>
      )}

      {/* Trip list */}
      <div style={{ marginTop: 16 }}>
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="card"
            onClick={() => navigate(`/trip/${trip.id}`)}
          >
            <p className="trip-name">{trip.name || "Untitled Trip"}</p>
            <p className="trip-meta">
              {trip.destination && `${trip.destination}`}
              {trip.startDate && ` · ${trip.startDate}`}
              {trip.days && ` · ${trip.days} day${trip.days !== 1 ? "s" : ""}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripsListPage;
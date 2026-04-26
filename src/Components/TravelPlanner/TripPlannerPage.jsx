//TripPlannerPage.jsx
//Route: /trip/:id
//Parent component - owns all state and passes down to children via props
//Loads a specific trip by ID from the URL param, fetches its itinerary items from Parse

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TripForm from "./TripForm";
import ItineraryList from "./ItineraryList";
import {
  getTripById,
  createTrip,
  updateTrip,
} from "../../Common/Parse/TripModel";
import {
  getItemsByTrip,
  createItem,
  deleteItem,
} from "../../Common/Parse/ItineraryItemModel";
import TripMap from "../Map/TripMap";

function TripPlannerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    id: "",
    name: "",
    destination: "",
    startDate: "",
    style: "relax",
    days: 1,
    items: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Load the specific trip by route param ID and its items from Parse
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const firstTrip = await getTripById(id);

        const loadedTrip = {
          id: firstTrip.id,
          name: firstTrip.get("name") || "",
          destination: firstTrip.get("destination") || "",
          startDate: firstTrip.get("startDate") || "",
          style: firstTrip.get("style") || "relax",
          days: firstTrip.get("days") || 1,
          items: [],
        };

        const items = await getItemsByTrip(firstTrip.id);
        loadedTrip.items = items.map((item) => ({
          id: item.id,
          title: item.get("title"),
          day: item.get("day"),
          time: item.get("time"),
          category: item.get("category"),
        }));

        setTrip(loadedTrip);
      } catch {
        setError("Could not load trip.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  function handleTripChange(field, value) {
    setTrip((prev) => ({ ...prev, [field]: value }));
  }

  async function handleAddItem(title) {
    if (!trip.id) {
      setError("Save the trip before adding itinerary items.");
      return;
    }
    try {
      const savedItem = await createItem({
        tripId: trip.id,
        title,
        day: 1,
        time: "",
        category: "activity",
      });
      setTrip((prev) => ({
        ...prev,
        items: [...prev.items, {
          id: savedItem.id,
          title: savedItem.get("title"),
          day: savedItem.get("day"),
          time: savedItem.get("time"),
          category: savedItem.get("category"),
        }],
      }));
    } catch {
      setError("Could not save item.");
    }
  }

  async function handleDeleteItem(itemId) {
    try {
      await deleteItem(itemId);
      setTrip((prev) => ({
        ...prev,
        items: prev.items.filter((i) => i.id !== itemId),
      }));
    } catch {
      setError("Could not delete item.");
    }
  }

  async function handleSave() {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const savedTrip = trip.id
        ? await updateTrip(trip.id, trip)
        : await createTrip(trip);
      setTrip((prev) => ({ ...prev, id: savedTrip.id }));
      setSuccess(true);
    } catch {
      setError("Could not save trip.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <button className="back-link" onClick={() => navigate("/")}>
        ← Back to Trips
      </button>

      <h1>{trip.name || "Trip Planner"}</h1>

      {loading && <p className="trip-meta">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Trip saved successfully!</p>}

      <div style={{
        background: "#fff8f0",
        border: "0.5px solid #e8ddd0",
        borderRadius: 12,
        padding: 20,
        marginTop: 16,
        marginBottom: 20
      }}>
        <TripForm
          trip={trip}
          onTripChange={handleTripChange}
          onAddItem={handleAddItem}
          onSave={handleSave}
          disabled={loading}
        />
      </div>

      {/* Map showing the trip destination */}
      <TripMap trip={trip} />

      <div style={{ marginTop: 20 }}>
        <ItineraryList items={trip.items} onDeleteItem={handleDeleteItem} />
      </div>
    </div>
  );
}

export default TripPlannerPage;
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

function TripPlannerPage() {
  // Read trip ID from the URL (e.g. /trip/abc123)
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
  const [success, setSuccess] = useState(false); // tracks save success

  // Load the specific trip (by route param ID) and its items from Parse on mount
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

        // Load itinerary items for this trip from Parse
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
  }, [id]); // re-runs if the route ID changes

  // Update a field on the trip object (called by TripForm via props)
  function handleTripChange(field, value) {
    setTrip((prev) => ({ ...prev, [field]: value }));
  }

  // Add an itinerary item to Parse and update local state
  async function handleAddItem(title) {
    if (!trip.id) {
      setError("Save the trip before adding itinerary items.");
      return;
    }

    const newItemData = {
      tripId: trip.id,
      title,
      day: 1,
      time: "",
      category: "activity",
    };

    try {
      const savedItem = await createItem(newItemData);

      const newItem = {
        id: savedItem.id,
        title: savedItem.get("title"),
        day: savedItem.get("day"),
        time: savedItem.get("time"),
        category: savedItem.get("category"),
      };

      setTrip((prev) => ({
        ...prev,
        items: [...prev.items, newItem],
      }));
    } catch {
      setError("Could not save item.");
    }
  }

  // Delete an itinerary item from Parse by ID, then update local state
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

  // Save (create or update) the trip in Parse
  async function handleSave() {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      let savedTrip;

      if (trip.id) {
        savedTrip = await updateTrip(trip.id, trip);
      } else {
        savedTrip = await createTrip(trip);
      }

      setTrip((prev) => ({
        ...prev,
        id: savedTrip.id,
      }));

      setSuccess(true);
    } catch {
      setError("Could not save trip.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      {/* Back button routes user to the trips list page */}
      <button onClick={() => navigate("/")} style={{ marginBottom: 12 }}>
        ← Back to Trips
      </button>

      <h1>Trip Planner</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Trip saved successfully!</p>}

      <TripForm
        trip={trip}
        onTripChange={handleTripChange}
        onAddItem={handleAddItem}
        onSave={handleSave}
        disabled={loading}
      />

      <ItineraryList items={trip.items} onDeleteItem={handleDeleteItem} />
    </div>
  );
}

export default TripPlannerPage;
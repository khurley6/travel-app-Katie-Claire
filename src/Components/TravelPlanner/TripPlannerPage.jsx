//TripPlannerPage.jsx
//parent component- owns all state and passes down to children via props

import { useEffect, useState } from "react";
import TripForm from "./TripForm";
import ItineraryList from "./ItineraryList";
import {
  getTrips,
  createTrip,
  updateTrip,
} from "../../Common/Parse/TripModel";
import {
  getItemsByTrip,
  createItem,
  deleteItem,
} from "../../Common/Parse/ItineraryItemModel";

function TripPlannerPage() {
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

  //load trips from parse on mount
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");

      try {
        const trips = await getTrips();

        if (trips && trips.length > 0) {
          const firstTrip = trips[0];

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
        }
      } catch {
        setError("Could not load trips.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  //update a field on the trip object
  function handleTripChange(field, value) {
    setTrip((prev) => ({ ...prev, [field]: value }));
  }

  //add an itinerary item
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

  //delete an itinerary item by ID
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

  //save the trip to Parse
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
      <h1>Travel Planner</h1>

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
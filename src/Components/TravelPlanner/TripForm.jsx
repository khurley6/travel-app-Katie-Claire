//TripForm.jsx
//child component- form controls for trip details
//receives trip data via props, emits changes back up to parent

import { useState } from "react";

function TripForm({ trip, onTripChange, onAddItem, onSave, disabled }) {
  const [newItemTitle, setNewItemTitle] = useState("");

  //handle add item form submission
  function submitItem(e) {
    e.preventDefault();
    if (!newItemTitle.trim()) return; //don't allow empty submissions
    onAddItem(newItemTitle.trim()); //emit event up to parent
    setNewItemTitle(""); //clear input
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 16 }}>
      <h2>Trip Details</h2>

      <label>
        Name:{" "}
        <input
          value={trip.name}
          onChange={(e) => onTripChange("name", e.target.value)}
          disabled={disabled}
        />
      </label>

      <br />

      <label>
        Destination:{" "}
        <select
          value={trip.destination}
          onChange={(e) => onTripChange("destination", e.target.value)}
          disabled={disabled}
        >
          <option value="">Select</option>
          <option value="Napa">Napa</option>
          <option value="Paso Robles">Paso Robles</option>
          <option value="San Diego">San Diego</option>
          <option value="Tokyo">Tokyo</option>
        </select>
      </label>

      <br />

      <label>
        Start Date:{" "}
        <input
          type="date"
          value={trip.startDate}
          onChange={(e) => onTripChange("startDate", e.target.value)}
          disabled={disabled}
        />
      </label>

      <br />

      <label>
        Days:{" "}
        <input
          type="number"
          value={trip.days}
          onChange={(e) => onTripChange("days", e.target.value)}
          disabled={disabled}
        />
      </label>

      <br />

      <label>
        Style:{" "}
        <select
          value={trip.style}
          onChange={(e) => onTripChange("style", e.target.value)}
          disabled={disabled}
        >
          <option value="relax">Relax</option>
          <option value="adventure">Adventure</option>
          <option value="food">Food</option>
        </select>
      </label>

      <hr />

      <h3>Add Itinerary Item</h3>

      <form onSubmit={submitItem}>
        <input
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          placeholder="e.g., brunch"
          disabled={disabled}
        />
        <button type="submit" disabled={disabled}>
          Add
        </button>
      </form>

      <button onClick={onSave} disabled={disabled} style={{ marginTop: 10 }}>
        Save Trip
      </button>
    </div>
  );
}

export default TripForm;
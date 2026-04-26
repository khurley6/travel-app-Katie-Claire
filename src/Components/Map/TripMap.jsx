// TripMap.jsx
// Displays an interactive map with a marker at the trip destination
// Uses geocodingService to convert destination name to coordinates
// Replaces hardcoded coordinate lookup with dynamic geocoding

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { geocodeDestination } from "../../Common/services/geocodingService";
import Env from "../../environments";

// Fix default marker icon issue with Leaflet + Vite
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function TripMap({ trip }) {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);

  // Geocode the destination whenever it changes
  useEffect(() => {
    async function fetchCoords() {
      if (!trip.destination) return;
      setLoading(true);
      const result = await geocodeDestination(trip.destination);
      setCoords(result);
      setLoading(false);
    }
    fetchCoords();
  }, [trip.destination]);

  if (!trip.destination) return null;
  if (loading) return <p>Loading map...</p>;
  if (!coords) return <p>No map available for this destination.</p>;

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Map</h2>

      {/* MapContainer renders the interactive Leaflet map */}
      <MapContainer
        key={coords.toString()}
        center={coords}
        zoom={10}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer url={Env.MAP_TILE_URL} />

        {/* Marker placed at geocoded coordinates with trip info popup */}
        <Marker position={coords}>
          <Popup>
            <strong>{trip.destination}</strong>
            <br />
            Start Date: {trip.startDate}
            <br />
            Days: {trip.days}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default TripMap;
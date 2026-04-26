// TripsMap.jsx
// Displays all of the user's trips as markers on a single map
// Uses geocodingService to convert each trip's destination to coordinates
// Gives users a visual overview of all their planned destinations at once

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
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

function TripsMap({ trips }) {
  const [tripCoords, setTripCoords] = useState([]);
  const navigate = useNavigate();

  // Geocode all trip destinations when the trips list changes
  useEffect(() => {
    async function fetchAllCoords() {
      if (!trips || trips.length === 0) return;

      // Geocode each trip's destination in parallel
      const results = await Promise.all(
        trips.map(async (trip) => {
          const coords = await geocodeDestination(trip.destination);
          return { ...trip, coords };
        })
      );

      // Only keep trips that have valid coordinates
      setTripCoords(results.filter((t) => t.coords !== null));
    }

    fetchAllCoords();
  }, [trips]);

  if (!trips || trips.length === 0) return null;

  return (
    <div style={{ marginTop: 24, marginBottom: 24 }}>
      <h2>All Destinations</h2>

      {/* Map showing markers for all geocoded trip destinations */}
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer url={Env.MAP_TILE_URL} />

        {/* Render a marker for each trip with valid coordinates */}
        {tripCoords.map((trip) => (
          <Marker key={trip.id} position={trip.coords}>
            <Popup>
              <strong>{trip.name || "Untitled Trip"}</strong>
              <br />
              {trip.destination}
              <br />
              {/* Clicking the link routes to that trip's detail page */}
              <span
                onClick={() => navigate(`/trip/${trip.id}`)}
                style={{ color: "#2563eb", cursor: "pointer" }}
              >
                Open Trip →
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default TripsMap;
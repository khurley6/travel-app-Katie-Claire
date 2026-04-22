// TripMap.jsx
// Displays a map with a marker at the trip destination

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

//fix default marker icon issue
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Env from "../../environments";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

//mapping destinations → coordinates
const destinationCoords = {
  Napa: [38.2975, -122.2869],
  Tokyo: [35.6762, 139.6503],
  "San Diego": [32.7157, -117.1611],
  "Paso Robles": [35.6266, -120.691],
};

function TripMap({ trip }) {
  const coords = destinationCoords[trip.destination];

  if (!coords) {
    return <p>No map available for this destination.</p>;
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Map</h2>

      <MapContainer
        center={coords}
        zoom={10}
        style={{ height: "300px", width: "100%" }}
        >
        <TileLayer url={Env.MAP_TILE_URL} />

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
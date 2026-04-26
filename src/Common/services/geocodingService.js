// geocodingService.js
// Handles geocoding of destination names into lat/lng coordinates
// Uses the free Nominatim API from OpenStreetMap - no API key required
// Keeps all geocoding logic outside of components

// Cache results to avoid repeated API calls for the same destination
const geocodeCache = {};

// Convert a destination name (e.g. "Paris") into [lat, lng] coordinates
// Returns null if the destination cannot be found
export async function geocodeDestination(destination) {
  if (!destination) return null;

  // Return cached result if available
  if (geocodeCache[destination]) {
    return geocodeCache[destination];
  }

  try {
    const encoded = encodeURIComponent(destination);
    const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`;

    const response = await fetch(url, {
      headers: {
        // Nominatim requires a user agent header
        "Accept-Language": "en",
      },
    });

    const data = await response.json();

    if (data && data.length > 0) {
      const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      // Cache the result for this destination
      geocodeCache[destination] = coords;
      return coords;
    }

    return null;
  } catch {
    console.error("Geocoding failed for:", destination);
    return null;
  }
}
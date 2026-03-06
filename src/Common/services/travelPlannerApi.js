//travelPlannerApi.js
//custom service for all travel planner data 
//handle all data operations asynchronously

import trips from "../data/trips";

//get all trips
export function getTrips() {
  return Promise.resolve(trips);
}

//get a single trip by ID
export function getTrip(id) {
  const trip = trips.find((t) => t.id === id);
  return Promise.resolve(trip);
}

//create new trip
export function createTrip(trip) {
  const newTrip = { ...trip, id: "t" + Date.now(), items: trip.items || [] };
  trips.push(newTrip);
  return Promise.resolve(newTrip);
}

//update an existing trip by ID
export function updateTrip(id, patch) {
  const index = trips.findIndex((t) => t.id === id);
  if (index !== -1) {
    trips[index] = { ...trips[index], ...patch };
  }
  return Promise.resolve(trips[index]);
}

//delete a trip by ID
export function deleteTrip(id) {
  const index = trips.findIndex((t) => t.id === id);
  if (index !== -1) trips.splice(index, 1);
  return Promise.resolve({ message: "Trip deleted" });
}

//add an itinerary item to a specific trip
export function addItem(tripId, item) {
  const trip = trips.find((t) => t.id === tripId);
  const newItem = { ...item, id: "i" + Date.now() };
  if (trip) trip.items.push(newItem);
  return Promise.resolve(newItem);
}

//delete an itinerary item from a trip
export function deleteItem(tripId, itemId) {
  const trip = trips.find((t) => t.id === tripId);
  if (trip) trip.items = trip.items.filter((i) => i.id !== itemId);
  return Promise.resolve({ message: "Item deleted" });
}
//TripModel.js
//parse model for Trip class
//contains all prip-related parse queries

import Parse from "parse";

const Trip = Parse.Object.extend("Trip");

//get all trips
export async function getTrips() {
  const query = new Parse.Query(Trip);
  return await query.find();
}

//get one trip by ID
export async function getTripById(id) {
  const query = new Parse.Query(Trip);
  return await query.get(id);
}

//create new trip
export async function createTrip(tripData) {
  const trip = new Trip();

  trip.set("name", tripData.name);
  trip.set("destination", tripData.destination);
  trip.set("startDate", tripData.startDate);
  trip.set("days", Number(tripData.days));
  trip.set("style", tripData.style);

  return await trip.save();
}

//update an existing trip
export async function updateTrip(id, tripData) {
  const query = new Parse.Query(Trip);
  const trip = await query.get(id);

  trip.set("name", tripData.name);
  trip.set("destination", tripData.destination);
  trip.set("startDate", tripData.startDate);
  trip.set("days", Number(tripData.days));
  trip.set("style", tripData.style);

  return await trip.save();
}

//delete a trip
export async function deleteTrip(id) {
  const query = new Parse.Query(Trip);
  const trip = await query.get(id);
  return await trip.destroy();
}
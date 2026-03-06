//ItineraryItemModel.js
//parse model for ItineraryItem class
//contains all itinerary item parse queries

import Parse from "parse";

const ItineraryItem = Parse.Object.extend("ItineraryItem");

//get all itinerary items for a specific trip
export async function getItemsByTrip(tripId) {
  const query = new Parse.Query(ItineraryItem);
  query.equalTo("tripId", tripId);
  return await query.find();
}

//create a new itinerary item
export async function createItem(itemData) {
  const item = new ItineraryItem();

  item.set("tripId", itemData.tripId);
  item.set("title", itemData.title);
  item.set("day", Number(itemData.day));
  item.set("time", itemData.time);
  item.set("category", itemData.category);

  return await item.save();
}

//delete an itinerary item
export async function deleteItem(id) {
  const query = new Parse.Query(ItineraryItem);
  const item = await query.get(id);
  return await item.destroy();
}
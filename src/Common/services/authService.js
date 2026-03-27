// authService.js
// Parse authentication service
// Contains all authentication methods used by Login and Register components
// No auth logic should exist outside of this file

import Parse from "parse";

// Log in an existing user with username and password
export async function login(username, password) {
  return await Parse.User.logIn(username, password);
}

// Register a new user with username, email, and password
export async function register(username, email, password) {
  const user = new Parse.User();
  user.set("username", username);
  user.set("email", email);
  user.set("password", password);
  return await user.signUp();
}

// Log out the currently logged-in user
export async function logout() {
  return await Parse.User.logOut();
}

// Check if a user is currently logged in
// Used by ProtectedRoute and PublicRoute to check auth status
export function isAuthenticated() {
  return Parse.User.current() !== null;
}
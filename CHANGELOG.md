# Change Log
All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project adheres to Semantic Versioning.

[0.4.0] - 2026-03-28

### Added
TRAVELPLANNER-020 MINOR Created TripMap component using react-leaflet to display trip destinations.
TRAVELPLANNER-021 MINOR Integrated interactive map into TripPlannerPage.
TRAVELPLANNER-022 MINOR Added marker and popup to display destination name, start date, and trip duration.
TRAVELPLANNER-023 MINOR Implemented geoCodingService to convert destination names into latitude and longitude coordinates dynamically.

### Changed
TRAVELPLANNER-024 PATCH Updated environments.js to include MAP_TILE_URL for map configuration.
TRAVELPLANNER-025 PATCH Updated TripPlannerPage to include map rendering alongside trip data.

### Fixed
TRAVELPLANNER-026 PATCH Resolved marker display issues by configuring default Leaflet icons.

## [0.3.0] - 2026-03-27

### Added
TRAVELPLANNER-012 MINOR Added authService.js with login, register, logout, and isAuthenticated methods.
TRAVELPLANNER-013 MINOR Created LoginPage component at route /login.
TRAVELPLANNER-014 MINOR Created RegisterPage component at route /register.
TRAVELPLANNER-015 MINOR Added ProtectedRoute component to block unauthenticated access.
TRAVELPLANNER-016 MINOR Added PublicRoute component to redirect logged-in users away from auth pages.
TRAVELPLANNER-017 MINOR Added logout button to TripsListPage.

### Changed
TRAVELPLANNER-018 PATCH Updated App.jsx to include login and register routes with ProtectedRoute and PublicRoute wrappers.
TRAVELPLANNER-019 PATCH Updated TripModel.js to scope trips to the current logged-in user.

## [0.2.0] - 2026-03-06

### Added
TRAVELPLANNER-001 MINOR Added Parse initialization through environments.js.
TRAVELPLANNER-002 MINOR Created TripModel and ItineraryItemModel for Parse database queries.
TRAVELPLANNER-003 MINOR Connected React components to Parse backend using asynchronous loading.
TRAVELPLANNER-007 MINOR Added react-router-dom for client-side routing between pages.
TRAVELPLANNER-008 MINOR Created TripsListPage component at route / to display all trips from Parse.
TRAVELPLANNER-009 MINOR Added dynamic route /trip/:id so each trip opens its own planner page.

### Changed
TRAVELPLANNER-004 PATCH Reorganized project structure into Common and Components folders.
TRAVELPLANNER-005 PATCH Moved all Parse queries outside React components and into model files.
TRAVELPLANNER-010 PATCH Updated App.jsx to use BrowserRouter and define application routes.
TRAVELPLANNER-011 PATCH Updated TripPlannerPage to load trip by URL param ID instead of first result.

### Fixed
TRAVELPLANNER-006 PATCH Corrected service imports and async loading in TripPlannerPage component.
# Change Log
All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project adheres to Semantic Versioning.

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

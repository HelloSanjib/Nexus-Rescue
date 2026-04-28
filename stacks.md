# Nexus-Rescue Technology Stack

This document outlines the core technologies, libraries, and frameworks used to build the Nexus-Rescue platform.

## Frontend Framework & Core
- **React (v19)**: The core UI library used for building the component-based architecture for both the Mobile App view and the Admin/Responder Dashboards.
- **Create React App (react-scripts)**: The build tool and development server used to bootstrap and serve the project.

## Navigation & Routing
- **React Router DOM (v7)**: Handles client-side routing, enabling the Single Page Application (SPA) experience across the different user roles (Citizen, Responder, Admin).

## Backend as a Service (BaaS)
- **Firebase**:
  - **Firebase Authentication**: Handles secure user sign-in and session management (Email/Password).
  - **Cloud Firestore**: The NoSQL real-time database used to store and sync incident reports, user profiles, and mesh node data.

## Mapping & Geolocation
- **Google Maps API**: Integrated via `@react-google-maps/api` to render interactive maps, plot active emergencies, and provide spatial context for responders.

## UI Components & Styling
- **Vanilla CSS & Inline Styles**: The project relies on a custom CSS variable system (`index.css`) for consistent theming and inline styling for component-specific overrides.
- **Lucide React**: Provides the lightweight, customizable SVG icon set used throughout the application (e.g., `Mic`, `Camera`, `Flame`, `Shield`).

## AI Integration
- **Google Gemini AI (Simulated/Planned)**: Used for the AI Triage feature to automatically assess the severity and location of emergencies based on audio and image captures.

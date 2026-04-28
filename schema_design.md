# Nexus-Rescue Cloud Firestore Schema

This document outlines the database structure for Real-Time synchronization of emergencies.

## Core Collections

### 1. `incidents` (Collection)
Stores all distress signals broadcasted by the mobile nodes.

#### Document ID: Auto-generated
**Fields:**
- `id` (String): Unique identifier.
- `type` (String): "Medical", "Fire", "Panic/Assault", "Suspicious".
- `description` (String): Raw or AI-processed context.
- `location` (GeoPoint): Exact GPS coordinates `(lat, lng)`.
- `nodeId` (String): The mesh network node origin.
- `aiConfidence` (Number): Confidence score out of 100 on the automated classification.
- `status` (String): Enum `["ACTIVE", "RESPONDING", "RESOLVED"]`.
- `timestamp` (Timestamp): Time of initiation.
- `audioHash` (String, Optional): Link to stored audio fragment in Cloud Storage for responders to listen to context.

### 2. `nodes` (Collection)
Tracks active devices acting as mesh network relays.

#### Document ID: Device ID
**Fields:**
- `lastSeen` (Timestamp): Last heartbeat.
- `batteryLevel` (Number): Battery percentage.
- `forwardedCount` (Number): Number of incidents forwarded (reputation/health metric).

### 3. `responders` (Collection)
Tracks dispatchers and authorized rescue personnel in the field.

#### Document ID: User UUID
**Fields:**
- `name` (String): Full name.
- `role` (String): "Dispatcher", "Paramedic", "Police".
- `currentLocation` (GeoPoint): Live updating GPS.
- `activeAssignment` (String): Ref to an incident ID.

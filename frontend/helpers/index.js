export default function isWithinRadius(
  userLocation,
  patrollingCenter,
  patrollingRadius
) {
  const distance = getDistance(userLocation, patrollingCenter);
  return distance <= patrollingRadius; // Returns true if user is within patrolling radius
}

function getDistance(coord1, coord2) {
  const R = 6371; // Earth radius in kilometers
  const dLat = deg2rad(coord2.latitude - coord1.latitude);
  const dLon = deg2rad(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.latitude)) *
      Math.cos(deg2rad(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance * 1000; // Convert to meters
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Patrolling radius will be 3000m = 3km

// Patrolling center will be the center of the city (for now) = 12.9716° N, 77.5946° E

// User location will be the location of the user (for now) = 12.9716° N, 77.5946° E

export const shiftDataArray = [
  {
    id: 1,
    shiftName: "Day Shift",
    shiftStartTime: "12:00pm",
    shiftEndTime: "16:00pm",
    shiftStatus: "Active",
    lunchStartTime: "14:25pm",
    lunchEndTime: "15:25pm",
  },
  {
    id: 2,
    shiftName: "Night Shift",
    shiftStartTime: "17:00pm",
    shiftEndTime: "21:00pm",
    shiftStatus: "Active",
    lunchStartTime: "18:00pm",
    lunchEndTime: "19:00pm",
  },
];

export const locationDataArray = [
  {
    id: 1,
    locationName: "Location A",
    locationAddress: {
      latitude: 40.7128, // Replace with a valid latitude for Location A
      longitude: -74.006, // Replace with a valid longitude for Location A
    },
    locationStatus: "Active",
  },
  {
    id: 2,
    locationName: "Location B",
    locationAddress: {
      latitude: 34.0522, // Replace with a valid latitude for Location B
      longitude: -118.2437, // Replace with a valid longitude for Location B
    },
    locationStatus: "Inactive",
  },
  {
    id: 3,
    locationName: "Location C",
    locationAddress: {
      latitude: 51.5074, // Replace with a valid latitude for Location C
      longitude: -0.1278, // Replace with a valid longitude for Location C
    },
    locationStatus: "Active",
  },
  // Add more data objects as needed
];

export const securityGuardDataArray = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    phoneNumber: 1234567890, // Replace with a valid phone number
    password: "securePassword", // Replace with a secure password
    email: "john.doe@example.com", // Replace with a valid email
    securityGuardImage: {
      public_id: "john_doe_image_id", // Replace with a valid public_id
      url: "https://example.com/john_doe_image.jpg", // Replace with a valid image URL
    },
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    phoneNumber: 9876543210, // Replace with a valid phone number
    password: "strongPassword", // Replace with a secure password
    email: "jane.smith@example.com", // Replace with a valid email
    securityGuardImage: {
      public_id: "jane_smith_image_id", // Replace with a valid public_id
      url: "https://example.com/jane_smith_image.jpg", // Replace with a valid image URL
    },
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    phoneNumber: 5555555555, // Replace with a valid phone number
    password: "safePassword", // Replace with a secure password
    email: "bob.johnson@example.com", // Replace with a valid email
    securityGuardImage: {
      public_id: "bob_johnson_image_id", // Replace with a valid public_id
      url: "https://example.com/bob_johnson_image.jpg", // Replace with a valid image URL
    },
  },
];

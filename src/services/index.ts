// Export all services for easy importing
export { default as httpClient, TokenManager } from './httpClient';
export { default as authService } from './authService';
export { default as programService } from './programService';
export { default as bookingService } from './bookingService';
export { default as userService } from './userService';
export { default as orderService } from './orderService';
export { default as reviewService } from './reviewService';
export { default as locationService } from './locationService';
export { default as facilityService } from './facilityService';
export { default as amenityService } from './amenityService';

// Export all types
export * from '../types/api';

// Export commonly used services as named exports
export {
  authService as auth,
  programService as programs,
  bookingService as bookings,
  userService as users,
  orderService as orders,
  reviewService as reviews,
  locationService as locations,
  facilityService as facilities,
  amenityService as amenities
};
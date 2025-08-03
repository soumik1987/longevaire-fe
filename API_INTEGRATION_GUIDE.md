# API Integration Guide

This guide explains how to use the comprehensive API connectivity solution that has been implemented for your frontend application.

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env` file in your project root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Without this environment variable, the application will use sample data for demonstration.

### 2. Wrap Your App with AuthProvider

Update your `main.tsx` or `App.tsx`:

```tsx
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Your app components */}
    </AuthProvider>
  );
}
```

### 3. Use API Services

```tsx
import { programService, authService, useAuth } from './services';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  // Use any API service
  const handleGetPrograms = async () => {
    const programs = await programService.getPrograms();
    console.log(programs);
  };
}
```

## 📁 Project Structure

```
src/
├── services/
│   ├── httpClient.ts          # HTTP client with interceptors
│   ├── authService.ts         # Authentication service
│   ├── programService.ts      # Program management
│   ├── bookingService.ts      # Booking operations
│   ├── userService.ts         # User management
│   ├── orderService.ts        # Order & payment operations
│   ├── reviewService.ts       # Review management
│   ├── locationService.ts     # Country & city data
│   ├── facilityService.ts     # Facility management
│   ├── amenityService.ts      # Amenity management
│   └── index.ts              # Service exports
├── types/
│   └── api.ts                # TypeScript type definitions
├── contexts/
│   └── AuthContext.tsx       # React authentication context
└── components/
    └── examples/
        └── ApiUsageExamples.tsx  # Usage examples
```

## 🔐 Authentication

### Using the Auth Context

```tsx
import { useAuth, RequireAuth, useRole } from '../contexts/AuthContext';

function LoginExample() {
  const { login, register, logout, user, isAuthenticated, error } = useAuth();
  
  const handleLogin = async () => {
    try {
      await login({ email: 'test@user.com', password: 'password' });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.email}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Protected Routes

```tsx
import { RequireAuth } from '../contexts/AuthContext';

function App() {
  return (
    <div>
      <RequireAuth roles={['admin']}>
        <AdminDashboard />
      </RequireAuth>
      
      <RequireAuth fallback={<LoginPage />}>
        <UserDashboard />
      </RequireAuth>
    </div>
  );
}
```

### Role-Based Access

```tsx
import { useRole } from '../contexts/AuthContext';

function Dashboard() {
  const { isAdmin, isFacility, hasRole } = useRole();
  
  return (
    <div>
      {isAdmin && <AdminPanel />}
      {isFacility && <FacilityPanel />}
      {hasRole('user') && <UserPanel />}
    </div>
  );
}
```

## 🛠 API Services Usage

### Program Management

```tsx
import { programService } from '../services';

// Get all programs
const programs = await programService.getPrograms();

// Get programs by city
const delhiPrograms = await programService.getProgramsByCity('Delhi');

// Get program by code
const program = await programService.getProgramByCode('pryo4f23');

// Create a new program (requires authentication)
const newProgram = await programService.createProgram({
  name: 'New Yoga Retreat',
  description: 'Amazing yoga experience',
  images: ['image1.jpg'],
  programConfig: { level: 'beginner' },
  programStyleCode: 'ps001abc',
  status: 'active',
  startDate: '2025-08-01T10:00:00.000Z',
  endDate: '2025-08-07T10:00:00.000Z',
  creatorCode: 'usr123abc',
  primaryFacilityCode: 'fac456def'
});

// Search programs
const searchResults = await programService.searchPrograms('yoga', {
  city: 'Delhi',
  priceMin: 100,
  priceMax: 1000
});
```

### Booking Management

```tsx
import { bookingService } from '../services';

// Create a booking
const booking = await bookingService.createBooking({
  orderId: 'ORD123456',
  programCode: 'pryo4f23',
  userCode: 'usr123abc',
  startDate: '2025-08-01T10:00:00.000Z',
  endDate: '2025-08-07T10:00:00.000Z',
  status: 'confirmed',
  code: 'book789xyz'
});

// Get user bookings
const userBookings = await bookingService.getUserBookings('usr123abc');

// Check availability
const availability = await bookingService.checkAvailability(
  'pryo4f23',
  '2025-08-01T10:00:00.000Z',
  '2025-08-07T10:00:00.000Z'
);

// Cancel booking
await bookingService.cancelBooking('book789xyz');
```

### User Management

```tsx
import { userService } from '../services';

// Get user dashboard
const dashboard = await userService.getUserDashboard();

// Update user profile
await userService.updateProfile('usr123abc', {
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1234567890'
});

// Upload avatar
const file = document.querySelector('input[type="file"]').files[0];
await userService.uploadAvatar('usr123abc', file);

// Change password
await userService.changePassword({
  currentPassword: 'oldPassword',
  newPassword: 'newPassword'
});
```

### Review Management

```tsx
import { reviewService } from '../services';

// Create a review
await reviewService.createReview({
  programCode: 'pryo4f23',
  userCode: 'usr123abc',
  rating: 5,
  comment: 'Amazing experience!'
});

// Get program reviews
const reviews = await reviewService.getProgramReviews('pryo4f23');

// Get program rating summary
const ratingSummary = await reviewService.getProgramRatingSummary('pryo4f23');
```

### Location Management

```tsx
import { locationService } from '../services';

// Get all countries with cities
const countries = await locationService.getCountriesWithCities();

// Get cities by country
const cities = await locationService.getCitiesByCountry('IN');

// Search locations
const searchResults = await locationService.searchLocations('delhi');

// Get popular destinations
const popular = await locationService.getPopularDestinations(10);
```

### Order & Payment Management

```tsx
import { orderService } from '../services';

// Create an order
const order = await orderService.createOrder({
  userCode: 'usr123abc',
  status: 'pending',
  totalAmount: 1200.0
});

// Process payment
const payment = await orderService.processPayment(order.id, {
  paymentMethod: 'credit_card',
  amount: 1200.0,
  currency: 'USD'
});

// Get order summary
const summary = await orderService.getOrderSummary(order.id);

// Refund payment
await orderService.refundPayment(payment.id, 600.0);
```

### Facility Management

```tsx
import { facilityService } from '../services';

// Get all facilities
const facilities = await facilityService.getAllFacilities();

// Create a facility
const facility = await facilityService.createFacility({
  name: 'Wellness Center',
  description: 'A place for wellness',
  ctype: 'spa',
  subtype: 'luxury',
  address: '123 Main St',
  city: 'Delhi',
  country: 'India',
  latitude: 28.6139,
  longitude: 77.2090,
  status: 'active',
  code: 'FAC001',
  slug: 'wellness-center'
});

// Search facilities
const searchResults = await facilityService.searchFacilities('spa', {
  city: 'Delhi'
});

// Get facility amenities
const amenities = await facilityService.getFacilityAmenities('FAC001');
```

## 🔄 Error Handling

The HTTP client automatically handles:

- **Authentication errors**: Auto-retry with token refresh
- **Network errors**: Proper error formatting
- **Token expiration**: Automatic logout and redirect

```tsx
try {
  const programs = await programService.getPrograms();
} catch (error) {
  // Error is properly formatted
  console.error(error.error); // User-friendly error message
  console.error(error.statusCode); // HTTP status code
}
```

## 🎯 Advanced Usage

### Custom HTTP Requests

```tsx
import { httpClient } from '../services';

// Direct HTTP client usage
const customData = await httpClient.get('/custom-endpoint');
const response = await httpClient.post('/custom-endpoint', { data: 'value' });
```

### Token Management

```tsx
import { TokenManager } from '../services';

// Manual token management
const token = TokenManager.getAccessToken();
TokenManager.setAccessToken('new-token');
TokenManager.clearTokens();
```

### File Uploads

```tsx
import { facilityService } from '../services';

// Upload multiple images
const files = Array.from(document.querySelector('input[type="file"]').files);
await facilityService.uploadFacilityImages('FAC001', files);
```

## 🧪 Testing with Sample Data

When `VITE_API_BASE_URL` is not set, the application uses sample data:

- Test users: `test@user.com`, `test@facility.com`, `test@admin.com`
- Password: `password`
- Sample programs, facilities, and locations are available

## 📊 Admin Operations

Admin-only operations require admin role:

```tsx
// Admin-only endpoints
await programService.getAllProgramsAdmin();
await programService.deleteProgram('pryo4f23');
await userService.getAllUsers();
await userService.updateUserRole('usr123abc', 'admin');
```

## 🔧 Configuration

### Environment Variables

```env
# Required for backend connectivity
VITE_API_BASE_URL=http://localhost:3000/api

# Optional: Development settings
VITE_APP_ENV=development
```

### HTTP Client Configuration

The HTTP client is pre-configured with:

- Base URL from environment
- 30-second timeout
- Automatic authentication headers
- Request/response logging in development
- Token refresh on 401 errors

## 📝 TypeScript Support

All services and types are fully typed:

```tsx
import type { 
  Program, 
  User, 
  Booking, 
  CreateProgramRequest,
  ApiError 
} from '../services';

const program: Program = await programService.getProgramByCode('code');
```

## 🎨 Example Component

See `src/components/examples/ApiUsageExamples.tsx` for a complete working example that demonstrates:

- Authentication flows
- CRUD operations
- Error handling
- Loading states
- User interactions

## 🚨 Common Issues

1. **CORS errors**: Ensure your backend allows requests from your frontend domain
2. **Token expiration**: The app handles this automatically, but ensure refresh tokens are implemented
3. **Network timeouts**: Default timeout is 30 seconds, adjust in `httpClient.ts` if needed
4. **Missing environment variables**: App will use sample data without `VITE_API_BASE_URL`

## 🔄 Migration from Old API

The new system is backward compatible. Old API functions still work:

```tsx
// Old way (still works)
import { fetchPrograms } from '../api';

// New way (recommended)
import { programService } from '../services';
```

## 📱 React Hooks

Pre-built hooks for common operations:

```tsx
import { useAuth, useRole } from '../contexts/AuthContext';

// Authentication state
const { user, isAuthenticated, login, logout } = useAuth();

// Role-based access
const { isAdmin, isFacility, hasRole } = useRole();
```

This integration provides a complete, production-ready API connectivity solution with authentication, error handling, TypeScript support, and comprehensive documentation. You can now easily connect to your backend API while maintaining fallback to sample data for development and testing.
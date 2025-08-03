# Backend Integration Guide

This document explains how to connect your frontend application to the backend API.

## Overview

The frontend application supports both **sample data mode** (for development) and **backend API mode** (for production). The application automatically falls back to sample data when the backend is unavailable.

## Quick Start

### 1. Environment Configuration

Create a `.env` file in the root directory:

```bash
# For development (uses sample data)
VITE_API_BASE_URL=

# For production (connects to backend)
VITE_API_BASE_URL=https://your-api-domain.com/api
```

### 2. Backend API Requirements

Your backend should implement the following endpoints as documented in the API specification:

#### Core Program Endpoints
- `GET /programs` - Get all programs with optional filters
- `GET /programs/:code` - Get program details by code
- `GET /locations/programs/city/:city` - Get programs by city
- `GET /locations/programs/style/:style` - Get programs by style
- `GET /home` - Get homepage programs (recommended & newest)

#### Location Endpoints
- `GET /locations/countries-cities` - Get countries with cities
- `GET /locations/countries/:countryCode/cities` - Get cities by country

#### Program Style Endpoints
- `GET /program-styles` - Get all program styles
- `GET /program-style-amenities/:programStyleCode` - Get amenities for style

#### Authentication Endpoints (optional)
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile
- `POST /auth/logout` - User logout

## Key Features

### 1. Automatic Fallback
The application automatically uses sample data when:
- `VITE_API_BASE_URL` is not set
- Backend API is unreachable
- API requests fail

### 2. Data Transformation
Backend responses are automatically transformed to match the frontend's expected data structure:

```typescript
// Backend program format
interface BackendProgram {
  id: number;
  name: string;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  images: string[];
  // ... other fields
}

// Frontend program format (after transformation)
interface Program {
  name: string;
  location: string;
  details: string;
  duration: string;
  includes: ProgramInclude[];
  imageGallery: string[];
  bookingOptions: {
    availableDates: string[];
    pricePerPerson: string;
  };
  // ... other fields
}
```

### 3. Code-Based Navigation
The frontend uses codes instead of IDs for better security:
- Programs: `pryo4f23` (code) instead of `1` (ID)
- Users: `usr123abc` instead of `1`
- Facilities: `fac456ghi` instead of `1`

## Page Components Integration

### 1. ProgramsSection Component
**Location**: `src/components/ProgramsSection.tsx`

**API Calls**:
- `fetchHomePrograms()` - Gets recommended programs for homepage

**Features**:
- Loading states
- Error handling
- Automatic image fallbacks
- Program code handling

### 2. ProgramDetailsPage
**Location**: `src/pages/ProgramDetailsPage.tsx`

**API Calls**:
- `fetchProgramByCode(code)` - Primary method
- `fetchProgramByName(name)` - Fallback method
- `fetchRelatedPrograms(program)` - Related programs

**Features**:
- Code-based program loading
- Name fallback for compatibility
- Related programs loading

### 3. ProgramListsPage
**Location**: `src/pages/ProgramListsPage.tsx`

**API Calls**:
- `fetchProgramsByStyle(style)` - For category-based listings
- `fetchProgramsByLocation(country, city)` - For location-based listings
- `fetchProgramCategories()` - Fallback for sample data

**Features**:
- Smart data transformation
- Multiple loading strategies
- Error recovery

### 4. ExplorePage
**Location**: `src/pages/ExplorePage.tsx`

**API Calls**:
- `searchProgramsAndDestinations(searchTerm)` - Smart search
- `fetchProgramCategories()` - Category listings
- `fetchDestinations()` - Destination listings

**Features**:
- Debounced search (300ms)
- Intelligent search fallback
- Real-time results

## API Response Handling

### Success Response Format
```json
{
  "data": [...],
  "success": true,
  "message": "Success"
}
```

### Error Response Format
```json
{
  "error": "Error message",
  "success": false
}
```

### Pagination Format
```json
{
  "page": 1,
  "pageSize": 10,
  "total": 50,
  "data": [...]
}
```

## Authentication Integration

### Token Storage
```typescript
// Store token after login
localStorage.setItem('accessToken', response.accessToken);

// Token is automatically added to requests
// via axios interceptor in api.ts
```

### Protected Routes
```typescript
// Check authentication status
const token = localStorage.getItem('accessToken');
const isAuthenticated = !!token;
```

## Development Workflow

### 1. Start with Sample Data
```bash
# .env file
VITE_API_BASE_URL=

# Run development server
npm run dev
```

### 2. Test with Backend
```bash
# .env file
VITE_API_BASE_URL=http://localhost:3000/api

# Ensure backend is running on port 3000
npm run dev
```

### 3. Deploy to Production
```bash
# .env.production
VITE_API_BASE_URL=https://api.yourdomain.com

# Build for production
npm run build
```

## Debugging

### Enable Debug Logs
The application logs all API interactions to the console:

```javascript
// Sample data usage
console.log('Using sample data for /programs');

// API success
console.log('API success:', response.data);

// API failure with fallback
console.error('Failed to fetch programs, using sample data:', error);
```

### Common Issues

1. **CORS Errors**
   - Ensure backend allows frontend domain
   - Check backend CORS configuration

2. **404 Errors**
   - Verify API endpoints match documentation
   - Check API base URL configuration

3. **Authentication Errors**
   - Verify token format and expiration
   - Check bearer token implementation

## Backend API Mapping

### Programs
| Frontend Function | Backend Endpoint | Fallback |
|-------------------|------------------|----------|
| `fetchPrograms()` | `GET /programs` | Sample categories |
| `fetchProgramByCode()` | `GET /programs/:code` | Search by name |
| `fetchProgramsByLocation()` | `GET /locations/programs/city/:city` | Sample data |
| `fetchProgramsByStyle()` | `GET /locations/programs/style/:style` | Sample categories |
| `fetchHomePrograms()` | `GET /home` | Sample slice |

### Destinations
| Frontend Function | Backend Endpoint | Fallback |
|-------------------|------------------|----------|
| `fetchDestinations()` | `GET /locations/countries-cities` | Sample destinations |
| `fetchCountries()` | `GET /locations/countries` | Sample transformation |
| `fetchCitiesByCountry()` | `GET /locations/countries/:code/cities` | Sample data |

## Testing

### Unit Tests
```bash
# Test API functions
npm run test src/api.test.ts

# Test data transformations
npm run test src/utils/dataTransform.test.ts
```

### Integration Tests
```bash
# Test with mock backend
npm run test:integration

# Test fallback scenarios
npm run test:fallback
```

## Performance Considerations

### 1. Lazy Loading
- Images are loaded progressively
- Components use React.memo for optimization
- API calls are debounced for search

### 2. Caching
- Implement API response caching
- Use React Query or SWR for better caching
- Consider service worker for offline support

### 3. Error Boundaries
- Wrap components in error boundaries
- Graceful degradation on API failures
- User-friendly error messages

## Security

### 1. Token Management
- Store JWT tokens securely
- Implement token refresh logic
- Clear tokens on logout

### 2. API Security
- Use HTTPS in production
- Implement rate limiting
- Validate all inputs

### 3. Code Security
- Use codes instead of IDs
- Implement proper authorization
- Sanitize user inputs

## Next Steps

1. **Implement Authentication**: Add login/logout functionality
2. **Add Caching**: Implement React Query or SWR
3. **Error Handling**: Add global error boundaries
4. **Testing**: Add comprehensive test coverage
5. **Performance**: Implement lazy loading and code splitting
6. **Monitoring**: Add error tracking and analytics

## Support

For questions or issues with backend integration:

1. Check console logs for API calls and errors
2. Verify environment configuration
3. Test with sample data first
4. Check API documentation alignment
5. Review network tab for request/response details
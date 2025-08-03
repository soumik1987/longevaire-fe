// src/api.ts
import { 
  programService, 
  locationService,
  authService,
  userService,
  bookingService,
  orderService,
  reviewService,
  facilityService,
  amenityService,
  type Program,
  type Country,
  type City
} from './services';
import { destinations, type Destination } from './data/destinations';
import { getProgramByName, getProgramsByLocation, programCategories, type Program as LegacyProgram, type ProgramCategory } from './data/programs';
import { sampleFAQs, type FAQ } from './data/faq';

// For backward compatibility and fallback, keep the original API_BASE_URL check
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Helper function to convert new Program to legacy Program format
const convertProgramToLegacy = (program: Program): LegacyProgram => {
  return {
    id: program.id.toString(),
    name: program.name,
    description: program.description,
    location: program.facility ? `${program.facility.city} - ${program.facility.country}` : program.location || '',
    duration: `${program.duration || 7} days`,
    price: `$${program.price || 0}`,
    rating: 4.5, // Default rating, you might want to fetch this from reviews
    image: program.images[0] || '/api/placeholder/400/300',
    images: program.images,
    features: program.amenities?.map(a => a.name) || [],
    maxCapacity: 20, // Default capacity
    availableSlots: 15, // You might want to calculate this
    difficulty: program.programConfig?.level || 'Beginner',
    includes: program.amenities?.map(a => a.description) || [],
    itinerary: [], // You might want to add this to the backend
    category: program.programStyle?.name || 'Wellness',
    startDate: program.startDate,
    endDate: program.endDate,
    slug: program.slug,
    createdAt: program.createdAt || new Date().toISOString(),
    updatedAt: program.updatedAt || new Date().toISOString(),
  };
};

// Helper function to handle API calls with fallback
const fetchWithFallback = async <T>(
  apiCall: () => Promise<T>,
  fallbackData: T,
  endpoint?: string
): Promise<T> => {
  if (!API_BASE_URL) {
    console.log('Using sample data for', endpoint || 'unknown endpoint');
    return fallbackData;
  }

  try {
    return await apiCall();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint || 'data'}, using sample data:`, error);
    return fallbackData;
  }
};

// Function to fetch program categories with fallback
export const fetchProgramCategories = async (): Promise<ProgramCategory[]> => {
  return fetchWithFallback(
    () => programService.getProgramStyles().then(styles => 
      styles.map(style => ({
        id: style.id.toString(),
        name: style.name,
        description: style.description,
        image: '/api/placeholder/300/200', // Default placeholder
        programCount: 0 // You might want to add this to the backend
      }))
    ),
    programCategories,
    'program-categories'
  );
};

// Function to fetch destinations with fallback
export const fetchDestinations = async (): Promise<Destination[]> => {
  return fetchWithFallback(
    () => locationService.getCountriesWithCities().then(countries => 
      countries.map(country => ({
        id: country.id.toString(),
        name: country.name,
        country: country.name,
        image: country.images[0] || '/api/placeholder/400/300',
        programCount: 0, // You might want to add this to the backend
        cities: country.cities?.map(city => ({
          id: city.id.toString(),
          name: city.name,
          programCount: 0
        })) || []
      }))
    ),
    destinations,
    'destinations'
  );
};

// Function to fetch program by name with fallback
export const fetchProgramByName = async (name: string): Promise<LegacyProgram | undefined> => {
  return fetchWithFallback(
    async () => {
      try {
        // First try to get by slug/name
        const programs = await programService.getPrograms();
        const program = programs.find(p => 
          p.slug === name || 
          p.name.toLowerCase().replace(/\s+/g, '-') === name ||
          p.code === name
        );
        return program ? convertProgramToLegacy(program) : undefined;
      } catch (error) {
        // If that fails, try to get by code
        try {
          const program = await programService.getProgramByCode(name);
          return convertProgramToLegacy(program);
        } catch {
          return undefined;
        }
      }
    },
    getProgramByName(name),
    `program-by-name/${name}`
  );
};

// Function to fetch programs by location with fallback
export const fetchProgramsByLocation = async (country: string, city?: string): Promise<LegacyProgram[]> => {
  return fetchWithFallback(
    async () => {
      const programs = city 
        ? await programService.getProgramsByCity(city)
        : await programService.getPrograms({ city: undefined }); // Get all programs and filter by country
      
      let filteredPrograms = programs;
      if (!city) {
        // Filter by country if only country is specified
        filteredPrograms = programs.filter(p => 
          p.facility?.country?.toLowerCase() === country.toLowerCase()
        );
      }
      
      return filteredPrograms.map(convertProgramToLegacy);
    },
    getProgramsByLocation(country, city),
    `programs-by-location/${country}${city ? `/${city}` : ''}`
  );
};

// Function to fetch related programs
export const fetchRelatedPrograms = async (currentProgram: LegacyProgram): Promise<LegacyProgram[]> => {
  return fetchWithFallback(
    async () => {
      try {
        // Try to get related programs from the backend
        const programs = await programService.getRelatedPrograms(currentProgram.slug || currentProgram.name);
        return programs.map(convertProgramToLegacy);
      } catch {
        // Fallback: get programs from same city/style
        const allPrograms = await programService.getPrograms();
        const [city, country] = currentProgram.location.split(' - ');
        const relatedPrograms = allPrograms.filter(p => 
          p.facility?.city === city && 
          p.name !== currentProgram.name
        );
        return relatedPrograms.map(convertProgramToLegacy);
      }
    },
    (() => {
      const [city, country] = currentProgram.location.split(' - ');
      return getProgramsByLocation(country, city).filter(p => p.name !== currentProgram.name);
    })(),
    `related-programs/${currentProgram.name}`
  );
};


// Function to fetch FAQs with fallback
export const fetchFAQs = async (): Promise<FAQ[]> => {
  return fetchWithFallback(
    () => Promise.resolve(sampleFAQs), // For now, just return sample data since FAQs endpoint isn't in the API doc
    sampleFAQs,
    'faqs'
  );
};

// Export new API services for direct use
export {
  authService,
  programService,
  bookingService,
  userService,
  orderService,
  reviewService,
  locationService,
  facilityService,
  amenityService
} from './services';

// Export types
export type {
  User,
  Program,
  Booking,
  Order,
  Review,
  Facility,
  Amenity,
  Country,
  City,
  LoginRequest,
  RegisterRequest,
  CreateProgramRequest,
  CreateBookingRequest,
  CreateOrderRequest,
  CreateReviewRequest
} from './services';
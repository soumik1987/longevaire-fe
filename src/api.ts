// src/api.ts
import axios from 'axios';
import { destinations, type Destination } from './data/destinations';
import { getProgramByName, getProgramsByLocation, programCategories, type Program, type ProgramCategory } from './data/programs';
import { sampleFAQs, type FAQ } from './data/faq';

// Import backend types and transformers
import type { 
  BackendProgram, 
  Country, 
  City, 
  ProgramStyle, 
  ApiResponse,
  ProgramFilters,
  HomePageResponse,
  Booking,
  Order,
  Review
} from './types/api';
import { 
  transformBackendProgram, 
  transformCountriesToDestinations, 
  transformProgramStyles,
  createSearchResults
} from './utils/dataTransform';

// For temporary frontend-only solution, use a direct URL or empty string
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''; // Fallback to empty string if not defined

// Log the API mode on startup
console.log('🔧 API Configuration:', {
  mode: API_BASE_URL ? 'Backend API' : 'Sample Data',
  baseURL: API_BASE_URL || 'Using sample data',
  environment: import.meta.env.MODE
});

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Define API response types for legacy compatibility
interface LegacyApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Helper function to handle API calls with fallback
const fetchWithFallback = async <T>(
  endpoint: string,
  fallbackData: T,
  params?: Record<string, any>
): Promise<T> => {
  if (!API_BASE_URL) {
    console.log('📊 Using sample data for', endpoint);
    return fallbackData;
  }

  try {
    const response = await apiClient.get<LegacyApiResponse<T>>(endpoint, { params });
    console.log('✅ API success:', endpoint);
    return response.data.data;
  } catch (error) {
    console.error(`❌ API failed for ${endpoint}, using sample data:`, error);
    return fallbackData;
  }
};

// ===============================
// PROGRAMS API
// ===============================

// Get all programs with optional filters
export const fetchPrograms = async (filters?: ProgramFilters): Promise<Program[]> => {
  if (!API_BASE_URL) {
    console.log('📊 Using sample programs data');
    return programCategories.flatMap(cat => cat.programs);
  }

  try {
    const response = await apiClient.get<BackendProgram[]>('/programs', { params: filters });
    console.log('✅ Fetched', response.data.length, 'programs from API');
    return response.data.map(transformBackendProgram);
  } catch (error) {
    console.error('❌ Failed to fetch programs, using sample data:', error);
    return programCategories.flatMap(cat => cat.programs);
  }
};

// Get program by code (backend) or name (fallback)
export const fetchProgramByCode = async (code: string): Promise<Program | undefined> => {
  if (!API_BASE_URL) {
    console.log('📊 Using sample program data for code:', code);
    // Try to find by name as fallback
    return getProgramByName(code);
  }

  try {
    const response = await apiClient.get<BackendProgram>(`/programs/${code}`);
    console.log('✅ Fetched program by code:', code);
    return transformBackendProgram(response.data);
  } catch (error) {
    console.error('❌ Failed to fetch program by code, using sample data:', error);
    return getProgramByName(code);
  }
};

// Legacy function - maintained for compatibility
export const fetchProgramByName = async (name: string): Promise<Program | undefined> => {
  if (!API_BASE_URL) {
    console.log('📊 Using sample program data for:', name);
    return getProgramByName(name);
  }

  try {
    // Try to find by name in all programs
    const programs = await fetchPrograms();
    const found = programs.find(p => p.name === name || p.name.toLowerCase() === name.toLowerCase());
    if (found) {
      console.log('✅ Found program by name:', name);
    }
    return found;
  } catch (error) {
    console.error('❌ Failed to fetch program by name, using sample data:', error);
    return getProgramByName(name);
  }
};

// Get programs by location
export const fetchProgramsByLocation = async (country: string, city?: string): Promise<Program[]> => {
  if (!API_BASE_URL) {
    console.log('📊 Using sample programs data for location:', country, city);
    return getProgramsByLocation(country, city);
  }

  try {
    const endpoint = city 
      ? `/locations/programs/city/${encodeURIComponent(city)}`
      : `/locations/programs/country/${encodeURIComponent(country)}`;
    const response = await apiClient.get<BackendProgram[]>(endpoint);
    console.log('✅ Fetched', response.data.length, 'programs for location:', country, city);
    return response.data.map(transformBackendProgram);
  } catch (error) {
    console.error('❌ Failed to fetch programs by location, using sample data:', error);
    return getProgramsByLocation(country, city);
  }
};

// Get programs by style
export const fetchProgramsByStyle = async (style: string): Promise<Program[]> => {
  if (!API_BASE_URL) {
    console.log('📊 Using sample programs data for style:', style);
    const category = programCategories.find(cat => cat.type.toLowerCase() === style.toLowerCase());
    return category?.programs || [];
  }

  try {
    const response = await apiClient.get<BackendProgram[]>(`/locations/programs/style/${encodeURIComponent(style)}`);
    console.log('✅ Fetched', response.data.length, 'programs for style:', style);
    return response.data.map(transformBackendProgram);
  } catch (error) {
    console.error('❌ Failed to fetch programs by style, using sample data:', error);
    const category = programCategories.find(cat => cat.type.toLowerCase() === style.toLowerCase());
    return category?.programs || [];
  }
};

// Get related programs
export const fetchRelatedPrograms = async (currentProgram: Program): Promise<Program[]> => {
  if (!API_BASE_URL) {
    console.log('📊 Using sample data for related programs');
    const [city, country] = currentProgram.location.split(' - ');
    return getProgramsByLocation(country, city).filter(p => p.name !== currentProgram.name);
  }

  try {
    // Try to get programs from the same location or style
    const locationPrograms = await fetchProgramsByLocation(
      currentProgram.location.split(' - ')[1],
      currentProgram.location.split(' - ')[0]
    );
    const related = locationPrograms.filter(p => p.name !== currentProgram.name).slice(0, 6);
    console.log('✅ Fetched', related.length, 'related programs');
    return related;
  } catch (error) {
    console.error('❌ Failed to fetch related programs, using sample data:', error);
    const [city, country] = currentProgram.location.split(' - ');
    return getProgramsByLocation(country, city).filter(p => p.name !== currentProgram.name);
  }
};

// Get homepage programs
export const fetchHomePrograms = async (): Promise<{ recommended: Program[]; newest: Program[] }> => {
  if (!API_BASE_URL) {
    console.log('📊 Using sample data for home programs');
    const allPrograms = programCategories.flatMap(cat => cat.programs);
    return {
      recommended: allPrograms.slice(0, 6),
      newest: allPrograms.slice(3, 9)
    };
  }

  try {
    const response = await apiClient.get<HomePageResponse>('/home');
    console.log('✅ Fetched home programs:', response.data.recommended.length, 'recommended,', response.data.newest.length, 'newest');
    return {
      recommended: response.data.recommended.map(transformBackendProgram),
      newest: response.data.newest.map(transformBackendProgram)
    };
  } catch (error) {
    console.error('❌ Failed to fetch home programs, using sample data:', error);
    const allPrograms = programCategories.flatMap(cat => cat.programs);
    return {
      recommended: allPrograms.slice(0, 6),
      newest: allPrograms.slice(3, 9)
    };
  }
};

// ===============================
// PROGRAM CATEGORIES / STYLES API
// ===============================

// Get program styles from backend and transform to categories
export const fetchProgramCategories = async (): Promise<ProgramCategory[]> => {
  if (!API_BASE_URL) {
    console.log('📊 Using sample program categories');
    return programCategories;
  }

  try {
    const [stylesResponse, programsResponse] = await Promise.all([
      apiClient.get<ProgramStyle[]>('/program-styles'),
      apiClient.get<BackendProgram[]>('/programs')
    ]);

    // Group programs by style
    const programsByStyle: Record<string, BackendProgram[]> = {};
    programsResponse.data.forEach(program => {
      if (!programsByStyle[program.programStyleCode]) {
        programsByStyle[program.programStyleCode] = [];
      }
      programsByStyle[program.programStyleCode].push(program);
    });

    console.log('✅ Fetched', stylesResponse.data.length, 'program styles and', programsResponse.data.length, 'programs');
    return transformProgramStyles(stylesResponse.data, programsByStyle);
  } catch (error) {
    console.error('❌ Failed to fetch program categories, using sample data:', error);
    return programCategories;
  }
};

// ===============================
// DESTINATIONS / LOCATIONS API
// ===============================

// Get countries and transform to destinations
export const fetchDestinations = async (): Promise<Destination[]> => {
  if (!API_BASE_URL) {
    console.log('📊 Using sample destinations');
    return destinations;
  }

  try {
    const response = await apiClient.get<Country[]>('/locations/countries-cities');
    console.log('✅ Fetched', response.data.length, 'destinations');
    return transformCountriesToDestinations(response.data);
  } catch (error) {
    console.error('❌ Failed to fetch destinations, using sample data:', error);
    return destinations;
  }
};

// Get countries
export const fetchCountries = async (): Promise<Country[]> => {
  if (!API_BASE_URL) {
    console.log('📊 Using sample countries data');
    return destinations.map(dest => ({
      id: 0,
      name: dest.country,
      status: 'active',
      code: dest.country.substring(0, 2).toUpperCase(),
      slug: dest.country.toLowerCase().replace(/\s+/g, '-'),
      images: [dest.image],
      cities: dest.cities.map((city, index) => ({
        id: index,
        name: city,
        status: 'active',
        code: city.substring(0, 3).toUpperCase(),
        slug: city.toLowerCase().replace(/\s+/g, '-'),
        countryCode: dest.country.substring(0, 2).toUpperCase(),
        images: [dest.image]
      }))
    }));
  }

  try {
    const response = await apiClient.get<Country[]>('/locations/countries');
    console.log('✅ Fetched', response.data.length, 'countries');
    return response.data;
  } catch (error) {
    console.error('❌ Failed to fetch countries:', error);
    return [];
  }
};

// Get cities by country
export const fetchCitiesByCountry = async (countryCode: string): Promise<City[]> => {
  if (!API_BASE_URL) {
    console.log('📊 Using sample cities data for country:', countryCode);
    const destination = destinations.find(dest => 
      dest.country.substring(0, 2).toUpperCase() === countryCode.toUpperCase()
    );
    return destination?.cities.map((city, index) => ({
      id: index,
      name: city,
      status: 'active',
      code: city.substring(0, 3).toUpperCase(),
      slug: city.toLowerCase().replace(/\s+/g, '-'),
      countryCode,
      images: [destination.image],
      country: {
        name: destination.country,
        code: countryCode
      }
    })) || [];
  }

  try {
    const response = await apiClient.get<City[]>(`/locations/countries/${countryCode}/cities`);
    console.log('✅ Fetched', response.data.length, 'cities for country:', countryCode);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to fetch cities:', error);
    return [];
  }
};

// ===============================
// BOOKING API
// ===============================

// Get user bookings
export const fetchUserBookings = async (userCode: string): Promise<Booking[]> => {
  if (!API_BASE_URL) {
    console.log('📊 No API URL configured for bookings');
    return [];
  }

  try {
    const response = await apiClient.get<Booking[]>(`/bookings/user/${userCode}`);
    console.log('✅ Fetched', response.data.length, 'bookings for user:', userCode);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to fetch user bookings:', error);
    return [];
  }
};

// ===============================
// LEGACY COMPATIBILITY
// ===============================

// Legacy functions maintained for backward compatibility
export const fetchFAQs = async (): Promise<FAQ[]> => {
  return fetchWithFallback('/faqs', sampleFAQs);
};

// Search functionality for ExplorePage
export const searchProgramsAndDestinations = async (searchTerm: string): Promise<any[]> => {
  try {
    const [programs, destinations] = await Promise.all([
      fetchPrograms(),
      fetchDestinations()
    ]);
    
    const results = createSearchResults(programs, destinations, searchTerm);
    console.log('🔍 Search results for "' + searchTerm + '":', results.length, 'found');
    return results;
  } catch (error) {
    console.error('❌ Search failed:', error);
    return [];
  }
};
// src/api.ts
import axios from 'axios';
import { destinations, type Destination } from './data/destinations';
import { getProgramByName, getProgramsByLocation, programCategories, type Program, type ProgramCategory } from './data/programs';
// import { sampleExperts, type Expert } from './data/experts';

import { sampleFAQs, type FAQ } from './data/faq';



// For temporary frontend-only solution, use a direct URL or empty string
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''; // Fallback to empty string if not defined

// Define API response types
interface ApiResponse<T> {
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
    console.log('Using sample data for', endpoint);
    return fallbackData;
  }

  try {
    const response = await axios.get<ApiResponse<T>>(`${API_BASE_URL}${endpoint}`, { params });
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}, using sample data:`, error);
    return fallbackData;
  }
};

// Function to fetch program categories with fallback
export const fetchProgramCategories = async (): Promise<ProgramCategory[]> => {
  return fetchWithFallback('/program-categories', programCategories);
};

// Function to fetch destinations with fallback
export const fetchDestinations = async (): Promise<Destination[]> => {
  return fetchWithFallback('/destinations', destinations);
};

// Function to fetch program by name with fallback
export const fetchProgramByName = async (name: string): Promise<Program | undefined> => {
  if (!API_BASE_URL) {
    console.log('Using sample program data for:', name);
    return getProgramByName(name);
  }

  try {
    const response = await axios.get<ApiResponse<Program>>(`${API_BASE_URL}/programs/${encodeURIComponent(name)}`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch program by name, using sample data:', error);
    return getProgramByName(name);
  }
};

// Function to fetch programs by location with fallback
export const fetchProgramsByLocation = async (country: string, city?: string): Promise<Program[]> => {
  if (!API_BASE_URL) {
    console.log('Using sample programs data for location:', country, city);
    return getProgramsByLocation(country, city);
  }

  try {
    const endpoint = city 
      ? `/programs/location/${encodeURIComponent(country)}/${encodeURIComponent(city)}`
      : `/programs/location/${encodeURIComponent(country)}`;
    const response = await axios.get<ApiResponse<Program[]>>(`${API_BASE_URL}${endpoint}`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch programs by location, using sample data:', error);
    return getProgramsByLocation(country, city);
  }
};

// Function to fetch related programs
export const fetchRelatedPrograms = async (currentProgram: Program): Promise<Program[]> => {
  if (!API_BASE_URL) {
    console.log('Using sample data for related programs');
    const [city, country] = currentProgram.location.split(' - ');
    return getProgramsByLocation(country, city).filter(p => p.name !== currentProgram.name);
  }

  try {
    const endpoint = `/programs/related/${encodeURIComponent(currentProgram.name)}`;
    const response = await axios.get<ApiResponse<Program[]>>(`${API_BASE_URL}${endpoint}`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch related programs, using sample data:', error);
    const [city, country] = currentProgram.location.split(' - ');
    return getProgramsByLocation(country, city).filter(p => p.name !== currentProgram.name);
  }
};




// // Function to fetch experts with fallback
// export const fetchExperts = async (): Promise<Expert[]> => {
//   return fetchWithFallback('/experts', sampleExperts);
// };


export const fetchFAQs = async (): Promise<FAQ[]> => {
  return fetchWithFallback('/faqs', sampleFAQs);
};
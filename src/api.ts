// src/api.ts
import axios from 'axios';
import { destinations, type Destination } from './data/destinations';
import { getProgramByName, getProgramsByLocation, programCategories, type Program, type ProgramCategory } from './data/programs';

// For temporary frontend-only solution, use a direct URL or empty string
const API_BASE_URL = ''; // Empty string will force fallback to sample data

// Define API response types
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Function to fetch program categories with fallback
export const fetchProgramCategories = async (): Promise<ProgramCategory[]> => {
  if (!API_BASE_URL) {
    console.log('Using sample program categories data');
    return programCategories;
  }

  try {
    const response = await axios.get<ApiResponse<ProgramCategory[]>>(`${API_BASE_URL}/program-categories`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch program categories, using sample data:', error);
    return programCategories;
  }
};

// Function to fetch destinations with fallback
export const fetchDestinations = async (): Promise<Destination[]> => {
  if (!API_BASE_URL) {
    console.log('Using sample destinations data');
    return destinations;
  }

  try {
    const response = await axios.get<ApiResponse<Destination[]>>(`${API_BASE_URL}/destinations`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch destinations, using sample data:', error);
    return destinations;
  }
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
    const url = city 
      ? `${API_BASE_URL}/programs/location/${encodeURIComponent(country)}/${encodeURIComponent(city)}`
      : `${API_BASE_URL}/programs/location/${encodeURIComponent(country)}`;
    const response = await axios.get<ApiResponse<Program[]>>(url);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch programs by location, using sample data:', error);
    return getProgramsByLocation(country, city);
  }
};
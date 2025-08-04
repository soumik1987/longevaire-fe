// src/api/exploreApi.ts
import { authFetch } from '../utils/authFetch';
import type { ProgramCategory } from '../data/programs';
import { type Destination } from '../data/destinations';

export const fetchProgramCategories = async (): Promise<ProgramCategory[]> => {
  try {
    const response = await authFetch('/api/program-categories');
    if (!response.ok) throw new Error('Failed to fetch program categories');
    return await response.json();
  } catch (error) {
    console.error('API Error - fetchProgramCategories:', error);
    // Return empty array as fallback for UI
    return [];
  }
};

export const fetchDestinations = async (): Promise<Destination[]> => {
  try {
    const response = await authFetch('/api/destinations');
    if (!response.ok) throw new Error('Failed to fetch destinations');
    return await response.json();
  } catch (error) {
    console.error('API Error - fetchDestinations:', error);
    // Return empty array as fallback for UI
    return [];
  }
};

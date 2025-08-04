// import axios from "./axios";

// export const getPrograms = async (params: { page?: number; limit?: number; search?: string }) => {
//   const res = await axios.get("/programs", { params });
//   return res.data;
// };







import { authFetch } from '../utils/authFetch';
import type { Program } from '../data/programs';

interface GetProgramsParams {
  category?: string;
  country?: string;
  city?: string;
  limit?: number;
}

interface GetProgramsResponse {
  success: boolean;
  programs: Program[];
  total: number;
  error?: string;
}

export const getPrograms = async (params: GetProgramsParams = {}): Promise<GetProgramsResponse> => {
  try {
    // Build query string from params
    const queryParams = new URLSearchParams();
    if (params.category) queryParams.append('category', params.category);
    if (params.country) queryParams.append('country', params.country);
    if (params.city) queryParams.append('city', params.city);
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const response = await authFetch(`/api/programs?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      programs: data.programs || [],
      total: data.total || 0
    };
  } catch (error) {
    console.error('Error fetching programs:', error);
    return {
      success: false,
      programs: [],
      total: 0,
      error: error instanceof Error ? error.message : 'Failed to fetch programs'
    };
  }
};

// Additional API functions that might be useful
export const getFeaturedPrograms = async (limit = 4): Promise<GetProgramsResponse> => {
  return getPrograms({ limit });
};

export const getProgramsByCategory = async (category: string): Promise<GetProgramsResponse> => {
  return getPrograms({ category });
};

export const getProgramsByLocation = async (country: string, city?: string): Promise<GetProgramsResponse> => {
  return getPrograms({ country, city });
};
import httpClient from './httpClient';
import type {
  Program,
  CreateProgramRequest,
  ProgramsQueryParams,
  ProgramStyle,
  ProgramService as ProgramServiceType,
  CreateProgramServiceRequest,
  HomePageData
} from '../types/api';

class ProgramService {
  /**
   * Create a new program
   */
  async createProgram(data: CreateProgramRequest): Promise<Program> {
    return httpClient.post<Program>('/programs', data);
  }

  /**
   * Get all programs with optional filtering
   */
  async getPrograms(params?: ProgramsQueryParams): Promise<Program[]> {
    return httpClient.get<Program[]>('/programs', { params });
  }

  /**
   * Get program by code
   */
  async getProgramByCode(code: string): Promise<Program> {
    return httpClient.get<Program>(`/programs/${code}`);
  }

  /**
   * Approve a program (Admin only)
   */
  async approveProgram(code: string): Promise<{ message: string; program: Program }> {
    return httpClient.post<{ message: string; program: Program }>(`/programs/${code}/approve`);
  }

  /**
   * Get all programs (Admin only)
   */
  async getAllProgramsAdmin(): Promise<Program[]> {
    return httpClient.get<Program[]>('/admin/programs');
  }

  /**
   * Delete a program (Admin only)
   */
  async deleteProgram(code: string): Promise<{ message: string }> {
    return httpClient.delete<{ message: string }>(`/admin/programs/${code}`);
  }

  /**
   * Get programs by city
   */
  async getProgramsByCity(city: string): Promise<Program[]> {
    return httpClient.get<Program[]>(`/locations/programs/city/${city}`);
  }

  /**
   * Get programs by style
   */
  async getProgramsByStyle(style: string): Promise<Program[]> {
    return httpClient.get<Program[]>(`/locations/programs/style/${style}`);
  }

  /**
   * Get all program styles
   */
  async getProgramStyles(): Promise<ProgramStyle[]> {
    return httpClient.get<ProgramStyle[]>('/program-styles');
  }

  /**
   * Get program style by code
   */
  async getProgramStyleByCode(code: string): Promise<ProgramStyle> {
    return httpClient.get<ProgramStyle>(`/program-styles/${code}`);
  }

  /**
   * Get homepage program sections
   */
  async getHomepagePrograms(): Promise<HomePageData> {
    return httpClient.get<HomePageData>('/home');
  }

  /**
   * Search programs by name, location, or other criteria
   */
  async searchPrograms(query: string, filters?: {
    city?: string;
    style?: string;
    priceMin?: number;
    priceMax?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<Program[]> {
    const params = {
      q: query,
      ...filters
    };
    return httpClient.get<Program[]>('/programs/search', { params });
  }

  /**
   * Get related programs based on current program
   */
  async getRelatedPrograms(programCode: string): Promise<Program[]> {
    return httpClient.get<Program[]>(`/programs/${programCode}/related`);
  }

  /**
   * Get program services (amenities) for a program
   */
  async getProgramServices(programCode: string): Promise<ProgramServiceType[]> {
    return httpClient.get<ProgramServiceType[]>(`/program-services/${programCode}`);
  }

  /**
   * Map service to program
   */
  async mapServiceToProgram(data: CreateProgramServiceRequest): Promise<ProgramServiceType> {
    return httpClient.post<ProgramServiceType>('/program-service', data);
  }

  /**
   * Get featured programs
   */
  async getFeaturedPrograms(limit: number = 6): Promise<Program[]> {
    return httpClient.get<Program[]>('/programs/featured', { params: { limit } });
  }

  /**
   * Get upcoming programs
   */
  async getUpcomingPrograms(limit: number = 10): Promise<Program[]> {
    const now = new Date().toISOString();
    return httpClient.get<Program[]>('/programs', { 
      params: { 
        startDate: now,
        limit,
        sort: 'startDate:asc'
      } 
    });
  }

  /**
   * Get programs by price range
   */
  async getProgramsByPriceRange(minPrice: number, maxPrice: number): Promise<Program[]> {
    return httpClient.get<Program[]>('/programs', { 
      params: { 
        priceMin: minPrice,
        priceMax: maxPrice
      } 
    });
  }

  /**
   * Get programs by duration
   */
  async getProgramsByDuration(minDays: number, maxDays?: number): Promise<Program[]> {
    const params: any = { minDuration: minDays };
    if (maxDays) {
      params.maxDuration = maxDays;
    }
    return httpClient.get<Program[]>('/programs', { params });
  }

  /**
   * Update program (if user is creator or admin)
   */
  async updateProgram(code: string, data: Partial<CreateProgramRequest>): Promise<Program> {
    return httpClient.put<Program>(`/programs/${code}`, data);
  }

  /**
   * Get user's created programs
   */
  async getUserPrograms(userCode: string): Promise<Program[]> {
    return httpClient.get<Program[]>(`/programs/user/${userCode}`);
  }

  /**
   * Toggle program status (active/inactive)
   */
  async toggleProgramStatus(code: string): Promise<Program> {
    return httpClient.patch<Program>(`/programs/${code}/toggle-status`);
  }
}

// Export singleton instance
export const programService = new ProgramService();
export default programService;
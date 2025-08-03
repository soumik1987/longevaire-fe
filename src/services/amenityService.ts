import httpClient from './httpClient';
import type {
  Amenity,
  CreateAmenityRequest,
  PaginatedResponse,
  ProgramStyleAmenity,
  CreateProgramStyleAmenityRequest
} from '../types/api';

class AmenityService {
  /**
   * Create a new amenity
   */
  async createAmenity(data: CreateAmenityRequest): Promise<Amenity> {
    return httpClient.post<Amenity>('/amenities', data);
  }

  /**
   * Get all amenities with pagination
   */
  async getAllAmenities(params?: {
    page?: number;
    pageSize?: number;
    category?: string;
    status?: string;
  }): Promise<PaginatedResponse<Amenity>> {
    return httpClient.get<PaginatedResponse<Amenity>>('/amenities', { params });
  }

  /**
   * Get amenity by code
   */
  async getAmenityByCode(code: string): Promise<Amenity> {
    return httpClient.get<Amenity>(`/amenities/${code}`);
  }

  /**
   * Update amenity
   */
  async updateAmenity(code: string, data: Partial<CreateAmenityRequest>): Promise<Amenity> {
    return httpClient.put<Amenity>(`/amenities/${code}`, data);
  }

  /**
   * Delete amenity (Admin only)
   */
  async deleteAmenity(code: string): Promise<{ message: string }> {
    return httpClient.delete<{ message: string }>(`/admin/amenities/${code}`);
  }

  /**
   * Get amenities by category
   */
  async getAmenitiesByCategory(category: string): Promise<Amenity[]> {
    return httpClient.get<Amenity[]>('/amenities', { params: { category } });
  }

  /**
   * Search amenities
   */
  async searchAmenities(query: string, filters?: {
    category?: string;
    status?: string;
  }): Promise<Amenity[]> {
    const params = {
      q: query,
      ...filters
    };
    return httpClient.get<Amenity[]>('/amenities/search', { params });
  }

  /**
   * Get popular amenities
   */
  async getPopularAmenities(limit: number = 10): Promise<Amenity[]> {
    return httpClient.get<Amenity[]>('/amenities/popular', { params: { limit } });
  }

  /**
   * Get amenity categories
   */
  async getAmenityCategories(): Promise<string[]> {
    return httpClient.get<string[]>('/amenities/categories');
  }

  /**
   * Get program style amenities
   */
  async getProgramStyleAmenities(programStyleCode: string): Promise<ProgramStyleAmenity[]> {
    return httpClient.get<ProgramStyleAmenity[]>(`/program-style-amenities/${programStyleCode}`);
  }

  /**
   * Add amenity to program style
   */
  async addProgramStyleAmenity(data: CreateProgramStyleAmenityRequest): Promise<ProgramStyleAmenity> {
    return httpClient.post<ProgramStyleAmenity>('/program-style-amenities', data);
  }

  /**
   * Remove amenity from program style
   */
  async removeProgramStyleAmenity(programStyleAmenityId: number): Promise<{ message: string }> {
    return httpClient.delete<{ message: string }>(`/program-style-amenities/${programStyleAmenityId}`);
  }

  /**
   * Update program style amenity
   */
  async updateProgramStyleAmenity(programStyleAmenityId: number, data: {
    status?: string;
  }): Promise<ProgramStyleAmenity> {
    return httpClient.put<ProgramStyleAmenity>(`/program-style-amenities/${programStyleAmenityId}`, data);
  }

  /**
   * Upload amenity images
   */
  async uploadAmenityImages(amenityCode: string, files: File[]): Promise<{ images: string[] }> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });
    
    return httpClient.post<{ images: string[] }>(`/amenities/${amenityCode}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * Get amenity statistics
   */
  async getAmenityStats(): Promise<{
    totalAmenities: number;
    amenitiesByCategory: Record<string, number>;
    activeAmenities: number;
    mostUsedAmenities: Array<{
      amenity: Amenity;
      usageCount: number;
    }>;
  }> {
    return httpClient.get<{
      totalAmenities: number;
      amenitiesByCategory: Record<string, number>;
      activeAmenities: number;
      mostUsedAmenities: Array<{
        amenity: Amenity;
        usageCount: number;
      }>;
    }>('/admin/amenities/stats');
  }

  /**
   * Toggle amenity status
   */
  async toggleAmenityStatus(code: string): Promise<Amenity> {
    return httpClient.patch<Amenity>(`/amenities/${code}/toggle-status`);
  }

  /**
   * Get featured amenities
   */
  async getFeaturedAmenities(limit: number = 6): Promise<Amenity[]> {
    return httpClient.get<Amenity[]>('/amenities/featured', { params: { limit } });
  }

  /**
   * Get amenities by program
   */
  async getAmenitiesByProgram(programCode: string): Promise<Amenity[]> {
    return httpClient.get<Amenity[]>(`/programs/${programCode}/amenities`);
  }

  /**
   * Rate amenity
   */
  async rateAmenity(amenityCode: string, rating: number, comment?: string): Promise<{
    message: string;
    averageRating: number;
  }> {
    return httpClient.post<{
      message: string;
      averageRating: number;
    }>(`/amenities/${amenityCode}/rate`, { rating, comment });
  }

  /**
   * Get amenity ratings
   */
  async getAmenityRatings(amenityCode: string): Promise<{
    averageRating: number;
    totalRatings: number;
    ratingDistribution: Record<string, number>;
  }> {
    return httpClient.get<{
      averageRating: number;
      totalRatings: number;
      ratingDistribution: Record<string, number>;
    }>(`/amenities/${amenityCode}/ratings`);
  }
}

// Export singleton instance
export const amenityService = new AmenityService();
export default amenityService;
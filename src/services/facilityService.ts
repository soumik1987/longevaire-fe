import httpClient from './httpClient';
import type {
  Facility,
  CreateFacilityRequest,
  UpdateFacilityRequest,
  FacilityAmenity,
  CreateFacilityAmenityRequest
} from '../types/api';

class FacilityService {
  /**
   * Create a new facility
   */
  async createFacility(data: CreateFacilityRequest): Promise<Facility> {
    return httpClient.post<Facility>('/facilities', data);
  }

  /**
   * Get all facilities
   */
  async getAllFacilities(): Promise<Facility[]> {
    return httpClient.get<Facility[]>('/facilities');
  }

  /**
   * Get facility by code
   */
  async getFacilityByCode(code: string): Promise<Facility> {
    return httpClient.get<Facility>(`/facilities/${code}`);
  }

  /**
   * Update facility
   */
  async updateFacility(code: string, data: UpdateFacilityRequest): Promise<Facility> {
    return httpClient.put<Facility>(`/facilities/${code}`, data);
  }

  /**
   * Delete facility (Admin only)
   */
  async deleteFacility(code: string): Promise<{ message: string }> {
    return httpClient.delete<{ message: string }>(`/admin/facilities/${code}`);
  }

  /**
   * Get facilities by city
   */
  async getFacilitiesByCity(city: string): Promise<Facility[]> {
    return httpClient.get<Facility[]>('/facilities', { params: { city } });
  }

  /**
   * Get facilities by type
   */
  async getFacilitiesByType(ctype: string, subtype?: string): Promise<Facility[]> {
    const params: any = { ctype };
    if (subtype) params.subtype = subtype;
    return httpClient.get<Facility[]>('/facilities', { params });
  }

  /**
   * Search facilities
   */
  async searchFacilities(query: string, filters?: {
    city?: string;
    ctype?: string;
    subtype?: string;
  }): Promise<Facility[]> {
    const params = {
      q: query,
      ...filters
    };
    return httpClient.get<Facility[]>('/facilities/search', { params });
  }

  /**
   * Get user's facilities
   */
  async getUserFacilities(userCode: string): Promise<Facility[]> {
    return httpClient.get<Facility[]>(`/facilities/user/${userCode}`);
  }

  /**
   * Get nearby facilities
   */
  async getNearbyFacilities(latitude: number, longitude: number, radius: number = 50): Promise<Facility[]> {
    return httpClient.get<Facility[]>('/facilities/nearby', {
      params: { latitude, longitude, radius }
    });
  }

  /**
   * Get facility amenities
   */
  async getFacilityAmenities(facilityCode: string): Promise<FacilityAmenity[]> {
    return httpClient.get<FacilityAmenity[]>(`/facility-amenities/${facilityCode}`);
  }

  /**
   * Add amenity to facility
   */
  async addFacilityAmenity(data: CreateFacilityAmenityRequest): Promise<FacilityAmenity> {
    return httpClient.post<FacilityAmenity>('/facility-amenity', data);
  }

  /**
   * Remove amenity from facility
   */
  async removeFacilityAmenity(facilityAmenityId: number): Promise<{ message: string }> {
    return httpClient.delete<{ message: string }>(`/facility-amenity/${facilityAmenityId}`);
  }

  /**
   * Update facility amenity
   */
  async updateFacilityAmenity(facilityAmenityId: number, data: Partial<{
    basePrice: number;
    unit: string;
    capacity: number;
    status: string;
  }>): Promise<FacilityAmenity> {
    return httpClient.put<FacilityAmenity>(`/facility-amenity/${facilityAmenityId}`, data);
  }

  /**
   * Upload facility images
   */
  async uploadFacilityImages(facilityCode: string, files: File[]): Promise<{ images: string[] }> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });
    
    return httpClient.post<{ images: string[] }>(`/facilities/${facilityCode}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * Get facility statistics
   */
  async getFacilityStats(): Promise<{
    totalFacilities: number;
    facilitiesByType: Record<string, number>;
    facilitiesByCity: Record<string, number>;
    activeFacilities: number;
  }> {
    return httpClient.get<{
      totalFacilities: number;
      facilitiesByType: Record<string, number>;
      facilitiesByCity: Record<string, number>;
      activeFacilities: number;
    }>('/admin/facilities/stats');
  }

  /**
   * Toggle facility status
   */
  async toggleFacilityStatus(code: string): Promise<Facility> {
    return httpClient.patch<Facility>(`/facilities/${code}/toggle-status`);
  }

  /**
   * Get featured facilities
   */
  async getFeaturedFacilities(limit: number = 6): Promise<Facility[]> {
    return httpClient.get<Facility[]>('/facilities/featured', { params: { limit } });
  }

  /**
   * Rate facility
   */
  async rateFacility(facilityCode: string, rating: number, comment?: string): Promise<{
    message: string;
    averageRating: number;
  }> {
    return httpClient.post<{
      message: string;
      averageRating: number;
    }>(`/facilities/${facilityCode}/rate`, { rating, comment });
  }

  /**
   * Get facility ratings
   */
  async getFacilityRatings(facilityCode: string): Promise<{
    averageRating: number;
    totalRatings: number;
    ratingDistribution: Record<string, number>;
  }> {
    return httpClient.get<{
      averageRating: number;
      totalRatings: number;
      ratingDistribution: Record<string, number>;
    }>(`/facilities/${facilityCode}/ratings`);
  }
}

// Export singleton instance
export const facilityService = new FacilityService();
export default facilityService;
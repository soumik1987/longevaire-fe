import httpClient from './httpClient';
import type {
  Country,
  City
} from '../types/api';

class LocationService {
  /**
   * Get all countries
   */
  async getCountries(): Promise<Country[]> {
    return httpClient.get<Country[]>('/locations/countries');
  }

  /**
   * Get cities by country code
   */
  async getCitiesByCountry(countryCode: string): Promise<City[]> {
    return httpClient.get<City[]>(`/locations/countries/${countryCode}/cities`);
  }

  /**
   * Get countries with their cities
   */
  async getCountriesWithCities(): Promise<Country[]> {
    return httpClient.get<Country[]>('/locations/countries-cities');
  }

  /**
   * Get cities by legacy country ID (for backward compatibility)
   */
  async getCitiesByCountryId(countryId: number): Promise<City[]> {
    return httpClient.get<City[]>(`/locations/cities/${countryId}`);
  }

  /**
   * Search locations by name
   */
  async searchLocations(query: string): Promise<{
    countries: Country[];
    cities: City[];
  }> {
    return httpClient.get<{
      countries: Country[];
      cities: City[];
    }>('/locations/search', { params: { q: query } });
  }

  /**
   * Get popular destinations
   */
  async getPopularDestinations(limit: number = 10): Promise<City[]> {
    return httpClient.get<City[]>('/locations/popular-destinations', { params: { limit } });
  }

  /**
   * Get country by code
   */
  async getCountryByCode(code: string): Promise<Country> {
    return httpClient.get<Country>(`/locations/countries/${code}`);
  }

  /**
   * Get city by code
   */
  async getCityByCode(code: string): Promise<City> {
    return httpClient.get<City>(`/locations/cities/${code}`);
  }

  /**
   * Get nearby cities
   */
  async getNearbyCities(latitude: number, longitude: number, radius: number = 100): Promise<City[]> {
    return httpClient.get<City[]>('/locations/nearby-cities', {
      params: { latitude, longitude, radius }
    });
  }

  /**
   * Get location statistics
   */
  async getLocationStats(): Promise<{
    totalCountries: number;
    totalCities: number;
    countriesWithPrograms: number;
    citiesWithPrograms: number;
  }> {
    return httpClient.get<{
      totalCountries: number;
      totalCities: number;
      countriesWithPrograms: number;
      citiesWithPrograms: number;
    }>('/locations/stats');
  }

  /**
   * Create new city (Admin only)
   */
  async createCity(data: {
    name: string;
    code: string;
    slug: string;
    countryCode: string;
    status: string;
    images: string[];
  }): Promise<City> {
    return httpClient.post<City>('/admin/locations/cities', data);
  }

  /**
   * Update city (Admin only)
   */
  async updateCity(code: string, data: Partial<{
    name: string;
    slug: string;
    status: string;
    images: string[];
  }>): Promise<City> {
    return httpClient.put<City>(`/admin/locations/cities/${code}`, data);
  }

  /**
   * Create new country (Admin only)
   */
  async createCountry(data: {
    name: string;
    code: string;
    slug: string;
    status: string;
    images: string[];
  }): Promise<Country> {
    return httpClient.post<Country>('/admin/locations/countries', data);
  }

  /**
   * Update country (Admin only)
   */
  async updateCountry(code: string, data: Partial<{
    name: string;
    slug: string;
    status: string;
    images: string[];
  }>): Promise<Country> {
    return httpClient.put<Country>(`/admin/locations/countries/${code}`, data);
  }

  /**
   * Delete city (Admin only)
   */
  async deleteCity(code: string): Promise<{ message: string }> {
    return httpClient.delete<{ message: string }>(`/admin/locations/cities/${code}`);
  }

  /**
   * Delete country (Admin only)
   */
  async deleteCountry(code: string): Promise<{ message: string }> {
    return httpClient.delete<{ message: string }>(`/admin/locations/countries/${code}`);
  }
}

// Export singleton instance
export const locationService = new LocationService();
export default locationService;
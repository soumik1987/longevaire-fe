import httpClient from './httpClient';
import type {
  Booking,
  CreateBookingRequest,
  PaginatedResponse
} from '../types/api';

class BookingService {
  /**
   * Create a new booking
   */
  async createBooking(data: CreateBookingRequest): Promise<Booking> {
    return httpClient.post<Booking>('/bookings', data);
  }

  /**
   * Get booking by code
   */
  async getBookingByCode(code: string): Promise<Booking> {
    return httpClient.get<Booking>(`/bookings/${code}`);
  }

  /**
   * Get user bookings
   */
  async getUserBookings(userCode: string): Promise<Booking[]> {
    return httpClient.get<Booking[]>(`/bookings/user/${userCode}`);
  }

  /**
   * Get all bookings (Admin only)
   */
  async getAllBookings(): Promise<Booking[]> {
    return httpClient.get<Booking[]>('/admin/bookings');
  }

  /**
   * Update booking status
   */
  async updateBookingStatus(code: string, status: string): Promise<Booking> {
    return httpClient.patch<Booking>(`/bookings/${code}/status`, { status });
  }

  /**
   * Cancel booking
   */
  async cancelBooking(code: string): Promise<Booking> {
    return httpClient.patch<Booking>(`/bookings/${code}/cancel`);
  }

  /**
   * Get upcoming bookings for user
   */
  async getUpcomingBookings(userCode: string): Promise<Booking[]> {
    const now = new Date().toISOString();
    return httpClient.get<Booking[]>(`/bookings/user/${userCode}`, {
      params: { startDate: now, sort: 'startDate:asc' }
    });
  }

  /**
   * Get past bookings for user
   */
  async getPastBookings(userCode: string): Promise<Booking[]> {
    const now = new Date().toISOString();
    return httpClient.get<Booking[]>(`/bookings/user/${userCode}`, {
      params: { endDate: now, sort: 'endDate:desc' }
    });
  }

  /**
   * Get bookings by program
   */
  async getBookingsByProgram(programCode: string): Promise<Booking[]> {
    return httpClient.get<Booking[]>(`/bookings/program/${programCode}`);
  }

  /**
   * Check booking availability
   */
  async checkAvailability(programCode: string, startDate: string, endDate: string): Promise<{
    available: boolean;
    capacity?: number;
    booked?: number;
  }> {
    return httpClient.get<{
      available: boolean;
      capacity?: number;
      booked?: number;
    }>(`/bookings/availability/${programCode}`, {
      params: { startDate, endDate }
    });
  }
}

// Export singleton instance
export const bookingService = new BookingService();
export default bookingService;
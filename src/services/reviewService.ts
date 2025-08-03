import httpClient from './httpClient';
import type {
  Review,
  CreateReviewRequest
} from '../types/api';

class ReviewService {
  /**
   * Create a new review
   */
  async createReview(data: CreateReviewRequest): Promise<Review> {
    return httpClient.post<Review>('/reviews', data);
  }

  /**
   * Get reviews for a specific program
   */
  async getProgramReviews(programCode: string): Promise<Review[]> {
    return httpClient.get<Review[]>(`/reviews/${programCode}`);
  }

  /**
   * Get user's reviews
   */
  async getUserReviews(userCode: string): Promise<Review[]> {
    return httpClient.get<Review[]>(`/reviews/user/${userCode}`);
  }

  /**
   * Update a review
   */
  async updateReview(reviewId: number, data: {
    rating?: number;
    comment?: string;
  }): Promise<Review> {
    return httpClient.put<Review>(`/reviews/${reviewId}`, data);
  }

  /**
   * Delete a review
   */
  async deleteReview(reviewId: number): Promise<{ message: string }> {
    return httpClient.delete<{ message: string }>(`/reviews/${reviewId}`);
  }

  /**
   * Get review by ID
   */
  async getReviewById(reviewId: number): Promise<Review> {
    return httpClient.get<Review>(`/reviews/${reviewId}`);
  }

  /**
   * Get program rating summary
   */
  async getProgramRatingSummary(programCode: string): Promise<{
    averageRating: number;
    totalReviews: number;
    ratingDistribution: Record<string, number>;
  }> {
    return httpClient.get<{
      averageRating: number;
      totalReviews: number;
      ratingDistribution: Record<string, number>;
    }>(`/reviews/${programCode}/summary`);
  }

  /**
   * Get featured reviews (highly rated reviews)
   */
  async getFeaturedReviews(limit: number = 6): Promise<Review[]> {
    return httpClient.get<Review[]>('/reviews/featured', { params: { limit } });
  }

  /**
   * Report a review (for inappropriate content)
   */
  async reportReview(reviewId: number, reason: string): Promise<{ message: string }> {
    return httpClient.post<{ message: string }>(`/reviews/${reviewId}/report`, { reason });
  }

  /**
   * Like a review
   */
  async likeReview(reviewId: number): Promise<{ message: string; likes: number }> {
    return httpClient.post<{ message: string; likes: number }>(`/reviews/${reviewId}/like`);
  }

  /**
   * Unlike a review
   */
  async unlikeReview(reviewId: number): Promise<{ message: string; likes: number }> {
    return httpClient.delete<{ message: string; likes: number }>(`/reviews/${reviewId}/like`);
  }

  /**
   * Get recent reviews
   */
  async getRecentReviews(limit: number = 10): Promise<Review[]> {
    return httpClient.get<Review[]>('/reviews/recent', { params: { limit } });
  }

  /**
   * Moderate reviews (Admin only)
   */
  async moderateReview(reviewId: number, action: 'approve' | 'reject' | 'flag'): Promise<Review> {
    return httpClient.patch<Review>(`/admin/reviews/${reviewId}/moderate`, { action });
  }

  /**
   * Get all reviews for moderation (Admin only)
   */
  async getReviewsForModeration(params?: {
    status?: 'pending' | 'approved' | 'rejected';
    page?: number;
    pageSize?: number;
  }): Promise<{
    reviews: Review[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    return httpClient.get<{
      reviews: Review[];
      total: number;
      page: number;
      pageSize: number;
    }>('/admin/reviews', { params });
  }
}

// Export singleton instance
export const reviewService = new ReviewService();
export default reviewService;
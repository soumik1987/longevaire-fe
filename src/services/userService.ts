import httpClient from './httpClient';
import type {
  User,
  UserDashboard
} from '../types/api';

class UserService {
  /**
   * Get user by code
   */
  async getUserByCode(userCode: string): Promise<User> {
    return httpClient.get<User>(`/users/${userCode}`);
  }

  /**
   * Update user profile
   */
  async updateUser(userCode: string, data: Partial<{
    email: string;
    role: 'user' | 'facility' | 'admin';
    profile?: Record<string, any>;
  }>): Promise<User> {
    return httpClient.put<User>(`/users/${userCode}`, data);
  }

  /**
   * Get user dashboard data
   */
  async getUserDashboard(): Promise<UserDashboard> {
    return httpClient.get<UserDashboard>('/user/dashboard');
  }

  /**
   * Update user profile information
   */
  async updateProfile(userCode: string, profileData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    dateOfBirth?: string;
    address?: string;
    city?: string;
    country?: string;
    preferences?: Record<string, any>;
  }): Promise<User> {
    return httpClient.put<User>(`/users/${userCode}/profile`, profileData);
  }

  /**
   * Change user password
   */
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ message: string }> {
    return httpClient.post<{ message: string }>('/users/change-password', data);
  }

  /**
   * Delete user account
   */
  async deleteAccount(userCode: string): Promise<{ message: string }> {
    return httpClient.delete<{ message: string }>(`/users/${userCode}`);
  }

  /**
   * Get user preferences
   */
  async getUserPreferences(userCode: string): Promise<Record<string, any>> {
    return httpClient.get<Record<string, any>>(`/users/${userCode}/preferences`);
  }

  /**
   * Update user preferences
   */
  async updateUserPreferences(userCode: string, preferences: Record<string, any>): Promise<Record<string, any>> {
    return httpClient.put<Record<string, any>>(`/users/${userCode}/preferences`, preferences);
  }

  /**
   * Upload user avatar
   */
  async uploadAvatar(userCode: string, file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    return httpClient.post<{ avatarUrl: string }>(`/users/${userCode}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * Get user statistics (for admins)
   */
  async getUserStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    newUsersThisMonth: number;
    usersByRole: Record<string, number>;
  }> {
    return httpClient.get<{
      totalUsers: number;
      activeUsers: number;
      newUsersThisMonth: number;
      usersByRole: Record<string, number>;
    }>('/admin/users/stats');
  }

  /**
   * Get all users (Admin only)
   */
  async getAllUsers(params?: {
    page?: number;
    pageSize?: number;
    role?: string;
    status?: string;
    search?: string;
  }): Promise<{
    users: User[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    return httpClient.get<{
      users: User[];
      total: number;
      page: number;
      pageSize: number;
    }>('/admin/users', { params });
  }

  /**
   * Update user role (Admin only)
   */
  async updateUserRole(userCode: string, role: 'user' | 'facility' | 'admin'): Promise<User> {
    return httpClient.patch<User>(`/admin/users/${userCode}/role`, { role });
  }

  /**
   * Suspend user (Admin only)
   */
  async suspendUser(userCode: string): Promise<{ message: string }> {
    return httpClient.patch<{ message: string }>(`/admin/users/${userCode}/suspend`);
  }

  /**
   * Unsuspend user (Admin only)
   */
  async unsuspendUser(userCode: string): Promise<{ message: string }> {
    return httpClient.patch<{ message: string }>(`/admin/users/${userCode}/unsuspend`);
  }
}

// Export singleton instance
export const userService = new UserService();
export default userService;
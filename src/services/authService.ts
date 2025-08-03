import httpClient, { TokenManager } from './httpClient';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  GoogleLoginRequest,
  OTPRequest,
  VerifyOTPRequest,
  RefreshTokenRequest,
  User,
  ApiResponse
} from '../types/api';

class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>('/auth/register', data);
    
    // Store tokens after successful registration
    if (response.accessToken) {
      TokenManager.setAccessToken(response.accessToken);
    }
    
    return response;
  }

  /**
   * Login with email and password
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>('/auth/login', data);
    
    // Store tokens after successful login
    if (response.accessToken) {
      TokenManager.setAccessToken(response.accessToken);
    }
    
    return response;
  }

  /**
   * Login with Google token
   */
  async googleLogin(data: GoogleLoginRequest): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>('/auth/google-login', data);
    
    // Store tokens after successful Google login
    if (response.accessToken) {
      TokenManager.setAccessToken(response.accessToken);
    }
    
    return response;
  }

  /**
   * Send OTP to phone number
   */
  async sendOTP(data: OTPRequest): Promise<{ message: string }> {
    return httpClient.post<{ message: string }>('/auth/send-otp', data);
  }

  /**
   * Verify OTP and get access token
   */
  async verifyOTP(data: VerifyOTPRequest): Promise<{ accessToken: string }> {
    const response = await httpClient.post<{ accessToken: string }>('/auth/verify-otp', data);
    
    // Store token after successful OTP verification
    if (response.accessToken) {
      TokenManager.setAccessToken(response.accessToken);
    }
    
    return response;
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<{ user: User }> {
    return httpClient.get<{ user: User }>('/auth/profile');
  }

  /**
   * Refresh access token
   */
  async refreshToken(data: RefreshTokenRequest): Promise<{ accessToken: string }> {
    const response = await httpClient.post<{ accessToken: string }>('/auth/refresh-token', data);
    
    // Update stored token
    if (response.accessToken) {
      TokenManager.setAccessToken(response.accessToken);
    }
    
    return response;
  }

  /**
   * Logout user
   */
  async logout(): Promise<{ message: string }> {
    try {
      const response = await httpClient.post<{ message: string }>('/auth/logout');
      return response;
    } finally {
      // Always clear tokens, even if logout request fails
      this.clearAuth();
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = TokenManager.getAccessToken();
    if (!token) return false;

    // Check if token is expired (basic check)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return payload.exp > now;
    } catch {
      return false;
    }
  }

  /**
   * Get current access token
   */
  getAccessToken(): string | null {
    return TokenManager.getAccessToken();
  }

  /**
   * Get current refresh token
   */
  getRefreshToken(): string | null {
    return TokenManager.getRefreshToken();
  }

  /**
   * Clear authentication data
   */
  clearAuth(): void {
    TokenManager.clearTokens();
  }

  /**
   * Set authentication tokens
   */
  setTokens(accessToken: string, refreshToken?: string): void {
    TokenManager.setTokens(accessToken, refreshToken);
  }

  /**
   * Get user data from token (without API call)
   */
  getUserFromToken(): User | null {
    const token = TokenManager.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.id || payload.userId,
        email: payload.email,
        role: payload.role,
        code: payload.code || payload.userCode,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
      };
    } catch {
      return null;
    }
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: 'user' | 'facility' | 'admin'): boolean {
    const user = this.getUserFromToken();
    return user?.role === role;
  }

  /**
   * Check if user is admin
   */
  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  /**
   * Check if user is facility
   */
  isFacility(): boolean {
    return this.hasRole('facility');
  }

  /**
   * Check if user is regular user
   */
  isUser(): boolean {
    return this.hasRole('user');
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
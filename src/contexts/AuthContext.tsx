import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services';
import type { User, LoginRequest, RegisterRequest, GoogleLoginRequest, OTPRequest, VerifyOTPRequest } from '../types/api';

interface AuthContextType {
  // State
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Methods
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  googleLogin: (data: GoogleLoginRequest) => Promise<void>;
  sendOTP: (data: OTPRequest) => Promise<void>;
  verifyOTP: (data: VerifyOTPRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearError: () => void;
  
  // Error state
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user && authService.isAuthenticated();

  // Initialize auth state
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      
      // Check if user is authenticated
      if (authService.isAuthenticated()) {
        // Try to get user from token first (faster)
        const userFromToken = authService.getUserFromToken();
        if (userFromToken) {
          setUser(userFromToken);
        }
        
        // Then refresh from server to get latest data
        try {
          const response = await authService.getProfile();
          setUser(response.user);
        } catch (error) {
          // If profile fetch fails, clear auth
          console.error('Failed to fetch profile:', error);
          await handleLogout();
        }
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.login(data);
      setUser(response.user);
    } catch (error: any) {
      setError(error.error || error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.register(data);
      setUser(response.user);
    } catch (error: any) {
      setError(error.error || error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (data: GoogleLoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.googleLogin(data);
      setUser(response.user);
    } catch (error: any) {
      setError(error.error || error.message || 'Google login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async (data: OTPRequest) => {
    try {
      setError(null);
      await authService.sendOTP(data);
    } catch (error: any) {
      setError(error.error || error.message || 'Failed to send OTP');
      throw error;
    }
  };

  const handleVerifyOTP = async (data: VerifyOTPRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await authService.verifyOTP(data);
      // After OTP verification, get user profile
      const response = await authService.getProfile();
      setUser(response.user);
    } catch (error: any) {
      setError(error.error || error.message || 'OTP verification failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setError(null);
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('Not authenticated');
      }
      
      const response = await authService.getProfile();
      setUser(response.user);
    } catch (error: any) {
      setError(error.error || error.message || 'Failed to refresh profile');
      throw error;
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Listen for auth changes (e.g., token expiration)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken') {
        if (!e.newValue) {
          // Token was cleared
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login: handleLogin,
    register: handleRegister,
    googleLogin: handleGoogleLogin,
    sendOTP: handleSendOTP,
    verifyOTP: handleVerifyOTP,
    logout: handleLogout,
    refreshProfile,
    clearError,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-order component for protected routes
interface RequireAuthProps {
  children: ReactNode;
  fallback?: ReactNode;
  roles?: ('user' | 'facility' | 'admin')[];
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ 
  children, 
  fallback = <div>Please log in to access this page.</div>,
  roles 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <>{fallback}</>;
  }

  // Check role-based access
  if (roles && !roles.includes(user.role)) {
    return <div>You don't have permission to access this page.</div>;
  }

  return <>{children}</>;
};

// Hook for role-based access
export const useRole = () => {
  const { user } = useAuth();
  
  return {
    isAdmin: user?.role === 'admin',
    isFacility: user?.role === 'facility',
    isUser: user?.role === 'user',
    hasRole: (role: 'user' | 'facility' | 'admin') => user?.role === role,
    hasAnyRole: (roles: ('user' | 'facility' | 'admin')[]) => roles.includes(user?.role as any),
  };
};

export default AuthContext;

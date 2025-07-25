import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'user' | 'facility' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('wellness_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (
          parsedUser &&
          ['user', 'facility', 'admin'].includes(parsedUser.role)
        ) {
          setUser(parsedUser as User);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Failed to parse stored user:', err);
      }
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const storedUsers = JSON.parse(localStorage.getItem('wellness_users') || '[]');
    const foundUser = storedUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser && ['user', 'facility', 'admin'].includes(foundUser.role)) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      setIsAuthenticated(true);
      localStorage.setItem('wellness_user', JSON.stringify(userWithoutPassword));
      return true;
    }

    // Test fallback users
    const testUsers = [
      { id: '1', firstName: 'Soumik', lastName: 'Ghosh', email: 'test@user.com', phone: '+91 98197-51677', role: 'user', password: 'password' },
      { id: '2', firstName: 'John', lastName: 'Doe', email: 'test@facility.com', phone: '+1 555-0123', role: 'facility', password: 'password' },
      { id: '3', firstName: 'Admin', lastName: 'User', email: 'test@admin.com', phone: '+1 555-0124', role: 'admin', password: 'password' }
    ];

    const testUser = testUsers.find(u => u.email === email && u.password === password);
    if (testUser) {
      const { password: _, ...userWithoutPassword } = testUser;
      setUser(userWithoutPassword as User);
      setIsAuthenticated(true);
      localStorage.setItem('wellness_user', JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  const signUp = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('wellness_users') || '[]');

      if (storedUsers.find((u: any) => u.email === userData.email)) {
        return false;
      }

      const newUser = {
        ...userData,
        id: Date.now().toString()
      };

      storedUsers.push(newUser);
      localStorage.setItem('wellness_users', JSON.stringify(storedUsers));

      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword as User);
      setIsAuthenticated(true);
      localStorage.setItem('wellness_user', JSON.stringify(userWithoutPassword));

      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('wellness_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

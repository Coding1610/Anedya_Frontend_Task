import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AuthToken, User, UserRole } from '@/types/auth';
import { mockLogin, mockLogout } from '@/lib/mockApi';

// type of auth context
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

// create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// storage key for stored auth token
const AUTH_STORAGE_KEY = 'dashboard_auth_token';

// create custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// wrap our app with theme provider
interface AuthProviderProps {
  children: React.ReactNode;
}

// create provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // load auth state from localStorage on mount
  useEffect(() => {
    const loadStoredAuth = () => {
      try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const authData: AuthToken = JSON.parse(stored);
          
          // check if token is still valid
          if (authData.expiresAt > Date.now()) {
            setUser(authData.user);
            setToken(authData.token);
          } else {
            // if token expired then clear storage
            localStorage.removeItem(AUTH_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error('Failed to load auth state:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  // login function
  const login = useCallback(async (role?: UserRole) => {
    setIsLoading(true);
    try {
      const authData = await mockLogin(role);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
      setUser(authData.user);
      setToken(authData.token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // logout function
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await mockLogout();
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // context value
  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    logout,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  
};

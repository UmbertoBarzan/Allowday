import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { apiClient } from '../services/apiClient';

export interface PlannerSettingsSnapshot {
  monthlyIncome: number;
  recurring: number;
  extraSavings: number;
  days: number;
  mode: 'soft' | 'hard';
  updatedAt?: string;
}

export interface AuthUser {
  id: number;
  email: string;
  fullName?: string | null;
  createdAt?: string;
  settings?: PlannerSettingsSnapshot | null;
}

interface AuthResponse {
  token: string;
  user: AuthUser;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName?: string) => Promise<void>;
  logout: () => void;
}

const STORAGE_KEY = 'allowday.auth';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as AuthResponse;
        setUser(parsed.user);
        setToken(parsed.token);
      } catch (error) {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (token && user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [token, user]);

  const login = async (email: string, password: string) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    setUser(response.user);
    setToken(response.token);
  };

  const register = async (email: string, password: string, fullName?: string) => {
    const response = await apiClient.post<AuthResponse>('/auth/register', { email, password, fullName });
    setUser(response.user);
    setToken(response.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({ user, token, loading, login, register, logout }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve essere usato all’interno di AuthProvider');
  }
  return ctx;
}

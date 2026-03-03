'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { login as authLogin, logout as authLogout, getSession } from '@/services/auth/authService';
import type { AuthSession, LoginCredentials, User } from '@/types';

interface AuthContextValue {
  session: AuthSession | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(() => {
    const current = getSession();
    setSession(current);
  }, []);

  useEffect(() => {
    refreshSession();
    setIsLoading(false);
  }, [refreshSession]);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    const newSession = await authLogin(credentials);
    if (newSession) {
      setSession(newSession);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(async () => {
    await authLogout();
    setSession(null);
  }, []);

  const value: AuthContextValue = {
    session,
    user: session?.user ?? null,
    isLoading,
    isAuthenticated: !!session,
    login,
    logout,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

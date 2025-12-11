import type { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';
import React, { useState, useEffect, useContext, useCallback, createContext } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import * as AuthService from 'src/api/services/auth';

type User = any;

type AuthContextType = {
  user: User | null;
  loading: boolean;
  fetchMe: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (u: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMe = useCallback(async () => {
    setLoading(true);
    try {
      const data = await AuthService.getMe();
      setUser(data ?? null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
    } catch (err) {
      // ignore
    } finally {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    void fetchMe();
  }, [fetchMe]);

  return (
    <AuthContext.Provider value={{ user, loading, fetchMe, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

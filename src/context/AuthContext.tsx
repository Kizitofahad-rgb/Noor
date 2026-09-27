import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
}

export interface UserProgressItem {
  id: string;
  userId: string;
  surahId?: string | null;
  verseId?: string | null;
  status: string;
  updatedAt: string;
}

export interface UserSubmittedReel {
  id: string;
  userId: string;
  videoUrl: string;
  caption: string;
  status: 'pending' | 'approved' | 'rejected' | string;
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, displayName: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (displayName: string) => Promise<boolean>;
  clearError: () => void;
  // Auth Modal Controls
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  // Progress and Reels helpers
  userProgress: UserProgressItem[];
  userReels: UserSubmittedReel[];
  refreshProgress: () => Promise<void>;
  refreshUserReels: () => Promise<void>;
  saveProgress: (surahId?: string | number, verseId?: string | number, status?: string) => Promise<boolean>;
  submitUserReel: (videoUrl: string, caption: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const [userProgress, setUserProgress] = useState<UserProgressItem[]>([]);
  const [userReels, setUserReels] = useState<UserSubmittedReel[]>([]);

  // Check current session from /api/auth/me on load
  const checkSession = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const refreshProgress = useCallback(async () => {
    if (!user) {
      setUserProgress([]);
      return;
    }
    try {
      const res = await fetch('/api/progress');
      if (res.ok) {
        const data = await res.json();
        setUserProgress(data.progress || []);
      }
    } catch (err) {
      console.error('Failed to load user progress:', err);
    }
  }, [user]);

  const refreshUserReels = useCallback(async () => {
    if (!user) {
      setUserReels([]);
      return;
    }
    try {
      const res = await fetch('/api/reels/user');
      if (res.ok) {
        const data = await res.json();
        setUserReels(data.reels || []);
      }
    } catch (err) {
      console.error('Failed to load user submitted reels:', err);
    }
  }, [user]);

  // Load progress and submitted reels whenever user changes
  useEffect(() => {
    if (user) {
      refreshProgress();
      refreshUserReels();
    } else {
      setUserProgress([]);
      setUserReels([]);
    }
  }, [user, refreshProgress, refreshUserReels]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to sign in. Please verify your credentials.');
        return false;
      }

      setUser(data.user);
      setIsAuthModalOpen(false);
      return true;
    } catch {
      setError('Network error occurred. Please try again.');
      return false;
    }
  };

  const signup = async (email: string, password: string, displayName: string): Promise<boolean> => {
    try {
      setError(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create account.');
        return false;
      }

      setUser(data.user);
      setIsAuthModalOpen(false);
      return true;
    } catch {
      setError('Network error occurred. Please try again.');
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      setUser(null);
      setUserProgress([]);
      setUserReels([]);
    }
  };

  const updateProfile = async (displayName: string): Promise<boolean> => {
    try {
      setError(null);
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to update profile name.');
        return false;
      }

      setUser(data.user);
      return true;
    } catch {
      setError('Failed to update profile.');
      return false;
    }
  };

  const saveProgress = async (
    surahId?: string | number,
    verseId?: string | number,
    status = 'practiced'
  ): Promise<boolean> => {
    if (!user) {
      openAuthModal('login');
      return false;
    }

    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surahId: surahId ? String(surahId) : null,
          verseId: verseId ? String(verseId) : null,
          status,
        }),
      });

      if (res.ok) {
        await refreshProgress();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const submitUserReel = async (videoUrl: string, caption: string): Promise<boolean> => {
    if (!user) {
      openAuthModal('login');
      return false;
    }

    try {
      const res = await fetch('/api/reels/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl, caption }),
      });

      if (res.ok) {
        await refreshUserReels();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setError(null);
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setError(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        signup,
        logout,
        updateProfile,
        clearError,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        userProgress,
        userReels,
        refreshProgress,
        refreshUserReels,
        saveProgress,
        submitUserReel,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

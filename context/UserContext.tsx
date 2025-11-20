"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { User } from '@/lib/db.interfaces';

// Note: Ensure User interface in lib/db.interfaces matches the actual shape of data returned by /api/account/status
// which might include new fields like emailConsent, emailLanguage etc.

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  checkUserStatus: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkUserStatus = async () => {
    // Do not set isLoading(true) here if user is already loaded to prevent UI flickering
    // Only initial load needs full blocking loading state if desired.
    // But we might want a "refreshing" state? For now, simple is fine.

    try {
      // Add timestamp to prevent browser caching
      const res = await fetch(`/api/account/status?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
              'Pragma': 'no-cache',
          }
      });

      if (res.ok) {
        const data = await res.json();
        if (data.isLoggedIn) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to check user status", error);
      // Don't clear user on network error to allow offline persistence if implemented later
      // setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const login = async (loginData: any) => {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
    });
    const data = await res.json();
    if (data.success) {
        setUser(data.user);
    } else {
        throw new Error(data.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
        await fetch('/api/logout', { method: 'POST' });
        setUser(null);
        // Force reload to clear any other state
        window.location.href = '/';
    } catch (error) {
        console.error("Logout API error:", error);
    }
  };

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading,
    setUser,
    login,
    logout,
    checkUserStatus,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

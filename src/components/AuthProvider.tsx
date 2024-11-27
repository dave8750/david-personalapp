// src/app/(public)/auth/auth-provider.tsx

'use client'; // Make this file a client component

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // Use next-auth's useSession hook

// Define AuthContext
const AuthContext = createContext<any>(null);

// Custom hook to access authentication state
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component to wrap your app and provide authentication state
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession(); // Use next-auth's useSession hook
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check session status and update authentication state
    if (status === 'authenticated') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [status]); // Re-run when session status changes

  // Provide session and authentication state through context
  return (
    <AuthContext.Provider value={{ session, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// src/app/auth/layout.tsx
'use client'; // Ensure this is a client component

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'; // Import useSession
import { useRouter } from 'next/navigation';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession(); // Use session data from next-auth
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait for session loading to finish
    if (session) {
      setIsAuthenticated(true); // Set authenticated state if session exists
    } else {
      setIsAuthenticated(false); // Set unauthenticated state if no session
      // Optionally, redirect to login page if not authenticated
      router.push('/auth/prihlasenie');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Optionally show a loading state while session is being fetched
  }

  if (isAuthenticated === null) return null; // Prevent rendering until authentication state is determined

  return <>{children}</>; // Only render children if authenticated
};

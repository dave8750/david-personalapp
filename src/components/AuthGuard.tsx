// src/components/AuthGuard.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';


export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth(); // Access authentication state from the context

  useEffect(() => {
    if (isAuthenticated === false) {
      // Redirect to login page if not authenticated
      router.push('/auth/prihlasenie');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return <p>LOADING...</p>; // Show loading state while authentication is being checked
  }

  if (isAuthenticated) {
    return <>{children}</>; // Render children if authenticated
  }

  return null; // Render nothing if not authenticated
}

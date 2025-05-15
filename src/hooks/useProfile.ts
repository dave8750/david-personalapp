import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export interface Profile {
  bio?: string;
  location?: string;
  avatarUrl?: string;
  interests?: string[];
}

export function useProfile() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!session?.user) return;
    
    try {
      setIsLoading(true);
      const res = await fetch('/api/profile');
      
      // If profile doesn't exist, create a new one
      if (res.status === 404) {
        const newProfile = await createInitialProfile();
        setProfile(newProfile);
        setError(null);
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to fetch profile');
      }
      
      const data = await res.json();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const createInitialProfile = async () => {
    if (!session?.user) return null;

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bio: '',
          location: '',
          avatarUrl: session.user.image || '',
          interests: [],
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create initial profile');
      }

      return await res.json();
    } catch (err) {
      console.error('Error creating initial profile:', err);
      throw err;
    }
  };

  const updateProfile = async (updatedProfile: Partial<Profile>) => {
    if (!session?.user) return;

    try {
      setIsLoading(true);
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await res.json();
      setProfile(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [session?.user]);

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
  };
} 
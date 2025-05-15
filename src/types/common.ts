export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface Profile {
  id: string;
  userId: string;
  bio: string | null;
  location: string | null;
  avatarUrl: string | null;
  interests: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ExtendedUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  posts?: any[];
  followers?: any[];
  following?: any[];
} 
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

// React imports
import { useEffect, useState, useCallback } from "react";

// Next.js imports
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

// MUI imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { Tab, Tabs } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// MUI Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import GridViewIcon from "@mui/icons-material/GridView";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExploreIcon from "@mui/icons-material/Explore";

// Server action import
import { fetchProfilesCursor, followUser, unfollowUser, type ProfileWithUser, fetchProfile, fetchUserBookmarks } from "@/app/actions/profiles";

// Add PostImage component import
import FeedPostImageCarousel from "@/components/FeedPostImageCarousel";

// Types
import { LoadingState, Profile, ExtendedUser } from '@/types/common';

// Update Post interface to handle both old and new image structure
interface Post {
  id: string;
  caption: string | null;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
  comments?: any[];
  likes?: any[];
  bookmarks?: any[];
  // Support both the old imageUrl field and the new images array
  imageUrl?: string;
  images?: {
    id: string;
    imageUrl: string;
    order: number;
  }[];
}

// Remove or rename your local Profile interface to avoid conflict
// For example, rename it to UserProfile
interface UserProfile {
  id: string;
  userId: string;
  bio: string | null;
  location: string | null;
  avatarUrl: string | null;
  interests: string[];
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    name: string | null;
    email: string;
    posts?: any[];
    followers?: any[];
    following?: any[];
  };
}

// Define this interface to be compatible with both old and new data structures
interface BookmarkedPost {
  id: string;
  userId: string;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  user: {
    id: string;
    name: string | null;
    email: string;
  };
  // Support both the old imageUrl field and the new images array
  imageUrl?: string;
  images?: {
    id: string;
    imageUrl: string;
    order: number;
  }[];
}

// Update this interface to be compatible with both old and new data structures
interface ProfilePost {
  id: string;
  userId: string;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  // Support both the old imageUrl field and the new images array
  imageUrl?: string;
  images?: {
    id: string;
    imageUrl: string;
    order: number;
  }[];
}

import { getAvatarUrl } from "@/utils/avatar";

/**
 * ProfilesView Component
 * 
 * Displays a searchable list of user profiles with follow functionality.
 * Features:
 * - Search users by name
 * - Follow/unfollow users
 * - View user stats (posts, followers, following)
 * - View recent posts grid
 * - Navigate to detailed profile view
 */
const ProfileView = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<BookmarkedPost[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [notification, setNotification] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load current user's profile
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!session?.user?.email) {
        setIsLoading(false);
        return;
      }

      try {
        const fetchedProfile = await fetchProfile(session.user.id || session.user.email);
        if (fetchedProfile) {
          setUserProfile(fetchedProfile as any);
        } else {
          console.error('No profile found for user');
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [session]);

  // Load bookmarked posts when viewing bookmarks tab
  const loadBookmarkedPosts = useCallback(async () => {
    if (session?.user?.email) {
      try {
        const bookmarks = await fetchUserBookmarks();
        setBookmarkedPosts(bookmarks as unknown as BookmarkedPost[]);
      } catch (error) {
        console.error("Error loading bookmarked posts:", error);
        setNotification({
          message: "Nepodarilo sa načítať záložky",
          severity: "error"
        });
      }
    }
  }, [session]);

  useEffect(() => {
    if (activeTab === 1) {
      loadBookmarkedPosts();
    }
  }, [activeTab, loadBookmarkedPosts]);

  // Update post navigation
  const handlePostClick = (postId: string) => {
    router.push(`/prispevky/${postId}`);
  };

  // Helper function to get the appropriate image URL from a post
  const getPostImageUrl = (post: any): string => {
    if (post.images && post.images.length > 0) {
      const sortedImages = [...post.images].sort((a, b) => a.order - b.order);
      return sortedImages[0].imageUrl;
    }
    if (post.imageUrl) {
      return post.imageUrl;
    }
    return `https://api.dicebear.com/7.x/initials/svg?seed=${post.user.name || '?'}&backgroundColor=FF385C,1DA1F2`;
  };

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!session) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Prihláste sa
          </Typography>
          <Typography variant="body1">
            Pre zobrazenie profilu sa musíte prihlásiť.
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (!userProfile) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Profil sa nenašiel
          </Typography>
          <Typography variant="body1" paragraph>
            Vytvorte si svoj profil, aby ste mohli zdieľať viac informácií o sebe.
          </Typography>
          <Button 
            component={Link} 
            href="/profily/upravit" 
            variant="contained" 
            color="primary"
            startIcon={<PersonAddIcon />}
          >
            Vytvoriť profil
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container sx={{ 
      mt: { xs: 2, sm: 4 }, 
      mb: { xs: 8, sm: 10 }, 
      maxWidth: "md",
      px: { xs: 1, sm: 2, md: 3 }
    }}>
      {/* User profile card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', mb: 3 }}>
            <Avatar
              src={getAvatarUrl(userProfile?.user?.name || '', userProfile?.avatarUrl)}
              alt={userProfile?.user?.name || "Používateľ"}
              sx={{
                width: 100,
                height: 100,
                border: '2px solid white',
                background: 'linear-gradient(45deg, #FF385C, #1DA1F2)',
              }}
            >
              {userProfile?.user?.name?.[0] || 'U'}
            </Avatar>
            
            <Box sx={{ flexGrow: 1, ml: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h5" sx={{ mr: 2 }}>
                  {userProfile.user?.name || "Neznámy používateľ"}
                </Typography>
                <Button
                  component={Link}
                  href="/profil/settings"
                  variant="outlined"
                  startIcon={<EditIcon />}
                  size="small"
                >
                  Upraviť profil
                </Button>
              </Box>

              <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
                <Typography variant="body1">
                  <strong>{userProfile.user?.posts?.length || 0}</strong> príspevkov
                </Typography>
                <Typography variant="body1">
                  <strong>{userProfile.user?.followers?.length || 0}</strong> sledovateľov
                </Typography>
                <Typography variant="body1">
                  <strong>{userProfile.user?.following?.length || 0}</strong> sledovaných
                </Typography>
              </Stack>

              {userProfile.bio && (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {userProfile.bio}
                </Typography>
              )}
              
              {userProfile.location && (
                <Typography variant="body2" color="text.secondary">
                  📍 {userProfile.location}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        centered
        sx={{ mb: 2 }}
      >
        <Tab icon={<GridViewIcon />} label="Príspevky" />
        <Tab icon={<BookmarkIcon />} label="Záložky" />
      </Tabs>

      {activeTab === 0 ? (
        userProfile?.user?.posts && userProfile.user.posts.length > 0 ? (
          <ImageList cols={3} gap={2}>
            {userProfile.user.posts.map((post: any) => (
              <ImageListItem 
                key={post.id}
                sx={{
                  aspectRatio: '1/1',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.8 },
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
                onClick={() => handlePostClick(post.id)}
              >
                {post.images && post.images.length > 0 ? (
                  <FeedPostImageCarousel 
                    images={post.images}
                    aspectRatio="1/1"
                    onImageClick={() => handlePostClick(post.id)}
                  />
                ) : (
                  <Image
                    src={getPostImageUrl(post)}
                    alt={post.caption || ""}
                    fill
                    sizes="(max-width: 768px) 33vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <Typography 
            align="center" 
            color="text.secondary"
            sx={{ mt: 4 }}
          >
            Zatiaľ žiadne príspevky
          </Typography>
        )
      ) : (
        <>
          {bookmarkedPosts.length > 0 ? (
            <Grid container spacing={2}>
              {bookmarkedPosts.map((post) => (
                <Grid item xs={4} key={post.id}>
                  <Box
                    sx={{
                      position: 'relative',
                      pt: '100%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                    onClick={() => handlePostClick(post.id)}
                  >
                    {post.images && post.images.length > 0 ? (
                      <FeedPostImageCarousel 
                        images={post.images}
                        aspectRatio="1/1"
                        onImageClick={() => handlePostClick(post.id)}
                      />
                    ) : (
                      <Image
                        src={getPostImageUrl(post)}
                        alt={post.caption || "Post image"}
                        fill
                        sizes="(max-width: 768px) 33vw, 25vw"
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography 
              align="center" 
              color="text.secondary"
              sx={{ mt: 4 }}
            >
              Zatiaľ žiadne záložky
            </Typography>
          )}
        </>
      )}

      <Snackbar
        open={notification !== null}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setNotification(null)} 
          severity={notification?.severity || "error"}
          variant="filled"
        >
          {notification?.message || ""}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfileView;
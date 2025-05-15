"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
import Stack from "@mui/material/Stack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// MUI Icons
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

// Server action import
import { fetchProfile, followUser, unfollowUser } from "@/app/actions/profiles";

// Add PostImage component import
import FeedPostImageCarousel from "@/components/FeedPostImageCarousel";

// Types
import { Profile } from "@/types/common";

interface UserProfileViewProps {
  userId: string;
}

const UserProfileView = ({ userId }: UserProfileViewProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profile = await fetchProfile(userId);
        setUserProfile(profile as any);
      } catch (error) {
        console.error("Error loading user profile:", error);
        setNotification({
          message: "Nepodarilo sa načítať profil",
          severity: "error"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [userId]);

  const handleFollowToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session?.user?.email) return;

    try {
      const updatedProfile = isFollowing()
        ? await unfollowUser(userId)
        : await followUser(userId);
      
      setUserProfile(updatedProfile as any);
      
      setNotification({
        message: isFollowing() 
          ? "Používateľ bol odstránený zo sledovaných" 
          : "Používateľ bol pridaný do sledovaných",
        severity: "success"
      });
    } catch (error) {
      console.error("Failed to toggle follow:", error);
      setNotification({
        message: "Nepodarilo sa aktualizovať sledovanie",
        severity: "error"
      });
    }
  };

  const isFollowing = () => {
    if (!session?.user?.email || !userProfile) return false;
    return userProfile.user.followers.some(
      (follow: { follower: { email: string } }) => follow.follower.email === session.user?.email
    );
  };

  const handlePostClick = (postId: string) => {
    router.push(`/prispevky/${postId}`);
  };

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

  if (!userProfile) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Profil sa nenašiel
          </Typography>
          <Typography variant="body1">
            Používateľ s týmto ID neexistuje.
          </Typography>
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
              src={getAvatarUrl(userProfile.user?.name || '', userProfile.avatarUrl)}
              alt={userProfile.user?.name || "Používateľ"}
              sx={{
                width: 100,
                height: 100,
                border: '2px solid white',
                background: 'linear-gradient(45deg, #FF385C, #1DA1F2)',
              }}
            >
              {userProfile.user?.name?.[0] || 'U'}
            </Avatar>
            
            <Box sx={{ flexGrow: 1, ml: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h5" sx={{ mr: 2 }}>
                  {userProfile.user?.name || "Neznámy používateľ"}
                </Typography>
                {session?.user?.email !== userProfile.user?.email && (
                  <Button
                    variant={isFollowing() ? "outlined" : "contained"}
                    size="small"
                    startIcon={isFollowing() ? <PersonRemoveIcon /> : <PersonAddIcon />}
                    onClick={handleFollowToggle}
                  >
                    {isFollowing() ? "Nesledovať" : "Sledovať"}
                  </Button>
                )}
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

      {/* Posts grid */}
      {userProfile.user?.posts && userProfile.user.posts.length > 0 ? (
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

export default UserProfileView; 
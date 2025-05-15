"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
  Avatar,
} from "@mui/material";
import { getAvatarUrl } from "@/utils/avatar";
import { useProfile } from "@/hooks/useProfile";
import { PhotoCamera } from "@mui/icons-material";
import { AlertColor } from "@mui/material";

const ProfileSettingsView = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { profile, isLoading: isProfileLoading, updateProfile } = useProfile();
  
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; severity: AlertColor } | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.avatarUrl) {
      setPreviewUrl(profile.avatarUrl);
    }
  }, [profile?.avatarUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setNotification({
          message: "File is too large. Maximum size is 5MB",
          severity: "error"
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        setNotification({
          message: "Only image files are allowed",
          severity: "error"
        });
        return;
      }

      setAvatarFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUploading(true);
    try {
      const formData = new FormData(event.currentTarget);
      let avatarUrl = profile?.avatarUrl;

      // If there's a new avatar file, upload it first
      if (avatarFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', avatarFile);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload avatar');
        }

        const { url } = await uploadResponse.json();
        avatarUrl = url;
      }

      // Update profile with form data and new avatar URL
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bio: formData.get('bio') || '',
          location: formData.get('location') || '',
          interests: formData.get('interests')?.toString().split(',').map(i => i.trim()).filter(Boolean) || [],
          avatarUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const updatedProfile = await response.json();
      await updateProfile(updatedProfile);
      setNotification({ message: 'Profile updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setNotification({ 
        message: error instanceof Error ? error.message : 'Failed to update profile', 
        severity: 'error' 
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!session?.user) return null;
  if (isProfileLoading) return <CircularProgress />;

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile Settings
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              src={previewUrl || session.user.image || undefined}
              alt="Profile"
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Button
              component="label"
              variant="outlined"
              startIcon={<PhotoCamera />}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Avatar'}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
            </Typography>
          </Box>
          
          <TextField
            fullWidth
            label="Bio"
            name="bio"
            multiline
            rows={4}
            defaultValue={profile?.bio || ''}
            sx={{ mb: 2 }}
            disabled={isUploading}
          />
          
          <TextField
            fullWidth
            label="Location"
            name="location"
            defaultValue={profile?.location || ''}
            sx={{ mb: 2 }}
            disabled={isUploading}
          />
          
          <TextField
            fullWidth
            label="Interests (comma-separated)"
            name="interests"
            defaultValue={profile?.interests?.join(', ') || ''}
            sx={{ mb: 3 }}
            disabled={isUploading}
            helperText="Enter your interests separated by commas"
          />
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isUploading}
          >
            {isUploading ? <CircularProgress size={24} /> : 'Save Changes'}
          </Button>
        </form>

        <Snackbar
          open={!!notification}
          autoHideDuration={6000}
          onClose={() => setNotification(null)}
        >
          <Alert
            onClose={() => setNotification(null)}
            severity={notification?.severity || 'error'}
          >
            {notification?.message || ''}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default ProfileSettingsView;

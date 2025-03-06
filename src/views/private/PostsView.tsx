"use client"; // Add this line at the top to mark the component as a client component

import { useEffect, useState } from "react";

// MUI imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Server action import
import { fetchPosts } from "@/app/actions/posts";

// Define the Post interface
interface User {
  image: string | null;
  id: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: Date | null;
}

interface PostData {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

interface Post {
  id: number; // Changed to number for consistency
  title: string;
  content: string;
  imageUrl: string;
  user: User;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const PostView = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();

        // Map the fetched data to match the Post interface
        const postsData: Post[] = data.map((post: PostData) => {
          // Ensure the id is a valid number or use a fallback key
          const postId = parseInt(post.id);
          const validId = !isNaN(postId) ? postId : Date.now(); // Fallback to the current timestamp if invalid

          return {
            id: validId, // Ensure it's always a number
            title: post.caption || "Untitled", // Use caption or fallback if missing
            content: post.caption || "No content available", // Fallback if caption is missing
            imageUrl: post.imageUrl || "/default-image.jpg", // Ensure the post image URL is used
            user: post.user, // Directly use the user object
            caption: post.caption,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          };
        });

        setPosts(postsData);
      } catch (err) {
        setError("Failed to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ my: 4 }}>
        Nedávne príspevky
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      <Box display="flex" flexDirection="column" gap={4}>
        {posts.map((post, index) => (
          <Card key={`${post.id}-${index}`} sx={{ width: '100%' }}>
            {/* User header */}
            <Box sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                src={post.user.image || undefined}
                alt={post.user.name || 'User'}
                sx={{ width: 32, height: 32 }}
              >
                {post.user.name?.[0] || 'U'}
              </Avatar>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {post.user.name || 'Anonymous User'}
              </Typography>
            </Box>

            {/* Post image */}
            <CardMedia
              component="img"
              image={post.imageUrl}
              alt={post.title}
              sx={{ 
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                aspectRatio: '1/1'
              }}
            />

            {/* Action buttons */}
            <Box sx={{ p: 1, display: 'flex', gap: 1 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {likedPosts.has(post.id) ? (
                  <FavoriteIcon 
                    sx={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => {
                      const newLikedPosts = new Set(likedPosts);
                      newLikedPosts.delete(post.id);
                      setLikedPosts(newLikedPosts);
                    }}
                  />
                ) : (
                  <FavoriteBorderIcon 
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      const newLikedPosts = new Set(likedPosts);
                      newLikedPosts.add(post.id);
                      setLikedPosts(newLikedPosts);
                    }}
                  />
                )}
                <ChatBubbleOutlineIcon sx={{ cursor: 'pointer' }} />
                <ShareIcon sx={{ cursor: 'pointer' }} />
              </Box>
            </Box>

            {/* Likes count */}
            <Box sx={{ px: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {likedPosts.has(post.id) ? '1 like' : '0 likes'}
              </Typography>
            </Box>

            {/* Caption */}
            {post.caption && (
              <Box sx={{ px: 1, pb: 1 }}>
                <Typography variant="body2">
                  <span style={{ fontWeight: 'bold' }}>{post.user.name || 'Anonymous User'}</span>{' '}
                  {post.caption}
                </Typography>
              </Box>
            )}
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default PostView;

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
import Box from "@mui/material/Box"; // Import Box component

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
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        Nedávne príspevky
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        gap={4}
        sx={{ marginBottom: 4 }}
      >
        {posts.map((post, index) => (
          <Box
            key={`${post.id}-${index}`} // Ensure each Box has a unique key
            sx={{
              width: { xs: "100%", sm: "48%", md: "30%" }, // Adjust size based on screen size
              height: "auto", // Ensure consistent height
            }}
          >
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={post.imageUrl} // Use the correct image URL for the post
                alt={post.title}
                sx={{ objectFit: "cover" }} // Ensure the image scales properly
              />
              <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Display the user's name inside the CardContent */}
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {post.user.name || "Anonymous User"} {/* Fallback to "Anonymous User" if name is null */}
                </Typography>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default PostView;

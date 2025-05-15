"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

// MUI imports
import {
  Box,
  Container,
  Typography,
  IconButton,
  Avatar,
  Button,
  TextField,
  Paper,
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
  CardHeader,
  CardContent,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Bookmark,
  BookmarkBorder,
  ArrowBack,
  Send,
} from "@mui/icons-material";

// Components
import PostImageCarousel from "@/components/PostImageCarousel";

// Actions
import {
  fetchPostById,
  likePost,
  unlikePost,
  bookmarkPost,
  unbookmarkPost,
  createComment,
  PostWithDetails,
} from "@/app/actions/posts";

// Types
import { Post, Comment } from "@prisma/client";

interface PostDetailViewProps {
  postId: string;
}

const PostDetailView = ({ postId }: PostDetailViewProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState<PostWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await fetchPostById(postId);
        setPost(postData);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setError("Nepodarilo sa načítať príspevok. Skúste to znova neskôr.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);
    try {
      await createComment(post!.id, comment);
      setComment("");
      // Refresh comments
      const updatedPost = await fetchPostById(post!.id);
      setPost(updatedPost);
    } catch (error) {
      console.error("Failed to create comment:", error);
      setError("Nepodarilo sa pridať komentár. Skúste to znova neskôr.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!session?.user || !post) return;

    setLoading(true);
    try {
      if (post.likes?.some(like => like.userId === session.user.id)) {
        await unlikePost(post.id);
      } else {
        await likePost(post.id);
      }
      // Refresh post data
      const updatedPost = await fetchPostById(post.id);
      setPost(updatedPost);
    } catch (error) {
      console.error("Failed to toggle like:", error);
      setError("Nepodarilo sa zmeniť stav páčiť sa. Skúste to znova neskôr.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!session?.user || !post) return;

    setLoading(true);
    try {
      if (post.bookmarks?.some(bookmark => bookmark.userId === session.user.id)) {
        await unbookmarkPost(post.id);
      } else {
        await bookmarkPost(post.id);
      }
      // Refresh post data
      const updatedPost = await fetchPostById(post.id);
      setPost(updatedPost);
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      setError("Nepodarilo sa zmeniť stav uloženia. Skúste to znova neskôr.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (userId: string) => {
    router.push(`/profil/${userId}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">
          Príspevok nebol nájdený.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* Back button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
          sx={{ mb: 3 }}
        >
          Späť
        </Button>

        {/* Post content */}
        <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
          {/* Post header */}
          <CardHeader
            avatar={
              <Avatar
                src={post.user?.image || undefined}
                alt={post.user?.name || "User"}
                sx={{
                  background: 'linear-gradient(45deg, #FF385C, #1DA1F2)',
                  border: '2px solid white',
                  cursor: 'pointer',
                }}
                onClick={() => handleUserClick(post.userId)}
              >
                {post.user?.name?.[0] || "U"}
              </Avatar>
            }
            title={
              <Typography 
                variant="subtitle1" 
                onClick={() => handleUserClick(post.userId)}
                sx={{ 
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {post.user?.name}
              </Typography>
            }
          />

          {/* Post images */}
          {post.images && post.images.length > 0 && (
            <PostImageCarousel images={post.images} />
          )}

          {/* Post actions */}
          <CardContent sx={{ pt: 1 }}>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <IconButton onClick={handleLike} disabled={loading}>
                {post.likes?.some(like => like.userId === session?.user?.id) ? (
                  <Favorite color="error" />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
              <IconButton onClick={handleBookmark} disabled={loading}>
                {post.bookmarks?.some(bookmark => bookmark.userId === session?.user?.id) ? (
                  <Bookmark color="primary" />
                ) : (
                  <BookmarkBorder />
                )}
              </IconButton>
            </Box>

            {/* Post caption */}
            {post.caption && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Typography 
                  component="span" 
                  onClick={() => handleUserClick(post.userId)}
                  sx={{ 
                    fontWeight: 600,
                    mr: 0.5,
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {post.user?.name}
                </Typography>
                {post.caption}
              </Typography>
            )}

            {/* Comments */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>
                Komentáre ({post.comments.length})
              </Typography>
              {post.comments.map((comment) => (
                <Box key={comment.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar
                      src={comment.user?.image || undefined}
                      alt={comment.user?.name || "User"}
                      sx={{ width: 32, height: 32, mr: 1, cursor: 'pointer' }}
                      onClick={() => handleUserClick(comment.userId)}
                    />
                    <Typography variant="body2">
                      <Typography 
                        component="span" 
                        onClick={() => handleUserClick(comment.userId)}
                        sx={{ 
                          fontWeight: 600,
                          mr: 0.5,
                          cursor: 'pointer',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        {comment.user?.name}
                      </Typography>
                      {comment.content}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(comment.createdAt).toLocaleDateString("sk-SK")}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Comment form */}
            {session?.user && (
              <Box
                component="form"
                onSubmit={handleCommentSubmit}
                sx={{ mt: 3, display: "flex", gap: 1 }}
              >
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Pridať komentár..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={loading}
                />
                <IconButton
                  type="submit"
                  color="primary"
                  disabled={!comment.trim() || loading}
                >
                  <Send />
                </IconButton>
              </Box>
            )}
          </CardContent>
        </Paper>
      </Box>

      {/* Error snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PostDetailView; 
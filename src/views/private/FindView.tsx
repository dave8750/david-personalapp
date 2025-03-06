"use client";

import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Alert,
} from "@mui/material";
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

interface User {
  id: string;
  name: string | null;
  image: string | null;
  email: string;
}

const FindView = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Hľadanie používateľov
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Vyhľadaj používateľa..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 4 }}
      />

      {loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      <List>
        {filteredUsers.map((user) => (
          <ListItem
            key={user.id}
            sx={{
              bgcolor: "background.paper",
              mb: 1,
              borderRadius: 1,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <ListItemAvatar sx={{ mr: 2 }}>
              <Avatar
                src={user.image || undefined}
                alt={user.name || "User"}
                sx={{ width: 56, height: 56 }}
              >
                {user.name?.[0] || "U"}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user.name || "Anonymous User"}
              secondary={user.email}
            />
          </ListItem>
        ))}
      </List>

      {!loading && filteredUsers.length === 0 && (
        <Typography variant="body1" color="text.secondary" align="center">
          {searchQuery ? "Žiadni používatelia neboli nájdení" : "Žiadni používatelia"}
        </Typography>
      )}
    </Container>
  );
};

export default FindView;

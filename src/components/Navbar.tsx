"use client";

import * as React from 'react';
import { BottomNavigation, BottomNavigationAction, Box, IconButton, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "../app/providers/ThemeProvider";
import { getAvatarUrl } from "@/utils/avatar";
import PersonIcon from '@mui/icons-material/Person';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useProfile } from '@/hooks/useProfile';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { toggleTheme, isDarkMode } = useTheme();
  const { profile } = useProfile();

  const handleNavigation = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === '/auth/odhlasenie') {
      signOut({
        callbackUrl: '/',
      });
    } else {
      router.push(newValue);
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
      <BottomNavigation
        value={pathname}
        onChange={handleNavigation}
        sx={{
          height: 60,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <BottomNavigationAction
          label="Domov"
          value="/"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Hľadať"
          value="/hladanie"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Pridať"
          value="/prispevky/vytvorit"
          icon={<AddCircleIcon />}
        />
        <BottomNavigationAction
          label="Profil"
          value="/profil"
          icon={
            session?.user ? (
              <Avatar
                src={profile?.avatarUrl || getAvatarUrl(session.user.name, session.user.image)}
                alt={session.user.name || "Profile"}
                sx={{
                  width: 24,
                  height: 24,
                  border: '2px solid white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {session.user.name?.[0] || "U"}
              </Avatar>
            ) : (
              <PersonIcon />
            )
          }
        />
        <BottomNavigationAction
          label="Odhlásiť"
          value="/auth/odhlasenie"
          icon={<LogoutIcon />}
        />
      </BottomNavigation>

      {/* Theme toggle button */}
      <IconButton
        onClick={toggleTheme}
        sx={{ position: 'absolute', top: 10, right: 10 }}
      >
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Box>
  );
}

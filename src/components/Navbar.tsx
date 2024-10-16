"use client"; // Make this a client component

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout'; // Add an icon for Sign Out
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface SimpleBottomNavigationProps {
  session: Session | null; // Accept session as a prop
}

export default function SimpleBottomNavigation({ session }: SimpleBottomNavigationProps) {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleNavigation = (newValue: number) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        router.push('/'); // Home
        break;
      case 1:
        router.push('/profil'); // Profile
        break;
      case 2:
        router.push('/prispevok'); // Posts
        break;
      case 3:
        if (!session) {
          router.push('/auth/prihlasenie'); // Login
        } else {
          signOut({ callbackUrl: '/' }); // Sign Out
        }
        break;
      case 4:
        router.push('/auth/registracia'); // Registration
        break;
      default:
        router.push('/');
    }
  };

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          handleNavigation(newValue);
        }}
      >
        <BottomNavigationAction label="Domov" icon={<HomeIcon />} />
        <BottomNavigationAction label="Profil" icon={<PersonIcon />} />
        <BottomNavigationAction label="Prispevky" icon={<ArticleIcon />} />
        {session ? (
          <BottomNavigationAction label="Odhlasit" icon={<LogoutIcon />} /> // Sign Out button
        ) : (
          <BottomNavigationAction label="Prihlasenie" icon={<LoginIcon />} />
        )}
        {!session && (
          <BottomNavigationAction label="Registracia" icon={<HowToRegIcon />} />
        )}
      </BottomNavigation>
    </Box>
  );
}

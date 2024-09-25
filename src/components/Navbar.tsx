// src/components/Navbar.tsx

import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [value, setValue] = React.useState(router.pathname);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    router.push(newValue); // Programmatic routing
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => handleChange(newValue)}
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
    >
      <BottomNavigationAction 
        label="Home" 
        value="/" 
        icon={<HomeIcon />} 
        component={Link} 
        href="/" // Use Link to navigate
      />
      <BottomNavigationAction 
        label="Search" 
        value="/hladanie" 
        icon={<SearchIcon />} 
        component={Link} 
        href="/hladanie" // Use Link to navigate
      />
      <BottomNavigationAction 
        label="Add" 
        value="/pridat" 
        icon={<AddCircleIcon />} 
        component={Link} 
        href="/pridat" // Use Link to navigate
      />
      <BottomNavigationAction 
        label="Notifications" 
        value="/notifikacie" 
        icon={<NotificationsIcon />} 
        component={Link} 
        href="/notifikacie" // Use Link to navigate
      />
      <BottomNavigationAction 
        label="Profile" 
        value="/profil/[id]" 
        icon={<PersonIcon />} 
        component={Link} 
        href="/profil/[id]" // Adjust this as needed for actual user profiles
      />
    </BottomNavigation>
  );
};

export default Navbar;

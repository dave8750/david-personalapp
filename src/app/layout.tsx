// src/app/layout.tsx

import React from 'react';
import Navbar from '../components/Navbar';
import './globals.css'; // Import your global styles

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ paddingBottom: '56px' }}> {/* Add padding to avoid overlap */}
      {children}
      <Navbar />
    </div>
  );
};

export default Layout;

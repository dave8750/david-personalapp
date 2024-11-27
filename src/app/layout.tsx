// src/app/layout.tsx
import './globals.css';
import Navbar from '@/components/Navbar';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider here
import { AuthProvider } from './(public)/auth/layout';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the app in the SessionProvider to provide session context */}
        <SessionProvider>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

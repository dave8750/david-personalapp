import './globals.css';
import Navbar from '@/components/Navbar';
import SimpleBottomNavigation from '@/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <SimpleBottomNavigation />
      </body>
    </html>
  );
}

import './globals.css';
import Navbar from '@/components/Navbar';
import SimpleBottomNavigation from '@/components/Navbar';
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions"; // Ensure this path is correct

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch the session on the server
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Navbar session={session} /> {/* Pass session to Navbar */}
        <main>{children}</main>
        <SimpleBottomNavigation session={session} /> {/* Pass session to SimpleBottomNavigation */}
      </body>
    </html>
  );
}

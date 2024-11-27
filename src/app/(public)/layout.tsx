// src/app/layout.tsx (Server Component)
import './globals.css';
import Navbar from '@/components/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch the session on the server side
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        {/* Wrap the layout in the ClientSessionWrapper to provide the session data */}
        <ClientSessionWrapper session={session}>
          <Navbar session={session} />
          <main>{children}</main>
        </ClientSessionWrapper>
      </body>
    </html>
  );
}

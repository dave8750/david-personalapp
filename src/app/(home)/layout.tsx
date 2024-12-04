// src/app/(home)/layout.tsx

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AuthKeeper from "@/components/AuthKeeper"; // Optional: if you need AuthKeeper for page wrapping

export default function HomeLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
  }, [status, router]);

  if (status === "loading") {
    // Show a loading message while checking session status
    return <Typography>Loading...</Typography>;
  }

  if (status === "unauthenticated") {
    // If unauthenticated, display a sign-in button and prevent access to home content
    return (
      <div>
        <Typography>You need to sign in to access this content.</Typography>
      </div>
    );
  }

  // For authenticated users, render the children (the page content)
  return <>{children}</>;
}
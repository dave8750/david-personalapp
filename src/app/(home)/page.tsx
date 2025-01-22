// src/app/(home)/page.tsx


import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const metadata = { title: "Domov | ZoškaSnap" };

export default async function HomePage() {

  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/prispevok");
  }

  // Show the unauthenticated home view for non-authenticated users
  return (
    <Container>
      <Typography>Nie ste prihlásený </Typography>
    </Container>
  );
}
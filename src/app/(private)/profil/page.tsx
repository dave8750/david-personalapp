// src/app/profil/page.tsx

import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import ProfileView from "@/views/private/ProfileView";
import { createProfileIfNotExists } from "@/app/actions/profiles";

export const metadata: Metadata = {
  title: "Profil | ZoškaSnap",
  description: "Zobraziť a upraviť profil"
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/auth/prihlasenie');
  }

  // Create profile if it doesn't exist
  await createProfileIfNotExists(session.user.id);

  return <ProfileView />;
}
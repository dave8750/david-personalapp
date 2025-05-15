import { Metadata } from "next";
import UserProfileView from "@/views/private/UserProfileView";

export const metadata: Metadata = {
  title: "Profil používateľa | ZoškaSnap",
  description: "Zobraziť profil používateľa"
};

interface UserProfilePageProps {
  params: {
    userId: string;
  };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  return <UserProfileView userId={params.userId} />;
} 
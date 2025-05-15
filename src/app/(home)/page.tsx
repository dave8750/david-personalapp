// src/app/(home)/page.tsx

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import NonAuthHomeView from "@/sections/NonAuthHomeView";

export const metadata = { title: "Domov | ZoškaSnap" };

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/prispevok");
  }

  return <NonAuthHomeView />;
}

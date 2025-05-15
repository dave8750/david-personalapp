// lib/profiles.ts
import { prisma } from "@/lib/prisma"; // Adjust according to your database setup, assuming Prisma here.

export async function getProfileByUserId(userId: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });
    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Profile not found");
  }
}

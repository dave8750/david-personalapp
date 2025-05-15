import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: { user: true }
    });

    if (!profile) {
      // Create a default profile if it doesn't exist
      const newProfile = await prisma.profile.create({
        data: {
          userId: session.user.id,
          bio: "",
          location: "",
          avatarUrl: session.user.image || "",
          interests: []
        },
        include: { user: true }
      });
      return NextResponse.json(newProfile);
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { bio, location, avatarUrl, interests } = data;

    // Validate the data
    if (bio && typeof bio !== 'string') {
      return NextResponse.json({ error: "Invalid bio format" }, { status: 400 });
    }
    if (location && typeof location !== 'string') {
      return NextResponse.json({ error: "Invalid location format" }, { status: 400 });
    }
    if (avatarUrl && typeof avatarUrl !== 'string') {
      return NextResponse.json({ error: "Invalid avatarUrl format" }, { status: 400 });
    }
    if (interests && !Array.isArray(interests)) {
      return NextResponse.json({ error: "Invalid interests format" }, { status: 400 });
    }

    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        bio: bio || "",
        location: location || "",
        avatarUrl: avatarUrl || session.user.image || "",
        interests: interests || []
      },
      create: {
        userId: session.user.id,
        bio: bio || "",
        location: location || "",
        avatarUrl: avatarUrl || session.user.image || "",
        interests: interests || []
      },
      include: { user: true }
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
} 
    // app/api/profile/route.ts
    import { getServerSession } from "next-auth";
    import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
    import { NextResponse } from "next/server";
    import { getProfileByUserId } from "@/lib/profiles"; // Import the function

    export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized or invalid session" }, { status: 401 });
    }

    try {
        const userId = session.user.id; // Ensure that `user.id` is a string before using it
        const profile = await getProfileByUserId(userId);

        if (!profile) {
        return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
    }

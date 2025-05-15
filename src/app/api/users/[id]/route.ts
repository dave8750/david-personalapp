import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = params.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        posts: {
          include: {
            images: true,
            likes: true,
            comments: true,
            bookmarks: true,
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        followers: true,
        following: true,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Transform the data to include only necessary information
    const transformedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      profile: user.profile,
      posts: user.posts.map(post => ({
        id: post.id,
        caption: post.caption,
        createdAt: post.createdAt,
        images: post.images,
        likes: post.likes.length,
        comments: post.comments.length,
        bookmarks: post.bookmarks.length,
      })),
      followers: user.followers.length,
      following: user.following.length,
    };

    return NextResponse.json(transformedUser);
  } catch (error) {
    console.error("[USER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 
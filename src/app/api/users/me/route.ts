import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/app/api/auth/[...nextauth]/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      console.error("No session found:", session);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        profile: true,
        posts: {
          include: {
            likes: true,
            comments: true,
            postImages: {
              orderBy: {
                order: 'asc'
              }
            }
          }
        },
        followers: true,
        following: true,
      }
    });

    if (!user) {
      console.error("User not found for email:", session.user.email);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Transform the data to include counts
    const transformedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      profile: user.profile,
      posts: user.posts.map(post => ({
        ...post,
        likesCount: post.likes.length,
        commentsCount: post.comments.length,
        imageUrl: post.postImages[0]?.imageUrl || null,
      })),
      followersCount: user.followers.length,
      followingCount: user.following.length,
    };

    return NextResponse.json(transformedUser);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, bio, currentPassword, newPassword } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: 'Current password is required' },
          { status: 400 }
        );
      }

      const isValidPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        );
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user with new password
      const updatedUser = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          name,
          bio,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          bio: true,
          _count: {
            select: {
              posts: true,
              followers: true,
              following: true,
            },
          },
        },
      });

      return NextResponse.json({
        ...updatedUser,
        posts: updatedUser._count.posts,
        followers: updatedUser._count.followers,
        following: updatedUser._count.following,
      });
    }

    // Update user without changing password
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        bio,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bio: true,
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    return NextResponse.json({
      ...updatedUser,
      posts: updatedUser._count.posts,
      followers: updatedUser._count.followers,
      following: updatedUser._count.following,
    });
  } catch (error) {
    console.error('Error in PATCH /api/users/me:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
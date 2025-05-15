import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/app/api/auth/[...nextauth]/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const posts = await prisma.post.findMany({
      where: {
        userId: user.id,
      },
      include: {
        images: {
          orderBy: {
            order: 'asc',
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform the posts to include the counts
    const transformedPosts = posts.map(post => ({
      id: post.id,
      userId: post.userId,
      caption: post.caption,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.tags,
      images: post.images,
      likes: post._count.likes,
      comments: post._count.comments,
      user: post.user,
    }));

    return NextResponse.json(transformedPosts);
  } catch (error) {
    console.error('Error in GET /api/users/me/posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
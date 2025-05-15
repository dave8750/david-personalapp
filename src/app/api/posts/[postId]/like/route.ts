import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/app/api/auth/[...nextauth]/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;
    const { userId } = await request.json();

    // Check if user already liked the post
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      // Unlike the post
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      // Like the post
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    }

    // Fetch updated post with all relations
    const updatedPost = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        images: true,
        likes: {
          include: {
            user: true,
          },
        },
        comments: {
          include: {
            user: true,
          },
        },
        bookmarks: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error in like endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to process like' },
      { status: 500 }
    );
  }
} 
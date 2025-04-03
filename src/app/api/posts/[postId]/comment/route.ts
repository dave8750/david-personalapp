import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;
    const { content, userId } = await request.json();

    // Create the comment
    await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
    });

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
    console.error('Error in comment endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
} 
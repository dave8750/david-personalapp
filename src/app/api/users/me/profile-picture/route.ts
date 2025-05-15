import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/app/api/auth/[...nextauth]/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${uuidv4()}-${file.name}`;
    const path = join(process.cwd(), 'public', 'uploads', 'profile-pictures', filename);

    // Save file
    await writeFile(path, buffer);

    // Update user profile with new image path
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        image: `/uploads/profile-pictures/${filename}`,
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
    console.error('Error in POST /api/users/me/profile-picture:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
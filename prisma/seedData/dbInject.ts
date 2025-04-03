// npm install --save-dev tsx

// npx tsx prisma/seedData/dbInject.ts

import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const seedData = JSON.parse(fs.readFileSync('prisma/seedData/seed-data.json', 'utf8'));
  const users = seedData.users || [];
  const follows = seedData.follows || [];
  const likes = seedData.likes || [];
  const bookmarks = seedData.bookmarks || [];

  console.log(`Starting database seed with ${users.length} users...`);

  try {
    // First, create all users
    for (const item of users) {
      console.log(`Creating user: ${item.name}`);

      // Create user
      await prisma.user.upsert({
        where: { id: item.id },
        update: {
          name: item.name,
          email: item.email,
          emailVerified: item.emailVerified ? new Date(item.emailVerified) : null,
          image: item.image,
          updatedAt: new Date(item.updatedAt)
        },
        create: {
          id: item.id,
          name: item.name,
          email: item.email,
          emailVerified: item.emailVerified ? new Date(item.emailVerified) : null,
          image: item.image,
          createdAt: new Date(item.createdAt || new Date()),
          updatedAt: new Date(item.updatedAt)
        }
      });

      // Create profile if exists
      if (item.profile) {
        console.log(`Creating profile for: ${item.name}`);
        await prisma.profile.upsert({
          where: { id: item.profile.id },
          update: {
            bio: item.profile.bio,
            avatarUrl: item.profile.avatarUrl,
            location: item.profile.location,
            interests: item.profile.interests || [],
            updatedAt: new Date(item.profile.updatedAt)
          },
          create: {
            id: item.profile.id,
            userId: item.profile.userId,
            bio: item.profile.bio,
            avatarUrl: item.profile.avatarUrl,
            location: item.profile.location,
            interests: item.profile.interests || [],
            createdAt: new Date(item.profile.createdAt || new Date()),
            updatedAt: new Date(item.profile.updatedAt)
          }
        });
      }

      // Create posts
      if (item.posts && item.posts.length > 0) {
        console.log(`Creating ${item.posts.length} posts for: ${item.name}`);
        for (const post of item.posts) {
          // Create post first
          const createdPost = await prisma.post.create({
            data: {
              id: post.id,
              userId: item.id,
              caption: post.caption,
              createdAt: new Date(post.createdAt || new Date()),
              updatedAt: new Date(post.updatedAt)
            }
          });

          // Update tags if they exist
          if (post.tags && post.tags.length > 0) {
            await prisma.post.update({
              where: { id: post.id },
              data: { tags: post.tags }
            });
          }

          // Add post image
          if (post.imageUrl) {
            await prisma.postImage.create({
              data: {
                id: `${post.id}-image-0`,
                postId: post.id,
                imageUrl: post.imageUrl,
                order: 0,
                createdAt: new Date(post.createdAt || new Date())
              }
            });
          }
        }
      }
    }

    // Create follows
    if (follows.length > 0) {
      console.log(`Creating ${follows.length} follow relationships...`);
      for (const follow of follows) {
        await prisma.follow.create({
          data: {
            id: follow.id,
            followerId: follow.followerId,
            followingId: follow.followingId,
            createdAt: new Date(follow.createdAt || new Date())
          }
        });
      }
    }

    // Create likes
    if (likes.length > 0) {
      console.log(`Creating ${likes.length} likes...`);
      for (const like of likes) {
        await prisma.like.create({
          data: {
            id: like.id,
            userId: like.userId,
            postId: like.postId,
            createdAt: new Date(like.createdAt || new Date())
          }
        });
      }
    }

    // Create bookmarks
    if (bookmarks.length > 0) {
      console.log(`Creating ${bookmarks.length} bookmarks...`);
      for (const bookmark of bookmarks) {
        await prisma.bookmark.create({
          data: {
            id: bookmark.id,
            userId: bookmark.userId,
            postId: bookmark.postId,
            createdAt: new Date(bookmark.createdAt || new Date())
          }
        });
      }
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
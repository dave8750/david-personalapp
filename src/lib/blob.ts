import { put } from '@vercel/blob';
import { del } from '@vercel/blob';

export async function uploadToBlob(file: File) {
  try {
    const { url } = await put(file.name, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });
    return url;
  } catch (error) {
    console.error('Error uploading to blob:', error);
    throw error;
  }
}

export async function deleteFromBlob(url: string) {
  try {
    await del(url, {
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });
  } catch (error) {
    console.error('Error deleting from blob:', error);
    throw error;
  }
} 
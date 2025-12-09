// Database cleanup functions to prevent storage abuse

import { prisma } from '@/lib/db';

// Clean up expired notes
export async function cleanupExpiredNotes() {
  try {
    const result = await prisma.note.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    });
    console.log(`Cleaned up ${result.count} expired notes`);
    return result.count;
  } catch (error) {
    console.error('Error cleaning up expired notes:', error);
    return 0;
  }
}

// Clean up notes that have reached their view limit
export async function cleanupViewLimitedNotes() {
  try {
    const result = await prisma.note.deleteMany({
      where: {
        AND: [
          { maxViews: { not: null } },
          { viewCount: { gte: prisma.note.fields.maxViews } }
        ]
      }
    });
    console.log(`Cleaned up ${result.count} view-limited notes`);
    return result.count;
  } catch (error) {
    console.error('Error cleaning up view-limited notes:', error);
    return 0;
  }
}

// Get database statistics
export async function getDatabaseStats() {
  try {
    const totalNotes = await prisma.note.count();
    const expiredNotes = await prisma.note.count({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    });
    const protectedNotes = await prisma.note.count({
      where: {
        isProtected: true
      }
    });
    
    // Calculate total storage usage (approximate)
    const notes = await prisma.note.findMany({
      select: {
        ciphertext: true,
        images: true
      }
    });
    
    const totalSize = notes.reduce((sum, note) => {
      let size = note.ciphertext.length;
      if (note.images) {
        try {
          const images = JSON.parse(note.images);
          size += images.reduce((imgSum: number, img: any) => imgSum + (img.data?.length || 0), 0);
        } catch (e) {
          // Ignore JSON parse errors
        }
      }
      return sum + size;
    }, 0);
    
    return {
      totalNotes,
      expiredNotes,
      protectedNotes,
      totalStorageBytes: totalSize,
      totalStorageMB: Math.round(totalSize / 1024 / 1024 * 100) / 100
    };
  } catch (error) {
    console.error('Error getting database stats:', error);
    return null;
  }
}

// Run periodic cleanup
export async function runPeriodicCleanup() {
  console.log('Running periodic cleanup...');
  const expired = await cleanupExpiredNotes();
  const viewLimited = await cleanupViewLimitedNotes();
  const stats = await getDatabaseStats();
  
  console.log('Cleanup completed:', {
    expiredNotesRemoved: expired,
    viewLimitedNotesRemoved: viewLimited,
    currentStats: stats
  });
  
  return { expired, viewLimited, stats };
}

// Schedule cleanup to run every hour
if (typeof setInterval !== 'undefined') {
  setInterval(runPeriodicCleanup, 60 * 60 * 1000); // Every hour
}

import { prisma } from '@/lib/db';
import { encryptMetadata, decryptMetadata } from '@/lib/metadata-encryption';
import { validateContent } from '@/lib/security';
import { randomBytes } from 'crypto';
import type { CreateNoteInput } from '@/lib/zod';
import {
  NoteNotFoundError,
  NoteExpiredError,
  NoteConsumedError,
  InvalidTokenError,
  PayloadTooLargeError,
  ContentValidationError,
  DatabaseError,
} from '@/lib/errors';

export interface NoteResponse {
  id?: string;
  title?: string | null;
  ciphertext: string;
  iv: string;
  remainingReadsPreview?: number | null;
  isProtected: boolean;
  encryptedKey?: string | null;
  keyIv?: string | null;
  salt?: string | null;
  images?: any[] | null;
  authorName?: string;
  authorEmail?: string;
  category?: string | null;
  createdAt?: string;
  expiresAt?: string | null;
  viewCount?: number;
  maxViews?: number | null;
  deleteAfterReading?: boolean;
}

export class NoteService {
  /**
   * Create a new encrypted note
   */
  async createNote(data: CreateNoteInput, userId?: string | null): Promise<{ id: string }> {
    try {
      // Decode base64
      const ciphertext = Buffer.from(data.ciphertext, 'base64');
      const iv = Buffer.from(data.iv, 'base64');

      // Validate content for abuse patterns
      const contentCheck = validateContent(data.ciphertext);
      if (!contentCheck.valid) {
        throw new ContentValidationError(`Content validation failed: ${contentCheck.reason}`);
      }

      // Handle password protection fields
      let encryptedKey: Buffer | null = null;
      let keyIv: Buffer | null = null;
      let salt: Buffer | null = null;

      if (data.isProtected && data.encryptedKey && data.keyIv && data.salt) {
        encryptedKey = Buffer.from(data.encryptedKey, 'base64');
        keyIv = Buffer.from(data.keyIv, 'base64');
        salt = Buffer.from(data.salt, 'base64');
      }

      // Validate payload size
      const totalSize =
        ciphertext.length +
        iv.length +
        (encryptedKey?.length || 0) +
        (keyIv?.length || 0) +
        (salt?.length || 0);

      if (totalSize > 100000) {
        throw new PayloadTooLargeError('Total payload too large (~75KB limit)');
      }

      // Validate images size if present
      if (data.images && data.images.length > 0) {
        const totalImageSize = data.images.reduce((sum, img) => sum + img.size, 0);
        if (totalImageSize > 30 * 1024 * 1024) {
          throw new PayloadTooLargeError('Images too large (30MB total limit)');
        }

        for (const image of data.images) {
          if (image.size > 10 * 1024 * 1024) {
            throw new PayloadTooLargeError('Individual image too large (10MB limit)');
          }
        }
      }

      const expiresAt = data.duration ? new Date(Date.now() + data.duration * 60 * 1000) : null;
      const destroyToken = randomBytes(32).toString('hex');

      // Encrypt metadata fields
      const [encryptedTitle, encryptedAuthorName, encryptedAuthorEmail, encryptedCategory] =
        await Promise.all([
          data.title ? encryptMetadata(data.title) : null,
          data.authorName ? encryptMetadata(data.authorName) : null,
          data.authorEmail ? encryptMetadata(data.authorEmail) : null,
          data.category ? encryptMetadata(data.category) : null,
        ]);

      // Create note with encrypted metadata
      const note = await prisma.note.create({
        data: {
          titleEncrypted: encryptedTitle || undefined,
          ciphertext: ciphertext.toString('base64'),
          iv: iv.toString('base64'),
          remainingReads: data.maxReads,
          expiresAt,
          destroyToken,
          isProtected: data.isProtected || false,
          encryptedKey: encryptedKey?.toString('base64') || undefined,
          keyIv: keyIv?.toString('base64') || undefined,
          salt: salt?.toString('base64') || undefined,
          images: data.images ? JSON.stringify(data.images) : undefined,
          authorNameEncrypted: encryptedAuthorName || undefined,
          authorEmailEncrypted: encryptedAuthorEmail || undefined,
          viewCount: 0,
          maxViews: data.maxViews || undefined,
          deleteAfterReading: data.deleteAfterReading || false,
          categoryEncrypted: encryptedCategory || undefined,
          userId: userId || undefined,
        },
      });

      // Update user's note count if logged in
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { notesCreated: { increment: 1 } },
        }).catch(() => {}); // Ignore errors if user doesn't exist
      }

      return { id: note.id };
    } catch (error) {
      if (error instanceof ContentValidationError || error instanceof PayloadTooLargeError) {
        throw error;
      }
      console.error('Create note error:', error);
      throw new DatabaseError('Failed to create note');
    }
  }

  /**
   * Get a note by ID and increment view count
   */
  async getNoteById(id: string): Promise<NoteResponse> {
    try {
      const note = await prisma.note.findUnique({
        where: { id },
      });

      if (!note) {
        throw new NoteNotFoundError();
      }

      // Check if expired
      if (note.expiresAt && note.expiresAt < new Date()) {
        await prisma.note.delete({ where: { id } });
        throw new NoteExpiredError();
      }

      // Check remaining reads
      if (note.remainingReads !== null && note.remainingReads <= 0) {
        await prisma.note.delete({ where: { id } });
        throw new NoteConsumedError();
      }

      // Atomically update view count and remaining reads
      const updateData: any = {
        viewCount: { increment: 1 },
      };

      if (note.remainingReads !== null) {
        updateData.remainingReads = note.remainingReads - 1;
        updateData.consumedAt = note.remainingReads - 1 === 0 ? new Date() : null;
      }

      await prisma.note.update({
        where: { id },
        data: updateData,
      });

      const remainingReadsPreview = note.remainingReads !== null ? note.remainingReads - 1 : null;

      // Prepare response data
      const responseData: NoteResponse = {
        title: note.titleEncrypted ? await decryptMetadata(note.titleEncrypted) : null,
        ciphertext: note.ciphertext,
        iv: note.iv,
        remainingReadsPreview,
        isProtected: note.isProtected || false,
        encryptedKey: note.encryptedKey || null,
        keyIv: note.keyIv || null,
        salt: note.salt || null,
        images: note.images ? JSON.parse(note.images) : null,
        authorName: note.authorNameEncrypted
          ? await decryptMetadata(note.authorNameEncrypted)
          : 'Anonymous',
        authorEmail: note.authorEmailEncrypted
          ? await decryptMetadata(note.authorEmailEncrypted)
          : '',
        category: note.categoryEncrypted ? await decryptMetadata(note.categoryEncrypted) : null,
        createdAt: note.createdAt.toISOString(),
        expiresAt: note.expiresAt?.toISOString() || null,
        viewCount: note.viewCount + 1,
        maxViews: note.maxViews,
        deleteAfterReading: note.deleteAfterReading || false,
      };

      // Delete note after reading if enabled
      if (note.deleteAfterReading) {
        await prisma.note.delete({ where: { id } });
      }

      return responseData;
    } catch (error) {
      if (
        error instanceof NoteNotFoundError ||
        error instanceof NoteExpiredError ||
        error instanceof NoteConsumedError
      ) {
        throw error;
      }
      console.error('Get note error:', error);
      throw new DatabaseError('Failed to retrieve note');
    }
  }

  /**
   * Delete a note by ID with optional token verification
   */
  async deleteNote(id: string, token?: string): Promise<void> {
    try {
      const note = await prisma.note.findUnique({
        where: { id },
      });

      if (!note) {
        throw new NoteNotFoundError();
      }

      // Check token if provided
      if (token && note.destroyToken !== token) {
        throw new InvalidTokenError();
      }

      await prisma.note.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NoteNotFoundError || error instanceof InvalidTokenError) {
        throw error;
      }
      console.error('Delete note error:', error);
      throw new DatabaseError('Failed to delete note');
    }
  }

  /**
   * Get note statistics
   */
  async getStats() {
    try {
      const totalNotes = await prisma.note.count();
      const activeNotes = await prisma.note.count({
        where: {
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
        },
      });

      return {
        totalNotes,
        activeNotes,
        expiredNotes: totalNotes - activeNotes,
      };
    } catch (error) {
      console.error('Get stats error:', error);
      throw new DatabaseError('Failed to retrieve statistics');
    }
  }
}

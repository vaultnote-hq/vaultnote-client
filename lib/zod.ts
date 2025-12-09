import { z } from 'zod';

// API Schemas
export const createNoteSchema = z.object({
  title: z.string().max(200).nullable().optional(), // Max 200 chars
  ciphertext: z.string().max(100000), // Max ~75KB base64 (≈56KB raw)
  iv: z.string().min(16).max(32), // Base64 encoded IV (flexible length)
  maxReads: z.number().max(1000).optional(), // Max 1000 reads
  duration: z.number().max(43200).optional(), // Max 30 days in minutes
  isProtected: z.boolean().optional(),
  encryptedKey: z.string().max(200).optional(), // Base64 encoded (for password protection)
  keyIv: z.string().max(50).optional(), // Base64 encoded (for password protection)
  salt: z.string().max(50).optional(), // Base64 encoded (for password protection)
  images: z.array(z.object({
    name: z.string().max(255),
    data: z.string().max(15000000), // Max ~11MB base64 (≈8MB raw per image)
    size: z.number().max(10485760), // Max 10MB per image
  })).max(3).optional(), // Max 3 images

  // Author information - allow null but validate as string if provided
  authorName: z.string().max(100).nullable().optional(),
  authorEmail: z.string().email().max(255).nullable().optional().or(z.literal('')),

  // View tracking - allow null but validate as number if provided
  maxViews: z.number().max(10000).nullable().optional(), // Max 10k views
  
  // Delete after reading
  deleteAfterReading: z.boolean().optional(),
  
  // Category/Tag
  category: z.enum(['password', 'credit-card', 'document', 'message', 'api-key', 'other']).nullable().optional(),
});

export const getNoteSchema = z.object({
  id: z.string().cuid(),
});

export const deleteNoteSchema = z.object({
  id: z.string().cuid(),
  token: z.string().optional(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type GetNoteInput = z.infer<typeof getNoteSchema>;
export type DeleteNoteInput = z.infer<typeof deleteNoteSchema>;

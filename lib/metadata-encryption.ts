import crypto from 'crypto';

// Require encryption key from environment - fail fast if missing
if (!process.env.METADATA_ENCRYPTION_KEY) {
  throw new Error('METADATA_ENCRYPTION_KEY environment variable is required for server-side metadata encryption');
}

const METADATA_KEY = process.env.METADATA_ENCRYPTION_KEY;
const SALT = 'vaultnote-metadata-salt-v1'; // Fixed salt for deterministic key derivation
const ALGORITHM = 'aes-256-gcm';

/**
 * Encrypt metadata fields (title, authorName, authorEmail)
 * Uses modern createCipheriv with proper IV and auth tag handling
 */
export async function encryptMetadata(text: string): Promise<string> {
  if (!text) return '';

  try {
    // Derive key using scrypt
    const key = crypto.scryptSync(METADATA_KEY, SALT, 32);
    const iv = crypto.randomBytes(16);

    // Use createCipheriv (modern API)
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    cipher.setAAD(Buffer.from('metadata')); // Additional authenticated data

    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    const authTag = cipher.getAuthTag();

    // Combine IV, encrypted text, and auth tag
    const result = iv.toString('base64') + ':' + encrypted + ':' + authTag.toString('base64');
    return result;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt metadata');
  }
}

/**
 * Decrypt metadata fields (title, authorName, authorEmail)
 * Uses modern createDecipheriv with proper IV and auth tag handling
 */
export async function decryptMetadata(encryptedText: string): Promise<string> {
  if (!encryptedText) return '';

  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted metadata format');
    }

    const [ivBase64, encrypted, authTagBase64] = parts;

    // Derive key using scrypt
    const key = crypto.scryptSync(METADATA_KEY, SALT, 32);
    const iv = Buffer.from(ivBase64, 'base64');
    const authTag = Buffer.from(authTagBase64, 'base64');

    // Use createDecipheriv (modern API)
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    decipher.setAAD(Buffer.from('metadata'));

    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('Error decrypting metadata:', error);
    return '[Decryption Failed]';
  }
}

export async function generateKey(): Promise<CryptoKey> {
  return await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
}

export async function deriveKeyFromPassword(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  return await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as BufferSource,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    {
      name: 'AES-GCM',
      length: 256,
    },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encrypt(text: string, key: CryptoKey): Promise<{ ciphertext: ArrayBuffer; iv: Uint8Array }> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for GCM

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    data
  );

  return { ciphertext, iv };
}

export async function encryptWithPassword(text: string, password: string): Promise<{ ciphertext: ArrayBuffer; iv: Uint8Array; salt: Uint8Array; encryptedKey: ArrayBuffer; keyIv: Uint8Array }> {
  // Generate random AES key for content
  const contentKey = await generateKey();

  // Derive key from password
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const passwordKey = await deriveKeyFromPassword(password, salt);

  // Encrypt content with random key
  const { ciphertext, iv } = await encrypt(text, contentKey);

  // Encrypt the random key with password-derived key
  const keyString = await keyToString(contentKey);
  const keyIv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const keyData = encoder.encode(keyString);

  const encryptedKey = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: keyIv,
    },
    passwordKey,
    keyData
  );

  return { ciphertext, iv, salt, encryptedKey, keyIv };
}

export async function decrypt(ciphertext: ArrayBuffer, iv: BufferSource, key: CryptoKey): Promise<string> {
  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    ciphertext
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

export async function decryptWithPassword(ciphertext: ArrayBuffer, iv: BufferSource, encryptedKey: ArrayBuffer, keyIv: BufferSource, salt: BufferSource, password: string): Promise<string> {
  // Derive key from password
  const passwordKey = await deriveKeyFromPassword(password, salt as Uint8Array);

  // Decrypt the random key
  const decryptedKeyData = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: keyIv,
    },
    passwordKey,
    encryptedKey
  );

  const decoder = new TextDecoder();
  const keyString = decoder.decode(decryptedKeyData);
  const contentKey = await stringToKey(keyString);

  // Decrypt content with random key
  return await decrypt(ciphertext, iv, contentKey);
}

export function keyToString(key: CryptoKey): Promise<string> {
  return crypto.subtle.exportKey('raw', key).then(buffer => btoa(String.fromCharCode(...new Uint8Array(buffer))));
}

export async function stringToKey(keyString: string): Promise<CryptoKey> {
  const keyData = Uint8Array.from(atob(keyString), c => c.charCodeAt(0));
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    {
      name: 'AES-GCM',
      length: 256,
    },
    false,
    ['encrypt', 'decrypt']
  );
}

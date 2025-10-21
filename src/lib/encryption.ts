import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const KEY_LENGTH = 32

/**
 * Encrypts a string using AES-256-GCM
 * @param text - The text to encrypt
 * @returns Object containing encrypted text and IV
 */
export function encrypt(text: string): { encrypted: string; iv: string } {
  const encryptionKey = process.env.ENCRYPTION_KEY
  
  if (!encryptionKey) {
    throw new Error('ENCRYPTION_KEY is not set in environment variables')
  }

  const key = Buffer.from(encryptionKey, 'hex')
  
  if (key.length !== KEY_LENGTH) {
    throw new Error(`Encryption key must be ${KEY_LENGTH} bytes`)
  }

  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const authTag = cipher.getAuthTag()
  
  return {
    encrypted: encrypted + authTag.toString('hex'),
    iv: iv.toString('hex'),
  }
}

/**
 * Decrypts a string using AES-256-GCM
 * @param encrypted - The encrypted text
 * @param iv - The initialization vector
 * @returns The decrypted text
 */
export function decrypt(encrypted: string, iv: string): string {
  const encryptionKey = process.env.ENCRYPTION_KEY
  
  if (!encryptionKey) {
    throw new Error('ENCRYPTION_KEY is not set in environment variables')
  }

  const key = Buffer.from(encryptionKey, 'hex')
  
  if (key.length !== KEY_LENGTH) {
    throw new Error(`Encryption key must be ${KEY_LENGTH} bytes`)
  }

  const authTag = Buffer.from(encrypted.slice(-32), 'hex')
  const encryptedText = encrypted.slice(0, -32)
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(iv, 'hex'))
  decipher.setAuthTag(authTag)
  
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  
  return decrypted
}

/**
 * Generates a random encryption key
 * @returns A hex-encoded 32-byte key
 */
export function generateEncryptionKey(): string {
  return crypto.randomBytes(KEY_LENGTH).toString('hex')
}


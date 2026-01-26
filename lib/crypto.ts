import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY as string // 32 chars
const IV_LENGTH = 16

export function decrypt(encryptedText: string) {
  const textParts = encryptedText.split(':')
  const iv = Buffer.from(textParts.shift()!, 'hex')
  const encrypted = Buffer.from(textParts.join(':'), 'hex')

  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  )

  let decrypted = decipher.update(encrypted)
  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}

import { headers } from 'next/headers';

/**
 * Get the CSP nonce for inline scripts and styles.
 * This nonce is generated per-request by the middleware and should be used
 * on script and style tags that need to bypass CSP restrictions.
 * 
 * Usage in Server Components:
 * const nonce = await getNonce();
 * 
 * Usage in JSX:
 * <script nonce={nonce}>{code}</script>
 */
export async function getNonce(): Promise<string> {
  const headersList = await headers();
  return headersList.get('x-nonce') || '';
}

/**
 * Get all available response headers.
 * Useful for debugging CSP nonce and other security headers.
 */
export async function getResponseHeaders() {
  return await headers();
}

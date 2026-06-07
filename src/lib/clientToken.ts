/**
 * Generate an unguessable, URL-safe access token for a client portal link.
 * Uses Web Crypto (available in both the Node and Edge runtimes) so it works
 * everywhere Aura runs.
 */
export function generateClientToken(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const SESSION_COOKIE = 'aura_session_id';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 1 week

/**
 * HMAC signing key for session tokens.
 * MUST be set via the AUTH_SECRET environment variable in production.
 * A static/known value would let anyone forge an admin session, so we never
 * ship a usable hardcoded secret.
 */
function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 16) return secret;

  if (process.env.NODE_ENV === 'production') {
    console.warn(
      'SECURITY WARNING: AUTH_SECRET is missing or too short (<16 chars). ' +
        'Set a strong, random AUTH_SECRET in the environment to secure admin sessions.'
    );
  }
  // Dev-only fallback so local development works without setup.
  return secret || 'aura-dev-insecure-secret-change-me';
}

const encoder = new TextEncoder();

// ---- base64url helpers (edge + node safe) ----
function bytesToBase64Url(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToBytes(input: string): Uint8Array {
  let s = input.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function strToBase64Url(s: string): string {
  return bytesToBase64Url(encoder.encode(s));
}

function base64UrlToStr(s: string): string {
  return new TextDecoder().decode(base64UrlToBytes(s));
}

/** Constant-time string comparison to avoid leaking length/secret via timing. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

// ---- Signed session tokens (HMAC-SHA256 via Web Crypto) ----
async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

async function signSession(expSeconds: number): Promise<string> {
  const data = strToBase64Url(JSON.stringify({ exp: expSeconds }));
  const key = await importHmacKey(getSecret());
  const sigBuf = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return `${data}.${bytesToBase64Url(new Uint8Array(sigBuf))}`;
}

async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [data, sig] = parts;

  const key = await importHmacKey(getSecret());
  const expectedBuf = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const expected = bytesToBase64Url(new Uint8Array(expectedBuf));
  if (!timingSafeEqual(sig, expected)) return false;

  try {
    const payload = JSON.parse(base64UrlToStr(data)) as { exp?: number };
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}

// ---- Password verification (PBKDF2 via Web Crypto — edge-safe, no node:crypto) ----
async function pbkdf2(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const baseKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    // Copy into a fresh ArrayBuffer-backed view to satisfy the strict BufferSource type.
    { name: 'PBKDF2', salt: new Uint8Array(salt), iterations, hash: 'SHA-256' },
    baseKey,
    256
  );
  return new Uint8Array(bits);
}

async function verifyPassword(password: string): Promise<boolean> {
  if (!password) return false;

  // Preferred: a PBKDF2 hash, format "pbkdf2$<iterations>$<saltB64url>$<hashB64url>".
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (hash) {
    const [scheme, iterStr, saltB64, hashB64] = hash.split('$');
    if (scheme !== 'pbkdf2' || !iterStr || !saltB64 || !hashB64) return false;
    const iterations = parseInt(iterStr, 10);
    if (!Number.isFinite(iterations) || iterations < 1) return false;
    const actual = await pbkdf2(password, base64UrlToBytes(saltB64), iterations);
    return timingSafeEqual(bytesToBase64Url(actual), hashB64);
  }

  // Fallback: a plaintext password supplied only via the environment.
  const plain = process.env.ADMIN_PASSWORD;
  if (plain) return timingSafeEqual(password, plain);

  console.warn(
    'SECURITY WARNING: Neither ADMIN_PASSWORD_HASH nor ADMIN_PASSWORD is set. Admin login is disabled.'
  );
  return false;
}

export async function login(password: string): Promise<boolean> {
  if (!(await verifyPassword(password))) return false;

  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const token = await signSession(exp);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
  return true;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySession(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function isAuthenticatedMiddleware(request: NextRequest): Promise<boolean> {
  return verifySession(request.cookies.get(SESSION_COOKIE)?.value);
}

/** Throws "Unauthorized" if the caller is not an authenticated admin. */
export async function assertAuthenticated(): Promise<void> {
  if (!(await isAuthenticated())) {
    throw new Error('Unauthorized');
  }
}

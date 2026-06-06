#!/usr/bin/env node
// Generates an ADMIN_PASSWORD_HASH value for src/lib/auth.ts.
// Usage: node scripts/hash-password.mjs "your-strong-password"
//
// Output format (matches verifyPassword in src/lib/auth.ts):
//   pbkdf2$<iterations>$<saltBase64Url>$<hashBase64Url>

import { pbkdf2Sync, randomBytes } from "node:crypto";

const ITERATIONS = 210000;
const KEYLEN = 32; // 256 bits, matches the Web Crypto deriveBits length
const DIGEST = "sha256";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "your-strong-password"');
  process.exit(1);
}

const toBase64Url = (buf) =>
  buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST);

const value = `pbkdf2$${ITERATIONS}$${toBase64Url(salt)}$${toBase64Url(hash)}`;

console.log("\nAdd this to your environment (.env):\n");
console.log(`ADMIN_PASSWORD_HASH="${value}"\n`);

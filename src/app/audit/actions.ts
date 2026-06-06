"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import xss from "xss";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

const RATE_LIMIT_MAX = 5; // max 5 submissions
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitAuditForm(formData: FormData) {
  // 1. Rate limiting
  const ip = getClientIp(await headers());
  if (!rateLimit(`audit:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS).allowed) {
    throw new Error("Too many requests. Please try again later.");
  }

  // 2. Validation
  const sanitize = (val: FormDataEntryValue | null) => xss(String(val ?? "").trim());
  const name = sanitize(formData.get("name"));
  const email = sanitize(formData.get("email"));
  const company = sanitize(formData.get("company"));
  const message = sanitize(formData.get("message"));

  if (!name || !company) {
    throw new Error("Please provide your name and company.");
  }
  if (!EMAIL_RE.test(email)) {
    throw new Error("Please provide a valid email address.");
  }

  // 3. Persist
  await prisma.submission.create({
    data: {
      name,
      email,
      company,
      message,
      status: sanitize(formData.get("status")) || "new",
    },
  });

  revalidatePath("/admin");

  return { success: true };
}

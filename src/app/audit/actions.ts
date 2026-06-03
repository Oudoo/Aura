"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import xss from "xss";

// In-memory rate limiting store (clears on server restart, but sufficient for basic protection)
const rateLimitMap = new Map<string, { count: number, timestamp: number }>();
const RATE_LIMIT_MAX = 5; // max 5 submissions
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function submitAuditForm(formData: FormData) {
  // 1. Rate Limiting Check
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown_ip";
  const now = Date.now();
  
  const userRateData = rateLimitMap.get(ip) || { count: 0, timestamp: now };
  
  if (now - userRateData.timestamp > RATE_LIMIT_WINDOW_MS) {
    // Reset window
    userRateData.count = 1;
    userRateData.timestamp = now;
  } else {
    userRateData.count += 1;
  }
  
  rateLimitMap.set(ip, userRateData);
  
  if (userRateData.count > RATE_LIMIT_MAX) {
    throw new Error("Too many requests. Please try again later.");
  }

  // 2. Strict XSS Sanitization
  const sanitize = (val: string | null) => xss(val || "");

  const safeData = {
    name: sanitize(formData.get("name") as string),
    email: sanitize(formData.get("email") as string),
    company: sanitize(formData.get("company") as string),
    message: sanitize(formData.get("message") as string),
    status: sanitize(formData.get("status") as string) || "new",
  };

  // 3. Database Insertion
  const newSubmission = await prisma.submission.create({
    data: safeData,
  });
  
  revalidatePath("/admin");
  
  return { success: true };
}

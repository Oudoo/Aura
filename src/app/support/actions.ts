"use server";

import { prisma } from "@/lib/db";

export async function submitPublicTicketAction(formData: FormData) {
  const clientName = formData.get("clientName") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string || "MEDIUM";

  if (!clientName || !title || !description) {
    throw new Error("Missing required fields");
  }

  await prisma.ticket.create({
    data: {
      clientName,
      title,
      description,
      priority,
      status: "OPEN"
    }
  });
}

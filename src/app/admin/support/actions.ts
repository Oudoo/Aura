"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTicketAction(data: { title: string, description: string, clientName: string, priority: string }) {
  await prisma.ticket.create({
    data: {
      title: data.title,
      description: data.description,
      clientName: data.clientName,
      priority: data.priority,
    },
  });
  revalidatePath("/admin/support");
}

export async function updateTicketStatusAction(id: string, status: string) {
  await prisma.ticket.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/support");
}

export async function deleteTicketAction(id: string) {
  await prisma.ticket.delete({
    where: { id },
  });
  revalidatePath("/admin/support");
}

"use server";

import { assertAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateClientToken } from "@/lib/clientToken";
import { revalidatePath } from "next/cache";

export async function createClientAction(data: {
  name: string;
  company?: string;
  email?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    await assertAuthenticated();
    if (!data.name?.trim()) {
      return { success: false, error: "Client name is required." };
    }
    await prisma.client.create({
      data: {
        name: data.name.trim(),
        company: data.company?.trim() || null,
        email: data.email?.trim() || null,
        accessToken: generateClientToken(),
      },
    });
    revalidatePath("/admin/clients");
    return { success: true };
  } catch (e) {
    console.error("createClientAction failed:", e);
    return { success: false, error: "Could not create client. Please try again." };
  }
}

export async function regenerateClientTokenAction(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    await assertAuthenticated();
    await prisma.client.update({
      where: { id },
      data: { accessToken: generateClientToken() },
    });
    revalidatePath("/admin/clients");
    return { success: true };
  } catch (e) {
    console.error("regenerateClientTokenAction failed:", e);
    return { success: false, error: "Could not regenerate link." };
  }
}

export async function toggleClientActiveAction(
  id: string,
  isActive: boolean,
): Promise<{ success: boolean; error?: string }> {
  try {
    await assertAuthenticated();
    await prisma.client.update({ where: { id }, data: { isActive } });
    revalidatePath("/admin/clients");
    return { success: true };
  } catch (e) {
    console.error("toggleClientActiveAction failed:", e);
    return { success: false, error: "Could not update client." };
  }
}

export async function deleteClientAction(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    await assertAuthenticated();
    await prisma.client.delete({ where: { id } });
    revalidatePath("/admin/clients");
    return { success: true };
  } catch (e) {
    console.error("deleteClientAction failed:", e);
    return { success: false, error: "Could not delete client." };
  }
}

"use server";

import { logout } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await logout();
  redirect("/");
}

export async function deleteSubmissionAction(id: string) {
  await prisma.submission.delete({
    where: { id },
  });
  revalidatePath("/admin");
}

export async function updateSubmissionAction(id: string, field: string, value: string) {
  await prisma.submission.update({
    where: { id },
    data: { [field]: value },
  });
  revalidatePath("/admin");
}

export async function addProductAction(suiteSlug: string, newProduct: any) {
  const suite = await prisma.suite.findUnique({
    where: { slug: suiteSlug },
  });

  if (suite) {
    await prisma.product.create({
      data: {
        name: newProduct.name,
        nameAr: newProduct.nameAr || newProduct.name,
        slug: newProduct.slug,
        description: newProduct.description,
        descAr: newProduct.descAr || newProduct.description,
        suiteId: suite.id,
      },
    });
  }
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/suites");
  revalidatePath("/");
}

export async function deleteProductAction(suiteSlug: string, productSlug: string) {
  await prisma.product.delete({
    where: { slug: productSlug },
  });
  
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/suites");
  revalidatePath("/");
}

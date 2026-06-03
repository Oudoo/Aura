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

export async function updateSubmissionDealValueAction(id: string, dealValue: number) {
  await prisma.submission.update({
    where: { id },
    data: { dealValue },
  });
  revalidatePath("/admin");
}

export async function updateSubmissionFollowUpAction(id: string, nextFollowUp: Date | null) {
  await prisma.submission.update({
    where: { id },
    data: { nextFollowUp },
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
        order: parseInt(newProduct.order) || 0,
        features: newProduct.features,
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

export async function editProductAction(suiteSlug: string, productSlug: string, data: any) {
  await prisma.product.update({
    where: { slug: productSlug },
    data: {
      name: data.name,
      nameAr: data.nameAr || data.name,
      slug: data.slug,
      description: data.description,
      descAr: data.descAr || data.description,
      order: parseInt(data.order) || 0,
      features: data.features,
    },
  });
  
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/suites");
  revalidatePath("/");
}

export async function toggleProductStatusAction(productSlug: string, currentStatus: string) {
  const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
  await prisma.product.update({
    where: { slug: productSlug },
    data: { status: newStatus },
  });
  
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/suites");
  revalidatePath("/");
}

export async function addSuiteAction(data: any) {
  await prisma.suite.create({
    data: {
      suite: data.suite,
      suiteAr: data.suiteAr || data.suite,
      slug: data.slug,
    },
  });
  
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/suites");
  revalidatePath("/");
}

export async function editSuiteAction(originalSlug: string, data: any) {
  await prisma.suite.update({
    where: { slug: originalSlug },
    data: {
      suite: data.suite,
      suiteAr: data.suiteAr || data.suite,
      slug: data.slug,
    },
  });
  
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/suites");
  revalidatePath("/");
}

export async function deleteSuiteAction(suiteSlug: string) {
  await prisma.suite.delete({
    where: { slug: suiteSlug },
  });
  
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/suites");
  revalidatePath("/");
}

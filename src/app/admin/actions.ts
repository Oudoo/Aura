"use server";

import { assertAuthenticated, logout } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ProductInput, SuiteInput } from "@/lib/types";

// Fields on Submission that are safe to update inline from the CRM table.
const EDITABLE_SUBMISSION_FIELDS = ["status", "called", "notes", "priority", "source"] as const;
type EditableSubmissionField = (typeof EDITABLE_SUBMISSION_FIELDS)[number];

export async function logoutAction() {
  await logout();
  redirect("/");
}

export async function deleteSubmissionAction(id: string) {
  await assertAuthenticated();
  await prisma.submission.delete({
    where: { id },
  });
  revalidatePath("/admin");
}

export async function updateSubmissionAction(id: string, field: string, value: string) {
  await assertAuthenticated();
  if (!EDITABLE_SUBMISSION_FIELDS.includes(field as EditableSubmissionField)) {
    throw new Error(`Field "${field}" is not editable`);
  }
  await prisma.submission.update({
    where: { id },
    data: { [field]: value },
  });
  revalidatePath("/admin");
}

export async function updateSubmissionDealValueAction(id: string, dealValue: number) {
  await assertAuthenticated();
  await prisma.submission.update({
    where: { id },
    data: { dealValue },
  });
  revalidatePath("/admin");
}

export async function updateSubmissionFollowUpAction(id: string, nextFollowUp: Date | null) {
  await assertAuthenticated();
  await prisma.submission.update({
    where: { id },
    data: { nextFollowUp },
  });
  revalidatePath("/admin");
}

export async function addProductAction(suiteSlug: string, newProduct: ProductInput) {
  await assertAuthenticated();
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
        order: parseInt(String(newProduct.order ?? "")) || 0,
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
  await assertAuthenticated();
  await prisma.product.delete({
    where: { slug: productSlug },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/suites");
  revalidatePath("/");
}

export async function editProductAction(suiteSlug: string, productSlug: string, data: ProductInput) {
  await assertAuthenticated();
  await prisma.product.update({
    where: { slug: productSlug },
    data: {
      name: data.name,
      nameAr: data.nameAr || data.name,
      slug: data.slug,
      description: data.description,
      descAr: data.descAr || data.description,
      order: parseInt(String(data.order ?? "")) || 0,
      features: data.features,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/suites");
  revalidatePath("/");
}

export async function toggleProductStatusAction(productSlug: string, currentStatus: string) {
  await assertAuthenticated();
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

export async function addSuiteAction(data: SuiteInput) {
  await assertAuthenticated();
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

export async function editSuiteAction(originalSlug: string, data: SuiteInput) {
  await assertAuthenticated();
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
  await assertAuthenticated();
  await prisma.suite.delete({
    where: { slug: suiteSlug },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/suites");
  revalidatePath("/");
}

export async function seedEcosystemAction() {
  await assertAuthenticated();
  const { ecosystem } = await import("@/data/ecosystem");

  for (const suiteData of ecosystem) {
    const { products, ...suiteFields } = suiteData;
    const suite = await prisma.suite.upsert({
      where: { slug: suiteFields.slug },
      update: suiteFields,
      create: suiteFields,
    });

    for (const p of products) {
      await prisma.product.upsert({
        where: { slug: p.slug },
        update: { ...p, suiteId: suite.id },
        create: { ...p, suiteId: suite.id, nameAr: p.nameAr ?? p.name, descAr: p.descAr ?? p.description },
      });
    }
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
}

"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createProjectAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title) return;

  await prisma.project.create({
    data: {
      title,
      description,
    },
  });

  revalidatePath("/admin/projects");
}

export async function deleteProjectAction(id: string) {
  await prisma.project.delete({
    where: { id },
  });
  revalidatePath("/admin/projects");
}

export async function createTaskAction(projectId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const assignee = formData.get("assignee") as string;

  if (!title) return;

  await prisma.task.create({
    data: {
      title,
      description,
      assignee: assignee || "Unassigned",
      projectId,
    },
  });

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin/projects");
}

export async function updateTaskStatusAction(id: string, projectId: string, status: string) {
  await prisma.task.update({
    where: { id },
    data: { status },
  });
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin/projects");
}

export async function updateTaskAssigneeAction(id: string, projectId: string, assignee: string) {
  await prisma.task.update({
    where: { id },
    data: { assignee },
  });
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function deleteTaskAction(id: string, projectId: string) {
  await prisma.task.delete({
    where: { id },
  });
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin/projects");
}

export async function createSubTaskAction(taskId: string, projectId: string, formData: FormData) {
  const title = formData.get("title") as string;
  
  if (!title) return;

  await prisma.subTask.create({
    data: {
      title,
      taskId,
    },
  });
  
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function toggleSubTaskAction(id: string, projectId: string, isCompleted: boolean) {
  await prisma.subTask.update({
    where: { id },
    data: { isCompleted },
  });
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function deleteSubTaskAction(id: string, projectId: string) {
  await prisma.subTask.delete({
    where: { id },
  });
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function addCommentAction(taskId: string, projectId: string, author: string, formData: FormData) {
  const content = formData.get("content") as string;
  
  if (!content) return;

  await prisma.comment.create({
    data: {
      content,
      author,
      taskId,
    },
  });
  
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function addAttachmentAction(taskId: string, projectId: string, formData: FormData) {
  const name = formData.get("name") as string;
  const url = formData.get("url") as string;
  
  if (!name || !url) return;

  await prisma.attachment.create({
    data: {
      name,
      url,
      taskId,
    },
  });
  
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function deleteAttachmentAction(id: string, projectId: string) {
  await prisma.attachment.delete({
    where: { id },
  });
  revalidatePath(`/admin/projects/${projectId}`);
}

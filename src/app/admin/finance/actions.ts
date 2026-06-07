"use server";

import { assertAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sendEmail, emailShell, isEmailConfigured } from "@/lib/email";

export async function createInvoiceAction(data: { clientName: string, amount: number, dueDate?: Date | null }) {
  await assertAuthenticated();
  // Find highest invoice number
  const lastInvoice = await prisma.invoice.findFirst({
    orderBy: { createdAt: 'desc' }
  });
  
  let nextNumber = 1;
  if (lastInvoice && lastInvoice.invoiceNo.startsWith('INV-')) {
    const numPart = parseInt(lastInvoice.invoiceNo.replace('INV-', ''));
    if (!isNaN(numPart)) nextNumber = numPart + 1;
  }
  
  const invoiceNo = `INV-${nextNumber.toString().padStart(3, '0')}`;

  await prisma.invoice.create({
    data: {
      invoiceNo,
      clientName: data.clientName,
      amount: data.amount,
      dueDate: data.dueDate,
    },
  });
  revalidatePath("/admin/finance");
}

export async function updateInvoiceStatusAction(id: string, status: string) {
  await assertAuthenticated();
  await prisma.invoice.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/finance");
}

export async function deleteInvoiceAction(id: string) {
  await assertAuthenticated();
  await prisma.invoice.delete({
    where: { id },
  });
  revalidatePath("/admin/finance");
}

/** Email a branded invoice to a client and mark it SENT. */
export async function emailInvoiceAction(
  id: string,
  to: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    await assertAuthenticated();
    if (!isEmailConfigured()) {
      return { success: false, error: "Email isn't configured yet. Add your SMTP credentials in the environment." };
    }
    if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return { success: false, error: "Please enter a valid recipient email address." };
    }

    const invoice = await prisma.invoice.findUnique({ where: { id } });
    if (!invoice) return { success: false, error: "Invoice not found." };

    const amount = `$${invoice.amount.toLocaleString()}`;
    const due = invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : "Upon receipt";
    const html = emailShell(`
      <h2 style="margin:0 0 8px;font-size:20px;color:#0f172a">Invoice ${invoice.invoiceNo}</h2>
      <p style="color:#475569;margin:0 0 24px">Hello ${invoice.clientName},</p>
      <p style="color:#475569;margin:0 0 24px">Please find your invoice summary below.</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b">Invoice No.</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:bold">${invoice.invoiceNo}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b">Amount Due</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:bold;color:#0284c7;font-size:18px">${amount}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b">Due Date</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;text-align:right">${due}</td></tr>
      </table>
      <p style="color:#475569;margin:0">If you have any questions about this invoice, simply reply to this email.</p>
    `);

    const res = await sendEmail({
      to,
      subject: `Invoice ${invoice.invoiceNo} from Aura — ${amount}`,
      html,
    });
    if (!res.success) return { success: false, error: res.error };

    if (invoice.status === "DRAFT") {
      await prisma.invoice.update({ where: { id }, data: { status: "SENT" } });
    }
    revalidatePath("/admin/finance");
    return { success: true };
  } catch (e) {
    console.error("emailInvoiceAction failed:", e);
    return { success: false, error: "Could not send the invoice email." };
  }
}

/** Send a branded proposal email to a prospect or client. */
export async function sendProposalAction(data: {
  to: string;
  clientName: string;
  subject: string;
  body: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    await assertAuthenticated();
    if (!isEmailConfigured()) {
      return { success: false, error: "Email isn't configured yet. Add your SMTP credentials in the environment." };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.to)) {
      return { success: false, error: "Please enter a valid recipient email address." };
    }
    if (!data.subject?.trim() || !data.body?.trim()) {
      return { success: false, error: "Subject and message are required." };
    }

    const paragraphs = data.body
      .trim()
      .split(/\n{2,}/)
      .map((p) => `<p style="color:#475569;margin:0 0 16px;line-height:1.6">${p.replace(/\n/g, "<br/>")}</p>`)
      .join("");

    const html = emailShell(`
      <h2 style="margin:0 0 16px;font-size:20px;color:#0f172a">${data.subject}</h2>
      <p style="color:#475569;margin:0 0 16px">Hello ${data.clientName || "there"},</p>
      ${paragraphs}
      <a href="https://getaura.business" style="display:inline-block;margin-top:8px;background:#0284c7;color:#fff;text-decoration:none;padding:12px 24px;border-radius:9999px;font-weight:bold">Explore Aura</a>
    `);

    const res = await sendEmail({ to: data.to, subject: data.subject, html });
    return res.success ? { success: true } : { success: false, error: res.error };
  } catch (e) {
    console.error("sendProposalAction failed:", e);
    return { success: false, error: "Could not send the proposal email." };
  }
}

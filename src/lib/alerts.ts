import { prisma } from "@/lib/db";

/**
 * Smart Alerts — proactively surfaces the two things that quietly cost a
 * services business money: overdue invoices and missed project milestones.
 *
 * Each alert carries a ready-to-send WhatsApp message. By default we generate a
 * free click-to-send wa.me link (no Meta verification, no per-message fee). The
 * moment the WhatsApp Business Cloud API is configured (env vars present), the
 * same payload can be auto-dispatched instead — see `isWhatsAppAutoSendEnabled`.
 */

export type AlertSeverity = "high" | "medium";

export interface SmartAlert {
  id: string;
  type: "overdue_invoice" | "missed_milestone";
  severity: AlertSeverity;
  title: string;
  detail: string;
  owner: string; // responsible person / client
  message: string; // prefilled WhatsApp/notification body
  waLink: string; // free click-to-send link
}

/** The central ops number alerts are routed to (no per-assignee directory yet). */
function opsNumber(): string {
  // Digits only, international format without "+".
  return (process.env.AURA_OPS_WHATSAPP || "201066221112").replace(/[^0-9]/g, "");
}

function waLinkFor(message: string): string {
  return `https://wa.me/${opsNumber()}?text=${encodeURIComponent(message)}`;
}

/** True when the paid WhatsApp Business Cloud API is fully configured. */
export function isWhatsAppAutoSendEnabled(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_WHATSAPP_FROM &&
      process.env.AURA_SALES_WHATSAPP_TO,
  );
}

export async function getSmartAlerts(): Promise<SmartAlert[]> {
  const now = new Date();
  const alerts: SmartAlert[] = [];

  // ---- Overdue invoices ----------------------------------------------------
  // Keep statuses honest first, then read the overdue set back.
  await prisma.invoice
    .updateMany({
      where: { status: { notIn: ["PAID", "OVERDUE"] }, dueDate: { lt: now } },
      data: { status: "OVERDUE" },
    })
    .catch(() => {});

  const overdueInvoices = await prisma.invoice.findMany({
    where: { status: "OVERDUE" },
    orderBy: { dueDate: "asc" },
  });

  for (const inv of overdueInvoices) {
    const daysLate = inv.dueDate
      ? Math.max(0, Math.floor((now.getTime() - inv.dueDate.getTime()) / 86400000))
      : 0;
    const amount = `$${inv.amount.toLocaleString()}`;
    const message =
      `⚠️ *Overdue Invoice*\n` +
      `Invoice: ${inv.invoiceNo}\n` +
      `Client: ${inv.clientName}\n` +
      `Amount: ${amount}\n` +
      (daysLate ? `${daysLate} day(s) overdue\n` : "") +
      `Please follow up on payment.`;
    alerts.push({
      id: `inv-${inv.id}`,
      type: "overdue_invoice",
      severity: daysLate >= 14 ? "high" : "medium",
      title: `${inv.invoiceNo} · ${inv.clientName}`,
      detail: `${amount} overdue${daysLate ? ` by ${daysLate} day${daysLate === 1 ? "" : "s"}` : ""}`,
      owner: inv.clientName,
      message,
      waLink: waLinkFor(message),
    });
  }

  // ---- Missed milestones (tasks past due, not done) ------------------------
  const missed = await prisma.task.findMany({
    where: { status: { not: "DONE" }, dueDate: { lt: now } },
    include: { project: { select: { title: true } } },
    orderBy: { dueDate: "asc" },
  });

  for (const t of missed) {
    const daysLate = t.dueDate
      ? Math.max(0, Math.floor((now.getTime() - t.dueDate.getTime()) / 86400000))
      : 0;
    const message =
      `⏰ *Missed Milestone*\n` +
      `Task: ${t.title}\n` +
      `Project: ${t.project?.title ?? "—"}\n` +
      `Owner: ${t.assignee}\n` +
      (daysLate ? `${daysLate} day(s) past due\n` : "") +
      `Please update the status or rebook the deadline.`;
    alerts.push({
      id: `task-${t.id}`,
      type: "missed_milestone",
      severity: daysLate >= 7 ? "high" : "medium",
      title: t.title,
      detail: `${t.project?.title ?? "Project"} · ${t.assignee}${daysLate ? ` · ${daysLate}d late` : ""}`,
      owner: t.assignee,
      message,
      waLink: waLinkFor(message),
    });
  }

  // High severity first.
  return alerts.sort((a, b) => (a.severity === b.severity ? 0 : a.severity === "high" ? -1 : 1));
}

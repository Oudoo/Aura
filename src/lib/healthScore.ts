import { prisma } from "@/lib/db";

/**
 * Aura Health Score
 * ----------------
 * A single 0–100 operational health index for a business, derived from the
 * live data already flowing through Aura (projects, invoices, support, leads).
 *
 * Four weighted pillars roll up into the overall score:
 *   • delivery  — are projects/tasks moving and on time?
 *   • finance   — are invoices getting paid, and is anything overdue?
 *   • support   — is the support queue under control?
 *   • pipeline  — is new business flowing in? (company scope only)
 *
 * The same engine powers the admin Analytics gauge, the white-label client
 * portal, and the marketing showcase. Pass a `clientName` to scope the score
 * to a single client (pipeline is omitted in that case).
 */

export interface HealthPillar {
  key: "delivery" | "finance" | "support" | "pipeline";
  label: string;
  score: number; // 0–100
  detail: string; // human-readable one-liner
}

export interface HealthScore {
  overall: number; // 0–100
  grade: "Excellent" | "Healthy" | "At Risk" | "Critical";
  pillars: HealthPillar[];
  computedAt: string; // ISO
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function gradeFor(score: number): HealthScore["grade"] {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Healthy";
  if (score >= 50) return "At Risk";
  return "Critical";
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Compute the live health score. When `clientName` is provided the score is
 * scoped to that client (delivery + finance + support only).
 */
export async function computeHealthScore(clientName?: string): Promise<HealthScore> {
  const scoped = Boolean(clientName);
  const now = Date.now();

  // Run the independent queries together.
  const [tasks, invoices, tickets, recentLeads] = await Promise.all([
    prisma.task.findMany({
      where: clientName ? { project: { clientName } } : undefined,
      select: { status: true, dueDate: true },
    }),
    prisma.invoice.findMany({
      where: clientName ? { clientName } : undefined,
      select: { status: true, amount: true, dueDate: true },
    }),
    prisma.ticket.findMany({
      where: clientName ? { clientName } : undefined,
      select: { status: true, priority: true },
    }),
    scoped
      ? Promise.resolve([] as { date: Date }[])
      : prisma.submission.findMany({ select: { date: true } }),
  ]);

  // ---- Delivery ------------------------------------------------------------
  // Reward completion; punish tasks that are past their due date and not done.
  let deliveryScore = 80; // neutral baseline when there is nothing to measure
  let deliveryDetail = "No active tasks";
  if (tasks.length > 0) {
    const done = tasks.filter((t) => t.status === "DONE").length;
    const overdue = tasks.filter(
      (t) => t.status !== "DONE" && t.dueDate && t.dueDate.getTime() < now,
    ).length;
    const completion = done / tasks.length; // 0–1
    const overdueRate = overdue / tasks.length; // 0–1
    deliveryScore = clamp(completion * 100 - overdueRate * 60);
    deliveryDetail = `${done}/${tasks.length} tasks done${overdue ? `, ${overdue} overdue` : ""}`;
  }

  // ---- Finance -------------------------------------------------------------
  // Overdue invoices (explicit status OR past due date) drag the score down,
  // weighted by their share of total billed value.
  let financeScore = 90;
  let financeDetail = "No invoices";
  if (invoices.length > 0) {
    const totalValue = invoices.reduce((s, i) => s + (i.amount || 0), 0) || 1;
    const overdueInvoices = invoices.filter(
      (i) =>
        i.status === "OVERDUE" ||
        (i.status !== "PAID" && i.dueDate && i.dueDate.getTime() < now),
    );
    const overdueValue = overdueInvoices.reduce((s, i) => s + (i.amount || 0), 0);
    const paid = invoices.filter((i) => i.status === "PAID").length;
    const overdueValueRate = overdueValue / totalValue; // 0–1
    financeScore = clamp(95 - overdueValueRate * 95);
    financeDetail = `${paid}/${invoices.length} paid${
      overdueInvoices.length ? `, ${overdueInvoices.length} overdue` : ""
    }`;
  }

  // ---- Support -------------------------------------------------------------
  // A clean queue is 100. Open tickets cost a little; urgent/high cost more.
  let supportScore = 100;
  let supportDetail = "Queue clear";
  const openTickets = tickets.filter(
    (t) => t.status === "OPEN" || t.status === "IN_PROGRESS",
  );
  if (openTickets.length > 0) {
    const urgent = openTickets.filter(
      (t) => t.priority === "URGENT" || t.priority === "HIGH",
    ).length;
    supportScore = clamp(100 - openTickets.length * 8 - urgent * 12);
    supportDetail = `${openTickets.length} open${urgent ? `, ${urgent} urgent` : ""}`;
  }

  // ---- Pipeline (company scope only) --------------------------------------
  let pipelineScore = 75;
  let pipelineDetail = "—";
  if (!scoped) {
    const last30 = recentLeads.filter(
      (l) => now - l.date.getTime() < 30 * MS_PER_DAY,
    ).length;
    // 10+ leads in 30 days is a strong, healthy pipeline.
    pipelineScore = clamp((last30 / 10) * 100);
    pipelineDetail = `${last30} new leads / 30d`;
  }

  const pillars: HealthPillar[] = [
    { key: "delivery", label: "Delivery", score: deliveryScore, detail: deliveryDetail },
    { key: "finance", label: "Finance", score: financeScore, detail: financeDetail },
    { key: "support", label: "Support", score: supportScore, detail: supportDetail },
  ];
  if (!scoped) {
    pillars.push({ key: "pipeline", label: "Pipeline", score: pipelineScore, detail: pipelineDetail });
  }

  // Weighted roll-up. Delivery and finance matter most.
  const weights = scoped
    ? { delivery: 0.45, finance: 0.35, support: 0.2, pipeline: 0 }
    : { delivery: 0.35, finance: 0.3, support: 0.15, pipeline: 0.2 };
  const overall = clamp(
    pillars.reduce((sum, p) => sum + p.score * (weights[p.key] ?? 0), 0),
  );

  return {
    overall,
    grade: gradeFor(overall),
    pillars,
    computedAt: new Date().toISOString(),
  };
}

export interface TrendPoint {
  date: string; // ISO date (yyyy-mm-dd)
  score: number;
}

/**
 * Persist at most one snapshot per scope per day, then return the recent
 * trend. Safe to call on every Analytics page view.
 */
export async function captureAndGetTrend(
  clientName?: string,
  days = 14,
): Promise<{ current: HealthScore; trend: TrendPoint[] }> {
  const scope = clientName ?? "company";
  const current = await computeHealthScore(clientName);

  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const existingToday = await prisma.healthSnapshot.findFirst({
      where: { scope, capturedAt: { gte: startOfToday } },
    });

    if (!existingToday) {
      await prisma.healthSnapshot.create({
        data: {
          scope,
          score: current.overall,
          breakdown: JSON.stringify(
            Object.fromEntries(current.pillars.map((p) => [p.key, p.score])),
          ),
        },
      });
    }

    const since = new Date(Date.now() - days * MS_PER_DAY);
    const snapshots = await prisma.healthSnapshot.findMany({
      where: { scope, capturedAt: { gte: since } },
      orderBy: { capturedAt: "asc" },
    });

    // One point per day (latest snapshot of each day wins).
    const byDay = new Map<string, number>();
    for (const s of snapshots) {
      byDay.set(s.capturedAt.toISOString().slice(0, 10), s.score);
    }
    const trend: TrendPoint[] = [...byDay.entries()].map(([date, score]) => ({ date, score }));

    return { current, trend };
  } catch (e) {
    // Trend is a nice-to-have; never let a snapshot failure break the score.
    console.error("[healthScore] snapshot/trend failed:", e);
    return { current, trend: [{ date: new Date().toISOString().slice(0, 10), score: current.overall }] };
  }
}

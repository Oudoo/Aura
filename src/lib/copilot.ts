import { prisma } from "@/lib/db";
import { computeHealthScore } from "@/lib/healthScore";

/**
 * Aura Copilot — a deterministic, zero-cost natural-language query engine over
 * the unified data layer. It maps a manager's plain-English question to a set
 * of intents, runs the matching Prisma queries, and returns a structured
 * answer. No external LLM/API key is required, so there is no per-query cost.
 *
 * (If an LLM is wired in later, this same function is the perfect "tool" for it
 * to call — the structured answers become grounded context.)
 */

export interface CopilotAnswer {
  text: string;
  metric?: { label: string; value: string };
  table?: { columns: string[]; rows: string[][] };
}

const money = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

function monthBounds(now = new Date()) {
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return { start, end };
}

function has(q: string, ...words: string[]): boolean {
  return words.some((w) => q.includes(w));
}

export const COPILOT_SUGGESTIONS = [
  "Show me overdue invoices",
  "What revenue did we collect this month?",
  "Which deliveries are delayed?",
  "How many open support tickets?",
  "Who are my hottest leads?",
  "What's our health score?",
  "Top clients by revenue",
];

export async function answerQuestion(question: string): Promise<CopilotAnswer> {
  const q = question.toLowerCase().trim();

  if (!q) {
    return { text: "Ask me anything about your projects, invoices, leads, support or overall health." };
  }

  // ---- Health score --------------------------------------------------------
  if (has(q, "health", "how are we doing", "overall")) {
    const h = await computeHealthScore();
    return {
      text: `Your Aura Health Score is ${h.overall}/100 (${h.grade}). ` +
        h.pillars.map((p) => `${p.label} ${p.score}`).join(", ") + ".",
      metric: { label: "Health Score", value: `${h.overall}/100` },
    };
  }

  // ---- Overdue / outstanding invoices -------------------------------------
  if (has(q, "overdue", "unpaid", "outstanding", "owe", "owed") && has(q, "invoice", "invoices", "payment", "money", "revenue", "owe", "owed", "outstanding")) {
    const invoices = await prisma.invoice.findMany({ orderBy: { dueDate: "asc" } });
    const now = Date.now();
    const overdue = invoices.filter(
      (i) => i.status === "OVERDUE" || (i.status !== "PAID" && i.dueDate && i.dueDate.getTime() < now),
    );
    const total = overdue.reduce((s, i) => s + i.amount, 0);
    if (overdue.length === 0) {
      return { text: "Good news — there are no overdue invoices right now. 🎉" };
    }
    return {
      text: `You have ${overdue.length} overdue invoice${overdue.length === 1 ? "" : "s"} totalling ${money(total)}.`,
      metric: { label: "Overdue", value: money(total) },
      table: {
        columns: ["Invoice", "Client", "Amount", "Due"],
        rows: overdue.map((i) => [
          i.invoiceNo,
          i.clientName,
          money(i.amount),
          i.dueDate ? new Date(i.dueDate).toLocaleDateString() : "—",
        ]),
      },
    };
  }

  // ---- Revenue collected ---------------------------------------------------
  if (has(q, "revenue", "collected", "income", "earned", "paid", "made")) {
    const thisMonth = has(q, "this month", "month");
    const invoices = await prisma.invoice.findMany({ where: { status: "PAID" } });
    const filtered = thisMonth
      ? invoices.filter((i) => {
          const { start, end } = monthBounds();
          const d = i.issueDate;
          return d >= start && d < end;
        })
      : invoices;
    const total = filtered.reduce((s, i) => s + i.amount, 0);
    return {
      text: `Collected revenue${thisMonth ? " this month" : " (all time)"}: ${money(total)} across ${filtered.length} paid invoice${filtered.length === 1 ? "" : "s"}.`,
      metric: { label: thisMonth ? "Revenue (MTD)" : "Revenue", value: money(total) },
    };
  }

  // ---- Delayed deliveries / milestones / tasks ----------------------------
  if (has(q, "delayed", "late", "behind", "overdue", "missed", "slipping") && has(q, "deliver", "milestone", "task", "project", "deadline")) {
    const tasks = await prisma.task.findMany({
      where: { status: { not: "DONE" }, dueDate: { lt: new Date() } },
      include: { project: { select: { title: true, clientName: true } } },
      orderBy: { dueDate: "asc" },
    });
    if (tasks.length === 0) {
      return { text: "Nothing is past due — every milestone with a deadline is on track. ✅" };
    }
    return {
      text: `${tasks.length} milestone${tasks.length === 1 ? " is" : "s are"} past their due date.`,
      metric: { label: "Delayed", value: String(tasks.length) },
      table: {
        columns: ["Task", "Project", "Owner", "Due"],
        rows: tasks.map((t) => [
          t.title,
          t.project?.title ?? "—",
          t.assignee,
          t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—",
        ]),
      },
    };
  }

  // ---- Support tickets -----------------------------------------------------
  if (has(q, "ticket", "support", "help desk", "complaint", "issue")) {
    const tickets = await prisma.ticket.findMany();
    const open = tickets.filter((t) => t.status === "OPEN" || t.status === "IN_PROGRESS");
    const urgent = open.filter((t) => t.priority === "URGENT" || t.priority === "HIGH");
    return {
      text: `There ${open.length === 1 ? "is" : "are"} ${open.length} open ticket${open.length === 1 ? "" : "s"}${urgent.length ? `, ${urgent.length} of them high/urgent priority` : ""}.`,
      metric: { label: "Open Tickets", value: String(open.length) },
      table: open.length
        ? {
            columns: ["Title", "Client", "Priority", "Status"],
            rows: open.slice(0, 12).map((t) => [t.title, t.clientName, t.priority, t.status]),
          }
        : undefined,
    };
  }

  // ---- Leads / pipeline ----------------------------------------------------
  if (has(q, "lead", "leads", "pipeline", "prospect", "deal", "hot", "crm")) {
    const subs = await prisma.submission.findMany({ orderBy: { dealValue: "desc" } });
    const openSubs = subs.filter((s) => s.status !== "closed" && s.status !== "lost");
    const pipeline = openSubs.reduce((s, x) => s + (x.dealValue || 0), 0);
    const hot = subs.filter((s) => s.priority === "HOT");
    const wantHot = has(q, "hot", "hottest", "best", "top");
    const list = wantHot ? hot : openSubs;
    return {
      text: wantHot
        ? `You have ${hot.length} hot lead${hot.length === 1 ? "" : "s"}.`
        : `Open pipeline: ${money(pipeline)} across ${openSubs.length} active lead${openSubs.length === 1 ? "" : "s"}.`,
      metric: wantHot
        ? { label: "Hot Leads", value: String(hot.length) }
        : { label: "Pipeline", value: money(pipeline) },
      table: list.length
        ? {
            columns: ["Name", "Company", "Value", "Priority"],
            rows: list.slice(0, 12).map((s) => [s.name, s.company, money(s.dealValue || 0), s.priority]),
          }
        : undefined,
    };
  }

  // ---- Top clients by revenue ---------------------------------------------
  if (has(q, "top client", "best client", "biggest client", "top customer") || (has(q, "client", "customer") && has(q, "revenue", "value", "top", "biggest"))) {
    const invoices = await prisma.invoice.findMany({ where: { status: "PAID" } });
    const byClient = new Map<string, number>();
    for (const i of invoices) byClient.set(i.clientName, (byClient.get(i.clientName) || 0) + i.amount);
    const ranked = [...byClient.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
    if (ranked.length === 0) return { text: "No paid invoices yet, so there's no client revenue to rank." };
    return {
      text: `Top ${ranked.length} client${ranked.length === 1 ? "" : "s"} by collected revenue:`,
      table: {
        columns: ["Client", "Revenue"],
        rows: ranked.map(([name, amt]) => [name, money(amt)]),
      },
    };
  }

  // ---- Projects overview ---------------------------------------------------
  if (has(q, "project", "projects", "delivery", "work")) {
    const projects = await prisma.project.findMany({ include: { tasks: { select: { status: true } } } });
    const totalTasks = projects.reduce((s, p) => s + p.tasks.length, 0);
    const done = projects.reduce((s, p) => s + p.tasks.filter((t) => t.status === "DONE").length, 0);
    return {
      text: `You have ${projects.length} project${projects.length === 1 ? "" : "s"} with ${done}/${totalTasks} tasks completed.`,
      metric: { label: "Projects", value: String(projects.length) },
      table: projects.length
        ? {
            columns: ["Project", "Client", "Progress"],
            rows: projects.slice(0, 12).map((p) => {
              const t = p.tasks.length;
              const d = p.tasks.filter((x) => x.status === "DONE").length;
              return [p.title, p.clientName ?? "—", `${t ? Math.round((d / t) * 100) : 0}%`];
            }),
          }
        : undefined,
    };
  }

  // ---- Fallback ------------------------------------------------------------
  return {
    text:
      "I couldn't map that to your data yet. Try asking about overdue invoices, revenue this month, delayed deliveries, open tickets, hot leads, top clients, or your health score.",
  };
}

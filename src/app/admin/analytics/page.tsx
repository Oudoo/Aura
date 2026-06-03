import { prisma } from "@/lib/db";
import { ClientAnalyticsDashboard } from "./ClientAnalyticsDashboard";

export const dynamic = "force-dynamic";

export default async function AnalyticsHubPage() {
  // 1. FINANCIAL & SALES PERFORMANCE
  const submissions = await prisma.submission.findMany();
  const invoices = await prisma.invoice.findMany();

  const pipelineValue = submissions
    .filter(s => s.status !== "closed" && s.status !== "lost")
    .reduce((acc, s) => acc + (s.dealValue || 0), 0);

  const revenueCollected = invoices
    .filter(i => i.status === "PAID")
    .reduce((acc, i) => acc + i.amount, 0);

  const revenueAtRisk = invoices
    .filter(i => i.status === "OVERDUE")
    .reduce((acc, i) => acc + i.amount, 0);

  // Group leads by source
  const sourcesMap: Record<string, number> = {};
  submissions.forEach(s => {
    const source = s.source || "Unknown";
    sourcesMap[source] = (sourcesMap[source] || 0) + 1;
  });
  const leadSources = Object.keys(sourcesMap).map(key => ({
    name: key,
    value: sourcesMap[key]
  }));

  // 2. OPERATIONAL HEALTH (Projects & Tasks)
  const tasks = await prisma.task.findMany();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "DONE").length;
  const pendingTasks = totalTasks - completedTasks;

  // 3. SUPPORT EFFICIENCY (Tickets)
  const tickets = await prisma.ticket.findMany();
  const openTickets = tickets.filter(t => t.status === "OPEN" || t.status === "IN_PROGRESS").length;
  const resolvedTickets = tickets.filter(t => t.status === "RESOLVED" || t.status === "CLOSED").length;
  
  const priorityMap: Record<string, number> = {};
  tickets.filter(t => t.status !== "CLOSED").forEach(t => {
    priorityMap[t.priority] = (priorityMap[t.priority] || 0) + 1;
  });
  const ticketPriorities = Object.keys(priorityMap).map(key => ({
    name: key,
    value: priorityMap[key]
  }));

  const data = {
    financials: { pipelineValue, revenueCollected, revenueAtRisk },
    leadSources,
    operations: { totalTasks, completedTasks, pendingTasks },
    support: { openTickets, resolvedTickets, ticketPriorities }
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-platinum mb-2">Analytics & Reporting</h1>
          <p className="text-slate">A bird&apos;s-eye view of your business health across all Aura modules.</p>
        </div>
      </div>

      <ClientAnalyticsDashboard data={data} />
    </div>
  );
}

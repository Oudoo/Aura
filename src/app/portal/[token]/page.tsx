import { prisma } from "@/lib/db";
import { captureAndGetTrend } from "@/lib/healthScore";
import { HealthScoreCard } from "@/app/admin/analytics/HealthScoreCard";
import { PortalInvoicePay } from "./PortalInvoicePay";
import { ShieldAlert, FolderKanban, Receipt, LifeBuoy, CheckCircle2, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

function money(n: number) {
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export default async function ClientPortalPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const client = await prisma.client.findUnique({ where: { accessToken: token } });
  const tenant = await prisma.tenantConfig.findUnique({ where: { id: "default" } }).catch(() => null);
  const brand = tenant?.companyName || "Aura";
  const accent = tenant?.primaryColor || "#00E5FF";

  // Invalid or revoked link — never reveal whether the client exists.
  if (!client || !client.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-platinum mb-3">Portal unavailable</h1>
          <p className="text-slate">
            This portal link is invalid or has been disabled. Please contact your
            account manager for an up-to-date link.
          </p>
        </div>
      </div>
    );
  }

  // Pull everything scoped to this client, in parallel.
  const [projects, invoices, tickets, healthRes] = await Promise.all([
    prisma.project.findMany({
      where: { clientName: client.name },
      include: { tasks: { select: { status: true, dueDate: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.invoice.findMany({
      where: { clientName: client.name },
      orderBy: { createdAt: "desc" },
    }),
    prisma.ticket.findMany({
      where: { clientName: client.name },
      orderBy: { createdAt: "desc" },
    }),
    captureAndGetTrend(client.name).catch(() => null),
  ]);

  const openTickets = tickets.filter((t) => t.status === "OPEN" || t.status === "IN_PROGRESS").length;
  const outstanding = invoices
    .filter((i) => i.status !== "PAID")
    .reduce((s, i) => s + i.amount, 0);

  return (
    <div className="min-h-screen">
      {/* Branded header */}
      <header className="border-b border-fg/10 bg-obsidian/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {tenant?.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={tenant.logoUrl} alt={brand} className="h-8 w-auto" />
            ) : (
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-heading font-black text-void"
                style={{ background: accent }}
              >
                {brand.charAt(0)}
              </div>
            )}
            <div>
              <div className="font-heading font-bold text-platinum leading-tight">{brand}</div>
              <div className="text-xs text-slate">Client Portal</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-platinum">{client.company || client.name}</div>
            <div className="text-xs text-slate">Welcome back</div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Summary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<FolderKanban className="w-5 h-5" />} label="Active Projects" value={String(projects.length)} accent={accent} />
          <StatCard icon={<Receipt className="w-5 h-5" />} label="Outstanding" value={money(outstanding)} accent={accent} />
          <StatCard icon={<LifeBuoy className="w-5 h-5" />} label="Open Tickets" value={String(openTickets)} accent={accent} />
          <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Invoices" value={String(invoices.length)} accent={accent} />
        </div>

        {/* Health score */}
        {healthRes && <HealthScoreCard health={healthRes.current} trend={healthRes.trend} />}

        {/* Projects */}
        <section>
          <h2 className="text-lg font-heading font-bold text-platinum mb-4 flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-cyan" /> Your Projects
          </h2>
          {projects.length === 0 ? (
            <EmptyRow text="No active projects yet." />
          ) : (
            <div className="space-y-3">
              {projects.map((p) => {
                const total = p.tasks.length;
                const done = p.tasks.filter((t) => t.status === "DONE").length;
                const pct = total ? Math.round((done / total) * 100) : 0;
                return (
                  <div key={p.id} className="bg-obsidian border border-fg/10 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-platinum">{p.title}</h3>
                      <span className="text-sm text-slate">{done}/{total} tasks · {pct}%</span>
                    </div>
                    {p.description && <p className="text-sm text-slate mb-3">{p.description}</p>}
                    <div className="w-full h-2 bg-void rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: accent }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Invoices */}
        <section>
          <h2 className="text-lg font-heading font-bold text-platinum mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-cyan" /> Invoices
          </h2>
          {invoices.length === 0 ? (
            <EmptyRow text="No invoices on file." />
          ) : (
            <div className="bg-obsidian border border-fg/10 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-void border-b border-fg/10 text-slate text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3 font-bold">Invoice</th>
                    <th className="px-5 py-3 font-bold">Amount</th>
                    <th className="px-5 py-3 font-bold">Due</th>
                    <th className="px-5 py-3 font-bold">Status</th>
                    <th className="px-5 py-3 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-fg/5">
                  {invoices.map((i) => (
                    <tr key={i.id}>
                      <td className="px-5 py-3 font-bold text-platinum">{i.invoiceNo}</td>
                      <td className="px-5 py-3 text-platinum">{money(i.amount)}</td>
                      <td className="px-5 py-3 text-slate">
                        {i.dueDate ? new Date(i.dueDate).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-5 py-3">
                        <StatusPill status={i.status} />
                      </td>
                      <td className="px-5 py-3 text-right">
                        <PortalInvoicePay invoiceNo={i.invoiceNo} amount={i.amount} status={i.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Support */}
        <section>
          <h2 className="text-lg font-heading font-bold text-platinum mb-4 flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-cyan" /> Support
          </h2>
          {tickets.length === 0 ? (
            <EmptyRow text="No support tickets." />
          ) : (
            <div className="space-y-2">
              {tickets.slice(0, 6).map((t) => (
                <div key={t.id} className="bg-obsidian border border-fg/10 rounded-xl p-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="font-bold text-platinum truncate">{t.title}</div>
                    <div className="text-xs text-slate flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {new Date(t.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <StatusPill status={t.status} />
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="pt-6 pb-10 text-center text-xs text-slate/50">
          Powered by {brand} · This is a secure, read-only view of your account.
        </footer>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent: string }) {
  return (
    <div className="bg-obsidian border border-fg/10 rounded-xl p-5">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${accent}1A`, color: accent }}>
        {icon}
      </div>
      <div className="text-2xl font-heading font-black text-platinum">{value}</div>
      <div className="text-xs text-slate uppercase tracking-wider mt-0.5">{label}</div>
    </div>
  );
}

function EmptyRow({ text }: { text: string }) {
  return (
    <div className="bg-obsidian border border-dashed border-fg/10 rounded-xl p-8 text-center text-slate">
      {text}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    PAID: "bg-green-500/10 text-green-400",
    SENT: "bg-cyan/10 text-cyan",
    OVERDUE: "bg-red-500/10 text-red-400",
    DRAFT: "bg-slate/10 text-slate",
    OPEN: "bg-amber-500/10 text-amber-400",
    IN_PROGRESS: "bg-cyan/10 text-cyan",
    RESOLVED: "bg-green-500/10 text-green-400",
    CLOSED: "bg-slate/10 text-slate",
  };
  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${map[status] ?? "bg-slate/10 text-slate"}`}>
      {status}
    </span>
  );
}

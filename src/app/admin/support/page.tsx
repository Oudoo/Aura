import { prisma } from "@/lib/db";
import { ClientSupportManager } from "./ClientSupportManager";

export const dynamic = "force-dynamic";

export default async function SupportHubPage() {
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-platinum mb-2">Help Desk</h1>
          <p className="text-slate">Manage client support tickets and maintenance requests.</p>
        </div>
      </div>

      <ClientSupportManager initialTickets={tickets} />
    </div>
  );
}

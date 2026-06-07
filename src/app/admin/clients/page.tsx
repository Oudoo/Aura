import { prisma } from "@/lib/db";
import { ClientManager } from "./ClientManager";
import type { Client } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  let clients: Client[] = [];
  try {
    clients = await prisma.client.findMany({ orderBy: { createdAt: "desc" } });
  } catch (e) {
    console.error("Clients DB query failed:", e);
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-platinum mb-2">Client Portals</h1>
          <p className="text-slate">
            Give enterprise clients a secure, white-label window into their projects,
            invoices and health — no login required.
          </p>
        </div>
      </div>

      <ClientManager initialClients={clients} />
    </div>
  );
}

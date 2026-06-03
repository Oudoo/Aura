import { prisma } from "@/lib/db";
import { ClientProductsManager } from "./ClientProductsManager";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const ecosystem = await prisma.suite.findMany({
    include: {
      products: true,
    },
  });

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-platinum mb-2">Content Management</h1>
          <p className="text-slate">Manage the suites, products, and features in the Aura ecosystem.</p>
        </div>
      </div>

      <ClientProductsManager initialEcosystem={ecosystem as any} />
    </div>
  );
}

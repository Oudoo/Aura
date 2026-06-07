"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/Card";
import {
  Plus, Trash2, Users, Copy, Check, RefreshCw, ExternalLink, Building2, Power,
} from "lucide-react";
import {
  createClientAction, deleteClientAction, regenerateClientTokenAction, toggleClientActiveAction,
} from "./actions";
import type { Client } from "@prisma/client";

export function ClientManager({ initialClients }: { initialClients: Client[] }) {
  const [clients, setClients] = useState(initialClients);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const portalUrl = (token: string) =>
    typeof window !== "undefined"
      ? `${window.location.origin}/portal/${token}`
      : `/portal/${token}`;

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    startTransition(async () => {
      const res = await createClientAction({
        name: fd.get("name") as string,
        company: fd.get("company") as string,
        email: fd.get("email") as string,
      });
      if (res.success) {
        window.location.reload();
      } else {
        setError(res.error ?? "Failed to create client.");
      }
    });
  }

  async function handleCopy(token: string, id: string) {
    try {
      await navigator.clipboard.writeText(portalUrl(token));
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      /* clipboard may be blocked; ignore */
    }
  }

  function handleRegenerate(id: string) {
    if (!confirm("Regenerate this client's link? The current link will stop working.")) return;
    startTransition(async () => {
      const res = await regenerateClientTokenAction(id);
      if (res.success) window.location.reload();
      else setError(res.error ?? "Failed to regenerate link.");
    });
  }

  function handleToggle(id: string, current: boolean) {
    startTransition(async () => {
      const res = await toggleClientActiveAction(id, !current);
      if (res.success) setClients((cs) => cs.map((c) => (c.id === id ? { ...c, isActive: !current } : c)));
      else setError(res.error ?? "Failed to update client.");
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this client and revoke their portal access?")) return;
    startTransition(async () => {
      const res = await deleteClientAction(id);
      if (res.success) setClients((cs) => cs.filter((c) => c.id !== id));
      else setError(res.error ?? "Failed to delete client.");
    });
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-obsidian border-fg/10 border-l-4 border-l-cyan">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-cyan/10 rounded-xl text-cyan">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate text-sm font-bold uppercase">Total Clients</p>
              <h3 className="text-2xl font-bold text-platinum">{clients.length}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-obsidian border-fg/10 border-l-4 border-l-green-500">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
              <Power className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate text-sm font-bold uppercase">Active Portals</p>
              <h3 className="text-2xl font-bold text-platinum">
                {clients.filter((c) => c.isActive).length}
              </h3>
            </div>
          </div>
        </Card>
        <Card
          className="p-6 bg-obsidian border-fg/10 flex items-center justify-center cursor-pointer hover:bg-fg/5 transition-colors"
          onClick={() => setAdding(!adding)}
        >
          <div className="text-center">
            <div className="mx-auto w-10 h-10 bg-cyan/10 rounded-full flex items-center justify-center text-cyan mb-2">
              <Plus className="w-5 h-5" />
            </div>
            <p className="text-platinum font-bold">Add Client</p>
          </div>
        </Card>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-400" role="alert">{error}</p>
      )}

      {adding && (
        <Card className="p-6 mb-8 border-cyan/30 bg-obsidian">
          <h3 className="text-lg font-bold text-platinum mb-4 border-b border-fg/10 pb-2 flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-cyan" /> New Client
          </h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate uppercase">
                  Client Name <span className="text-cyan">*</span>
                </label>
                <input
                  name="name"
                  required
                  placeholder="Must match project / invoice client name"
                  className="w-full px-4 py-2 bg-void border border-fg/10 rounded-lg text-platinum focus:border-cyan outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate uppercase">Company</label>
                <input
                  name="company"
                  className="w-full px-4 py-2 bg-void border border-fg/10 rounded-lg text-platinum focus:border-cyan outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate uppercase">Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 bg-void border border-fg/10 rounded-lg text-platinum focus:border-cyan outline-none"
                />
              </div>
            </div>
            <p className="text-xs text-slate/70">
              The client name must match the <strong>Client Name</strong> on their invoices and
              the <strong>clientName</strong> set on their projects for data to appear in the portal.
            </p>
            <div className="flex justify-end space-x-3 pt-2">
              <button type="button" onClick={() => setAdding(false)} className="px-4 py-2 rounded-lg text-slate hover:bg-fg/5">
                Cancel
              </button>
              <button type="submit" disabled={pending} className="px-6 py-2 bg-cyan text-void font-bold rounded-lg hover:bg-cyan/90 disabled:opacity-50">
                {pending ? "Creating…" : "Create Client"}
              </button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {clients.length === 0 ? (
          <Card className="p-10 bg-obsidian border-fg/10 text-center text-slate">
            No clients yet. Add one to generate a secure portal link.
          </Card>
        ) : (
          clients.map((client) => (
            <Card key={client.id} className="p-6 bg-obsidian border-fg/10">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-platinum text-lg">{client.name}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        client.isActive ? "bg-green-500/10 text-green-400" : "bg-slate/10 text-slate"
                      }`}
                    >
                      {client.isActive ? "ACTIVE" : "DISABLED"}
                    </span>
                  </div>
                  <p className="text-sm text-slate">
                    {client.company || "—"}{client.email ? ` · ${client.email}` : ""}
                  </p>
                  <div className="mt-3 flex items-center gap-2 bg-void border border-fg/10 rounded-lg px-3 py-2 max-w-xl">
                    <code className="text-xs text-cyan truncate flex-1">{portalUrl(client.accessToken)}</code>
                    <button
                      onClick={() => handleCopy(client.accessToken, client.id)}
                      className="p-1.5 text-slate hover:text-cyan rounded-md transition-colors flex-shrink-0"
                      title="Copy portal link"
                    >
                      {copiedId === client.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={portalUrl(client.accessToken)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-cyan bg-cyan/10 rounded-lg hover:bg-cyan/20 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Open
                  </a>
                  <button
                    onClick={() => handleToggle(client.id, client.isActive)}
                    className="p-2 text-slate hover:text-platinum hover:bg-fg/5 rounded-lg transition-colors"
                    title={client.isActive ? "Disable portal" : "Enable portal"}
                  >
                    <Power className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRegenerate(client.id)}
                    className="p-2 text-slate hover:text-amethyst hover:bg-amethyst/10 rounded-lg transition-colors"
                    title="Regenerate link"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="p-2 text-slate hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete client"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

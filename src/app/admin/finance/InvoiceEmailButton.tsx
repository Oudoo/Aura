"use client";

import { useState, useTransition } from "react";
import { Mail, Send, X, Check } from "lucide-react";
import { emailInvoiceAction } from "./actions";
import type { Invoice } from "@prisma/client";

export function InvoiceEmailButton({
  invoice,
  emailConfigured,
}: {
  invoice: Invoice;
  emailConfigured: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSend() {
    setError(null);
    startTransition(async () => {
      const res = await emailInvoiceAction(invoice.id, to);
      if (res.success) {
        setSent(true);
        setTimeout(() => setOpen(false), 1200);
      } else {
        setError(res.error ?? "Failed to send.");
      }
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        title={emailConfigured ? "Email invoice" : "Configure SMTP to enable email"}
        className="p-2 text-slate hover:text-cyan hover:bg-cyan/10 rounded-md transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
      >
        <Mail className="w-4 h-4" />
      </button>
    );
  }

  return (
    <div className="absolute right-0 mt-2 z-20 w-72 bg-obsidian border border-fg/15 rounded-xl shadow-2xl p-4 text-left">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-platinum">Email {invoice.invoiceNo}</span>
        <button onClick={() => setOpen(false)} className="text-slate hover:text-platinum">
          <X className="w-4 h-4" />
        </button>
      </div>

      {!emailConfigured ? (
        <p className="text-xs text-amber-400">
          SMTP isn&apos;t configured yet. Add SMTP_HOST, SMTP_USER and SMTP_PASS to your
          environment to enable email.
        </p>
      ) : sent ? (
        <p className="text-sm text-green-400 flex items-center gap-2">
          <Check className="w-4 h-4" /> Sent to {to}
        </p>
      ) : (
        <>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="client@company.com"
            className="w-full px-3 py-2 bg-void border border-fg/10 rounded-lg text-platinum text-sm focus:border-cyan outline-none mb-2"
          />
          {error && <p className="text-xs text-red-400 mb-2">{error}</p>}
          <button
            onClick={handleSend}
            disabled={pending || !to}
            className="w-full px-3 py-2 bg-cyan text-void font-bold rounded-lg hover:bg-cyan/90 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            <Send className="w-3.5 h-3.5" /> {pending ? "Sending…" : "Send Invoice"}
          </button>
        </>
      )}
    </div>
  );
}

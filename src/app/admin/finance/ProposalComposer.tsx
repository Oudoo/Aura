"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/Card";
import { FileSignature, Send, Check } from "lucide-react";
import { sendProposalAction } from "./actions";

export function ProposalComposer({ emailConfigured }: { emailConfigured: boolean }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await sendProposalAction({
        to: fd.get("to") as string,
        clientName: fd.get("clientName") as string,
        subject: fd.get("subject") as string,
        body: fd.get("body") as string,
      });
      if (res.success) {
        setSent(true);
        setTimeout(() => { setSent(false); setOpen(false); }, 1600);
      } else {
        setError(res.error ?? "Failed to send proposal.");
      }
    });
  }

  return (
    <Card className="p-6 bg-obsidian border-fg/10 mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amethyst/10 rounded-xl text-amethyst">
            <FileSignature className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-platinum">Email a Proposal</h3>
            <p className="text-sm text-slate">Send a branded proposal to a prospect or client.</p>
          </div>
        </div>
        <span className="text-slate text-sm">{open ? "Close" : "Compose"}</span>
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 border-t border-fg/10 pt-6">
          {!emailConfigured && (
            <p className="text-xs text-amber-400">
              SMTP isn&apos;t configured yet — add SMTP_HOST, SMTP_USER and SMTP_PASS to your
              environment to start sending.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate uppercase">Recipient Email</label>
              <input name="to" type="email" required className="w-full px-4 py-2 bg-void border border-fg/10 rounded-lg text-platinum focus:border-cyan outline-none" placeholder="client@company.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate uppercase">Client Name</label>
              <input name="clientName" className="w-full px-4 py-2 bg-void border border-fg/10 rounded-lg text-platinum focus:border-cyan outline-none" placeholder="Jane Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate uppercase">Subject</label>
            <input name="subject" required className="w-full px-4 py-2 bg-void border border-fg/10 rounded-lg text-platinum focus:border-cyan outline-none" placeholder="Your Aura transformation proposal" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate uppercase">Message</label>
            <textarea name="body" required rows={6} className="w-full px-4 py-2 bg-void border border-fg/10 rounded-lg text-platinum focus:border-cyan outline-none resize-none" placeholder="Write your proposal here. Blank lines become paragraphs." />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={pending || !emailConfigured}
              className="px-6 py-2.5 bg-cyan text-void font-bold rounded-lg hover:bg-cyan/90 disabled:opacity-50 flex items-center gap-2"
            >
              {sent ? <><Check className="w-4 h-4" /> Sent</> : <><Send className="w-4 h-4" /> {pending ? "Sending…" : "Send Proposal"}</>}
            </button>
          </div>
        </form>
      )}
    </Card>
  );
}

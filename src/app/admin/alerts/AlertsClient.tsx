"use client";

import { Card } from "@/components/ui/Card";
import { Receipt, CalendarClock, MessageCircle, CheckCircle2, Zap, Info } from "lucide-react";
import type { SmartAlert } from "@/lib/alerts";

export function AlertsClient({
  initialAlerts,
  autoSendEnabled,
}: {
  initialAlerts: SmartAlert[];
  autoSendEnabled: boolean;
}) {
  const overdue = initialAlerts.filter((a) => a.type === "overdue_invoice");
  const milestones = initialAlerts.filter((a) => a.type === "missed_milestone");

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-obsidian border-fg/10 border-l-4 border-l-red-500">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate text-sm font-bold uppercase">Overdue Invoices</p>
              <h3 className="text-2xl font-bold text-platinum">{overdue.length}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-obsidian border-fg/10 border-l-4 border-l-amber-500">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
              <CalendarClock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate text-sm font-bold uppercase">Missed Milestones</p>
              <h3 className="text-2xl font-bold text-platinum">{milestones.length}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-obsidian border-fg/10 border-l-4 border-l-cyan">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-cyan/10 rounded-xl text-cyan">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate text-sm font-bold uppercase">Dispatch Mode</p>
              <h3 className="text-sm font-bold text-platinum mt-1">
                {autoSendEnabled ? "Auto (WhatsApp API)" : "1-tap send (free)"}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      {!autoSendEnabled && (
        <div className="mb-8 flex items-start gap-3 bg-cyan/5 border border-cyan/20 rounded-xl p-4">
          <Info className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate">
            <strong className="text-platinum">Free mode is on.</strong> Each alert opens WhatsApp
            with the message pre-filled — just hit send. Fully automatic sending requires a verified
            WhatsApp Business (Cloud API) number, which carries Meta&apos;s per-conversation fees.
            Once configured, alerts dispatch on their own.
          </p>
        </div>
      )}

      {initialAlerts.length === 0 ? (
        <Card className="p-12 bg-obsidian border-fg/10 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-platinum mb-1">All clear</h3>
          <p className="text-slate">No overdue invoices and no missed milestones. Nicely run. 🎉</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {initialAlerts.map((a) => (
            <Card key={a.id} className="p-5 bg-obsidian border-fg/10 flex items-center gap-4">
              <div
                className={`p-3 rounded-xl flex-shrink-0 ${
                  a.type === "overdue_invoice" ? "bg-red-500/10 text-red-400" : "bg-amber-500/10 text-amber-400"
                }`}
              >
                {a.type === "overdue_invoice" ? <Receipt className="w-5 h-5" /> : <CalendarClock className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-platinum truncate">{a.title}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      a.severity === "high" ? "bg-red-500/10 text-red-400" : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {a.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-slate truncate">{a.detail}</p>
              </div>
              <a
                href={a.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 font-bold rounded-lg hover:bg-green-500/20 transition-colors flex-shrink-0"
              >
                <MessageCircle className="w-4 h-4" /> Send
              </a>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

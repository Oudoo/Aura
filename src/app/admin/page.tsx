import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Mail, Calendar, Trash2, StickyNote } from "lucide-react";
import { deleteSubmissionAction } from "./actions";
import { PdfGeneratorButton } from "@/components/PdfGeneratorButton";
import { StatusSelect, CalledSelect, NotesInput, PrioritySelect, SourceSelect, DealValueInput, NextFollowUpInput } from "./AdminFields";
import type { Submission } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let submissions: Submission[] = [];
  try {
    submissions = await prisma.submission.findMany({
      orderBy: { date: "desc" },
    });
  } catch (e) {
    console.error("CRM DB query failed:", e);
  }

  const statusColors: Record<string, string> = {
    new: "bg-cyan/10 text-cyan",
    reviewed: "bg-amethyst/10 text-amethyst",
    "in-progress": "bg-yellow-500/10 text-yellow-400",
    closed: "bg-green-500/10 text-green-400",
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-platinum mb-2">Aura CRM Pipeline</h1>
          <p className="text-slate">Manage leads, track deals, and schedule follow-ups. {submissions.length} total active leads.</p>
        </div>
      </div>

      {submissions.length === 0 ? (
        <Card className="p-12 text-center border-fg/10 bg-obsidian">
          <Mail className="w-12 h-12 text-slate/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-platinum mb-2">No Submissions Yet</h3>
          <p className="text-slate">When users request an audit, they will appear here.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-slate uppercase tracking-wider border-b border-fg/10">
            <div className="col-span-3">Contact & Source</div>
            <div className="col-span-2">Company & Value</div>
            <div className="col-span-3">Pipeline Status</div>
            <div className="col-span-3">Engagement</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {submissions.map((sub) => (
            <Card key={sub.id} className="p-0 border-fg/10 bg-obsidian overflow-hidden">
              <div className="grid grid-cols-12 gap-4 items-start px-6 py-4">
                {/* Contact & Source */}
                <div className="col-span-3 space-y-2">
                  <div>
                    <h3 className="text-base font-bold text-platinum">{sub.name}</h3>
                    <a href={`mailto:${sub.email}`} className="text-xs text-slate hover:text-cyan transition-colors flex items-center mt-1 mb-2">
                      <Mail className="w-3 h-3 mr-1" />
                      {sub.email}
                    </a>
                  </div>
                  <SourceSelect 
                    id={sub.id} 
                    defaultValue={sub.source} 
                    className="text-xs font-medium rounded px-2 py-1 bg-void border border-fg/10 text-slate outline-none focus:border-cyan w-full max-w-[150px]" 
                  />
                </div>

                {/* Company & Value */}
                <div className="col-span-2 space-y-3">
                  <div className="inline-block px-2.5 py-1 rounded-md bg-cyan/10 text-cyan text-xs font-bold uppercase">
                    {sub.company}
                  </div>
                  <DealValueInput 
                    id={sub.id} 
                    defaultValue={sub.dealValue} 
                    className="text-xs font-medium rounded px-2 py-1 bg-void border border-fg/10 text-platinum outline-none focus:border-cyan w-full max-w-[120px]" 
                  />
                </div>

                {/* Pipeline Status */}
                <div className="col-span-3 space-y-2">
                  <div className="flex gap-2">
                    <StatusSelect 
                      id={sub.id} 
                      defaultValue={sub.status} 
                      className={`text-xs font-bold rounded px-2 py-1 border-0 cursor-pointer outline-none ${statusColors[sub.status] || statusColors.new} bg-opacity-20 flex-1`}
                    />
                    <PrioritySelect 
                      id={sub.id} 
                      defaultValue={sub.priority} 
                      className="text-xs font-bold rounded px-2 py-1 bg-void border border-fg/10 text-platinum cursor-pointer outline-none flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-slate" />
                    <NextFollowUpInput 
                      id={sub.id} 
                      defaultValue={sub.nextFollowUp} 
                      className="text-xs font-medium rounded px-2 py-1 bg-void border border-fg/10 text-slate outline-none focus:border-cyan w-full"
                    />
                  </div>
                </div>

                {/* Engagement */}
                <div className="col-span-3 space-y-2">
                  <CalledSelect 
                    id={sub.id}
                    defaultValue={sub.called}
                    className="text-xs font-medium rounded px-2 py-1 bg-fg/5 text-platinum border border-fg/10 cursor-pointer outline-none w-full"
                  />
                  <NotesInput
                    id={sub.id}
                    defaultValue={sub.notes}
                    className="text-xs w-full bg-void rounded px-2 border border-fg/10 text-platinum placeholder-slate/50 outline-none py-1.5 focus:border-cyan transition-colors"
                  />
                </div>

                {/* Actions */}
                <div className="col-span-1 flex flex-col items-end justify-between h-full">
                  <span className="text-[10px] text-slate/50 mb-2">
                    {new Date(sub.date).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-1 mt-auto">
                    <PdfGeneratorButton lead={sub} />
                    <form action={async () => {
                      "use server";
                      await deleteSubmissionAction(sub.id);
                    }}>
                      <button type="submit" className="p-1.5 rounded-lg text-slate hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Expandable message row */}

              {sub.message && (
                <div className="px-6 py-3 border-t border-fg/5 bg-void/30">
                  <p className="text-xs text-slate/80 whitespace-pre-wrap">
                    <StickyNote className="w-3 h-3 inline mr-1.5 text-amethyst" />
                    {sub.message}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

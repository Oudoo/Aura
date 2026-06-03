import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Mail, Calendar, Trash2, Phone, StickyNote } from "lucide-react";
import { deleteSubmissionAction, updateSubmissionAction } from "./actions";
import { PdfGeneratorButton } from "@/components/PdfGeneratorButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let submissions: any = [];
  try {
    submissions = await prisma.submission.findMany({
      orderBy: { date: "desc" },
    });
  } catch (e) {
    console.error("DB failed, using fallback");
  }

  const statusColors: Record<string, string> = {
    new: "bg-cyan/10 text-cyan",
    reviewed: "bg-amethyst/10 text-amethyst",
    "in-progress": "bg-yellow-500/10 text-yellow-400",
    closed: "bg-green-500/10 text-green-400",
  };

  const calledLabels: Record<string, string> = {
    no: "Not Called",
    "yes-answered": "Called — Answered",
    "yes-no-answer": "Called — No Answer",
    scheduled: "Meeting Scheduled",
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-platinum mb-2">Submissions Tracker</h1>
          <p className="text-slate">Manage and track your audit requests. {submissions.length} total submissions.</p>
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
            <div className="col-span-3">Contact</div>
            <div className="col-span-2">Company</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2">Call Status</div>
            <div className="col-span-2">Notes</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-1"></div>
          </div>

          {submissions.map((sub: any) => (
            <Card key={sub.id} className="p-0 border-fg/10 bg-obsidian overflow-hidden">
              <div className="grid grid-cols-12 gap-4 items-center px-6 py-4">
                {/* Contact Info */}
                <div className="col-span-3">
                  <h3 className="text-base font-bold text-platinum">{sub.name}</h3>
                  <a href={`mailto:${sub.email}`} className="text-xs text-slate hover:text-cyan transition-colors flex items-center mt-1">
                    <Mail className="w-3 h-3 mr-1" />
                    {sub.email}
                  </a>
                </div>

                {/* Company */}
                <div className="col-span-2">
                  <span className="px-2.5 py-1 rounded-md bg-cyan/10 text-cyan text-xs font-bold uppercase">
                    {sub.company}
                  </span>
                </div>

                {/* Status Dropdown */}
                <div className="col-span-1">
                  <form action={async (formData: FormData) => {
                    "use server";
                    await updateSubmissionAction(sub.id, "status", formData.get("status") as string);
                  }}>
                    <select 
                      name="status" 
                      defaultValue={sub.status}
                      onChange={(e) => e.target.form?.requestSubmit()}
                      className={`text-xs font-bold rounded-lg px-2 py-1.5 border-0 cursor-pointer outline-none ${statusColors[sub.status] || statusColors.new} bg-opacity-20`}
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </form>
                </div>

                {/* Called Dropdown */}
                <div className="col-span-2">
                  <form action={async (formData: FormData) => {
                    "use server";
                    await updateSubmissionAction(sub.id, "called", formData.get("called") as string);
                  }}>
                    <select 
                      name="called" 
                      defaultValue={sub.called}
                      onChange={(e) => e.target.form?.requestSubmit()}
                      className="text-xs font-medium rounded-lg px-2 py-1.5 bg-fg/5 text-platinum border border-fg/10 cursor-pointer outline-none"
                    >
                      <option value="no">❌ Not Called</option>
                      <option value="yes-answered">✅ Called — Answered</option>
                      <option value="yes-no-answer">📞 Called — No Answer</option>
                      <option value="scheduled">📅 Meeting Scheduled</option>
                    </select>
                  </form>
                </div>

                {/* Notes */}
                <div className="col-span-2">
                  <form action={async (formData: FormData) => {
                    "use server";
                    await updateSubmissionAction(sub.id, "notes", formData.get("notes") as string);
                  }}>
                    <input
                      name="notes"
                      defaultValue={sub.notes || ""}
                      placeholder="Add a note..."
                      onBlur={(e) => e.target.form?.requestSubmit()}
                      className="text-xs w-full bg-transparent border-b border-fg/10 text-platinum placeholder-slate/30 outline-none py-1 focus:border-cyan transition-colors"
                    />
                  </form>
                </div>

                {/* Date */}
                <div className="col-span-1">
                  <span className="text-xs text-slate flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(sub.date).toLocaleDateString()}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex justify-end space-x-1">
                  <PdfGeneratorButton lead={sub} />
                  <form action={async () => {
                    "use server";
                    await deleteSubmissionAction(sub.id);
                  }}>
                    <button type="submit" className="p-2 rounded-lg text-slate hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
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

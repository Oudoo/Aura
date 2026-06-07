/**
 * Generates a branded, downloadable PDF of a Digital Maturity Audit result.
 * Runs entirely in the browser (jsPDF is imported dynamically) so there is no
 * server load and the file downloads instantly. Clients can share this report
 * internally to justify budget for the recommended Aura modules.
 */

export interface AuditPdfData {
  overall: number;
  tierLabel: string;
  tierBlurb: string;
  dimensions: { label: string; percent: number }[];
  gaps: { label: string; percent: number; recommends: { name: string }[] }[];
  lead?: { name?: string; company?: string; email?: string };
}

export async function generateAuditPdf(data: AuditPdfData): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF();
  const brand: [number, number, number] = [2, 132, 199];
  const dark: [number, number, number] = [15, 23, 42];
  const slate: [number, number, number] = [100, 116, 139];
  const pageW = doc.internal.pageSize.getWidth();

  // ---- Header band ----
  doc.setFillColor(...dark);
  doc.rect(0, 0, pageW, 42, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("AURA", 14, 22);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Digital Maturity Audit", 14, 31);
  doc.setFontSize(9);
  doc.text(new Date().toLocaleDateString(), pageW - 14, 22, { align: "right" });

  // ---- Prepared-for line ----
  let y = 56;
  if (data.lead?.name || data.lead?.company) {
    doc.setTextColor(...slate);
    doc.setFontSize(10);
    const who = [data.lead?.name, data.lead?.company].filter(Boolean).join(" · ");
    doc.text(`Prepared for: ${who}`, 14, y);
    y += 10;
  }

  // ---- Overall score ----
  doc.setTextColor(...dark);
  doc.setFontSize(40);
  doc.setFont("helvetica", "bold");
  doc.text(`${data.overall}%`, 14, y + 12);
  doc.setFontSize(14);
  doc.setTextColor(...brand);
  doc.text(`${data.tierLabel} Maturity`, 50, y + 12);

  doc.setFontSize(10);
  doc.setTextColor(...slate);
  doc.setFont("helvetica", "normal");
  const blurb = doc.splitTextToSize(data.tierBlurb, pageW - 28);
  doc.text(blurb, 14, y + 22);
  y += 22 + blurb.length * 5 + 6;

  // ---- Dimension breakdown ----
  autoTable(doc, {
    startY: y,
    head: [["Dimension", "Score"]],
    body: data.dimensions.map((d) => [d.label, `${d.percent}%`]),
    headStyles: { fillColor: brand },
    theme: "striped",
    margin: { left: 14, right: 14 },
  });

  // ---- Recommendations ----
  // @ts-expect-error lastAutoTable is augmented onto the jsPDF instance at runtime
  let afterY = (doc.lastAutoTable?.finalY ?? y) + 12;
  doc.setTextColor(...dark);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Your biggest opportunities", 14, afterY);
  afterY += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  for (const g of data.gaps) {
    doc.setTextColor(...dark);
    doc.setFont("helvetica", "bold");
    doc.text(`${g.label} — ${g.percent}%`, 14, afterY);
    afterY += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...slate);
    const recs = g.recommends.map((r) => r.name).join(", ") || "Tailored Aura modules";
    const recLines = doc.splitTextToSize(`Recommended: ${recs}`, pageW - 28);
    doc.text(recLines, 14, afterY);
    afterY += recLines.length * 5 + 4;
  }

  // ---- CTA + footer ----
  afterY += 4;
  doc.setFillColor(...brand);
  doc.roundedRect(14, afterY, pageW - 28, 18, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Book your strategy session: getaura.business  ·  info@getaura.business", pageW / 2, afterY + 11, {
    align: "center",
  });

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Confidential · Aura Digital Maturity Audit · Page ${i} of ${pageCount}`,
      pageW / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" },
    );
  }

  const slug = (data.lead?.company || "report").replace(/\s+/g, "_");
  doc.save(`Aura_Audit_${slug}.pdf`);
}

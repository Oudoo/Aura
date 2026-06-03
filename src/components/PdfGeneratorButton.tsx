"use client";

import { FileText, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";

interface LeadData {
  name: string;
  email: string;
  company: string;
  message: string;
  date: string;
}

export function PdfGeneratorButton({ lead }: { lead: LeadData }) {
  const [generating, setGenerating] = useState(false);

  const generatePDF = () => {
    setGenerating(true);
    try {
      const doc = new jsPDF();
      
      // Colors matching Aura OS Brand
      const brandColor = [2, 132, 199]; // Cyan-600 approx
      const darkColor = [15, 23, 42]; // Slate-900

      // Header
      doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
      doc.rect(0, 0, 210, 40, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("AURA OS", 14, 25);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Strategic Diagnosis & Proposal", 120, 25);

      // Client Information Section
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Client Executive Summary", 14, 60);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(`Prepared for: ${lead.name}`, 14, 70);
      doc.text(`Organization: ${lead.company}`, 14, 78);
      doc.text(`Contact: ${lead.email}`, 14, 86);
      doc.text(`Date of Inquiry: ${new Date(lead.date).toLocaleDateString()}`, 14, 94);

      // Operational Bottleneck Section
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Identified Operational Bottlenecks", 14, 115);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      
      const splitMessage = doc.splitTextToSize(lead.message || "No specific details provided during initial inquiry.", 180);
      doc.text(splitMessage, 14, 125);

      // Proposed Aura Ecosystem Roadmap (Table)
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Recommended Aura Modules", 14, 155);

      autoTable(doc, {
        startY: 165,
        head: [['Phase', 'Module', 'Strategic Impact']],
        body: [
          ['Phase 1', 'Aura Core / ERP Foundation', 'Unify fractured datasets into a single source of truth.'],
          ['Phase 2', 'Aura HR & Payroll', 'Automate compliance and slash processing time by 80%.'],
          ['Phase 3', 'Aura AI Analytics', 'Real-time predictive forecasting & BI dashboards.']
        ],
        headStyles: { fillColor: brandColor },
        theme: 'striped',
      });

      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
          `Confidential - Aura OS | Page ${i} of ${pageCount}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
      }

      doc.save(`Aura_Proposal_${lead.company.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button 
      onClick={generatePDF}
      disabled={generating}
      title="Generate Strategy PDF"
      className="p-2 rounded-lg text-slate hover:text-cyan hover:bg-cyan/10 transition-colors disabled:opacity-50 flex items-center justify-center"
    >
      {generating ? <Download className="w-4 h-4 animate-pulse" /> : <FileText className="w-4 h-4" />}
    </button>
  );
}

"use client";

import { CheckCircle2, Mail } from "lucide-react";

/**
 * Read-only portal invoice action. Paid invoices show a confirmation; open
 * ones offer a one-click email enquiry to the billing team. Actual online
 * payment can be wired here later (Stripe/Paymob) without touching the portal.
 */
export function PortalInvoicePay({
  invoiceNo,
  amount,
  status,
}: {
  invoiceNo: string;
  amount: number;
  status: string;
}) {
  if (status === "PAID") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-400">
        <CheckCircle2 className="w-3.5 h-3.5" /> Paid
      </span>
    );
  }

  const subject = encodeURIComponent(`Invoice ${invoiceNo} enquiry`);
  const body = encodeURIComponent(
    `Hello,\n\nI'd like to discuss invoice ${invoiceNo} (${amount.toLocaleString()}).\n\nThank you.`,
  );

  return (
    <a
      href={`mailto:info@getaura.business?subject=${subject}&body=${body}`}
      className="inline-flex items-center gap-1 text-xs font-bold text-cyan hover:text-amethyst transition-colors"
    >
      <Mail className="w-3.5 h-3.5" /> Enquire
    </a>
  );
}

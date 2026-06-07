"use client";

import { BusinessAuditEngine } from "@/components/BusinessAuditEngine";

export default function AuditQuizPage() {
  return (
    <div className="min-h-screen bg-void pt-32 pb-20 px-4 relative flex flex-col items-center justify-center">
      <BusinessAuditEngine />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { BusinessAuditEngine } from "@/components/BusinessAuditEngine";
import { useLanguage } from "@/components/LanguageContext";

export default function AuditPage() {
  const { language } = useLanguage();

  const t = {
    title: language === "ar" ? "تقييم النضج الرقمي" : "Digital Maturity Assessment",
    subtitle: language === "ar"
      ? "أجب عن ١٢ سؤالاً سريعاً لتحصل على تقرير نضج رقمي مخصص لمؤسستك مع خارطة طريق عملية."
      : "Answer 12 quick questions to get a personalised digital maturity report and a practical roadmap for your organisation.",
  };

  return (
    <main className="flex-1 flex flex-col items-center py-20 md:py-28 bg-void relative min-h-screen">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="eyebrow text-cyan">(Business Audit)</span>
            <h1 className="display text-5xl md:text-7xl text-platinum mt-4 mb-5">
              {t.title}
            </h1>
            <p className="text-slate text-lg leading-relaxed">{t.subtitle}</p>
          </motion.div>
        </div>

        <BusinessAuditEngine />
      </div>
    </main>
  );
}

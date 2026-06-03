"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Send, CheckCircle2 } from "lucide-react";
import { submitAuditForm } from "./actions";
import { useLanguage } from "@/components/LanguageContext";

export default function AuditPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { language } = useLanguage();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    await submitAuditForm(formData);
    
    setLoading(false);
    setSubmitted(true);
  }

  const t = {
    title: language === "ar" ? "اطلب تقييماً مؤسسياً" : "Request a Business Audit",
    subtitle: language === "ar" 
      ? "تحدث مع خبرائنا لتشخيص معوقاتك التشغيلية وتصميم خارطة طريق استراتيجية لمنصة أورا." 
      : "Speak with our experts to diagnose operational bottlenecks and design your Aura roadmap.",
    name: language === "ar" ? "الاسم الكامل" : "Full Name",
    email: language === "ar" ? "البريد الإلكتروني للعمل" : "Work Email",
    company: language === "ar" ? "اسم الشركة" : "Company Name",
    message: language === "ar" ? "أخبرنا عن التحديات التشغيلية (اختياري)" : "Tell us about your operational challenges (Optional)",
    submit: language === "ar" ? "إرسال الطلب" : "Submit Request",
    submitting: language === "ar" ? "جاري الإرسال..." : "Submitting...",
    successTitle: language === "ar" ? "تم استلام الطلب" : "Request Received",
    successMsg: language === "ar" 
      ? "سيقوم أحد كبار مهندسينا بالتواصل معك قريباً لتحديد موعد التقييم المبدئي." 
      : "One of our senior engineers will contact you shortly to schedule your initial audit.",
  };

  return (
    <main className="flex-1 flex flex-col items-center py-20 bg-void relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 -mr-[400px] -mt-[400px] w-[800px] h-[800px] bg-cyan/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-platinum mb-4 text-glow">
              {t.title}
            </h1>
            <p className="text-slate text-lg">
              {t.subtitle}
            </p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-8 md:p-10 border-fg/10 bg-obsidian/80 backdrop-blur-xl relative overflow-hidden">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-cyan/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-cyan" />
                </div>
                <h2 className="text-2xl font-bold text-platinum mb-2">{t.successTitle}</h2>
                <p className="text-slate">{t.successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate uppercase tracking-wider">{t.name}</label>
                    <input 
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-void border border-fg/10 rounded-xl text-platinum placeholder-slate/50 focus:outline-none focus:border-cyan transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate uppercase tracking-wider">{t.email}</label>
                    <input 
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-void border border-fg/10 rounded-xl text-platinum placeholder-slate/50 focus:outline-none focus:border-cyan transition-colors"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate uppercase tracking-wider">{t.company}</label>
                  <input 
                    name="company"
                    required
                    className="w-full px-4 py-3 bg-void border border-fg/10 rounded-xl text-platinum placeholder-slate/50 focus:outline-none focus:border-cyan transition-colors"
                    placeholder="Acme Corp"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate uppercase tracking-wider">{t.message}</label>
                  <textarea 
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-void border border-fg/10 rounded-xl text-platinum placeholder-slate/50 focus:outline-none focus:border-cyan transition-colors resize-none"
                    placeholder="..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-cyan text-void font-bold rounded-xl hover:bg-cyan/90 transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? t.submitting : t.submit}
                  {!loading && <Send className={`w-4 h-4 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />}
                </button>
              </form>
            )}
          </Card>
        </motion.div>
      </div>
    </main>
  );
}

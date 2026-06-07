"use client";

import { useState } from "react";
import { ArrowRight, Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import { LegacyVsAuraSlider } from "@/components/LegacyVsAuraSlider";
import { InteractiveArchitectureBuilder } from "@/components/InteractiveArchitectureBuilder";
import { HeroDiagnosisForm } from "@/components/HeroDiagnosisForm";
import { submitAuditForm } from "@/app/audit/actions";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export default function Home() {
  const { t, language } = useLanguage();
  const [formLoading, setFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await submitAuditForm(formData);
      if (res?.success) {
        setFormSubmitted(true);
      } else {
        setFormError(res?.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  }

  const formT = {
    title: language === "ar" ? "اطلب تقييماً مؤسسياً" : "Request a Business Audit",
    subtitle: language === "ar"
      ? "تحدث مع خبرائنا لتشخيص معوقاتك التشغيلية وتصميم خارطة طريق استراتيجية لمنصة أورا."
      : "Speak with our experts to diagnose your operational bottlenecks and design your strategic Aura roadmap.",
    name: language === "ar" ? "الاسم الكامل" : "Full Name",
    email: language === "ar" ? "البريد الإلكتروني للعمل" : "Work Email",
    company: language === "ar" ? "اسم الشركة" : "Company Name",
    message: language === "ar" ? "أخبرنا عن التحديات التشغيلية (اختياري)" : "Tell us about your operational challenges (Optional)",
    submit: language === "ar" ? "إرسال الطلب" : "Submit Request",
    submitting: language === "ar" ? "جاري الإرسال..." : "Submitting...",
    successTitle: language === "ar" ? "تم استلام الطلب بنجاح" : "Request Received",
    successMsg: language === "ar"
      ? "سيقوم أحد كبار مهندسينا بالتواصل معك قريباً لتحديد موعد التقييم المبدئي."
      : "One of our senior engineers will contact you shortly to schedule your initial diagnostic.",
  };

  const inputClass =
    "w-full px-4 py-3 bg-void border border-fg/15 rounded-md text-platinum placeholder-slate/50 focus:outline-none focus:border-cyan transition-colors";
  const labelClass = "text-xs font-bold text-slate uppercase tracking-wider";

  return (
    <main className="flex-1 flex flex-col items-center">
      {/* ===================== HERO ===================== */}
      <section className="relative w-full pt-16 pb-24 md:pt-24 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_45%_at_50%_0%,color-mix(in_srgb,var(--cyan)_10%,transparent),transparent)]" />
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <motion.p
            variants={reveal} initial="hidden" animate="show" custom={0}
            className="eyebrow text-cyan mb-6"
          >
            (Enterprise Operating System)
          </motion.p>
          <motion.h1
            variants={reveal} initial="hidden" animate="show" custom={0.08}
            className="display-xl text-platinum mx-auto max-w-5xl"
            style={{ fontSize: "clamp(2.75rem, 8.5vw, 6.75rem)" }}
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            variants={reveal} initial="hidden" animate="show" custom={0.16}
            className="mt-8 text-lg md:text-2xl text-slate max-w-2xl mx-auto"
          >
            {t("hero.subtitle")}{" "}
            <span className="text-cyan font-semibold">{t("hero.subtitle.highlight")}</span>.
          </motion.p>

          <motion.div
            variants={reveal} initial="hidden" animate="show" custom={0.24}
            className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/suites"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-white bg-cyan rounded-md hover:bg-amethyst transition-colors"
            >
              {t("hero.explore")}
              <ArrowRight className={`w-4 h-4 transition-transform ${language === "ar" ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
            </Link>
            <Link
              href="https://wa.me/201066221112"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-platinum bg-transparent border border-fg/15 rounded-md hover:bg-fg/5 transition-colors"
            >
              {t("hero.contact")}
            </Link>
          </motion.div>

          <motion.div variants={reveal} initial="hidden" animate="show" custom={0.32}>
            <HeroDiagnosisForm />
          </motion.div>
        </div>
      </section>

      {/* ===================== LEGACY VS AURA ===================== */}
      <section className="w-full py-16 md:py-20 bg-obsidian border-y border-fg/10">
        <LegacyVsAuraSlider />
      </section>

      {/* ===================== METHODOLOGY ===================== */}
      <section className="w-full py-20 md:py-28 bg-void">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14 max-w-3xl"
          >
            <p className="eyebrow text-cyan mb-4">(Methodology)</p>
            <h2 className="display text-4xl md:text-6xl text-platinum">{t("methodology.title")}</h2>
            <p className="mt-5 text-slate text-lg">{t("methodology.subtitle")}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-fg/10 border border-fg/10 rounded-2xl overflow-hidden">
            {["1", "2", "3"].map((n, i) => (
              <motion.div
                key={n}
                variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.1}
                className="bg-void p-8 md:p-10 group"
              >
                <span className="display text-5xl md:text-6xl text-cyan">0{n}/</span>
                <h3 className="mt-6 text-2xl font-bold text-platinum">{t(`methodology.${n}.title`)}</h3>
                <p className="mt-3 text-slate leading-relaxed">{t(`methodology.${n}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ARCHITECTURE BUILDER ===================== */}
      <section className="w-full py-16 md:py-20 bg-obsidian border-y border-fg/10 overflow-hidden">
        <InteractiveArchitectureBuilder />
      </section>

      {/* ===================== INTELLIGENCE / CONVERGENCE ===================== */}
      <section className="w-full py-20 md:py-28 bg-void">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14 max-w-3xl"
          >
            <p className="eyebrow text-cyan mb-4">(Unified Intelligence)</p>
            <h2 className="display text-4xl md:text-6xl text-platinum">{t("dashboard.title")}</h2>
            <p className="mt-5 text-slate text-lg">{t("dashboard.subtitle")}</p>
          </motion.div>

          <motion.div
            variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl border border-fg/10 bg-void overflow-hidden shadow-sm"
          >
            {/* KPI bar */}
            <div className="grid grid-cols-3 border-b border-fg/10">
              {[
                { label: t("dashboard.kpi1.label"), value: t("dashboard.kpi1.value"), color: "text-cyan" },
                { label: t("dashboard.kpi2.label"), value: t("dashboard.kpi2.value"), color: "text-platinum" },
                { label: t("dashboard.kpi3.label"), value: t("dashboard.kpi3.value"), color: "text-amethyst" },
              ].map((kpi, i) => (
                <div key={i} className={`p-6 text-center ${i < 2 ? (language === "ar" ? "border-l" : "border-r") : ""} border-fg/10`}>
                  <div className="text-xs font-medium text-slate uppercase tracking-wider mb-1">{kpi.label}</div>
                  <div className={`text-2xl md:text-3xl font-extrabold ${kpi.color}`} dir="ltr">{kpi.value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Convergence map */}
              <div className={`md:col-span-2 p-8 md:p-12 flex items-center justify-center border-fg/10 ${language === "ar" ? "md:border-l" : "md:border-r"}`}>
                <div className="relative w-full max-w-md aspect-video" dir="ltr">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200">
                    <defs>
                      <linearGradient id="hr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="var(--amethyst)" stopOpacity="0.3" />
                      </linearGradient>
                      <linearGradient id="log-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="var(--amethyst)" stopOpacity="0.3" />
                      </linearGradient>
                      <linearGradient id="fin-grad" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="var(--amethyst)" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>

                    <motion.path d="M 50,40 Q 150,40 250,100" fill="none" stroke="url(#hr-grad)" strokeWidth="2.5"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                    <motion.path d="M 50,100 Q 150,100 250,100" fill="none" stroke="url(#fin-grad)" strokeWidth="2.5"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} />
                    <motion.path d="M 50,160 Q 150,160 250,100" fill="none" stroke="url(#log-grad)" strokeWidth="2.5"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />

                    <circle cx="50" cy="40" r="5" fill="var(--cyan)" />
                    <text x="35" y="44" fill="var(--slate)" fontSize="10" fontFamily="monospace" textAnchor="end">HR_API</text>
                    <circle cx="50" cy="100" r="5" fill="#10B981" />
                    <text x="35" y="104" fill="var(--slate)" fontSize="10" fontFamily="monospace" textAnchor="end">FIN_DB</text>
                    <circle cx="50" cy="160" r="5" fill="#F43F5E" />
                    <text x="35" y="164" fill="var(--slate)" fontSize="10" fontFamily="monospace" textAnchor="end">LOG_SYS</text>

                    <motion.circle cx="250" cy="100" r="18" fill="var(--cyan)" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                    <circle cx="250" cy="100" r="9" fill="var(--void)" />
                    <text x="278" y="104" fill="var(--platinum)" fontSize="13" fontWeight="bold">AURA CORE</text>
                  </svg>
                </div>
              </div>

              {/* Live feed */}
              <div className="md:col-span-1 p-6 flex flex-col bg-obsidian">
                <h3 className="text-sm font-semibold text-platinum mb-4 flex items-center">
                  <span className={`w-2 h-2 rounded-full bg-cyan animate-pulse ${language === "ar" ? "ml-2" : "mr-2"}`} />
                  {t("dashboard.live_feed")}
                </h3>
                <div className="flex-1 overflow-hidden relative min-h-[260px]">
                  <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian z-10 pointer-events-none" />
                  <motion.div
                    className="space-y-3 text-xs absolute w-full"
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  >
                    {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item, idx) => (
                      <div key={idx} className={`p-3 rounded-md border ${idx % 2 === 0 ? "bg-void border-fg/10 text-slate" : "bg-cyan/5 border-cyan/20 text-platinum"}`}>
                        <span className="text-cyan font-bold" dir="ltr">[14:0{item + 2}:{10 + item * 3}]</span> {t(`dashboard.feed.${item}`)}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== CONTACT FORM ===================== */}
      <section className="w-full py-20 md:py-28 bg-obsidian border-t border-fg/10">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <div className="text-center mb-12">
              <p className="eyebrow text-cyan mb-4">(Get Started)</p>
              <h2 className="display text-4xl md:text-6xl text-platinum mb-5">{formT.title}</h2>
              <p className="text-slate text-lg max-w-xl mx-auto">{formT.subtitle}</p>
            </div>

            <div className="p-8 md:p-10 bg-void border border-fg/10 rounded-2xl">
              {formSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-12 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-cyan/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-cyan" />
                  </div>
                  <h3 className="text-2xl font-bold text-platinum mb-2">{formT.successTitle}</h3>
                  <p className="text-slate">{formT.successMsg}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={labelClass}>{formT.name}</label>
                      <input name="name" required className={inputClass} placeholder="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>{formT.email}</label>
                      <input name="email" type="email" required className={inputClass} placeholder="jane@company.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>{formT.company}</label>
                    <input name="company" required className={inputClass} placeholder="Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>{formT.message}</label>
                    <textarea name="message" rows={4} className={`${inputClass} resize-none`} placeholder="..." />
                  </div>

                  {formError && (
                    <p className="text-sm text-red-500 text-center" role="alert">{formError}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={formLoading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 bg-cyan text-white font-semibold rounded-md hover:bg-amethyst transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {formLoading ? formT.submitting : formT.submit}
                    {!formLoading && <Send className={`w-4 h-4 ${language === "ar" ? "rotate-180" : ""}`} />}
                  </motion.button>
                </form>
              )}
            </div>

            <div className="mt-8 text-center">
              <Link href="/audit" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:text-amethyst transition-colors">
                Prefer a guided assessment? Take the Digital Maturity Audit
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

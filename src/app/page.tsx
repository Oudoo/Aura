"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowDown, Sparkles, Activity, Shield, BarChart3, Send, CheckCircle2 } from "lucide-react";
import { LegacyVsAuraSlider } from "@/components/LegacyVsAuraSlider";
import { InteractiveArchitectureBuilder } from "@/components/InteractiveArchitectureBuilder";
import { HeroDiagnosisForm } from "@/components/HeroDiagnosisForm";
import { submitAuditForm } from "@/app/audit/actions";
import { useLanguage } from "@/components/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: "easeOut" as const } }),
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
    subtitle:
      language === "ar"
        ? "تحدث مع خبرائنا لتشخيص معوقاتك التشغيلية وتصميم خارطة طريق استراتيجية لمنصة أورا."
        : "Speak with our experts to diagnose your operational bottlenecks and design your Aura roadmap.",
    name: language === "ar" ? "الاسم الكامل" : "Full Name",
    email: language === "ar" ? "البريد الإلكتروني للعمل" : "Work Email",
    company: language === "ar" ? "اسم الشركة" : "Company Name",
    message: language === "ar" ? "أخبرنا عن التحديات التشغيلية (اختياري)" : "Tell us about your challenges (optional)",
    submit: language === "ar" ? "إرسال الطلب" : "Submit Request",
    submitting: language === "ar" ? "جاري الإرسال..." : "Submitting…",
    successTitle: language === "ar" ? "تم استلام الطلب بنجاح" : "Request Received",
    successMsg:
      language === "ar"
        ? "سيقوم أحد كبار مهندسينا بالتواصل معك قريباً."
        : "One of our senior engineers will contact you shortly to schedule your diagnostic.",
  };

  return (
    <main className="flex-1 flex flex-col items-center overflow-hidden">

      {/* ═══════════════════════════════════════════════
          HERO — Full-screen editorial
      ═══════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] bg-cyan/8 rounded-full blur-[180px]" />
          <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-amethyst/8 rounded-full blur-[160px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-6xl pt-20">
          {/* Eyebrow chip */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan/25 bg-cyan/8 text-cyan text-xs font-bold tracking-widest uppercase mb-10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Strategic Business Platform</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial="hidden"
            animate="show"
            custom={0.08}
            variants={fadeUp}
            className="font-heading font-black text-platinum leading-[0.88] tracking-tighter mb-8"
            style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
          >
            {t("hero.title")}
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial="hidden"
            animate="show"
            custom={0.16}
            variants={fadeUp}
            className="text-lg md:text-2xl text-slate max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {t("hero.subtitle")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-amethyst font-semibold">
              {t("hero.subtitle.highlight")}
            </span>
            .
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={0.24}
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/suites"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-platinum text-void font-bold rounded-full hover:bg-platinum/90 transition-all duration-300 text-base shadow-[0_0_0_0] hover:shadow-[0_0_40px_rgba(248,250,252,0.15)]"
            >
              {t("hero.explore")}
              <ArrowRight className={`w-4 h-4 transition-transform ${language === "ar" ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`} />
            </Link>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-8 py-4 border border-fg/15 rounded-full text-platinum font-bold hover:border-cyan/40 hover:bg-cyan/5 transition-all duration-300 text-base"
            >
              {t("nav.audit")}
            </Link>
          </motion.div>

          {/* Quick diagnosis widget */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={0.32}
            variants={fadeUp}
          >
            <HeroDiagnosisForm />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown className="w-4 h-4 text-slate/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          BEFORE / AFTER — chaos vs clarity
      ═══════════════════════════════════════════════ */}
      <section className="w-full py-28 border-t border-fg/6">
        <LegacyVsAuraSlider />
      </section>

      {/* ═══════════════════════════════════════════════
          HOW WE WORK — bold numbered steps
      ═══════════════════════════════════════════════ */}
      <section className="w-full py-28 bg-obsidian border-y border-fg/6 relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(var(--fg) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="mb-20">
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-xs font-black tracking-widest uppercase text-cyan mb-5"
            >
              {t("methodology.title")}
            </motion.p>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.06}
              variants={fadeUp}
              className="font-heading font-black text-platinum leading-[0.9] tracking-tighter max-w-2xl"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              A framework built for results.
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              { num: "01", title: t("methodology.1.title"), desc: t("methodology.1.desc"), accent: "from-cyan/40 to-cyan/0" },
              { num: "02", title: t("methodology.2.title"), desc: t("methodology.2.desc"), accent: "from-amethyst/40 to-amethyst/0" },
              { num: "03", title: t("methodology.3.title"), desc: t("methodology.3.desc"), accent: "from-slate/40 to-slate/0" },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={idx * 0.1}
                variants={fadeUp}
                className="group relative"
              >
                {/* Big number */}
                <div className={`font-heading font-black bg-gradient-to-b ${step.accent} bg-clip-text text-transparent leading-none mb-6 select-none`}
                  style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}>
                  {step.num}
                </div>
                {/* Connector line (hidden on last) */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-14 left-full w-full h-px bg-gradient-to-r from-fg/15 to-transparent -translate-y-1/2 pointer-events-none" />
                )}
                <h3 className="font-heading font-bold text-platinum text-2xl mb-4">{step.title}</h3>
                <p className="text-slate leading-relaxed text-lg">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ARCHITECTURE BUILDER — interactive
      ═══════════════════════════════════════════════ */}
      <section className="w-full py-10 border-b border-fg/6 overflow-hidden">
        <InteractiveArchitectureBuilder />
      </section>

      {/* ═══════════════════════════════════════════════
          INTELLIGENCE / PLATFORM FEATURES
      ═══════════════════════════════════════════════ */}
      <section className="w-full py-28 bg-obsidian border-b border-fg/6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amethyst/5 via-transparent to-cyan/5 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left: headline + stats */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-xs font-black tracking-widest uppercase text-cyan mb-5">{t("dashboard.title")}</p>
              <h2
                className="font-heading font-black text-platinum leading-[0.9] tracking-tighter mb-6"
                style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
              >
                Real-time intelligence.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-amethyst">
                  Unified view.
                </span>
              </h2>
              <p className="text-slate text-lg leading-relaxed mb-12">{t("dashboard.subtitle")}</p>

              <div className="grid grid-cols-2 gap-5">
                {[
                  { label: t("dashboard.kpi1.label"), value: t("dashboard.kpi1.value"), color: "text-cyan" },
                  { label: t("dashboard.kpi2.label"), value: t("dashboard.kpi2.value"), color: "text-platinum" },
                  { label: t("dashboard.kpi3.label"), value: t("dashboard.kpi3.value"), color: "text-amethyst" },
                  { label: "Client Satisfaction", value: "98.4%", color: "text-emerald-400" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    custom={idx * 0.08}
                    variants={fadeUp}
                    className="p-5 rounded-2xl bg-void/60 border border-fg/8 hover:border-fg/15 transition-colors"
                  >
                    <div className={`font-heading font-black text-3xl ${stat.color} mb-1`} dir="ltr">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: feature cards */}
            <div className="space-y-4 lg:pt-4">
              {[
                {
                  Icon: Activity,
                  title: t("dashboard.live_feed"),
                  desc: "Real-time activity stream unified across all departments and modules.",
                  cls: "text-cyan bg-cyan/10 border-cyan/20",
                },
                {
                  Icon: Shield,
                  title: "Enterprise Security",
                  desc: "Role-based access control with immutable audit logs for every action taken.",
                  cls: "text-amethyst bg-amethyst/10 border-amethyst/20",
                },
                {
                  Icon: BarChart3,
                  title: "Predictive Analytics",
                  desc: "AI-powered insights that surface what matters before it becomes critical.",
                  cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
                },
              ].map(({ Icon, title, desc, cls }, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={idx * 0.1}
                  variants={fadeUp}
                  className="flex gap-5 p-6 rounded-2xl bg-void/60 border border-fg/8 hover:border-fg/15 transition-all duration-300 group cursor-default"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${cls}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-platinum mb-1.5">{title}</h3>
                    <p className="text-slate text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CONTACT — audit request form
      ═══════════════════════════════════════════════ */}
      <section className="w-full py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amethyst/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-2xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="text-center mb-14">
              <p className="text-xs font-black tracking-widest uppercase text-cyan mb-5">Get Started</p>
              <h2
                className="font-heading font-black text-platinum leading-[0.9] tracking-tighter mb-6"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                {formT.title}
              </h2>
              <p className="text-slate text-lg leading-relaxed">{formT.subtitle}</p>
            </div>

            <div className="rounded-3xl border border-fg/10 bg-obsidian/80 backdrop-blur-xl p-8 md:p-12">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-cyan/10 rounded-full flex items-center justify-center mb-6 border border-cyan/20">
                    <CheckCircle2 className="w-10 h-10 text-cyan" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-platinum mb-3">{formT.successTitle}</h3>
                  <p className="text-slate">{formT.successMsg}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate uppercase tracking-wider mb-2">
                        {formT.name}
                      </label>
                      <input
                        name="name"
                        required
                        className="w-full px-4 py-3.5 bg-void border border-fg/10 rounded-xl text-platinum placeholder-slate/40 focus:outline-none focus:border-cyan/50 transition-colors"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate uppercase tracking-wider mb-2">
                        {formT.email}
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        className="w-full px-4 py-3.5 bg-void border border-fg/10 rounded-xl text-platinum placeholder-slate/40 focus:outline-none focus:border-cyan/50 transition-colors"
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate uppercase tracking-wider mb-2">
                      {formT.company}
                    </label>
                    <input
                      name="company"
                      required
                      className="w-full px-4 py-3.5 bg-void border border-fg/10 rounded-xl text-platinum placeholder-slate/40 focus:outline-none focus:border-cyan/50 transition-colors"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate uppercase tracking-wider mb-2">
                      {formT.message}
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3.5 bg-void border border-fg/10 rounded-xl text-platinum placeholder-slate/40 focus:outline-none focus:border-cyan/50 transition-colors resize-none"
                      placeholder="Describe your operational challenges…"
                    />
                  </div>
                  {formError && (
                    <p className="text-sm text-red-400 text-center" role="alert">
                      {formError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full py-4 bg-cyan text-void font-bold rounded-xl hover:bg-cyan/90 transition-colors flex items-center justify-center gap-2 text-base disabled:opacity-50"
                  >
                    {formLoading ? formT.submitting : formT.submit}
                    {!formLoading && <Send className="w-4 h-4" />}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
